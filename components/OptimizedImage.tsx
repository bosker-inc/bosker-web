import Image from 'next/image';
import { ComponentProps } from 'react';

interface OptimizedImageProps extends ComponentProps<typeof Image> {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
}

/**
 * Optimized image wrapper using Next.js Image component
 * Automatically handles:
 * - Format optimization (WebP)
 * - Responsive sizing
 * - Lazy loading (unless priority=true)
 * - Blur placeholder
 */
export function OptimizedImage({
  src,
  alt,
  width = 400,
  height = 300,
  priority = false,
  className = '',
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      src={src}
      alt={alt}
      width={width}
      height={height}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAICAgICgoKCAkKD0oMDgwKDwsNFA4RDAxPEQ8SFBNTSVRTYmlmcnVucoKChYSEhP/2wBDAQcHBwoIChMICChMSg4KDElKSUlJSkpJSklJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUn/wgARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAAA//aAAwDAQACEAMQAAAAA//EABYQAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAQAB/wDN//EABYQAQEBAAAAAAAAAAAAAAAAAAEAEf/aAAgBAgEBPwA//EAFQEAQAAAAAAAAAAAAAAAAAAAAP/aAAgBAwEBPwA//Z"
      className={className}
      {...props}
    />
  );
}
