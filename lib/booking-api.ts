import { request } from '@/lib/api';
import { BffBooking, BffBookingStatus } from '@/lib/types';

// GraphQL operations for the customer booking flow, against the BFF.
// The field set mirrors the extended BookingItem (matching-engine view included).

const BOOKING_FIELDS = `
  id customer_id status service_id technician_id scheduled_at
  state location_lat location_long scheduled_start scheduled_end
  created_at updated_at
`;

export interface CategoryWithServices {
  id: string;
  name: string;
  services: { id: string; name: string }[];
}

export async function getCategoriesWithServices(): Promise<CategoryWithServices[]> {
  const data = await request<{ getAllCategoriesWithServices: CategoryWithServices[] }>(
    `{ getAllCategoriesWithServices { id name services { id name } } }`
  );
  return data.getAllCategoriesWithServices;
}

export async function initiateBooking(serviceId?: string): Promise<BffBooking> {
  const data = await request<{ initiateBooking: BffBooking }>(
    `mutation ($input: InitiateBookingInput!) { initiateBooking(input: $input) { ${BOOKING_FIELDS} } }`,
    { input: { service_id: serviceId ?? null } }
  );
  return data.initiateBooking;
}

export interface BookingDetailsInput {
  service_ids?: string[];
  sub_services?: { id: string; name: string }[];
  state?: string;
  location_lat?: number;
  location_long?: number;
  scheduled_start?: string;
  scheduled_end?: string;
}

export async function updateBookingDetails(id: string, input: BookingDetailsInput): Promise<BffBooking> {
  const data = await request<{ updateBookingDetails: BffBooking }>(
    `mutation ($id: String!, $input: UpdateBookingDetailsInput!) { updateBookingDetails(id: $id, input: $input) { ${BOOKING_FIELDS} } }`,
    { id, input }
  );
  return data.updateBookingDetails;
}

export async function updateBookingStatus(id: string, status: BffBookingStatus): Promise<BffBooking> {
  const data = await request<{ updateBookingStatus: BffBooking }>(
    `mutation ($id: String!, $input: UpdateBookingStatusInput!) { updateBookingStatus(id: $id, input: $input) { ${BOOKING_FIELDS} } }`,
    { id, input: { status } }
  );
  return data.updateBookingStatus;
}

export async function getBookingById(id: string): Promise<BffBooking> {
  const data = await request<{ getBookingById: BffBooking }>(
    `query ($id: String!) { getBookingById(id: $id) { ${BOOKING_FIELDS} } }`,
    { id }
  );
  return data.getBookingById;
}

export const BOOKING_UPDATED_SUBSCRIPTION = `
  subscription ($bookingId: String!) {
    onBookingUpdated(bookingId: $bookingId) { ${BOOKING_FIELDS} }
  }
`;
