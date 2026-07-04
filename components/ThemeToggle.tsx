'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';

interface ThemeToggleProps {
  className?: string;
}

export function ThemeToggle({ className }: ThemeToggleProps) {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Avoid hydration mismatch — theme is only known on the client.
  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === 'dark';

  return (
    <button
      type="button"
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border text-fg transition-colors hover:bg-surface-2 focus-ring',
        className
      )}
    >
      {mounted ? (
        <span className="text-lg" aria-hidden>
          {isDark ? '☀️' : '🌙'}
        </span>
      ) : (
        <span className="h-5 w-5" aria-hidden />
      )}
    </button>
  );
}
