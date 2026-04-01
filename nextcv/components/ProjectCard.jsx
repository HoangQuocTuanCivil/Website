'use client'

import { useState } from 'react'
import { useI18n } from '../lib/i18n'
import { urlFor } from '../lib/sanity'

export default function ProjectCard({ project }) {
  const { loc } = useI18n()
  const [hovered, setHovered] = useState(false)

  const {
    title, description, category, image, badge, badgeColor,
    categoryLabel, categoryLabelColor, tags, isWide,
  } = project

  const badgeBg = badgeColor === 'green' ? 'var(--primary-green)'
    : badgeColor === 'blue' ? '#2563eb'
    : 'var(--primary-red)'

  const catColor = categoryLabelColor === 'green' ? 'var(--primary-green)' : 'var(--primary-red)'

  return (
    <div
      data-category={category || ''}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        cursor: 'pointer',
        ...(isWide ? { gridColumn: 'span 2' } : {}),
      }}
    >
      {image && (
        <div style={{ position: 'relative', overflow: 'hidden' }}>
          <img
            src={urlFor(image)}
            alt={loc(title)}
            loading="lazy"
            style={{
              width: '100%',
              height: isWide ? 260 : 220,
              objectFit: 'cover',
              display: 'block',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
          />
          {badge && (
            <span style={{
              position: 'absolute', top: 12, left: 12,
              background: badgeBg, color: 'white',
              fontSize: '0.7rem', fontWeight: 700,
              padding: '3px 10px', borderRadius: 20,
              letterSpacing: 1, textTransform: 'uppercase',
            }}>
              {loc(badge)}
            </span>
          )}
        </div>
      )}
      <div style={{ padding: '1.2rem 1.4rem' }}>
        {categoryLabel && (
          <div style={{
            fontSize: '0.75rem', fontWeight: 700,
            color: catColor, textTransform: 'uppercase',
            letterSpacing: 1, marginBottom: '0.3rem',
          }}>
            {loc(categoryLabel)}
          </div>
        )}
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem', fontWeight: 800,
          marginBottom: '0.5rem', color: 'var(--text-color)',
          lineHeight: 1.3,
        }}>
          {loc(title)}
        </h3>
        {description && (
          <p style={{
            fontSize: '0.82rem', color: 'var(--text-muted)',
            lineHeight: 1.6, marginBottom: tags?.length ? '0.8rem' : 0,
          }}>
            {loc(description)}
          </p>
        )}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <span key={tag} style={{
                fontSize: '0.72rem', fontWeight: 600,
                padding: '2px 10px', borderRadius: 20,
                background: 'var(--bg-color-alt, #f0f0f0)',
                color: 'var(--text-muted)',
              }}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
