export default function ServicesPage() {
  const htmlContent = `
    <!-- Services Section -->
    <section class="services section-padding" style="margin-top: 80px; min-height: calc(100vh - 80px);">
        <div class="container">
            <h2 class="section-title"><span data-i18n="services.title">Dịch vụ</span> <span>Cung cấp</span></h2>
            
            <div class="services-tabs">
                <button class="tab-btn active" data-tab="tab-online" data-i18n="services.tab1">Đào tạo BIM Online</button>
                <button class="tab-btn" data-tab="tab-corp" data-i18n="services.tab2">Đào tạo BIM Doanh nghiệp</button>
                <button class="tab-btn" data-tab="tab-model" data-i18n="services.tab3">Dịch vụ Mô hình BIM</button>
            </div>

            <!-- Tab Contents -->
            <div class="tab-content active" id="tab-online">
                <!-- Course Header -->
                <div class="course-header" style="background: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%); border-radius: 16px; padding: 2.5rem 3rem; color: white;">
                    <div class="course-icon-big" style="font-size: 4rem;"></div>
                    <div class="course-header-text">
                        <h3 data-i18n="crs.title" style="font-family: var(--font-display); font-size: 1.6rem; font-weight: 800;">REVIT CẦU ĐƯỜNG ONLINE</h3>
                        <p style="color:rgba(255,255,255,0.7); font-size:0.95rem;" data-i18n="crs.subtitle">Chương trình đào tạo thực chiến.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>
  `;

  return (
    <main dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
