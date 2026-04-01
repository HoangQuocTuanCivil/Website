'use client'

import Link from 'next/link'
import { useI18n } from '../lib/i18n'

export default function Footer() {
  const { t } = useI18n()

  return (
    <footer className="footer">
      <div className="container">
      <div className="footer-grid">
        {/* Column 1: Branding */}
        <div className="footer-col">
          <Link href="/" className="logo" style={{ marginBottom: '1rem', display: 'inline-block' }}>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1 }}>
              <div><span className="logo-red">BIM</span><span className="logo-green">Innovator</span></div>
            </div>
          </Link>
          <p style={{ fontSize: '0.88rem', color: '#a0a0a0', lineHeight: 1.7, marginTop: '0.8rem' }}>
            {t('footer.desc', 'Kiến tạo tương lai với sức mạnh số và các giải pháp thông minh toàn diện trong lĩnh vực Kiến trúc & Xây dựng.')}
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="footer-col">
          <h4 className="footer-heading">{t('footer.links.title', 'Liên kết Nhanh')}</h4>
          <ul className="footer-links">
            <li><Link href="/">{t('nav.home', 'Trang chủ')}</Link></li>
            <li><Link href="/about">{t('nav.about', 'Về tôi')}</Link></li>
            <li><Link href="/projects">{t('nav.projects', 'Dự án')}</Link></li>
          </ul>
        </div>

        {/* Column 3: Services */}
        <div className="footer-col">
          <h4 className="footer-heading">{t('footer.services.title', 'Dịch vụ')}</h4>
          <ul className="footer-links">
            <li><Link href="/services">{t('footer.svc1', 'Đào tạo BIM Online')}</Link></li>
            <li><Link href="/services">{t('footer.svc2', 'Đào tạo BIM Doanh nghiệp')}</Link></li>
            <li><Link href="/services">{t('footer.svc3', 'Mô hình BIM')}</Link></li>
          </ul>
        </div>

        {/* Column 4: Contact */}
        <div className="footer-col">
          <h4 className="footer-heading">{t('footer.contact.title', 'Liên hệ')}</h4>
          <p className="footer-contact">
            <span>{t('footer.contact.email_label', 'Email:')}</span>{' '}
            <a href="mailto:hoangquoctuan1395@gmail.com" style={{ color: '#a0a0a0' }}>hoangquoctuan1395@gmail.com</a>
          </p>
          <p className="footer-contact">
            <span>{t('footer.contact.phone_label', 'Phone:')}</span>{' '}
            <a href="tel:+84399762377" style={{ color: '#a0a0a0' }}>+84 399 762 377</a>
          </p>
          <p className="footer-contact">
            <span>{t('footer.contact.address_label', 'Địa chỉ:')}</span>{' '}
            <span>{t('footer.contact.address', 'Hà Nội, Việt Nam')}</span>
          </p>
        </div>
      </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Hoàng Quốc Tuấn — BIM Innovator. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}
