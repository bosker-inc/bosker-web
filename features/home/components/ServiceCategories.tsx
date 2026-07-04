import Link from 'next/link';
import { Card, CardBody } from '@/components/Card';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { MotionImage } from '@/components/motion/MotionImage';
import { SectionHeading } from '@/components/SectionHeading';
import { getServiceImage } from '@/lib/images';

const SERVICES = [
  {
    id: '1',
    name: 'Hair Styling',
    description: 'Cuts, colors, treatments, and styling',
    count: 342,
  },
  {
    id: '2',
    name: 'Nail Care',
    description: 'Manicures, pedicures, and nail art',
    count: 289,
  },
  {
    id: '3',
    name: 'Makeup',
    description: 'Professional makeup and special effects',
    count: 156,
  },
  {
    id: '4',
    name: 'Skincare',
    description: 'Facials, treatments, and consultations',
    count: 201,
  },
  {
    id: '5',
    name: 'Waxing',
    description: 'Hair removal and body waxing',
    count: 178,
  },
  {
    id: '6',
    name: 'Massage',
    description: 'Relaxation and therapeutic massage',
    count: 223,
  },
];

export function ServiceCategories() {
  return (
    <section className="py-20 md:py-32 bg-surface-2">
      <div className="container">
        <Reveal className="mb-16">
          <SectionHeading
            eyebrow="Services"
            title="Popular Services"
            subtitle="Browse through our wide range of beauty services performed by certified professionals"
          />
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <StaggerItem key={service.id}>
              <Link href={`/services/${service.id}`} className="block h-full">
                <Card hoverable className="h-full cursor-pointer">
                  <MotionImage
                    src={getServiceImage(service.name)}
                    alt={service.name}
                    width={600}
                    height={400}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="h-44 w-full"
                    imageClassName="h-44 w-full object-cover"
                  />
                  <CardBody className="space-y-3">
                    <div>
                      <h3 className="text-xl font-semibold text-fg">
                        {service.name}
                      </h3>
                      <p className="text-muted text-sm mt-1">
                        {service.description}
                      </p>
                    </div>
                    <div className="text-sm text-accent font-semibold">
                      {service.count} Professionals
                    </div>
                  </CardBody>
                </Card>
              </Link>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="text-accent hover:text-accent font-semibold"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
