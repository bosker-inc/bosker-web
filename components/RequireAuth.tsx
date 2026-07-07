'use client';

import { ReactNode, useEffect, useState } from 'react';
import { getSession } from '@/lib/auth-storage';
import { buildRootUrl } from '@/lib/subdomain';
import { User } from '@/lib/types';

/**
 * Client-side portal guard. Auth lives in localStorage/cookie, so we verify on
 * mount and redirect to the login page when there's no session (or a role
 * mismatch). Renders nothing until the check settles to avoid a flash of
 * protected content.
 */
export function RequireAuth({ role, children }: { role: User['role']; children: ReactNode }) {
  const [ok, setOk] = useState<boolean | null>(null);

  useEffect(() => {
    // Fall back to standard session check (rehydrates from cookie automatically if needed)
    const session = getSession();
    if (!session || (role && session.user.role !== role)) {
      window.location.href = buildRootUrl('/login');
      return;
    }
    setOk(true);
  }, [role]);

  if (!ok) return null;
  return <>{children}</>;
}
