// Makes the small versions of the photos that the Archive grid shows.
//
//   pnpm thumbs           make thumbnails for photos that don't have one yet
//   pnpm thumbs --force   remake every thumbnail
//
// Every photo in public/images/ gets public/images/thumbs/<same name>.webp,
// about 360px on its short side. Existing thumbnails are left alone unless
// the photo is newer than its thumbnail, or --force is given.
//
// It also checks the data: any photo listed in imagesData_local.json that
// is missing from public/images/ is reported.

import { readdir, readFile, stat, mkdir } from 'node:fs/promises'
import path from 'node:path'
import sharp from 'sharp'

const root = path.resolve(import.meta.dirname, '..')
const imagesDir = path.join(root, 'public', 'images')
const thumbsDir = path.join(imagesDir, 'thumbs')
const dataFile = path.join(root, 'src', 'assets', 'data', 'imagesData_local.json')

const SHORT_SIDE = 360
const QUALITY = 70
const PHOTO = /\.(jpe?g|png|webp|gif|tiff?|avif)$/i

const force = process.argv.includes('--force')

async function mtime(file) {
  try {
    return (await stat(file)).mtimeMs
  } catch {
    return null
  }
}

await mkdir(thumbsDir, { recursive: true })

const photos = (await readdir(imagesDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && PHOTO.test(entry.name))
  .map((entry) => entry.name)
  .sort()

let made = 0
let kept = 0
const failed = []

for (const name of photos) {
  const source = path.join(imagesDir, name)
  const target = path.join(thumbsDir, name.replace(/\.[^.]+$/, '.webp'))
  const thumbTime = await mtime(target)

  if (!force && thumbTime !== null && thumbTime >= (await mtime(source))) {
    kept++
    continue
  }

  try {
    const image = sharp(source).rotate() // respect the camera's orientation tag
    const { width, height } = await image.metadata()
    const shortSide = Math.min(width, height)
    const resized =
      shortSide > SHORT_SIDE
        ? image.resize(width <= height ? { width: SHORT_SIDE } : { height: SHORT_SIDE })
        : image
    await resized.webp({ quality: QUALITY, effort: 6 }).toFile(target)
    made++
    console.log(`  made   thumbs/${path.basename(target)}`)
  } catch (error) {
    failed.push(name)
    console.error(`  failed ${name}: ${error.message}`)
  }
}

// Photos the data refers to that aren't on disk
const data = JSON.parse(await readFile(dataFile, 'utf8'))
const onDisk = new Set(photos)
const missing = data
  .map((item) => item.imgUrl)
  .filter((url) => url && url.startsWith('images/') && !onDisk.has(url.slice('images/'.length)))

console.log(`\n${made} made, ${kept} already up to date, ${photos.length} photos in public/images/`)
if (missing.length > 0) {
  console.log(`\nListed in imagesData_local.json but not found in public/images/:`)
  missing.forEach((url) => console.log(`  ${url}`))
}
if (failed.length > 0 || missing.length > 0) process.exitCode = 1
