import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import ArticleCover from '@/components/ArticleCover'
import { articleCoverCandidates } from '@/lib/article-cover'
import { usePageMeta } from '@/hooks/usePageMeta'
import { getArticleBySlug } from '@/lib/articles'
import { profile } from '@/data/profile'
import NotFound from './NotFound'

function formatDate(date: string) {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date))
}

export default function ArticleDetail() {
  const { slug } = useParams<{ slug: string }>()
  const article = slug ? getArticleBySlug(slug) : undefined
  const ogImage = article
    ? articleCoverCandidates(article.cover, article.slug)[0]
    : undefined

  usePageMeta({
    title: article ? `${article.title} | ${profile.name}` : profile.name,
    description: article?.excerpt,
    image: ogImage,
    path: article ? `/articles/${article.slug}` : undefined,
  })

  if (!article) {
    return <NotFound />
  }

  return (
    <article className="main-panel site-container max-w-3xl">
      <Link
        to="/articles"
        className="mb-8 inline-flex items-center gap-1 text-sm font-medium text-accent transition hover:gap-2"
      >
        <span aria-hidden>←</span> Back to articles
      </Link>

      <ArticleCover
        cover={article.cover}
        slug={article.slug}
        title={article.title}
        variant="hero"
        className="mb-8"
      />

      <header className="mb-10 border-b border-border pb-10">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-ink-muted">
          <time dateTime={article.date}>{formatDate(article.date)}</time>
          {article.readingTime && (
            <>
              <span aria-hidden>·</span>
              <span>{article.readingTime}</span>
            </>
          )}
        </div>
        <h1 className="font-serif text-4xl leading-tight text-ink sm:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-ink-muted">{article.excerpt}</p>
        {article.tags && article.tags.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <li
                key={tag}
                className="article-tag"
              >
                {tag}
              </li>
            ))}
          </ul>
        )}
      </header>

      <div className="prose-blog">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.content}</ReactMarkdown>
      </div>
    </article>
  )
}
