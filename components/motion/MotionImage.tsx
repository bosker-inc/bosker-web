'use client';

import { motion } from 'framer-motion';
import { OptimizedImage } from '@/components/OptimizedImage';
import { cn } from '@/lib/utils';

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
}

/**
 * Image with a subtle zoom on hover. The wrapper clips the overflow so the
 * scale reads as a framed zoom rather than pushing layout around.
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
}: MotionImageProps) {
  return (
    <motion.div
      className={cn('overflow-hidden', className)}
      whileHover={{ scale: 1.04 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        fill={fill}
        className={imageClassName}
      />
    </motion.div>
  );
}
