import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import ThemeToggle from '@/components/ThemeToggle'
import { profile } from '@/data/profile'

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/articles', label: 'Articles' },
] as const

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'relative whitespace-nowrap px-1 py-2 text-sm font-semibold text-ink transition-colors hover:text-ink/80',
    isActive
      ? 'after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-accent'
      : '',
  ].join(' ')

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-md px-3 py-2.5 text-base font-semibold transition-colors',
    isActive ? 'bg-accent-soft text-ink' : 'text-ink-muted hover:bg-surface hover:text-ink',
  ].join(' ')

function MobileMenuIcon({ open }: { open: boolean }) {
  const line =
    'absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-300 ease-out'

  return (
    <span className="relative block h-5 w-5" aria-hidden>
      <span className={open ? `${line} top-[9px] rotate-45` : `${line} top-0`} />
      <span
        className={
          open ? `${line} top-[9px] scale-x-0 opacity-0` : `${line} top-[9px] opacity-100`
        }
      />
      <span className={open ? `${line} top-[9px] -rotate-45` : `${line} top-[18px]`} />
    </span>
  )
}

export default function Header() {
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-surface-elevated/95 backdrop-blur-sm">
      <div className="site-header__bar">
        <Link to="/" className="site-header__brand">
          <span className="truncate text-sm font-bold uppercase tracking-wide text-ink sm:text-base">
            {profile.name}
          </span>
        </Link>

        <nav className="site-header__nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink key={item.to} to={item.to} className={navLinkClass}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="site-header__actions">
          <Link to="/contact" className="btn-cta hidden md:inline-flex">
            Contact Me
          </Link>
          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="site-header__menu-btn md:hidden"
          >
            <MobileMenuIcon open={menuOpen} />
          </button>
          <ThemeToggle />
        </div>
      </div>

      <div
        id="mobile-nav"
        className={[
          'overflow-hidden border-t border-border transition-all duration-300 md:hidden',
          menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 border-t-transparent opacity-0',
        ].join(' ')}
        aria-hidden={!menuOpen}
      >
        <nav className="site-container space-y-1 py-3" aria-label="Mobile navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={mobileNavLinkClass}
              onClick={() => setMenuOpen(false)}
            >
              {item.label}
            </NavLink>
          ))}
          <Link
            to="/contact"
            className="btn-cta mt-2 w-full justify-center"
            onClick={() => setMenuOpen(false)}
          >
            Contact Me
          </Link>
        </nav>
      </div>
    </header>
  )
}
