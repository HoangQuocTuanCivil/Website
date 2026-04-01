import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'Trang Giới thiệu',
  type: 'document',
  fields: [
    // ---- HERO ----
    defineField({
      name: 'avatar',
      title: 'Ảnh đại diện',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'name',
      title: 'Họ tên',
      type: 'string',
      initialValue: 'HOÀNG QUỐC TUẤN',
    }),
    defineField({
      name: 'jobTitle',
      title: 'Chức danh',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroBadge',
      title: 'Badge Hero',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Tiêu đề Hero',
      type: 'localizedString',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Mô tả Hero',
      type: 'localizedText',
    }),
    defineField({
      name: 'heroStats',
      title: 'Thống kê Hero',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'number', type: 'string', title: 'Số liệu' },
            { name: 'label', type: 'localizedString', title: 'Nhãn' },
          ],
          preview: {
            select: { title: 'number', subtitle: 'label.vi' },
          },
        },
      ],
    }),

    // ---- CAREER TIMELINE ----
    defineField({
      name: 'careerTimeline',
      title: 'Hành trình Sự nghiệp',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'careerItem',
          title: 'Vị trí công tác',
          fields: [
            { name: 'date', type: 'localizedString', title: 'Thời gian' },
            { name: 'role', type: 'localizedString', title: 'Chức vụ' },
            { name: 'company', type: 'localizedString', title: 'Công ty' },
            { name: 'description', type: 'localizedText', title: 'Mô tả' },
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
            select: { title: 'role.vi', subtitle: 'company.vi' },
          },
        },
      ],
    }),

    // ---- EDUCATION ----
    defineField({
      name: 'education',
      title: 'Học vấn',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'educationItem',
          title: 'Bằng cấp / Chứng chỉ',
          fields: [
            { name: 'degree', type: 'localizedString', title: 'Bằng cấp' },
            { name: 'major', type: 'localizedString', title: 'Chuyên ngành' },
            { name: 'school', type: 'localizedString', title: 'Trường / Tổ chức' },
            { name: 'description', type: 'localizedText', title: 'Mô tả' },
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
              initialValue: 'green',
            },
          ],
          preview: {
            select: { title: 'major.vi', subtitle: 'school.vi' },
          },
        },
      ],
    }),

    // ---- SKILLS ----
    defineField({
      name: 'skillCategories',
      title: 'Danh mục Kỹ năng',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'skillCategory',
          title: 'Nhóm kỹ năng',
          fields: [
            { name: 'categoryName', type: 'localizedString', title: 'Tên nhóm' },
            {
              name: 'skills',
              type: 'array',
              title: 'Các kỹ năng',
              of: [{ type: 'string' }],
              options: { layout: 'tags' },
            },
          ],
          preview: {
            select: { title: 'categoryName.vi' },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Trang Giới thiệu' }
    },
  },
})
