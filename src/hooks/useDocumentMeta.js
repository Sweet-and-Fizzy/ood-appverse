import { useEffect, useRef } from 'react'

/**
 * Updates document <meta> tags for SEO/social sharing.
 * Restores original values on unmount.
 *
 * @param {Object} meta - Key/value pairs where keys are OG property names
 * @param {string} meta.title - Page title (also sets document.title)
 * @param {string} meta.description - Meta description
 * @param {string} meta.og_title - og:title
 * @param {string} meta.og_description - og:description
 * @param {string} meta.og_image - og:image (absolute URL)
 * @param {string} meta.og_url - og:url (canonical URL for this content)
 */
export function useDocumentMeta(meta) {
  const originals = useRef(null)

  useEffect(() => {
    if (!meta) return

    // Save originals on first run
    if (!originals.current) {
      originals.current = {
        title: document.title,
        description: getMetaContent('description'),
        og_title: getOgContent('og:title'),
        og_description: getOgContent('og:description'),
        og_image: getOgContent('og:image') || getOgContent('og:image:url'),
        og_url: getOgContent('og:url'),
      }
    }

    if (meta.title) {
      document.title = meta.title
    }
    if (meta.description) {
      setMetaContent('description', meta.description)
    }
    if (meta.og_title) {
      setOgContent('og:title', meta.og_title)
    }
    if (meta.og_description) {
      setOgContent('og:description', meta.og_description)
    }
    if (meta.og_image) {
      setOgContent('og:image', meta.og_image)
      setOgContent('og:image:url', meta.og_image)
    }
    if (meta.og_url) {
      setOgContent('og:url', meta.og_url)
    }

    return () => {
      if (originals.current) {
        document.title = originals.current.title
        setMetaContent('description', originals.current.description)
        setOgContent('og:title', originals.current.og_title)
        setOgContent('og:description', originals.current.og_description)
        setOgContent('og:image', originals.current.og_image)
        setOgContent('og:image:url', originals.current.og_image)
        setOgContent('og:url', originals.current.og_url)
        originals.current = null
      }
    }
  }, [meta?.title, meta?.description, meta?.og_title, meta?.og_description, meta?.og_image, meta?.og_url])
}

function getMetaContent(name) {
  const el = document.querySelector(`meta[name="${name}"]`)
  return el?.getAttribute('content') || ''
}

function setMetaContent(name, value) {
  let el = document.querySelector(`meta[name="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('name', name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value || '')
}

function getOgContent(property) {
  const el = document.querySelector(`meta[property="${property}"]`)
  return el?.getAttribute('content') || ''
}

function setOgContent(property, value) {
  let el = document.querySelector(`meta[property="${property}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute('property', property)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value || '')
}
