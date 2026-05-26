import { Link } from 'react-router-dom'
import ArticleCard from '@/components/ArticleCard'
import { profile } from '@/data/profile'
import { getFeaturedArticles } from '@/lib/articles'

export default function Home() {
  const featured = getFeaturedArticles(3)

  return (
    <div className="main-panel">
      <section>
        <p className="text-sm font-semibold uppercase tracking-widest text-accent">
          Welcome
        </p>
        <h1 className="mt-3 max-w-2xl font-serif text-4xl leading-tight text-ink sm:text-5xl">
          Hi, I&apos;m {profile.name.split(' ')[0]}
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-muted">
          {profile.tagline}
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/about" className="btn-primary">
            About me
          </Link>
          <Link to="/articles" className="btn-secondary">
            View articles
          </Link>
        </div>
      </section>

      <section className="mt-14 border-t border-border pt-12">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="font-serif text-3xl text-ink">Latest writing</h2>
            <p className="mt-2 text-ink-muted">Recent thoughts on engineering and Industry Automation.</p>
          </div>
          <Link
            to="/articles"
            className="hidden text-sm font-semibold text-accent transition hover:text-accent-dark hover:underline sm:inline"
          >
            See all
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((article) => (
            <ArticleCard key={article.slug} article={article} />
          ))}
        </div>
      </section>
    </div>
  )
}
