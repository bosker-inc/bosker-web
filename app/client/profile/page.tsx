import { Metadata } from 'next';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Profile',
  description: 'Manage your profile',
};

export default function ProfilePage() {
  return (
    <main className="p-8 bg-neutral-50 min-h-screen">
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">My Profile</h1>
          <p className="text-neutral-600 mt-2">Manage your account information</p>
        </div>

        <Card>
          <CardHeader>
            <h2 className="text-xl font-semibold text-neutral-900">
              Personal Information
            </h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="First Name"
                  defaultValue="John"
                  fullWidth
                />
                <Input
                  label="Last Name"
                  defaultValue="Doe"
                  fullWidth
                />
              </div>

              <Input
                label="Email"
                type="email"
                defaultValue="john@example.com"
                fullWidth
              />

              <Input
                label="Phone"
                type="tel"
                defaultValue="+1 (555) 123-4567"
                fullWidth
              />

              <div className="grid md:grid-cols-2 gap-6">
                <Input
                  label="City"
                  defaultValue="San Francisco"
                  fullWidth
                />
                <Input
                  label="State"
                  defaultValue="CA"
                  fullWidth
                />
              </div>

              <div className="flex gap-3 pt-4">
                <Button>Save Changes</Button>
                <Button variant="outline">Cancel</Button>
              </div>
            </form>
          </CardBody>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-neutral-900">
              Preferences
            </h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-neutral-700">
                Receive appointment reminders
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" defaultChecked className="w-4 h-4" />
              <span className="text-neutral-700">
                Receive promotional offers
              </span>
            </label>
            <label className="flex items-center gap-3">
              <input type="checkbox" className="w-4 h-4" />
              <span className="text-neutral-700">
                Allow professionals to contact me
              </span>
            </label>
          </CardBody>
        </Card>

        <Card className="mt-6">
          <CardHeader>
            <h2 className="text-xl font-semibold text-neutral-900">
              Change Password
            </h2>
          </CardHeader>
          <CardBody>
            <form className="space-y-6">
              <Input
                label="Current Password"
                type="password"
                fullWidth
              />
              <Input
                label="New Password"
                type="password"
                fullWidth
              />
              <Input
                label="Confirm Password"
                type="password"
                fullWidth
              />
              <Button>Update Password</Button>
            </form>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
