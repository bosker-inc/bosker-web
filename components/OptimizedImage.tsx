import Image from 'next/image';
import { ComponentProps } from 'react';

type NextImageProps = ComponentProps<typeof Image>;

interface OptimizedImageProps
  extends Omit<NextImageProps, 'src' | 'alt' | 'width' | 'height'> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  fill?: boolean;
  className?: string;
}

const BLUR_DATA_URL =
  'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAICAgICgoKCAkKD0oMDgwKDwsNFA4RDAxPEQ8SFBNTSVRTYmlmcnVucoKChYSEhP/2wBDAQcHBwoIChMICChMSg4KDElKSUlJSkpJSklJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUn/wgARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAA//aAAwDAQACEAMQAAAAA//EABYQAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAQAB/wDN//EABYQAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAgEBPwA//EAFQEAQAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwA//Z';

/**
 * Optimized image wrapper using Next.js Image component.
 * Handles WebP conversion, lazy loading, and a blur placeholder
 * (required for remote images, which can't auto-generate one).
 *
 * Pass `fill` for images that should fill a positioned parent; otherwise
 * `width`/`height` are used (defaulting to 400x300).
 */
export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
  fill = false,
  className = '',
  unoptimized,
  ...props
}: OptimizedImageProps) {
  const dimensionProps = fill
    ? { fill: true as const }
    : { width, height };

  // Remote CDN images (e.g. Unsplash) already serve resized/optimized
  // assets via URL params, so we load them directly from the browser
  // instead of proxying through Next's server-side optimizer. This keeps
  // images working regardless of the deploy host's outbound network policy.
  const isRemote = /^https?:\/\//.test(src);
  const skipOptimizer = unoptimized ?? isRemote;

  return (
    <Image
      src={src}
      alt={alt}
      {...dimensionProps}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      unoptimized={skipOptimizer}
      className={className}
      {...props}
    />
  );
}
