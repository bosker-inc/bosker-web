import { Metadata } from 'next';
import { Card, CardBody } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Technicians',
  description: 'Browse and book professional beauty technicians',
};

const TECHNICIANS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Hair Stylist',
    rating: 4.9,
    reviews: 128,
    image: '👩‍🦰',
    services: 'Cuts, Color, Styling',
  },
  {
    id: '2',
    name: 'Maria Garcia',
    title: 'Nail Technician',
    rating: 4.8,
    reviews: 95,
    image: '💅',
    services: 'Manicure, Pedicure',
  },
  {
    id: '3',
    name: 'Emily Chen',
    title: 'Makeup Artist',
    rating: 5.0,
    reviews: 87,
    image: '💄',
    services: 'Makeup, Special FX',
  },
  {
    id: '4',
    name: 'Jessica Williams',
    title: 'Esthetician',
    rating: 4.9,
    reviews: 112,
    image: '✨',
    services: 'Facials, Skincare',
  },
];

export default function TechniciansPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 py-12">
        <div className="container">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            Beauty Professionals
          </h1>
          <p className="text-lg text-neutral-600">
            Find and book the perfect professional for your beauty needs
          </p>
        </div>
      </section>

      {/* Search & Filter */}
      <section className="py-8 border-b border-neutral-200 sticky top-20 bg-white z-40">
        <div className="container">
          <div className="grid md:grid-cols-3 gap-4">
            <Input placeholder="Search by name..." />
            <select className="border border-neutral-300 rounded-lg px-4 py-2.5">
              <option>All Services</option>
              <option>Hair Styling</option>
              <option>Nail Care</option>
              <option>Makeup</option>
            </select>
            <Button fullWidth>Search</Button>
          </div>
        </div>
      </section>

      {/* Technicians Grid */}
      <section className="py-12">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TECHNICIANS.map((tech) => (
              <Card key={tech.id} hoverable>
                <CardBody className="space-y-4 text-center">
                  <div className="text-6xl">{tech.image}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-primary-600">{tech.title}</p>
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <span className="text-lg">⭐</span>
                    <span className="font-semibold">{tech.rating}</span>
                    <span className="text-neutral-600 text-sm">
                      ({tech.reviews})
                    </span>
                  </div>
                  <p className="text-sm text-neutral-600">{tech.services}</p>
                  <Button variant="primary" size="sm" fullWidth>
                    View Profile
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
