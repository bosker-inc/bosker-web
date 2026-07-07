import { request } from '@/lib/api';

// Customer-side reviews for completed bookings (BFF review service).

export interface BffReview {
  id: string;
  booking_id: string;
  rating: number;
  comment: string | null;
}

const REVIEW_FIELDS = `id booking_id rating comment`;

export async function getReviewByBooking(bookingId: string): Promise<BffReview | null> {
  const data = await request<{ getCustomerReviewByBooking: BffReview | null }>(
    `query ($bookingId: String!) { getCustomerReviewByBooking(bookingId: $bookingId) { ${REVIEW_FIELDS} } }`,
    { bookingId }
  );
  return data.getCustomerReviewByBooking;
}

export async function createReview(bookingId: string, rating: number, comment?: string): Promise<BffReview> {
  const data = await request<{ createReview: BffReview }>(
    `mutation ($input: CreateReviewInput!) { createReview(input: $input) { ${REVIEW_FIELDS} } }`,
    { input: { booking_id: bookingId, rating, comment } }
  );
  return data.createReview;
}
