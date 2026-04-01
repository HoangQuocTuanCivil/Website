'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useI18n } from '../lib/i18n'

const NAV_LINKS = [
  { href: '/', labelKey: 'nav.home', fallback: 'Trang chủ' },
  { href: '/about', labelKey: 'nav.about', fallback: 'Về tôi' },
  { href: '/services', labelKey: 'nav.services', fallback: 'Dịch vụ' },
  { href: '/projects', labelKey: 'nav.projects', fallback: 'Dự án' },
]

const LANGUAGES = [
  { code: 'vi', label: 'VI', flag: '/styles/icon/ViietnamLanguage.png' },
  { code: 'en', label: 'EN', flag: '/styles/icon/EnglishLanguage.png' },
  { code: 'zh', label: '中文', flag: '/styles/icon/ChinaLanguage.png' },
  { code: 'ja', label: 'JP', flag: '/styles/icon/JapanLanguage.png' },
]

export default function Navbar() {
  const pathname = usePathname()
  const { lang, changeLang, t } = useI18n()
  const [menuOpen, setMenuOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const langRef = useRef(null)

  const currentLang = LANGUAGES.find((l) => l.code === lang) || LANGUAGES[0]

  // Close language dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (langRef.current && !langRef.current.contains(e.target)) {
        setLangOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  return (
    <nav className="navbar" style={{ boxShadow: 'var(--shadow-md)' }}>
      <div className="container nav-container">
        {/* Logo */}
        <Link href="/" className="logo">
          <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
            <div><span className="logo-red">BIM</span><span className="logo-green">Innovator</span></div>
            <span style={{ fontSize: '0.75rem', color: 'var(--primary-red)', fontFamily: 'var(--font-body)', marginTop: '4px' }}>
              {t('nav.subtitle', 'BIM & Digital Twin')}
            </span>
          </div>
        </Link>

        {/* Nav links */}
        <div className={`nav-menu${menuOpen ? ' active' : ''}`}>
          <ul className="nav-list">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`nav-link${pathname === link.href ? ' active' : ''}`}
                >
                  {t(link.labelKey, link.fallback)}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Language selector */}
        <div className="custom-lang-selector" ref={langRef}>
          <button
            className="lang-current"
            onClick={() => setLangOpen((prev) => !prev)}
            type="button"
          >
            <img className="lang-flag" src={currentLang.flag} alt={currentLang.label} />
            {currentLang.label}
          </button>
          {langOpen && (
            <ul className="lang-options">
              {LANGUAGES.map((l) => (
                <li key={l.code}>
                  <button
                    className="lang-option"
                    onClick={() => {
                      changeLang(l.code)
                      setLangOpen(false)
                    }}
                    type="button"
                  >
                    <img className="lang-flag" src={l.flag} alt={l.label} />
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Hamburger toggle */}
        <button
          className={`hamburger${menuOpen ? ' active' : ''}`}
          onClick={() => setMenuOpen((prev) => !prev)}
          type="button"
          aria-label="Toggle menu"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>
      </div>
    </nav>
  )
}
