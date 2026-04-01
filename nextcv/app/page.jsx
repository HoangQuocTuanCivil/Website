import { client } from '../lib/sanity'
import { homePageQuery } from '../lib/queries'
import HomeContent from './HomeContent'

export const metadata = {
  title: 'BIM Innovator',
  description: 'Chuyên gia giải pháp BIM & Digital Twin — Cung cấp dịch vụ mô hình BIM, thiết kế BIM, đào tạo BIM và số hóa quản lý cho hạ tầng giao thông tại Việt Nam.',
  openGraph: {
    title: 'BIM Innovator',
    description: 'Chuyên gia giải pháp BIM & Digital Twin — Cung cấp dịch vụ mô hình BIM, thiết kế BIM, đào tạo BIM và số hóa quản lý cho hạ tầng giao thông tại Việt Nam.',
    url: 'https://tuanhq.com',
    type: 'website',
    images: [{ url: 'https://tuanhq.com/assets/anh_dai_dien.jpg' }],
  },
}

export default async function HomePage() {
  let data = null
  try {
    data = await client.fetch(homePageQuery)
  } catch (err) {
    console.error('Failed to fetch home page data:', err)
  }

  return <HomeContent data={data} />
}
