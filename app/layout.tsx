import '../src/app/globals.css'
import { Inter } from 'next/font/google'
import Script from 'next/script'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Moe Balloons Event - Premium Balloon Decorations & Event Planning',
  description: 'Transform your special events with stunning balloon decorations. Professional balloon arches, centerpieces, and custom designs for weddings, birthdays, corporate events, and more.',
  keywords: 'balloon decorations, event planning, balloon arches, wedding decorations, birthday parties, corporate events, balloon artist',
  openGraph: {
    title: 'Moe Balloons Event - Premium Balloon Decorations',
    description: 'Professional balloon decorations and event planning services',
    images: ['/og-image.jpg'],
  },
}

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Moe Balloons Event",
    "description": "Professional balloon decorations and event planning services",
    "url": "https://moeballoonsevent.com",
    "telephone": "+1-555-123-4567",
    "email": "hello@moeballoonsevent.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Metro Area",
      "addressCountry": "US"
    },
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "40.7128",
        "longitude": "-74.0060"
      },
      "geoRadius": "50000"
    },
    "priceRange": "$$",
    "openingHours": "Mo-Su 09:00-18:00"
  }

  return (
    <html lang="en">
      <head>
        <Script
          id="structured-data"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData),
          }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  )
}