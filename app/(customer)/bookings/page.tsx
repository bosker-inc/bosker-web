import { Metadata } from 'next';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

export const metadata: Metadata = {
  title: 'My Bookings',
  description: 'View and manage your bookings',
};

export default function BookingsPage() {
  const bookings = [
    {
      id: '1',
      service: 'Hair Color & Cut',
      professional: 'Sarah Johnson',
      date: 'Tomorrow, 2:00 PM',
      price: '$150',
      status: 'confirmed',
    },
    {
      id: '2',
      service: 'Manicure',
      professional: 'Maria Garcia',
      date: 'June 15, 10:00 AM',
      price: '$45',
      status: 'pending',
    },
    {
      id: '3',
      service: 'Makeup',
      professional: 'Emily Chen',
      date: 'June 10, 5:00 PM',
      price: '$85',
      status: 'completed',
    },
    {
      id: '4',
      service: 'Skincare Facial',
      professional: 'Jessica Williams',
      date: 'May 28, 3:30 PM',
      price: '$120',
      status: 'completed',
    },
  ];

  return (
    <main className="p-8 bg-neutral-50 min-h-screen">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900">My Bookings</h1>
          <p className="text-neutral-600 mt-2">View and manage all your appointments</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-8 border-b border-neutral-200">
          {['All', 'Upcoming', 'Completed', 'Cancelled'].map((tab) => (
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
          {bookings.map((booking) => (
            <Card key={booking.id} hoverable>
              <CardBody>
                <div className="flex items-center justify-between">
                  {/* Left Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4">
                      <div className="text-3xl">💇</div>
                      <div>
                        <h3 className="font-semibold text-neutral-900">
                          {booking.service}
                        </h3>
                        <p className="text-sm text-neutral-600">
                          with {booking.professional}
                        </p>
                        <p className="text-sm text-neutral-500 mt-1">
                          {booking.date}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Right Actions */}
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
                      {booking.status === 'confirmed' && (
                        <Button size="sm" variant="ghost">
                          Cancel
                        </Button>
                      )}
                      {booking.status === 'completed' && (
                        <Button size="sm">Review</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Empty State */}
        {bookings.length === 0 && (
          <Card>
            <CardBody className="text-center py-12">
              <div className="text-6xl mb-4">📅</div>
              <p className="text-neutral-600 mb-6">No bookings yet</p>
              <Button>Book an Appointment</Button>
            </CardBody>
          </Card>
        )}
      </div>
    </main>
  );
}
