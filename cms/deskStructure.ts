import { StructureBuilder } from 'sanity/structure'

// Icon components for desk structure
const icons = {
  settings: () => '⚙️',
  home: () => '🏠',
  about: () => '👤',
  services: () => '🔧',
  projects: () => '🏗️',
  course: () => '📚',
  training: () => '🎓',
  bim: () => '🌉',
  design: () => '📐',
}

// Singleton document helper — show only one instance
function singletonItem(S: StructureBuilder, typeName: string, title: string, icon: () => string) {
  return S.listItem()
    .title(title)
    .icon(icon)
    .child(
      S.document()
        .schemaType(typeName)
        .documentId(typeName)
    )
}

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('BIM Innovator CMS')
    .items([
      // ---- SINGLETON PAGES ----
      S.divider(),
      S.listItem()
        .title('Cài đặt & Trang')
        .child(
          S.list()
            .title('Cài đặt & Trang')
            .items([
              singletonItem(S, 'siteSettings', 'Cài đặt Website', icons.settings),
              singletonItem(S, 'homePage', 'Trang chủ', icons.home),
              singletonItem(S, 'aboutPage', 'Trang Giới thiệu', icons.about),
            ])
        ),

      S.divider(),

      // ---- SERVICES ----
      S.listItem()
        .title('Dịch vụ')
        .child(
          S.list()
            .title('Dịch vụ')
            .items([
              S.listItem()
                .title('Khóa học BIM Online')
                .icon(icons.course)
                .child(
                  S.documentTypeList('onlineCourse')
                    .title('Khóa học BIM Online')
                ),
              S.listItem()
                .title('Đào tạo BIM Doanh nghiệp')
                .icon(icons.training)
                .child(
                  S.documentTypeList('corpTraining')
                    .title('Đào tạo BIM Doanh nghiệp')
                ),
              S.listItem()
                .title('Dịch vụ Mô hình BIM')
                .icon(icons.bim)
                .child(
                  S.documentTypeList('bimProject')
                    .title('Dịch vụ Mô hình BIM')
                ),
              S.listItem()
                .title('Dịch vụ Thiết kế BIM')
                .icon(icons.design)
                .child(
                  S.documentTypeList('designService')
                    .title('Dịch vụ Thiết kế BIM')
                ),
            ])
        ),

      S.divider(),

      // ---- PROJECTS ----
      S.listItem()
        .title('Dự án Portfolio')
        .icon(icons.projects)
        .child(
          S.list()
            .title('Dự án Portfolio')
            .items([
              S.listItem()
                .title('Tất cả Dự án')
                .child(
                  S.documentTypeList('project')
                    .title('Tất cả Dự án')
                ),
              S.listItem()
                .title('BIM Modeling')
                .child(
                  S.documentTypeList('project')
                    .title('BIM Modeling')
                    .filter('_type == "project" && category == "bim"')
                ),
              S.listItem()
                .title('Đào tạo Doanh nghiệp')
                .child(
                  S.documentTypeList('project')
                    .title('Đào tạo Doanh nghiệp')
                    .filter('_type == "project" && category == "train"')
                ),
            ])
        ),
    ])
