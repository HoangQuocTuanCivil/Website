import { localizedString, localizedText } from './localizedString'
import { bimProject } from './bimProject'
import { designService } from './designService'
import { project } from './project'
import { siteSettings } from './siteSettings'
import { homePage } from './homePage'
import { aboutPage } from './aboutPage'
import { onlineCourse } from './onlineCourse'
import { corpTraining } from './corpTraining'

export const schemaTypes = [
  // Types
  localizedString,
  localizedText,
  // Singleton pages
  siteSettings,
  homePage,
  aboutPage,
  // Document collections
  onlineCourse,
  corpTraining,
  bimProject,
  designService,
  project,
]
