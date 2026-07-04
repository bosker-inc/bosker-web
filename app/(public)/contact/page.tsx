import { Metadata } from 'next';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

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
      <section className="py-16">
        <div className="container max-w-2xl">
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
          <StaggerGroup className="mt-16 grid md:grid-cols-3 gap-8">
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
                <p className="text-muted">{item.value}</p>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </main>
  );
}
