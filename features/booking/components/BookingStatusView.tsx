'use client';

import { BffBookingStatus } from '@/lib/types';
import { useBookingStatus } from '@/hooks/useBookingStatus';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';

// How each booking status renders on the customer's live status screen.
const STATUS_VIEW: Record<
  string,
  { title: string; detail: string; tone: 'progress' | 'success' | 'danger' }
> = {
  FIND_TECHNICIAN: {
    title: 'Finding a technician…',
    detail: 'We are matching you with the best available technician nearby.',
    tone: 'progress',
  },
  IN_PROGRESS: {
    title: 'Technician on the way',
    detail: 'A technician accepted your booking and is on the way.',
    tone: 'progress',
  },
  COMPLETED: {
    title: 'Booking completed',
    detail: 'Your appointment is complete. Thanks for using Bosker!',
    tone: 'success',
  },
  NO_TECHNICIAN_FOUND: {
    title: 'No technician available',
    detail: 'We could not find a technician right now. Please try again shortly.',
    tone: 'danger',
  },
  CUSTOMER_ABORTED: { title: 'Booking cancelled', detail: 'This booking was cancelled.', tone: 'danger' },
  TECHNICIAN_ABORTED: {
    title: 'Technician cancelled',
    detail: 'The technician had to cancel. Please book again.',
    tone: 'danger',
  },
};

function viewFor(status: BffBookingStatus) {
  return (
    STATUS_VIEW[status] ?? {
      title: 'Preparing your booking…',
      detail: 'Hang tight while we set things up.',
      tone: 'progress' as const,
    }
  );
}

export function BookingStatusView({ bookingId }: { bookingId: string }) {
  const { booking, error } = useBookingStatus(bookingId);

  if (error) {
    return (
      <Card>
        <CardBody>
          <p className="text-danger">{error}</p>
        </CardBody>
      </Card>
    );
  }

  if (!booking) {
    return (
      <Card>
        <CardBody>
          <p className="text-muted">Loading booking…</p>
        </CardBody>
      </Card>
    );
  }

  const view = viewFor(booking.status);
  const toneClass =
    view.tone === 'success' ? 'text-accent' : view.tone === 'danger' ? 'text-danger' : 'text-fg';

  return (
    <Card variant="emphasis">
      <CardBody className="space-y-4 text-center py-10">
        {view.tone === 'progress' && (
          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-accent/30 border-t-accent" />
        )}
        <h2 className={`text-2xl font-bold ${toneClass}`}>{view.title}</h2>
        <p className="text-muted">{view.detail}</p>
        <p className="text-xs text-muted">Booking {booking.id} · {booking.status}</p>

        {(booking.status === 'NO_TECHNICIAN_FOUND' || booking.status === 'COMPLETED') && (
          <Button variant="outline" onClick={() => (window.location.href = '/book')}>
            Book again
          </Button>
        )}
      </CardBody>
    </Card>
  );
}
