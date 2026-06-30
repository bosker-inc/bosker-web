import { Metadata } from 'next';
import { Card, CardBody } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Services',
  description: 'Browse all available beauty services and find professionals in your area',
};

const SERVICES = [
  { id: '1', name: 'Hair Styling', icon: '💇', count: 342 },
  { id: '2', name: 'Nail Care', icon: '💅', count: 289 },
  { id: '3', name: 'Makeup', icon: '💄', count: 156 },
  { id: '4', name: 'Skincare', icon: '✨', count: 201 },
  { id: '5', name: 'Waxing', icon: '🪮', count: 178 },
  { id: '6', name: 'Massage', icon: '🧘', count: 223 },
  { id: '7', name: 'Eyebrow Design', icon: '👁️', count: 134 },
  { id: '8', name: 'Lash Extensions', icon: '✨', count: 167 },
];

export default function ServicesPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Beauty Services
          </h1>
          <p className="text-lg text-neutral-600">
            Explore all available beauty services and find the perfect professional
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-neutral-200 sticky top-20 bg-white z-40">
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
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service) => (
              <Card key={service.id} hoverable>
                <CardBody className="space-y-4 text-center">
                  <div className="text-5xl">{service.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {service.name}
                    </h3>
                    <p className="text-sm text-neutral-600 mt-1">
                      {service.count} professionals
                    </p>
                  </div>
                  <Button size="sm" fullWidth>
                    View Professionals
                  </Button>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
