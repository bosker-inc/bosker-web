'use client';

import { useState, useCallback, useEffect } from 'react';
import { User } from '@/lib/types';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Initialize auth from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('auth_session');
    if (stored) {
      try {
        const session = JSON.parse(stored);
        setUser(session.user);
      } catch {
        localStorage.removeItem('auth_session');
      }
    }
    setIsInitialized(true);
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual GraphQL mutation
      const mockUser: User = {
        id: '1',
        email,
        name: email.split('@')[0],
        role: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const session = {
        user: mockUser,
        token: 'mock-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorage.setItem('auth_session', JSON.stringify(session));
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const signup = useCallback(async (email: string, password: string, name: string) => {
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual GraphQL mutation
      const mockUser: User = {
        id: '1',
        email,
        name,
        role: 'customer',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const session = {
        user: mockUser,
        token: 'mock-token',
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      };

      localStorage.setItem('auth_session', JSON.stringify(session));
      setUser(mockUser);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    localStorage.removeItem('auth_session');
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (updates: Partial<User>) => {
    if (!user) return;
    setIsLoading(true);
    setError(null);

    try {
      // TODO: Replace with actual GraphQL mutation
      const updated = { ...user, ...updates };
      setUser(updated);

      const session = JSON.parse(localStorage.getItem('auth_session') || '{}');
      session.user = updated;
      localStorage.setItem('auth_session', JSON.stringify(session));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Profile update failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [user]);

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
