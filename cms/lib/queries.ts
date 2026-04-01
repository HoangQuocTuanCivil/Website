// =============================================
// GROQ Queries — BIM Innovator CMS
// =============================================

// ---- Site Settings (singleton) ----
export const siteSettingsQuery = `*[_type == "siteSettings"][0]{
  siteTitle,
  siteSubtitle,
  seoDescription,
  ogImage,
  logo,
  contactEmail,
  contactPhone,
  address,
  socialLinks,
  footerText
}`

// ---- Home Page (singleton) ----
export const homePageQuery = `*[_type == "homePage"][0]{
  heroTitle,
  heroSubtitle,
  heroCta,
  heroCtaLink,
  heroSlides,
  featuredServicesTitle,
  featuredServices,
  featuredProjectsTitle,
  featuredProjects[]->{
    _id,
    title,
    description,
    category,
    image,
    badge,
    badgeColor,
    categoryLabel,
    categoryLabelColor,
    tags
  },
  stats
}`

// ---- About Page (singleton) ----
export const aboutPageQuery = `*[_type == "aboutPage"][0]{
  avatar,
  name,
  jobTitle,
  heroBadge,
  heroTitle,
  heroDescription,
  heroStats,
  careerTimeline,
  education,
  skillCategories
}`

// ---- Online Courses ----
export const onlineCoursesQuery = `*[_type == "onlineCourse"] | order(order asc){
  _id,
  title,
  subtitle,
  icon,
  metaInfo,
  lessons,
  ctaTitle,
  ctaSubtitle,
  ctaPhone,
  ctaEmail
}`

// ---- Corporate Training ----
export const corpTrainingsQuery = `*[_type == "corpTraining"] | order(order asc){
  _id,
  title,
  subtitle,
  badge,
  heroImage,
  stats,
  targetAudience,
  outcomes,
  modules,
  ctaTitle,
  ctaDescription,
  ctaPhone,
  ctaEmail
}`

// ---- BIM Projects (Services tab) ----
export const bimProjectsQuery = `*[_type == "bimProject"] | order(order asc){
  _id,
  title,
  description,
  image,
  badge,
  badgeColor,
  tags,
  isWide
}`

// ---- Design Services (Services tab) ----
export const designServicesQuery = `*[_type == "designService"] | order(order asc){
  _id,
  itemType,
  title,
  description,
  image,
  icon,
  stepNumber,
  tags
}`

// ---- Portfolio Projects ----
export const projectsQuery = `*[_type == "project"] | order(order asc){
  _id,
  title,
  description,
  category,
  image,
  badge,
  badgeColor,
  categoryLabel,
  categoryLabelColor,
  tags,
  isWide
}`

export const projectsByCategoryQuery = `*[_type == "project" && category == $category] | order(order asc){
  _id,
  title,
  description,
  category,
  image,
  badge,
  badgeColor,
  categoryLabel,
  categoryLabelColor,
  tags,
  isWide
}`
