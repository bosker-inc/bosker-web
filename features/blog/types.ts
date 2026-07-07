/**
 * Blog domain model. These types intentionally mirror a future Prisma
 * schema (see prisma/schema.prisma) so the JSON-backed repository can be
 * swapped for a database without touching pages/components.
 */

export type PostStatus = 'published' | 'draft';

export interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

export type ContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'quote'; text: string };

export interface Post {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  author: Author;
  coverImage: string;
  /** ISO 8601 date string. */
  publishedAt: string;
  readingMinutes: number;
  status: PostStatus;
  content: ContentBlock[];
}
