import Link from 'next/link';
import { Card } from '@/components/Card';
import { Badge } from '@/components/Badge';
import { MotionImage } from '@/components/motion/MotionImage';
import { OptimizedImage } from '@/components/OptimizedImage';
import { formatDate } from '@/lib/utils';
import type { Post } from '@/features/blog/types';

interface PostCardProps {
  post: Post;
  featured?: boolean;
}

export function PostCard({ post, featured = false }: PostCardProps) {
  return (
    <Card variant="interactive" className="h-full">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <MotionImage
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          sizes={featured ? '100vw' : '(max-width: 768px) 100vw, 33vw'}
          className={featured ? 'h-64 w-full md:h-80' : 'h-48 w-full'}
          imageClassName={
            featured ? 'h-64 w-full object-cover md:h-80' : 'h-48 w-full object-cover'
          }
        />

        <div className="flex flex-1 flex-col p-5">
          <div className="mb-3">
            <Badge variant="accent" size="sm">
              {post.category}
            </Badge>
          </div>

          <h3
            className={
              featured
                ? 'h2 text-fg'
                : 'text-lg font-semibold text-fg group-hover:text-accent'
            }
          >
            {post.title}
          </h3>
          <p className="mt-2 flex-1 text-sm text-muted line-clamp-3">
            {post.excerpt}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <div className="h-9 w-9 overflow-hidden rounded-full ring-2 ring-accent/20">
              <OptimizedImage
                src={post.author.avatarUrl}
                alt={post.author.name}
                width={72}
                height={72}
                sizes="36px"
                className="h-9 w-9 object-cover"
              />
            </div>
            <div className="text-xs">
              <p className="font-semibold text-fg">{post.author.name}</p>
              <p className="text-muted">
                {formatDate(post.publishedAt)} · {post.readingMinutes} min read
              </p>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
}
