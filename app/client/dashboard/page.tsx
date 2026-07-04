import { Metadata } from 'next';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Badge } from '@/components/Badge';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your Bosker dashboard',
};

export default function DashboardPage() {
  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="h1 text-fg">Welcome back! 👋</h1>
          <p className="text-muted mt-2">Here&apos;s what&apos;s happening with your account</p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Total Bookings', value: '12', icon: '📅' },
            { label: 'Upcoming', value: '2', icon: '⏰' },
            { label: 'Favorites', value: '5', icon: '❤️' },
            { label: 'Total Spent', value: '$340', icon: '💰' },
          ].map((stat, i) => (
            <Card key={i}>
              <CardBody className="text-center space-y-2">
                <div className="text-4xl">{stat.icon}</div>
                <div className="h1 text-accent">
                  {stat.value}
                </div>
                <div className="text-sm text-muted">{stat.label}</div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Upcoming Appointments */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-fg">
                  Upcoming Appointments
                </h2>
              </CardHeader>
              <CardBody className="space-y-4">
                {[
                  {
                    date: 'Tomorrow, 2:00 PM',
                    service: 'Hair Color & Cut',
                    professional: 'Sarah Johnson',
                    status: 'confirmed',
                  },
                  {
                    date: 'June 15, 10:00 AM',
                    service: 'Manicure',
                    professional: 'Maria Garcia',
                    status: 'pending',
                  },
                ].map((appt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-surface-2 rounded-lg"
                  >
                    <div>
                      <p className="font-semibold text-fg">
                        {appt.service}
                      </p>
                      <p className="text-sm text-muted">
                        {appt.professional} • {appt.date}
                      </p>
                    </div>
                    <Badge
                      variant={
                        appt.status === 'confirmed' ? 'success' : 'warning'
                      }
                    >
                      {appt.status === 'confirmed'
                        ? 'Confirmed'
                        : 'Pending'}
                    </Badge>
                  </div>
                ))}
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-fg">
                  Quick Actions
                </h2>
              </CardHeader>
              <CardBody>
                <div className="grid md:grid-cols-2 gap-4">
                  <a
                    href="/services"
                    className="p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors text-accent font-semibold"
                  >
                    📅 Book New Appointment
                  </a>
                  <a
                    href="/technicians"
                    className="p-4 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors text-accent font-semibold"
                  >
                    🔍 Browse Professionals
                  </a>
                </div>
              </CardBody>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <h3 className="font-semibold text-fg">
                  Recent Reviews
                </h3>
              </CardHeader>
              <CardBody className="space-y-4 text-sm">
                <div className="pb-4 border-b border-border">
                  <p className="font-semibold text-fg mb-1">
                    Great experience!
                  </p>
                  <p className="text-muted">
                    Sarah was amazing. Highly recommend!
                  </p>
                  <div className="mt-2 flex gap-1">⭐⭐⭐⭐⭐</div>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-fg">
                  Your Favorites
                </h3>
              </CardHeader>
              <CardBody className="space-y-3 text-sm">
                {['Sarah Johnson', 'Maria Garcia'].map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-2 hover:bg-surface-2 rounded"
                  >
                    <span className="font-medium text-fg">{name}</span>
                    <span>❤️</span>
                  </div>
                ))}
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
