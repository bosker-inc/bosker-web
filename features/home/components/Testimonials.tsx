'use client';

import { useState } from 'react';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';

const TESTIMONIALS = [
  {
    id: '1',
    name: 'Jessica Martinez',
    role: 'Customer',
    avatar: '👩',
    rating: 5,
    text: 'I found the perfect hairstylist through Bosker. The booking process was so easy, and the result exceeded my expectations!',
  },
  {
    id: '2',
    name: 'Amanda Lee',
    role: 'Customer',
    avatar: '👩‍🦱',
    rating: 5,
    text: 'Great platform! I have tried three different professionals already, and all of them were amazing. Highly recommended!',
  },
  {
    id: '3',
    name: 'Sofia Rodriguez',
    role: 'Customer',
    avatar: '👨',
    rating: 5,
    text: 'Finally, a reliable way to book beauty services. The professionals are vetted, prices are transparent, and quality is guaranteed.',
  },
  {
    id: '4',
    name: 'Lisa Anderson',
    role: 'Professional',
    avatar: '👩‍💼',
    rating: 5,
    text: 'As a beauty professional, Bosker has helped me grow my business significantly. Great clients and seamless booking.',
  },
];

export function Testimonials() {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) =>
      prev === 0 ? TESTIMONIALS.length - 1 : prev - 1
    );
  };

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

        <div className="max-w-2xl mx-auto">
          <Card className="border-2 border-primary-200">
            <CardBody className="space-y-6 text-center py-12 px-8">
              <div className="text-6xl">{testimonial.avatar}</div>

              <div className="space-y-2">
                <div className="flex justify-center gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <span key={i} className="text-xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-xl text-neutral-700 italic">
                  "{testimonial.text}"
                </p>
              </div>

              <div>
                <p className="font-semibold text-neutral-900">
                  {testimonial.name}
                </p>
                <p className="text-sm text-primary-600">{testimonial.role}</p>
              </div>
            </CardBody>
          </Card>

          {/* Carousel Controls */}
          <div className="flex items-center justify-between mt-8">
            <Button
              variant="ghost"
              onClick={handlePrev}
              className="disabled:opacity-50"
            >
              ← Previous
            </Button>

            <div className="flex gap-2">
              {TESTIMONIALS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    idx === activeIdx ? 'bg-primary-600' : 'bg-neutral-300'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="ghost"
              onClick={handleNext}
              className="disabled:opacity-50"
            >
              Next →
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
