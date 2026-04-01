import { client } from '../../lib/sanity'
import { projectsQuery } from '../../lib/queries'
import ProjectsContent from './ProjectsContent'

export const metadata = {
  title: 'Dự án',
  description: 'Danh mục dự án BIM thực tế đã triển khai — từ cầu đường cao tốc, nút giao phức tạp đến đào tạo BIM doanh nghiệp.',
  openGraph: {
    title: 'Dự án',
    description: 'Danh mục dự án BIM thực tế đã triển khai — từ cầu đường cao tốc, nút giao phức tạp đến đào tạo BIM doanh nghiệp.',
    url: 'https://tuanhq.com/projects',
    type: 'website',
    images: [{ url: 'https://tuanhq.com/assets/anh_dai_dien.jpg' }],
  },
}

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery).catch(() => [])

  return <ProjectsContent projects={projects || []} />
}
