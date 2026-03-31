import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export const metadata = {
  title: "Hoang Quoc Tuan | BIM Innovator",
  description: "Chuyên gia giải pháp BIM & Digital Twin tại Việt Nam",
  openGraph: {
    title: "Hoang Quoc Tuan | BIM Innovator",
    description: "Chuyên gia giải pháp BIM & Digital Twin tại Việt Nam",
    url: "https://hoangquoctuan.com",
    type: "website",
    images: [{ url: "https://hoangquoctuan.com/assets/anh_dai_dien.jpg" }]
  },
  twitter: {
    card: "summary_large_image"
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="vi">
      <head>
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@300;400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&family=Noto+Sans+SC:wght@300;400;500;700&family=Orbitron:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
        <link rel="stylesheet" href="/styles/variables.css" />
        <link rel="stylesheet" href="/styles/main.css" />
        <link rel="stylesheet" href="/styles/animations.css" />
        <link rel="stylesheet" href="/styles/hero.css" />
        <script src="/js/data/locales.js" defer></script>
        <script src="/js/i18n.js" defer></script>
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
        <script src="/js/main.js" defer></script>
      </body>
    </html>
  );
}
