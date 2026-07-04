'use client';

import { useState } from 'react';
import { Button } from '@/components/Button';
import { cn } from '@/lib/utils';

interface DaySchedule {
  day: string;
  enabled: boolean;
  start: string;
  end: string;
}

const DEFAULT_SCHEDULE: DaySchedule[] = [
  { day: 'Monday', enabled: true, start: '09:00', end: '17:00' },
  { day: 'Tuesday', enabled: true, start: '09:00', end: '17:00' },
  { day: 'Wednesday', enabled: true, start: '09:00', end: '17:00' },
  { day: 'Thursday', enabled: true, start: '09:00', end: '17:00' },
  { day: 'Friday', enabled: true, start: '09:00', end: '17:00' },
  { day: 'Saturday', enabled: false, start: '10:00', end: '14:00' },
  { day: 'Sunday', enabled: false, start: '10:00', end: '14:00' },
];

export function ScheduleEditor() {
  const [schedule, setSchedule] = useState<DaySchedule[]>(DEFAULT_SCHEDULE);
  const [saved, setSaved] = useState(false);

  const updateDay = (index: number, updates: Partial<DaySchedule>) => {
    setSaved(false);
    setSchedule((prev) =>
      prev.map((d, i) => (i === index ? { ...d, ...updates } : d))
    );
  };

  const handleSave = () => {
    // TODO: Persist to API when backend is connected
    setSaved(true);
  };

  return (
    <div className="space-y-4">
      {schedule.map((daySchedule, index) => (
        <div
          key={daySchedule.day}
          className={cn(
            'flex items-center gap-4 p-4 rounded-lg border transition-colors',
            daySchedule.enabled
              ? 'border-border bg-surface'
              : 'border-border bg-surface-2'
          )}
        >
          <label className="flex items-center gap-3 w-36">
            <input
              type="checkbox"
              checked={daySchedule.enabled}
              onChange={(e) =>
                updateDay(index, { enabled: e.target.checked })
              }
              className="w-4 h-4"
            />
            <span
              className={cn(
                'font-semibold',
                daySchedule.enabled ? 'text-fg' : 'text-muted'
              )}
            >
              {daySchedule.day}
            </span>
          </label>

          {daySchedule.enabled ? (
            <div className="flex items-center gap-2">
              <input
                type="time"
                value={daySchedule.start}
                onChange={(e) => updateDay(index, { start: e.target.value })}
                className="border border-border rounded-lg px-3 py-2 text-sm"
              />
              <span className="text-muted">to</span>
              <input
                type="time"
                value={daySchedule.end}
                onChange={(e) => updateDay(index, { end: e.target.value })}
                className="border border-border rounded-lg px-3 py-2 text-sm"
              />
            </div>
          ) : (
            <span className="text-sm text-muted">Unavailable</span>
          )}
        </div>
      ))}

      <div className="flex items-center gap-4 pt-2">
        <Button onClick={handleSave}>Save Schedule</Button>
        {saved && (
          <span className="text-sm text-success font-semibold">
            ✓ Schedule saved
          </span>
        )}
      </div>
    </div>
  );
}
