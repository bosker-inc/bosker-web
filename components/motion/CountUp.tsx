'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';

interface CountUpProps {
  /** Display value like "50K+", "4.9/5", "100K+". The leading number is
   *  animated; any surrounding text is preserved as a suffix. */
  value: string;
  durationMs?: number;
  className?: string;
}

const parse = (value: string) => {
  const match = value.match(/^([\d.]+)(.*)$/);
  if (!match) return { target: 0, suffix: value, decimals: 0 };
  const target = parseFloat(match[1]);
  const decimals = match[1].includes('.') ? 1 : 0;
  return { target, suffix: match[2], decimals };
};

/**
 * Counts a stat up from zero when it scrolls into view. Shows the final
 * value immediately when reduced motion is preferred.
 */
export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const { target, suffix, decimals } = parse(value);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '0px 0px -40px 0px' });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(target);
      return;
    }

    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const progress = Math.min((now - start) / durationMs, 1);
      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(target * eased);
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduce, target, durationMs]);

  return (
    <span ref={ref} className={className}>
      {display.toFixed(decimals)}
      {suffix}
    </span>
  );
}
