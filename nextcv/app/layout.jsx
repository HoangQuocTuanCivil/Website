import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import BgTechIcons from '../components/BgTechIcons'
import ClientProviders from '../components/ClientProviders'

export const metadata = {
  title: 'BIM Innovator | Hoàng Quốc Tuấn',
  description: 'Chuyên gia giải pháp BIM & Digital Twin tại Việt Nam',
  openGraph: {
    title: 'BIM Innovator | Hoàng Quốc Tuấn',
    description: 'Chuyên gia giải pháp BIM & Digital Twin tại Việt Nam',
    url: 'https://tuanhq.com',
    type: 'website',
    images: [{ url: 'https://tuanhq.com/assets/anh_dai_dien.jpg' }],
  },
  twitter: { card: 'summary_large_image' },
}

export default function RootLayout({ children }) {
  return (
    <html lang="vi" suppressHydrationWarning>
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link
          href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/styles/variables.css" />
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/styles/animations.css" />
        <link rel="stylesheet" href="/styles/hero.css" />
        <link rel="stylesheet" href="/styles/bg-icons.css" />
        <link rel="stylesheet" href="/styles/about.css" />
      </head>
      <body suppressHydrationWarning>
        <ClientProviders>
          <BgTechIcons />
          <Navbar />
          {children}
          <Footer />
        </ClientProviders>
      </body>
    </html>
  )
}
