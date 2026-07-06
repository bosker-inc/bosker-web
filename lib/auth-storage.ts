import { User } from '@/lib/types';

// Single source of truth for the authenticated session on the client. Tokens are
// kept in localStorage (read by the API/subscription clients) and mirrored into a
// cookie so middleware / server components can see auth on the first request.

const SESSION_KEY = 'auth_session';
const COOKIE_NAME = 'bosker_token';

export interface AuthSession {
  user: User;
  accessToken: string;
  refreshToken?: string;
}

function writeCookie(token: string) {
  if (typeof document === 'undefined') return;
  // 7 days, root path so both portals see it. Not HttpOnly — this is a public
  // client token forwarded straight to the BFF (matches the app's all-NEXT_PUBLIC design).
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/; max-age=${7 * 24 * 60 * 60}; samesite=lax`;
}

function clearCookie() {
  if (typeof document === 'undefined') return;
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AuthSession;
  } catch {
    window.localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function setSession(session: AuthSession): void {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  writeCookie(session.accessToken);
}

export function clearSession(): void {
  if (typeof window === 'undefined') return;
  window.localStorage.removeItem(SESSION_KEY);
  clearCookie();
}

/** Bearer token for the API + subscription clients; null when signed out. */
export function getToken(): string | null {
  return getSession()?.accessToken ?? null;
}
