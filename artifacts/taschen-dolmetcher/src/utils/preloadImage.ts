const requested = new Set<string>()

/**
 * Starts downloading an image in the background so it is already cached
 * when it is shown. Each URL is only requested once.
 */
export function preloadImage(url: string | undefined): void {
  if (!url || requested.has(url)) return
  requested.add(url)
  const img = new Image()
  img.src = url
}
