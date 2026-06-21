import { Link } from 'react-router-dom'

type PaginationProps = {
  currentPage: number
  totalPages: number
  basePath?: string
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath = '/articles',
}: PaginationProps) {
  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, index) => index + 1)

  function pageHref(page: number) {
    return page === 1 ? basePath : `${basePath}?page=${page}`
  }

  return (
    <nav
      className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-border pt-8 sm:flex-row"
      aria-label="Pagination"
    >
      <div className="flex items-center gap-2">
        {pages.map((page) => (
          <Link
            key={page}
            to={pageHref(page)}
            aria-current={page === currentPage ? 'page' : undefined}
            className={[
              'flex h-9 w-9 items-center justify-center text-sm font-semibold transition-colors',
              page === currentPage
                ? 'bg-accent text-white'
                : 'text-ink-muted hover:text-accent',
            ].join(' ')}
          >
            {page}
          </Link>
        ))}
      </div>

      {currentPage < totalPages && (
        <Link
          to={pageHref(currentPage + 1)}
          className="inline-flex items-center gap-2 border border-border px-5 py-2 text-sm font-semibold uppercase tracking-wide text-ink transition-colors hover:border-ink hover:bg-surface"
        >
          Next
          <span aria-hidden>›</span>
        </Link>
      )}
    </nav>
  )
}
