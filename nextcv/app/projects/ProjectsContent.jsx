'use client'

import { useI18n } from '../../lib/i18n'
import ProjectCard from '../../components/ProjectCard'

export default function ProjectsContent({ projects }) {
  const { t } = useI18n()

  const bimProjects = (projects || []).filter(p => p.category === 'bim')
  const trainProjects = (projects || []).filter(p => p.category === 'train')
  const hasProjects = projects && projects.length > 0

  return (
    <>
      <section className="page-hero" style={{ marginTop: 80, padding: '4rem 0 3rem', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)', color: 'white', textAlign: 'center' }}>
        <div className="container">
          <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem' }}>
            {t('projects.page_title', 'Danh mục Dự án')}
          </h1>
          <p style={{ fontSize: '1.1rem', opacity: 0.85, maxWidth: 640, margin: '0 auto', lineHeight: 1.7 }}>
            {t('projects.page_sub', 'Tổng hợp các công trình BIM thực tế đã triển khai — từ hạ tầng giao thông, dân dụng đến đào tạo chuyên nghiệp')}
          </p>
        </div>
      </section>

      <section style={{ padding: '2.5rem 0 4rem' }}>
        <div className="container">
          {bimProjects.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 className="train-section-title" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--primary-green)', fontFamily: 'var(--font-display)' }}>
                🌉 {t('projects.cat_bim', 'Dự án Mô hình BIM')}
              </h2>
              <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {bimProjects.map(project => <ProjectCard key={project._id} project={project} />)}
              </div>
            </div>
          )}

          {trainProjects.length > 0 && (
            <div style={{ marginBottom: '3rem' }}>
              <h2 className="train-section-title" style={{ fontSize: '1.4rem', fontWeight: 700, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid var(--primary-red)', fontFamily: 'var(--font-display)' }}>
                🎓 {t('projects.cat_train', 'Đào tạo BIM Doanh nghiệp')}
              </h2>
              <div className="portfolio-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
                {trainProjects.map(project => <ProjectCard key={project._id} project={project} />)}
              </div>
            </div>
          )}

          {!hasProjects && (
            <div style={{ textAlign: 'center', padding: '4rem 2rem', color: 'var(--text-muted)' }}>
              <p style={{ fontSize: '1.1rem' }}>{t('services.updating', 'Nội dung đang cập nhật...')}</p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
