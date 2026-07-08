import { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { PortfolioGallery } from '@/features/portfolio/components/PortfolioGallery';

export const metadata: Metadata = {
  title: 'Portfolio',
  description:
    'Browse real results from Bosker professionals — hair, nails, makeup, skincare and lashes. See the before and after of every transformation.',
  openGraph: {
    title: 'Portfolio — Real Results from Bosker Professionals',
    description: 'A showcase of beautiful beauty-service outcomes.',
  },
};

export default function PortfolioPage() {
  return (
    <main>
      <section className="relative overflow-hidden bg-surface-2 bg-mesh py-16 md:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Portfolio"
            title="Real results, real transformations"
            subtitle="Explore a showcase of work from our top professionals. Hover any result to peek at the before, or open it for a closer look."
          />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container">
          <PortfolioGallery />
        </div>
      </section>
    </main>
  );
}
