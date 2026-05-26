import { useState } from 'react'
import { brandLogoCandidates } from '@/lib/public-images'
import type { Brand } from '@/data/brands'

type BrandLogoProps = {
  logo: string
  name: string
}

export default function BrandLogo({ logo, name }: BrandLogoProps) {
  const base = logo.replace(/\.(svg|png|webp|jpe?g)$/i, '')
  const candidates = brandLogoCandidates(logo)
  const [index, setIndex] = useState(0)
  const src = candidates[index]
  const exhausted = index >= candidates.length

  if (exhausted) {
    return (
      <span className="text-xs text-ink-muted" aria-hidden>
        {base}.png
      </span>
    )
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      className="max-h-full max-w-full object-contain"
      loading="lazy"
      onError={() => setIndex((current) => current + 1)}
    />
  )
}

type BrandGalleryProps = {
  brands: Brand[]
}

export function BrandGallery({ brands }: BrandGalleryProps) {
  if (brands.length === 0) {
    return (
      <p className="mt-6 text-sm text-ink-muted">
        Add brands in <code className="rounded bg-surface px-1.5 py-0.5 text-ink">src/data/brands.ts</code>{' '}
        and upload logos to <code className="rounded bg-surface px-1.5 py-0.5 text-ink">public/images/brands/</code>.
      </p>
    )
  }

  return (
    <ul className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-5 md:grid-cols-4 lg:grid-cols-5">
      {brands.map((brand) => (
        <li key={brand.logo}>
          <BrandCard brand={brand} />
        </li>
      ))}
    </ul>
  )
}

function BrandCard({ brand }: { brand: Brand }) {
  const image = (
    <div className="logo-tile">
      <BrandLogo logo={brand.logo} name={brand.name} />
    </div>
  )

  if (brand.url) {
    return (
      <a
        href={brand.url}
        target="_blank"
        rel="noreferrer"
        className="block outline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/40"
        aria-label={brand.name}
      >
        {image}
      </a>
    )
  }

  return image
}
