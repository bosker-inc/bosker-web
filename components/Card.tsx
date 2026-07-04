import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

type CardVariant = 'default' | 'interactive' | 'emphasis' | 'glass';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  /** @deprecated use variant="interactive" */
  hoverable?: boolean;
}

interface CardSectionProps {
  children: ReactNode;
  className?: string;
}

const variants: Record<CardVariant, string> = {
  default: 'border border-border bg-surface shadow-soft',
  interactive:
    'border border-border bg-surface shadow-soft transition-[box-shadow,transform] duration-200 hover:shadow-raised hover:-translate-y-0.5',
  emphasis: 'border border-accent/30 bg-surface shadow-raised',
  glass:
    'border border-border/60 bg-surface/70 backdrop-blur-md shadow-soft',
};

export function Card({
  children,
  className,
  variant = 'default',
  hoverable = false,
}: CardProps) {
  const resolved: CardVariant = hoverable ? 'interactive' : variant;
  return (
    <div
      className={cn('rounded-xl overflow-hidden', variants[resolved], className)}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: CardSectionProps) {
  return (
    <div className={cn('px-6 py-4 border-b border-border', className)}>
      {children}
    </div>
  );
}

export function CardBody({ children, className }: CardSectionProps) {
  return <div className={cn('px-6 py-4', className)}>{children}</div>;
}

export function CardFooter({ children, className }: CardSectionProps) {
  return (
    <div className={cn('px-6 py-4 border-t border-border', className)}>
      {children}
    </div>
  );
}
