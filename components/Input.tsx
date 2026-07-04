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
        <label className="mb-2 text-sm font-semibold text-fg">
          {label}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-3 text-muted">{icon}</div>
        )}
        <input
          {...props}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg bg-surface text-fg border border-border',
            'transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:border-transparent',
            'placeholder:text-muted/70',
            'disabled:bg-surface-2 disabled:cursor-not-allowed',
            error && 'border-danger focus-visible:ring-danger',
            icon && 'pl-10',
            className
          )}
        />
      </div>
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-muted">{helperText}</p>
      )}
    </div>
  );
}
