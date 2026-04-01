/**
 * Patch English translations for designService items in Sanity CMS.
 * The zh/ja translations were added previously but en was missed.
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

const capEN = {
  titles: [
    'Construction Drawings from BIM',
    'Dynamo Automation',
    'Quantity Take-off',
    '3D Detailed Reinforcement',
    'Multi-discipline Coordination',
    'Civil 3D & Corridor',
  ],
  descs: [
    'Export 2D drawings (plan, elevation, section, detail) directly from Revit 3D model, ensuring automatic synchronization when the model changes.',
    'Use Dynamo to automate component placement, tagging, dimensioning and schedule creation — saving 70% of time compared to CAD.',
    'Automatically export steel, concrete and formwork quantities from the model. Export to Excel in standard budget format.',
    'Full 3D rebar placement for all structural elements: piers, abutments, deck slabs, beams — auto-export construction drawings.',
    'Coordinate between structural, architectural, MEP and geotechnical disciplines in BIM — detect clashes early through Navisworks.',
    'Design road alignment, cross-sections, drainage and corridors with Civil 3D — integrated with Revit bridge models.',
  ],
}

const workEN = {
  titles: [
    'BIM Construction Drawings — Prestressed Concrete Bridge on Expressway',
    '3D Detailed Rebar Layout — Hanoi - Haiphong Interchange',
    'Dynamo Automation Workflow',
    'Quantity Take-off System',
  ],
  descs: [
    'Extract complete construction drawing sets from bridge BIM models. Automated DIM, rebar tags and steel quantities. 60% design time reduction compared to CAD.',
    '3D rebar placement for all bridge components: piers, abutments, footings and deck slabs. Auto-export construction drawings and steel quantity schedules.',
    'Use Dynamo to read Civil 3D data, automatically place piers, bearings and main girders along the alignment, eliminating repetitive work.',
    'Accurately export concrete, rebar and formwork quantities from BIM models, directly used for budgeting and project settlement.',
  ],
}

const wfEN = {
  titles: [
    'Receive Requirements',
    'Build BIM Model',
    'Dynamo Automation',
    'Clash Detection',
    'Export Drawings',
    'Quantity Take-off',
  ],
}

const wfZH = {
  titles: [
    '接收需求',
    '建立BIM模型',
    'Dynamo自动化',
    '碰撞检测',
    '导出图纸',
    '工程量提取',
  ],
}

const wfJA = {
  titles: [
    '要件受領',
    'BIMモデル構築',
    'Dynamo自動化',
    '干渉チェック',
    '図面出力',
    '数量算出',
  ],
}

async function main() {
  console.log('=== Patching English translations for designService ===\n')
  const designs = await client.fetch(`*[_type == "designService"] | order(order asc)`)

  const capItems = designs.filter(d => d.itemType === 'capability')
  const workItems = designs.filter(d => d.itemType === 'work')
  const wfItems = designs.filter(d => d.itemType === 'workflow')

  console.log(`Found: ${capItems.length} capabilities, ${workItems.length} works, ${wfItems.length} workflows\n`)

  for (let i = 0; i < capItems.length; i++) {
    const item = capItems[i]
    const setObj = {}
    if (capEN.titles[i]) setObj['title.en'] = capEN.titles[i]
    if (capEN.descs[i]) setObj['description.en'] = capEN.descs[i]
    await client.patch(item._id).set(setObj).commit()
    console.log(`  ✓ capability[${i}]: ${item.title?.vi} → ${capEN.titles[i]}`)
  }

  for (let i = 0; i < workItems.length; i++) {
    const item = workItems[i]
    const setObj = {}
    if (workEN.titles[i]) setObj['title.en'] = workEN.titles[i]
    if (workEN.descs[i]) setObj['description.en'] = workEN.descs[i]
    await client.patch(item._id).set(setObj).commit()
    console.log(`  ✓ work[${i}]: ${item.title?.vi} → ${workEN.titles[i]}`)
  }

  for (let i = 0; i < wfItems.length; i++) {
    const item = wfItems[i]
    const setObj = {}
    if (wfEN.titles[i]) setObj['title.en'] = wfEN.titles[i]
    if (wfZH.titles[i]) setObj['title.zh'] = wfZH.titles[i]
    if (wfJA.titles[i]) setObj['title.ja'] = wfJA.titles[i]
    await client.patch(item._id).set(setObj).commit()
    console.log(`  ✓ workflow[${i}]: ${item.title?.vi} → EN: ${wfEN.titles[i]}`)
  }

  console.log('\n=== ✅ English translations patched! ===')
}

main().catch(err => { console.error(err); process.exit(1) })
