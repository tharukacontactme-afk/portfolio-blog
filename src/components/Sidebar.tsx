import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import SocialLinks from '@/components/SocialLinks'
import ThemeToggle from '@/components/ThemeToggle'
import { profile } from '@/data/profile'

const navItems = [
  { to: '/', label: 'Home', end: true },
  { to: '/about', label: 'About' },
  { to: '/articles', label: 'Articles' },
  { to: '/tools', label: 'Technologies and Tools' },
  { to: '/contact', label: 'Contact Me' },
] as const

const desktopNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-colors duration-200',
    isActive
      ? 'bg-white/15 text-white'
      : 'text-sidebar-muted hover:bg-white/10 hover:text-white',
  ].join(' ')

const mobileNavLinkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'block rounded-md px-3 py-3 text-base font-medium transition-colors duration-200',
    isActive
      ? 'bg-white/15 text-white'
      : 'text-sidebar-muted hover:bg-white/10 hover:text-white',
  ].join(' ')

function MobileMenuIcon({ open }: { open: boolean }) {
  const line =
    'absolute left-0 block h-0.5 w-5 rounded-full bg-current transition-all duration-500 ease-out'

  return (
    <span className="mobile-menu-icon relative block h-5 w-5" aria-hidden>
      <span
        className={
          open
            ? `${line} top-[9px] rotate-45`
            : `${line} top-0`
        }
      />
      <span
        className={
          open
            ? `${line} top-[9px] scale-x-0 opacity-0`
            : `${line} top-[9px] opacity-100`
        }
      />
      <span
        className={
          open
            ? `${line} top-[9px] -rotate-45`
            : `${line} top-[18px]`
        }
      />
    </span>
  )
}

export default function Sidebar() {
  const year = new Date().getFullYear()
  const location = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen((open) => !open)

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!menuOpen) return

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false)
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [menuOpen])

  return (
    <>
      {/* Mobile expandable header */}
      <header
        className={[
          'sticky top-0 z-40 bg-sidebar text-white transition-shadow duration-500 ease-out lg:hidden',
          menuOpen ? 'shadow-lg shadow-black/20' : 'border-b border-white/10',
        ].join(' ')}
      >
        <div className="flex items-center gap-3 px-4 py-3">
          <button
            type="button"
            onClick={toggleMenu}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-white transition-colors duration-200 hover:bg-white/10"
          >
            <MobileMenuIcon open={menuOpen} />
          </button>

          <NavLink
            to="/"
            className="min-w-0 flex-1 truncate font-serif text-lg text-white transition-opacity duration-300"
            onClick={() => setMenuOpen(false)}
          >
            {profile.name}
          </NavLink>

          <ThemeToggle variant="sidebar" />
        </div>

        <div
          id="mobile-nav"
          className="mobile-menu-panel"
          data-open={menuOpen}
          aria-hidden={!menuOpen}
        >
          <div className="mobile-menu-panel__inner">
            <div className="mobile-menu-content max-h-[min(70vh,32rem)] overflow-y-auto border-t border-white/10">
              <div className="flex items-center gap-3 px-4 py-4">
                <img
                  src={profile.avatar}
                  alt={profile.avatarAlt}
                  width={56}
                  height={56}
                  className="h-14 w-14 shrink-0 rounded-full border-2 border-white/20 object-cover"
                />
                <div className="min-w-0 text-left">
                  <p className="truncate font-serif text-base text-white">{profile.name}</p>
                  <p className="mt-0.5 text-sm font-medium text-white/90">{profile.role}</p>
                  <p className="mt-1 text-xs leading-relaxed text-sidebar-muted">
                    {profile.tagline}
                  </p>
                </div>
              </div>

              <nav className="px-3 pb-2" aria-label="Main navigation">
                <ul className="space-y-1">
                  {navItems.map((item) => (
                    <li key={item.to}>
                      <NavLink
                        to={item.to}
                        end={'end' in item ? item.end : undefined}
                        className={mobileNavLinkClass}
                        onClick={() => setMenuOpen(false)}
                      >
                        {item.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="border-t border-white/10 px-4 py-4">
                <SocialLinks variant="sidebar" className="justify-center gap-3 text-white/70" />
                <p className="mt-4 text-center text-[10px] leading-relaxed text-sidebar-muted">
                  Copyright © {year} {profile.name}. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Desktop sidebar */}
      <aside className="relative hidden w-full flex-col bg-sidebar text-white lg:sticky lg:top-0 lg:flex lg:h-screen lg:overflow-x-hidden lg:overflow-y-auto">
        <div className="absolute right-6 top-6 z-10">
          <ThemeToggle variant="sidebar" />
        </div>

        <div className="flex flex-col items-center px-8 pb-4 pt-8 text-center">
          <NavLink to="/" className="block shrink-0">
            <img
              src={profile.avatar}
              alt={profile.avatarAlt}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full border-2 border-white/20 object-cover shadow-lg"
            />
          </NavLink>

          <SocialLinks variant="sidebar" className="mt-4 justify-center gap-3 text-white/70" />

          <h1 className="mt-4 font-serif text-2xl font-normal leading-tight text-white">
            {profile.name}
          </h1>
          <p className="mt-1.5 text-sm font-medium text-white/90">{profile.role}</p>
          <p className="mt-2 line-clamp-3 text-xs leading-relaxed text-sidebar-muted">
            {profile.tagline}
          </p>
        </div>

        <nav
          className="flex flex-col items-stretch gap-3 border-t border-white/10 px-6 py-4"
          aria-label="Main navigation"
        >
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={'end' in item ? item.end : undefined}
              className={desktopNavLinkClass}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <div className="mt-auto border-t border-white/10 px-8 py-5">
          <p className="text-xs text-sidebar-muted">
            Copyright © {year} {profile.name}. All rights reserved.
          </p>
        </div>
      </aside>
    </>
  )
}
