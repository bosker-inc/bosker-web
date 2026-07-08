import { Metadata } from 'next';
import { TechnicianBookingsList } from '@/features/technician-dashboard/components/TechnicianBookingsList';

export const metadata: Metadata = {
  title: 'Bookings',
  description: 'Manage your customer bookings',
  robots: { index: false, follow: false },
};

export default function TechnicianBookingsPage() {
  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="h1 text-fg">Bookings</h1>
          <p className="text-muted mt-2">Manage your customer appointments</p>
        </div>

        {/* Live bookings from the BFF (accept / decline / mark done) */}
        <TechnicianBookingsList />
      </div>
    </main>
  );
}
