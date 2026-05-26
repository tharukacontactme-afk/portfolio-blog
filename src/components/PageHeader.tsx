interface PageHeaderProps {
  eyebrow?: string
  title: string
  description?: string
}

export default function PageHeader({ eyebrow, title, description }: PageHeaderProps) {
  return (
    <header className="mb-12 border-b border-border pb-10">
      {eyebrow && (
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h1 className="font-serif text-4xl text-ink sm:text-5xl">{title}</h1>
      {description && (
        <p className="mt-4 max-w-2xl text-lg text-ink-muted">{description}</p>
      )}
    </header>
  )
}
