import { Link } from 'react-router-dom'
import SocialLinks from '@/components/SocialLinks'
import { profile } from '@/data/profile'

const footerLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
] as const

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="site-footer w-full shrink-0 border-t border-border bg-surface-elevated">
      <div className="site-container site-footer__inner">
        <p className="site-footer__copyright">
          © {year} {profile.name}. All rights reserved.
        </p>

        <nav className="site-footer__nav" aria-label="Footer navigation">
          <ul>
            {footerLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className="site-footer__link">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <SocialLinks variant="footer" className="site-footer__social" />
      </div>
    </footer>
  )
}
