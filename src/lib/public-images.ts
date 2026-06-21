export const IMAGE_EXTENSIONS = ['png', 'svg', 'webp', 'jpg', 'jpeg'] as const

export function publicImageCandidates(folder: string, basename: string): string[] {
  const base = basename.replace(/\.(svg|png|webp|jpe?g)$/i, '')
  return IMAGE_EXTENSIONS.map((ext) => `/images/${folder}/${base}.${ext}`)
}
