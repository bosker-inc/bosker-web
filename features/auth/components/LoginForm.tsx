'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, type LoginInput } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import Link from 'next/link';

export function LoginForm() {
  const [error, setError] = useState<string | null>(null);
  const { login, isLoading } = useAuth();

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setError(null);
    try {
      await login(data.email, data.password);
      // TODO: Redirect to dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <Input
        label="Email"
        type="email"
        placeholder="you@example.com"
        fullWidth
        {...form.register('email')}
        error={form.formState.errors.email?.message}
      />

      <Input
        label="Password"
        type="password"
        placeholder="••••••••"
        fullWidth
        {...form.register('password')}
        error={form.formState.errors.password?.message}
      />

      <div className="flex items-center justify-between text-sm">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="w-4 h-4" />
          <span className="text-neutral-600">Remember me</span>
        </label>
        <Link
          href="/forgot-password"
          className="text-primary-600 hover:text-primary-700"
        >
          Forgot password?
        </Link>
      </div>

      <Button
        type="submit"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Sign In
      </Button>

      <p className="text-center text-neutral-600">
        Don't have an account?{' '}
        <Link
          href="/signup"
          className="text-primary-600 hover:text-primary-700 font-semibold"
        >
          Sign up
        </Link>
      </p>
    </form>
  );
}
