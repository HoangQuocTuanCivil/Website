export const metadata = {
  title: 'BIM Innovator CMS',
  description: 'Content Management System for BIM Innovator',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi">
      <body>{children}</body>
    </html>
  )
}
