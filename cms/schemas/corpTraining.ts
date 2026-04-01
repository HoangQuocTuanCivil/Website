import { defineType, defineField } from 'sanity'

export const corpTraining = defineType({
  name: 'corpTraining',
  title: 'Đào tạo BIM Doanh nghiệp',
  type: 'document',
  fields: [
    // ---- HERO ----
    defineField({
      name: 'title',
      title: 'Tên chương trình',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Phụ đề',
      type: 'localizedText',
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroImage',
      title: 'Ảnh Hero',
      type: 'image',
      options: { hotspot: true },
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
            { name: 'number', type: 'string', title: 'Số liệu (vd: 16+)' },
            { name: 'label', type: 'localizedString', title: 'Nhãn' },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label.vi' },
          },
        },
      ],
    }),

    // ---- TARGET AUDIENCE ----
    defineField({
      name: 'targetAudience',
      title: 'Đối tượng tham gia',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon (emoji)' },
            { name: 'title', type: 'localizedString', title: 'Tiêu đề' },
          ],
          preview: {
            select: { title: 'title.vi', subtitle: 'icon' },
          },
        },
      ],
    }),

    // ---- LEARNING OUTCOMES ----
    defineField({
      name: 'outcomes',
      title: 'Kết quả sau khóa học',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'icon', type: 'string', title: 'Icon (emoji)' },
            { name: 'text', type: 'localizedString', title: 'Nội dung' },
          ],
          preview: {
            select: { title: 'text.vi', subtitle: 'icon' },
          },
        },
      ],
    }),

    // ---- MODULES ----
    defineField({
      name: 'modules',
      title: 'Nội dung chương trình',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'trainingModule',
          title: 'Module',
          fields: [
            { name: 'moduleNumber', type: 'localizedString', title: 'Số module (vd: Phần 01 — Family Modeling)' },
            { name: 'title', type: 'localizedString', title: 'Tên module' },
            { name: 'image', type: 'image', title: 'Hình ảnh', options: { hotspot: true } },
            {
              name: 'items',
              type: 'array',
              title: 'Các mục nội dung',
              of: [{ type: 'localizedString' }],
            },
          ],
          preview: {
            select: { title: 'title.vi', subtitle: 'moduleNumber.vi', media: 'image' },
          },
        },
      ],
    }),

    // ---- CTA ----
    defineField({
      name: 'ctaTitle',
      title: 'CTA Tiêu đề',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaDescription',
      title: 'CTA Mô tả',
      type: 'localizedText',
    }),
    defineField({
      name: 'ctaPhone',
      title: 'Số điện thoại CTA',
      type: 'string',
    }),
    defineField({
      name: 'ctaEmail',
      title: 'Email CTA',
      type: 'string',
    }),

    defineField({
      name: 'order',
      title: 'Thứ tự hiển thị',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    { title: 'Thứ tự', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] },
  ],
  preview: {
    select: { title: 'title.vi' },
  },
})
