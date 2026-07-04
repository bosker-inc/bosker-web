'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signupSchema, type SignupInput } from '@/lib/validation';
import { useAuth } from '@/hooks/useAuth';
import { buildSubdomainUrl } from '@/lib/subdomain';
import { cn } from '@/lib/utils';
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
      role: 'customer',
    },
  });

  const selectedRole = form.watch('role');

  const onSubmit = async (data: SignupInput) => {
    setError(null);
    try {
      const user = await signup(data.email, data.password, data.name, data.role);
      const portal = user.role === 'technician' ? 'technician' : 'client';
      window.location.href = buildSubdomainUrl(portal, '/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Signup failed');
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="p-4 bg-danger/10 border border-danger/30 rounded-lg text-danger">
          {error}
        </div>
      )}

      {/* Role Selection */}
      <div>
        <p className="mb-2 text-sm font-semibold text-fg">
          I want to join as
        </p>
        <div className="grid grid-cols-2 gap-3">
          {[
            { value: 'customer', label: 'Customer', icon: '🙋', desc: 'Book services' },
            { value: 'technician', label: 'Professional', icon: '💇', desc: 'Offer services' },
          ].map((option) => (
            <label
              key={option.value}
              className={cn(
                'flex flex-col items-center gap-1 p-4 border-2 rounded-lg cursor-pointer transition-colors text-center',
                selectedRole === option.value
                  ? 'border-accent bg-accent/10'
                  : 'border-border hover:border-border'
              )}
            >
              <input
                type="radio"
                value={option.value}
                {...form.register('role')}
                className="sr-only"
              />
              <span className="text-2xl">{option.icon}</span>
              <span className="font-semibold text-fg">
                {option.label}
              </span>
              <span className="text-xs text-muted">{option.desc}</span>
            </label>
          ))}
        </div>
      </div>

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
        <span className="text-sm text-muted">
          I agree to the{' '}
          <Link href="/terms" className="text-accent hover:underline">
            Terms of Service
          </Link>{' '}
          and{' '}
          <Link href="/privacy" className="text-accent hover:underline">
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

      <p className="text-center text-muted">
        Already have an account?{' '}
        <Link
          href="/login"
          className="text-accent hover:text-accent font-semibold"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}
