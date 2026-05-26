import { useState } from 'react'
import { toolLogoCandidates } from '@/lib/tool-images'

type ToolLogoProps = {
  logo: string
  name: string
}

export default function ToolLogo({ logo, name }: ToolLogoProps) {
  const base = logo.replace(/\.(svg|png|webp|jpe?g)$/i, '')
  const candidates = toolLogoCandidates(logo)
  const [index, setIndex] = useState(0)
  const src = candidates[index]
  const exhausted = index >= candidates.length

  if (exhausted) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-1 p-2 text-center">
        <span className="text-xs font-medium uppercase tracking-wide text-ink-muted">
          Upload logo
        </span>
        <span className="text-[10px] leading-tight text-ink-muted/80">
          {base} (png or svg)
        </span>
      </div>
    )
  }

  return (
    <img
      src={src}
      alt={`${name} logo`}
      width={120}
      height={120}
      className="max-h-full max-w-full object-contain"
      loading="lazy"
      onError={() => setIndex((current) => current + 1)}
    />
  )
}
