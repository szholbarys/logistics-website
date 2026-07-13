import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Amanat Logistic — Доставка сыпучих материалов в Алматы',
  description:
    'Профессиональная доставка инертных материалов: песок, щебень, гравий, ПГС, ПЩС. Вывоз грунтов и строительного мусора. Автопарк HOWO, Mercedes, Shacman 20–40 тонн. Алматы и регион.',
  keywords: ['доставка щебень', 'доставка песок', 'вывоз мусора', 'инертные материалы', 'Алматы', 'самосвал'],
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#0e0e18',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ru" className={`${inter.variable} bg-background`}>
      <body className="antialiased font-sans">{children}</body>
    </html>
  )
}
