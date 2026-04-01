import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'
import { deskStructure } from './deskStructure'

export default defineConfig({
  name: 'bim-innovator-cms',
  title: 'BIM Innovator CMS',

  projectId: 'wd53xh69',
  dataset: 'production',
  basePath: '/studio',

  plugins: [
    structureTool({
      structure: deskStructure,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
