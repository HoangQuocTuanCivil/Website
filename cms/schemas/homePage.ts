import { defineType, defineField } from 'sanity'

export const homePage = defineType({
  name: 'homePage',
  title: 'Trang chủ',
  type: 'document',
  fields: [
    // ---- HERO SECTION ----
    defineField({
      name: 'heroTitle',
      title: 'Tiêu đề Hero',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Phụ đề Hero',
      type: 'localizedText',
    }),
    defineField({
      name: 'heroCta',
      title: 'Nút CTA Hero',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroCtaLink',
      title: 'Link CTA Hero',
      type: 'string',
      initialValue: '/services',
    }),
    defineField({
      name: 'heroSlides',
      title: 'Slideshow Hero',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Mô tả ảnh (alt)' },
          ],
        },
      ],
    }),

    // ---- FEATURED SERVICES ----
    defineField({
      name: 'featuredServicesTitle',
      title: 'Tiêu đề mục Dịch vụ',
      type: 'localizedString',
    }),
    defineField({
      name: 'featuredServices',
      title: 'Dịch vụ nổi bật',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'localizedString', title: 'Tên dịch vụ' },
            { name: 'description', type: 'localizedText', title: 'Mô tả' },
            { name: 'icon', type: 'string', title: 'Icon (emoji)' },
            { name: 'image', type: 'image', title: 'Hình ảnh', options: { hotspot: true } },
            { name: 'link', type: 'string', title: 'Link' },
            {
              name: 'accentColor',
              type: 'string',
              title: 'Màu nhấn',
              options: {
                list: [
                  { title: 'Đỏ', value: 'red' },
                  { title: 'Xanh lá', value: 'green' },
                ],
              },
              initialValue: 'red',
            },
          ],
          preview: {
            select: { title: 'title.vi', media: 'image' },
          },
        },
      ],
    }),

    // ---- FEATURED PROJECTS ----
    defineField({
      name: 'featuredProjectsTitle',
      title: 'Tiêu đề mục Dự án',
      type: 'localizedString',
    }),
    defineField({
      name: 'featuredProjects',
      title: 'Dự án tiêu biểu',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'project' }],
        },
      ],
      validation: (rule) => rule.max(6),
    }),

    // ---- STATS ----
    defineField({
      name: 'stats',
      title: 'Thống kê nổi bật',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Số liệu (vd: 150+)' },
            { name: 'label', type: 'localizedString', title: 'Nhãn' },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label.vi' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Trang chủ' }
    },
  },
})
