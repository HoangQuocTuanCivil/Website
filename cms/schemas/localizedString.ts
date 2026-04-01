import { defineType } from 'sanity'

export const localizedString = defineType({
  name: 'localizedString',
  title: 'Localized String',
  type: 'object',
  fields: [
    { name: 'vi', type: 'string', title: 'Tiếng Việt' },
    { name: 'en', type: 'string', title: 'English' },
    { name: 'zh', type: 'string', title: '中文' },
    { name: 'ja', type: 'string', title: '日本語' },
  ],
})

export const localizedText = defineType({
  name: 'localizedText',
  title: 'Localized Text',
  type: 'object',
  fields: [
    { name: 'vi', type: 'text', title: 'Tiếng Việt', rows: 3 },
    { name: 'en', type: 'text', title: 'English', rows: 3 },
    { name: 'zh', type: 'text', title: '中文', rows: 3 },
    { name: 'ja', type: 'text', title: '日本語', rows: 3 },
  ],
})
