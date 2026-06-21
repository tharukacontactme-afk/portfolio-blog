import { useState } from 'react'
import { articleCoverCandidates } from '@/lib/article-cover'

type ArticleCoverProps = {
  cover?: string
  slug: string
  title: string
  /** Card thumbnails vs article hero */
  variant?: 'card' | 'hero'
  className?: string
}

function CoverPlaceholder({ title, variant }: { title: string; variant: 'card' | 'hero' }) {
  const initial = title.trim().charAt(0).toUpperCase() || '?'
  const heightClass = variant === 'hero' ? 'min-h-48 sm:min-h-64' : 'min-h-[140px]'

  return (
    <div
      className={`flex ${heightClass} w-full items-center justify-center bg-gradient-to-br from-accent-soft via-surface-elevated to-accent/20`}
      aria-hidden
    >
      <span className="font-serif text-5xl text-accent/40 sm:text-6xl">{initial}</span>
    </div>
  )
}

export default function ArticleCover({
  cover,
  slug,
  title,
  variant = 'card',
  className = '',
}: ArticleCoverProps) {
  const candidates = articleCoverCandidates(cover, slug)
  const [index, setIndex] = useState(0)
  const src = candidates[index]
  const exhausted = index >= candidates.length

  const aspectClass =
    variant === 'hero' ? 'aspect-[21/9] sm:aspect-[2/1]' : 'aspect-[16/10] sm:aspect-[2/1]'

  if (exhausted) {
    return (
      <div className={`overflow-hidden rounded-t-lg ${className}`}>
        <CoverPlaceholder title={title} variant={variant} />
      </div>
    )
  }

  return (
    <div className={`overflow-hidden ${variant === 'card' ? 'rounded-t-lg' : 'rounded-2xl'} ${className}`}>
      <div className={`relative ${aspectClass} w-full bg-surface`}>
        <img
          src={src}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          loading="lazy"
          decoding="async"
          onError={() => setIndex((current) => current + 1)}
        />
      </div>
    </div>
  )
}
