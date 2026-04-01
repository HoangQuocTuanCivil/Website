/**
 * BIM Innovator — Sanity CMS Migration Script
 *
 * Populates the Sanity CMS with all existing content from the static HTML site.
 *
 * Usage:
 *   SANITY_TOKEN=<your-token> node migrate.mjs
 */

import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// ---------------------------------------------------------------------------
// Setup
// ---------------------------------------------------------------------------

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const TOKEN = process.env.SANITY_TOKEN
if (!TOKEN) {
  console.error('ERROR: Set SANITY_TOKEN env var before running this script.')
  process.exit(1)
}

const client = createClient({
  projectId: 'wd53xh69',
  dataset: 'production',
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const ASSETS_DIR = path.resolve(__dirname, '..', 'assets')

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Generate a random 8-character alphanumeric key for Sanity array items. */
function key() {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789'
  let result = ''
  for (let i = 0; i < 8; i++) result += chars[Math.floor(Math.random() * chars.length)]
  return result
}

/** Upload an image from the assets folder. Returns the image reference object or null. */
async function uploadImage(filename) {
  const filePath = path.resolve(ASSETS_DIR, filename)
  if (!fs.existsSync(filePath)) {
    console.warn(`  WARNING: Image not found — ${filePath}`)
    return null
  }
  try {
    console.log(`  Uploading image: ${filename}`)
    const imageAsset = await client.assets.upload('image', fs.createReadStream(filePath), {
      filename,
    })
    console.log(`  Uploaded: ${imageAsset._id}`)
    return {
      _type: 'image',
      asset: { _type: 'reference', _ref: imageAsset._id },
    }
  } catch (err) {
    console.error(`  ERROR uploading ${filename}:`, err.message)
    return null
  }
}

// ---------------------------------------------------------------------------
// BIM project descriptions (from the locales file)
// ---------------------------------------------------------------------------

const bimDescriptions = {
  p1: {
    vi: 'Triển khai mô hình BIM toàn diện cho hệ thống cầu bê tông dự ứng lực trên tuyến cao tốc Hữu Nghị - Chi Lăng, một trong những dự án hạ tầng giao thông trọng điểm quốc gia. Mô hình bao gồm đầy đủ kết cấu móng cọc, trụ, mố, dầm Super T và bản mặt cầu với dữ liệu thuộc tính phục vụ quản lý vòng đời dự án.',
    en: 'Comprehensive BIM modeling for the prestressed concrete bridge system on the Huu Nghi - Chi Lang Expressway, a key national transportation infrastructure project. Full pile foundations, piers, abutments, Super T beams and bridge decks with attribute data for lifecycle management.',
  },
  p2: {
    vi: 'Mô hình BIM hệ thống cầu phức tạp trong nút giao cao tốc Hà Nội - Hải Phòng với nhiều tầng vượt, kết hợp cầu cong và cầu thẳng. Dữ liệu BIM hỗ trợ phối hợp đa chuyên ngành và phát hiện xung đột kết cấu.',
    en: 'BIM model of a multi-level complex bridge system in the Hanoi - Haiphong expressway interchange, combining curved and straight bridges. BIM data supports multi-disciplinary coordination and structural clash detection.',
  },
  p3: {
    vi: 'Bố trí cốt thép chi tiết 3D cho trụ cầu, mố cầu và bản mặt cầu trong nút giao phức tạp. Mô hình cho phép xuất bản vẽ thi công tự động, bảng khối lượng thép và kiểm tra mật độ thép theo TCVN.',
    en: '3D detailed rebar placement for bridge piers, abutments and deck slabs in a complex interchange. Enables automated construction drawing output, steel quantity schedules and rebar density verification per TCVN standard.',
  },
  p4: {
    vi: 'Mô hình BIM cầu thép theo tiêu chuẩn thiết kế Nhật Bản (JIS), bao gồm hệ dầm thép hộp, liên kết bu-lông cường độ cao và chi tiết hàn. Phục vụ xuất khẩu bản vẽ shop drawing và kiểm tra ứng xử kết cấu.',
    en: 'BIM model of a steel bridge following Japanese design standards (JIS), including steel box girders, high-strength bolt connections and weld details. Used for shop drawing export and structural behavior verification.',
  },
  p5: {
    vi: 'Mô hình BIM dự án hầm đường bộ xuyên núi qua đèo Hoàng Liên, bao gồm vỏ hầm, hệ thống thoát nước, chiếu sáng và điều khiển giao thông. Tích hợp dữ liệu địa chất để phân tích rủi ro thi công ngầm.',
    en: 'BIM model for the mountain road tunnel through Hoang Lien Pass, covering tunnel lining, drainage, lighting and traffic control systems. Geological data integrated for underground construction risk analysis.',
  },
  p6: {
    vi: 'Mô hình BIM tổng thể nhà phố nhiều tầng, tích hợp đồng bộ kiến trúc, kết cấu và MEP. Ứng dụng Revit để tạo bản vẽ xin phép xây dựng, phối cảnh 3D và bóc tách khối lượng vật tư chính xác.',
    en: 'Full BIM model of a multi-story townhouse integrating architecture, structure and MEP. Revit used for building permit drawings, 3D renderings and accurate material quantity take-off.',
  },
  p7: {
    vi: 'Ứng dụng quét laser 3D (LiDAR) thu thập dữ liệu Point Cloud hiện trạng công trình, chuyển đổi thành mô hình BIM chính xác trong Revit. Phục vụ cải tạo, nâng cấp và kiểm tra sai lệch thi công. Độ chính xác ±2mm.',
    en: '3D laser scanning (LiDAR) captures as-built Point Cloud data of existing structures, converted to accurate BIM models in Revit. Used for renovation, retrofitting and as-built deviation analysis. Accuracy: ±2mm.',
  },
  p8: {
    vi: 'Mô hình BIM 3D toàn bộ trạm bơm thủy lợi, bao gồm nhà bơm, buồng hút, buồng xả, đường ống và thiết bị cơ điện. Hỗ trợ phối hợp thiết kế đa chuyên ngành và tối ưu bố trí thiết bị.',
    en: 'Full 3D BIM model of an irrigation pumping station including pump house, suction chamber, discharge chamber, piping and electromechanical equipment. Supports multi-discipline coordination and equipment layout optimization.',
  },
  p9: {
    vi: 'Mô hình kết cấu chi tiết bên trong trạm bơm: hệ bản sàn, dầm, cột và tường vây bê tông cốt thép. Xuất bản vẽ thi công chi tiết và khối lượng vật liệu tự động, giảm thiểu sai sót thi công.',
    en: 'Detailed structural model inside the pump station: slab system, beams, columns and RC diaphragm walls. Automated construction drawing and material quantity export minimizes errors during construction.',
  },
  p10: {
    vi: 'Mô hình BIM hệ thống tường chắn đất trong nút giao đô thị phức tạp, bao gồm tường góc, tường bản ghép và tường trọng lực. Phân tích ổn định và tối ưu thiết kế theo dữ liệu địa kỹ thuật thực tế.',
    en: 'BIM model of the retaining wall system in a complex urban interchange, including cantilever, panel and gravity walls. Stability analysis and design optimization based on real geotechnical data.',
  },
}

// ---------------------------------------------------------------------------
// Migration
// ---------------------------------------------------------------------------

async function main() {
  console.log('=== BIM Innovator CMS Migration ===\n')

  // =========================================================================
  // Step 1 — Upload images
  // =========================================================================
  console.log('[Step 1] Uploading images...\n')

  const imageFiles = [
    'avatar.jpg',
    'm_caubetong.png',
    'm_caunutgiao1.png',
    'm_coththepcau.png',   // actual filename on disk (double 'h')
    'm_cauthep.png',
    'm_hamduongbo.png',
    'm_house.png',
    'm_scantobim.png',
    'm_trambom.png',
    'm_trambom2.png',
    'm_tuongchan.png',
    'corp1.png',
    'corp2.png',
  ]

  /** @type {Record<string, {_type:'image', asset:{_type:'reference', _ref:string}} | null>} */
  const images = {}
  for (const file of imageFiles) {
    images[file] = await uploadImage(file)
  }

  console.log('\n  Image upload complete.\n')

  // =========================================================================
  // Step 2 — Site Settings (singleton)
  // =========================================================================
  console.log('[Step 2] Creating siteSettings...')

  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    siteTitle: 'BIM Innovator',
    siteSubtitle: { _type: 'localizedString', vi: 'BIM & Digital Twin', en: 'BIM & Digital Twin' },
    contactEmail: 'hoangquoctuan1395@gmail.com',
    contactPhone: '+84 399 762 377',
    address: { _type: 'localizedText', vi: 'Hà Nội, Việt Nam', en: 'Hanoi, Vietnam' },
    footerText: {
      _type: 'localizedString',
      vi: 'Kiến tạo tương lai với sức mạnh số',
      en: 'Forging the future with digital power',
    },
  })

  console.log('  siteSettings created.\n')

  // =========================================================================
  // Step 3 — About Page (singleton)
  // =========================================================================
  console.log('[Step 3] Creating aboutPage...')

  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',

    avatar: images['avatar.jpg'] || undefined,
    name: 'HOÀNG QUỐC TUẤN',
    jobTitle: {
      _type: 'localizedString',
      vi: 'Phó Tổng Giám đốc phụ trách Công nghệ (CTO)',
      en: 'Deputy General Director of Technology (CTO)',
    },
    heroBadge: {
      _type: 'localizedString',
      vi: 'BIM & Digital Twin',
      en: 'BIM & Digital Twin',
    },
    heroTitle: {
      _type: 'localizedString',
      vi: 'Chuyên gia BIM Hạ tầng Giao thông',
      en: 'BIM Expert in Transportation Infrastructure',
    },
    heroDescription: {
      _type: 'localizedText',
      vi: 'Hơn 8 năm kinh nghiệm trong triển khai BIM cho các dự án hạ tầng giao thông trọng điểm quốc gia.',
      en: 'Over 8 years of experience deploying BIM for key national transportation infrastructure projects.',
    },

    // Hero Stats
    heroStats: [
      { _key: key(), number: '8+', label: { _type: 'localizedString', vi: 'Năm kinh nghiệm', en: 'Years Experience' } },
      { _key: key(), number: '150+', label: { _type: 'localizedString', vi: 'Dự án hoàn thành', en: 'Projects Completed' } },
      { _key: key(), number: '500+', label: { _type: 'localizedString', vi: 'Học viên đào tạo', en: 'Trainees Taught' } },
    ],

    // Career Timeline
    careerTimeline: [
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: 'Hiện tại', en: 'Present' },
        role: { _type: 'localizedString', vi: 'Phó Tổng Giám đốc phụ trách Công nghệ (CTO)', en: 'Deputy General Director of Technology (CTO)' },
        company: { _type: 'localizedString', vi: 'Công ty CP Tư vấn Xây dựng A2Z', en: 'A2Z Construction Consulting JSC' },
        description: { _type: 'localizedText', vi: 'Phụ trách chiến lược công nghệ, chuyển đổi số và triển khai BIM toàn diện cho các dự án hạ tầng giao thông trọng điểm quốc gia.', en: 'Leading technology strategy, digital transformation and comprehensive BIM deployment for key national transportation infrastructure projects.' },
        accentColor: 'red',
      },
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: '02/2025 — Nay', en: '02/2025 — Present' },
        role: { _type: 'localizedString', vi: 'Giám đốc Chi nhánh', en: 'Branch Director' },
        company: { _type: 'localizedString', vi: 'CT CP Tư vấn Thiết kế Xây dựng A2Z (Thành viên Đèo Cả)', en: 'A2Z Construction Design Consulting JSC (Deo Ca Group)' },
        description: { _type: 'localizedText', vi: 'Quản lý chi nhánh, lãnh đạo phòng BIM và Công nghệ số cho các dự án hạ tầng lớn.', en: 'Managing branch operations, leading BIM and Digital Technology department for large infrastructure projects.' },
        accentColor: 'green',
      },
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: '10/2024 — 02/2025', en: '10/2024 — 02/2025' },
        role: { _type: 'localizedString', vi: 'Giám đốc Chi nhánh', en: 'Branch Director' },
        company: { _type: 'localizedString', vi: 'CT CP Tư vấn Thiết kế Xây dựng Đại Phong (Thành viên Đèo Cả)', en: 'Dai Phong Construction Design Consulting JSC (Deo Ca Group)' },
        description: { _type: 'localizedText', vi: 'Điều hành chi nhánh, triển khai dự án thiết kế xây dựng lớn tại phía Nam.', en: 'Managing branch, deploying large construction design projects in the South.' },
        accentColor: 'red',
      },
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: '05/2024 — 10/2024', en: '05/2024 — 10/2024' },
        role: { _type: 'localizedString', vi: 'Phó Giám đốc Trung tâm BIM', en: 'Deputy Director of BIM Center' },
        company: { _type: 'localizedString', vi: 'Công ty CP Tập đoàn Đèo Cả', en: 'Deo Ca Group JSC' },
        description: { _type: 'localizedText', vi: 'Phụ trách triển khai BIM cấp tập đoàn, xây dựng quy trình và tiêu chuẩn BIM cho các dự án cao tốc.', en: 'Leading group-level BIM deployment, building BIM processes and standards for expressway projects.' },
        accentColor: 'green',
      },
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: '01/2024 — 04/2024', en: '01/2024 — 04/2024' },
        role: { _type: 'localizedString', vi: 'Leader BIM', en: 'BIM Leader' },
        company: { _type: 'localizedString', vi: 'Công ty CP Tập đoàn Đèo Cả', en: 'Deo Ca Group JSC' },
        description: { _type: 'localizedText', vi: 'Dẫn dắt đội ngũ BIM, triển khai mô hình hóa cho các dự án hạ tầng giao thông.', en: 'Leading BIM team, deploying modeling for transportation infrastructure projects.' },
        accentColor: 'red',
      },
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: '05/2023 — 12/2023', en: '05/2023 — 12/2023' },
        role: { _type: 'localizedString', vi: 'BIM Manager', en: 'BIM Manager' },
        company: { _type: 'localizedString', vi: 'Kuukan Design Architects Việt Nam (Thành viên Space Design)', en: 'Kuukan Design Architects Vietnam (Space Design Member)' },
        description: { _type: 'localizedText', vi: 'Quản lý BIM cho các dự án kiến trúc quốc tế, phối hợp với đối tác Nhật Bản.', en: 'Managing BIM for international architectural projects, coordinating with Japanese partners.' },
        accentColor: 'green',
      },
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: '2022 — 2023', en: '2022 — 2023' },
        role: { _type: 'localizedString', vi: 'BIM Leader & Giảng viên Đào tạo BIM', en: 'BIM Leader & BIM Training Instructor' },
        company: { _type: 'localizedString', vi: 'BIM Hà Nội', en: 'BIM Hanoi' },
        description: { _type: 'localizedText', vi: 'Đào tạo BIM chuyên sâu, xây dựng chương trình giảng dạy và phát triển đội ngũ BIM chuyên nghiệp.', en: 'In-depth BIM training, building curriculum and developing professional BIM teams.' },
        accentColor: 'red',
      },
      {
        _key: key(),
        _type: 'careerItem',
        date: { _type: 'localizedString', vi: '2018 — 2022', en: '2018 — 2022' },
        role: { _type: 'localizedString', vi: 'BIM Leader', en: 'BIM Leader' },
        company: { _type: 'localizedString', vi: 'CICCO Đà Nẵng', en: 'CICCO Da Nang' },
        description: { _type: 'localizedText', vi: 'Tiên phong ứng dụng BIM vào các dự án xây dựng tại miền Trung, xây dựng nền tảng BIM từ giai đoạn đầu.', en: 'Pioneering BIM application in construction projects in Central Vietnam, building BIM foundation from early stage.' },
        accentColor: 'green',
      },
    ],

    // Education
    education: [
      {
        _key: key(),
        _type: 'educationItem',
        degree: { _type: 'localizedString', vi: 'Kỹ sư (Engineer)', en: 'Engineer (B.Eng.)' },
        major: { _type: 'localizedString', vi: 'Chuyên ngành Kỹ thuật xây dựng công trình giao thông', en: 'Transportation Construction Engineering Major' },
        school: { _type: 'localizedString', vi: 'Đại học Bách khoa Đà Nẵng (DUT)', en: 'Danang University of Science and Technology (DUT)' },
        description: { _type: 'localizedText', vi: 'Tốt nghiệp Kỹ sư tại trường kỹ thuật hàng đầu miền Trung Việt Nam.', en: 'Graduated as Engineer from the top engineering university in Central Vietnam.' },
        accentColor: 'green',
      },
      {
        _key: key(),
        _type: 'educationItem',
        degree: { _type: 'localizedString', vi: 'Chứng chỉ Quốc tế', en: 'International Certification' },
        major: { _type: 'localizedString', vi: 'BIM Professional Certification', en: 'BIM Professional Certification' },
        school: { _type: 'localizedString', vi: 'Autodesk & Đối tác Quốc tế', en: 'Autodesk & International Partners' },
        description: { _type: 'localizedText', vi: 'Chứng nhận chuyên gia BIM từ các tổ chức quốc tế. Thành thạo Revit, Civil 3D, Navisworks, BIM 360, Dynamo Scripting.', en: 'BIM expert certification from international organizations.' },
        accentColor: 'red',
      },
      {
        _key: key(),
        _type: 'educationItem',
        degree: { _type: 'localizedString', vi: 'Kỹ sư (Engineer)', en: 'Engineer (B.Eng.)' },
        major: { _type: 'localizedString', vi: 'Chuyên ngành Xây dựng Đường sắt tốc độ cao và Đường sắt đô thị', en: 'High-Speed Rail & Urban Railway Construction Major' },
        school: { _type: 'localizedString', vi: 'Đại học Giao thông vận tải Hồ Chí Minh (UTH)', en: 'Ho Chi Minh City University of Transport (UTH)' },
        description: { _type: 'localizedText', vi: 'Tốt nghiệp Kỹ sư tại một trong những trường kỹ thuật hàng đầu Việt Nam.', en: 'Graduated as Engineer from one of the top engineering universities in Vietnam.' },
        accentColor: 'green',
      },
    ],

    // Skill Categories
    skillCategories: [
      {
        _key: key(),
        _type: 'skillCategory',
        categoryName: { _type: 'localizedString', vi: 'BIM Software', en: 'BIM Software' },
        skills: ['Autodesk Revit', 'Civil 3D', 'Navisworks', 'BIM 360', 'Dynamo', 'Infraworks'],
      },
      {
        _key: key(),
        _type: 'skillCategory',
        categoryName: { _type: 'localizedString', vi: 'Lập trình & Dev', en: 'Programming & Dev' },
        skills: ['C# / .NET', 'Java', 'Python', 'HTML/CSS/JS', 'Dynamo Script'],
      },
      {
        _key: key(),
        _type: 'skillCategory',
        categoryName: { _type: 'localizedString', vi: 'Quản lý & Lãnh đạo', en: 'Management & Leadership' },
        skills: ['Chiến lược CTO', 'Chuyển đổi số', 'Quản lý dự án', 'Đào tạo nội bộ'],
      },
      {
        _key: key(),
        _type: 'skillCategory',
        categoryName: { _type: 'localizedString', vi: 'Hạ tầng Giao thông', en: 'Transportation Infrastructure' },
        skills: ['Cao tốc & Cầu', 'Hầm xuyên núi', 'Đường đô thị', 'Quy hoạch'],
      },
      {
        _key: key(),
        _type: 'skillCategory',
        categoryName: { _type: 'localizedString', vi: 'Công nghệ mới', en: 'Emerging Technologies' },
        skills: ['AI tự động hóa', 'IoT Công trình'],
      },
      {
        _key: key(),
        _type: 'skillCategory',
        categoryName: { _type: 'localizedString', vi: 'Giảng dạy & Tư vấn', en: 'Teaching & Consulting' },
        skills: ['BIM Doanh nghiệp', 'Tư vấn CDE'],
      },
    ],
  })

  console.log('  aboutPage created.\n')

  // =========================================================================
  // Step 4 — Home Page (singleton)
  // =========================================================================
  console.log('[Step 4] Creating homePage...')

  await client.createOrReplace({
    _id: 'homePage',
    _type: 'homePage',
    heroTitle: {
      _type: 'localizedString',
      vi: 'ĐỔI MỚI: SÁNG TẠO, CÔNG NGHỆ',
      en: 'INNOVATION, CREATIVITY, TECHNOLOGY',
    },
    heroSubtitle: {
      _type: 'localizedText',
      vi: 'Cung cấp giải pháp số hóa toàn diện và thiết kế đột phá cho tương lai.',
      en: 'Delivering comprehensive digital solutions and breakthrough designs for the future.',
    },
    heroCta: {
      _type: 'localizedString',
      vi: 'Khám phá',
      en: 'Explore',
    },
    heroCtaLink: '/services',
    stats: [
      {
        _key: key(),
        number: '150+',
        label: { _type: 'localizedString', vi: 'Dự án hoàn thành', en: 'Completed Projects' },
      },
      {
        _key: key(),
        number: '8+',
        label: { _type: 'localizedString', vi: 'Năm kinh nghiệm', en: 'Years Experience' },
      },
      {
        _key: key(),
        number: '500+',
        label: { _type: 'localizedString', vi: 'Học viên', en: 'Trainees' },
      },
    ],
  })

  console.log('  homePage created.\n')

  // =========================================================================
  // Step 5 — Online Course (collection)
  // =========================================================================
  console.log('[Step 5] Creating onlineCourse...')

  const lessonTitles = [
    'Giới thiệu phần mềm, Xây dựng family cọc khoan nhồi',
    'Xây dựng định hình family trụ cầu',
    'Xây dựng định hình family mố cầu',
    'Xây dựng định hình family dầm Super T',
    'Xây dựng định hình cáp DUL (Dự ứng lực)',
    'Làm quen với Dynamo, Đặt cọc khoan nhồi bằng Dynamo',
    'Đọc dữ liệu tim tuyến từ Civil 3D, Đặt mố trụ cầu bằng Dynamo',
    'Đặt gối cầu bằng Dynamo',
    'Đặt dầm cầu và bản mặt cầu bằng Dynamo',
    'Bố trí cốt thép bằng công cụ Revit (Phần 1)',
    'Bố trí cốt thép bằng công cụ Revit (Phần 2)',
    'Tạo khung tên bản vẽ, DIM, TAG thép, KL thép',
    'Quản lý đối tượng, đường nét, in ấn, Export trong Revit',
    'Vẽ family hố ga',
    'Đưa đúng tọa độ khi chèn file CAD vào Revit',
    'Triển khai cốt thép, trình bày bản vẽ, xuất khối lượng',
  ]

  const lessons = lessonTitles.map((title, i) => {
    const num = String(i + 1).padStart(2, '0')
    // Lessons 1-6: Video + File thuc hanh; Lessons 7-16: Video + Bai viet
    const tags =
      i < 6
        ? [
            { _key: key(), label: 'Video', type: 'video' },
            { _key: key(), label: 'File thực hành', type: 'file' },
          ]
        : [
            { _key: key(), label: 'Video', type: 'video' },
            { _key: key(), label: 'Bài viết', type: 'article' },
          ]

    return {
      _key: key(),
      _type: 'lesson',
      number: num,
      title: { _type: 'localizedString', vi: title },
      tags,
    }
  })

  await client.create({
    _type: 'onlineCourse',
    title: {
      _type: 'localizedString',
      vi: 'REVIT CẦU ĐƯỜNG ONLINE',
      en: 'REVIT BRIDGE ROAD ONLINE',
    },
    subtitle: {
      _type: 'localizedText',
      vi: 'Chương trình đào tạo thực chiến từ cơ bản đến nâng cao về mô hình hóa cầu đường với Revit & Dynamo',
      en: 'Practical training program from basic to advanced on bridge road modeling with Revit & Dynamo',
    },
    icon: '\u{1F309}', // bridge at night emoji
    lessons,
    order: 0,
  })

  console.log('  onlineCourse created.\n')

  // =========================================================================
  // Step 6 — BIM Projects (collection — 10 items)
  // =========================================================================
  console.log('[Step 6] Creating bimProjects...')

  const bimProjects = [
    {
      imageFile: 'm_caubetong.png',
      title: { vi: 'Mô hình BIM Cầu Bê tông — Cao tốc Hữu Nghị - Chi Lăng' },
      desc: bimDescriptions.p1,
      badge: { vi: 'Cao tốc', en: 'Highway' },
      badgeColor: 'red',
      isWide: true,
      order: 1,
      tags: ['Revit', 'Civil 3D'],
    },
    {
      imageFile: 'm_caunutgiao1.png',
      title: { vi: 'Cầu trong Nút giao Hà Nội - Hải Phòng' },
      desc: bimDescriptions.p2,
      badge: { vi: 'Nút giao', en: 'Interchange' },
      badgeColor: 'green',
      order: 2,
      tags: ['Revit', 'Navisworks'],
    },
    {
      imageFile: 'm_coththepcau.png',
      title: { vi: 'Mô hình Cốt thép Chi tiết — Nút giao Hà Nội - Hải Phòng' },
      desc: bimDescriptions.p3,
      badge: { vi: 'Cốt thép', en: 'Rebar' },
      badgeColor: 'red',
      order: 3,
      tags: ['Revit', 'Dynamo'],
    },
    {
      imageFile: 'm_cauthep.png',
      title: { vi: 'Mô hình Cầu thép — Tiêu chuẩn Nhật Bản' },
      desc: bimDescriptions.p4,
      badge: { vi: 'Cầu thép', en: 'Steel Bridge' },
      badgeColor: 'green',
      order: 4,
      tags: ['Revit', 'Tekla'],
    },
    {
      imageFile: 'm_hamduongbo.png',
      title: { vi: 'Mô hình BIM Hầm đường bộ — Đèo Hoàng Liên' },
      desc: bimDescriptions.p5,
      badge: { vi: 'Hầm đường bộ', en: 'Tunnel' },
      badgeColor: 'red',
      isWide: true,
      order: 5,
      tags: ['Revit', 'Civil 3D'],
    },
    {
      imageFile: 'm_house.png',
      title: { vi: 'Thiết kế Nhà phố — Mô hình kiến trúc & kết cấu' },
      desc: bimDescriptions.p6,
      badge: { vi: 'Kiến trúc', en: 'Architecture' },
      badgeColor: 'green',
      order: 6,
      tags: ['Revit'],
    },
    {
      imageFile: 'm_scantobim.png',
      title: { vi: 'Scan to BIM — Mô hình BIM từ dữ liệu Point Cloud' },
      desc: bimDescriptions.p7,
      badge: { vi: 'Scan to BIM', en: 'Scan to BIM' },
      badgeColor: 'red',
      order: 7,
      tags: ['Revit', 'LiDAR', 'Point Cloud'],
    },
    {
      imageFile: 'm_trambom.png',
      title: { vi: 'Mô hình BIM Trạm bơm Thủy lợi' },
      desc: bimDescriptions.p8,
      badge: { vi: 'Thủy lợi', en: 'Irrigation' },
      badgeColor: 'green',
      order: 8,
      tags: ['Revit'],
    },
    {
      imageFile: 'm_trambom2.png',
      title: { vi: 'Chi tiết kết cấu Trạm bơm Thủy lợi' },
      desc: bimDescriptions.p9,
      badge: { vi: 'Thủy lợi', en: 'Irrigation' },
      badgeColor: 'red',
      order: 9,
      tags: ['Revit', 'Dynamo'],
    },
    {
      imageFile: 'm_tuongchan.png',
      title: { vi: 'Mô hình Tường chắn — Nút giao phức tạp' },
      desc: bimDescriptions.p10,
      badge: { vi: 'Tường chắn', en: 'Retaining Wall' },
      badgeColor: 'green',
      order: 10,
      tags: ['Revit', 'Civil 3D'],
    },
  ]

  for (const p of bimProjects) {
    console.log(`  Creating bimProject: ${p.title.vi}`)
    await client.create({
      _type: 'bimProject',
      title: { _type: 'localizedString', vi: p.title.vi },
      description: { _type: 'localizedText', vi: p.desc.vi, en: p.desc.en },
      image: images[p.imageFile] || undefined,
      badge: { _type: 'localizedString', vi: p.badge.vi, en: p.badge.en },
      badgeColor: p.badgeColor,
      tags: p.tags,
      isWide: p.isWide || false,
      order: p.order,
    })
  }

  console.log('  bimProjects created.\n')

  // =========================================================================
  // Step 7 — Portfolio Projects (collection — 5 items)
  // =========================================================================
  console.log('[Step 7] Creating portfolio projects...')

  const portfolioProjects = [
    // BIM category — 3 projects
    {
      category: 'bim',
      title: { vi: 'Mô hình BIM Cầu Bê tông — Cao tốc Hữu Nghị - Chi Lăng' },
      desc: bimDescriptions.p1,
      imageFile: 'm_caubetong.png',
      badge: { vi: 'Cao tốc' },
      badgeColor: 'red',
      categoryLabel: { vi: 'BIM Modeling' },
      tags: ['Revit', 'Civil 3D'],
      isWide: true,
      order: 1,
    },
    {
      category: 'bim',
      title: { vi: 'Cầu trong Nút giao Hà Nội - Hải Phòng' },
      desc: bimDescriptions.p2,
      imageFile: 'm_caunutgiao1.png',
      badge: { vi: 'Nút giao' },
      badgeColor: 'green',
      categoryLabel: { vi: 'BIM Modeling' },
      categoryLabelColor: 'green',
      tags: ['Revit', 'Navisworks'],
      order: 2,
    },
    {
      category: 'bim',
      title: { vi: 'Scan to BIM — Mô hình BIM từ dữ liệu Point Cloud' },
      desc: bimDescriptions.p7,
      imageFile: 'm_scantobim.png',
      badge: { vi: 'Scan to BIM' },
      badgeColor: 'red',
      categoryLabel: { vi: 'BIM Modeling' },
      tags: ['Revit', 'LiDAR'],
      order: 3,
    },
    // Training category — 2 projects
    {
      category: 'train',
      title: { vi: 'Chương trình Đào tạo BIM Revit Cầu Đường tại Doanh nghiệp' },
      desc: { vi: 'Chương trình đào tạo BIM Revit chuyên sâu về cầu đường tại doanh nghiệp, giúp đội ngũ kỹ sư nắm vững kỹ năng mô hình hóa và triển khai BIM thực tế.' },
      imageFile: 'corp1.png',
      badge: { vi: 'Đào tạo' },
      badgeColor: 'red',
      categoryLabel: { vi: 'Đào tạo Doanh nghiệp' },
      isWide: true,
      order: 1,
    },
    {
      category: 'train',
      title: { vi: 'Đào tạo BIM cho đội ngũ kỹ sư' },
      desc: { vi: 'Đào tạo BIM chuyên sâu cho đội ngũ kỹ sư doanh nghiệp, nâng cao năng lực ứng dụng công nghệ BIM vào thực tế dự án.' },
      imageFile: 'corp2.png',
      badge: { vi: 'Đào tạo' },
      badgeColor: 'green',
      categoryLabel: { vi: 'Đào tạo Doanh nghiệp' },
      order: 2,
    },
  ]

  for (const p of portfolioProjects) {
    console.log(`  Creating project: ${p.title.vi}`)
    const doc = {
      _type: 'project',
      title: { _type: 'localizedString', vi: p.title.vi },
      description: { _type: 'localizedText', vi: p.desc.vi, en: p.desc.en || undefined },
      category: p.category,
      image: images[p.imageFile] || undefined,
      badge: { _type: 'localizedString', vi: p.badge.vi },
      badgeColor: p.badgeColor,
      categoryLabel: { _type: 'localizedString', vi: p.categoryLabel.vi },
      categoryLabelColor: p.categoryLabelColor || 'red',
      tags: p.tags || [],
      isWide: p.isWide || false,
      order: p.order,
    }
    await client.create(doc)
  }

  console.log('  portfolio projects created.\n')

  // =========================================================================
  // Done
  // =========================================================================
  console.log('=== Migration complete! ===')
}

main().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
