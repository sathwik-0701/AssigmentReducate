import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'JG University — Knowledge Beyond Boundaries',
  description:
    'JG University is a new-age tech-driven university in Ahmedabad offering UG, PG, Doctoral and Certificate programmes in Management, Commerce, Technology, Law, and Science.',
  keywords: 'JG University, MBA Ahmedabad, BBA, BCA, MCA, B.Tech, university Gujarat',
  openGraph: {
    title: 'JG University — Knowledge Beyond Boundaries',
    description: 'Empowering the next generation of global leaders through innovation and excellence.',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
