import { useState, type FormEvent } from 'react'
import { profile } from '@/data/profile'

type FormStatus = 'idle' | 'sending' | 'success' | 'error'

const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<FormStatus>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const isConfigured = Boolean(accessKey)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!accessKey) {
      setStatus('error')
      setErrorMessage(
        import.meta.env.DEV
          ? 'Contact form is not connected yet. Add VITE_WEB3FORMS_ACCESS_KEY to a .env.local file (see .env.example).'
          : 'Unable to send your message right now. Please email me directly.',
      )
      return
    }

    setStatus('sending')
    setErrorMessage('')

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name,
          email,
          replyto: email,
          message,
          subject: `Portfolio contact from ${name}`,
          from_name: name,
          botcheck: '',
        }),
      })

      const data = (await response.json()) as { success: boolean; message?: string }

      if (!response.ok || !data.success) {
        throw new Error(data.message ?? 'Failed to send message.')
      }

      setStatus('success')
      setName('')
      setEmail('')
      setMessage('')
    } catch (error) {
      setStatus('error')
      setErrorMessage(
        error instanceof Error ? error.message : 'Something went wrong. Please try again.',
      )
    }
  }

  return (
    <div className="main-panel">
      <section className="mx-auto max-w-xl">
        <header className="mx-auto max-w-xl text-center">
          <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-accent">
            Contact Me
          </p>
          <h1 className="font-serif text-4xl text-ink sm:text-5xl">Get in touch!</h1>
        </header>

        <form onSubmit={handleSubmit} className="mx-auto mt-6 w-full max-w-xl space-y-5">
          <input
            type="checkbox"
            name="botcheck"
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden
          />

          <div>
            <label htmlFor="contact-name" className="form-label">
              Name
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              required
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              className="form-input"
              disabled={status === 'sending'}
            />
          </div>

          <div>
            <label htmlFor="contact-email" className="form-label">
              Email
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email"
              className="form-input"
              disabled={status === 'sending'}
            />
          </div>

          <div>
            <label htmlFor="contact-message" className="form-label">
              Message
            </label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message here..."
              className="form-textarea"
              disabled={status === 'sending'}
            />
          </div>

          {status === 'success' && (
            <p className="rounded-xl border border-accent/30 bg-accent-soft px-4 py-3 text-sm font-medium text-accent-dark dark:text-accent-light">
              Message sent! I will get back to you soon.
            </p>
          )}

          {status === 'error' && errorMessage && (
            <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-800 dark:bg-red-950/50 dark:text-red-200">
              {errorMessage}
              {!isConfigured && !import.meta.env.DEV && (
                <>
                  {' '}
                  <a href={`mailto:${profile.social.email}`} className="font-medium underline">
                    Email me directly
                  </a>
                  .
                </>
              )}
            </p>
          )}

          <div className="flex justify-center">
            <button
              type="submit"
              className="btn-primary min-w-[10rem] disabled:pointer-events-none disabled:opacity-60"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
          </div>
        </form>
      </section>
    </div>
  )
}
