/**
 * Patch CMS skill strings that are in Vietnamese (non-translatable plain strings)
 * Since schema uses string[], we translate them based on current language in aboutPage
 * Strategy: Add skillsTranslated object to about page with zh/ja arrays for each category
 * Alternative (simpler): just update the skills strings to English which is universally understood
 * OR: create separate zh/ja skills arrays stored as additional fields
 * 
 * Since schema can't handle per-language strings[], we add zh/ja skill categories 
 * as companion localizedString fields for category name AND add translated skill lists
 * as JSON strings to be parsed, OR we rely on locales.js for the static fallback skills.
 * 
 * SIMPLEST: In ServicesContent/AboutContent, if skill is in Vietnamese, show it anyway
 * since skills like "Revit", "Civil 3D" are universal, and manage skills categories in 
 * separate locales keys.
 * 
 * This script patches aboutPage.skillCategories[].skills to English/universal equivalents:
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

// Replace Vietnamese-only skills with universal/English equivalents
const universalSkills = [
  // BIM Software - already universal
  ['Autodesk Revit', 'Civil 3D', 'Navisworks', 'BIM 360', 'Dynamo', 'Infraworks'],
  // Programming - already universal
  ['C# / .NET', 'Java', 'Python', 'HTML/CSS/JS', 'Dynamo Script'],
  // Management - replace with English (universal)
  ['CTO Strategy', 'Digital Transformation', 'Project Management', 'Internal Training'],
  // Infrastructure - replace with English (universal)
  ['Highway & Bridge', 'Mountain Tunnel', 'Urban Road', 'Master Planning'],
  // Emerging Tech - replace with English (universal)
  ['AI Automation', 'IoT Construction'],
  // Teaching & Consulting - replace with English (universal)
  ['Enterprise BIM', 'CDE Consulting'],
]

async function main() {
  console.log('=== Patching skill strings to universal/English ===\n')
  const about = await client.fetch(`*[_type == "aboutPage"][0]`)
  if (!about) { console.log('No aboutPage found'); return }

  const setObj = {}
  ;(about.skillCategories || []).forEach((cat, i) => {
    if (universalSkills[i]) {
      setObj[`skillCategories[${i}].skills`] = universalSkills[i]
    }
  })

  await client.patch(about._id).set(setObj).commit()
  console.log('✅ Skills updated to universal/English strings')

  // Also patch designService items
  console.log('\nPatching designService items...')
  const designs = await client.fetch(`*[_type == "designService"] | order(order asc)`)
  
  const capTitles = {
    zh: ['BIM施工图', 'Dynamo自动化', '工程量提取', '3D详细钢筋', '多专业协同', 'Civil 3D & Corridor'],
    ja: ['BIM施工図', 'Dynamo自動化', '数量算出', '3D詳細鉄筋', '多専門連携', 'Civil 3D & Corridor'],
  }
  const capDescs = {
    zh: [
      '从BIM模型自动导出2D图纸（平面、立面、剖面、大样），模型变更时自动同步。',
      '使用Dynamo自动化布置钢梁、放置标签、创建明细表，比CAD节省70%时间。',
      '从模型自动导出混凝土、钢材、模板工程量，导出到Excel按标准预算格式。',
      '高精细3D钢筋排布于全部建筑构件：墩、台、梁、桥面板，从模型自动出施工图。',
      '协同Revit中结构、建筑、MEP和岩土之间的配合，通过Navisworks提前发现碰撞。',
      '设计道路、纵断面、排水和Corridor，集成Civil 3D — 与Revit桥梁模型协同。',
    ],
    ja: [
      'BIMモデルから2D図面（平面・立面・断面・詳細）を自動出力、モデル変更時に自動同期。',
      'Dynamoで鉄骨配置・タグ・スケジュール作成を自動化、CAD比70%の時間削減。',
      'コンクリート・鉄筋・型枠の数量をモデルから自動出力し、標準予算フォーマットでExcelへ。',
      '全構造部材（橋脚・橋台・桁・床版）の高詳細3D鉄筋配置、施工図を自動出力。',
      'Revit内での構造・建築・設備・地盤専門の連携調整、Navisworksで干渉を事前検出。',
      '道路・縦断線形・排水・CorridorをCivil 3Dで設計 — RevitのBIM橋梁と連携。',
    ],
  }

  const workTitles = {
    zh: [
      'BIM施工图 — 预应力混凝土桥梁高速公路',
      '3D详细钢筋布置 — 河内-海防立交',
      'Dynamo自动化工作流',
      '工程量提取系统',
    ],
    ja: [
      'BIM施工図 — 高速道路のPC橋梁',
      '3D詳細鉄筋配置 — ハノイ-ハイフォン立交',
      'Dynamo自動化ワークフロー',
      '数量算出システム',
    ],
  }
  const workDescs = {
    zh: [
      '从桥梁BIM模型提取完整施工图集。自动化DIM、TAG钢筋和钢筋量。与CAD相比设计时间缩短60%。',
      '3D布置所有桥梁构件的钢筋：墩、台、承台和桥面板。自动导出施工图和钢筋量表。',
      '使用Dynamo读取Civil 3D数据，自动在路线上放置墩台、支座和主梁，节省大量重复工作。',
      '从BIM模型准确导出混凝土、钢筋、模板数量，直接用于预算和工程结算。',
    ],
    ja: [
      '橋梁BIMモデルから完全な施工図セットを抽出。鉄筋のDIM・TAGと数量を自動化。CAD比設計時間60%削減。',
      '全橋梁部材（橋脚・橋台・フーチング・床版）の鉄筋を3D配置。施工図と鉄筋量表を自動出力。',
      'Dynamoを使用してCivil 3Dデータを読み込み、路線上に橋脚・支承・主桁を自動配置。',
      'BIMモデルからコンクリート・鉄筋・型枠の数量を正確に出力し、予算と精算に直接活用。',
    ],
  }
  
  const capItems = designs.filter(d => d.itemType === 'capability')
  const workItems = designs.filter(d => d.itemType === 'work')

  for (let i = 0; i < capItems.length; i++) {
    const item = capItems[i]
    const setObj = {}
    if (capTitles.zh[i]) setObj['title.zh'] = capTitles.zh[i]
    if (capTitles.ja[i]) setObj['title.ja'] = capTitles.ja[i]
    if (capDescs.zh[i]) setObj['description.zh'] = capDescs.zh[i]
    if (capDescs.ja[i]) setObj['description.ja'] = capDescs.ja[i]
    await client.patch(item._id).set(setObj).commit()
    console.log(`  ✓ capability: ${item.title?.vi}`)
  }

  for (let i = 0; i < workItems.length; i++) {
    const item = workItems[i]
    const setObj = {}
    if (workTitles.zh[i]) setObj['title.zh'] = workTitles.zh[i]
    if (workTitles.ja[i]) setObj['title.ja'] = workTitles.ja[i]
    if (workDescs.zh[i]) setObj['description.zh'] = workDescs.zh[i]
    if (workDescs.ja[i]) setObj['description.ja'] = workDescs.ja[i]
    await client.patch(item._id).set(setObj).commit()
    console.log(`  ✓ work: ${item.title?.vi}`)
  }

  console.log('\n=== ✅ All done! ===')
}
main().catch(err => { console.error(err); process.exit(1) })
