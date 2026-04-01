/**
 * Append missing ZH + JA translation keys to locales.js
 */
import fs from 'fs'
import path from 'path'

const filePath = path.resolve('..', 'nextcv', 'lib', 'locales.js')
let content = fs.readFileSync(filePath, 'utf-8')

// ── ZH missing keys ──
const zhExtra = `
        "crs.cta_sub": "点击下方按钮，我们将为您安排免费的培训方案和议",
        "services.featured": "服务",
        "services.view_all": "查看所有服务",
        "services.updating": "内容更新中...",
        "services.card5.title": "数字化管理服务",
        "services.card5.desc": "应用数字孪生和智能自动化系统进行智能项目运营管理。",
        "corp.cta_call": "📞 立即拨打", "corp.cta_email": "✉️ 发送邮件",
        "corp.target_title": "参加对象", "corp.outcome_title": "课程成果", "corp.module_title": "课程内容", "corp.gallery_title": "实训现场照片",
        "bim.title": "BIM建模服务", "bim.subtitle": "为交通基础设施、民用建筑和工业项目提供高精度BIM建模。应用Revit、Civil 3D、Dynamo和Scan to BIM技术。",
        "bim.cta_title": "需要BIM建模服务咨询？", "bim.cta_desc": "联系我们获取报价和最优BIM实施方案",
        "dsg.title": "BIM设计服务",
        "dsg.subtitle": "充分利用BIM模型数据，输出高质量设计图纸，实现自动化同步和多专业协同。应用Revit、Civil 3D和Dynamo优化交通基础设施设计流程。",
        "dsg.cap_title": "提供的能力",
        "dsg.work_title": "典型设计案例",
        "dsg.wf_title": "实施流程",
        "dsg.cta_title": "需要为您的项目实施BIM设计？",
        "dsg.cta_desc": "联系我们，获取节省时间和设计成本的最优BIM设计方案",
        "digital.tag_workhub": "工作管理", "digital.tag_dashboard": "仪表盘和报告", "digital.tag_hr": "人力资源管理", "digital.tag_notify": "通知和自动化",
        "digital.p1_title": "工作管理系统",
        "digital.p1_desc": "具有多层组织架构（组织→中心→部门→团队）的企业内部工作管理平台。支持实时任务分配、进度跟踪和自动KPI评估。",
        "digital.p2_title": "报告仪表盘 — 人力绩效分析",
        "digital.p2_desc": "直观的工作报告界面，按部门和个人展示柱状图和饼图。按任务状态分类（进行中/已完成/将来）并导出Excel、PDF A3报告。",
        "digital.p3_title": "人力资源管理 — 权限和角色",
        "digital.p3_desc": "具有详细角色权限（管理员、总监、经理、员工）的人事账户管理系统。集成分级过滤器和自动事件通知。",
        "digital.p4_title": "智能通知系统和数字孪生",
        "digital.p4_desc": "事件驱动的实时自动通知系统，结合数字孪生实现建设项目监控和运营管理。",
        "digital.note_title": "服务说明",
        "digital.note1": "每个数字化解决方案将根据各企业的具体需求进行设计和部署。",
        "digital.note2": "系统可与现有软件（ERP、DMS、CRM）集成或从头构建。",
        "digital.note3": "支持开发Web App、移动应用和实时管理仪表盘。",
        "digital.note4": "联系我们获取适合您需求的解决方案咨询和演示。",
        "digital.cta_title": "需要数字化管理咨询？",
        "digital.cta_desc": "联系我们，获取适合您企业运营流程的系统咨询和演示",
        "ab.career_heading": "职业历程 <span class=\\"highlight-red\\">履历路径</span>",
        "ab.edu_heading": "学术<span class=\\"highlight-green\\">教育背景</span>",
        "ab.skill_heading": "技能与<span class=\\"highlight-red\\">工具</span>",
        "ab.contact_heading": "直接<span style=\\"color:var(--primary-green)\\">联系</span>",
        "slide.caption": "BIM Revit桥梁道路培训 — 企业实操现场",
        "slide.label": "企业培训",
        "slide.title": "企业 <span style='color:var(--primary-green);'>BIM培训实景</span>"`

const jaExtra = `
        "crs.cta_sub": "下のボタンをクリックして、無料カウンセリングとトレーニングプロセスについてご説明します。",
        "services.featured": "サービス",
        "services.view_all": "すべてのサービスを見る",
        "services.updating": "コンテンツを更新中...",
        "services.card5.title": "デジタル管理サービス",
        "services.card5.desc": "デジタルツインとスマート自動化システムを活用したプロジェクト運営管理。",
        "corp.cta_call": "📞 今すぐ電話", "corp.cta_email": "✉️ メール送信",
        "corp.target_title": "参加対象", "corp.outcome_title": "コースの成果", "corp.module_title": "コース内容", "corp.gallery_title": "実訓現場写真",
        "bim.title": "BIMモデリングサービス", "bim.subtitle": "交通インフラ、民間建築、産業向けの高精度BIMモデリング。Revit、Civil 3D、Dynamo、Scan to BIMを活用。",
        "bim.cta_title": "BIMモデリングサービスのご相談？", "bim.cta_desc": "お見積りと最適なBIM展開プランについてお問い合わせください",
        "dsg.title": "BIM設計サービス",
        "dsg.subtitle": "BIMモデルデータを活用して高品質な設計図面を出力、自動化同期および多専門連携。Revit、Civil 3D、Dynamoで交通インフラ設計フローを最適化。",
        "dsg.cap_title": "提供するスキル",
        "dsg.work_title": "代表的な設計作業",
        "dsg.wf_title": "展開フロー",
        "dsg.cta_title": "プロジェクトにBIM設計を導入したいですか？",
        "dsg.cta_desc": "時間と設計コストを削減する最適なBIM設計提案についてお問い合わせください",
        "digital.tag_workhub": "業務管理", "digital.tag_dashboard": "ダッシュボードとレポート", "digital.tag_hr": "人事管理", "digital.tag_notify": "通知と自動化",
        "digital.p1_title": "業務管理システム",
        "digital.p1_desc": "多層組織構造（組織→センター→部門→チーム）の企業内部業務管理プラットフォーム。リアルタイムのタスク割当・進捗管理・自動KPI評価に対応。",
        "digital.p2_title": "レポートダッシュボード — 人事パフォーマンス分析",
        "digital.p2_desc": "部門別・個人別の棒グラフと円グラフを使用した直感的な業務レポートUI。タスク状態分類（進行中/完了/予定）およびExcel・PDF A3出力。",
        "digital.p3_title": "人事管理 — 権限とロール",
        "digital.p3_desc": "詳細なロール権限（管理者、ディレクター、マネージャー、スタッフ）を持つ人事アカウント管理システム。階層フィルターと自動イベント通知に対応。",
        "digital.p4_title": "スマート通知システムとデジタルツイン",
        "digital.p4_desc": "イベント駆動のリアルタイム自動通知システムが、デジタルツインと連携して建設プロジェクトの監視と運営管理を実現。",
        "digital.note_title": "サービスについて",
        "digital.note1": "各デジタル化ソリューションは各企業の特定のニーズに合わせて設計および展開されます。",
        "digital.note2": "システムは既存ソフトウェア（ERP、DMS、CRM）と統合するか、ゼロから構築することができます。",
        "digital.note3": "WebアプリPhoneアプリおよびリアルタイム管理ダッシュボードの展開をサポートします。",
        "digital.note4": "お客様のニーズに最適なソリューションのコンサルティングとデモについてお問い合わせください。",
        "digital.cta_title": "デジタル管理ソリューションについてご相談ですか？",
        "digital.cta_desc": "貴社の業務フローに最適なシステムのコンサルティングとデモについてお問い合わせください",
        "ab.career_heading": "キャリア <span class=\\"highlight-red\\">キャリアパス</span>",
        "ab.edu_heading": "学術<span class=\\"highlight-green\\">教育背景</span>",
        "ab.skill_heading": "スキルと<span class=\\"highlight-red\\">ツール</span>",
        "ab.contact_heading": "直接<span style=\\"color:var(--primary-green)\\">連絡</span>",
        "slide.caption": "BIM Revit橋梁道路トレーニング — 企業での実践",
        "slide.label": "企業トレーニング",
        "slide.title": "企業 <span style='color:var(--primary-green);'>BIMトレーニングギャラリー</span>"`

// Insert zh extra before zh closing }
content = content.replace(
  `        "crs.cta_btn": "联系咨询"
    },
    ja:`,
  `        "crs.cta_btn": "联系咨询",\n${zhExtra}
    },
    ja:`
)

// Insert ja extra before ja closing }
content = content.replace(
  `        "crs.cta_btn": "ご相談はこちら"
    }
};`,
  `        "crs.cta_btn": "ご相談はこちら",\n${jaExtra}
    }
};`
)

fs.writeFileSync(filePath, content, 'utf-8')
console.log('✅ locales.js updated with missing zh/ja keys')
console.log('Lines:', content.split('\n').length)
