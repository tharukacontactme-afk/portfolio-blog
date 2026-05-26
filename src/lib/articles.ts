import { parseFrontmatter } from '@/lib/frontmatter'
import type { Article, ArticleFrontmatter } from '@/types/article'

const modules = import.meta.glob('../content/articles/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

function parseArticle(path: string, raw: string): Article {
  const { data, content } = parseFrontmatter(raw)
  const frontmatter = data as unknown as ArticleFrontmatter

  if (!frontmatter.title || !frontmatter.slug || !frontmatter.date || !frontmatter.excerpt) {
    throw new Error(
      `Article at ${path} is missing required frontmatter (title, slug, date, excerpt).`,
    )
  }

  return {
    ...frontmatter,
    content: content.trim(),
  }
}

const articles: Article[] = Object.entries(modules)
  .map(([path, raw]) => parseArticle(path, raw))
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getAllArticles(): Article[] {
  return articles
}

export function getArticleBySlug(slug: string): Article | undefined {
  return articles.find((article) => article.slug === slug)
}

export function getFeaturedArticles(count = 3): Article[] {
  return articles.slice(0, count)
}
