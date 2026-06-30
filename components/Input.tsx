import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  icon?: ReactNode;
  fullWidth?: boolean;
}

export function Input({
  label,
  error,
  helperText,
  icon,
  fullWidth = false,
  className,
  ...props
}: InputProps) {
  return (
    <div className={cn('flex flex-col', fullWidth && 'w-full')}>
      {label && (
        <label className="mb-2 text-sm font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-neutral-500">{icon}</div>
        )}
        <input
          {...props}
          className={cn(
            'w-full px-4 py-2.5 border border-neutral-300 rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent',
            'placeholder:text-neutral-400',
            'disabled:bg-neutral-100 disabled:cursor-not-allowed',
            error && 'border-error focus:ring-error',
            icon && 'pl-10',
            className
          )}
        />
      </div>
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
}
