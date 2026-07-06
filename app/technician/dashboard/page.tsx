import { Metadata } from 'next';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Badge } from '@/components/Badge';
import {
  BookingRequestCard,
  type BookingRequest,
} from '@/features/technician-dashboard/components/BookingRequestCard';
import { IncomingJobPanel } from '@/features/technician-dashboard/components/IncomingJobPanel';

export const metadata: Metadata = {
  title: 'Technician Dashboard',
  description: 'Manage your bookings and business',
  robots: { index: false, follow: false },
};

const BOOKING_REQUESTS: BookingRequest[] = [
  {
    id: '1',
    customerName: 'Jessica Martinez',
    customerAvatar: '👩',
    service: 'Hair Color & Cut',
    date: 'Tomorrow, 2:00 PM',
    price: '$150',
  },
  {
    id: '2',
    customerName: 'Amanda Lee',
    customerAvatar: '👩‍🦱',
    service: 'Balayage',
    date: 'July 5, 11:00 AM',
    price: '$220',
  },
];

export default function TechnicianDashboardPage() {
  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-6xl">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="h1 text-fg">
            Welcome back, Sarah! 💜
          </h1>
          <p className="text-muted mt-2">
            Here&apos;s how your business is doing
          </p>
        </div>

        {/* Live matching offers + active job (real BFF data) */}
        <IncomingJobPanel />

        {/* Stats Grid */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: 'Bookings Today', value: '4', icon: '📅' },
            { label: 'Pending Requests', value: '2', icon: '⏳' },
            { label: 'Earnings This Month', value: '$3,240', icon: '💰' },
            { label: 'Your Rating', value: '4.9', icon: '⭐' },
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

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Booking Requests */}
            <div>
              <h2 className="text-xl font-semibold text-fg mb-4">
                New Booking Requests
              </h2>
              <div className="space-y-4">
                {BOOKING_REQUESTS.map((request) => (
                  <BookingRequestCard key={request.id} request={request} />
                ))}
              </div>
            </div>

            {/* Today's Schedule */}
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold text-fg">
                  Today&apos;s Schedule
                </h2>
              </CardHeader>
              <CardBody className="space-y-4">
                {[
                  {
                    time: '10:00 AM',
                    service: 'Haircut',
                    customer: 'Emily R.',
                    status: 'confirmed',
                  },
                  {
                    time: '1:00 PM',
                    service: 'Hair Color',
                    customer: 'Sofia G.',
                    status: 'confirmed',
                  },
                  {
                    time: '3:30 PM',
                    service: 'Blowout & Styling',
                    customer: 'Lisa A.',
                    status: 'pending',
                  },
                ].map((appt, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4 bg-surface-2 rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-semibold text-accent w-20">
                        {appt.time}
                      </span>
                      <div>
                        <p className="font-semibold text-fg">
                          {appt.service}
                        </p>
                        <p className="text-sm text-muted">
                          {appt.customer}
                        </p>
                      </div>
                    </div>
                    <Badge
                      variant={
                        appt.status === 'confirmed' ? 'success' : 'warning'
                      }
                    >
                      {appt.status === 'confirmed' ? 'Confirmed' : 'Pending'}
                    </Badge>
                  </div>
                ))}
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
                    Jessica M.
                  </p>
                  <div className="mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="text-muted">
                    Sarah is amazing! Best color I&apos;ve ever had.
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-fg mb-1">
                    Amanda L.
                  </p>
                  <div className="mb-2">⭐⭐⭐⭐⭐</div>
                  <p className="text-muted">
                    Always professional and on time.
                  </p>
                </div>
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <h3 className="font-semibold text-fg">
                  Quick Actions
                </h3>
              </CardHeader>
              <CardBody className="space-y-3">
                <a
                  href="/availability"
                  className="block p-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors text-accent font-semibold text-sm"
                >
                  🗓️ Update Availability
                </a>
                <a
                  href="/profile"
                  className="block p-3 bg-accent/10 hover:bg-accent/20 rounded-lg transition-colors text-accent font-semibold text-sm"
                >
                  👤 Edit Public Profile
                </a>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}
