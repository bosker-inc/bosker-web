'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface RevealProps {
  children: ReactNode;
  /** Delay before the reveal starts (seconds). */
  delay?: number;
  /** Initial vertical offset in px. */
  y?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'span';
}

/**
 * Fades + slides its children in when scrolled into view. Triggers once.
 * Collapses to an instant, transform-free reveal when the user prefers
 * reduced motion.
 */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  const variants: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : y },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -80px 0px' }}
    >
      {children}
    </MotionTag>
  );
}
