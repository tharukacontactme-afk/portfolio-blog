import { useEffect } from 'react'

type PageMetaOptions = {
  title: string
  description?: string
  image?: string
  path?: string
}

const SITE_URL = import.meta.env.VITE_SITE_URL as string | undefined

function setMetaTag(attribute: 'name' | 'property', key: string, content: string) {
  const selector = `meta[${attribute}="${key}"]`
  let element = document.querySelector(selector) as HTMLMetaElement | null
  if (!element) {
    element = document.createElement('meta')
    element.setAttribute(attribute, key)
    document.head.appendChild(element)
  }
  element.setAttribute('content', content)
}

function removeMetaTag(attribute: 'name' | 'property', key: string) {
  document.querySelector(`meta[${attribute}="${key}"]`)?.remove()
}

export function usePageMeta({ title, description, image, path }: PageMetaOptions) {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    if (description) {
      setMetaTag('name', 'description', description)
      setMetaTag('property', 'og:description', description)
      setMetaTag('name', 'twitter:description', description)
    }

    setMetaTag('property', 'og:title', title)
    setMetaTag('name', 'twitter:title', title)
    setMetaTag('property', 'og:type', 'article')

    if (SITE_URL && path) {
      const url = `${SITE_URL.replace(/\/$/, '')}${path.startsWith('/') ? path : `/${path}`}`
      setMetaTag('property', 'og:url', url)
    }

    if (image) {
      const imageUrl =
        image.startsWith('http') || !SITE_URL
          ? image
          : `${SITE_URL.replace(/\/$/, '')}${image.startsWith('/') ? image : `/${image}`}`
      setMetaTag('property', 'og:image', imageUrl)
      setMetaTag('name', 'twitter:card', 'summary_large_image')
      setMetaTag('name', 'twitter:image', imageUrl)
    } else {
      removeMetaTag('property', 'og:image')
      removeMetaTag('name', 'twitter:image')
      setMetaTag('name', 'twitter:card', 'summary')
    }

    return () => {
      document.title = previousTitle
    }
  }, [title, description, image, path])
}
