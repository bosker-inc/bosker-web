import { Metadata } from 'next';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

export const metadata: Metadata = {
  title: 'My Profile',
  description: 'Manage your public technician profile',
  robots: { index: false, follow: false },
};

const SERVICES = [
  'Haircut',
  'Hair Color',
  'Balayage',
  'Blowout & Styling',
  'Hair Treatment',
];

const CERTIFICATIONS = [
  'Licensed Cosmetologist (CA)',
  'Balayage Specialist Certification',
];

export default function TechnicianProfilePage() {
  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="h1 text-fg">My Profile</h1>
          <p className="text-muted mt-2">
            This is what customers see when they find you on Bosker
          </p>
        </div>

        {/* Public Info */}
        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-fg">
              Public Information
            </h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <div className="flex items-center gap-6">
                <div className="text-6xl">👩‍🦰</div>
                <Button variant="outline" size="sm">
                  Change Photo
                </Button>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="Display Name" defaultValue="Sarah Johnson" fullWidth />
                <Input label="Title" defaultValue="Hair Stylist" fullWidth />
              </div>

              <Textarea
                label="Bio"
                rows={4}
                fullWidth
                defaultValue="Passionate hair stylist with 8 years of experience specializing in color, balayage, and modern cuts. I believe great hair starts with listening to what you want."
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input label="City" defaultValue="San Francisco" fullWidth />
                <Input label="State" defaultValue="CA" fullWidth />
              </div>

              <div className="flex gap-3 pt-2">
                <Button>Save Changes</Button>
                <Button variant="outline">Preview Public Profile</Button>
              </div>
            </form>
          </CardBody>
        </Card>

        {/* Services */}
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-fg">
              Services Offered
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <div className="flex flex-wrap gap-2">
              {SERVICES.map((service) => (
                <Badge key={service} variant="primary">
                  {service} ✕
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input placeholder="Add a service..." fullWidth />
              <Button variant="outline">Add</Button>
            </div>
          </CardBody>
        </Card>

        {/* Certifications */}
        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-fg">
              Certifications
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {CERTIFICATIONS.map((cert) => (
              <div
                key={cert}
                className="flex items-center justify-between p-3 bg-surface-2 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl">🎓</span>
                  <span className="text-fg">{cert}</span>
                </div>
                <Button variant="ghost" size="sm">
                  Remove
                </Button>
              </div>
            ))}
            <Button variant="outline" fullWidth>
              + Add Certification
            </Button>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
