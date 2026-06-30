'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupInput } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import Link from 'next/link';

export function SignupForm() {
  const [error, setError] = useState<string | null>(null);
  const { signup, isLoading } = useAuth();

  const form = useForm<SignupInput>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignupInput) => {
    setError(null);
    try {
      await signup(data.email, data.password, data.name);
      // TODO: Redirect to dashboard
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
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
        label="Full Name"
        placeholder="John Doe"
        fullWidth
        {...form.register('name')}
        error={form.formState.errors.name?.message}
      />

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

      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        fullWidth
        {...form.register('confirmPassword')}
        error={form.formState.errors.confirmPassword?.message}
      />

      <label className="flex items-start gap-3">
        <input type="checkbox" className="w-4 h-4 mt-1" />
        <span className="text-sm text-neutral-600">
          I agree to the{' '}
          <Link href="/terms" className="text-primary-600 hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-primary-600 hover:underline">
            Privacy Policy
          </Link>
        </span>
      </label>

      <Button
        type="submit"
        size="lg"
        fullWidth
        isLoading={isLoading}
      >
        Create Account
      </Button>

      <p className="text-center text-neutral-600">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-primary-600 hover:text-primary-700 font-semibold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
