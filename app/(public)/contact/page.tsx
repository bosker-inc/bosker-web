import { Metadata } from 'next';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { MotionImage } from '@/components/motion/MotionImage';
import { Reveal } from '@/components/motion/Reveal';
import { ScrollReveal } from '@/components/motion/ScrollReveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { CONTACT_IMAGE } from '@/lib/images';

export const metadata: Metadata = {
  title: 'Contact Us',
  description: 'Get in touch with the Bosker team',
};

export default function ContactPage() {
  return (
    <main>
      {/* Header */}
      <section className="bg-surface-2 bg-mesh py-12">
        <div className="container">
          <h1 className="h1 text-fg mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted">
            Have questions? We&apos;d love to hear from you
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-12 gap-12 items-start">
            {/* Form and Info Column */}
            <div className="lg:col-span-7 space-y-12">
              <Reveal>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      label="Full Name"
                      placeholder="Your name"
                      fullWidth
                    />
                    <Input
                      label="Email"
                      type="email"
                      placeholder="your@email.com"
                      fullWidth
                    />
                  </div>

                  <Input
                    label="Subject"
                    placeholder="How can we help?"
                    fullWidth
                  />

                  <Textarea
                    label="Message"
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    fullWidth
                  />

                  <Button size="lg" fullWidth>
                    Send Message
                  </Button>
                </form>
              </Reveal>

              {/* Contact Info */}
              <StaggerGroup className="grid sm:grid-cols-3 gap-6 pt-4">
                {[
                  {
                    icon: '📧',
                    title: 'Email',
                    value: 'support@bosker.app',
                  },
                  {
                    icon: '📱',
                    title: 'Phone',
                    value: '+1 (555) 123-4567',
                  },
                  {
                    icon: '📍',
                    title: 'Address',
                    value: 'San Francisco, CA',
                  },
                ].map((item, i) => (
                  <StaggerItem key={i} className="text-center">
                    <div className="text-4xl mb-3">{item.icon}</div>
                    <h3 className="font-semibold text-fg mb-1">
                      {item.title}
                    </h3>
                    <p className="text-muted text-sm">{item.value}</p>
                  </StaggerItem>
                ))}
              </StaggerGroup>
            </div>

            {/* Visual Side Column */}
            <ScrollReveal direction="left" delay={0.2} className="lg:col-span-5 w-full">
              <MotionImage
                src={CONTACT_IMAGE}
                alt="Bosker modern salon and beauty workspace showroom"
                width={600}
                height={700}
                sizes="(max-width: 1024px) 100vw, 40vw"
                className="aspect-[4/5] w-full object-cover rounded-3xl shadow-2xl ring-1 ring-black/5"
                imageClassName="object-cover"
                hoverTilt
                shineEffect
                zoomScale={1.05}
              />
            </ScrollReveal>
          </div>
        </div>
      </section>
    </main>
  );
}
