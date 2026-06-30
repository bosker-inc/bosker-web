import { Button } from '@/components/Button';

export function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-primary-50 via-white to-primary-100 py-20 md:py-32">
      <div className="container">
        <div className="max-w-3xl mx-auto text-center space-y-6 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-bold text-neutral-900">
            Discover & Book{' '}
            <span className="text-primary-600">Beauty Services</span>
          </h1>

          <p className="text-lg md:text-xl text-neutral-600">
            Connect with professional beauty technicians. From nail care to hair styling,
            find the perfect service and expert near you.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg">
              Browse Services
            </Button>
            <Button variant="outline" size="lg">
              Find Technicians
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="pt-8 mt-8 border-t border-neutral-200 flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-neutral-600">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span>4.9/5 Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">👥</span>
              <span>50K+ Happy Customers</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>1000+ Professionals</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
