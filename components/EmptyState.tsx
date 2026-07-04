import { ReactNode } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface EmptyStateProps {
  title: string;
  description?: string;
  /** Show the shared illustration. Overridden by `icon` when provided. */
  illustration?: boolean;
  icon?: ReactNode;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  illustration = true,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-surface px-6 py-14 text-center',
        className
      )}
    >
      {icon ? (
        <div className="mb-5 text-5xl">{icon}</div>
      ) : illustration ? (
        <Image
          src="/images/beauty-appointment.svg"
          alt=""
          width={200}
          height={150}
          className="mb-5 h-auto w-40 opacity-90"
        />
      ) : null}

      <h3 className="h3 text-fg">{title}</h3>
      {description && (
        <p className="mt-2 max-w-sm text-muted">{description}</p>
      )}
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
