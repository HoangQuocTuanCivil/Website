export default function ProjectsPage() {
  const htmlContent = `
    <!-- Page Hero -->
    <div class="page-hero">
        <div class="container">
            <h1>🏆 <span data-i18n="projects.page_title">Danh mục Dự án</span></h1>
            <p data-i18n="projects.page_sub">Tổng hợp các công trình BIM thực tế đã triển khai — từ hạ tầng giao thông, dân dụng đến đào tạo chuyên nghiệp</p>
        </div>
    </div>

    <!-- Projects Section -->
    <section style="padding: 2.5rem 0 4rem;">
        <div class="container">
            <!-- === PART 1: BIM MODELING PROJECTS === -->
            <div class="train-section-title" data-i18n="projects.cat_bim">🌉 Dự án Mô hình BIM</div>

            <div class="portfolio-grid">
                <!-- 1: Cao tốc Hữu Nghị - Chi Lăng (wide) -->
                <div class="pcard wide" data-category="bim">
                    <div class="pcard-img">
                        <img src="/assets/m_caubetong.png" alt="Cầu bê tông cao tốc Hữu Nghị - Chi Lăng">
                        <span class="pcard-badge" data-i18n="bim.tag_highway">Cao tốc</span>
                    </div>
                    <div class="pcard-body">
                        <div class="pcard-cat" data-i18n="bim.tag_highway">Cao tốc</div>
                        <div class="pcard-title" data-i18n="bim.p1_title">Mô hình BIM Cầu Bê tông — Cao tốc Hữu Nghị - Chi Lăng</div>
                        <div class="pcard-desc" data-i18n="bim.p1_desc">Triển khai mô hình BIM toàn diện cho hệ thống cầu bê tông dự ứng lực trên tuyến cao tốc Hữu Nghị - Chi Lăng.</div>
                        <div class="pcard-meta">
                            <span class="pcard-tag">Revit</span><span class="pcard-tag">Civil 3D</span>
                        </div>
                    </div>
                </div>

                <!-- 2: Nút giao HN-HP -->
                <div class="pcard" data-category="bim">
                    <div class="pcard-img">
                        <img src="/assets/m_caunutgiao1.png" alt="Cầu nút giao Hà Nội - Hải Phòng">
                        <span class="pcard-badge green" data-i18n="bim.tag_interchange">Nút giao</span>
                    </div>
                    <div class="pcard-body">
                        <div class="pcard-cat green" data-i18n="bim.tag_interchange">Nút giao</div>
                        <div class="pcard-title" data-i18n="bim.p2_title">Cầu trong Nút giao Hà Nội - Hải Phòng</div>
                        <div class="pcard-desc" data-i18n="bim.p2_desc">Mô hình BIM hệ thống cầu phức tạp trong nút giao cao tốc Hà Nội - Hải Phòng với nhiều tầng vượt.</div>
                        <div class="pcard-meta">
                            <span class="pcard-tag">Revit</span><span class="pcard-tag">Navisworks</span>
                        </div>
                    </div>
                </div>
            </div><!-- /portfolio-grid BIM -->
            
            <div class="train-section-title" style="border-color: var(--primary-red);" data-i18n="projects.cat_train">🎓 Đào tạo BIM Doanh nghiệp</div>
            <div class="portfolio-grid">
                <!-- Training Cards -->
                <div class="pcard wide" data-category="train">
                    <div class="pcard-img">
                        <img src="/assets/corp1.png" alt="Đào tạo BIM doanh nghiệp 1">
                        <span class="pcard-badge" style="background:#7b1fa2;">Đào tạo</span>
                    </div>
                    <div class="pcard-body">
                        <div class="pcard-cat" style="color:#7b1fa2;">Đào tạo Doanh nghiệp</div>
                        <div class="pcard-title" data-i18n="corp.cta_title">Chương trình Đào tạo BIM Revit Cầu Đường tại Doanh nghiệp</div>
                        <div class="pcard-desc">Khóa đào tạo thực chiến tại doanh nghiệp, kết hợp lý thuyết và thực hành trực tiếp trên dự án thực tế.</div>
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
