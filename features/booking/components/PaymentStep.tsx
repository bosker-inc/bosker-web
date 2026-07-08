'use client';

import { useEffect, useMemo, useState } from 'react';
import { useTheme } from 'next-themes';
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from '@stripe/react-stripe-js';
import type { Appearance } from '@stripe/stripe-js';

import { Button } from '@/components/Button';
import { env } from '@/env';
import { createPaymentIntent, formatAmount, PaymentIntent } from '@/lib/payment-api';
import { getStripe, isStripeConfigured } from '@/lib/stripe';

interface PaymentStepProps {
  bookingId: string;
  onSuccess: () => void;
  onBack: () => void;
}

// Inner form: rendered inside <Elements> so it can access the Stripe/Elements
// context. Collects card details via the PaymentElement and confirms the intent.
function CheckoutForm({
  intent,
  onSuccess,
  onBack,
}: {
  intent: PaymentIntent;
  onSuccess: () => void;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handlePay = async () => {
    if (!stripe || !elements) return;
    setSubmitting(true);
    setError(null);

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setError(submitError.message ?? 'Please check your payment details.');
      setSubmitting(false);
      return;
    }

    const { error: confirmError, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Only used for redirect-based methods (e.g. bank debits). Cards confirm
        // inline thanks to redirect: 'if_required'.
        return_url: `${env.NEXT_PUBLIC_APP_URL}/client/book`,
      },
      redirect: 'if_required',
    });

    if (confirmError) {
      setError(confirmError.message ?? 'Payment could not be completed.');
      setSubmitting(false);
      return;
    }

    if (paymentIntent && (paymentIntent.status === 'succeeded' || paymentIntent.status === 'processing')) {
      onSuccess();
      return;
    }

    setError('Payment was not completed. Please try again.');
    setSubmitting(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-baseline justify-between">
        <span className="text-muted">Amount due</span>
        <span className="text-xl font-semibold text-fg">{formatAmount(intent.amount, intent.currency)}</span>
      </div>

      <PaymentElement options={{ layout: 'tabs' }} />

      {error && (
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">{error}</div>
      )}

      <div className="flex justify-between pt-2">
        <Button variant="ghost" onClick={onBack} disabled={submitting}>
          Back
        </Button>
        <Button onClick={handlePay} isLoading={submitting} disabled={!stripe || !elements}>
          Pay {formatAmount(intent.amount, intent.currency)}
        </Button>
      </div>
    </div>
  );
}

export function PaymentStep({ bookingId, onSuccess, onBack }: PaymentStepProps) {
  const { resolvedTheme } = useTheme();
  const [intent, setIntent] = useState<PaymentIntent | null>(null);
  const [error, setError] = useState<string | null>(null);
  const stripePromise = useMemo(() => getStripe(), []);

  useEffect(() => {
    let active = true;
    if (!isStripeConfigured()) return;
    createPaymentIntent(bookingId)
      .then((result) => {
        if (active) setIntent(result);
      })
      .catch((e) => {
        if (active) setError(e instanceof Error ? e.message : 'Failed to start payment');
      });
    return () => {
      active = false;
    };
  }, [bookingId]);

  if (!isStripeConfigured() || !stripePromise) {
    return (
      <div className="p-4 bg-warning/10 border border-warning/30 rounded-lg text-fg text-sm">
        Payments are not configured. Set <code>NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY</code> to enable the payment step.
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="p-3 bg-danger/10 border border-danger/30 rounded-lg text-danger text-sm">{error}</div>
        <Button variant="ghost" onClick={onBack}>
          Back
        </Button>
      </div>
    );
  }

  if (!intent) {
    return <p className="text-muted">Preparing secure payment…</p>;
  }

  const appearance: Appearance = { theme: resolvedTheme === 'dark' ? 'night' : 'stripe' };

  return (
    <Elements stripe={stripePromise} options={{ clientSecret: intent.clientSecret, appearance }}>
      <CheckoutForm intent={intent} onSuccess={onSuccess} onBack={onBack} />
    </Elements>
  );
}
