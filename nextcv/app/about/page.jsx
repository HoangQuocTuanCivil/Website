export default function AboutPage() {
  const htmlContent = `
    <!-- ==================== HERO BANNER ==================== -->
    <section class="about-hero">
        <div class="container about-hero-grid">
            <div class="avatar-wrapper">
                <div class="avatar-ring"><img src="/Lir/anh%20dai%20dien.jpg" alt="Hoàng Quốc Tuấn"></div>
                <div class="avatar-name">HOÀNG QUỐC TUẤN</div>
                <div class="avatar-title">KS. | CTO | BIM Expert</div>
            </div>
            <div class="about-hero-content">
                <div class="hero-badge" data-i18n="ab.badge">Chief Technology Officer</div>
                <h1 data-i18n="ab.hero_title">Kiến tạo tương lai <br>với <span class="red">BIM</span> & <span class="green">Digital Twin</span></h1>
                <p class="about-hero-desc" data-i18n="ab.hero_desc">
                    Hơn 8 năm kinh nghiệm trong lĩnh vực kỹ thuật xây dựng công trình giao thông và công nghệ thông tin.
                    Tôi là người tiên phong ứng dụng BIM, Digital Twin và tự động hóa quy trình vào
                    các dự án hạ tầng giao thông quy mô lớn tại Việt Nam.
                    Hiện đang giữ vị trí <strong style="color:var(--primary-green)">Phó Tổng Giám đốc phụ trách Công nghệ (CTO)</strong>
                    tại Công ty Cổ phần Tư vấn Xây dựng A2Z và đồng thời là <strong style="color:var(--primary-red)">Người sáng lập Công ty Cổ phần Xây dựng AEVN BIM</strong>.
                </p>
                <div class="hero-stats">
                    <div class="hero-stat">
                        <div class="hero-stat-num">8+</div>
                        <div class="hero-stat-label" data-i18n="ab.stat1">Năm kinh nghiệm</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-num">150+</div>
                        <div class="hero-stat-label" data-i18n="ab.stat2">Dự án hoàn thành</div>
                    </div>
                    <div class="hero-stat">
                        <div class="hero-stat-num">500+</div>
                        <div class="hero-stat-label" data-i18n="ab.stat3">Học viên đào tạo</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== HÀNH TRÌNH SỰ NGHIỆP ==================== -->
    <section class="section-padding">
        <div class="container">
            <p class="section-label" style="text-align:center;" data-i18n="ab.career_label">Career Path</p>
            <h2 class="section-heading" style="text-align:center;" data-i18n="ab.career_heading">Hành trình <span class="highlight-red">Sự nghiệp</span></h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem;">
                <!-- Cột trái -->
                <div class="timeline">
                    <div class="timeline-item" style="border-left: 3px solid var(--primary-red); padding-left: 2rem;">
                        <div class="timeline-date" style="font-size:0.95rem;" data-i18n="ab.c1.date">Hiện tại</div>
                        <div class="timeline-role" style="font-size:1.15rem;" data-i18n="ab.c1.role">Phó Tổng Giám đốc phụ trách Công nghệ (CTO)</div>
                        <div class="timeline-company" data-i18n="ab.c1.company">Công ty CP Tư vấn Xây dựng A2Z</div>
                        <div class="timeline-desc" data-i18n="ab.c1.desc">Phụ trách chiến lược công nghệ, chuyển đổi số và triển khai BIM toàn diện cho các dự án hạ tầng giao thông trọng điểm quốc gia.</div>
                    </div>
                    <div class="timeline-item green">
                        <div class="timeline-date" data-i18n="ab.c2.date">02/2025 — Nay</div>
                        <div class="timeline-role" data-i18n="ab.c2.role">Giám đốc Chi nhánh</div>
                        <div class="timeline-company" data-i18n="ab.c2.company">CT CP Tư vấn Thiết kế Xây dựng A2Z (Thành viên Đèo Cả)</div>
                        <div class="timeline-desc" data-i18n="ab.c2.desc">Quản lý chi nhánh, lãnh đạo phòng BIM và Công nghệ số cho các dự án hạ tầng lớn.</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date" data-i18n="ab.c3.date">10/2024 — 02/2025</div>
                        <div class="timeline-role" data-i18n="ab.c3.role">Giám đốc Chi nhánh</div>
                        <div class="timeline-company" data-i18n="ab.c3.company">CT CP Tư vấn Thiết kế Xây dựng Đại Phong (Thành viên Đèo Cả)</div>
                        <div class="timeline-desc" data-i18n="ab.c3.desc">Điều hành chi nhánh, triển khai dự án thiết kế xây dựng lớn tại phía Nam.</div>
                    </div>
                </div>
                <!-- Cột phải -->
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-date" data-i18n="ab.c5.date">01/2024 — 04/2024</div>
                        <div class="timeline-role" data-i18n="ab.c5.role">Leader BIM</div>
                        <div class="timeline-company" data-i18n="ab.c5.company">Công ty CP Tập đoàn Đèo Cả</div>
                        <div class="timeline-desc" data-i18n="ab.c5.desc">Dẫn dắt đội ngũ BIM, triển khai mô hình hóa cho các dự án hạ tầng giao thông.</div>
                    </div>
                    <div class="timeline-item green">
                        <div class="timeline-date" data-i18n="ab.c6.date">05/2023 — 12/2023</div>
                        <div class="timeline-role" data-i18n="ab.c6.role">BIM Manager</div>
                        <div class="timeline-company" data-i18n="ab.c6.company">Kuukan Design Architects Việt Nam (Thành viên Space Design)</div>
                        <div class="timeline-desc" data-i18n="ab.c6.desc">Quản lý BIM cho các dự án kiến trúc quốc tế, phối hợp với đối tác Nhật Bản.</div>
                    </div>
                    <div class="timeline-item">
                        <div class="timeline-date" data-i18n="ab.c7.date">2022 — 2023</div>
                        <div class="timeline-role" data-i18n="ab.c7.role">BIM Leader & Giảng viên Đào tạo BIM</div>
                        <div class="timeline-company" data-i18n="ab.c7.company">BIM Hà Nội</div>
                        <div class="timeline-desc" data-i18n="ab.c7.desc">Đào tạo BIM chuyên sâu, xây dựng chương trình giảng dạy và phát triển đội ngũ BIM chuyên nghiệp.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== HỌC VẤN ==================== -->
    <section class="section-padding bg-alt">
        <div class="container">
            <p class="section-label" style="text-align:center;" data-i18n="ab.edu_label">Education</p>
            <h2 class="section-heading" style="text-align:center;" data-i18n="ab.edu_heading">Nền tảng <span class="highlight-green">Học vấn</span></h2>
            <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 2rem;">
                <div class="timeline">
                    <div class="timeline-item green">
                        <div class="timeline-date" data-i18n="ab.e1.date">Kỹ sư (Engineer)</div>
                        <div class="timeline-role" data-i18n="ab.e1.role">Chuyên ngành Kỹ thuật xây dựng công trình giao thông</div>
                        <div class="timeline-company" data-i18n="ab.e1.company">Đại học Bách khoa Đà Nẵng (DUT)</div>
                        <div class="timeline-desc" data-i18n="ab.e1.desc">Tốt nghiệp Kỹ sư tại trường kỹ thuật hàng đầu miền Trung Việt Nam. Chuyên sâu về khoa học và công nghệ.</div>
                    </div>
                </div>
                <div class="timeline">
                    <div class="timeline-item">
                        <div class="timeline-date" data-i18n="ab.e2.date">Chứng chỉ Quốc tế</div>
                        <div class="timeline-role" data-i18n="ab.e2.role">BIM Professional Certification</div>
                        <div class="timeline-company" data-i18n="ab.e2.company">Autodesk & Đối tác Quốc tế</div>
                        <div class="timeline-desc" data-i18n="ab.e2.desc">Chứng nhận chuyên gia BIM từ các tổ chức quốc tế. Thành thạo Revit, Civil 3D, Navisworks, BIM 360, Dynamo Scripting.</div>
                    </div>
                </div>
                <div class="timeline">
                    <div class="timeline-item green">
                        <div class="timeline-date" data-i18n="ab.e3.date">Kỹ sư (Engineer)</div>
                        <div class="timeline-role" data-i18n="ab.e3.role">Chuyên ngành Xây dựng Đường sắt tốc độ cao và Đường sắt đô thị</div>
                        <div class="timeline-company" data-i18n="ab.e3.company">Đại học Giao thông vận tải Hồ Chí Minh (UTH)</div>
                        <div class="timeline-desc" data-i18n="ab.e3.desc">Tốt nghiệp Kỹ sư tại một trong những trường kỹ thuật hàng đầu Việt Nam. Chuyên sâu về xây dựng công trình giao thông.</div>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <!-- ==================== KỸ NĂNG ==================== -->
    <section class="section-padding">
        <div class="container">
            <p class="section-label" style="text-align:center;" data-i18n="ab.skill_label">Chuyên môn</p>
            <h2 class="section-heading" style="text-align:center;" data-i18n="ab.skill_heading">Kỹ năng & <span class="highlight-red">Công cụ</span></h2>
            <div class="skills-grid">
                <div class="skill-category">
                    <div class="skill-cat-title" data-i18n="ab.sk1">BIM Software</div>
                    <div class="skill-tags">
                        <span class="skill-tag">Autodesk Revit</span>
                        <span class="skill-tag">Civil 3D</span>
                        <span class="skill-tag">Navisworks</span>
                        <span class="skill-tag">BIM 360</span>
                        <span class="skill-tag">Dynamo</span>
                        <span class="skill-tag">Infraworks</span>
                    </div>
                </div>
                <div class="skill-category">
                    <div class="skill-cat-title" data-i18n="ab.sk2">Lập trình & Dev</div>
                    <div class="skill-tags">
                        <span class="skill-tag">C# / .NET</span>
                        <span class="skill-tag">Java</span>
                        <span class="skill-tag">Python</span>
                        <span class="skill-tag">HTML/CSS/JS</span>
                        <span class="skill-tag">Dynamo Script</span>
                    </div>
                </div>
                <!-- Other categories omitted for brevity in template -->
            </div>
        </div>
    </section>
  `;

  return (
    <main className="about-page" dangerouslySetInnerHTML={{ __html: htmlContent }} />
  );
}
