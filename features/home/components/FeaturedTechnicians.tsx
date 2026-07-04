import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { getTechnicianImage } from '@/lib/images';

const TECHNICIANS = [
  {
    id: '1',
    name: 'Sarah Johnson',
    title: 'Hair Stylist',
    rating: 4.9,
    reviews: 128,
    services: 'Cuts, Color, Styling',
    yearsExp: 8,
  },
  {
    id: '2',
    name: 'Maria Garcia',
    title: 'Nail Technician',
    rating: 4.8,
    reviews: 95,
    services: 'Manicure, Pedicure, Art',
    yearsExp: 6,
  },
  {
    id: '3',
    name: 'Emily Chen',
    title: 'Makeup Artist',
    rating: 5.0,
    reviews: 87,
    services: 'Makeup, Special FX',
    yearsExp: 5,
  },
  {
    id: '4',
    name: 'Jessica Williams',
    title: 'Esthetician',
    rating: 4.9,
    reviews: 112,
    services: 'Facials, Skincare',
    yearsExp: 7,
  },
];

export function FeaturedTechnicians() {
  return (
    <section className="py-20 md:py-32">
      <div className="container">
        <Reveal className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            Featured Professionals
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Meet some of our top-rated beauty professionals ready to serve you
          </p>
        </Reveal>

        <StaggerGroup className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TECHNICIANS.map((tech, index) => (
            <StaggerItem key={tech.id}>
              <Card
                hoverable
                className="h-full transition-transform duration-300 hover:-translate-y-1"
              >
                <CardBody className="space-y-4 text-center">
                  <div className="mx-auto h-24 w-24 overflow-hidden rounded-full ring-4 ring-primary-100">
                    <OptimizedImage
                      src={getTechnicianImage(index)}
                      alt={tech.name}
                      width={200}
                      height={200}
                      sizes="96px"
                      className="h-24 w-24 object-cover"
                    />
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-neutral-900">
                      {tech.name}
                    </h3>
                    <p className="text-sm text-primary-600 font-medium">
                      {tech.title}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-lg">⭐</span>
                      <span className="font-semibold text-neutral-900">
                        {tech.rating}
                      </span>
                      <span className="text-neutral-600 text-sm">
                        ({tech.reviews})
                      </span>
                    </div>
                    <p className="text-sm text-neutral-600">
                      {tech.yearsExp} years experience
                    </p>
                  </div>

                  <div className="bg-neutral-50 rounded-lg p-3 text-sm text-neutral-700">
                    {tech.services}
                  </div>

                  <Button variant="primary" size="sm" fullWidth>
                    View Profile
                  </Button>
                </CardBody>
              </Card>
            </StaggerItem>
          ))}
        </StaggerGroup>

        <div className="text-center mt-12">
          <Button size="lg">Browse All Professionals</Button>
        </div>
      </div>
    </section>
  );
}
