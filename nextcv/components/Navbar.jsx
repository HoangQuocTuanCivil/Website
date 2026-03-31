"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLang = () => setLangOpen(!langOpen);

  const changeLang = (langCode, flagSrc, text) => {
    if (typeof window !== "undefined" && window.changeLanguage) {
      window.changeLanguage(langCode);
      
      // Cập nhật UI nút dropdown
      const flagImg = document.getElementById("currentFlag");
      const langText = document.getElementById("currentLangText");
      if (flagImg) flagImg.src = flagSrc;
      if (langText) langText.textContent = text;
      
      setLangOpen(false);
    }
  };

  return (
    <nav className="navbar" style={{ boxShadow: "var(--shadow-md)" }}>
      <div className="container nav-container">
        <Link href="/" className="logo">
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1 }}>
            <div><span className="logo-red">BIM</span><span className="logo-green">Innovator</span></div>
            <span style={{ fontSize: "0.75rem", color: "var(--primary-red)", fontFamily: "var(--font-body)", marginTop: "4px" }} data-i18n="nav.subtitle" suppressHydrationWarning>
              BIM & Digital Twin
            </span>
          </div>
        </Link>
        <div className={`nav-menu ${menuOpen ? "active" : ""}`} id="nav-menu">
          <ul className="nav-list">
            <li><Link href="/" className={`nav-link ${pathname === "/" ? "active" : ""}`} data-i18n="nav.home" suppressHydrationWarning>Trang chủ</Link></li>
            <li><Link href="/about" className={`nav-link ${pathname === "/about" ? "active" : ""}`} data-i18n="nav.about" suppressHydrationWarning>Về tôi</Link></li>
            <li><Link href="/services" className={`nav-link ${pathname === "/services" ? "active" : ""}`} data-i18n="nav.services" suppressHydrationWarning>Dịch vụ</Link></li>
            <li><Link href="/projects" className={`nav-link ${pathname === "/projects" ? "active" : ""}`} data-i18n="nav.projects" suppressHydrationWarning>Dự án</Link></li>
          </ul>
          <div className={`custom-lang-selector ${langOpen ? "open" : ""}`} onClick={toggleLang}>
            <div className="lang-current">
              <img src="/styles/icon/ViietnamLanguage.png" alt="VI" className="lang-flag" id="currentFlag" />
              <span id="currentLangText">VI</span>
            </div>
            {langOpen && (
              <div className="lang-options active" style={{ display: "block" }}>
                <div className="lang-option" onClick={() => changeLang('vi', '/styles/icon/ViietnamLanguage.png', 'VI')}><img src="/styles/icon/ViietnamLanguage.png" alt="VI" className="lang-flag" /> VI</div>
                <div className="lang-option" onClick={() => changeLang('en', '/styles/icon/EnglishLanguage.png', 'EN')}><img src="/styles/icon/EnglishLanguage.png" alt="EN" className="lang-flag" /> EN</div>
                <div className="lang-option" onClick={() => changeLang('zh', '/styles/icon/ChinaLanguage.png', '中文')}><img src="/styles/icon/ChinaLanguage.png" alt="ZH" className="lang-flag" /> 中文</div>
                <div className="lang-option" onClick={() => changeLang('ja', '/styles/icon/JapanLanguage.png', 'JP')}><img src="/styles/icon/JapanLanguage.png" alt="JA" className="lang-flag" /> JP</div>
              </div>
            )}
          </div>
        </div>
        <div className={`hamburger ${menuOpen ? "active" : ""}`} onClick={toggleMenu}>
          <span className="bar"></span><span className="bar"></span><span className="bar"></span>
        </div>
      </div>
    </nav>
  );
}
