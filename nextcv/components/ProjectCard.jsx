'use client'

import { useI18n } from '../lib/i18n'
import { urlFor } from '../lib/sanity'

export default function ProjectCard({ project }) {
  const { loc } = useI18n()

  const {
    title,
    description,
    category,
    image,
    badge,
    badgeColor,
    categoryLabel,
    categoryLabelColor,
    tags,
    isWide,
  } = project

  const badgeClass = ['pcard-badge', badgeColor].filter(Boolean).join(' ')
  const catClass = ['pcard-cat', categoryLabelColor].filter(Boolean).join(' ')
  const cardClass = isWide ? 'pcard wide' : 'pcard'

  return (
    <div className={cardClass} data-category={category || ''}>
      {image && (
        <div className="pcard-img">
          <img
            src={urlFor(image)}
            alt={loc(title)}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
          {badge && <span className={badgeClass}>{loc(badge)}</span>}
        </div>
      )}
      <div className="pcard-body">
        {categoryLabel && (
          <span className={catClass}>{loc(categoryLabel)}</span>
        )}
        <h3 className="pcard-title">{loc(title)}</h3>
        <p className="pcard-desc">{loc(description)}</p>
        {tags && tags.length > 0 && (
          <div className="pcard-meta">
            {tags.map((tag) => (
              <span key={tag} className="pcard-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
