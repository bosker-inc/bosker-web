import { BffBookingStatus } from '@/lib/types';

export type BookingGroup = 'Upcoming' | 'Completed' | 'Cancelled';

const UPCOMING: BffBookingStatus[] = [
  'INITIATED',
  'CHOOSE_SERVICE',
  'CHOOSE_LOCATION',
  'CHOOSE_TIME',
  'SUMMARY',
  'PAYMENTS',
  'FIND_TECHNICIAN',
  'SELECT_TECHNICIAN',
  'IN_PROGRESS',
];

const CANCELLED: BffBookingStatus[] = ['CUSTOMER_ABORTED', 'TECHNICIAN_ABORTED', 'NO_TECHNICIAN_FOUND'];

export function bookingGroup(status: BffBookingStatus): BookingGroup {
  if (status === 'COMPLETED') return 'Completed';
  if (CANCELLED.includes(status)) return 'Cancelled';
  return 'Upcoming';
}

/** A customer may cancel any live (upcoming, non-terminal) booking. */
export function isCancellable(status: BffBookingStatus): boolean {
  return UPCOMING.includes(status);
}

const LABELS: Partial<Record<BffBookingStatus, string>> = {
  FIND_TECHNICIAN: 'Finding technician',
  IN_PROGRESS: 'In progress',
  COMPLETED: 'Completed',
  NO_TECHNICIAN_FOUND: 'No technician found',
  CUSTOMER_ABORTED: 'Cancelled',
  TECHNICIAN_ABORTED: 'Cancelled by technician',
};

export function statusLabel(status: BffBookingStatus): string {
  return LABELS[status] ?? status.replace(/_/g, ' ').toLowerCase();
}

export function statusBadgeVariant(status: BffBookingStatus): 'success' | 'warning' | 'error' | 'info' {
  if (status === 'COMPLETED') return 'success';
  if (status === 'IN_PROGRESS' || status === 'FIND_TECHNICIAN') return 'info';
  if (CANCELLED.includes(status)) return 'error';
  return 'warning';
}
