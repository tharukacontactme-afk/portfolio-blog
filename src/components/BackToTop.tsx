import { useEffect, useState } from 'react'

const SCROLL_THRESHOLD = 320

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={[
        'fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full',
        'bg-gradient-to-r from-accent to-accent-light text-white shadow-lg shadow-accent/30',
        'transition-all duration-200 hover:-translate-y-0.5 hover:from-accent-dark hover:to-accent hover:shadow-xl hover:shadow-accent/40',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-elevated',
        visible ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-2 opacity-0',
      ].join(' ')}
    >
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.25" className="h-5 w-5" aria-hidden>
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75 12 8.25l7.5 7.5" />
      </svg>
    </button>
  )
}
