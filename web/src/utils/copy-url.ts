export function CopyUrl(shortUrl: string) {
  const origin = window.location.origin

  const url = new URL(shortUrl, origin).toString()

  return navigator.clipboard.writeText(url)
}
