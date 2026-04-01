#!/usr/bin/env node

/**
 * download-images.mjs
 *
 * Downloads all images from imagesData.json, saves them with slugified
 * filenames into src/assets/images/, and writes a new imagesData_local.json
 * with updated imgUrl paths.
 *
 * Usage:
 *   node download-images.mjs [path/to/imagesData.json]
 *
 * Defaults to ./imagesData.json if no argument is given.
 */

import fs from "node:fs";
import path from "node:path";
import { pipeline } from "node:stream/promises";

// ─── Config ──────────────────────────────────────────────────────────
const INPUT_JSON = process.argv[2] || "./imagesData.json";
const OUTPUT_DIR = "./src/assets/images";
const OUTPUT_JSON = "./imagesData_local.json";
const TIMEOUT_MS = 30_000; // 30 s per image
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 2_000;
const CONCURRENCY = 4; // parallel downloads

// ─── Helpers ─────────────────────────────────────────────────────────

/** Turn a caption string into a filesystem-safe slug, prefixed with index */
function slugify(caption, index) {
  const slug = caption
    .slice(0, 80)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return `${String(index).padStart(3, "0")}-${slug || "image"}`;
}

/** Map content-type → extension; fall back to URL extension or .jpg */
function resolveExt(contentType, url) {
  const map = {
    "image/jpeg": ".jpg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/webp": ".webp",
    "image/svg+xml": ".svg",
    "image/bmp": ".bmp",
    "image/tiff": ".tiff",
  };
  if (contentType) {
    const base = contentType.split(";")[0].trim().toLowerCase();
    if (map[base]) return map[base];
  }
  // Try extracting from URL path (before query string)
  const urlPath = new URL(url).pathname;
  const match = urlPath.match(/\.(jpe?g|png|gif|webp|svg|bmp|tiff?)$/i);
  if (match) return "." + match[0].slice(1).toLowerCase().replace("jpeg", "jpg");
  return ".jpg"; // safe default for photos
}

/** Fetch with timeout */
async function fetchWithTimeout(url, timeoutMs) {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const res = await fetch(url, {
      signal: controller.signal,
      headers: {
        "User-Agent":
          "Mozilla/5.0 (compatible; ImageArchiver/1.0; educational project)",
      },
      redirect: "follow",
    });
    return res;
  } finally {
    clearTimeout(timer);
  }
}

/** Download a single image with retries. Returns { filename, ok, error? } */
async function downloadImage(item, index) {
  const slug = slugify(item.imgCaption || `image-${index}`, index);
  let lastError;

  for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
    try {
      const res = await fetchWithTimeout(item.imgUrl, TIMEOUT_MS);

      if (!res.ok) {
        throw new Error(`HTTP ${res.status} ${res.statusText}`);
      }

      const contentType = res.headers.get("content-type");
      const ext = resolveExt(contentType, item.imgUrl);
      const filename = `${slug}${ext}`;
      const filepath = path.join(OUTPUT_DIR, filename);

      // Stream body to file
      const dest = fs.createWriteStream(filepath);
      await pipeline(res.body, dest);

      const stat = fs.statSync(filepath);
      if (stat.size < 500) {
        throw new Error(`Suspiciously small file (${stat.size} bytes)`);
      }

      return { index, filename, ok: true, size: stat.size };
    } catch (err) {
      lastError = err;
      if (attempt < MAX_RETRIES) {
        const delay = RETRY_DELAY_MS * attempt;
        console.warn(
          `  ⟳ Retry ${attempt}/${MAX_RETRIES} for [${index}] — ${err.message} (waiting ${delay}ms)`
        );
        await new Promise((r) => setTimeout(r, delay));
      }
    }
  }

  return { index, filename: null, ok: false, error: lastError?.message };
}

/** Run tasks with bounded concurrency */
async function runPool(tasks, concurrency) {
  const results = new Array(tasks.length);
  let next = 0;

  async function worker() {
    while (next < tasks.length) {
      const i = next++;
      results[i] = await tasks[i]();
    }
  }

  await Promise.all(Array.from({ length: concurrency }, () => worker()));
  return results;
}

// ─── Main ────────────────────────────────────────────────────────────

async function main() {
  console.log(`\n📂 Reading ${INPUT_JSON}...`);
  const data = JSON.parse(fs.readFileSync(INPUT_JSON, "utf-8"));
  console.log(`   Found ${data.length} images.\n`);

  fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Build download tasks
  const tasks = data.map((item, i) => () => {
    console.log(`⬇  [${String(i).padStart(3, "0")}] Downloading...`);
    return downloadImage(item, i);
  });

  const results = await runPool(tasks, CONCURRENCY);

  // ─── Report ──────────────────────────────────────────────────────
  const succeeded = results.filter((r) => r.ok);
  const failed = results.filter((r) => !r.ok);

  console.log(`\n${"─".repeat(60)}`);
  console.log(`✅ Downloaded: ${succeeded.length}/${data.length}`);

  if (failed.length > 0) {
    console.log(`❌ Failed: ${failed.length}`);
    failed.forEach((r) => {
      console.log(`   [${String(r.index).padStart(3, "0")}] ${r.error}`);
      console.log(`      URL: ${data[r.index].imgUrl.slice(0, 100)}...`);
    });
  }

  // Total download size
  const totalBytes = succeeded.reduce((sum, r) => sum + (r.size || 0), 0);
  console.log(
    `📦 Total size: ${(totalBytes / 1024 / 1024).toFixed(1)} MB\n`
  );

  // ─── Write updated JSON ──────────────────────────────────────────
  const updatedData = data.map((item, i) => {
    const result = results[i];
    return {
      ...item,
      imgUrl: result.ok
        ? `./src/assets/images/${result.filename}`
        : item.imgUrl, // keep original URL as fallback if download failed
      _originalUrl: item.imgUrl, // preserve for reference
    };
  });

  fs.writeFileSync(OUTPUT_JSON, JSON.stringify(updatedData, null, 2), "utf-8");
  console.log(`📝 Wrote ${OUTPUT_JSON}`);

  // ─── Write a failure log if any ──────────────────────────────────
  if (failed.length > 0) {
    const failLog = failed.map((r) => ({
      index: r.index,
      caption: data[r.index].imgCaption,
      url: data[r.index].imgUrl,
      error: r.error,
    }));
    fs.writeFileSync(
      "./failed_downloads.json",
      JSON.stringify(failLog, null, 2),
      "utf-8"
    );
    console.log(`⚠️  Wrote failed_downloads.json — retry these manually.\n`);
  }
}

main().catch((err) => {
  console.error("Fatal error:", err);
  process.exit(1);
});
