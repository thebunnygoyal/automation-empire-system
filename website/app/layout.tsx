import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Automation Empire - Build Unstoppable Automated Businesses',
  description: 'Transform your business with intelligent automation that scales infinitely, generates revenue 24/7, and creates unstoppable competitive advantages.',
  keywords: 'automation, n8n, workflow, business automation, ai automation, process automation',
  authors: [{ name: 'The Automation Imperator' }],
  openGraph: {
    title: 'Automation Empire',
    description: 'Build Unstoppable Automated Businesses',
    url: 'https://automation-empire.com',
    siteName: 'Automation Empire',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Automation Empire',
    description: 'Build Unstoppable Automated Businesses',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-gray-950 text-white`}>
        {children}
      </body>
    </html>
  )
}