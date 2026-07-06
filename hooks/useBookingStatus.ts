'use client';

import { useEffect, useState } from 'react';
import { BffBooking } from '@/lib/types';
import { BOOKING_UPDATED_SUBSCRIPTION, getBookingById } from '@/lib/booking-api';
import { subscribe } from '@/lib/subscriptions';

/**
 * Live view of a single booking: hydrates once over HTTP, then patches from the
 * onBookingUpdated GraphQL subscription so the customer sees matching → in-progress
 * → completed transitions in realtime.
 */
export function useBookingStatus(bookingId: string | null) {
  const [booking, setBooking] = useState<BffBooking | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) return;
    let active = true;

    getBookingById(bookingId)
      .then((b) => active && setBooking(b))
      .catch((e) => active && setError(e instanceof Error ? e.message : 'Failed to load booking'));

    const unsubscribe = subscribe<{ onBookingUpdated: BffBooking }>(
      BOOKING_UPDATED_SUBSCRIPTION,
      { bookingId },
      (data) => active && setBooking(data.onBookingUpdated),
      (e) => active && setError(e instanceof Error ? e.message : 'Realtime connection error')
    );

    return () => {
      active = false;
      unsubscribe();
    };
  }, [bookingId]);

  return { booking, error };
}
