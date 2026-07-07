'use client';

import { useEffect } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { buildRootUrl } from '@/lib/subdomain';

/** Runs a real (best-effort) logout, then bounces to login. Shared by both portals. */
export function LogoutView() {
  const { logout } = useAuth();

  useEffect(() => {
    void logout().finally(() => {
      window.location.href = buildRootUrl('/login');
    });
    // logout is stable enough; run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg">
      <p className="text-muted">Signing you out…</p>
    </main>
  );
}
