'use client';

import { useEffect, useState } from 'react';
import { getUserProfile, updateUserProfile } from '@/lib/customer-api';
import { Card, CardBody, CardHeader } from '@/components/Card';
import { SkeletonCard } from '@/components/Skeleton';
import { ThemeToggle } from '@/components/ThemeToggle';

function Toggle({ checked, onChange, disabled }: { checked: boolean; onChange: () => void; disabled?: boolean }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={onChange}
      className={`relative h-6 w-11 rounded-full transition-colors ${checked ? 'bg-accent' : 'bg-surface-2'} disabled:opacity-50`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform ${checked ? 'translate-x-5' : 'translate-x-0.5'}`}
      />
    </button>
  );
}

export default function SettingsPage() {
  const [loading, setLoading] = useState(true);
  const [pushNotification, setPushNotification] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getUserProfile()
      .then((p) => setPushNotification(p.pushNotification))
      .catch((e) => setError(e instanceof Error ? e.message : 'Failed to load settings'))
      .finally(() => setLoading(false));
  }, []);

  const togglePush = async () => {
    const next = !pushNotification;
    setPushNotification(next); // optimistic
    setSaving(true);
    setError(null);
    try {
      await updateUserProfile({ pushNotification: next });
    } catch (e) {
      setPushNotification(!next); // revert
      setError(e instanceof Error ? e.message : 'Could not update setting');
    } finally {
      setSaving(false);
    }
  };

  return (
    <main className="p-8 bg-bg min-h-screen">
      <div className="max-w-2xl space-y-6">
        <h1 className="h1 text-fg">Settings</h1>

        {loading ? (
          <SkeletonCard />
        ) : (
          <Card>
            <CardHeader>
              <h2 className="font-semibold text-fg">Notifications</h2>
            </CardHeader>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-fg">Push notifications</p>
                  <p className="text-sm text-muted">Booking updates and offers</p>
                </div>
                <Toggle checked={pushNotification} onChange={togglePush} disabled={saving} />
              </div>
              {error && <p className="mt-3 text-sm text-danger">{error}</p>}
            </CardBody>
          </Card>
        )}

        <Card>
          <CardHeader>
            <h2 className="font-semibold text-fg">Appearance</h2>
          </CardHeader>
          <CardBody>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-fg">Theme</p>
                <p className="text-sm text-muted">Switch between light and dark</p>
              </div>
              <ThemeToggle />
            </div>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
