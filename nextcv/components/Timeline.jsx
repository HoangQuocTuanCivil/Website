'use client'

import { useI18n } from '../lib/i18n'

export default function Timeline({ items }) {
  const { loc } = useI18n()

  if (!items || items.length === 0) return null

  return (
    <div className="timeline">
      {items.map((item, index) => {
        const itemClass =
          item.accentColor === 'green'
            ? 'timeline-item green'
            : 'timeline-item'

        return (
          <div key={index} className={itemClass}>
            <span className="timeline-date">{loc(item.date)}</span>
            <h3 className="timeline-role">{loc(item.role)}</h3>
            <p className="timeline-company">{loc(item.company)}</p>
            <p className="timeline-desc">{loc(item.description)}</p>
          </div>
        )
      })}
    </div>
  )
}
