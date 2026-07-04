'use client';

import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';
import { OptimizedImage } from '@/components/OptimizedImage';
import { TESTIMONIAL_AVATARS } from '@/lib/images';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Jessica Martinez',
    role: 'Customer',
    rating: 5,
    text: 'I found the perfect hairstylist through Bosker. The booking process was so easy, and the result exceeded my expectations!',
  },
  {
    id: '2',
    name: 'Amanda Lee',
    role: 'Customer',
    rating: 5,
    text: 'Great platform! I have tried three different professionals already, and all of them were amazing. Highly recommended!',
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    role: 'Customer',
    rating: 5,
    text: 'Finally, a reliable way to book beauty services. The professionals are vetted, prices are transparent, and quality is guaranteed.',
  },
  {
    id: '4',
    name: 'Lisa Anderson',
    role: 'Professional',
    rating: 5,
    text: 'As a beauty professional, Bosker has helped me grow my business significantly. Great clients and seamless booking.',
  },
];

const AUTO_ADVANCE_MS = 6000;

export function Testimonials() {
  const reduce = useReducedMotion();
  const [activeIdx, setActiveIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const handleNext = useCallback(() => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  const handlePrev = () => {
    setActiveIdx((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(handleNext, AUTO_ADVANCE_MS);
    return () => clearInterval(timer);
  }, [paused, handleNext]);

  const testimonial = TESTIMONIALS[activeIdx];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-br from-primary-50 to-white">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            What People Say
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of satisfied customers and professionals
          </p>
        </div>

        <div
          className="max-w-2xl mx-auto"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <Card className="border-2 border-primary-200 overflow-hidden">
            <CardBody className="py-12 px-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={testimonial.id}
                  className="space-y-6 text-center"
                  initial={{ opacity: 0, x: reduce ? 0 : 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: reduce ? 0 : -40 }}
                  transition={{ duration: 0.4, ease: 'easeInOut' }}
                >
                  <div className="mx-auto h-20 w-20 overflow-hidden rounded-full ring-4 ring-primary-100">
                    <OptimizedImage
                      src={TESTIMONIAL_AVATARS[activeIdx]}
                      alt={testimonial.name}
                      width={200}
                      height={200}
                      sizes="80px"
                      className="h-20 w-20 object-cover"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-center gap-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <span key={i} className="text-xl">
                          ⭐
                        </span>
                      ))}
                    </div>
                    <p className="text-xl text-neutral-700 italic">
                      &ldquo;{testimonial.text}&rdquo;
                    </p>
                  </div>

                  <div>
                    <p className="font-semibold text-neutral-900">
                      {testimonial.name}
                    </p>
                    <p className="text-sm text-primary-600">
                      {testimonial.role}
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </CardBody>
          </Card>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button variant="ghost" onClick={handlePrev}>
              ← Previous
            </Button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  aria-label={`Go to testimonial ${idx + 1}`}
                  className={`h-3 rounded-full transition-all ${
                    idx === activeIdx
                      ? 'w-8 bg-primary-600'
                      : 'w-3 bg-neutral-300 hover:bg-neutral-400'
                  }`}
                />
              ))}
            </div>

            <Button variant="ghost" onClick={handleNext}>
              Next →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
