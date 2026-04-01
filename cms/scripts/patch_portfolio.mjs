/**
 * Patch 'project' type documents with zh/ja translations
 */
import { createClient } from '@sanity/client'

const TOKEN = 'skiuFG2XoSSNQ08z4wj8aOJPMk2mnMchiOQNJz7yylXZ0VszObcAaKaUzL3oSAR74Gbve32OFXhV4pMLk8HCti6zT8rLiTMpIRa00D3WozVOohLTrtNYHjt7x5RghTFvFBs1erheAw2nymlKGBhRDyk71gbJepJ3kcDCUVGLgNF8sMxT7pw4'

const client = createClient({
  projectId: 'wd53xh69',
  dataset: 'production',
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// Translations keyed by Vietnamese title
const projectData = {
  'Mô hình BIM Cầu Bê tông — Cao tốc Hữu Nghị - Chi Lăng': {
    title: {
      zh: '混凝土桥梁BIM模型 — 友谊-芝岭高速',
      ja: 'コンクリート橋梁BIMモデル — フーギー・チーラン高速道路',
      en: 'Concrete Bridge BIM Model — Huu Nghi - Chi Lang Expressway',
    },
    description: {
      zh: '为友谊-芝岭高速公路预应力混凝土桥梁系统建模，包括完整的桩基、桥墩、桥台、Super T梁和桥面板，项目全生命周期管理属性数据。',
      ja: 'フーギー・チーラン高速道路のプレストレスコンクリート橋梁の包括BIMモデリング。橋脚・橋台・Super T桁・橋座の完全モデル。',
      en: 'Comprehensive BIM modeling for the prestressed concrete bridge system on the Huu Nghi - Chi Lang Expressway.',
    },
    categoryLabel: { zh: 'BIM建模', ja: 'BIMモデリング', en: 'BIM Modeling' },
    badge: { zh: '高速公路', ja: '高速道路', en: 'Highway' },
  },
  'Cầu trong Nút giao Hà Nội - Hải Phòng': {
    title: {
      zh: '河内-海防立交桥梁',
      ja: 'ハノイ-ハイフォン立体交差の橋梁',
      en: 'Bridge in Hanoi - Haiphong Interchange',
    },
    description: {
      zh: '河内-海防高速立交多层复杂桥梁系统BIM模型，支持多专业协调和结构碰撞检测。',
      ja: 'ハノイ-ハイフォン高速立体交差の多層複合橋梁システムBIMモデル。多専門協調と構造干渉検知を支援。',
      en: 'BIM model of a multi-level complex bridge system in the Hanoi - Haiphong expressway interchange.',
    },
    categoryLabel: { zh: 'BIM建模', ja: 'BIMモデリング', en: 'BIM Modeling' },
    badge: { zh: '立交桥', ja: '立体交差', en: 'Interchange' },
  },
  'Scan to BIM — Mô hình BIM từ dữ liệu Point Cloud': {
    title: {
      zh: 'Scan to BIM — 从点云数据生成BIM模型',
      ja: 'Scan to BIM — 点群データからのBIMモデル',
      en: 'Scan to BIM — BIM Model from Point Cloud Data',
    },
    description: {
      zh: 'LiDAR点云数据在Revit中转换为精度±2mm的精确BIM模型，用于改造、改新和实际偏差分析。',
      ja: 'LiDAR点群データをRevitで精度±2mmの正確なBIMモデルに変換。改修・現況偏差分析に使用。',
      en: '3D laser scanning captures as-built Point Cloud data, converted to accurate BIM models in Revit. Accuracy: ±2mm.',
    },
    categoryLabel: { zh: 'BIM建模', ja: 'BIMモデリング', en: 'BIM Modeling' },
    badge: { zh: 'Scan to BIM', ja: 'Scan to BIM', en: 'Scan to BIM' },
  },
  'Chương trình Đào tạo BIM Revit Cầu Đường tại Doanh nghiệp': {
    title: {
      zh: 'Revit桥梁道路BIM企业培训课程',
      ja: '企業向けBIM Revit橋梁道路トレーニングプログラム',
      en: 'Corporate BIM Revit Bridge Road Training Program',
    },
    description: {
      zh: '针对设计咨询团队的专业BIM Revit桥梁道路深度培训课程，帮助工程师团队掌握建模技能和实际BIM部署。',
      ja: '設計コンサルティングチーム向けの専門BIM Revit橋梁道路集中トレーニング。エンジニアチームがモデリングスキルと実際のBIM展開を習得。',
      en: 'Specialized in-depth BIM Revit bridge road training for design consulting teams.',
    },
    categoryLabel: { zh: '企业培训', ja: '企業トレーニング', en: 'Corporate Training' },
    badge: { zh: '培训', ja: 'トレーニング', en: 'Training' },
  },
  'Đào tạo BIM cho đội ngũ kỹ sư': {
    title: {
      zh: '工程师团队BIM培训',
      ja: 'エンジニアチームへのBIM研修',
      en: 'BIM Training for Engineer Teams',
    },
    description: {
      zh: '针对企业工程师团队的深度BIM培训，提升BIM技术在实际项目中的应用能力。',
      ja: '企業エンジニアチームへの専門BIM研修。実際のプロジェクトへのBIM技術適用能力を向上。',
      en: 'In-depth BIM training for corporate engineers, enhancing BIM technology application in real projects.',
    },
    categoryLabel: { zh: '企业培训', ja: '企業トレーニング', en: 'Corporate Training' },
    badge: { zh: '培训', ja: 'トレーニング', en: 'Training' },
  },
}

async function main() {
  console.log('=== Patching portfolio "project" documents with zh/ja ===\n')
  
  const projects = await client.fetch(`*[_type == "project"] | order(order asc)`)
  console.log(`Found ${projects.length} portfolio projects\n`)

  for (const proj of projects) {
    const titleVi = proj.title?.vi || ''
    const data = projectData[titleVi]

    if (!data) {
      console.log(`  ⚠ No translation data for: "${titleVi}"`)
      continue
    }

    const setObj = {
      'title.zh': data.title.zh,
      'title.ja': data.title.ja,
      'title.en': data.title.en,
      'description.zh': data.description.zh,
      'description.ja': data.description.ja,
      'description.en': data.description.en,
      'badge.zh': data.badge.zh,
      'badge.ja': data.badge.ja,
      'badge.en': data.badge.en,
      'categoryLabel.zh': data.categoryLabel.zh,
      'categoryLabel.ja': data.categoryLabel.ja,
      'categoryLabel.en': data.categoryLabel.en,
    }

    await client.patch(proj._id).set(setObj).commit()
    console.log(`  ✓ ${titleVi}`)
    console.log(`    ZH: ${data.title.zh}`)
    console.log(`    JA: ${data.title.ja}\n`)
  }

  console.log('=== ✅ Portfolio projects patched! ===')
}

main().catch(err => { console.error(err); process.exit(1) })
