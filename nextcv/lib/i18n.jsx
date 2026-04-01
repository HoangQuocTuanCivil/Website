'use client'

import { createContext, useContext, useState, useEffect, useCallback } from 'react'

const I18nContext = createContext()

// Import translations — will be loaded from /js/data/locales.js format
// For now, we define the default Vietnamese and let the full locales load client-side
const defaultLang = 'vi'

export function I18nProvider({ children, translations }) {
  const [lang, setLang] = useState(defaultLang)

  useEffect(() => {
    const saved = localStorage.getItem('site_lang')
    if (saved) setLang(saved)
  }, [])

  const changeLang = useCallback((newLang) => {
    setLang(newLang)
    localStorage.setItem('site_lang', newLang)
  }, [])

  const t = useCallback((key, fallback) => {
    if (!translations) return fallback || key
    const langData = translations[lang] || translations[defaultLang]
    return langData?.[key] || fallback || key
  }, [lang, translations])

  // For Sanity localized fields: { vi: '...', en: '...', zh: '...', ja: '...' }
  const loc = useCallback((obj) => {
    if (!obj) return ''
    return obj[lang] || obj[defaultLang] || ''
  }, [lang])

  return (
    <I18nContext.Provider value={{ lang, changeLang, t, loc }}>
      {children}
    </I18nContext.Provider>
  )
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
