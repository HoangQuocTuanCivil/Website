import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-col brand-col">
          <Link href="/" className="logo footer-logo">
            <span className="logo-red">BIM</span><span className="logo-green">Innovator</span>
          </Link>
          <p className="footer-text" data-i18n="footer.desc" suppressHydrationWarning>
            Kiến tạo tương lai với sức mạnh số và các giải pháp thông minh toàn diện trong lĩnh vực Kiến trúc & Xây dựng.
          </p>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading" data-i18n="footer.links.title" suppressHydrationWarning>Liên kết Nhanh</h4>
          <ul className="footer-links">
            <li><Link href="/" data-i18n="nav.home" suppressHydrationWarning>Trang chủ</Link></li>
            <li><Link href="/about" data-i18n="nav.about" suppressHydrationWarning>Về tôi</Link></li>
            <li><Link href="/services" data-i18n="nav.services" suppressHydrationWarning>Dịch vụ</Link></li>
            <li><Link href="/projects" data-i18n="nav.projects" suppressHydrationWarning>Dự án</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading" data-i18n="footer.services.title" suppressHydrationWarning>Dịch vụ</h4>
          <ul className="footer-links">
            <li><Link href="/services#tab-online" data-i18n="footer.svc1" suppressHydrationWarning>Đào tạo BIM Online</Link></li>
            <li><Link href="/services#tab-corp" data-i18n="footer.svc2" suppressHydrationWarning>Đào tạo BIM Doanh nghiệp</Link></li>
            <li><Link href="/services#tab-model" data-i18n="footer.svc3" suppressHydrationWarning>Mô hình BIM</Link></li>
          </ul>
        </div>
        <div className="footer-col">
          <h4 className="footer-heading" data-i18n="footer.contact.title" suppressHydrationWarning>Liên hệ</h4>
          <p className="footer-contact"><span data-i18n="footer.contact.email_label" suppressHydrationWarning>Email:</span> <a href="mailto:hoangquoctuan1395@gmail.com" style={{color: "#a0a0a0"}}>hoangquoctuan1395@gmail.com</a></p>
          <p className="footer-contact"><span data-i18n="footer.contact.phone_label" suppressHydrationWarning>Phone:</span> <a href="tel:+84399762377" style={{color: "#a0a0a0"}}>+84 399 762 377</a></p>
          <p className="footer-contact"><span data-i18n="footer.contact.address_label" suppressHydrationWarning>Địa chỉ:</span> <span data-i18n="footer.contact.address" suppressHydrationWarning>Hà Nội, Việt Nam</span></p>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; 2026 Hoàng Quốc Tuấn — BIM Innovator. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
}
