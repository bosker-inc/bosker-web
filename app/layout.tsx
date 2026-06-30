import type { Metadata } from 'next';
import { Providers } from './providers';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Bosker - Discover & Book Beauty Services',
    template: '%s | Bosker',
  },
  description: 'Connect with professional beauty technicians. Find nail care, hair styling, makeup, skincare, and more services near you.',
  keywords: ['beauty services', 'nail care', 'hair styling', 'makeup', 'skincare'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://bosker.app',
    siteName: 'Bosker',
  },
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <Providers>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
