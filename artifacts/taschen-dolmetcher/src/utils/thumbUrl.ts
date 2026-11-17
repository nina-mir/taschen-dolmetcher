/**
 * Path of the small version of a photo, used in the archive grid.
 *   images/000-Liepaja-Latvia-1941.jpg → images/thumbs/000-Liepaja-Latvia-1941.webp
 *
 * Every photo in public/images needs a matching file in public/images/thumbs
 * (about 360px on the short side, WebP).
 */
export function thumbUrl(imgUrl: string): string {
  const fileName = imgUrl.split('/').pop() ?? imgUrl
  const stem = fileName.replace(/\.[^.]+$/, '')
  return `images/thumbs/${stem}.webp`
}
