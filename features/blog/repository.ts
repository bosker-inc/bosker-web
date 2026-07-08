import type { Post } from './types';
import postsData from './posts.json';

/**
 * Data-access layer for blog posts.
 *
 * Today this reads from a bundled JSON file (mock "database rows"). The
 * functions are async and expose a repository-style API so that migrating
 * to Prisma later touches ONLY this file — pages/components already await
 * these calls. Example future body:
 *
 *   export async function getAllPosts() {
 *     return prisma.post.findMany({
 *       where: { status: 'published' },
 *       orderBy: { publishedAt: 'desc' },
 *       include: { author: true },
 *     });
 *   }
 */

// JSON has no literal-union typing; assert to the domain model once here.
const posts = postsData as Post[];

const byNewest = (a: Post, b: Post) =>
  new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();

export async function getAllPosts(): Promise<Post[]> {
  return posts.filter((p) => p.status === 'published').sort(byNewest);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return (
    posts.find((p) => p.slug === slug && p.status === 'published') ?? null
  );
}

export async function getAllSlugs(): Promise<string[]> {
  return posts
    .filter((p) => p.status === 'published')
    .map((p) => p.slug);
}

export async function getRelatedPosts(
  slug: string,
  limit = 3
): Promise<Post[]> {
  const current = await getPostBySlug(slug);
  const others = (await getAllPosts()).filter((p) => p.slug !== slug);
  if (!current) return others.slice(0, limit);

  // Same category first, then fill with the newest remaining posts.
  const sameCategory = others.filter((p) => p.category === current.category);
  const rest = others.filter((p) => p.category !== current.category);
  return [...sameCategory, ...rest].slice(0, limit);
}
