import { Metadata } from 'next';
import { Card, CardBody } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'Manage your customer bookings',
  robots: { index: false, follow: false },
};

const BOOKINGS = [
  {
    id: '1',
    service: 'Hair Color & Cut',
    customer: 'Jessica Martinez',
    avatar: '👩',
    date: 'Tomorrow, 2:00 PM',
    price: '$150',
    status: 'confirmed',
  },
  {
    id: '2',
    service: 'Balayage',
    customer: 'Amanda Lee',
    avatar: '👩‍🦱',
    date: 'July 5, 11:00 AM',
    price: '$220',
    status: 'pending',
  },
  {
    id: '3',
    service: 'Haircut',
    customer: 'Emily Rodriguez',
    avatar: '👩‍🦰',
    date: 'June 28, 10:00 AM',
    price: '$65',
    status: 'completed',
  },
  {
    id: '4',
    service: 'Blowout & Styling',
    customer: 'Sofia Garcia',
    avatar: '👱‍♀️',
    date: 'June 25, 3:30 PM',
    price: '$80',
    status: 'completed',
  },
];

export default function TechnicianBookingsPage() {
  return (
    <main className="p-8 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">Bookings</h1>
          <p className="text-neutral-600 mt-2">
            Manage your customer appointments
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-neutral-200">
          {['All', 'Pending', 'Confirmed', 'Completed'].map((tab) => (
            <button
              key={tab}
              className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
                tab === 'All'
                  ? 'border-primary-600 text-primary-600'
                  : 'border-transparent text-neutral-600 hover:text-neutral-900'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Bookings List */}
        <div className="space-y-4">
          {BOOKINGS.map((booking) => (
            <Card key={booking.id} hoverable>
              <CardBody>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{booking.avatar}</div>
                    <div>
                      <h3 className="font-semibold text-neutral-900">
                        {booking.service}
                      </h3>
                      <p className="text-sm text-neutral-600">
                        {booking.customer}
                      </p>
                      <p className="text-sm text-neutral-500 mt-1">
                        {booking.date}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-3">
                    <div className="text-right">
                      <p className="font-semibold text-neutral-900">
                        {booking.price}
                      </p>
                      <Badge
                        variant={
                          booking.status === 'confirmed'
                            ? 'success'
                            : booking.status === 'completed'
                              ? 'info'
                              : 'warning'
                        }
                        size="sm"
                      >
                        {booking.status.charAt(0).toUpperCase() +
                          booking.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline">
                        Details
                      </Button>
                      {booking.status === 'pending' && (
                        <Button size="sm">Confirm</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>
      </div>
    </main>
  );
}
