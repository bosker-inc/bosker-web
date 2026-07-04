'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  as?: 'div' | 'li';
}

/**
 * A single item inside a `StaggerGroup`. Inherits the group's stagger
 * timing via Framer's variant context (no per-item delay needed).
 */
export function StaggerItem({
  children,
  className,
  as = 'div',
}: StaggerItemProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 20, scale: reduce ? 1 : 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <MotionTag className={className} variants={variants}>
      {children}
    </MotionTag>
  );
}
