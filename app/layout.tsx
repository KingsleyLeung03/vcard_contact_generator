import './global.scss'
import type { Metadata } from 'next'
import { GeistSans } from 'geist/font/sans'
import { GeistMono } from 'geist/font/mono'
// import { Navbar } from './components/nav'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Footer from './components/footer'
import { baseUrl } from './sitemap'

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: 'vCard Contact Generator',
    template: '%s | vCard Contact Generator',
  },
  description: 'Generate random vCard contacts, made by Kingsley Leung.',
  openGraph: {
    title: 'vCard Contact Generator',
    description: 'Generate random vCard contacts, made by Kingsley Leung.',
    url: baseUrl,
    siteName: 'vCard Contact Generator',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'vCard Contact Generator',
    description: 'Generate random vCard contacts, made by Kingsley Leung.',
    // siteId: 'your_twitter_site_id', // To be added later
    creator: '@KingsleyLeung03',
    creatorId: '723487452988465152',
    // images: ['/og-image.jpg'], // To be added later
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

const cx = (...classes) => classes.filter(Boolean).join(' ')

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={cx(
        'text-black bg-white dark:text-white dark:bg-black',
        GeistSans.variable,
        GeistMono.variable
      )}
    >
      <body className="antialiased max-w-xl mx-auto px-4 mt-8">
        <main className="flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0">
          {/* <Navbar /> */}
          {children}
          <Footer />
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  )
}
