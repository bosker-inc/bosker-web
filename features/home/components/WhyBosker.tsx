import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { SectionHeading } from '@/components/SectionHeading';

const FEATURES = [
  {
    icon: '🔍',
    title: 'Easy Discovery',
    description: 'Find professionals by service, rating, location, and price',
  },
  {
    icon: '⭐',
    title: 'Verified Reviews',
    description: 'Real reviews from real customers - build trust instantly',
  },
  {
    icon: '💰',
    title: 'Transparent Pricing',
    description: 'Clear pricing upfront - no hidden fees or surprises',
  },
  {
    icon: '🛡️',
    title: 'Safety First',
    description: 'All professionals verified, insured, and background checked',
  },
  {
    icon: '📱',
    title: 'Book Anytime',
    description: 'Schedule appointments 24/7 from your mobile or desktop',
  },
  {
    icon: '🎯',
    title: 'Guaranteed Quality',
    description: 'If you are not satisfied, we will make it right',
  },
];

export function WhyBosker() {
  return (
    <section className="relative overflow-hidden bg-bg bg-radial-glow py-20 md:py-32">
      <div className="container">
        <Reveal className="mb-16">
          <SectionHeading
            eyebrow="Why Bosker"
            title="Why Choose Bosker?"
            subtitle="We have made it simple, safe, and enjoyable to book beauty services"
          />
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <StaggerItem key={idx} className="space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-accent/15 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-fg">
                {feature.title}
              </h3>
              <p className="text-muted">{feature.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
