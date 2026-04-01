import { defineType, defineField } from 'sanity'

export const designService = defineType({
  name: 'designService',
  title: 'Dịch vụ Thiết kế BIM',
  type: 'document',
  fields: [
    defineField({
      name: 'itemType',
      title: 'Loại mục',
      type: 'string',
      options: {
        list: [
          { title: 'Năng lực (Capability)', value: 'capability' },
          { title: 'Công trình (Work)', value: 'work' },
          { title: 'Quy trình (Workflow)', value: 'workflow' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Tiêu đề',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'localizedText',
    }),
    defineField({
      name: 'image',
      title: 'Hình ảnh',
      type: 'image',
      options: { hotspot: true },
      description: 'Dùng cho loại Work',
    }),
    defineField({
      name: 'icon',
      title: 'Icon (SVG hoặc emoji)',
      type: 'string',
      description: 'Dùng cho loại Capability',
    }),
    defineField({
      name: 'stepNumber',
      title: 'Số bước (cho Workflow)',
      type: 'number',
      description: 'Dùng cho loại Workflow',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
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
    select: { title: 'title.vi', subtitle: 'itemType', media: 'image' },
  },
})
