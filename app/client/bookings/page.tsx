'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { BffBooking } from '@/lib/types';
import { updateBookingStatus } from '@/lib/booking-api';
import { createReview } from '@/lib/review-api';
import { bookingGroup, isCancellable, statusBadgeVariant, statusLabel, type BookingGroup } from '@/lib/booking-status';
import { useCustomerBookings } from '@/hooks/useCustomerBookings';
import { Card, CardBody } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';
import { Rating } from '@/components/Rating';
import { Textarea } from '@/components/Textarea';
import { EmptyState } from '@/components/EmptyState';
import { SkeletonCard } from '@/components/Skeleton';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';

const TABS = ['All', 'Upcoming', 'Completed', 'Cancelled'] as const;
type Tab = (typeof TABS)[number];

function fmtDate(iso: string | null): string {
  if (!iso) return 'Flexible time';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? 'Flexible time' : d.toLocaleString();
}

function ReviewForm({ bookingId, onDone }: { bookingId: string; onDone: () => void }) {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const submit = async () => {
    setBusy(true);
    setErr(null);
    try {
      await createReview(bookingId, rating, comment || undefined);
      onDone();
    } catch (e) {
      setErr(e instanceof Error ? e.message : 'Could not submit review');
      setBusy(false);
    }
  };

  return (
    <div className="mt-3 w-full space-y-3 rounded-lg border border-border bg-surface-2/40 p-4">
      <Rating rating={rating} interactive onRatingChange={setRating} />
      <Textarea
        placeholder="How was your appointment?"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        fullWidth
      />
      {err && <p className="text-sm text-danger">{err}</p>}
      <div className="flex gap-2">
        <Button size="sm" onClick={submit} isLoading={busy}>Submit review</Button>
        <Button size="sm" variant="ghost" onClick={onDone}>Cancel</Button>
      </div>
    </div>
  );
}

function BookingRow({ booking, onChanged }: { booking: BffBooking; onChanged: (b: BffBooking) => void }) {
  const [busy, setBusy] = useState(false);
  const [reviewing, setReviewing] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  const cancel = async () => {
    setBusy(true);
    try {
      onChanged(await updateBookingStatus(booking.id, 'CUSTOMER_ABORTED'));
    } finally {
      setBusy(false);
    }
  };

  return (
    <Card variant="interactive">
      <CardBody className="flex flex-wrap items-center gap-4">
        <div className="text-3xl">💅</div>
        <div className="min-w-0 flex-1">
          <p className="font-semibold text-fg">Booking {booking.id.slice(0, 8)}</p>
          <p className="text-sm text-muted">{fmtDate(booking.scheduled_start ?? booking.scheduled_at)}</p>
        </div>
        <Badge variant={statusBadgeVariant(booking.status)}>{statusLabel(booking.status)}</Badge>
        <div className="flex gap-2">
          {isCancellable(booking.status) && (
            <Button size="sm" variant="outline" onClick={cancel} isLoading={busy}>Cancel</Button>
          )}
          {booking.status === 'COMPLETED' && !reviewed && (
            <Button size="sm" onClick={() => setReviewing((v) => !v)}>Review</Button>
          )}
          {reviewed && <span className="self-center text-sm text-success">Reviewed ✓</span>}
        </div>
        {reviewing && !reviewed && (
          <ReviewForm bookingId={booking.id} onDone={() => { setReviewing(false); setReviewed(true); }} />
        )}
      </CardBody>
    </Card>
  );
}

export default function BookingsPage() {
  const { bookings, loading, error, patch } = useCustomerBookings();
  const [tab, setTab] = useState<Tab>('All');

  const filtered = useMemo(
    () => bookings.filter((b) => tab === 'All' || bookingGroup(b.status) === (tab as BookingGroup)),
    [bookings, tab]
  );

  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-4xl">
        <h1 className="h1 text-fg mb-2">My Bookings</h1>
        <p className="text-muted mb-6">Track and manage your appointments</p>

        <div className="mb-6 flex gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
                tab === t ? 'bg-accent text-accent-fg' : 'text-muted hover:bg-surface-2'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {error && <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 p-4 text-danger">{error}</div>}

        {loading ? (
          <div className="space-y-3">
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : filtered.length === 0 ? (
          <EmptyState
            icon="📅"
            title="No bookings here"
            description="When you book an appointment it'll show up in this list."
            action={<Link href="/book"><Button>Book an appointment</Button></Link>}
          />
        ) : (
          <StaggerGroup className="space-y-3">
            {filtered.map((b) => (
              <StaggerItem key={b.id}>
                <BookingRow booking={b} onChanged={patch} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        )}
      </div>
    </main>
  );
}
