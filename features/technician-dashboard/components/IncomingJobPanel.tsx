'use client';

import { useCallback, useEffect, useState } from 'react';
import { BffBooking } from '@/lib/types';
import {
  TechnicianProfile,
  TECHNICIAN_ACTIVE_BOOKING_SUBSCRIPTION,
  acceptBooking,
  getTechnicianProfile,
  markBookingDone,
  rejectBooking,
  toggleReady,
} from '@/lib/technician-api';
import { subscribe } from '@/lib/subscriptions';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Badge } from '@/components/Badge';

/**
 * Live technician work panel: ready toggle, the current offer (FIND_TECHNICIAN),
 * and the active job (IN_PROGRESS). Hydrates the profile once, then patches the
 * active booking from the onTechnicianActiveBookingUpdated subscription.
 */
export function IncomingJobPanel() {
  const [profile, setProfile] = useState<TechnicianProfile | null>(null);
  const [booking, setBooking] = useState<BffBooking | null>(null);
  const [ready, setReady] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    getTechnicianProfile()
      .then((p) => {
        if (!active) return;
        setProfile(p);
        setReady(p.isReady);
        setBooking(p.incomingBooking);
      })
      .catch((e) => active && setError(e instanceof Error ? e.message : 'Failed to load profile'));
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!profile?.id) return;
    let active = true;
    const unsubscribe = subscribe<{ onTechnicianActiveBookingUpdated: BffBooking }>(
      TECHNICIAN_ACTIVE_BOOKING_SUBSCRIPTION,
      { technicianId: profile.id },
      (data) => {
        if (!active) return;
        const b = data.onTechnicianActiveBookingUpdated;
        // Drop bookings that left this technician (rejected/terminal), else track it.
        const gone = b.technician_id !== profile.id || ['COMPLETED', 'CUSTOMER_ABORTED', 'TECHNICIAN_ABORTED'].includes(b.status);
        setBooking(gone ? null : b);
      },
      (e) => active && setError(e instanceof Error ? e.message : 'Realtime connection error')
    );
    return () => {
      active = false;
      unsubscribe();
    };
  }, [profile?.id]);

  const run = useCallback(async (fn: () => Promise<unknown>) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Action failed');
    } finally {
      setBusy(false);
    }
  }, []);

  const onToggleReady = () => run(async () => setReady(await toggleReady(!ready)));
  const onAccept = () => booking && run(async () => setBooking(await acceptBooking(booking.id)));
  const onReject = () =>
    booking &&
    run(async () => {
      await rejectBooking(booking.id);
      setBooking(null);
    });
  const onDone = () =>
    booking &&
    run(async () => {
      await markBookingDone(booking.id);
      setBooking(null);
    });

  return (
    <Card variant="emphasis" className="mb-8">
      <CardHeader className="flex items-center justify-between">
        <h2 className="font-semibold text-fg">Work status</h2>
        <Button size="sm" variant={ready ? 'primary' : 'outline'} onClick={onToggleReady} isLoading={busy}>
          {ready ? 'Ready for jobs' : 'Not ready'}
        </Button>
      </CardHeader>
      <CardBody className="space-y-4">
        {error && <p className="text-danger text-sm">{error}</p>}

        {!booking && <p className="text-muted">No active job. You&apos;ll be notified when a booking is offered.</p>}

        {booking && booking.status === 'FIND_TECHNICIAN' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge>New offer</Badge>
              <span className="text-fg font-medium">Booking {booking.id.slice(0, 8)}</span>
            </div>
            <p className="text-sm text-muted">
              {booking.state ?? '—'} · {booking.scheduled_start ?? 'flexible time'}
            </p>
            <div className="flex gap-3">
              <Button onClick={onAccept} isLoading={busy}>Accept</Button>
              <Button variant="outline" onClick={onReject} isLoading={busy}>Decline</Button>
            </div>
          </div>
        )}

        {booking && booking.status === 'IN_PROGRESS' && (
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Badge variant="success">In progress</Badge>
              <span className="text-fg font-medium">Booking {booking.id.slice(0, 8)}</span>
            </div>
            <Button onClick={onDone} isLoading={busy}>Mark done</Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
}
