'use client'

import { useI18n } from '../lib/i18n'
import { urlFor } from '../lib/sanity'

export default function ServiceCard({
  title,
  description,
  icon,
  image,
  link,
  accentColor,
}) {
  const { loc, t } = useI18n()

  const borderColor =
    accentColor === 'green' ? 'var(--primary-green)' : 'var(--primary-red)'
  const linkColor = borderColor

  return (
    <a
      href={link || '#'}
      style={{
        display: 'block',
        background: 'white',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm)',
        transition: 'var(--transition)',
        borderBottom: `4px solid ${borderColor}`,
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)'
        e.currentTarget.style.boxShadow = '0 16px 40px rgba(0,0,0,0.13)'
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.transform = 'translateY(0)'
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
      }}
    >
      {/* Image area */}
      <div style={{ height: '180px', overflow: 'hidden' }}>
        {image ? (
          <img
            src={urlFor(image)}
            alt={loc(title)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        ) : icon ? (
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
              fontSize: '3.5rem',
            }}
          >
            {icon}
          </div>
        ) : null}
      </div>

      {/* Content area */}
      <div style={{ padding: '1.5rem' }}>
        <h3
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 800,
            marginBottom: '0.6rem',
          }}
        >
          {loc(title)}
        </h3>
        <p
          style={{
            fontSize: '0.88rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}
        >
          {loc(description)}
        </p>
        <div
          style={{
            marginTop: '1rem',
            color: linkColor,
            fontWeight: 700,
            fontSize: '0.85rem',
            textTransform: 'uppercase',
            letterSpacing: '1px',
          }}
        >
          {t('svc_link', 'Xem chi tiết →')}
        </div>
      </div>
    </a>
  )
}
