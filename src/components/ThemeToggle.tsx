import { useTheme } from '@/context/ThemeContext'

type ThemeToggleProps = {
  variant?: 'default' | 'sidebar'
}

export default function ThemeToggle({ variant = 'default' }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  const buttonClass =
    variant === 'sidebar'
      ? 'flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/25 text-sidebar-muted transition-all duration-200 hover:border-white/50 hover:bg-white/10 hover:text-white'
      : 'flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface-elevated text-ink-muted shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-accent-soft hover:text-accent hover:shadow-md'

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={buttonClass}
    >
      {isDark ? (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden
        >
          <circle cx="12" cy="12" r="4" />
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
        </svg>
      ) : (
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="h-5 w-5"
          aria-hidden
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
    </button>
  )
}
