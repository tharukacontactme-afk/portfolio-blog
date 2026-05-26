import { publicImageCandidates } from './public-images'

export { IMAGE_EXTENSIONS as LOGO_EXTENSIONS, publicImageCandidates } from './public-images'

export function toolLogoCandidates(logo: string): string[] {
  return publicImageCandidates('tools', logo)
}
