import HeroCanvas from "../components/HeroCanvas";
import ContactForm from "../components/ContactForm";

export default function Home() {
  const htmlContent = `
    <!-- ======= DỊCH VỤ NỔI BẬT ======= -->
    <section class="section-padding bg-alt">
        <div class="container">
            <h2 class="section-title">Dịch vụ <span>Nổi bật</span></h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem;">

                <!-- Card 1: Đào tạo BIM Online -->
                <a href="/services" style="display:block; background:white; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-sm); transition:var(--transition); border-bottom:4px solid var(--primary-red); text-decoration:none; color:inherit;">
                    <div style="height:180px; background:linear-gradient(135deg,#1a1a2e,#0f3460); display:flex; align-items:center; justify-content:center; font-size:4rem;">🌉</div>
                    <div style="padding:1.5rem;">
                        <h3 style="font-family:var(--font-display); font-size:1rem; font-weight:800; margin-bottom:0.6rem;" data-i18n="idx.svc1_title">Đào tạo BIM Online</h3>
                        <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;" data-i18n="idx.svc1_desc">Chương trình Revit Cầu Đường 16 bài — Video + File thực hành, học Online linh hoạt.</p>
                        <div style="margin-top:1rem; color:var(--primary-red); font-weight:700; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px;" data-i18n="idx.svc_link">Xem chi tiết →</div>
                    </div>
                </a>

                <!-- Card 2: Mô hình BIM -->
                <a href="/services" style="display:block; background:white; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-sm); transition:var(--transition); border-bottom:4px solid var(--primary-green); text-decoration:none; color:inherit;">
                    <div style="height:180px; overflow:hidden;">
                        <img src="/assets/m_caubetong.png" alt="Mô hình BIM" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div style="padding:1.5rem;">
                        <h3 style="font-family:var(--font-display); font-size:1rem; font-weight:800; margin-bottom:0.6rem;" data-i18n="idx.svc2_title">Dịch vụ Mô hình BIM</h3>
                        <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;" data-i18n="idx.svc2_desc">Xây dựng mô hình BIM chính xác cao cho cầu, hầm, và công trình đa chuyên ngành.</p>
                        <div style="margin-top:1rem; color:var(--primary-green); font-weight:700; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px;" data-i18n="idx.svc_link">Xem chi tiết →</div>
                    </div>
                </a>

                <!-- Card 3: Số hóa Quản lý -->
                <a href="/services" style="display:block; background:white; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-sm); transition:var(--transition); border-bottom:4px solid var(--primary-red); text-decoration:none; color:inherit;">
                    <div style="height:180px; overflow:hidden;">
                        <img src="/assets/m_sohoaquanly1.png" alt="Số hóa Quản lý" style="width:100%;height:100%;object-fit:cover;">
                    </div>
                    <div style="padding:1.5rem;">
                        <h3 style="font-family:var(--font-display); font-size:1rem; font-weight:800; margin-bottom:0.6rem;" data-i18n="idx.svc3_title">Dịch vụ Số hóa Quản lý</h3>
                        <p style="font-size:0.88rem; color:var(--text-muted); line-height:1.6;" data-i18n="idx.svc3_desc">Số hóa quy trình quản lý dự án, tài liệu kỹ thuật trên nền tảng Cloud.</p>
                        <div style="margin-top:1rem; color:var(--primary-red); font-weight:700; font-size:0.85rem; text-transform:uppercase; letter-spacing:1px;" data-i18n="idx.svc_link">Xem chi tiết →</div>
                    </div>
                </a>

            </div>
            <div style="text-align:center; margin-top:2.5rem;">
                <a href="/services" class="btn btn-secondary" data-i18n="idx.all_svc">Xem tất cả Dịch vụ</a>
            </div>
        </div>
    </section>

    <!-- ======= DỰ ÁN TIÊU BIỂU ======= -->
    <section style="padding: 5rem 0; background-color: var(--bg-color);">
        <div class="container">
            <h2 class="section-title"><span>Dự án</span> Tiêu biểu</h2>
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">

                <a href="/projects" style="display:block; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-md); transition:var(--transition); text-decoration:none;">
                    <div style="position:relative; height:200px; overflow:hidden;">
                        <img src="/assets/m_caunutgiao1.png" alt="Nút giao Hà Nội - Hải Phòng" style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s;">
                        <span style="position:absolute;top:10px;left:10px;background:var(--primary-green);color:white;font-size:0.7rem;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1px;" data-i18n="idx.tag_bim">MÔ HÌNH BIM</span>
                    </div>
                    <div style="padding:1.2rem;background:white;">
                        <div style="font-family:var(--font-display);font-size:0.9rem;font-weight:800;color:var(--text-color);margin-bottom:0.4rem;" data-i18n="idx.p1_title">Cầu trong Nút giao Hà Nội - Hải Phòng</div>
                        <div style="font-size:0.8rem;color:var(--text-muted);" data-i18n="idx.p1_desc">Mô hình BIM hệ thống cầu phức tạp nhiều tầng vượt, phối hợp đa chuyên ngành.</div>
                    </div>
                </a>

                <a href="/projects" style="display:block; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-md); transition:var(--transition); text-decoration:none;">
                    <div style="position:relative; height:200px; overflow:hidden;">
                        <img src="/assets/m_scantobim.png" alt="Scan to BIM" style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s;">
                        <span style="position:absolute;top:10px;left:10px;background:var(--primary-red);color:white;font-size:0.7rem;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1px;" data-i18n="idx.tag_scan">SCAN TO BIM</span>
                    </div>
                    <div style="padding:1.2rem;background:white;">
                        <div style="font-family:var(--font-display);font-size:0.9rem;font-weight:800;color:var(--text-color);margin-bottom:0.4rem;" data-i18n="idx.p2_title">Scan to BIM — Point Cloud LiDAR</div>
                        <div style="font-size:0.8rem;color:var(--text-muted);" data-i18n="idx.p2_desc">Quét laser 3D hiện trạng công trình, chuyển đổi thành mô hình BIM ±2mm với Revit.</div>
                    </div>
                </a>

                <a href="/projects" style="display:block; border-radius:14px; overflow:hidden; box-shadow:var(--shadow-md); transition:var(--transition); text-decoration:none;">
                    <div style="position:relative; height:200px; overflow:hidden;">
                        <img src="/assets/m_sohoaquanly2.png" alt="Số hóa Quản lý Dự án" style="width:100%;height:100%;object-fit:cover;transition:transform 0.5s;">
                        <span style="position:absolute;top:10px;left:10px;background:var(--primary-green);color:white;font-size:0.7rem;font-weight:700;padding:3px 10px;border-radius:20px;letter-spacing:1px;" data-i18n="idx.tag_digital">SỐ HÓA</span>
                    </div>
                    <div style="padding:1.2rem;background:white;">
                        <div style="font-family:var(--font-display);font-size:0.9rem;font-weight:800;color:var(--text-color);margin-bottom:0.4rem;" data-i18n="idx.p3_title">Số hóa Quản lý Dự án BIM360</div>
                        <div style="font-size:0.8rem;color:var(--text-muted);" data-i18n="idx.p3_desc">Triển khai nền tảng quản lý tài liệu, dữ liệu và quy trình trên Cloud.</div>
                    </div>
                </a>

            </div>
            <div style="text-align:center; margin-top:2.5rem;">
                <a href="/projects" class="btn btn-primary" data-i18n="idx.all_prj">Xem tất cả Dự án</a>
            </div>
        </div>
    </section>
  `;

  return (
    <>
      <HeroCanvas />
      <main dangerouslySetInnerHTML={{ __html: htmlContent }} />
      <ContactForm />
    </>
  );
}
