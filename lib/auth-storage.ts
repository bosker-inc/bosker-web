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
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  const host = rootDomain.split(':')[0];
  const domainAttr = host === 'localhost' ? '; domain=.localhost' : (host.includes('.') ? `; domain=.${host}` : `; domain=${host}`);
  // 7 days, root path so both portals see it. Not HttpOnly — this is a public
  // client token forwarded straight to the BFF (matches the app's all-NEXT_PUBLIC design).
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(token)}; path=/${domainAttr}; max-age=${7 * 24 * 60 * 60}; samesite=lax`;
}

function clearCookie() {
  if (typeof document === 'undefined') return;
  const rootDomain = process.env.NEXT_PUBLIC_ROOT_DOMAIN || 'localhost:3000';
  const host = rootDomain.split(':')[0];
  const domainAttr = host === 'localhost' ? '; domain=.localhost' : (host.includes('.') ? `; domain=.${host}` : `; domain=${host}`);
  document.cookie = `${COOKIE_NAME}=; path=/${domainAttr}; max-age=0; samesite=lax`;
  // Clean up host-only cookie as well if it was previously set without explicit domain
  document.cookie = `${COOKIE_NAME}=; path=/; max-age=0; samesite=lax`;
}

function readCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return decodeURIComponent(match[2]);
  return null;
}

export function getSession(): AuthSession | null {
  if (typeof window === 'undefined') return null;
  
  // 1. Try reading from localStorage first
  const raw = window.localStorage.getItem(SESSION_KEY);
  if (raw) {
    try {
      return JSON.parse(raw) as AuthSession;
    } catch {
      window.localStorage.removeItem(SESSION_KEY);
    }
  }

  // 2. Fall back to cookie (allows cross-subdomain session recovery)
  const token = readCookie(COOKIE_NAME);
  if (token) {
    const claims = decodeJwtClaims(token);
    if (claims && (claims.id || claims.sub)) {
      const id = claims.id ?? claims.sub ?? 'me';
      const username = claims.username ?? claims.email ?? 'user';
      
      // Determine the portal role based on current subdomain/hostname
      const host = window.location.hostname;
      const isTech = host.startsWith('technician.');
      const role: User['role'] = isTech ? 'technician' : 'customer';

      const session: AuthSession = {
        user: {
          id,
          email: claims.email ?? '',
          name: username,
          role,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        },
        accessToken: token,
      };

      // Sync back to this subdomain's localStorage
      window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return session;
    }
  }

  return null;
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

/** The signed-in user's id (used e.g. as the notification subscription filter). */
export function getUserId(): string | null {
  return getSession()?.user.id ?? null;
}

interface DecodedClaims {
  id?: string;
  sub?: string;
  username?: string;
  email?: string;
}

export function decodeJwtClaims(token: string): DecodedClaims | null {
  try {
    const payload = token.split('.')[1];
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'));
    return JSON.parse(json) as DecodedClaims;
  } catch {
    return null;
  }
}

/**
 * Best-effort decode of the `id` claim from a JWT payload (base64url middle
 * segment). Used to recover the real customer id, which the customer login
 * response does not include but the token does.
 */
export function decodeJwtId(token: string): string | null {
  const claims = decodeJwtClaims(token);
  return claims?.id ?? claims?.sub ?? null;
}
