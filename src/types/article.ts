export interface ArticleFrontmatter {
  title: string
  slug: string
  date: string
  excerpt: string
  /** Image basename or path under public/images/articles/ (e.g. designing-for-clarity or /images/articles/foo.jpg) */
  cover?: string
  tags?: string[]
  readingTime?: string
}

export interface Article extends ArticleFrontmatter {
  content: string
}
