/**
 * Patch locales.js with missing projects.* keys
 * AND patch Sanity project.badge with zh/ja translations
 */
import fs from 'fs'
import path from 'path'
import { createClient } from '@sanity/client'

const TOKEN = 'skiuFG2XoSSNQ08z4wj8aOJPMk2mnMchiOQNJz7yylXZ0VszObcAaKaUzL3oSAR74Gbve32OFXhV4pMLk8HCti6zT8rLiTMpIRa00D3WozVOohLTrtNYHjt7x5RghTFvFBs1erheAw2nymlKGBhRDyk71gbJepJ3kcDCUVGLgNF8sMxT7pw4'

const client = createClient({
  projectId: 'wd53xh69',
  dataset: 'production',
  token: TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

// ── 1. Patch locales.js ──────────────────────────────────────────────────────
const filePath = path.resolve('..', 'nextcv', 'lib', 'locales.js')
let content = fs.readFileSync(filePath, 'utf-8')

const viProjects = `
        "projects.page_title": "Danh mục Dự án",
        "projects.page_sub": "Tổng hợp các công trình BIM thực tế đã triển khai — từ hạ tầng giao thông, dân dụng đến đào tạo chuyên nghiệp",
        "projects.cat_bim": "Dự án Mô hình BIM",
        "projects.cat_train": "Đào tạo BIM Doanh nghiệp",`

const enProjects = `
        "projects.page_title": "Project Portfolio",
        "projects.page_sub": "A collection of real BIM projects deployed — from transportation infrastructure, civil buildings to professional training",
        "projects.cat_bim": "BIM Modeling Projects",
        "projects.cat_train": "Corporate BIM Training",`

const zhProjects = `
        "projects.page_title": "项目组合",
        "projects.page_sub": "已实施的BIM项目集合 — 从交通基础设施、民用建筑到专业培训",
        "projects.cat_bim": "BIM建模项目",
        "projects.cat_train": "企业BIM培训",`

const jaProjects = `
        "projects.page_title": "プロジェクトポートフォリオ",
        "projects.page_sub": "実施済みBIMプロジェクト集 — 交通インフラ、民間建築から専門トレーニングまで",
        "projects.cat_bim": "BIMモデリングプロジェクト",
        "projects.cat_train": "企業BIMトレーニング",`

// Insert after "crs.cta_btn" in vi section
content = content.replace(
  `"crs.cta_btn": "Liên hệ tư vấn"
    },
    en:`,
  `"crs.cta_btn": "Liên hệ tư vấn",\n${viProjects}
    },
    en:`
)

// Insert after "crs.cta_btn" in en section
content = content.replace(
  `"crs.cta_btn": "Contact for Consultation"
    },
    zh:`,
  `"crs.cta_btn": "Contact for Consultation",\n${enProjects}
    },
    zh:`
)

// Insert after existing zh extras before closing
content = content.replace(
  `"slide.title": "企业 <span style='color:var(--primary-green);'>BIM培训实景</span>"
    },
    ja:`,
  `"slide.title": "企业 <span style='color:var(--primary-green);'>BIM培训实景</span>",\n${zhProjects}
    },
    ja:`
)

// Insert after existing ja extras before closing
content = content.replace(
  `"slide.title": "企業 <span style='color:var(--primary-green);'>BIMトレーニングギャラリー</span>"
    }
};`,
  `"slide.title": "企業 <span style='color:var(--primary-green);'>BIMトレーニングギャラリー</span>",\n${jaProjects}
    }
};`
)

fs.writeFileSync(filePath, content, 'utf-8')
console.log('✅ locales.js updated with projects.* keys. Lines:', content.split('\n').length)

// ── 2. Patch project badges in Sanity ────────────────────────────────────────
console.log('\nPatching project badge translations in Sanity...')

const badgeMap = {
  vi: {
    'Cao tốc': { zh: '高速公路', ja: '高速道路' },
    'Nút giao': { zh: '立交桥', ja: '立体交差' },
    'Cốt thép': { zh: '钢筋', ja: '鉄筋' },
    'Cầu thép': { zh: '钢桥', ja: '鋼橋' },
    'Hầm đường bộ': { zh: '公路隧道', ja: '道路トンネル' },
    'Kiến trúc': { zh: '建筑', ja: '建築' },
    'Scan to BIM': { zh: 'Scan to BIM', ja: 'Scan to BIM' },
    'Thủy lợi': { zh: '水利', ja: '水利' },
    'Tường chắn': { zh: '挡土墙', ja: '擁壁' },
    'Đào tạo': { zh: '培训', ja: 'トレーニング' },
  }
}

async function patchProjects() {
  const allProjects = await client.fetch(`*[_type in ["bimProject", "project"]]`)
  for (const proj of allProjects) {
    const badgeVi = proj.badge?.vi
    if (badgeVi && badgeMap.vi[badgeVi]) {
      const { zh, ja } = badgeMap.vi[badgeVi]
      await client.patch(proj._id).set({
        'badge.zh': zh,
        'badge.ja': ja,
      }).commit()
      console.log(`  ✓ ${proj._type}: ${badgeVi} → ${zh} / ${ja}`)
    }
  }

  // Also patch category labels for portfolio projects
  const catMap = {
    'BIM Modeling': { zh: 'BIM建模', ja: 'BIMモデリング' },
    'Đào tạo Doanh nghiệp': { zh: '企业培训', ja: '企業トレーニング' },
  }

  for (const proj of allProjects) {
    const catLabelEn = proj.categoryLabel?.en
    if (catLabelEn && catMap[catLabelEn]) {
      await client.patch(proj._id).set({
        'categoryLabel.zh': catMap[catLabelEn].zh,
        'categoryLabel.ja': catMap[catLabelEn].ja,
      }).commit()
    }
    // patch title zh/ja for portfolio projects if missing
    if (proj._type === 'project' && (!proj.title?.zh)) {
      // already patched in previous script — skip
    }
  }
  console.log('✅ All project badges patched')
}

patchProjects().catch(err => { console.error(err); process.exit(1) })
