'use client'

import { useState, useEffect, useCallback } from 'react'
import { useI18n } from '../lib/i18n'
import { urlFor } from '../lib/sanity'
import ServiceCard from '../components/ServiceCard'
import ProjectCard from '../components/ProjectCard'
import HeroFloatingBadges from '../components/HeroFloatingBadges'

/* ------------------------------------------------------------------ */
/*  Slideshow – cycles through hero images from CMS                   */
/* ------------------------------------------------------------------ */
function HeroSlideshow({ slides }) {
  const [current, setCurrent] = useState(0)

  const advance = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length)
  }, [slides.length])

  useEffect(() => {
    if (slides.length <= 1) return
    const id = setInterval(advance, 4500)
    return () => clearInterval(id)
  }, [slides.length, advance])

  return (
    <>
      {slides.map((slide, i) => (
        <img
          key={i}
          src={urlFor(slide)}
          alt=""
          className="slide"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity: i === current ? 1 : 0,
            transition: 'opacity 1s ease-in-out',
          }}
        />
      ))}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Default fallback service cards                                     */
/* ------------------------------------------------------------------ */
const fallbackServices = [
  {
    _key: 'fs1',
    title: {
      vi: 'Đào tạo BIM Online',
      en: 'Online BIM Training',
    },
    description: {
      vi: 'Khóa học trực tuyến linh hoạt, trang bị kỹ năng thực chiến với các phần mềm hàng đầu trong ngành.',
      en: 'Flexible online courses providing practical skills with top industry software.',
    },
    icon: '🌉',
    link: '/services',
    accentColor: 'red',
  },
  {
    _key: 'fs2',
    title: {
      vi: 'Dịch vụ Mô hình BIM',
      en: 'BIM Modeling Services',
    },
    description: {
      vi: 'Xây dựng mô hình thông tin công trình chính xác cao cho kiến trúc, kết cấu và MEP.',
      en: 'Building high-precision building information models for architecture, structure, and MEP.',
    },
    icon: '🏗️',
    link: '/services',
    accentColor: 'green',
  },
  {
    _key: 'fs3',
    title: {
      vi: 'Dịch vụ Số hóa Quản lý',
      en: 'Digital Management Services',
    },
    description: {
      vi: 'Ứng dụng Digital Twin và hệ thống tự động hóa quản lý vận hành dự án thông minh.',
      en: 'Applying Digital Twins and smart automation systems for project operations and management.',
    },
    icon: '💻',
    link: '/services',
    accentColor: 'red',
  },
]

/* ------------------------------------------------------------------ */
/*  HomeContent – client component that renders the homepage           */
/* ------------------------------------------------------------------ */
export default function HomeContent({ data }) {
  const { t, loc } = useI18n()

  const d = data || {}

  /* ---------- Hero ---------- */
  const heroTitle = d.heroTitle
    ? loc(d.heroTitle)
    : t('hero.title', 'ĐỔI MỚI SÁNG TẠO CÔNG NGHỆ')

  const heroSubtitle = d.heroSubtitle
    ? loc(d.heroSubtitle)
    : t('hero.subtitle', 'Cung cấp giải pháp số hóa toàn diện và thiết kế đột phá cho tương lai.')

  const heroCtaPrimary = d.heroCta?.primary
    ? loc(d.heroCta.primary)
    : t('hero.cta_primary', 'Khám phá')

  const heroCtaSecondary = d.heroCta?.secondary
    ? loc(d.heroCta.secondary)
    : t('hero.cta_secondary', 'Liên hệ ngay')

  const heroCtaLinkPrimary = d.heroCtaLink?.primary || '/services'
  const heroCtaLinkSecondary = d.heroCtaLink?.secondary || '#contact'

  const slides = d.heroSlides && d.heroSlides.length > 0 ? d.heroSlides : null

  /* ---------- Services ---------- */
  const services =
    d.featuredServices && d.featuredServices.length > 0
      ? d.featuredServices
      : fallbackServices

  /* ---------- Projects ---------- */
  const projects = d.featuredProjects || []

  return (
    <main>
      {/* ======== HERO SECTION ======== */}
      <section className="hero">
        {/* Animated scan lines */}
        <div className="ds-line dl-1" />
        <div className="ds-line dl-2" />
        <div className="ds-line dl-3" />
        <div className="ds-line dl-4" />
        <div className="ds-line dl-5" />

        {/* Floating tech badges — JS-driven random wandering */}
        <HeroFloatingBadges />

        {/* Orbit system */}
        <div className="orbit-system">
          <div className="core" />
          <div className="orbit orbit-1"><div className="satellite sat-1" /></div>
          <div className="orbit orbit-2"><div className="satellite sat-2" /></div>
          <div className="orbit orbit-3"><div className="satellite sat-3" /></div>
          <div className="tech-particle tp-1">BIM</div>
          <div className="tech-particle tp-2">AI</div>
          <div className="tech-particle tp-3">IoT</div>
          <div className="tech-particle tp-4">3D</div>
          <div className="tech-particle tp-5">DT</div>
          <div className="tech-particle tp-6">VR</div>
          <div className="tech-particle tp-7">AR</div>
          <div className="tech-particle tp-8">CDE</div>
          <div className="tech-particle tp-9">API</div>
          <div className="tech-hex hex-1" />
          <div className="tech-hex hex-2" />
          <div className="tech-hex hex-3" />
          <div className="tech-hex hex-4" />
          <div className="tech-ring ring-1" />
          <div className="tech-ring ring-2" />
          <div className="tech-ring ring-3" />
          <div className="tech-dot dot-1" />
          <div className="tech-dot dot-2" />
          <div className="tech-dot dot-3" />
          <div className="tech-dot dot-4" />
          <div className="tech-dot dot-5" />
          <div className="tech-dot dot-6" />
          <div className="tech-dot dot-7" />
          <div className="tech-dot dot-8" />
          <div className="tech-dot dot-9" />
          <div className="tech-dot dot-10" />
          <div className="orbit orbit-4"><div className="satellite sat-4" /></div>
          <div className="orbit orbit-5" />
          <div className="tech-particle tp-10">ML</div>
          <div className="tech-particle tp-11">CLOUD</div>
          <div className="tech-particle tp-12">GIS</div>
          <div className="data-node dn-1" />
          <div className="data-node dn-2" />
          <div className="data-node dn-3" />
        </div>

        <div className="container hero-container" style={{ display: 'grid' }}>
          {/* Left — content */}
          <div className="hero-content">
            <h1
              className="hero-title"
              dangerouslySetInnerHTML={{ __html: heroTitle }}
            />
            <p className="hero-subtitle">{heroSubtitle}</p>
            <div className="hero-buttons">
              <a href={heroCtaLinkPrimary} className="btn btn-primary">
                {heroCtaPrimary}
              </a>
              <a href={heroCtaLinkSecondary} className="btn btn-secondary">
                {heroCtaSecondary}
              </a>
            </div>
          </div>

          {/* Right — visual / slideshow */}
          <div className="hero-visual">
            {slides ? (
              <>
                <HeroSlideshow slides={slides} />
                {/* Caption overlay */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(10,10,30,0.8) 0%, transparent 100%)', padding: '0.8rem 1rem 0.6rem', pointerEvents: 'none', zIndex: 5 }}>
                  <p style={{ color: 'white', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, margin: 0 }}>
                    {t('slide.caption', 'Đào tạo BIM Revit Cầu Đường — Thực hành tại doanh nghiệp')}
                  </p>
                </div>
              </>
            ) : (
              <div style={{ width: '100%', height: '100%', borderRadius: '14px', background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
            )}
          </div>
        </div>
      </section>

      {/* ======== FEATURED SERVICES ======== */}
      <section className="section-padding bg-alt">
        <div className="container">
          <h2 className="section-title">
            {t('services.title', 'Dịch vụ')}{' '}
            <span>{t('services.featured', 'Nổi bật')}</span>
          </h2>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '2rem',
            }}
          >
            {services.map((svc, i) => (
              <ServiceCard
                key={svc._key || svc._id || i}
                title={svc.title}
                description={svc.description}
                icon={svc.icon}
                image={svc.image}
                link={svc.link}
                accentColor={svc.accentColor || (i % 2 === 0 ? 'red' : 'green')}
              />
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
            <a href="/services" className="btn btn-secondary">
              {t('services.view_all', 'Xem tất cả Dịch vụ')}
            </a>
          </div>
        </div>
      </section>

      {/* ======== FEATURED PROJECTS ======== */}
      {projects.length > 0 && (
        <section style={{ padding: '5rem 0' }}>
          <div className="container">
            <h2 className="section-title">
              <span>{t('projects.title', 'Dự án')}</span>{' '}
              {t('projects.featured', 'Tiêu biểu')}
            </h2>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: '2rem',
              }}
            >
              {projects.map((project) => (
                <ProjectCard
                  key={project._id}
                  project={project}
                />
              ))}
            </div>

            <div style={{ textAlign: 'center', marginTop: '2.5rem' }}>
              <a href="/projects" className="btn btn-primary">
                {t('projects.view_all', 'Xem tất cả Dự án')}
              </a>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
