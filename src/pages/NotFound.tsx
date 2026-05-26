import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="main-panel mx-auto max-w-5xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-accent">404</p>
      <h1 className="mt-3 font-serif text-4xl text-ink">Page not found</h1>
      <p className="mt-4 text-ink-muted">
        The page you are looking for does not exist or has been moved.
      </p>
      <Link to="/" className="btn-primary mt-8">
        Go home
      </Link>
    </div>
  )
}
