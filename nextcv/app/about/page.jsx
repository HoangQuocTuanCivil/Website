import { client } from '../../lib/sanity'
import { aboutPageQuery } from '../../lib/queries'
import AboutContent from './AboutContent'

export default async function AboutPage() {
  let data = null
  try {
    data = await client.fetch(aboutPageQuery)
  } catch (err) {
    console.error('Failed to fetch about page data:', err)
  }

  return <AboutContent data={data} />
}
