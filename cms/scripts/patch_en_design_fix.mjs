/**
 * Fix work[2] and work[3] English translations that were incorrectly mapped.
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

async function main() {
  const designs = await client.fetch(`*[_type == "designService" && itemType == "work"] | order(order asc)`)
  console.log(`Found ${designs.length} work items:\n`)
  designs.forEach((d, i) => console.log(`  [${i}] ${d.title?.vi}`))

  // Fix work[2]: "Bản vẽ Chi tiết Kết cấu — Cọc & Bệ móng cầu"
  if (designs[2]) {
    await client.patch(designs[2]._id).set({
      'title.en': 'Structural Detail Drawings — Piles & Bridge Foundations',
      'description.en': 'Detailed design of bored pile systems and bridge foundations from Revit model. Automated steel quantity schedules and drawing export in standard design documentation format.',
      'title.zh': '结构详图 — 桩基与桥梁基础',
      'description.zh': '从Revit模型中精细设计钻孔桩系统和桥梁基础。自动生成钢筋量表并按标准设计文档格式导出图纸。',
      'title.ja': '構造詳細図 — 杭基礎と橋梁基礎',
      'description.ja': 'Revitモデルから場所打ち杭システムと橋梁基礎の詳細設計。鉄筋数量表の自動生成と標準設計図書形式での図面出力。',
    }).commit()
    console.log('\n✓ Fixed work[2]')
  }

  // Fix work[3]: "Phối hợp Đa chuyên ngành — Nút giao cầu phức tạp"
  if (designs[3]) {
    await client.patch(designs[3]._id).set({
      'title.en': 'Multi-discipline Coordination — Complex Bridge Interchange',
      'description.en': 'BIM coordination between structural, architectural and MEP for multi-level interchange. Clash detection in Navisworks before construction, saving costs from unforeseen issues.',
      'title.zh': '多专业协同 — 复杂立交桥',
      'description.zh': 'BIM协调结构、建筑和MEP多层立交系统。施工前在Navisworks中进行碰撞检测，节省意外问题产生的成本。',
      'title.ja': '多専門連携 — 複合立体交差橋',
      'description.ja': '多層インターチェンジの構造・建築・MEPのBIM連携。施工前にNavisworksで干渉検出し、予期せぬコストを削減。',
    }).commit()
    console.log('✓ Fixed work[3]')
  }

  console.log('\n=== ✅ Done! ===')
}

main().catch(err => { console.error(err); process.exit(1) })
