'use client';

import { ReactNode } from 'react';
import { motion, useReducedMotion, type Variants } from 'framer-motion';

interface ScrollRevealProps {
  children: ReactNode;
  /** Direction to slide from. */
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
  /** Delay before animation starts (seconds). */
  delay?: number;
  /** Animation duration (seconds). */
  duration?: number;
  /** Distance in pixels to slide. Default 40. */
  distance?: number;
  /** Enable zoom-in effect. Default is false. */
  zoom?: boolean;
  /** CSS class name. */
  className?: string;
  /** HTML tag wrapper. Default is div. */
  as?: 'div' | 'section' | 'li' | 'span';
}

/**
 * A motion component that triggers slide and scale animations on scroll.
 * Integrates perfectly with Framer Motion viewports and honors reduced-motion.
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  distance = 40,
  zoom = false,
  className,
  as = 'div',
}: ScrollRevealProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as];

  // Calculate initial transform offsets
  const getOffset = () => {
    if (reduce) return { x: 0, y: 0 };
    switch (direction) {
      case 'up':
        return { x: 0, y: distance };
      case 'down':
        return { x: 0, y: -distance };
      case 'left':
        return { x: distance, y: 0 };
      case 'right':
        return { x: -distance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const offset = getOffset();

  const variants: Variants = {
    hidden: {
      opacity: 0,
      x: offset.x,
      y: offset.y,
      scale: zoom && !reduce ? 0.92 : 1,
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: {
        duration,
        delay,
        ease: [0.21, 1.02, 0.43, 1.01], // custom spring-like ease curve
      },
    },
  };

  return (
    <MotionTag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -50px 0px' }}
    >
      {children}
    </MotionTag>
  );
}
