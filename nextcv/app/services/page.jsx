import { client } from '../../lib/sanity'
import { onlineCoursesQuery, corpTrainingsQuery, bimProjectsQuery, designServicesQuery } from '../../lib/queries'
import ServicesContent from './ServicesContent'

export default async function ServicesPage() {
  const [courses, trainings, bimProjects, designServices] = await Promise.all([
    client.fetch(onlineCoursesQuery).catch(() => []),
    client.fetch(corpTrainingsQuery).catch(() => []),
    client.fetch(bimProjectsQuery).catch(() => []),
    client.fetch(designServicesQuery).catch(() => []),
  ])

  return (
    <ServicesContent
      courses={courses || []}
      trainings={trainings || []}
      bimProjects={bimProjects || []}
      designServices={designServices || []}
    />
  )
}
