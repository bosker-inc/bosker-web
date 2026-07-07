import { Metadata } from 'next';
import { Card, CardBody } from '@/components/Card';
import { MotionImage } from '@/components/motion/MotionImage';
import { Reveal } from '@/components/motion/Reveal';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { CountUp } from '@/components/motion/CountUp';
import { ABOUT_HERO } from '@/lib/images';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Bosker and our mission to connect beauty professionals with customers',
};

const VALUES = [
  {
    title: 'Quality First',
    desc: 'We only work with verified, professional technicians',
  },
  {
    title: 'Transparency',
    desc: 'Clear pricing and honest reviews from real customers',
  },
  {
    title: 'Accessibility',
    desc: 'Making beauty services available to everyone',
  },
];

const STATS = [
  { number: '50K+', label: 'Happy Customers' },
  { number: '1K+', label: 'Professionals' },
  { number: '100K+', label: 'Bookings' },
  { number: '4.9/5', label: 'Average Rating' },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-2 bg-mesh py-16 md:py-20">
        <div className="container">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal className="max-w-xl">
              <h1 className="h1 text-fg mb-4">
                About Bosker
              </h1>
              <p className="text-xl text-muted">
                Empowering beauty professionals and delighting customers through
                seamless connections
              </p>
            </Reveal>

            <ScrollReveal delay={0.15} direction="up" zoom>
              <MotionImage
                src={ABOUT_HERO}
                alt="The Bosker team collaborating in a bright studio"
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="relative aspect-[16/10] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5"
                imageClassName="object-cover"
                hoverTilt
                shineEffect
                zoomScale={1.05}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container max-w-3xl space-y-12">
          <Reveal>
            <h2 className="h1 text-fg mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              To make beauty services accessible, affordable, and trustworthy by
              creating a platform where talented professionals and satisfied
              customers can connect easily and securely.
            </p>
          </Reveal>

          <div>
            <Reveal>
              <h2 className="h1 text-fg mb-4">
                Our Values
              </h2>
            </Reveal>
            <StaggerGroup className="grid md:grid-cols-3 gap-6">
              {VALUES.map((value, i) => (
                <StaggerItem key={i}>
                  <Card hoverable className="h-full">
                    <CardBody>
                      <h3 className="text-lg font-semibold text-fg mb-2">
                        {value.title}
                      </h3>
                      <p className="text-muted">{value.desc}</p>
                    </CardBody>
                  </Card>
                </StaggerItem>
              ))}
            </StaggerGroup>
          </div>

          <Reveal>
            <h2 className="h1 text-fg mb-4">
              Our Story
            </h2>
            <p className="text-lg text-muted leading-relaxed">
              Founded in 2024, Bosker was created to solve a real problem:
              finding a trusted beauty professional is difficult, time-consuming,
              and unreliable. We believed there had to be a better way. Today, we
              connect thousands of customers with talented beauty professionals
              every month.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-surface-2 py-16">
        <div className="container">
          <StaggerGroup className="grid md:grid-cols-4 gap-8 text-center">
            {STATS.map((stat, i) => (
              <StaggerItem key={i}>
                <div className="h1 text-accent mb-2">
                  <CountUp value={stat.number} />
                </div>
                <div className="text-muted">{stat.label}</div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
