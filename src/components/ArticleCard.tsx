import { Link } from 'react-router-dom'
import ArticleCover from '@/components/ArticleCover'
import type { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
}

export default function ArticleCard({ article }: ArticleCardProps) {
  const primaryTag = article.tags?.[0]

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-border bg-surface-elevated shadow-sm transition-shadow duration-200 hover:shadow-md">
      <Link
        to={`/articles/${article.slug}`}
        className="block outline-offset-4"
        tabIndex={-1}
        aria-hidden
      >
        <ArticleCover
          cover={article.cover}
          slug={article.slug}
          title={article.title}
          variant="card"
        />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        {primaryTag && (
          <span className="article-tag mb-3 self-start">{primaryTag}</span>
        )}

        <h2 className="mb-2 text-lg font-bold leading-snug text-ink transition group-hover:text-accent-dark">
          <Link to={`/articles/${article.slug}`} className="outline-offset-4">
            {article.title}
          </Link>
        </h2>

        <p className="line-clamp-3 flex-1 text-sm leading-relaxed text-ink-muted">
          {article.excerpt}
        </p>
      </div>
    </article>
  )
}
