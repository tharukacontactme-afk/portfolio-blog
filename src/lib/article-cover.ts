import { publicImageCandidates } from '@/lib/public-images'

const ARTICLE_COVER_FOLDER = 'articles'

/** Frontmatter `cover` may be a slug (`designing-for-clarity`) or a path (`/images/articles/foo.jpg`). */
export function articleCoverCandidates(cover: string | undefined, slug: string): string[] {
  if (!cover?.trim()) {
    return publicImageCandidates(ARTICLE_COVER_FOLDER, slug)
  }

  const trimmed = cover.trim()
  if (trimmed.startsWith('/')) {
    const basename = trimmed.split('/').pop() ?? trimmed
    return [trimmed, ...publicImageCandidates(ARTICLE_COVER_FOLDER, basename)]
  }

  return publicImageCandidates(ARTICLE_COVER_FOLDER, trimmed)
}

export function absoluteUrl(path: string, siteUrl: string): string {
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path
  }
  const base = siteUrl.replace(/\/$/, '')
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${base}${normalized}`
}
