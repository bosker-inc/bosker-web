import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import type { BffBooking } from '@/lib/types';

// Mock the API module the component depends on.
vi.mock('@/lib/technician-api', () => ({
  getTechnicianBookings: vi.fn(),
  acceptBooking: vi.fn(),
  rejectBooking: vi.fn(),
  markBookingDone: vi.fn(),
}));

import {
  getTechnicianBookings,
  acceptBooking,
  rejectBooking,
  markBookingDone,
} from '@/lib/technician-api';
import { TechnicianBookingsList } from './TechnicianBookingsList';

const mockGet = vi.mocked(getTechnicianBookings);
const mockAccept = vi.mocked(acceptBooking);
const mockReject = vi.mocked(rejectBooking);
const mockDone = vi.mocked(markBookingDone);

function booking(overrides: Partial<BffBooking> = {}): BffBooking {
  return {
    id: 'bk-offer',
    customer_id: 'cust-1',
    status: 'FIND_TECHNICIAN',
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
    ...overrides,
  };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe('TechnicianBookingsList', () => {
  it('renders rows after loading', async () => {
    // Heading shows id.slice(0, 8), so keep the second id short enough to render whole.
    mockGet.mockResolvedValue([booking(), booking({ id: 'bk-2', status: 'IN_PROGRESS' })]);
    render(<TechnicianBookingsList />);

    expect(await screen.findByText(/bk-offer/i)).toBeInTheDocument();
    expect(screen.getByText(/bk-2/i)).toBeInTheDocument();
    expect(screen.getByText('New offer')).toBeInTheDocument();
    expect(screen.getByText('In progress')).toBeInTheDocument();
  });

  it('shows an empty state when there are no bookings', async () => {
    mockGet.mockResolvedValue([]);
    render(<TechnicianBookingsList />);
    expect(await screen.findByText(/no bookings here yet/i)).toBeInTheDocument();
  });

  it('surfaces a load error', async () => {
    mockGet.mockRejectedValue(new Error('boom'));
    render(<TechnicianBookingsList />);
    expect(await screen.findByText('boom')).toBeInTheDocument();
  });

  it('filters to offers when the Offers tab is selected', async () => {
    mockGet.mockResolvedValue([
      booking({ id: 'bk-offer' }),
      booking({ id: 'bk-2', status: 'IN_PROGRESS' }),
    ]);
    render(<TechnicianBookingsList />);
    await screen.findByText(/bk-offer/i);

    fireEvent.click(screen.getByRole('button', { name: 'Offers' }));

    expect(screen.getByText(/bk-offer/i)).toBeInTheDocument();
    expect(screen.queryByText(/bk-2/i)).not.toBeInTheDocument();
  });

  it('accepts an offer and patches the row to In progress', async () => {
    mockGet.mockResolvedValue([booking()]);
    mockAccept.mockResolvedValue(booking({ status: 'IN_PROGRESS' }));
    render(<TechnicianBookingsList />);
    await screen.findByText(/bk-offer/i);

    fireEvent.click(screen.getByRole('button', { name: 'Accept' }));

    await waitFor(() => expect(mockAccept).toHaveBeenCalledWith('bk-offer'));
    expect(await screen.findByText('In progress')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Mark done' })).toBeInTheDocument();
  });

  it('declines an offer and removes the row', async () => {
    mockGet.mockResolvedValue([booking()]);
    mockReject.mockResolvedValue(true);
    render(<TechnicianBookingsList />);
    await screen.findByText(/bk-offer/i);

    fireEvent.click(screen.getByRole('button', { name: 'Decline' }));

    await waitFor(() => expect(mockReject).toHaveBeenCalledWith('bk-offer'));
    await waitFor(() => expect(screen.queryByText(/bk-offer/i)).not.toBeInTheDocument());
  });

  it('marks an active booking done and shows Completed', async () => {
    mockGet.mockResolvedValue([booking({ status: 'IN_PROGRESS' })]);
    mockDone.mockResolvedValue(booking({ status: 'COMPLETED' }));
    render(<TechnicianBookingsList />);
    await screen.findByText(/bk-offer/i);

    fireEvent.click(screen.getByRole('button', { name: 'Mark done' }));

    await waitFor(() => expect(mockDone).toHaveBeenCalledWith('bk-offer'));
    // Scope to the badge (a <span>) — "Completed" is also a filter tab (a <button>).
    expect(await screen.findByText('Completed', { selector: 'span' })).toBeInTheDocument();
    // No further per-row actions once completed.
    expect(screen.queryByRole('button', { name: 'Mark done' })).not.toBeInTheDocument();
  });
});
