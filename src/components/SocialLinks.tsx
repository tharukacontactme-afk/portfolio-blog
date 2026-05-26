import type { ReactNode } from 'react'
import { profile } from '@/data/profile'

type SocialKey = keyof typeof profile.social

const icons: Record<SocialKey, ReactNode> = {
  email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75" />
    </svg>
  ),
  phone: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className="h-6 w-6" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 0 0 2.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 0 1-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 0 0-1.091-.852H4.5A2.25 2.25 0 0 0 2.25 4.5v2.25Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 4.126 0 2.063 2.063 0 0 1-2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
}

const labels: Record<SocialKey, string> = {
  email: 'Email',
  phone: 'Phone',
  linkedin: 'LinkedIn',
}

function socialHref(key: SocialKey, value: string): string {
  if (key === 'email') return value.startsWith('mailto:') ? value : `mailto:${value}`
  if (key === 'phone') {
    if (value.startsWith('tel:')) return value
    const digits = value.replace(/\D/g, '')
    return digits ? `tel:+${digits.replace(/^0+/, '')}` : `tel:${value}`
  }
  return value
}

function isExternalLink(key: SocialKey): boolean {
  return key === 'linkedin'
}

type SocialLinksProps = {
  className?: string
  variant?: 'default' | 'sidebar'
}

export default function SocialLinks({
  className = '',
  variant = 'default',
}: SocialLinksProps) {
  const links = (Object.keys(profile.social) as SocialKey[]).filter(
    (key) => profile.social[key],
  )

  const linkClass =
    variant === 'sidebar'
      ? 'flex h-9 w-9 items-center justify-center rounded-full border border-white/25 text-current transition-all duration-200 hover:border-white/50 hover:bg-white/10 hover:text-white [&_svg]:h-4 [&_svg]:w-4'
      : 'text-current transition-all duration-200 hover:-translate-y-0.5 hover:text-accent-dark hover:opacity-100'

  return (
    <ul className={`flex flex-wrap items-center gap-5 ${className}`}>
      {links.map((key) => (
        <li key={key}>
          <a
            href={socialHref(key, profile.social[key])}
            {...(isExternalLink(key)
              ? { target: '_blank', rel: 'noreferrer' }
              : {})}
            aria-label={labels[key]}
            className={linkClass}
          >
            {icons[key]}
          </a>
        </li>
      ))}
    </ul>
  )
}
