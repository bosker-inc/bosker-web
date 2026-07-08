import { loadStripe, Stripe } from '@stripe/stripe-js';

import { env } from '@/env';

// Lazily load Stripe.js once and reuse the promise across the app. Returns null
// when no publishable key is configured so callers can render a clear message
// instead of crashing.
let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> | null {
  const key = env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  if (!key) return null;
  if (!stripePromise) {
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}

export const isStripeConfigured = (): boolean => Boolean(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);
