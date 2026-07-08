'use client';

import { Input } from '@/components/Input';

// Duration options offered to the customer, in minutes. The booking stores a
// scheduled_start + scheduled_end window; end is derived from start + duration.
export const DURATION_OPTIONS: { label: string; minutes: number }[] = [
  { label: '30 min', minutes: 30 },
  { label: '1 hour', minutes: 60 },
  { label: '1.5 hours', minutes: 90 },
  { label: '2 hours', minutes: 120 },
  { label: '3 hours', minutes: 180 },
  { label: '4 hours', minutes: 240 },
];

export interface TimeWindow {
  start: string; // datetime-local value
  durationMinutes: number;
}

interface DateTimePickerProps {
  value: TimeWindow;
  onChange: (value: TimeWindow) => void;
}

// Smallest selectable start = now (rounded to the minute), so no past bookings.
function minStart(): string {
  const now = new Date();
  now.setSeconds(0, 0);
  const tzOffset = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - tzOffset).toISOString().slice(0, 16);
}

export function DateTimePicker({ value, onChange }: DateTimePickerProps) {
  return (
    <div className="space-y-4">
      <Input
        label="Start time"
        type="datetime-local"
        min={minStart()}
        value={value.start}
        onChange={(e) => onChange({ ...value, start: e.target.value })}
        fullWidth
      />

      <div>
        <label className="mb-2 block text-sm font-semibold text-fg">Estimated duration</label>
        <div className="flex flex-wrap gap-2">
          {DURATION_OPTIONS.map((opt) => (
            <button
              key={opt.minutes}
              type="button"
              onClick={() => onChange({ ...value, durationMinutes: opt.minutes })}
              className={`rounded-lg border px-3 py-2 text-sm transition-colors ${
                value.durationMinutes === opt.minutes
                  ? 'border-accent bg-accent/10 text-accent'
                  : 'border-border text-fg hover:bg-surface-2'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Derive the ISO end timestamp from a start value + duration.
export function deriveEnd(start: string, durationMinutes: number): string | undefined {
  if (!start) return undefined;
  const startDate = new Date(start);
  if (Number.isNaN(startDate.getTime())) return undefined;
  return new Date(startDate.getTime() + durationMinutes * 60000).toISOString();
}
