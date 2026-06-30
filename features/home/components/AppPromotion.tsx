import { Button } from '@/components/Button';

export function AppPromotion() {
  return (
    <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16 md:py-20 text-white">
      <div className="container">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Book Beauty Services On The Go
            </h2>
            <p className="text-lg text-primary-100">
              Download our mobile app to book appointments faster, track your appointments in real-time, and get exclusive mobile-only offers.
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">📲</span>
                <span>Quick booking in just 3 taps</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">🔔</span>
                <span>Real-time notifications</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-2xl">💝</span>
                <span>Exclusive app-only deals</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100"
              >
                App Store
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-primary-600 hover:bg-neutral-100"
              >
                Google Play
              </Button>
            </div>
          </div>

          {/* Right Side - Visual */}
          <div className="hidden md:flex justify-center">
            <div className="text-9xl">📱</div>
          </div>
        </div>
      </div>
    </section>
  );
}
