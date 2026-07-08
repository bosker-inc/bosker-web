import { request } from '@/lib/api';
import { BffBooking } from '@/lib/types';

// GraphQL operations for the technician portal, against the BFF.

const BOOKING_FIELDS = `
  id customer_id status service_id technician_id scheduled_at
  state location_lat location_long scheduled_start scheduled_end
  created_at updated_at
`;

export interface TechnicianProfile {
  id: string;
  name: string;
  isReady: boolean;
  status: string;
  incomingBooking: BffBooking | null;
}

export async function getTechnicianProfile(): Promise<TechnicianProfile> {
  const data = await request<{ getTechnicianProfile: TechnicianProfile }>(
    `{ getTechnicianProfile { id name isReady status incomingBooking { ${BOOKING_FIELDS} } } }`
  );
  return data.getTechnicianProfile;
}

export async function toggleReady(isReady: boolean): Promise<boolean> {
  const data = await request<{ toggleReady: { isReady: boolean } }>(
    `mutation ($input: ToggleReadyInput!) { toggleReady(input: $input) { isReady } }`,
    { input: { isReady } }
  );
  return data.toggleReady.isReady;
}

export async function getTechnicianBookings(limit = 20, offset = 0): Promise<BffBooking[]> {
  const data = await request<{ getTechnicianBookings: BffBooking[] }>(
    `query ($pagination: PaginationField) { getTechnicianBookings(pagination: $pagination) { ${BOOKING_FIELDS} } }`,
    { pagination: { limit, offset } }
  );
  return data.getTechnicianBookings;
}

export async function acceptBooking(bookingId: string): Promise<BffBooking> {
  const data = await request<{ acceptBooking: BffBooking }>(
    `mutation ($bookingId: String!) { acceptBooking(bookingId: $bookingId) { ${BOOKING_FIELDS} } }`,
    { bookingId }
  );
  return data.acceptBooking;
}

export async function rejectBooking(bookingId: string): Promise<boolean> {
  const data = await request<{ rejectBooking: boolean }>(
    `mutation ($bookingId: String!) { rejectBooking(bookingId: $bookingId) }`,
    { bookingId }
  );
  return data.rejectBooking;
}

export async function markBookingDone(bookingId: string): Promise<BffBooking> {
  const data = await request<{ markBookingDone: BffBooking }>(
    `mutation ($bookingId: String!) { markBookingDone(bookingId: $bookingId) { ${BOOKING_FIELDS} } }`,
    { bookingId }
  );
  return data.markBookingDone;
}

export const TECHNICIAN_ACTIVE_BOOKING_SUBSCRIPTION = `
  subscription ($technicianId: String!) {
    onTechnicianActiveBookingUpdated(technicianId: $technicianId) { ${BOOKING_FIELDS} }
  }
`;
