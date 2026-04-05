'use client'

import { useState, useEffect } from 'react'
import { useI18n } from '../../lib/i18n'
import { urlFor } from '../../lib/sanity'

export default function ServicesContent({ courses, trainings, bimProjects, designServices, initialTab = 0 }) {
  const { t, loc } = useI18n()
  const [activeTab, setActiveTab] = useState(initialTab)

  const tabs = [
    { label: t('services.tab1', 'Đào tạo BIM Online') },
    { label: t('services.tab2', 'Đào tạo BIM Doanh nghiệp') },
    { label: t('services.tab3', 'Dịch vụ Mô hình BIM') },
    { label: t('services.tab4', 'Dịch vụ Thiết kế BIM') },
    { label: t('services.tab5', 'Dịch vụ Số hóa Quản lý') },
  ]

  // Update active tab if the server redirects or a user soft-navigates via Next router
  useEffect(() => {
    setActiveTab(initialTab)
  }, [initialTab])

  const handleTabClick = (i) => {
    setActiveTab(i)
    const url = new URL(window.location)
    url.searchParams.set('tab', i.toString())
    window.history.pushState({}, '', url)
  }

  return (
    <section className="services section-padding" style={{ marginTop: 80, minHeight: 'calc(100vh - 80px)' }}>
      <div className="container">
        <h2 className="section-title">
          <span>{t('services.title', 'Dịch vụ')}</span> <span>{t('services.provided', 'Cung cấp')}</span>
        </h2>

        <div className="services-tabs">
          {tabs.map((tab, i) => (
            <button
              key={i}
              className={`tab-btn${activeTab === i ? ' active' : ''}`}
              onClick={() => handleTabClick(i)}
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

/* ═══════════════════════════════════════════════════════════════
   TAB 1 — Online Courses
   ═══════════════════════════════════════════════════════════════ */
function OnlineCoursesTab({ courses, loc, t }) {
  const course = courses?.[0]
  if (!course) return <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />

  const lessons = course.lessons || []
  const metaItems = course.metaItems || [
    { emoji: '📚', text: t('crs.lessons', '16 Bài học') },
    { emoji: '🎬', text: t('crs.format', 'Video + File thực hành') },
    { emoji: '🌐', text: t('crs.mode', 'Online') },
    { emoji: '🏆', text: 'Revit + Dynamo + Civil 3D' },
  ]

  return (
    <div>
      {/* Course Header */}
      <div className="course-header" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: 16,
        padding: '2.5rem 3rem',
        color: 'white',
        marginBottom: '2.5rem',
        display: 'flex',
        alignItems: 'center',
        gap: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative radial gradient */}
        <div style={{
          position: 'absolute', top: '-30%', right: '-10%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,28,36,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        {/* Icon removed — only text header */}
        <div className="course-header-text" style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}>
            {loc(course.title)}
          </h3>
          {course.subtitle && (
            <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem' }}>
              {loc(course.subtitle)}
            </p>
          )}
          <div className="course-meta" style={{
            display: 'flex', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem',
          }}>
            {metaItems.map((item, i) => (
              <div key={i} className="course-meta-item" style={{
                display: 'flex', alignItems: 'center', gap: 6,
                fontSize: '0.9rem', color: 'rgba(255,255,255,0.8)',
              }}>
                {item.emoji} <span>{loc(item.text) || item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lessons Grid */}
      {lessons.length > 0 && (
        <div className="course-lessons" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1rem',
        }}>
          {lessons.map((lesson, idx) => (
            <LessonCard key={lesson._key || idx} lesson={lesson} idx={idx} loc={loc} />
          ))}
        </div>
      )}

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        marginTop: '2.5rem',
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        borderRadius: 16,
        color: 'white',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '0.5rem',
        }}>
          {t('crs.cta_text', 'Đăng ký ngay để nhận tư vấn chương trình học phù hợp!')}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
          {t('crs.cta_sub', 'Khoá học linh hoạt, hỗ trợ kỹ thuật 1-1 trong suốt quá trình học')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+84399762377" className="btn btn-primary">
            {t('corp.cta_call', '📞 Gọi ngay')}
          </a>
          <a href="mailto:hoangquoctuan1395@gmail.com" className="btn btn-secondary">
            {t('corp.cta_email', '✉️ Gửi Email')}
          </a>
        </div>
      </div>
    </div>
  )
}

/* Lesson Card with hover effect */
function LessonCard({ lesson, idx, loc }) {
  const [hovered, setHovered] = useState(false)
  const isEven = idx % 2 === 1

  return (
    <div
      className="lesson-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 10,
        padding: '1.2rem 1.5rem',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        borderLeft: `4px solid ${isEven ? 'var(--primary-green)' : 'var(--primary-red)'}`,
        borderRadius: 12,
        transition: 'var(--transition)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '1rem',
        transform: hovered ? 'translateY(-3px)' : 'translateY(0)',
      }}
    >
      <div className="lesson-num" style={{
        width: 38,
        height: 38,
        borderRadius: '50%',
        background: isEven
          ? 'linear-gradient(135deg, var(--primary-green), #16a34a)'
          : 'linear-gradient(135deg, var(--primary-red), #dc2626)',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-display)',
        fontSize: '0.85rem',
        fontWeight: 800,
        flexShrink: 0,
      }}>
        {lesson.number || String(idx + 1).padStart(2, '0')}
      </div>
      <div className="lesson-body" style={{ flex: 1 }}>
        <div className="lesson-title" style={{
          fontWeight: 700,
          fontSize: '0.95rem',
          marginBottom: '0.4rem',
          color: 'var(--text-color)',
        }}>
          {loc(lesson.title)}
        </div>
        <div className="lesson-tags" style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {(lesson.tags || []).map((tag, ti) => (
            <span
              key={ti}
              className={`lesson-tag ${tag.type === 'video' ? 'tag-video' : 'tag-file'}`}
              style={{
                fontSize: '0.75rem',
                padding: '2px 10px',
                borderRadius: 20,
                fontWeight: 600,
                background: tag.type === 'video' ? '#fff0f0' : '#f0fff0',
                color: tag.type === 'video' ? 'var(--primary-red)' : 'var(--primary-green)',
              }}
            >
              {tag.type === 'video' ? '🎬' : '📄'} {loc(tag.label) || tag.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB 2 — Corp Training
   ═══════════════════════════════════════════════════════════════ */
function CorpTrainingTab({ trainings, loc, t }) {
  const training = trainings?.[0]
  if (!training) return <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />

  const stats = training.stats || []
  const targets = training.targetAudience || []
  const outcomes = training.outcomes || []
  const modules = training.modules || []
  const gallery = training.gallery || []

  return (
    <div>
      {/* Hero Banner */}
      <div className="corp-hero" style={{
        position: 'relative',
        borderRadius: 16,
        overflow: 'hidden',
        marginBottom: '3rem',
        minHeight: 320,
        display: 'flex',
        alignItems: 'flex-end',
      }}>
        {training.heroImage && (
          <img
            className="corp-hero-img"
            src={urlFor(training.heroImage)}
            alt={loc(training.title)}
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
        )}
        <div className="corp-hero-overlay" style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to top, rgba(10,10,30,0.92) 0%, rgba(10,10,30,0.4) 60%, transparent 100%)',
        }} />
        <div className="corp-hero-content" style={{
          position: 'relative', zIndex: 1,
          padding: '2.5rem', color: 'white',
        }}>
          {training.badge && (
            <div className="corp-badge" style={{
              display: 'inline-block',
              background: 'var(--primary-red)',
              color: 'white',
              padding: '4px 14px',
              borderRadius: 20,
              fontSize: '0.8rem',
              fontWeight: 700,
              letterSpacing: 1,
              textTransform: 'uppercase',
              marginBottom: '1rem',
            }}>
              {loc(training.badge)}
            </div>
          )}
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 900,
            lineHeight: 1.2,
            color: 'white',
            marginBottom: '0.8rem',
          }}>
            {loc(training.title)}
          </h3>
          {training.subtitle && (
            <p style={{ fontSize: '1rem', color: 'rgba(255,255,255,0.8)', maxWidth: 650 }}>
              {loc(training.subtitle)}
            </p>
          )}
        </div>
      </div>

      {/* Stats Row */}
      {stats.length > 0 && (
        <div className="info-row" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '1rem',
          background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
          borderRadius: 16,
          padding: '2rem',
          color: 'white',
          marginBottom: '3rem',
        }}>
          {stats.map((stat, idx) => (
            <div key={idx} className="info-box" style={{ textAlign: 'center' }}>
              <div className="ib-num" style={{
                fontFamily: 'var(--font-display)',
                fontSize: '2rem',
                fontWeight: 900,
                color: 'var(--primary-green)',
              }}>
                {stat.number}
              </div>
              <div className="ib-label" style={{
                fontSize: '0.8rem',
                color: 'rgba(255,255,255,0.65)',
                textTransform: 'uppercase',
                letterSpacing: 1,
                marginTop: '0.3rem',
              }}>
                {loc(stat.label)}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Target Audience */}
      {targets.length > 0 && (
        <div className="corp-section" style={{ marginBottom: '3rem' }}>
          <div className="corp-section-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            paddingBottom: '0.8rem',
            borderBottom: '3px solid var(--primary-red)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span>{t('corp.target_title', 'Đối tượng tham gia')}</span>
          </div>
          <div className="target-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1.2rem',
          }}>
            {targets.map((tgt, idx) => (
              <TargetCard key={idx} tgt={tgt} idx={idx} loc={loc} />
            ))}
          </div>
        </div>
      )}

      {/* Learning Outcomes */}
      {outcomes.length > 0 && (
        <div className="corp-section" style={{ marginBottom: '3rem' }}>
          <div className="corp-section-title green" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            paddingBottom: '0.8rem',
            borderBottom: '3px solid var(--primary-green)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span>{t('corp.outcome_title', 'Kết quả sau khoá học')}</span>
          </div>
          <div className="outcome-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.8rem',
          }}>
            {outcomes.map((item, idx) => (
              <div key={idx} className="outcome-item" style={{
                display: 'flex',
                alignItems: 'center',
                background: 'white',
                padding: '0.9rem 1.2rem',
                borderRadius: 8,
                boxShadow: 'var(--shadow-sm)',
                fontSize: '0.9rem',
                fontWeight: 600,
              }}>
                <span>{loc(item.text)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Module Details */}
      {modules.length > 0 && (
        <div className="corp-section" style={{ marginBottom: '3rem' }}>
          <div className="corp-section-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            paddingBottom: '0.8rem',
            borderBottom: '3px solid var(--primary-red)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span>{t('corp.module_title', 'Nội dung chương trình')}</span>
          </div>
          <div className="module-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.2rem',
          }}>
            {modules.map((mod, idx) => (
              <ModuleCard key={idx} mod={mod} idx={idx} loc={loc} />
            ))}
          </div>
        </div>
      )}

      {/* Training Photo Gallery */}
      {gallery.length > 0 && (
        <div className="corp-section" style={{ marginBottom: '3rem' }}>
          <div className="corp-section-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            paddingBottom: '0.8rem',
            borderBottom: '3px solid var(--primary-red)',
            display: 'flex',
            alignItems: 'center',
          }}>
            <span>{t('corp.gallery_title', 'Hình ảnh Đào tạo Thực tế')}</span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0.8rem',
          }}>
            {gallery.map((img, idx) => (
              <GalleryImage key={idx} image={img} />
            ))}
          </div>
        </div>
      )}

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        borderRadius: 16,
        color: 'white',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.4rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '0.5rem',
        }}>
          {t('corp.cta_title', 'Đăng ký tư vấn chương trình đào tạo cho doanh nghiệp')}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
          {t('corp.cta_desc', 'Chúng tôi sẽ thiết kế chương trình học phù hợp với quy trình và dự án thực tế của đội nhóm bạn')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+84399762377" className="btn btn-primary">
            {t('corp.cta_call', '📞 Gọi ngay')}
          </a>
          <a href="mailto:hoangquoctuan1395@gmail.com" className="btn btn-secondary">
            {t('corp.cta_email', '✉️ Gửi Email')}
          </a>
        </div>
      </div>
    </div>
  )
}

/* Target Audience Card */
function TargetCard({ tgt, idx, loc }) {
  const [hovered, setHovered] = useState(false)
  const isEven = idx % 2 === 1

  return (
    <div
      className="target-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 10,
        padding: '1.5rem',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        borderTop: `3px solid ${isEven ? 'var(--primary-green)' : 'var(--primary-red)'}`,
        transition: 'var(--transition)',
        textAlign: 'center',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {tgt.icon && (
        <div className="tc-icon" style={{ fontSize: '2.2rem', marginBottom: '0.8rem' }}>
          {tgt.icon}
        </div>
      )}
      <div className="tc-title" style={{ fontWeight: 700, fontSize: '0.95rem' }}>
        {loc(tgt.title)}
      </div>
    </div>
  )
}

/* Module Card */
function ModuleCard({ mod, idx, loc }) {
  const [hovered, setHovered] = useState(false)
  const isEven = idx % 2 === 1
  const items = mod.items || []

  return (
    <div
      className="module-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 12,
        overflow: 'hidden',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        transition: 'var(--transition)',
        display: 'flex',
        flexDirection: 'column',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {mod.image ? (
        <img
          className="module-img"
          src={urlFor(mod.image)}
          alt={loc(mod.title)}
          style={{ width: '100%', height: 200, objectFit: 'cover' }}
          loading="lazy"
        />
      ) : mod.fallbackEmoji ? (
        <div style={{
          height: 200,
          background: 'linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '5rem',
        }}>
          {mod.fallbackEmoji}
        </div>
      ) : null}
      <div className="module-body" style={{ padding: '1.5rem', flex: 1 }}>
        <div className="module-num" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.75rem',
          fontWeight: 800,
          color: isEven ? 'var(--primary-green)' : 'var(--primary-red)',
          textTransform: 'uppercase',
          letterSpacing: 2,
          marginBottom: '0.4rem',
        }}>
          {loc(mod.moduleNumber)}
        </div>
        <div className="module-title" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.05rem',
          fontWeight: 700,
          marginBottom: '0.8rem',
        }}>
          {loc(mod.title)}
        </div>
        {items.length > 0 && (
          <ul className="module-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item, li) => (
              <li key={li} style={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
                fontSize: '0.85rem',
                color: 'var(--text-muted)',
                marginBottom: '0.4rem',
                lineHeight: 1.4,
              }}>
                <span style={{
                  color: isEven ? 'var(--primary-green)' : 'var(--primary-red)',
                  flexShrink: 0,
                }}>
                  ▸
                </span>
                <span>{typeof item === 'string' ? item : loc(item)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

/* Gallery Image with hover zoom */
function GalleryImage({ image }) {
  const [hovered, setHovered] = useState(false)
  const src = typeof image === 'string' ? image : urlFor(image)

  return (
    <div
      style={{ borderRadius: 12, overflow: 'hidden', aspectRatio: '16/9' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <img
        src={src}
        alt=""
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transition: 'transform 0.4s ease',
          display: 'block',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
        }}
        loading="lazy"
      />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB 3 — BIM Projects
   ═══════════════════════════════════════════════════════════════ */
function BimProjectsTab({ bimProjects, loc, t }) {
  return (
    <div>
      {/* Header */}
      <div className="model-hero-header" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: 16,
        padding: '2.5rem 3rem',
        marginBottom: '2.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-30%', right: '-10%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,28,36,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}>
            {t('bim.title', 'Dịch vụ Mô hình BIM')}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {t('bim.subtitle', 'Xây dựng mô hình BIM chính xác cao, toàn diện cho các dự án hạ tầng giao thông, dân dụng và công nghiệp. Ứng dụng Revit, Civil 3D, Dynamo và công nghệ Scan to BIM để tối ưu hóa quy trình thiết kế, thi công và quản lý vận hành.')}
          </p>
        </div>
      </div>

      {/* Project Grid */}
      {bimProjects.length > 0 ? (
        <div className="project-masonry" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.2rem',
        }}>
          {bimProjects.map((proj, idx) => (
            <ProjectCard key={proj._id || idx} proj={proj} loc={loc} />
          ))}
        </div>
      ) : (
        <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />
      )}

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        marginTop: '2.5rem',
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        borderRadius: 16,
        color: 'white',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '0.5rem',
        }}>
          {t('bim.cta_title', 'Cần tư vấn dịch vụ Mô hình BIM?')}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
          {t('bim.cta_desc', 'Liên hệ để nhận báo giá và phương án triển khai BIM tối ưu cho dự án của bạn')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+84399762377" className="btn btn-primary">
            {t('corp.cta_call', '📞 Gọi ngay')}
          </a>
          <a href="mailto:hoangquoctuan1395@gmail.com" className="btn btn-secondary">
            {t('corp.cta_email', '✉️ Gửi Email')}
          </a>
        </div>
      </div>
    </div>
  )
}

/* Project Card with hover effects */
function ProjectCard({ proj, loc }) {
  const [hovered, setHovered] = useState(false)
  const isWide = proj.isWide
  const imgHeight = isWide ? 260 : 240

  return (
    <div
      className={`project-card${isWide ? ' wide' : ''}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        position: 'relative',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
        ...(isWide ? { gridColumn: 'span 2' } : {}),
      }}
    >
      <div className="project-img-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
        {proj.image && (
          <img
            src={urlFor(proj.image)}
            alt={loc(proj.title)}
            style={{
              width: '100%',
              display: 'block',
              height: imgHeight,
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            loading="lazy"
          />
        )}
        {proj.badge && (
          <span
            className={`project-tag${proj.badgeColor === 'green' ? ' green' : ''}`}
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: proj.badgeColor === 'green' ? 'var(--primary-green)' : 'var(--primary-red)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 20,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {loc(proj.badge)}
          </span>
        )}
      </div>
      <div className="project-body" style={{ padding: '1.2rem 1.4rem' }}>
        <div className="project-title" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--text-color)',
          lineHeight: 1.3,
        }}>
          {loc(proj.title)}
        </div>
        {proj.description && (
          <div className="project-desc" style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}>
            {loc(proj.description)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB 4 — Design Services
   ═══════════════════════════════════════════════════════════════ */
function DesignServicesTab({ designServices, loc, t }) {
  const capabilities = designServices.filter(s => s.itemType === 'capability')
  const works = designServices.filter(s => s.itemType === 'work')
  const workflows = designServices.filter(s => s.itemType === 'workflow')

  if (designServices.length === 0) return <Placeholder text={t('services.updating', 'Nội dung đang cập nhật...')} />

  return (
    <div>
      {/* Hero header */}
      <div className="design-hero-header" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: 16,
        padding: '2.5rem 3rem',
        marginBottom: '2.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-30%', right: '-10%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,28,36,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}>
            {t('dsg.title', 'Dịch vụ Thiết kế BIM')}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {t('dsg.subtitle', 'Khai thác toàn bộ dữ liệu từ mô hình BIM để xuất bản vẽ thiết kế chất lượng cao, đồng bộ hóa tự động và phối hợp đa chuyên ngành. Ứng dụng Revit, Civil 3D và Dynamo để tối ưu hóa 100% quy trình thiết kế hạ tầng giao thông.')}
          </p>
        </div>
      </div>

      {/* Capabilities */}
      {capabilities.length > 0 && (
        <>
          <div className="design-section-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            paddingBottom: '0.8rem',
            borderBottom: '3px solid var(--primary-green)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <span>{t('dsg.cap_title', 'Năng lực cung cấp')}</span>
          </div>
          <div className="design-caps" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            marginBottom: '2.5rem',
          }}>
            {capabilities.map((cap, idx) => (
              <DesignCapItem key={cap._id || idx} cap={cap} idx={idx} loc={loc} />
            ))}
          </div>
        </>
      )}

      {/* Sample Works */}
      {works.length > 0 && (
        <>
          <div className="design-section-title red" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            paddingBottom: '0.8rem',
            borderBottom: '3px solid var(--primary-red)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            <span>{t('dsg.work_title', 'Công việc Thiết kế Tiêu biểu')}</span>
          </div>
          <div className="design-work-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1.2rem',
            marginBottom: '2.5rem',
          }}>
            {works.map((work, idx) => (
              <DesignWorkCard key={work._id || idx} work={work} loc={loc} />
            ))}
          </div>
        </>
      )}

      {/* Workflow */}
      {workflows.length > 0 && (
        <>
          <div className="design-section-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.3rem',
            fontWeight: 800,
            marginBottom: '1.5rem',
            paddingBottom: '0.8rem',
            borderBottom: '3px solid var(--primary-green)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.6rem',
          }}>
            🔄 <span>{t('dsg.wf_title', 'Quy trình triển khai')}</span>
          </div>
          <div className="design-workflow" style={{
            display: 'flex',
            alignItems: 'flex-start',
            gap: '0.8rem',
            marginBottom: '2.5rem',
            flexWrap: 'wrap',
          }}>
            {workflows.map((step, idx) => (
              <div key={step._id || idx} className="design-wf-step" style={{
                flex: 1,
                minWidth: 130,
                textAlign: 'center',
                padding: '1.4rem 0.8rem',
                background: 'white',
                borderRadius: 12,
                boxShadow: 'var(--shadow-sm)',
              }}>
                <div className="wf-num" style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.5rem',
                  fontWeight: 900,
                  color: idx % 2 === 1 ? 'var(--primary-red)' : 'var(--primary-green)',
                  lineHeight: 1,
                  marginBottom: '0.4rem',
                }}>
                  {step.stepNumber || String(idx + 1).padStart(2, '0')}
                </div>
                {step.icon && (
                  <div className="wf-icon" style={{ fontSize: '1.6rem', marginBottom: '0.4rem' }}>
                    {step.icon}
                  </div>
                )}
                <div className="wf-label" style={{ fontWeight: 700, fontSize: '0.82rem' }}>
                  {loc(step.title)}
                </div>
                {step.subtitle && (
                  <div className="wf-sub" style={{
                    fontSize: '0.72rem',
                    color: 'var(--text-muted)',
                    marginTop: '0.3rem',
                  }}>
                    {loc(step.subtitle)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </>
      )}

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        borderRadius: 16,
        color: 'white',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '0.5rem',
        }}>
          {t('dsg.cta_title', 'Cần triển khai Thiết kế BIM cho dự án của bạn?')}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
          {t('dsg.cta_desc', 'Liên hệ để được tư vấn phương án thiết kế BIM tối ưu — tiết kiệm thời gian và chi phí thiết kế')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+84399762377" className="btn btn-primary">
            {t('corp.cta_call', '📞 Gọi ngay')}
          </a>
          <a href="mailto:hoangquoctuan1395@gmail.com" className="btn btn-secondary">
            {t('corp.cta_email', '✉️ Gửi Email')}
          </a>
        </div>
      </div>
    </div>
  )
}

/* Design Capability Card */
function DesignCapItem({ cap, idx, loc }) {
  const [hovered, setHovered] = useState(false)
  const isOdd = idx % 2 === 0 // nth-child(odd) means 0-indexed even

  return (
    <div
      className="design-cap-item"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 12,
        padding: '1.4rem 1.5rem',
        boxShadow: hovered ? 'var(--shadow-md)' : 'var(--shadow-sm)',
        borderTop: `3px solid ${isOdd ? 'var(--primary-red)' : 'var(--primary-green)'}`,
        transition: 'var(--transition)',
        display: 'flex',
        alignItems: 'flex-start',
        gap: '0.8rem',
        transform: hovered ? 'translateY(-4px)' : 'translateY(0)',
      }}
    >
      {cap.icon && (
        <div className="dci-icon" style={{ fontSize: '1.8rem', flexShrink: 0 }}>
          {cap.icon}
        </div>
      )}
      <div>
        <div className="dci-title" style={{ fontWeight: 700, fontSize: '0.95rem', marginBottom: '0.3rem' }}>
          {loc(cap.title)}
        </div>
        {cap.description && (
          <div className="dci-desc" style={{ fontSize: '0.82rem', color: 'var(--text-muted)', lineHeight: 1.5 }}>
            {loc(cap.description)}
          </div>
        )}
      </div>
    </div>
  )
}

/* Design Work Card */
function DesignWorkCard({ work, loc }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="design-work-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <div className="design-work-img-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
        {work.image && (
          <img
            src={urlFor(work.image)}
            alt={loc(work.title)}
            style={{
              width: '100%',
              display: 'block',
              height: 220,
              objectFit: 'cover',
              transition: 'transform 0.5s ease',
              transform: hovered ? 'scale(1.06)' : 'scale(1)',
            }}
            loading="lazy"
          />
        )}
        {work.badge && (
          <span
            className={`design-work-tag${work.badgeColor === 'red' ? ' red' : ''}`}
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              background: work.badgeColor === 'red' ? 'var(--primary-red)' : 'var(--primary-green)',
              color: 'white',
              fontSize: '0.7rem',
              fontWeight: 700,
              padding: '3px 10px',
              borderRadius: 20,
              letterSpacing: 1,
              textTransform: 'uppercase',
            }}
          >
            {loc(work.badge)}
          </span>
        )}
      </div>
      <div className="design-work-body" style={{ padding: '1.2rem 1.4rem' }}>
        <div className="design-work-title" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--text-color)',
          lineHeight: 1.3,
        }}>
          {loc(work.title)}
        </div>
        {work.description && (
          <div className="design-work-desc" style={{
            fontSize: '0.82rem',
            color: 'var(--text-muted)',
            lineHeight: 1.6,
          }}>
            {loc(work.description)}
          </div>
        )}
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TAB 5 — Digital Management
   ═══════════════════════════════════════════════════════════════ */
function DigitalManagementTab({ loc, t }) {
  /* Static data matching the original HTML — can be replaced with CMS props later */
  const digitalProjects = [
    {
      image: '/assets/m_sohoaquanly1.png',
      tag: t('digital.tag_workhub', 'Quản lý Công việc'),
      tagColor: 'red',
      title: t('digital.p1_title', 'Hệ thống Quản lý Công việc'),
      desc: t('digital.p1_desc', 'Nền tảng quản lý công việc nội bộ doanh nghiệp với phân cấp tổ chức đa tầng (Tổ chức → Trung tâm → Phòng ban → Nhóm). Hỗ trợ giao việc, theo dõi tiến độ theo thời gian thực và đánh giá KPI nhân sự tự động.'),
    },
    {
      image: '/assets/m_sohoaquanly2.png',
      tag: t('digital.tag_dashboard', 'Dashboard & Báo cáo'),
      tagColor: 'green',
      title: t('digital.p2_title', 'Dashboard Báo cáo — Phân tích Hiệu suất Nhân sự'),
      desc: t('digital.p2_desc', 'Giao diện báo cáo công việc trực quan với biểu đồ cột và tròn theo phòng ban, cá nhân. Phân loại nhiệm vụ theo trạng thái (Đang thực hiện / Hoàn thành / Sắp tới) và xuất báo cáo Excel, PDF A3.'),
    },
    {
      image: '/assets/m_sohoaquanly3.png',
      tag: t('digital.tag_hr', 'Quản lý Nhân sự'),
      tagColor: 'red',
      title: t('digital.p3_title', 'Quản lý Nhân sự — Phân quyền & Vai trò'),
      desc: t('digital.p3_desc', 'Hệ thống quản lý tài khoản nhân sự với phân quyền chi tiết theo vai trò (Admin, Director, Manager, Staff). Tích hợp bộ lọc phân cấp Trung tâm → Phòng ban → Nhóm và thông báo tự động qua sự kiện.'),
    },
    {
      image: '/assets/m_sohoaquanly4.png',
      tag: t('digital.tag_notify', 'Thông báo & Tự động hóa'),
      tagColor: 'green',
      title: t('digital.p4_title', 'Hệ thống Thông báo Thông minh & Digital Twin'),
      desc: t('digital.p4_desc', 'Hệ thống thông báo tự động theo sự kiện (giao việc, cập nhật trạng thái, đánh giá KPI) tích hợp thời gian thực. Kết hợp Digital Twin để theo dõi và quản lý vận hành công trình xây dựng theo dữ liệu thực tế.'),
    },
  ]

  const noteItems = [
    t('digital.note1', 'Các giải pháp số hóa được thiết kế và triển khai theo đặc thù riêng của từng doanh nghiệp.'),
    t('digital.note2', 'Hệ thống có thể tích hợp với phần mềm sẵn có (ERP, DMS, CRM) hoặc xây dựng từ đầu.'),
    t('digital.note3', 'Hỗ trợ triển khai web app, mobile app và dashboard quản trị theo thời gian thực.'),
    t('digital.note4', 'Liên hệ để nhận tư vấn và demo giải pháp phù hợp với nhu cầu của bạn.'),
  ]

  return (
    <div>
      {/* Header */}
      <div className="digital-hero-header" style={{
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
        borderRadius: 16,
        padding: '2.5rem 3rem',
        marginBottom: '2.5rem',
        color: 'white',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute', top: '-30%', right: '-10%',
          width: 300, height: 300, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(237,28,36,0.2) 0%, transparent 70%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.6rem',
            fontWeight: 800,
            color: 'white',
            lineHeight: 1.2,
            marginBottom: '0.5rem',
          }}>
            {t('services.card5.title', 'Dịch vụ Số hóa Quản lý')}
          </h3>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.7 }}>
            {t('services.card5.desc', 'Ứng dụng Digital Twin và hệ thống tự động hóa quản lý vận hành dự án thông minh. Xây dựng các nền tảng phần mềm quản lý dự án, nhân sự, công việc giúp tối ưu hóa quy trình vận hành nội bộ doanh nghiệp.')}
          </p>
        </div>
      </div>

      {/* Project Grid */}
      <div className="digital-masonry" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '1.2rem',
        marginBottom: '2.5rem',
      }}>
        {digitalProjects.map((proj, idx) => (
          <DigitalCard key={idx} proj={proj} />
        ))}
      </div>

      {/* Note Box */}
      <div className="digital-note" style={{
        background: 'linear-gradient(135deg, #fff8f0 0%, #fff3e0 100%)',
        borderLeft: '5px solid #f59e0b',
        borderRadius: 12,
        padding: '1.5rem 2rem',
        marginBottom: '2.5rem',
      }}>
        <div>
          <div className="digital-note-title" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: 800,
            color: '#92400e',
            marginBottom: '0.5rem',
          }}>
            {t('digital.note_title', 'Ghi chú về Dịch vụ')}
          </div>
          <ul className="digital-note-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {noteItems.map((item, idx) => (
              <li key={idx} style={{
                fontSize: '0.88rem',
                color: '#78350f',
                marginBottom: '0.35rem',
                lineHeight: 1.5,
                display: 'flex',
                alignItems: 'flex-start',
                gap: '0.5rem',
              }}>
                <span style={{ color: '#f59e0b', flexShrink: 0 }}>▸</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* CTA */}
      <div style={{
        textAlign: 'center',
        padding: '2.5rem',
        background: 'linear-gradient(135deg, #1a1a2e, #0f3460)',
        borderRadius: 16,
        color: 'white',
      }}>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.3rem',
          fontWeight: 800,
          color: 'white',
          marginBottom: '0.5rem',
        }}>
          {t('digital.cta_title', 'Cần tư vấn giải pháp Số hóa Quản lý?')}
        </p>
        <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '1.5rem' }}>
          {t('digital.cta_desc', 'Liên hệ để nhận tư vấn và demo hệ thống phù hợp với quy trình vận hành của doanh nghiệp bạn')}
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="tel:+84399762377" className="btn btn-primary">
            {t('corp.cta_call', '📞 Gọi ngay')}
          </a>
          <a href="mailto:hoangquoctuan1395@gmail.com" className="btn btn-secondary">
            {t('corp.cta_email', '✉️ Gửi Email')}
          </a>
        </div>
      </div>
    </div>
  )
}

/* Digital Card with hover effects */
function DigitalCard({ proj }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      className="digital-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: 'white',
        borderRadius: 14,
        overflow: 'hidden',
        boxShadow: hovered ? '0 16px 40px rgba(0,0,0,0.15)' : 'var(--shadow-sm)',
        transition: 'transform 0.35s ease, box-shadow 0.35s ease',
        cursor: 'pointer',
        transform: hovered ? 'translateY(-6px)' : 'translateY(0)',
      }}
    >
      <div className="digital-img-wrap" style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={proj.image}
          alt={proj.title}
          style={{
            width: '100%',
            display: 'block',
            height: 240,
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            transform: hovered ? 'scale(1.06)' : 'scale(1)',
          }}
          loading="lazy"
        />
        <span
          className={`digital-tag${proj.tagColor === 'green' ? ' green' : ''}`}
          style={{
            position: 'absolute',
            top: 12,
            left: 12,
            background: proj.tagColor === 'green' ? 'var(--primary-green)' : 'var(--primary-red)',
            color: 'white',
            fontSize: '0.7rem',
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 20,
            letterSpacing: 1,
            textTransform: 'uppercase',
          }}
        >
          {proj.tag}
        </span>
      </div>
      <div className="digital-body" style={{ padding: '1.2rem 1.4rem' }}>
        <div className="digital-title" style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.95rem',
          fontWeight: 800,
          marginBottom: '0.5rem',
          color: 'var(--text-color)',
          lineHeight: 1.3,
        }}>
          {proj.title}
        </div>
        <div className="digital-desc" style={{
          fontSize: '0.82rem',
          color: 'var(--text-muted)',
          lineHeight: 1.6,
        }}>
          {proj.desc}
        </div>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Shared — Placeholder
   ═══════════════════════════════════════════════════════════════ */
function Placeholder({ text }) {
  return (
    <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
      <p style={{ fontSize: '1.1rem' }}>{text}</p>
    </div>
  )
}
