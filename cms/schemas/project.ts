import { defineType, defineField } from 'sanity'

export const project = defineType({
  name: 'project',
  title: 'Dự án Portfolio',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Tên dự án',
      type: 'localizedString',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Mô tả',
      type: 'localizedText',
    }),
    defineField({
      name: 'category',
      title: 'Danh mục',
      type: 'string',
      options: {
        list: [
          { title: 'BIM Modeling', value: 'bim' },
          { title: 'Đào tạo Doanh nghiệp', value: 'train' },
        ],
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Hình ảnh',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'badge',
      title: 'Badge / Nhãn',
      type: 'localizedString',
    }),
    defineField({
      name: 'badgeColor',
      title: 'Màu badge',
      type: 'string',
      options: {
        list: [
          { title: 'Đỏ (mặc định)', value: 'red' },
          { title: 'Xanh lá', value: 'green' },
          { title: 'Xanh dương', value: 'blue' },
        ],
      },
      initialValue: 'red',
    }),
    defineField({
      name: 'categoryLabel',
      title: 'Nhãn danh mục hiển thị',
      type: 'localizedString',
    }),
    defineField({
      name: 'categoryLabelColor',
      title: 'Màu nhãn danh mục',
      type: 'string',
      options: {
        list: [
          { title: 'Đỏ (mặc định)', value: 'red' },
          { title: 'Xanh lá', value: 'green' },
        ],
      },
      initialValue: 'red',
    }),
    defineField({
      name: 'tags',
      title: 'Công nghệ sử dụng',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'isWide',
      title: 'Hiển thị rộng (2 cột)',
      type: 'boolean',
      initialValue: false,
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
    select: { title: 'title.vi', subtitle: 'category', media: 'image' },
  },
})
