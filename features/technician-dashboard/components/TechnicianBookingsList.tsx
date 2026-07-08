'use client';

import { useCallback, useEffect, useMemo, useState } from 'react';
import { BffBooking, BffBookingStatus } from '@/lib/types';
import {
  acceptBooking,
  getTechnicianBookings,
  markBookingDone,
  rejectBooking,
} from '@/lib/technician-api';
import { Card, CardBody } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';

type BadgeVariant = 'success' | 'warning' | 'error' | 'info' | 'neutral';

// How each BFF booking status renders in the technician's list.
const STATUS_META: Partial<Record<BffBookingStatus, { label: string; variant: BadgeVariant }>> = {
  FIND_TECHNICIAN: { label: 'New offer', variant: 'warning' },
  IN_PROGRESS: { label: 'In progress', variant: 'success' },
  COMPLETED: { label: 'Completed', variant: 'info' },
  NO_TECHNICIAN_FOUND: { label: 'Expired', variant: 'error' },
  CUSTOMER_ABORTED: { label: 'Cancelled', variant: 'error' },
  TECHNICIAN_ABORTED: { label: 'Cancelled', variant: 'error' },
};

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'FIND_TECHNICIAN', label: 'Offers' },
  { key: 'IN_PROGRESS', label: 'Active' },
  { key: 'COMPLETED', label: 'Completed' },
] as const;

type TabKey = (typeof TABS)[number]['key'];

function formatWhen(booking: BffBooking): string {
  const iso = booking.scheduled_start ?? booking.scheduled_at;
  if (!iso) return 'Flexible time';
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? 'Flexible time'
    : d.toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' });
}

export function TechnicianBookingsList() {
  const [bookings, setBookings] = useState<BffBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [tab, setTab] = useState<TabKey>('all');
  const [busyId, setBusyId] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBookings(await getTechnicianBookings());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Run a per-row action, patching the affected booking in place on success.
  const runOnRow = useCallback(
    async (id: string, fn: () => Promise<BffBooking | boolean>) => {
      setBusyId(id);
      setError(null);
      try {
        const result = await fn();
        if (typeof result === 'boolean') {
          // reject clears the assignment — drop it from this technician's list
          setBookings((prev) => prev.filter((b) => b.id !== id));
        } else {
          setBookings((prev) => prev.map((b) => (b.id === id ? result : b)));
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Action failed');
      } finally {
        setBusyId(null);
      }
    },
    []
  );

  const visible = useMemo(
    () => (tab === 'all' ? bookings : bookings.filter((b) => b.status === tab)),
    [bookings, tab]
  );

  return (
    <div className="space-y-6">
      {/* Tabs */}
      <div className="flex gap-4 border-b border-border">
        {TABS.map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setTab(key)}
            className={`px-4 py-3 font-semibold border-b-2 transition-colors ${
              tab === key
                ? 'border-accent text-accent'
                : 'border-transparent text-muted hover:text-fg'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {error && <p className="text-danger text-sm">{error}</p>}

      {loading ? (
        <p className="text-muted">Loading bookings…</p>
      ) : visible.length === 0 ? (
        <p className="text-muted">No bookings here yet.</p>
      ) : (
        <div className="space-y-4">
          {visible.map((booking) => {
            const meta = STATUS_META[booking.status] ?? {
              label: booking.status,
              variant: 'neutral' as BadgeVariant,
            };
            const busy = busyId === booking.id;
            return (
              <Card key={booking.id} hoverable>
                <CardBody>
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-fg">
                        {booking.service_id ?? 'Service'} · Booking {booking.id.slice(0, 8)}
                      </h3>
                      <p className="text-sm text-muted mt-1">
                        {booking.state ?? '—'} · {formatWhen(booking)}
                      </p>
                    </div>

                    <div className="flex flex-col items-end gap-3">
                      <Badge variant={meta.variant} size="sm">
                        {meta.label}
                      </Badge>
                      <div className="flex gap-2">
                        {booking.status === 'FIND_TECHNICIAN' && (
                          <>
                            <Button
                              size="sm"
                              onClick={() => runOnRow(booking.id, () => acceptBooking(booking.id))}
                              isLoading={busy}
                            >
                              Accept
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => runOnRow(booking.id, () => rejectBooking(booking.id))}
                              isLoading={busy}
                            >
                              Decline
                            </Button>
                          </>
                        )}
                        {booking.status === 'IN_PROGRESS' && (
                          <Button
                            size="sm"
                            onClick={() => runOnRow(booking.id, () => markBookingDone(booking.id))}
                            isLoading={busy}
                          >
                            Mark done
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
