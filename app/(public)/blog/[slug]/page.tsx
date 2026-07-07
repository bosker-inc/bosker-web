import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { OptimizedImage } from '@/components/OptimizedImage';
import { Badge } from '@/components/Badge';
import { Button } from '@/components/Button';
import { JsonLd } from '@/components/StructuredData';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { PostBody } from '@/features/blog/components/PostBody';
import { PostCard } from '@/features/blog/components/PostCard';
import {
  getAllSlugs,
  getPostBySlug,
  getRelatedPosts,
} from '@/features/blog/repository';
import { formatDate } from '@/lib/utils';

interface Params {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return { title: 'Post Not Found' };

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.coverImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  const related = await getRelatedPosts(slug);

  return (
    <main>
      <JsonLd
        data={{
          '@context': 'https://schema.org',
          '@type': 'BlogPosting',
          headline: post.title,
          description: post.excerpt,
          image: post.coverImage,
          datePublished: post.publishedAt,
          author: { '@type': 'Person', name: post.author.name },
          publisher: { '@type': 'Organization', name: 'Bosker' },
          keywords: post.tags.join(', '),
        }}
      />

      <article>
        {/* Header */}
        <div className="bg-surface-2 bg-mesh">
          <div className="container max-w-3xl py-12 md:py-16">
            <Link
              href="/blog"
              className="text-sm font-semibold text-accent hover:underline"
            >
              ← Back to blog
            </Link>
            <div className="mt-4">
              <Badge variant="accent" size="sm">
                {post.category}
              </Badge>
            </div>
            <h1 className="h1 text-fg mt-4">{post.title}</h1>
            <div className="mt-6 flex items-center gap-3">
              <div className="h-11 w-11 overflow-hidden rounded-full ring-2 ring-accent/20">
                <OptimizedImage
                  src={post.author.avatarUrl}
                  alt={post.author.name}
                  width={88}
                  height={88}
                  sizes="44px"
                  className="h-11 w-11 object-cover"
                />
              </div>
              <div className="text-sm">
                <p className="font-semibold text-fg">{post.author.name}</p>
                <p className="text-muted">
                  {post.author.role} · {formatDate(post.publishedAt)} ·{' '}
                  {post.readingMinutes} min read
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Cover */}
        <div className="container max-w-4xl -mt-2">
          <div className="relative aspect-[16/9] overflow-hidden rounded-2xl shadow-raised ring-1 ring-black/5">
            <OptimizedImage
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
          </div>
        </div>

        {/* Body */}
        <div className="container max-w-3xl py-12 md:py-16">
          <PostBody blocks={post.content} />

          <div className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-surface-2 px-3 py-1 text-sm text-muted"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-surface-2 py-14 md:py-20">
          <div className="container">
            <Reveal className="mb-10">
              <h2 className="h2 text-fg">Keep reading</h2>
            </Reveal>
            <StaggerGroup className="grid gap-6 md:grid-cols-3">
              {related.map((p) => (
                <StaggerItem key={p.id} className="group">
                  <PostCard post={p} />
                </StaggerItem>
              ))}
            </StaggerGroup>
            <div className="mt-10 text-center">
              <Link href="/blog">
                <Button variant="outline">View all articles</Button>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
