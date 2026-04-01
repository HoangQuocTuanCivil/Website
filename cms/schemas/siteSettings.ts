import { defineType, defineField } from 'sanity'

export const siteSettings = defineType({
  name: 'siteSettings',
  title: 'Cài đặt Website',
  type: 'document',
  fields: [
    defineField({
      name: 'siteTitle',
      title: 'Tên website',
      type: 'string',
      initialValue: 'BIM Innovator',
    }),
    defineField({
      name: 'siteSubtitle',
      title: 'Phụ đề',
      type: 'localizedString',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Mô tả SEO',
      type: 'localizedText',
    }),
    defineField({
      name: 'ogImage',
      title: 'Ảnh Open Graph (SEO)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
    }),
    defineField({
      name: 'contactEmail',
      title: 'Email liên hệ',
      type: 'string',
    }),
    defineField({
      name: 'contactPhone',
      title: 'Số điện thoại',
      type: 'string',
    }),
    defineField({
      name: 'address',
      title: 'Địa chỉ',
      type: 'localizedText',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Mạng xã hội',
      type: 'object',
      fields: [
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'linkedin', type: 'url', title: 'LinkedIn' },
        { name: 'youtube', type: 'url', title: 'YouTube' },
        { name: 'github', type: 'url', title: 'GitHub' },
        { name: 'zalo', type: 'string', title: 'Zalo' },
      ],
    }),
    defineField({
      name: 'footerText',
      title: 'Văn bản Footer',
      type: 'localizedString',
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Cài đặt Website' }
    },
  },
})
