import { client } from '../lib/sanity'
import { homePageQuery } from '../lib/queries'
import HomeContent from './HomeContent'

export default async function HomePage() {
  let data = null
  try {
    data = await client.fetch(homePageQuery)
  } catch (err) {
    console.error('Failed to fetch home page data:', err)
  }

  return <HomeContent data={data} />
}
