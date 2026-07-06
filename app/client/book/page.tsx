'use client';

import { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { Button } from '@/components/Button';
import { Input } from '@/components/Input';
import { BookingStatusView } from '@/features/booking/components/BookingStatusView';
import {
  CategoryWithServices,
  getCategoriesWithServices,
  initiateBooking,
  updateBookingDetails,
  updateBookingStatus,
} from '@/lib/booking-api';

type Step = 'service' | 'location' | 'time' | 'summary';
const STEPS: Step[] = ['service', 'location', 'time', 'summary'];

export default function BookPage() {
  const [step, setStep] = useState<Step>('service');
  const [categories, setCategories] = useState<CategoryWithServices[]>([]);
  const [serviceId, setServiceId] = useState<string>('');
  const [serviceName, setServiceName] = useState<string>('');
  const [state, setState] = useState('NY');
  const [lat, setLat] = useState('40.7128');
  const [long, setLong] = useState('-74.006');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  useEffect(() => {
    getCategoriesWithServices()
      .then(setCategories)
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load services'));
  }, []);

  const goNext = () => setStep(STEPS[Math.min(STEPS.indexOf(step) + 1, STEPS.length - 1)]);
  const goBack = () => setStep(STEPS[Math.max(STEPS.indexOf(step) - 1, 0)]);

  const submit = async () => {
    setSubmitting(true);
    setError(null);
    try {
      const created = await initiateBooking(serviceId);
      await updateBookingDetails(created.id, {
        service_ids: [serviceId],
        sub_services: [{ id: serviceId, name: serviceName }],
        state,
        location_lat: Number(lat),
        location_long: Number(long),
        scheduled_start: start ? new Date(start).toISOString() : undefined,
        scheduled_end: end ? new Date(end).toISOString() : undefined,
      });
      // Skip PAYMENTS — go straight to dispatch.
      await updateBookingStatus(created.id, 'FIND_TECHNICIAN');
      setBookingId(created.id);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not create booking');
    } finally {
      setSubmitting(false);
    }
  };

  // Once submitted, hand off to the live status screen.
  if (bookingId) {
    return (
      <main className="p-8 bg-bg min-h-screen">
        <div className="max-w-xl mx-auto">
          <h1 className="h1 text-fg mb-6">Your booking</h1>
          <BookingStatusView bookingId={bookingId} />
        </div>
      </main>
    );
  }

  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-xl mx-auto">
        <h1 className="h1 text-fg mb-2">Book an appointment</h1>
        <p className="text-muted mb-6 capitalize">
          Step {STEPS.indexOf(step) + 1} of {STEPS.length}: {step}
        </p>

        {error && (
          <div className="mb-4 p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger">{error}</div>
        )}

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-fg capitalize">{step}</h2>
          </CardHeader>
          <CardBody className="space-y-4">
            {step === 'service' && (
              <div className="space-y-3">
                {categories.length === 0 && <p className="text-muted">Loading services…</p>}
                {categories.map((cat) => (
                  <div key={cat.id}>
                    <p className="text-sm font-medium text-muted mb-1">{cat.name}</p>
                    <div className="flex flex-wrap gap-2">
                      {cat.services.map((s) => (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => {
                            setServiceId(s.id);
                            setServiceName(s.name);
                          }}
                          className={`rounded-lg border px-3 py-2 text-sm ${
                            serviceId === s.id ? 'border-accent bg-accent/10 text-accent' : 'border-border text-fg'
                          }`}
                        >
                          {s.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {step === 'location' && (
              <div className="grid grid-cols-2 gap-4">
                <Input label="State" value={state} onChange={(e) => setState(e.target.value)} fullWidth />
                <div />
                <Input label="Latitude" value={lat} onChange={(e) => setLat(e.target.value)} fullWidth />
                <Input label="Longitude" value={long} onChange={(e) => setLong(e.target.value)} fullWidth />
              </div>
            )}

            {step === 'time' && (
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Start"
                  type="datetime-local"
                  value={start}
                  onChange={(e) => setStart(e.target.value)}
                  fullWidth
                />
                <Input
                  label="End"
                  type="datetime-local"
                  value={end}
                  onChange={(e) => setEnd(e.target.value)}
                  fullWidth
                />
              </div>
            )}

            {step === 'summary' && (
              <div className="space-y-2 text-fg">
                <p><span className="text-muted">Service:</span> {serviceName || '—'}</p>
                <p><span className="text-muted">Location:</span> {state} ({lat}, {long})</p>
                <p><span className="text-muted">When:</span> {start || '—'} → {end || '—'}</p>
                <p className="text-xs text-muted">Payment is skipped in this preview.</p>
              </div>
            )}
          </CardBody>
        </Card>

        <div className="mt-6 flex justify-between">
          <Button variant="ghost" onClick={goBack} disabled={step === 'service'}>
            Back
          </Button>
          {step === 'summary' ? (
            <Button onClick={submit} isLoading={submitting} disabled={!serviceId}>
              Find a technician
            </Button>
          ) : (
            <Button onClick={goNext} disabled={step === 'service' && !serviceId}>
              Next
            </Button>
          )}
        </div>
      </div>
    </main>
  );
}
