'use client';

import { useCallback, useEffect, useState } from 'react';
import { BffBooking } from '@/lib/types';
import { getCustomerBookings } from '@/lib/booking-api';

/** The signed-in customer's bookings, with a refetch + optimistic patch helper. */
export function useCustomerBookings() {
  const [bookings, setBookings] = useState<BffBooking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setBookings(await getCustomerBookings());
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load bookings');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  const patch = useCallback((updated: BffBooking) => {
    setBookings((prev) => prev.map((b) => (b.id === updated.id ? updated : b)));
  }, []);

  return { bookings, loading, error, refetch, patch };
}
