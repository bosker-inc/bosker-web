import { describe, it, expect, vi, beforeEach } from 'vitest';
import type { BffBooking } from '@/lib/types';

// Mock the single GraphQL transport so we assert query + variables, not network.
vi.mock('@/lib/api', () => ({ request: vi.fn() }));
import { request } from '@/lib/api';
import {
  getTechnicianBookings,
  acceptBooking,
  rejectBooking,
  markBookingDone,
} from '@/lib/technician-api';

const mockRequest = vi.mocked(request);

function booking(overrides: Partial<BffBooking> = {}): BffBooking {
  return {
    id: 'bk-1',
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
  mockRequest.mockReset();
});

describe('getTechnicianBookings', () => {
  it('queries with pagination and returns the list', async () => {
    const rows = [booking(), booking({ id: 'bk-2' })];
    mockRequest.mockResolvedValue({ getTechnicianBookings: rows });

    const result = await getTechnicianBookings(5, 2);

    expect(result).toEqual(rows);
    const [query, variables] = mockRequest.mock.calls[0];
    expect(query).toContain('getTechnicianBookings');
    expect(variables).toEqual({ pagination: { limit: 5, offset: 2 } });
  });

  it('defaults pagination when called without args', async () => {
    mockRequest.mockResolvedValue({ getTechnicianBookings: [] });
    await getTechnicianBookings();
    expect(mockRequest.mock.calls[0][1]).toEqual({ pagination: { limit: 20, offset: 0 } });
  });
});

describe('technician booking mutations', () => {
  it('acceptBooking sends bookingId and returns the updated booking', async () => {
    const updated = booking({ status: 'IN_PROGRESS' });
    mockRequest.mockResolvedValue({ acceptBooking: updated });

    const result = await acceptBooking('bk-1');

    expect(result).toEqual(updated);
    const [query, variables] = mockRequest.mock.calls[0];
    expect(query).toContain('acceptBooking');
    expect(variables).toEqual({ bookingId: 'bk-1' });
  });

  it('rejectBooking returns the boolean result', async () => {
    mockRequest.mockResolvedValue({ rejectBooking: true });
    await expect(rejectBooking('bk-1')).resolves.toBe(true);
    expect(mockRequest.mock.calls[0][1]).toEqual({ bookingId: 'bk-1' });
  });

  it('markBookingDone returns the completed booking', async () => {
    const done = booking({ status: 'COMPLETED' });
    mockRequest.mockResolvedValue({ markBookingDone: done });
    await expect(markBookingDone('bk-1')).resolves.toEqual(done);
  });
});
