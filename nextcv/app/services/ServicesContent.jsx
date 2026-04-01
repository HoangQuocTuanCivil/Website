'use client'

import { useState } from 'react'
import { useI18n } from '../../lib/i18n'
import { urlFor } from '../../lib/sanity'

export default function ServicesContent({ courses, trainings, bimProjects, designServices }) {
  const { t, loc } = useI18n()
  const [activeTab, setActiveTab] = useState(0)

  const tabs = [
    { label: t('services.tab1', 'Đào tạo BIM Online') },
    { label: t('services.tab2', 'Đào tạo BIM Doanh nghiệp') },
    { label: t('services.tab3', 'Dịch vụ Mô hình BIM') },
    { label: t('services.tab4', 'Dịch vụ Thiết kế BIM') },
    { label: t('services.tab5', 'Dịch vụ Số hóa Quản lý') },
  ]

  return (
    <section style={{ marginTop: 80, minHeight: 'calc(100vh - 80px)' }}>
      <div className="container section-padding">
        <h2 className="section-title">
          <span>{t('services.title', 'Dịch vụ')}</span> Cung Cấp
        </h2>

        <div className="services-tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`tab-btn${activeTab === i ? ' active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={`tab-content${activeTab === 0 ? ' active' : ''}`}>
          <OnlineCoursesTab courses={courses} loc={loc} t={t} />
        </div>
        <div className={`tab-content${activeTab === 1 ? ' active' : ''}`}>
          <CorpTrainingTab trainings={trainings} loc={loc} t={t} />
        </div>
        <div className={`tab-content${activeTab === 2 ? ' active' : ''}`}>
          <BimProjectsTab bimProjects={bimProjects} loc={loc} t={t} />
        </div>
        <div className={`tab-content${activeTab === 3 ? ' active' : ''}`}>
          <DesignServicesTab designServices={designServices} loc={loc} t={t} />
        </div>
        <div className={`tab-content${activeTab === 4 ? ' active' : ''}`}>
          <DigitalManagementTab loc={loc} t={t} />
        </div>
      </div>
    </section>
  )
}

function OnlineCoursesTab({ courses, loc, t }) {
  const course = courses[0]
  if (!course) return <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />

  const lessons = course.lessons || []
  return (
    <div>
      <div className="course-header" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', borderRadius: 16, padding: '2.5rem', color: 'white', marginBottom: '2.5rem', display: 'flex', gap: '2rem', alignItems: 'center', flexWrap: 'wrap' }}>
        {course.icon && <div style={{ fontSize: '3.5rem', flexShrink: 0 }}>{course.icon}</div>}
        <div style={{ flex: 1, minWidth: 220 }}>
          <h3 style={{ fontSize: '1.6rem', marginBottom: '0.5rem', color: 'white' }}>{loc(course.title)}</h3>
          {course.subtitle && <p style={{ opacity: 0.85, fontSize: '1rem' }}>{loc(course.subtitle)}</p>}
        </div>
      </div>
      {lessons.length > 0 && (
        <div className="course-lessons" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem', marginBottom: '2.5rem' }}>
          {lessons.map((lesson, idx) => (
            <div key={lesson._key || idx} className="lesson-card" style={{ display: 'flex', gap: '1rem', background: 'white', borderRadius: 12, padding: '1.25rem', boxShadow: 'var(--shadow-sm)' }}>
              <div className="lesson-num" style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-green), var(--primary-red))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '0.85rem', flexShrink: 0 }}>{lesson.number || idx + 1}</div>
              <div className="lesson-body" style={{ flex: 1 }}>
                <h4 className="lesson-title" style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem' }}>{loc(lesson.title)}</h4>
                <div className="lesson-tags" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {(lesson.tags || []).map((tag, ti) => (
                    <span key={ti} className={`lesson-tag ${tag.type === 'video' ? 'tag-video' : 'tag-file'}`} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: 20, background: tag.type === 'video' ? 'rgba(237,28,36,0.1)' : 'rgba(0,157,1,0.1)', color: tag.type === 'video' ? 'var(--primary-red)' : 'var(--primary-green)' }}>
                      {tag.type === 'video' ? '🎬' : '📄'} {tag.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <div style={{ textAlign: 'center', padding: '2rem 0' }}>
        <a href="#contact" className="btn btn-primary">{t('services.enroll', 'Đăng ký ngay')}</a>
      </div>
    </div>
  )
}

function CorpTrainingTab({ trainings, loc, t }) {
  const training = trainings[0]
  if (!training) return <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />

  const stats = training.stats || []
  const targets = training.targetAudience || []
  const outcomes = training.outcomes || []
  const modules = training.modules || []

  return (
    <div>
      <div style={{ position: 'relative', borderRadius: 16, overflow: 'hidden', marginBottom: '3rem', minHeight: 320 }}>
        {training.heroImage && <img src={urlFor(training.heroImage)} alt={loc(training.title)} style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', inset: 0 }} />}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(26,26,46,0.88), rgba(15,52,96,0.82))' }} />
        <div style={{ position: 'relative', zIndex: 1, padding: '3rem', color: 'white', display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 320 }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '0.75rem', color: 'white' }}>{loc(training.title)}</h3>
          {training.subtitle && <p style={{ fontSize: '1.1rem', opacity: 0.9, maxWidth: 600 }}>{loc(training.subtitle)}</p>}
        </div>
      </div>

      {stats.length > 0 && (
        <div className="info-row" style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(stats.length, 4)}, 1fr)`, gap: '1.5rem', marginBottom: '3rem' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '1.5rem', background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary-green)', fontFamily: 'var(--font-display)' }}>{stat.number}</div>
              <div style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>{loc(stat.label)}</div>
            </div>
          ))}
        </div>
      )}

      {targets.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '3rem' }}>
          {targets.map((tgt, idx) => (
            <div key={idx} style={{ textAlign: 'center', padding: '1.5rem 1rem', background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
              {tgt.icon && <div style={{ fontSize: '2rem', marginBottom: '0.6rem' }}>{tgt.icon}</div>}
              <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{loc(tgt.title)}</div>
            </div>
          ))}
        </div>
      )}

      {outcomes.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem', marginBottom: '3rem' }}>
          {outcomes.map((item, idx) => (
            <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '1rem', background: 'white', borderRadius: 10, boxShadow: 'var(--shadow-sm)' }}>
              <span style={{ fontSize: '1.3rem', flexShrink: 0 }}>{item.icon || '✅'}</span>
              <span style={{ fontSize: '0.95rem' }}>{loc(item.text)}</span>
            </div>
          ))}
        </div>
      )}

      {modules.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
          {modules.map((mod, idx) => (
            <div key={idx} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {mod.image && <img src={urlFor(mod.image)} alt={loc(mod.title)} style={{ width: '100%', height: 160, objectFit: 'cover' }} loading="lazy" />}
              <div style={{ padding: '1.25rem' }}>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: 'var(--primary-red)', textTransform: 'uppercase', letterSpacing: 2, marginBottom: '0.4rem' }}>{loc(mod.moduleNumber)}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{loc(mod.title)}</h4>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function BimProjectsTab({ bimProjects, loc, t }) {
  return (
    <div>
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', borderRadius: 16, padding: '2.5rem', color: 'white', textAlign: 'center', marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.8rem', color: 'white', marginBottom: '0.5rem' }}>{t('bim.title', 'Dịch vụ Mô hình BIM')}</h3>
        <p style={{ opacity: 0.8, maxWidth: 600, margin: '0 auto' }}>{t('bim.subtitle', 'Xây dựng mô hình BIM chính xác cao cho các dự án hạ tầng giao thông, dân dụng và công nghiệp.')}</p>
      </div>
      {bimProjects.length > 0 ? (
        <div className="project-masonry" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.2rem' }}>
          {bimProjects.map((proj, idx) => (
            <div key={proj._id || idx} className={`project-card${proj.isWide ? ' wide' : ''}`} style={{ background: 'white', borderRadius: 14, overflow: 'hidden', boxShadow: 'var(--shadow-sm)', ...(proj.isWide ? { gridColumn: 'span 2' } : {}) }}>
              <div className="project-img-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
                {proj.image && <img src={urlFor(proj.image)} alt={loc(proj.title)} style={{ width: '100%', height: 240, objectFit: 'cover', display: 'block' }} loading="lazy" />}
                {proj.badge && <span className={`project-tag${proj.badgeColor === 'green' ? ' green' : ''}`} style={{ position: 'absolute', top: 12, left: 12, padding: '3px 10px', borderRadius: 20, fontSize: '0.7rem', fontWeight: 700, color: 'white', background: proj.badgeColor === 'green' ? 'var(--primary-green)' : 'var(--primary-red)' }}>{loc(proj.badge)}</span>}
              </div>
              <div className="project-body" style={{ padding: '1.2rem 1.4rem' }}>
                <div className="project-title" style={{ fontFamily: 'var(--font-display)', fontSize: '0.95rem', fontWeight: 800, marginBottom: '0.5rem' }}>{loc(proj.title)}</div>
                {proj.description && <p className="project-desc" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{loc(proj.description)}</p>}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />
      )}
    </div>
  )
}

function DesignServicesTab({ designServices, loc, t }) {
  const capabilities = designServices.filter(s => s.itemType === 'capability')
  const works = designServices.filter(s => s.itemType === 'work')
  const workflows = designServices.filter(s => s.itemType === 'workflow')

  if (designServices.length === 0) return <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />

  return (
    <div>
      {capabilities.length > 0 && (
        <div className="dsg-cap-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {capabilities.map((cap, idx) => (
            <div key={cap._id || idx} style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
              {cap.icon && <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{cap.icon}</div>}
              <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{loc(cap.title)}</h4>
              {cap.description && <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{loc(cap.description)}</p>}
            </div>
          ))}
        </div>
      )}
      {works.length > 0 && (
        <div className="dsg-work-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
          {works.map((work, idx) => (
            <div key={work._id || idx} style={{ background: 'white', borderRadius: 12, overflow: 'hidden', boxShadow: 'var(--shadow-sm)' }}>
              {work.image && <img src={urlFor(work.image)} alt={loc(work.title)} style={{ width: '100%', height: 200, objectFit: 'cover' }} loading="lazy" />}
              <div style={{ padding: '1.25rem' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.4rem' }}>{loc(work.title)}</h4>
                {work.description && <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{loc(work.description)}</p>}
              </div>
            </div>
          ))}
        </div>
      )}
      {workflows.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          {workflows.map((step, idx) => (
            <div key={step._id || idx} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 1.5rem', background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-sm)', minWidth: 180 }}>
              <span style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-green), var(--primary-red))', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '0.85rem', flexShrink: 0 }}>{step.stepNumber || idx + 1}</span>
              <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>{loc(step.title)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

function DigitalManagementTab({ loc, t }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 0' }}>
      <div style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', borderRadius: 16, padding: '3rem', color: 'white', marginBottom: '2rem' }}>
        <h3 style={{ fontSize: '1.6rem', color: 'white', marginBottom: '1rem' }}>{t('services.card5.title', 'Dịch vụ Số hóa Quản lý')}</h3>
        <p style={{ opacity: 0.85, maxWidth: 600, margin: '0 auto', lineHeight: 1.7 }}>{t('services.card5.desc', 'Ứng dụng Digital Twin và hệ thống tự động hóa quản lý vận hành dự án thông minh.')}</p>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1.5rem' }}>
        {[
          { icon: '📊', title: 'Dashboard Quản lý', desc: 'Giao diện trực quan theo dõi tiến độ và chi phí dự án.' },
          { icon: '🔗', title: 'Tích hợp BIM-IoT', desc: 'Kết nối dữ liệu thiết kế BIM với cảm biến IoT thời gian thực.' },
          { icon: '🤖', title: 'Phân tích AI', desc: 'Ứng dụng AI để dự báo, phát hiện rủi ro và tối ưu hóa.' },
        ].map((item, idx) => (
          <div key={idx} style={{ textAlign: 'center', padding: '2rem 1.5rem', background: 'white', borderRadius: 12, boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>{item.icon}</div>
            <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h4>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

function Placeholder({ text }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
      <p style={{ fontSize: '1.1rem' }}>{text}</p>
    </div>
  )
}
