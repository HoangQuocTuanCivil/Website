import { client } from '../../lib/sanity'
import { projectsQuery } from '../../lib/queries'
import ProjectsContent from './ProjectsContent'

export default async function ProjectsPage() {
  const projects = await client.fetch(projectsQuery).catch(() => [])

  return <ProjectsContent projects={projects || []} />
}
