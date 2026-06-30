import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { PerformanceMonitor } from '@/components/PerformanceMonitor';
import { OrganizationSchema } from '@/components/StructuredData';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Bosker - Discover & Book Beauty Services',
    template: '%s | Bosker',
  },
  description: 'Connect with professional beauty technicians. Find nail care, hair styling, makeup, skincare, and more services near you. Trusted by 50K+ customers.',
  keywords: [
    'beauty services',
    'nail care',
    'hair styling',
    'makeup',
    'skincare',
    'waxing',
    'massage',
    'book services',
    'find technician',
  ],
  authors: [{ name: 'Bosker Team' }],
  creator: 'Bosker Inc',
  publisher: 'Bosker Inc',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bosker.app',
    siteName: 'Bosker',
    title: 'Bosker - Discover & Book Beauty Services',
    description: 'Connect with professional beauty technicians',
    images: [
      {
        url: 'https://bosker.app/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Bosker - Beauty Services Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Bosker - Book Beauty Services',
    description: 'Discover professional beauty technicians near you',
    creator: '@bosker',
    images: ['https://bosker.app/twitter-image.jpg'],
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
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Bosker',
  },
  formatDetection: {
    telephone: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <OrganizationSchema />
      </head>
      <body>
        <Providers>
          <PerformanceMonitor />
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
