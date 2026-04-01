import { client } from '../../lib/sanity'
import { onlineCoursesQuery, corpTrainingsQuery, bimProjectsQuery, designServicesQuery } from '../../lib/queries'
import ServicesContent from './ServicesContent'

export const metadata = {
  title: 'Dịch vụ',
  description: 'Dịch vụ đào tạo BIM, mô hình BIM, thiết kế BIM và số hóa quản lý — ứng dụng Revit, Civil 3D, Dynamo và Digital Twin cho hạ tầng giao thông.',
  openGraph: {
    title: 'Dịch vụ',
    description: 'Dịch vụ đào tạo BIM, mô hình BIM, thiết kế BIM và số hóa quản lý — ứng dụng Revit, Civil 3D, Dynamo và Digital Twin cho hạ tầng giao thông.',
    url: 'https://tuanhq.com/services',
    type: 'website',
    images: [{ url: 'https://tuanhq.com/assets/anh_dai_dien.jpg' }],
  },
}

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
