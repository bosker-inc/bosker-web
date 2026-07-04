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
        <label className="mb-2 text-sm font-semibold text-fg">
          {label}
        </label>
      )}
      <textarea
        {...props}
        className={cn(
          'w-full px-4 py-2.5 rounded-lg resize-none bg-surface text-fg border border-border',
          'transition-shadow focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus:border-transparent',
          'placeholder:text-muted/70',
          'disabled:bg-surface-2 disabled:cursor-not-allowed',
          error && 'border-danger focus-visible:ring-danger',
          className
        )}
      />
      {error && <p className="mt-1 text-sm text-danger">{error}</p>}
      {helperText && !error && (
        <p className="mt-1 text-sm text-muted">{helperText}</p>
      )}
    </div>
  );
}
