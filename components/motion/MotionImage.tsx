'use client';

import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import { OptimizedImage } from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';
import { MouseEvent } from 'react';

interface MotionImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
  /** Classes for the (overflow-hidden) wrapper. */
  className?: string;
  /** Classes for the image itself. */
  imageClassName?: string;
  /** Enable mouse tilt effect (3D card effect). */
  hoverTilt?: boolean;
  /** Enable dynamic flashlight/shine overlay on hover. */
  shineEffect?: boolean;
  /** Custom zoom scale on hover. Default is 1.05. Set to 1 to disable. */
  zoomScale?: number;
  /** Custom rotation on hover (e.g. 1 or -1 for subtle tilt). */
  hoverRotate?: number;
}

/**
 * A highly interactive image component featuring smooth hardware-accelerated zoom,
 * 3D cursor-tracking tilt, dynamic spotlight shine overlays, and shadow transitions.
 * Fully honors the user's reduced-motion preferences.
 */
export function MotionImage({
  src,
  alt,
  width,
  height,
  priority,
  sizes,
  fill,
  className,
  imageClassName,
  hoverTilt = false,
  shineEffect = false,
  zoomScale = 1.05,
  hoverRotate = 0,
}: MotionImageProps) {
  const reduce = useReducedMotion();

  // Mouse coordinate values mapped between 0 and 1
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // 3D card tilt springs
  const tiltX = useSpring(useTransform(mouseY, [0, 1], [8, -8]), { damping: 25, stiffness: 220 });
  const tiltY = useSpring(useTransform(mouseX, [0, 1], [-8, 8]), { damping: 25, stiffness: 220 });

  // Spotlight position string mapping
  const spotlightX = useTransform(mouseX, [0, 1], ['0%', '100%']);
  const spotlightY = useTransform(mouseY, [0, 1], ['0%', '100%']);

  const spotlightBg = useTransform(
    [spotlightX, spotlightY],
    ([xVal, yVal]) =>
      `radial-gradient(circle 200px at ${xVal} ${yVal}, rgba(255, 255, 255, 0.45) 0%, rgba(255, 255, 255, 0) 80%)`
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (reduce || (!hoverTilt && !shineEffect)) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    // Smoothly spring back to center
    mouseX.set(0.5);
    mouseY.set(0.5);
  };

  // Compose the outer wrapper hover animations
  const hoverAnimation = !reduce
    ? {
        scale: zoomScale,
        rotate: hoverRotate,
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
      }
    : {};

  return (
    <motion.div
      className={cn(
        'group relative overflow-hidden transition-shadow duration-500 rounded-2xl bg-surface-2',
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={hoverAnimation}
      style={{
        transformStyle: 'preserve-3d',
        rotateX: hoverTilt && !reduce ? tiltX : 0,
        rotateY: hoverTilt && !reduce ? tiltY : 0,
      }}
      transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        fill={fill}
        className={cn(
          'transition-transform duration-700 ease-[0.25,1,0.5,1] group-hover:scale-[1.02]',
          imageClassName
        )}
      />

      {/* Premium spotlight glassmorphism shine overlay */}
      {shineEffect && !reduce && (
        <motion.div
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mix-blend-overlay"
          style={{
            background: spotlightBg,
          }}
        />
      )}
    </motion.div>
  );
}
