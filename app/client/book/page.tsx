'use client';

import { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { BookingStatusView } from '@/features/booking/components/BookingStatusView';
import { PaymentStep } from '@/features/booking/components/PaymentStep';
import { ServiceSelector, ServiceSelection } from '@/features/booking/components/ServiceSelector';
import { AddressBook, SelectedLocation } from '@/features/booking/components/AddressBook';
import {
  DateTimePicker,
  TimeWindow,
  deriveEnd,
  DURATION_OPTIONS,
} from '@/features/booking/components/DateTimePicker';
import {
  CategoryWithServices,
  getCategoriesWithServices,
  initiateBooking,
  updateBookingDetails,
  updateBookingStatus,
} from '@/lib/booking-api';

const EASE = [0.22, 1, 0.36, 1] as const;

type Step = 'service' | 'location' | 'time' | 'summary' | 'payment';
const STEPS: { key: Step; label: string }[] = [
  { key: 'service', label: 'Service' },
  { key: 'location', label: 'Location' },
  { key: 'time', label: 'Time' },
  { key: 'summary', label: 'Summary' },
  { key: 'payment', label: 'Payment' },
];

function durationLabel(minutes: number): string {
  return DURATION_OPTIONS.find((d) => d.minutes === minutes)?.label ?? `${minutes} min`;
}

export default function BookPage() {
  const reduce = useReducedMotion();
  const [step, setStep] = useState<Step>('service');
  const [categories, setCategories] = useState<CategoryWithServices[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);

  const [service, setService] = useState<ServiceSelection | null>(null);
  const [location, setLocation] = useState<SelectedLocation | null>(null);
  const [time, setTime] = useState<TimeWindow>({ start: '', durationMinutes: 60 });

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    getCategoriesWithServices()
      .then(setCategories)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load services'))
      .finally(() => setLoadingCategories(false));
  }, []);

  const stepIndex = STEPS.findIndex((s) => s.key === step);

  // Gate progression: each step must be complete before advancing.
  const canAdvance = useMemo(() => {
    if (step === 'service') return Boolean(service?.serviceId);
    if (step === 'location') return Boolean(location && location.lat && location.long);
    if (step === 'time') return Boolean(time.start);
    return true;
  }, [step, service, location, time]);

  const goBack = () => setStep(STEPS[Math.max(stepIndex - 1, 0)].key);

  // Ensure a booking row exists, creating it lazily on first advance so the
  // status can double as a resumable checkpoint.
  const ensureBooking = async (): Promise<string> => {
    if (bookingId) return bookingId;
    const created = await initiateBooking(service?.serviceId);
    setBookingId(created.id);
    return created.id;
  };

  // Persist the current step's data + status, then move to the next step.
  const goNext = async () => {
    if (!canAdvance) return;
    setSubmitting(true);
    setError(null);
    try {
      const id = await ensureBooking();

      if (step === 'service' && service) {
        await updateBookingDetails(id, {
          service_ids: [service.serviceId],
          sub_services: [{ id: service.serviceId, name: service.serviceName }],
        });
        await updateBookingStatus(id, 'CHOOSE_SERVICE');
      }

      if (step === 'location' && location) {
        await updateBookingDetails(id, {
          state: location.state || undefined,
          location_lat: location.lat,
          location_long: location.long,
        });
        await updateBookingStatus(id, 'CHOOSE_LOCATION');
      }

      if (step === 'time' && time.start) {
        await updateBookingDetails(id, {
          scheduled_start: new Date(time.start).toISOString(),
          scheduled_end: deriveEnd(time.start, time.durationMinutes),
        });
        await updateBookingStatus(id, 'CHOOSE_TIME');
      }

      setStep(STEPS[Math.min(stepIndex + 1, STEPS.length - 1)].key);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not save your progress');
    } finally {
      setSubmitting(false);
    }
  };

  // From the summary: mark SUMMARY, persist the full draft, move it into
  // PAYMENTS, then advance to the payment step. Idempotent — reuses the draft
  // if the customer stepped back from payment and returned.
  const proceedToPayment = async () => {
    if (!service) return;
    setSubmitting(true);
    setError(null);
    try {
      const id = await ensureBooking();
      await updateBookingDetails(id, {
        service_ids: [service.serviceId],
        sub_services: [{ id: service.serviceId, name: service.serviceName }],
        state: location?.state || undefined,
        location_lat: location?.lat,
        location_long: location?.long,
        scheduled_start: time.start ? new Date(time.start).toISOString() : undefined,
        scheduled_end: deriveEnd(time.start, time.durationMinutes),
      });
      await updateBookingStatus(id, 'SUMMARY');
      await updateBookingStatus(id, 'PAYMENTS');
      setStep('payment');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create booking');
    } finally {
      setSubmitting(false);
    }
  };

  // After a successful payment: dispatch to a technician and hand off to the
  // live status screen.
  const handlePaymentSuccess = async () => {
    if (!bookingId) return;
    setError(null);
    try {
      await updateBookingStatus(bookingId, 'FIND_TECHNICIAN');
      setConfirmed(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Payment succeeded but dispatch failed. Please contact support.');
    }
  };

  // Once confirmed, hand off to the live status screen.
  if (confirmed && bookingId) {
    return (
      <main className="min-h-screen bg-bg p-8">
        <div className="mx-auto max-w-xl">
          <h1 className="h1 mb-6 text-fg">Your booking</h1>
          <BookingStatusView bookingId={bookingId} />
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-bg p-8">
      <div className="mx-auto max-w-xl">
        <h1 className="h1 mb-2 text-fg">Book an appointment</h1>
        <p className="mb-2 text-muted">
          Step {stepIndex + 1} of {STEPS.length}: {STEPS[stepIndex].label}
        </p>

        {/* Animated progress bar */}
        <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
          <motion.div
            className="h-full rounded-full bg-accent"
            initial={false}
            animate={{ width: `${((stepIndex + 1) / STEPS.length) * 100}%` }}
            transition={{ duration: reduce ? 0 : 0.4, ease: EASE }}
          />
        </div>

        {error && (
          <div className="mb-4 rounded-lg border border-danger/30 bg-danger/10 p-4 text-danger">{error}</div>
        )}

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-fg">{STEPS[stepIndex].label}</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={reduce ? { opacity: 0 } : { opacity: 0, x: 24 }}
                animate={reduce ? { opacity: 1 } : { opacity: 1, x: 0 }}
                exit={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                transition={{ duration: 0.28, ease: EASE }}
                className="space-y-4"
              >
                {step === 'service' && (
                  <ServiceSelector
                    categories={categories}
                    loading={loadingCategories}
                    value={service}
                    onChange={setService}
                  />
                )}

                {step === 'location' && <AddressBook value={location} onChange={setLocation} />}

                {step === 'time' && <DateTimePicker value={time} onChange={setTime} />}

                {step === 'summary' && (
                  <div className="space-y-3 text-fg">
                    <SummaryRow label="Service" value={service?.serviceName || '—'} />
                    <SummaryRow
                      label="Location"
                      value={
                        location?.fullAddress
                          ? `${location.fullAddress}${location.state ? ` (${location.state})` : ''}`
                          : location
                            ? `${location.lat.toFixed(4)}, ${location.long.toFixed(4)}`
                            : '—'
                      }
                    />
                    <SummaryRow
                      label="When"
                      value={
                        time.start
                          ? `${new Date(time.start).toLocaleString()} · ${durationLabel(time.durationMinutes)}`
                          : '—'
                      }
                    />
                    <p className="text-xs text-muted">You&apos;ll pay securely with Stripe on the next step.</p>
                  </div>
                )}

                {step === 'payment' && bookingId && (
                  <PaymentStep bookingId={bookingId} onSuccess={handlePaymentSuccess} onBack={goBack} />
                )}
              </motion.div>
            </AnimatePresence>
          </CardBody>
        </Card>

        {/* The payment step owns its own Back/Pay controls, so hide the wizard nav there. */}
        {step !== 'payment' && (
          <div className="mt-6 flex justify-between">
            <Button variant="ghost" onClick={goBack} disabled={step === 'service' || submitting}>
              Back
            </Button>
            {step === 'summary' ? (
              <Button onClick={proceedToPayment} isLoading={submitting} disabled={!service?.serviceId}>
                Continue to payment
              </Button>
            ) : (
              <Button onClick={goNext} isLoading={submitting} disabled={!canAdvance}>
                Next
              </Button>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="text-muted">{label}:</span> {value}
    </p>
  );
}
