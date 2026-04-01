import { client } from '../../lib/sanity'
import { aboutPageQuery } from '../../lib/queries'
import AboutContent from './AboutContent'

export const metadata = {
  title: 'Về tôi',
  description: 'Phó Tổng Giám đốc Công nghệ (CTO) — Hơn 8 năm kinh nghiệm ứng dụng BIM, Digital Twin và tự động hóa quy trình cho hạ tầng giao thông quy mô lớn tại Việt Nam.',
  openGraph: {
    title: 'Về tôi',
    description: 'Phó Tổng Giám đốc Công nghệ (CTO) — Hơn 8 năm kinh nghiệm ứng dụng BIM, Digital Twin và tự động hóa quy trình cho hạ tầng giao thông quy mô lớn tại Việt Nam.',
    url: 'https://tuanhq.com/about',
    type: 'profile',
    images: [{ url: 'https://tuanhq.com/assets/anh_dai_dien.jpg' }],
  },
}

export default async function AboutPage() {
  let data = null
  try {
    data = await client.fetch(aboutPageQuery)
  } catch (err) {
    console.error('Failed to fetch about page data:', err)
  }

  return <AboutContent data={data} />
}
