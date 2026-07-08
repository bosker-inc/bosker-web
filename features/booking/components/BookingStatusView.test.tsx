import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import type { BffBooking } from '@/lib/types';

// The view is driven entirely by this hook; mock it to control the booking state.
vi.mock('@/hooks/useBookingStatus', () => ({ useBookingStatus: vi.fn() }));
import { useBookingStatus } from '@/hooks/useBookingStatus';
import { BookingStatusView } from './BookingStatusView';

const mockHook = vi.mocked(useBookingStatus);

function booking(status: BffBooking['status']): BffBooking {
  return {
    id: 'bk-1',
    customer_id: 'cust-1',
    status,
    service_id: 'svc-haircut',
    technician_id: 'tech-1',
    scheduled_at: null,
    state: 'NY',
    location_lat: 40.7128,
    location_long: -74.006,
    scheduled_start: null,
    scheduled_end: null,
    created_at: '2026-07-01T00:00:00Z',
    updated_at: '2026-07-01T00:00:00Z',
  };
}

// Stub window.location so we can assert navigation without jsdom actually navigating.
const originalLocation = window.location;
beforeEach(() => {
  vi.clearAllMocks();
  Object.defineProperty(window, 'location', {
    value: { href: '' },
    writable: true,
    configurable: true,
  });
});
afterEach(() => {
  Object.defineProperty(window, 'location', { value: originalLocation, configurable: true });
});

describe('BookingStatusView', () => {
  it('renders the error state', () => {
    mockHook.mockReturnValue({ booking: null, error: 'nope' });
    render(<BookingStatusView bookingId="bk-1" />);
    expect(screen.getByText('nope')).toBeInTheDocument();
  });

  it('renders the loading state before a booking arrives', () => {
    mockHook.mockReturnValue({ booking: null, error: null });
    render(<BookingStatusView bookingId="bk-1" />);
    expect(screen.getByText(/loading booking/i)).toBeInTheDocument();
  });

  it('shows Close booking and Book again on COMPLETED', () => {
    mockHook.mockReturnValue({ booking: booking('COMPLETED'), error: null });
    render(<BookingStatusView bookingId="bk-1" />);
    expect(screen.getByText(/booking completed/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Close booking' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Book again' })).toBeInTheDocument();
  });

  it('Close booking navigates to the bookings list', () => {
    mockHook.mockReturnValue({ booking: booking('COMPLETED'), error: null });
    render(<BookingStatusView bookingId="bk-1" />);
    fireEvent.click(screen.getByRole('button', { name: 'Close booking' }));
    expect(window.location.href).toBe('/bookings');
  });

  it('shows only Book again on NO_TECHNICIAN_FOUND', () => {
    mockHook.mockReturnValue({ booking: booking('NO_TECHNICIAN_FOUND'), error: null });
    render(<BookingStatusView bookingId="bk-1" />);
    expect(screen.getByRole('button', { name: 'Book again' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Close booking' })).not.toBeInTheDocument();
  });

  it('shows no close/book actions while a technician is being found', () => {
    mockHook.mockReturnValue({ booking: booking('FIND_TECHNICIAN'), error: null });
    render(<BookingStatusView bookingId="bk-1" />);
    expect(screen.getByText(/finding a technician/i)).toBeInTheDocument();
    expect(screen.queryByRole('button')).not.toBeInTheDocument();
  });
});
