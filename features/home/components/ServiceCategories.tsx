import Link from 'next/link';
import { Card, CardBody } from '@/components/Card';

const SERVICES = [
  {
    id: '1',
    name: 'Hair Styling',
    description: 'Cuts, colors, treatments, and styling',
    icon: '💇',
    count: 342,
  },
  {
    id: '2',
    name: 'Nail Care',
    description: 'Manicures, pedicures, and nail art',
    icon: '💅',
    count: 289,
  },
  {
    id: '3',
    name: 'Makeup',
    description: 'Professional makeup and special effects',
    icon: '💄',
    count: 156,
  },
  {
    id: '4',
    name: 'Skincare',
    description: 'Facials, treatments, and consultations',
    icon: '✨',
    count: 201,
  },
  {
    id: '5',
    name: 'Waxing',
    description: 'Hair removal and body waxing',
    icon: '🪮',
    count: 178,
  },
  {
    id: '6',
    name: 'Massage',
    description: 'Relaxation and therapeutic massage',
    icon: '🧘',
    count: 223,
  },
];

export function ServiceCategories() {
  return (
    <section className="py-20 md:py-32 bg-neutral-50">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Popular Services
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Browse through our wide range of beauty services performed by
            certified professionals
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service) => (
            <Link key={service.id} href={`/services/${service.id}`}>
              <Card hoverable className="h-full cursor-pointer">
                <CardBody className="space-y-4">
                  <div className="text-5xl">{service.icon}</div>
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900">
                      {service.name}
                    </h3>
                    <p className="text-neutral-600 text-sm mt-1">
                      {service.description}
                    </p>
                  </div>
                  <div className="text-sm text-primary-600 font-semibold">
                    {service.count} Professionals
                  </div>
                </CardBody>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="text-primary-600 hover:text-primary-700 font-semibold"
          >
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
