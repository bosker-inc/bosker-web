import { Metadata } from 'next';
import { Card, CardBody } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { MotionImage } from '@/components/motion/MotionImage';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { getServiceImage, SERVICES_HERO } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Browse all available beauty services and find professionals in your area',
};

const SERVICES = [
  { id: '1', name: 'Hair Styling', count: 342 },
  { id: '2', name: 'Nail Care', count: 289 },
  { id: '3', name: 'Makeup', count: 156 },
  { id: '4', name: 'Skincare', count: 201 },
  { id: '5', name: 'Waxing', count: 178 },
  { id: '6', name: 'Massage', count: 223 },
  { id: '7', name: 'Eyebrow Design', count: 134 },
  { id: '8', name: 'Lash Extensions', count: 167 },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-surface-2 bg-mesh py-12 md:py-16 overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div>
              <h1 className="h1 text-fg mb-4">
                Beauty Services
              </h1>
              <p className="text-lg text-muted">
                Explore all available beauty services, from hair styling to massage therapies, and connect with certified top-rated professionals in your area.
              </p>
            </div>
            <ScrollReveal direction="left" delay={0.1}>
              <MotionImage
                src={SERVICES_HERO}
                alt="Luxury salon and beauty spa interiors"
                width={800}
                height={350}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="aspect-[21/9] w-full object-cover rounded-2xl shadow-xl ring-1 ring-black/5"
                imageClassName="object-cover"
                hoverTilt
                shineEffect
                zoomScale={1.04}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-border sticky top-20 bg-surface z-40">
        <div className="container">
          <div className="flex gap-4">
            <Input
              placeholder="Search services..."
              className="flex-1"
            />
            <Button>Search</Button>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-12">
        <div className="container">
          <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <StaggerItem key={service.id}>
                <Card hoverable className="h-full">
                  <MotionImage
                    src={getServiceImage(service.name)}
                    alt={service.name}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="h-40 w-full"
                    imageClassName="h-40 w-full object-cover"
                    hoverTilt
                    shineEffect
                    zoomScale={1.06}
                  />
                  <CardBody className="space-y-4 text-center">
                    <div>
                      <h3 className="text-lg font-semibold text-fg">
                        {service.name}
                      </h3>
                      <p className="text-sm text-muted mt-1">
                        {service.count} professionals
                      </p>
                    </div>
                    <Button size="sm" fullWidth>
                      View Professionals
                    </Button>
                  </CardBody>
                </Card>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
