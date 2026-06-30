import { Metadata } from 'next';
import { HeroSection } from '@/features/home/components/HeroSection';
import { ServiceCategories } from '@/features/home/components/ServiceCategories';
import { FeaturedTechnicians } from '@/features/home/components/FeaturedTechnicians';
import { WhyBosker } from '@/features/home/components/WhyBosker';
import { Testimonials } from '@/features/home/components/Testimonials';
import { AppPromotion } from '@/features/home/components/AppPromotion';
import { BreadcrumbSchema, LocalBusinessSchema } from '@/components/StructuredData';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Discover and book professional beauty services from certified technicians. 50K+ happy customers, 1000+ professionals, 4.9/5 rating.',
  openGraph: {
    title: 'Bosker - Book Beauty Services Online',
    description: 'Find and book professional beauty services near you',
    images: [
      {
        url: 'https://bosker.app/og-home.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
};

export default function HomePage() {
  return (
    <>
      <LocalBusinessSchema />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://bosker.app' },
        ]}
      />
      <HeroSection />
      <ServiceCategories />
      <FeaturedTechnicians />
      <WhyBosker />
      <Testimonials />
      <AppPromotion />
    </>
  );
}
