import { useSearchParams } from 'react-router-dom'
import ArticleCard from '@/components/ArticleCard'
import Pagination from '@/components/Pagination'
import { getAllArticles } from '@/lib/articles'

const ARTICLES_PER_PAGE = 3

export default function Articles() {
  const articles = getAllArticles()
  const [searchParams] = useSearchParams()
  const requestedPage = Number.parseInt(searchParams.get('page') ?? '1', 10)
  const totalPages = Math.max(1, Math.ceil(articles.length / ARTICLES_PER_PAGE))
  const currentPage = Number.isFinite(requestedPage)
    ? Math.min(Math.max(1, requestedPage), totalPages)
    : 1
  const start = (currentPage - 1) * ARTICLES_PER_PAGE
  const pageArticles = articles.slice(start, start + ARTICLES_PER_PAGE)

  return (
    <div className="main-panel site-container">
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {pageArticles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </div>
  )
}
