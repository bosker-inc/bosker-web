import { request } from '@/lib/api';

// Opens a Stripe PaymentIntent for a booking. The BFF (via bosker-api) computes
// the amount from the booking's selected services and returns the client secret
// the browser uses to confirm the payment with Stripe Elements.
export interface PaymentIntent {
  clientSecret: string;
  paymentIntentId: string;
  amount: number;
  currency: string;
}

export async function createPaymentIntent(bookingId: string): Promise<PaymentIntent> {
  const data = await request<{ createPaymentIntent: PaymentIntent }>(
    `mutation ($input: CreatePaymentIntentInput!) {
      createPaymentIntent(input: $input) {
        clientSecret
        paymentIntentId
        amount
        currency
      }
    }`,
    { input: { bookingId } }
  );
  return data.createPaymentIntent;
}

/** Formats a Stripe amount (smallest currency unit) as a display string, e.g. 4900 → "$49.00". */
export function formatAmount(amount: number, currency: string): string {
  try {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: currency.toUpperCase() }).format(
      amount / 100
    );
  } catch {
    return `${(amount / 100).toFixed(2)} ${currency.toUpperCase()}`;
  }
}
