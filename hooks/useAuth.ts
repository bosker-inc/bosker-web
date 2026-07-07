'use client';

import { useState, useCallback, useEffect } from 'react';
import { User } from '@/lib/types';
import { customerLogin, customerLogout, customerRegister, technicianLogin, technicianLogout } from '@/lib/auth-api';
import { clearSession, decodeJwtId, getSession, setSession, type AuthSession } from '@/lib/auth-storage';

const now = () => new Date().toISOString();

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Rehydrate the session from storage on mount.
  useEffect(() => {
    setUser(getSession()?.user ?? null);
    setIsInitialized(true);
  }, []);

  const persist = useCallback((session: AuthSession) => {
    setSession(session);
    setUser(session.user);
  }, []);

  /**
   * Real login against the BFF auth endpoints. `identifier` is a phone for
   * customers and a username for technicians; `role` selects the endpoint.
   */
  const login = useCallback(
    async (identifier: string, password: string, role: User['role'] = 'customer') => {
      setIsLoading(true);
      setError(null);
      try {
        if (role === 'technician') {
          const res = await technicianLogin(identifier, password);
          const u: User = {
            id: res.technician.id,
            email: '',
            name: res.technician.name ?? res.technician.username,
            role: 'technician',
            createdAt: now(),
            updatedAt: now(),
          };
          persist({ user: u, accessToken: res.accessToken, refreshToken: res.refreshToken });
          return u;
        }
        const res = await customerLogin(identifier, password);
        const u: User = {
          id: decodeJwtId(res.accessToken) ?? 'me',
          email: identifier,
          name: identifier,
          role: 'customer',
          createdAt: now(),
          updatedAt: now(),
        };
        persist({ user: u, accessToken: res.accessToken, refreshToken: res.refreshToken });
        return u;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Login failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [persist]
  );

  /**
   * Customer self-registration (the booking actor). Registers against the BFF and
   * persists the returned tokens. Technician onboarding uses an OTP flow handled
   * elsewhere, so this signs up customers only.
   */
  const signup = useCallback(
    async (identifier: string, password: string, name: string, _role: User['role'] = 'customer') => {
      setIsLoading(true);
      setError(null);
      try {
        const res = await customerRegister(identifier, password, name);
        const u: User = {
          id: 'me',
          email: identifier,
          name,
          role: 'customer',
          createdAt: now(),
          updatedAt: now(),
        };
        persist({ user: u, accessToken: res.accessToken, refreshToken: res.refreshToken });
        return u;
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Signup failed');
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [persist]
  );

  const logout = useCallback(async () => {
    // Best-effort server logout (role-appropriate), then clear the local session.
    const role = getSession()?.user.role;
    if (role === 'technician') await technicianLogout();
    else await customerLogout();
    clearSession();
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(
    async (updates: Partial<User>) => {
      const session = getSession();
      if (!session) return;
      const updated = { ...session.user, ...updates, updatedAt: now() };
      persist({ ...session, user: updated });
    },
    [persist]
  );

  return {
    user,
    isLoading,
    error,
    isInitialized,
    isLoggedIn: !!user,
    login,
    signup,
    logout,
    updateProfile,
  };
}
