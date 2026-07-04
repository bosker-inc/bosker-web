import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

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
    <section className="bg-neutral-50 py-20 md:py-32">
      <div className="container">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Why Choose Bosker?
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            We have made it simple, safe, and enjoyable to book beauty services
          </p>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feature, idx) => (
            <StaggerItem key={idx} className="space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-100 text-3xl">
                {feature.icon}
              </div>
              <h3 className="text-lg font-semibold text-neutral-900">
                {feature.title}
              </h3>
              <p className="text-neutral-600">{feature.description}</p>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
