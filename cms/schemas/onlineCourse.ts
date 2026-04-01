import { defineType, defineField } from 'sanity'

export const onlineCourse = defineType({
  name: 'onlineCourse',
  title: 'Khóa học BIM Online',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên khóa học',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Phụ đề',
      type: 'localizedText',
    }),
    defineField({
      name: 'icon',
      title: 'Icon khóa học (emoji)',
      type: 'string',
      initialValue: '🌉',
    }),
    defineField({
      name: 'metaInfo',
      title: 'Thông tin tổng quan',
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
    defineField({
      name: 'lessons',
      title: 'Danh sách Bài học',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'lesson',
          title: 'Bài học',
          fields: [
            { name: 'number', type: 'string', title: 'Số bài (vd: 01)' },
            { name: 'title', type: 'localizedString', title: 'Tên bài học' },
            {
              name: 'tags',
              type: 'array',
              title: 'Tags',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'label', type: 'localizedString', title: 'Nhãn (Video/File/Bài viết...)' },
                    {
                      name: 'type',
                      type: 'string',
                      title: 'Loại',
                      options: {
                        list: [
                          { title: 'Video', value: 'video' },
                          { title: 'File thực hành', value: 'file' },
                          { title: 'Bài viết', value: 'article' },
                        ],
                      },
                    },
                  ],
                  preview: {
                    select: { title: 'label.vi' },
                  },
                },
              ],
            },
          ],
          preview: {
            select: { title: 'title.vi', subtitle: 'number' },
            prepare({ title, subtitle }) {
              return { title: `Bài ${subtitle}: ${title || ''}` }
            },
          },
        },
      ],
    }),
    defineField({
      name: 'ctaTitle',
      title: 'CTA Tiêu đề',
      type: 'localizedString',
    }),
    defineField({
      name: 'ctaSubtitle',
      title: 'CTA Phụ đề',
      type: 'localizedString',
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
