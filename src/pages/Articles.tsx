import ArticleCard from '@/components/ArticleCard'
import PageHeader from '@/components/PageHeader'
import { getAllArticles } from '@/lib/articles'
export default function Articles() {
  const articles = getAllArticles()

  return (
    <div className="main-panel mx-auto max-w-5xl">
      <PageHeader
        eyebrow="Writing"
        title="Articles"
        description="Essays and notes on building software, leading teams, and continuous learning."
      />

      <div className="grid gap-6 md:grid-cols-2">
        {articles.map((article) => (
          <ArticleCard key={article.slug} article={article} />
        ))}
      </div>
    </div>
  )
}
