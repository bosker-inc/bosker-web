import { Metadata } from 'next';
import { Card, CardBody } from '@/components/Card';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Bosker and our mission to connect beauty professionals with customers',
};

export default function AboutPage() {
  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-neutral-50 py-16">
        <div className="container max-w-3xl">
          <h1 className="text-4xl font-bold text-neutral-900 mb-4">
            About Bosker
          </h1>
          <p className="text-xl text-neutral-600">
            Empowering beauty professionals and delighting customers through seamless connections
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16">
        <div className="container max-w-3xl space-y-8">
          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Our Mission
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              To make beauty services accessible, affordable, and trustworthy by
              creating a platform where talented professionals and satisfied customers
              can connect easily and securely.
            </p>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
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
              ].map((value, i) => (
                <Card key={i}>
                  <CardBody>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600">{value.desc}</p>
                  </CardBody>
                </Card>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Our Story
            </h2>
            <p className="text-lg text-neutral-600 leading-relaxed">
              Founded in 2024, Bosker was created to solve a real problem: finding
              a trusted beauty professional is difficult, time-consuming, and
              unreliable. We believed there had to be a better way. Today, we connect
              thousands of customers with talented beauty professionals every month.
            </p>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-neutral-50 py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { number: '50K+', label: 'Happy Customers' },
              { number: '1K+', label: 'Professionals' },
              { number: '100K+', label: 'Bookings' },
              { number: '4.9/5', label: 'Average Rating' },
            ].map((stat, i) => (
              <div key={i}>
                <div className="text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-neutral-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
