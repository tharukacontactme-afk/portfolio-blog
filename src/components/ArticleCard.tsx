import { Link } from 'react-router-dom'
import ArticleCover from '@/components/ArticleCover'
import type { Article } from '@/types/article'

interface ArticleCardProps {
  article: Article
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-border bg-surface-elevated transition-all duration-200 hover:-translate-y-1 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/15">
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

      <div className="p-6">
      <div className="mb-3 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
        <time dateTime={article.date}>{formatDate(article.date)}</time>
        {article.readingTime && (
          <>
            <span aria-hidden>·</span>
            <span>{article.readingTime}</span>
          </>
        )}
      </div>

      <h2 className="mb-2 font-serif text-2xl text-ink transition group-hover:text-accent">
        <Link to={`/articles/${article.slug}`} className="outline-offset-4">
          {article.title}
        </Link>
      </h2>

      <p className="mb-4 line-clamp-2 text-ink-muted">{article.excerpt}</p>

      {article.tags && article.tags.length > 0 && (
        <ul className="mb-4 flex flex-wrap gap-2">
          {article.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full bg-accent-soft px-3 py-1 text-xs font-medium text-accent"
            >
              {tag}
            </li>
          ))}
        </ul>
      )}

      <Link
        to={`/articles/${article.slug}`}
        className="inline-flex items-center gap-1 text-sm font-semibold text-accent transition-all duration-200 hover:gap-2 hover:text-accent-dark"
      >
        Read article
        <span aria-hidden>→</span>
      </Link>
      </div>
    </article>
  )
}
