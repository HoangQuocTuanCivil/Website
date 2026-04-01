export const siteSettingsQuery = `*[_type == "siteSettings"][0]`

export const homePageQuery = `*[_type == "homePage"][0]{
  heroTitle, heroSubtitle, heroCta, heroCtaLink, heroSlides,
  featuredServicesTitle, featuredServices,
  featuredProjectsTitle,
  featuredProjects[]->{ _id, title, description, category, image, badge, badgeColor, tags },
  stats
}`

export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  avatar, name, jobTitle, heroBadge, heroTitle, heroDescription, heroStats,
  careerTimeline, education, skillCategories
}`

export const onlineCoursesQuery = `*[_type == "onlineCourse"] | order(order asc)`

export const corpTrainingsQuery = `*[_type == "corpTraining"] | order(order asc)`

export const bimProjectsQuery = `*[_type == "bimProject"] | order(order asc)`

export const designServicesQuery = `*[_type == "designService"] | order(order asc)`

export const projectsQuery = `*[_type == "project"] | order(order asc)`
