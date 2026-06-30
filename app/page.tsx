import { Metadata } from 'next';
import { HeroSection } from '@/features/home/components/HeroSection';
import { ServiceCategories } from '@/features/home/components/ServiceCategories';
import { FeaturedTechnicians } from '@/features/home/components/FeaturedTechnicians';
import { WhyBosker } from '@/features/home/components/WhyBosker';
import { Testimonials } from '@/features/home/components/Testimonials';
import { AppPromotion } from '@/features/home/components/AppPromotion';

export const metadata: Metadata = {
  title: 'Home',
  description: 'Discover and book professional beauty services from certified technicians. Easy booking, transparent pricing, verified reviews.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServiceCategories />
      <FeaturedTechnicians />
      <WhyBosker />
      <Testimonials />
      <AppPromotion />
    </>
  );
}
