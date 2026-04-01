/**
 * BIM Innovator — Patch ZH + JA Translations
 * Adds Chinese and Japanese to all localizedString/localizedText fields
 * Usage: node patch_translations.mjs
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

// ─── LESSON TITLES ─────────────────────────────────────────────────────────
const lessonTitles = {
  zh: [
    '软件介绍，建立钻孔桩族',
    '建立桥墩族',
    '建立桥台族',
    '建立Super T梁族',
    '建立预应力索（DUL）族',
    'Dynamo入门，用Dynamo放置钻孔桩',
    '从Civil 3D读取路线数据，用Dynamo放置桥墩桥台',
    '用Dynamo放置支座',
    '用Dynamo放置桥梁和桥面板',
    '用Revit工具布置钢筋（第一部分）',
    '用Revit工具布置钢筋（第二部分）',
    '创建图框、标注、钢筋标签、钢筋量',
    '对象管理、线型、打印和导出',
    '绘制检查井族',
    '将CAD文件插入Revit时设置正确坐标',
    '钢筋展开、图纸呈现、工程量导出',
  ],
  ja: [
    'ソフトウェア紹介、杭族の作成',
    '橋脚族の作成',
    '橋台族の作成',
    'Super T桁族の作成',
    'プレストレスケーブル（DUL）族の作成',
    'Dynamoの基礎、Dynamoで杭を配置',
    'Civil 3Dから路線データを読込み、Dynamoで橋脚・橋台を配置',
    'Dynamoで支承を配置',
    'Dynamoで桁と床版を配置',
    'Revitツールで鉄筋を配置（前編）',
    'Revitツールで鉄筋を配置（後編）',
    '図面タイトル枠の作成、寸法・鉄筋タグ・鉄筋量',
    'オブジェクト管理・線種・印刷・書き出し',
    'マンホール族の作成',
    'CADファイルをRevitに挿入時の座標設定',
    '鉄筋の展開・図面の整理・数量の書き出し',
  ],
}

const tagLabels = {
  zh: { video: '视频', file: '练习文件', article: '文章' },
  ja: { video: '動画', file: '練習ファイル', article: '記事' },
}

// ─── BIM PROJECT TRANSLATIONS ──────────────────────────────────────────────
const bimTitles = {
  zh: [
    '混凝土桥梁BIM模型 — 友谊-芝岭高速',
    '河内-海防立交桥梁',
    '详细钢筋模型 — 河内-海防立交',
    '钢桥BIM模型 — 日本标准(JIS)',
    '公路隧道BIM模型 — 黄连山口',
    '联排别墅设计 — 建筑&结构BIM模型',
    'Scan to BIM — 从点云数据生成BIM模型',
    '灌溉泵站BIM模型',
    '灌溉泵站结构细节',
    '挡土墙模型 — 复杂立交',
  ],
  ja: [
    'コンクリート橋梁BIMモデル — フーギー・チーラン高速道路',
    'ハノイ-ハイフォン立体交差の橋梁',
    '詳細鉄筋モデル — ハノイ-ハイフォン立体交差',
    '鋼橋BIMモデル — 日本標準(JIS)',
    '道路トンネルBIMモデル — ホアンリエン峠',
    '聯排別荘設計 — 建築&構造BIMモデル',
    'Scan to BIM — 点群データからのBIMモデル',
    '灌漑ポンプ場BIMモデル',
    '灌漑ポンプ場構造詳細',
    '擁壁モデル — 複雑な立体交差',
  ],
}

const bimDescs = {
  zh: [
    '为友谊-芝岭高速公路预应力混凝土桥梁系统建模，包括完整的桩基、桥墩、桥台、Super T梁和桥面板，项目全生命周期管理属性数据。',
    '河内-海防高速立交多层复杂桥梁系统BIM模型，支持多专业协调和结构碰撞检测。',
    '复杂立交桥墩、桥台和桥面板3D详细钢筋布置，自动输出施工图、钢筋量表和TCVN密度检验。',
    '按JIS标准建立的钢桥BIM模型，包括钢箱梁、高强螺栓和焊接细节，用于加工图和结构验证。',
    '黄连山口穿山公路隧道BIM模型，涵盖衬砌、排水、照明和交通控制系统，集成地质数据分析地下施工风险。',
    '多层联排别墅全套BIM模型，整合建筑、结构和MEP。使用Revit生成报建图、三维渲染和精确工程量。',
    'LiDAR点云数据在Revit中转换为精确BIM模型，精度±2mm，用于改造、改新和实际偏差分析。',
    '灌溉泵站完整三维BIM模型，包括泵房、进出水池、管道和机电设备，支持多专业协调和布置优化。',
    '泵站内部详细结构模型：楼板、梁、柱和RC连续地下墙，自动输出施工图和材料工程量。',
    '复杂立交挡土墙系统，包括悬臂、板框和重力式，基于实际岩土数据分析和优化。',
  ],
  ja: [
    'フーギー・チーラン高速道路のプレストレスコンクリート橋梁の包括BIMモデリング。橋脚・橋台・Super T桁・橋座の完全モデル。',
    'ハノイ-ハイフォン高速立体交差の多層複合橋梁システムBIMモデル。多専門協調と構造干渉検知を支援。',
    '複雑な立体交差の橋脚・橋台・床版の3D詳細鉄筋配置。施工図・鉄筋量表の自動出力。',
    'JIS標準の鋼橋BIMモデル。鋼箱桁・高力ボルト・溶接詳細を含む加工図・構造検証に使用。',
    'ホアンリエン峠の道路トンネルBIMモデル。覆工・排水・照明・交通制御システムを網羅。',
    '多層連棟住宅の完全BIMモデル。建築・構造・設備を統合。申請図・3Dレンダリング・数量算出に使用。',
    'LiDAR点群データをRevitで精度±2mmの正確なBIMモデルに変換。改修・現況偏差分析に使用。',
    '灌漑ポンプ場の完全3D BIMモデル。ポンプ室・吸水槽・排水槽・配管・電機設備を含む。',
    'ポンプ場内部の詳細構造モデル：スラブ・梁・柱・RC地中連続壁。施工図・材料数量の自動出力。',
    '複雑な立体交差の擁壁システム。片持ち式・パネル式・重力式を含む。実際の地盤データによる稳定解析。',
  ],
}

// ─── ABOUT PAGE ──────────────────────────────────────────────────────────
const careerZh = [
  { role: '副总经理兼首席技术官 (CTO)', company: 'A2Z建设咨询股份公司', date: '现在', desc: '负责技术战略、数字化转型，为国家重点交通基础设施项目全面部署BIM。' },
  { role: '分公司总经理', company: 'A2Z建设设计咨询股份公司（Deo Ca集团成员）', date: '02/2025 — 至今', desc: '管理分公司运营，领导BIM和数字技术部门服务大型基础设施项目。' },
  { role: '分公司总经理', company: 'Dai Phong建设设计咨询股份公司（Deo Ca集团成员）', date: '10/2024 — 02/2025', desc: '管理分公司，在南部实施大型建设设计项目。' },
  { role: 'BIM中心副主任', company: 'Deo Ca集团股份公司', date: '05/2024 — 10/2024', desc: '负责集团级BIM部署，为高速公路项目建立BIM流程和标准。' },
  { role: 'BIM Leader', company: 'Deo Ca集团股份公司', date: '01/2024 — 04/2024', desc: '带领BIM团队，为交通基础设施项目实施建模。' },
  { role: 'BIM Manager', company: 'Kuukan Design Architects越南（Space Design成员）', date: '05/2023 — 12/2023', desc: '管理国际建筑项目的BIM，与日本合作伙伴协作。' },
  { role: 'BIM Leader & BIM培训讲师', company: 'BIM河内', date: '2022 — 2023', desc: '深度BIM培训，建设课程体系，培养专业BIM团队。' },
  { role: 'BIM Leader', company: 'CICCO岘港', date: '2018 — 2022', desc: '率先将BIM应用于越南中部的建设项目，从早期阶段建立BIM基础。' },
]
const careerJa = [
  { role: '副社長兼最高技術責任者 (CTO)', company: 'A2Z建設コンサルティング株式会社', date: '現在', desc: '技術戦略・DX・国家重点交通インフラへの包括的BIM展開を担当。' },
  { role: '支社長', company: 'A2Z建設設計コンサルティング株式会社（Deo Caグループ）', date: '02/2025 — 現在', desc: '支社運営管理、大型インフラ向けBIM・デジタル技術部門を率いる。' },
  { role: '支社長', company: 'Dai Phong建設設計コンサルティング株式会社（Deo Caグループ）', date: '10/2024 — 02/2025', desc: '支社運営、南部での大型建設設計プロジェクトの展開。' },
  { role: 'BIMセンター副所長', company: 'Deo Caグループ株式会社', date: '05/2024 — 10/2024', desc: 'グループレベルのBIM展開、高速道路プロジェクト向けBIMプロセスと基準の構築。' },
  { role: 'BIMリーダー', company: 'Deo Caグループ株式会社', date: '01/2024 — 04/2024', desc: 'BIMチームを率い、交通インフラプロジェクトのモデリングを展開。' },
  { role: 'BIMマネージャー', company: 'Kuukan Design Architects ベトナム（Space Designメンバー）', date: '05/2023 — 12/2023', desc: '国際建築プロジェクトのBIM管理、日本パートナーとの連携。' },
  { role: 'BIMリーダー & BIM研修講師', company: 'BIMハノイ', date: '2022 — 2023', desc: '専門BIM研修、カリキュラム構築、プロフェッショナルBIMチームの育成。' },
  { role: 'BIMリーダー', company: 'CICCOダナン', date: '2018 — 2022', desc: 'ベトナム中部の建設プロジェクトへのBIM適用を先駆け、初期段階からBIM基盤を構築。' },
]

const eduZh = [
  { degree: '工程师学位', major: '交通建设工程专业', school: '岘港理工大学 (DUT)', desc: '毕业于越南中部顶尖理工大学。' },
  { degree: '国际认证', major: 'BIM Professional Certification', school: 'Autodesk及国际合作伙伴', desc: '获得国际组织颁发的BIM专家认证。精通Revit、Civil 3D、Navisworks、BIM 360、Dynamo Scripting。' },
  { degree: '工程师学位', major: '高速铁路与城市轨道交通建设专业', school: '胡志明市交通运输大学 (UTH)', desc: '毕业于越南顶尖理工大学之一。' },
]
const eduJa = [
  { degree: '工学士', major: '交通建設工学専攻', school: 'ダナン工科大学 (DUT)', desc: 'ベトナム中部トップクラスの工科大学を卒業。' },
  { degree: '国際資格', major: 'BIM Professional Certification', school: 'Autodesk & 国際パートナー', desc: '国際機関からのBIM専門家認定。Revit、Civil 3D、Navisworks、BIM 360、Dynamo Scriptingに精通。' },
  { degree: '工学士', major: '高速鉄道・都市鉄道建設専攻', school: 'ホーチミン市交通運輸大学 (UTH)', desc: 'ベトナムトップクラスの工科大学を卒業。' },
]

const skillNamesZh = ['BIM软件', '编程与开发', '管理与领导', '交通基础设施', '新兴技术', '教学与咨询']
const skillNamesJa = ['BIMソフトウェア', 'プログラミング & 開発', 'マネジメント & リーダーシップ', '交通インフラ', '新技術', '教育 & コンサルティング']

// ─── HELPERS ───────────────────────────────────────────────────────────────
function patchField(path, zh, ja) {
  return { [`${path}.zh`]: zh, [`${path}.ja`]: ja }
}

// ─── MAIN ──────────────────────────────────────────────────────────────────
async function main() {
  console.log('=== Patching ZH + JA Translations ===\n')

  // ── 1. ONLINE COURSE ──
  console.log('[1] Patching onlineCourse...')
  const courses = await client.fetch(`*[_type == "onlineCourse"]`)
  for (const course of courses) {
    let patch = client.patch(course._id)
      .set({
        'title.zh': 'REVIT 桥梁道路在线培训',
        'title.ja': 'REVIT 橋梁・道路オンライントレーニング',
        'subtitle.zh': '使用Revit和Dynamo进行桥梁道路建模的从基础到高级的实战培训课程',
        'subtitle.ja': 'Revit & Dynamoを使った橋梁・道路BIMモデリングの基礎から応用まで実践トレーニング',
      })

    // Patch lessons
    const lessons = course.lessons || []
    const setObj = {}
    lessons.forEach((lesson, i) => {
      const zh = lessonTitles.zh[i] || lesson.title?.vi || ''
      const ja = lessonTitles.ja[i] || lesson.title?.vi || ''
      setObj[`lessons[${i}].title.zh`] = zh
      setObj[`lessons[${i}].title.ja`] = ja

      // Patch tags
      const tags = lesson.tags || []
      tags.forEach((tag, ti) => {
        const type = tag.type || 'video'
        setObj[`lessons[${i}].tags[${ti}].label`] = {
          _type: 'localizedString',
          vi: tag.label?.vi || tag.label || (type === 'video' ? 'Video' : type === 'file' ? 'File thực hành' : 'Bài viết'),
          en: type === 'video' ? 'Video' : type === 'file' ? 'Practice Files' : 'Article',
          zh: tagLabels.zh[type] || tag.label,
          ja: tagLabels.ja[type] || tag.label,
        }
      })
    })

    await patch.set(setObj).commit()
    console.log(`  ✓ ${course.title?.vi || course._id}`)
  }

  // ── 2. BIM PROJECTS ──
  console.log('\n[2] Patching bimProjects...')
  const projects = await client.fetch(`*[_type == "bimProject"] | order(order asc)`)
  for (let i = 0; i < projects.length; i++) {
    const proj = projects[i]
    const zh_t = bimTitles.zh[i] || proj.title?.vi || ''
    const ja_t = bimTitles.ja[i] || proj.title?.vi || ''
    const zh_d = bimDescs.zh[i] || ''
    const ja_d = bimDescs.ja[i] || ''

    await client.patch(proj._id).set({
      'title.zh': zh_t,
      'title.ja': ja_t,
      'description.zh': zh_d,
      'description.ja': ja_d,
    }).commit()
    console.log(`  ✓ ${proj.title?.vi || proj._id}`)
  }

  // ── 3. ABOUT PAGE ──
  console.log('\n[3] Patching aboutPage...')
  const about = await client.fetch(`*[_type == "aboutPage"][0]`)
  if (about) {
    const setObj = {
      'jobTitle.zh': '副总经理兼首席技术官 (CTO)',
      'jobTitle.ja': '副社長兼最高技術責任者 (CTO)',
      'heroBadge.zh': 'BIM及数字孪生',
      'heroBadge.ja': 'BIMとデジタルツイン',
      'heroTitle.zh': '以BIM与数字孪生创造未来',
      'heroTitle.ja': 'BIMとデジタルツインで未来を創造する',
      'heroDescription.zh': '在交通建设工程和信息技术领域拥有超过8年经验。现任A2Z建设咨询股份公司副总经理兼首席技术官(CTO)。',
      'heroDescription.ja': '交通建設工学と情報技術の分野で8年以上の経験。現在A2Z建設コンサルティング株式会社 副社長兼CTO。',
    }

    // Stats
    const stats = about.heroStats || []
    stats.forEach((stat, i) => {
      const labels = [
        { zh: '年经验', ja: '年の経験' },
        { zh: '完成项目', ja: '完了プロジェクト' },
        { zh: '培训学员', ja: '研修生' },
      ]
      if (labels[i]) {
        setObj[`heroStats[${i}].label.zh`] = labels[i].zh
        setObj[`heroStats[${i}].label.ja`] = labels[i].ja
      }
    })

    // Career
    const career = about.careerTimeline || []
    career.forEach((item, i) => {
      if (careerZh[i]) {
        setObj[`careerTimeline[${i}].date.zh`] = careerZh[i].date
        setObj[`careerTimeline[${i}].role.zh`] = careerZh[i].role
        setObj[`careerTimeline[${i}].company.zh`] = careerZh[i].company
        setObj[`careerTimeline[${i}].description.zh`] = careerZh[i].desc
      }
      if (careerJa[i]) {
        setObj[`careerTimeline[${i}].date.ja`] = careerJa[i].date
        setObj[`careerTimeline[${i}].role.ja`] = careerJa[i].role
        setObj[`careerTimeline[${i}].company.ja`] = careerJa[i].company
        setObj[`careerTimeline[${i}].description.ja`] = careerJa[i].desc
      }
    })

    // Education
    const edu = about.education || []
    edu.forEach((item, i) => {
      if (eduZh[i]) {
        setObj[`education[${i}].degree.zh`] = eduZh[i].degree
        setObj[`education[${i}].major.zh`] = eduZh[i].major
        setObj[`education[${i}].school.zh`] = eduZh[i].school
        setObj[`education[${i}].description.zh`] = eduZh[i].desc
      }
      if (eduJa[i]) {
        setObj[`education[${i}].degree.ja`] = eduJa[i].degree
        setObj[`education[${i}].major.ja`] = eduJa[i].major
        setObj[`education[${i}].school.ja`] = eduJa[i].school
        setObj[`education[${i}].description.ja`] = eduJa[i].desc
      }
    })

    // Skills
    const skills = about.skillCategories || []
    skills.forEach((cat, i) => {
      if (skillNamesZh[i]) setObj[`skillCategories[${i}].categoryName.zh`] = skillNamesZh[i]
      if (skillNamesJa[i]) setObj[`skillCategories[${i}].categoryName.ja`] = skillNamesJa[i]
    })

    await client.patch(about._id).set(setObj).commit()
    console.log('  ✓ aboutPage patched')
  }

  // ── 4. CORP TRAINING ──
  console.log('\n[4] Patching corpTraining...')
  const trainings = await client.fetch(`*[_type == "corpTraining"]`)
  for (const tr of trainings) {
    const setObj = {
      'title.zh': '企业REVIT桥梁道路培训',
      'title.ja': '企業向けREVIT橋梁・道路トレーニング',
      'subtitle.zh': '专为设计咨询团队量身定制的深度培训课程，使用Revit进行桥梁道路BIM建模，并通过Dynamo实现设计自动化。',
      'subtitle.ja': '設計コンサルティングチーム向けに特化した集中トレーニング。RevitでBIMモデリングし、Dynamoで自動化。',
      'badge.zh': '企业BIM培训',
      'badge.ja': '企業向けBIMトレーニング',
    }

    // Stats labels
    const statLabels = [
      { zh: '课时', ja: 'レッスン数' },
      { zh: '实践小时', ja: '実践時間' },
      { zh: '项目实战', ja: 'プロジェクト' },
      { zh: '课后支持', ja: '受講後サポート' },
    ]
    ;(tr.stats || []).forEach((s, i) => {
      if (statLabels[i]) {
        setObj[`stats[${i}].label.zh`] = statLabels[i].zh
        setObj[`stats[${i}].label.ja`] = statLabels[i].ja
      }
    })

    // Target audience
    const targetZh = ['桥梁道路建设工程师', '交通基础设施设计工程师', '咨询公司BIM团队', '需要了解BIM的项目经理', '希望进入BIM领域的应届毕业生', 'CAD转BIM工程师']
    const targetJa = ['橋梁道路建設エンジニア', '交通インフラ設計エンジニア', 'コンサル会社のBIMチーム', 'BIM理解を求めるPM', 'BIM分野に入る新卒', 'CADからBIMへの転換エンジニア']
    ;(tr.targetAudience || []).forEach((t, i) => {
      if (targetZh[i]) setObj[`targetAudience[${i}].title.zh`] = targetZh[i]
      if (targetJa[i]) setObj[`targetAudience[${i}].title.ja`] = targetJa[i]
    })

    // Outcomes
    const outcomeZh = [
      '构建完整桥梁族：钻孔桩、桥墩、桥台、Super T梁、预应力索',
      '用Dynamo自动布置构件：读取Civil 3D路线，沿路线布置墩台、梁体、支座',
      '完整钢筋布置，生成施工图：图框、标注、钢筋标签、钢筋量清单',
      '对象管理、线型、规范打印；导出工程量到Excel；与CAD和Civil 3D协同',
      '为团队建立标准化BIM工作流，直接应用于企业实际项目',
      '与传统CAD流程相比，设计效率提升3-5倍；减少碰撞错误和施工风险',
    ]
    const outcomeJa = [
      '完全な橋梁族を作成：杭・橋脚・橋台・Super T桁・PC鋼材',
      'Dynamoで配置自動化：Civil 3D路線読込後、墩台・桁・支承を自動配置',
      '完全な鉄筋配置と施工図作成：図面タイトル枠・寸法・鉄筋タグ・数量表',
      'オブジェクト管理・線種・規格印刷、Excelへの数量出力、CAD/Civil 3D連携',
      'チーム向け標準化BIMワークフロー構築、実際のプロジェクトに直接適用',
      'CAD比3〜5倍の設計効率向上、干渉エラーと施工リスクを最小化',
    ]
    ;(tr.outcomes || []).forEach((o, i) => {
      if (outcomeZh[i]) setObj[`outcomes[${i}].text.zh`] = outcomeZh[i]
      if (outcomeJa[i]) setObj[`outcomes[${i}].text.ja`] = outcomeJa[i]
    })

    // Modules
    const modNumZh = ['第1部分 — 族建模', '第2部分 — Dynamo自动化', '第3部分 — 钢筋与图纸', '第4部分 — 交付成果']
    const modTitleZh = ['在Revit中构建桥梁族', '用Dynamo自动布置构件', '钢筋布置与图纸完成', '文档与标准交付包']
    const modNumJa = ['第1部 — 族モデリング', '第2部 — Dynamo自動化', '第3部 — 鉄筋と図面', '第4部 — 成果物']
    const modTitleJa = ['Revitで橋梁族を作成', 'Dynamoで配置を自動化', '鉄筋配置と図面完成', '文書と標準納品パッケージ']

    const modItemsZh = [
      ['钻孔桩族（按直径和长度参数化）', '桥墩族（直墩和曲墩）', '桥台族和埋入式桥台', 'Super T / I梁族（22TCN标准）', '梁内预应力索（DUL）族', '支座族：橡胶/盆式/销轴支座'],
      ['Dynamo基础：节点、连线、列表、基本逻辑', '从Civil 3D（.dwg/.xml）读取路线坐标', '按坐标表批量布置钻孔桩', '沿路线以正确倾斜角布置墩台', '自动布置支座、梁体和桥面板', '按企业标准定制Dynamo脚本'],
      ['用Revit工具在墩、台和桥面板中布置钢筋', '创建ISO标准图框，设置图纸', '自动化尺寸标注、钢筋标签和注释', '导出钢筋工程量（明细表→Excel）', '打印、导出PDF/DWG，规范线型管理', '与CAD/Civil 3D文件按系统坐标协同'],
      ['企业标准化桥梁族库', '可复用的Dynamo自动布置脚本', '标准化Revit模板（含BIM执行计划）', '内部标准操作程序（SOP）文档', '课后1对1技术支持', 'BIM桥梁道路培训结业证书'],
    ]
    const modItemsJa = [
      ['杭族（直径・長さでパラメトリック）', '橋脚族（直橋脚と曲線橋脚）', '橋台族と埋込橋台', 'Super T / I桁族（22TCN規格）', '桁内PC鋼材（DUL）族', '支承族：ゴム/ポット/ピン'],
      ['Dynamo基礎：ノード・接続・リスト・ロジック', 'Civil 3D（.dwg/.xml）から路線座標を読込み', '座標表から杭を一括配置', '路線に沿って正確なスキュー角で橋脚・橋台を配置', '支承・桁・床版を自動配置', '企業標準に合わせたDynamoスクリプトカスタマイズ'],
      ['Revitツールで橋脚・橋台・床版に鉄筋を配置', 'ISO規格のタイトル枠を作成・シート設定', '寸法・鉄筋タグ・注釈の自動化', '鉄筋数量の書き出し（スケジュール→Excel）', 'PDF/DWGの印刷・書出し・線種管理', 'CAD/Civil 3Dとの座標系連携'],
      ['企業標準化橋梁族ライブラリ', '配置自動化のための再利用可能なDynamoスクリプト', '標準化Revitテンプレート（BIM実施計画統合）', '社内標準作業手順書（SOP）', '受講後1対1技術サポート', 'BIM橋梁・道路トレーニング修了証'],
    ]

    ;(tr.modules || []).forEach((mod, mi) => {
      if (modNumZh[mi]) {
        setObj[`modules[${mi}].moduleNumber.zh`] = modNumZh[mi]
        setObj[`modules[${mi}].title.zh`] = modTitleZh[mi]
        setObj[`modules[${mi}].moduleNumber.ja`] = modNumJa[mi]
        setObj[`modules[${mi}].title.ja`] = modTitleJa[mi]
      }
      ;(mod.items || []).forEach((item, ii) => {
        if (modItemsZh[mi]?.[ii]) setObj[`modules[${mi}].items[${ii}].zh`] = modItemsZh[mi][ii]
        if (modItemsJa[mi]?.[ii]) setObj[`modules[${mi}].items[${ii}].ja`] = modItemsJa[mi][ii]
      })
    })

    await client.patch(tr._id).set(setObj).commit()
    console.log(`  ✓ ${tr.title?.vi || tr._id}`)
  }

  // ── 5. HOME PAGE ──
  console.log('\n[5] Patching homePage...')
  const home = await client.fetch(`*[_type == "homePage"][0]`)
  if (home) {
    const setObj = {
      'heroTitle.zh': '革新 创意 科技',
      'heroTitle.ja': '革新 創造性 テクノロジー',
      'heroSubtitle.zh': '提供全面的数字化解决方案和面向未来的突破性设计。',
      'heroSubtitle.ja': '未来に向けた包括的なデジタルソリューションと画期的なデザインを提供します。',
    }
    const statLabels = [
      { zh: '完成项目', ja: '完了プロジェクト' },
      { zh: '年经验', ja: '年の経験' },
      { zh: '培训学员', ja: '研修生' },
    ]
    ;(home.stats || []).forEach((s, i) => {
      if (statLabels[i]) {
        setObj[`stats[${i}].label.zh`] = statLabels[i].zh
        setObj[`stats[${i}].label.ja`] = statLabels[i].ja
      }
    })
    await client.patch(home._id).set(setObj).commit()
    console.log('  ✓ homePage patched')
  }

  console.log('\n=== ✅ All translations patched! ===')
}

main().catch(err => {
  console.error('Patch failed:', err)
  process.exit(1)
})
