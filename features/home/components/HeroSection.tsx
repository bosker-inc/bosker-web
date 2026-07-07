'use client';

import { motion, useReducedMotion, type Variants } from 'framer-motion';
import { Button } from '@/components/Button';
import { MotionImage } from '@/components/motion/MotionImage';
import { HERO_IMAGE } from '@/lib/images';

const TRUST = [
  { icon: '⭐', label: '4.9/5 Rating' },
  { icon: '👥', label: '50K+ Happy Customers' },
  { icon: '✨', label: '1000+ Professionals' },
];

export function HeroSection() {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden bg-bg bg-mesh py-20 md:py-28">
      {/* Decorative animated blobs */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-accent/25 blur-3xl animate-blob"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-32 right-0 h-96 w-96 rounded-full bg-accent-strong/20 blur-3xl animate-float"
      />

      <div className="container relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Copy */}
          <motion.div
            className="max-w-xl space-y-6 text-center lg:text-left"
            variants={container}
            initial="hidden"
            animate="visible"
          >
            <motion.span
              variants={item}
              className="inline-flex items-center gap-2 rounded-full bg-accent/15 px-4 py-1.5 text-sm font-semibold text-accent"
            >
              ✨ Beauty, booked in seconds
            </motion.span>

            <motion.h1 variants={item} className="text-display text-fg">
              Discover & Book{' '}
              <span className="text-accent">Beauty Services</span>
            </motion.h1>

            <motion.p
              variants={item}
              className="text-lg text-muted md:text-xl"
            >
              Connect with professional beauty technicians. From nail care to
              hair styling, find the perfect service and expert near you.
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col justify-center gap-4 pt-2 sm:flex-row lg:justify-start"
            >
              <Button size="lg">Browse Services</Button>
              <Button variant="outline" size="lg">
                Find Technicians
              </Button>
            </motion.div>

            {/* Trust Indicators */}
            <motion.div
              variants={item}
              className="mt-8 flex flex-col items-center gap-6 border-t border-border pt-8 text-sm text-muted sm:flex-row lg:justify-start"
            >
              {TRUST.map((t) => (
                <div key={t.label} className="flex items-center gap-2">
                  <span className="text-2xl">{t.icon}</span>
                  <span>{t.label}</span>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero image */}
          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={{ opacity: 0, scale: reduce ? 1 : 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          >
            <MotionImage
              src={HERO_IMAGE}
              alt="Beauty professional styling a client's hair in a modern salon"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="relative aspect-[4/5] overflow-hidden rounded-3xl shadow-2xl ring-1 ring-black/5"
              imageClassName="object-cover"
              hoverTilt
              shineEffect
              zoomScale={1.06}
            />

            {/* Floating rating badge */}
            <motion.div
              className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-surface px-5 py-4 shadow-xl sm:block"
              initial={{ opacity: 0, y: reduce ? 0 : 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <div className="flex items-center gap-3">
                <span className="text-3xl">💜</span>
                <div>
                  <p className="text-lg font-bold text-fg">4.9/5</p>
                  <p className="text-xs text-muted">12,000+ reviews</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
