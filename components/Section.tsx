import { ReactNode } from 'react';
import { cn } from '@/lib/utils';
import { Container } from './Container';

type SectionVariant = 'default' | 'tinted' | 'spotlight';

interface SectionProps {
  children: ReactNode;
  className?: string;
  variant?: SectionVariant;
  /** Wrap children in a Container. Set false for full-bleed content. */
  contained?: boolean;
  containerSize?: 'default' | 'narrow' | 'wide';
  id?: string;
}

const variants: Record<SectionVariant, string> = {
  default: 'bg-bg',
  tinted: 'bg-surface-2',
  spotlight: 'relative bg-bg bg-radial-glow overflow-hidden',
};

export function Section({
  children,
  className,
  variant = 'default',
  contained = true,
  containerSize = 'default',
  id,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn('py-16 md:py-24', variants[variant], className)}
    >
      {contained ? (
        <Container size={containerSize} className="relative">
          {children}
        </Container>
      ) : (
        children
      )}
    </section>
  );
}
