'use client';

import { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';

interface StaggerGroupProps {
  children: ReactNode;
  className?: string;
  /** Seconds between each child's entrance. */
  stagger?: number;
  as?: 'div' | 'ul';
}

const containerVariants = (stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
    },
  },
});

/**
 * Wraps a grid/list of `StaggerItem`s and reveals them one after another
 * when the group scrolls into view.
 */
export function StaggerGroup({
  children,
  className,
  stagger = 0.1,
  as = 'div',
}: StaggerGroupProps) {
  const MotionTag = motion[as];

  return (
    <MotionTag
      className={className}
      variants={containerVariants(stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
    >
      {children}
    </MotionTag>
  );
}
