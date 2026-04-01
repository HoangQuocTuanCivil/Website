import { createClient } from '@sanity/client'

const client = createClient({ projectId: 'wd53xh69', dataset: 'production', token: process.env.SANITY_TOKEN, apiVersion: '2024-01-01', useCdn: false })
function key() { return Math.random().toString(36).slice(2, 10) }

async function main() {
  // 1. Skills — Vietnamese names + translated category names
  await client.patch('aboutPage').set({
    skillCategories: [
      { _key: key(), categoryName: { _type: 'localizedString', vi: 'BIM Software', en: 'BIM Software', zh: 'BIM软件', ja: 'BIMソフトウェア' }, skills: ['Autodesk Revit','Civil 3D','Navisworks','BIM 360','Dynamo','Infraworks'] },
      { _key: key(), categoryName: { _type: 'localizedString', vi: 'Lập trình & Dev', en: 'Programming & Dev', zh: '编程与开发', ja: 'プログラミング＆開発' }, skills: ['C# / .NET','Java','Python','HTML/CSS/JS','Dynamo Script'] },
      { _key: key(), categoryName: { _type: 'localizedString', vi: 'Quản lý & Lãnh đạo', en: 'Management & Leadership', zh: '管理与领导', ja: 'マネジメント＆リーダーシップ' }, skills: ['Chiến lược CTO','Chuyển đổi số','Quản lý dự án','Đào tạo nội bộ'] },
      { _key: key(), categoryName: { _type: 'localizedString', vi: 'Hạ tầng Giao thông', en: 'Transportation Infrastructure', zh: '交通基础设施', ja: '交通インフラ' }, skills: ['Cao tốc & Cầu','Hầm xuyên núi','Đường đô thị','Quy hoạch'] },
      { _key: key(), categoryName: { _type: 'localizedString', vi: 'Công nghệ mới', en: 'Emerging Technologies', zh: '新兴技术', ja: '新技術' }, skills: ['Digital Twin','Scan to BIM','VR/AR','AI tự động hóa','IoT Công trình'] },
      { _key: key(), categoryName: { _type: 'localizedString', vi: 'Giảng dạy & Tư vấn', en: 'Teaching & Consulting', zh: '教育与咨询', ja: '教育＆コンサルティング' }, skills: ['BIM Online','BIM Doanh nghiệp','Tư vấn CDE','ISO 19650'] },
    ],
    heroStats: [
      { _key: key(), number: '8+', label: { _type: 'localizedString', vi: 'Năm kinh nghiệm', en: 'Years Experience', zh: '年经验', ja: '年の経験' } },
      { _key: key(), number: '150+', label: { _type: 'localizedString', vi: 'Dự án hoàn thành', en: 'Projects Completed', zh: '已完成项目', ja: '完了プロジェクト' } },
      { _key: key(), number: '500+', label: { _type: 'localizedString', vi: 'Học viên đào tạo', en: 'Trainees Taught', zh: '培训学员', ja: '研修生' } },
    ],
    heroBadge: { _type: 'localizedString', vi: 'Chief Technology Officer', en: 'Chief Technology Officer', zh: '首席技术官', ja: '最高技術責任者' },
    heroTitle: { _type: 'localizedString', vi: 'Kiến tạo tương lai <br>với <span class="red">BIM</span> & <span class="green">Digital Twin</span>', en: 'Forging the Future <br>with <span class="red">BIM</span> & <span class="green">Digital Twin</span>', zh: '用<span class="red">BIM</span>和<span class="green">Digital Twin</span><br>构建未来', ja: '<span class="red">BIM</span>と<span class="green">Digital Twin</span>で<br>未来を切り拓く' },
    jobTitle: { _type: 'localizedString', vi: 'Phó Tổng Giám đốc phụ trách Công nghệ (CTO)', en: 'Deputy General Director of Technology (CTO)', zh: '技术副总经理 (CTO)', ja: '技術担当副社長 (CTO)' },
    heroDescription: { _type: 'localizedText',
      vi: 'Hơn 8 năm kinh nghiệm trong lĩnh vực kỹ thuật xây dựng công trình giao thông và công nghệ thông tin. Tôi là người tiên phong ứng dụng BIM, Digital Twin và tự động hóa quy trình vào các dự án hạ tầng giao thông quy mô lớn tại Việt Nam. Hiện đang giữ vị trí <strong style="color:var(--primary-green)">Phó Tổng Giám đốc phụ trách Công nghệ (CTO)</strong> tại Công ty Cổ phần Tư vấn Xây dựng A2Z và đồng thời là <strong style="color:var(--primary-red)">Người sáng lập Công ty Cổ phần Xây dựng AEVN BIM</strong>.',
      en: 'Over 8 years of experience in transportation construction engineering and information technology. A pioneer in applying BIM, Digital Twin and process automation to large-scale transportation infrastructure projects in Vietnam. Currently serving as <strong style="color:var(--primary-green)">Deputy General Director of Technology (CTO)</strong> at A2Z Construction Consulting JSC and also <strong style="color:var(--primary-red)">Founder of AEVN BIM Construction JSC</strong>.',
      zh: '拥有8年以上交通建设工程和信息技术经验。BIM、Digital Twin和流程自动化在越南大型交通基础设施项目中的先驱应用者。现任<strong style="color:var(--primary-green)">A2Z建设咨询股份公司技术副总经理 (CTO)</strong>，同时也是<strong style="color:var(--primary-red)">AEVN BIM建设股份公司创始人</strong>。',
      ja: '交通建設工学と情報技術の分野で8年以上の経験。ベトナムの大規模交通インフラプロジェクトにBIM、Digital Twin、プロセス自動化を先駆的に適用。現在、<strong style="color:var(--primary-green)">A2Z建設コンサルティング株式会社の技術担当副社長（CTO）</strong>を務め、<strong style="color:var(--primary-red)">AEVN BIM建設株式会社の創設者</strong>でもあります。',
    },
  }).commit()
  console.log('✅ AboutPage i18n updated')

  // 2. HomePage hero + featuredServices
  await client.patch('homePage').set({
    heroTitle: { _type: 'localizedString', vi: 'ĐỔI MỚI: SÁNG TẠO, CÔNG NGHỆ', en: 'INNOVATION, CREATIVITY, TECHNOLOGY', zh: '创新：创造，技术', ja: 'イノベーション：創造、テクノロジー' },
    heroSubtitle: { _type: 'localizedText', vi: 'Cung cấp giải pháp số hóa toàn diện và thiết kế đột phá cho tương lai.', en: 'Delivering comprehensive digital solutions and breakthrough designs for the future.', zh: '为未来提供全面的数字化解决方案和突破性设计。', ja: '未来に向けた包括的なデジタルソリューションと画期的なデザインを提供します。' },
    heroCta: { _type: 'localizedString', vi: 'Khám phá', en: 'Explore', zh: '探索', ja: '探索する' },
  }).commit()
  console.log('✅ HomePage hero i18n updated')

  // 3. HomePage featuredServices
  const hp = await client.fetch('*[_type == "homePage"][0]{_id, featuredServices}')
  if (hp?.featuredServices) {
    const svc = hp.featuredServices
    if (svc[0]) {
      svc[0].title = { ...svc[0].title, zh: 'BIMオンライン研修', ja: 'BIMオンライン研修' }
      svc[0].description = { ...svc[0].description, zh: 'Revit桥梁道路16课时——视频+实践文件，灵活在线学习。', ja: 'Revit橋梁道路16レッスン——動画+実習ファイル、柔軟なオンライン学習。' }
    }
    if (svc[1]) {
      svc[1].title = { ...svc[1].title, zh: 'BIM建模服务', ja: 'BIMモデリングサービス' }
      svc[1].description = { ...svc[1].description, zh: '为桥梁、隧道和多专业工程构建高精度BIM模型。', ja: '橋梁・トンネル・多分野プロジェクトの高精度BIMモデルを構築。' }
    }
    if (svc[2]) {
      svc[2].title = { ...svc[2].title, zh: '数字化管理服务', ja: 'デジタル管理サービス' }
      svc[2].description = { ...svc[2].description, zh: '在BIM360/ACC Digital Twin平台上实现项目管理和技术文档数字化。', ja: 'BIM360/ACC Digital Twinプラットフォームでプロジェクト管理と技術文書をデジタル化。' }
    }
    await client.patch(hp._id).set({ featuredServices: svc }).commit()
    console.log('✅ FeaturedServices i18n updated')
  }

  // 4. SiteSettings
  await client.patch('siteSettings').set({
    siteSubtitle: { _type: 'localizedString', vi: 'BIM & Digital Twin', en: 'BIM & Digital Twin', zh: 'BIM与数字孪生', ja: 'BIMとデジタルツイン' },
    footerText: { _type: 'localizedString', vi: 'Kiến tạo tương lai với sức mạnh số', en: 'Forging the future with digital power', zh: '用数字力量构建未来', ja: 'デジタルの力で未来を切り拓く' },
    address: { _type: 'localizedText', vi: 'Hà Nội, Việt Nam', en: 'Hanoi, Vietnam', zh: '越南河内', ja: 'ベトナム・ハノイ' },
  }).commit()
  console.log('✅ SiteSettings i18n updated')

  console.log('\n🎉 All i18n updates complete!')
}
main().catch(e => console.error(e.message))
