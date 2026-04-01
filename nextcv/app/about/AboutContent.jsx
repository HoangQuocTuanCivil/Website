'use client'

import { useState } from 'react'
import { useI18n } from '../../lib/i18n'
import { urlFor } from '../../lib/sanity'

export default function AboutContent({ data }) {
  const { t, loc } = useI18n()
  const d = data || {}

  const name = d.name || 'HOÀNG QUỐC TUẤN'
  const jobTitle = d.jobTitle ? loc(d.jobTitle) : 'KS. | CTO | BIM Expert'
  const badge = d.heroBadge ? loc(d.heroBadge) : t('ab.badge', 'Chief Technology Officer')
  const heroTitle = d.heroTitle ? loc(d.heroTitle) : t('ab.hero_title', 'Kiến tạo tương lai <br>với <span class="red">BIM</span> & <span class="green">Digital Twin</span>')
  const heroDesc = d.heroDescription ? loc(d.heroDescription) : t('ab.hero_desc', 'Hơn 8 năm kinh nghiệm trong lĩnh vực kỹ thuật xây dựng công trình giao thông và công nghệ thông tin.')
  const avatarUrl = d.avatar ? urlFor(d.avatar) : '/assets/anh_dai_dien.jpg'

  const stats = d.heroStats?.length > 0 ? d.heroStats : [
    { number: '8+', label: { vi: 'Năm kinh nghiệm', en: 'Years Experience' } },
    { number: '150+', label: { vi: 'Dự án hoàn thành', en: 'Projects Completed' } },
    { number: '500+', label: { vi: 'Học viên đào tạo', en: 'Trainees Taught' } },
  ]

  const career = d.careerTimeline?.length > 0 ? d.careerTimeline : []
  const education = d.education?.length > 0 ? d.education : []
  const skills = d.skillCategories?.length > 0 ? d.skillCategories : []

  const careerLeft = career.slice(0, Math.ceil(career.length / 2))
  const careerRight = career.slice(Math.ceil(career.length / 2))

  return (
    <main className="about-page">
      {/* ==================== HERO BANNER ==================== */}
      <section className="about-hero">
        <div className="container about-hero-grid">
          <div className="avatar-wrapper">
            <div className="avatar-ring">
              <img src={avatarUrl} alt={name} />
            </div>
            <div className="avatar-name">{name}</div>
            <div className="avatar-title">{jobTitle}</div>
          </div>

          <div className="about-hero-content">
            <div className="hero-badge">{badge}</div>
            <h1 dangerouslySetInnerHTML={{ __html: heroTitle }} />
            <p className="about-hero-desc" dangerouslySetInnerHTML={{ __html: heroDesc }} />
            <div className="hero-stats">
              {stats.map((stat, i) => (
                <div key={stat._key || i} className="hero-stat">
                  <div className="hero-stat-num">{stat.number}</div>
                  <div className="hero-stat-label">{loc(stat.label)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== HÀNH TRÌNH SỰ NGHIỆP ==================== */}
      {career.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>{t('ab.career_label', 'Career Path')}</p>
            <h2 className="section-heading" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('ab.career_heading', 'Hành trình <span class="highlight-red">Sự nghiệp</span>') }} />
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
              <div className="timeline">
                {careerLeft.map((item, i) => (
                  <div key={item._key || i} className={`timeline-item${item.accentColor === 'green' ? ' green' : ''}`}>
                    <div className="timeline-date">{loc(item.date)}</div>
                    <div className="timeline-role">{loc(item.role)}</div>
                    <div className="timeline-company">{loc(item.company)}</div>
                    <div className="timeline-desc">{loc(item.description)}</div>
                  </div>
                ))}
              </div>
              <div className="timeline">
                {careerRight.map((item, i) => (
                  <div key={item._key || i} className={`timeline-item${item.accentColor === 'green' ? ' green' : ''}`}>
                    <div className="timeline-date">{loc(item.date)}</div>
                    <div className="timeline-role">{loc(item.role)}</div>
                    <div className="timeline-company">{loc(item.company)}</div>
                    <div className="timeline-desc">{loc(item.description)}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ==================== HỌC VẤN ==================== */}
      {education.length > 0 && (
        <section className="section-padding bg-alt">
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>{t('ab.edu_label', 'Education')}</p>
            <h2 className="section-heading" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('ab.edu_heading', 'Nền tảng <span class="highlight-green">Học vấn</span>') }} />
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(education.length, 3)}, 1fr)`, gap: '2rem' }}>
              {education.map((item, i) => (
                <div key={item._key || i} className="timeline">
                  <div className={`timeline-item${item.accentColor === 'green' ? ' green' : ''}`}>
                    <div className="timeline-date">{loc(item.degree)}</div>
                    <div className="timeline-role">{loc(item.major)}</div>
                    <div className="timeline-company">{loc(item.school)}</div>
                    <div className="timeline-desc">{loc(item.description)}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== KỸ NĂNG ==================== */}
      {skills.length > 0 && (
        <section className="section-padding">
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>{t('ab.skill_label', 'Chuyên môn')}</p>
            <h2 className="section-heading" style={{ textAlign: 'center' }} dangerouslySetInnerHTML={{ __html: t('ab.skill_heading', 'Kỹ năng & <span class="highlight-red">Công cụ</span>') }} />
            <div className="skills-grid">
              {skills.map((cat, i) => (
                <div key={cat._key || i} className="skill-category">
                  <div className="skill-cat-title">{loc(cat.categoryName)}</div>
                  <div className="skill-tags">
                    {(cat.skills || []).map((skill, si) => (
                      <span key={si} className="skill-tag">{skill}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ==================== LIÊN HỆ ==================== */}
      <ContactSection t={t} />
    </main>
  )
}

function ContactSection({ t }) {
  const [modal, setModal] = useState(null)

  function copyText(text, btnRef) {
    navigator.clipboard.writeText(text)
    if (btnRef) {
      const orig = btnRef.textContent
      btnRef.textContent = 'Copied!'
      setTimeout(() => { btnRef.textContent = orig }, 1500)
    }
  }

  return (
    <>
      <section className="contact-section">
        <div className="container">
          <p className="section-label" style={{ textAlign: 'center', color: 'rgba(255,255,255,0.5)' }}>{t('ab.contact_label', 'Kết nối')}</p>
          <h2 className="section-heading" style={{ textAlign: 'center', color: 'white' }} dangerouslySetInnerHTML={{ __html: t('ab.contact_heading', 'Liên hệ <span style="color:var(--primary-green)">Trực tiếp</span>') }} />
          <div className="contact-grid">
            <div className="contact-card" style={{ cursor: 'pointer' }} onClick={() => setModal('phone')}>
              <span className="contact-icon">📞</span>
              <div className="contact-info">
                <div className="contact-label">{t('ab.phone_label', 'Điện thoại')}</div>
                <div className="contact-value">+84 399 762 377</div>
              </div>
            </div>

            <div className="contact-card" style={{ cursor: 'pointer' }} onClick={() => setModal('email')}>
              <span className="contact-icon">✉️</span>
              <div className="contact-info">
                <div className="contact-label">Email / Gmail</div>
                <div className="contact-value">hoangquoctuan1395@gmail.com</div>
              </div>
            </div>

            <a href="https://www.youtube.com/@quoctuanhoang759/videos" target="_blank" rel="noopener noreferrer" className="contact-card youtube">
              <svg viewBox="0 0 24 24" fill="currentColor" style={{ width: 28, height: 28, color: '#FF0000', flexShrink: 0 }}>
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.546 12 3.546 12 3.546s-7.505 0-9.377.504A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.504 9.376.504 9.376.504s7.505 0 9.377-.504a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
              <div className="contact-info">
                <div className="contact-label">YouTube</div>
                <div className="contact-value">{t('ab.yt_label', 'Kênh YouTube')}</div>
              </div>
            </a>

            <div className="contact-card zalo" style={{ cursor: 'pointer' }} onClick={() => setModal('zalo')}>
              <div className="zalo-qr-wrapper">
                <span className="contact-icon">💬</span>
                <div className="contact-info">
                  <div className="contact-label">ZALO — QUÉT QR</div>

                </div>
                <img src="/assets/ZaloQR.jpg" alt="Zalo QR" className="zalo-qr-img" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Phone Modal */}
      {modal === 'phone' && (
        <div className="contact-modal" style={{ display: 'flex' }} onClick={() => setModal(null)}>
          <div className="contact-modal-box" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setModal(null)}>&times;</span>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>📞</div>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e' }}>Hoàng Quốc Tuấn</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.8rem', fontWeight: 800, color: 'var(--primary-green)', margin: '1rem 0' }}>+84 399 762 377</p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="tel:+84399762377" className="modal-btn modal-btn-primary">{t('ab.modal_call', 'Gọi ngay')}</a>
              <button className="modal-btn modal-btn-secondary" onClick={e => copyText('+84399762377', e.target)}>{t('ab.modal_copy', 'Copy')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {modal === 'email' && (
        <div className="contact-modal" style={{ display: 'flex' }} onClick={() => setModal(null)}>
          <div className="contact-modal-box" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setModal(null)}>&times;</span>
            <div style={{ fontSize: '3rem', marginBottom: '0.5rem' }}>✉️</div>
            <p style={{ fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e' }}>Hoàng Quốc Tuấn</p>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: 800, color: 'var(--primary-red)', margin: '1rem 0' }}>hoangquoctuan1395@gmail.com</p>
            <div style={{ display: 'flex', gap: '0.8rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="mailto:hoangquoctuan1395@gmail.com" className="modal-btn modal-btn-primary">{t('ab.modal_send', 'Gửi Email')}</a>
              <button className="modal-btn modal-btn-secondary" onClick={e => copyText('hoangquoctuan1395@gmail.com', e.target)}>{t('ab.modal_copy', 'Copy')}</button>
            </div>
          </div>
        </div>
      )}

      {/* Zalo QR Modal */}
      {modal === 'zalo' && (
        <div className="contact-modal" style={{ display: 'flex' }} onClick={() => setModal(null)}>
          <div className="contact-modal-box" onClick={e => e.stopPropagation()}>
            <span className="modal-close" onClick={() => setModal(null)}>&times;</span>
            <img src="/assets/ZaloQR.jpg" alt="Zalo QR Code" style={{ width: 280, height: 280, objectFit: 'contain', borderRadius: 12, display: 'block', margin: '0 auto' }} />
            <p style={{ marginTop: '1rem', fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e' }}>Hoàng Quốc Tuấn</p>
            <p style={{ color: '#666', fontSize: '0.85rem' }}>{t('ab.qr_hint', 'Quét mã QR để kết nối Zalo')}</p>
          </div>
        </div>
      )}
    </>
  )
}
