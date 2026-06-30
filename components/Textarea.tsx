import { cn } from '@/lib/utils';

interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export function Textarea({
  label,
  error,
  helperText,
  fullWidth = false,
  className,
  ...props
}: TextareaProps) {
  return (
    <div className={cn('flex flex-col', fullWidth && 'w-full')}>
      {label && (
        <label className="mb-2 text-sm font-semibold text-neutral-700">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={cn(
          'w-full px-4 py-2.5 border border-neutral-300 rounded-lg resize-none',
          'focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent',
          'placeholder:text-neutral-400',
          'disabled:bg-neutral-100 disabled:cursor-not-allowed',
          error && 'border-error focus:ring-error',
          className
        )}
      />
      {error && <p className="mt-1 text-sm text-error">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-neutral-500">{helperText}</p>
      )}
    </div>
  );
}
