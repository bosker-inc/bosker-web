'use client';

import { useEffect } from 'react';
import { clearSession } from '@/lib/auth-storage';
import { buildRootUrl } from '@/lib/subdomain';

/** Clears the session and bounces to the login page. Shared by both portals. */
export function LogoutView() {
  useEffect(() => {
    clearSession();
    window.location.href = buildRootUrl('/login');
  }, []);

  return (
    <main className="flex min-h-screen items-center justify-center bg-bg">
      <p className="text-muted">Signing you out…</p>
    </main>
  );
}
