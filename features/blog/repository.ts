import type { Post } from './types';
import seedData from './posts.json';
import { fetchBlogPosts, fetchBlogPost } from '@/lib/blog-api';

/**
 * Data-access layer for blog posts.
 *
 * Posts come from the BFF (see lib/blog-api.ts), consistent with how the rest of
 * the app fetches data. Until the BFF ships its blog resolvers — and any time the
 * BFF is unreachable — these functions fall back to the bundled seed (posts.json)
 * so the public /blog pages keep building and rendering. The fallback is logged,
 * never silent, so a real outage is visible in logs.
 *
 * Callers (pages, sitemap) already await this module, so nothing above changes as
 * the BFF endpoint comes online.
 */

const seedPosts = seedData as Post[];

const byNewest = (a: Post, b: Post) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

const published = (posts: Post[]) =>
  posts.filter((p) => p.status === 'published').sort(byNewest);

function warnFallback(where: string, err: unknown) {
  const message = err instanceof Error ? err.message : String(err);
  console.warn(`[blog] BFF unavailable in ${where}; using seed data — ${message}`);
}

export async function getAllPosts(): Promise<Post[]> {
  try {
    return published(await fetchBlogPosts());
  } catch (err) {
    warnFallback('getAllPosts', err);
    return published(seedPosts);
  }
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const post = await fetchBlogPost(slug);
    // A null result is a genuine "not found", not a fallback trigger.
    return post && post.status === 'published' ? post : null;
  } catch (err) {
    warnFallback('getPostBySlug', err);
    return (
      seedPosts.find((p) => p.slug === slug && p.status === 'published') ?? null
    );
  }
}

export async function getAllSlugs(): Promise<string[]> {
  return (await getAllPosts()).map((p) => p.slug);
}

export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<Post[]> {
  const all = await getAllPosts();
  const current = all.find((p) => p.slug === slug) ?? null;
  const others = all.filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);

  // Same category first, then fill with the newest remaining posts.
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
