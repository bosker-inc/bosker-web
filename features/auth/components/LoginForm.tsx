'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { portalLoginSchema, type PortalLoginInput } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { buildSubdomainUrl } from '@/lib/subdomain';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import Link from 'next/link';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const form = useForm<PortalLoginInput>({
    resolver: zodResolver(portalLoginSchema),
    defaultValues: {
      identifier: '',
      password: '',
      role: 'customer',
    },
  });

  const role = form.watch('role');

  const onSubmit = async (data: PortalLoginInput) => {
    setError(null);
    try {
      const { user } = await login(data.identifier, data.password, data.role);
      const portal = user.role === 'technician' ? 'technician' : 'client';
      window.location.href = buildSubdomainUrl(portal, '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger">
          {error}
        </div>
      )}

      {/* Portal toggle — selects which BFF auth endpoint to use */}
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted/10 p-1">
        {(['customer', 'technician'] as const).map((r) => (
          <button
            key={r}
            type="button"
            onClick={() => form.setValue('role', r)}
            className={`rounded-md py-2 text-sm font-medium capitalize transition-colors ${
              role === r ? 'bg-accent text-white' : 'text-muted hover:text-foreground'
            }`}
          >
            {r}
          </button>
        ))}
      </div>

      <Input
        label={role === 'technician' ? 'Username' : 'Phone'}
        type="text"
        placeholder={role === 'technician' ? 'your-username' : '+84901234567'}
        fullWidth
        {...form.register('identifier')}
        error={form.formState.errors.identifier?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        fullWidth
        {...form.register('password')}
        error={form.formState.errors.password?.message}
      />

      <Button type="submit" size="lg" fullWidth isLoading={isLoading}>
        Sign In
      </Button>

      <p className="text-center text-muted">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="text-accent hover:text-accent font-semibold">
          Sign up
        </Link>
      </p>
    </form>
  );
}
