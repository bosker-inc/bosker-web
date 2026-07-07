import { Button } from '@/components/Button';
import { MotionImage } from '@/components/motion/MotionImage';
import { Reveal } from '@/components/motion/Reveal';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { APP_PROMO_IMAGE } from '@/lib/images';

export function AppPromotion() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-primary-600 to-primary-700 py-16 md:py-20 text-white">
      {/* Decorative blob */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-surface/10 blur-3xl animate-float"
      />

      <div className="container relative">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <Reveal className="space-y-6">
            <h2 className="h2">
              Book Beauty Services On The Go
            </h2>
            <p className="text-lg text-primary-100">
              Download our mobile app to book appointments faster, track your
              appointments in real-time, and get exclusive mobile-only offers.
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
                className="bg-surface text-accent hover:bg-surface-2"
              >
                App Store
              </Button>
              <Button
                variant="secondary"
                size="lg"
                className="bg-surface text-accent hover:bg-surface-2"
              >
                Google Play
              </Button>
            </div>
          </Reveal>

          {/* Right Side - Visual */}
          <ScrollReveal delay={0.15} direction="up" zoom className="hidden md:flex justify-center">
            <MotionImage
              src={APP_PROMO_IMAGE}
              alt="Customer booking a beauty appointment on the Bosker mobile app"
              fill
              sizes="256px"
              className="relative aspect-[3/4] w-64 overflow-hidden rounded-3xl shadow-2xl ring-1 ring-white/20"
              imageClassName="object-cover"
              hoverTilt
              shineEffect
              zoomScale={1.05}
            />
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
