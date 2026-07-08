import { request } from '@/lib/api';
import type { ContentBlock, Post, PostStatus } from '@/features/blog/types';

// Blog content from the BFF (GraphQL). The frontend consumes published posts for
// the public /blog pages; authoring/persistence lives in the BFF + its database.
//
// Expected BFF schema (contract this client is written against):
//   type BlogAuthor       { name: String!  role: String!  avatarUrl: String! }
//   type BlogContentBlock { type: String!  text: String! }
//   type BlogPost {
//     id slug title excerpt category status: String!
//     tags: [String!]!  coverImage  publishedAt  readingMinutes: Int!
//     author: BlogAuthor!  content: [BlogContentBlock!]!
//   }
//   type Query {
//     blogPosts: [BlogPost!]!
//     blogPost(slug: String!): BlogPost
//   }

const POST_FIELDS = `
  id
  slug
  title
  excerpt
  category
  status
  tags
  coverImage
  publishedAt
  readingMinutes
  author { name role avatarUrl }
  content { type text }
`;

// Raw shape as returned by the BFF (strings loosely typed, then narrowed by toPost).
interface RawPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  status: string;
  tags: string[];
  coverImage: string;
  publishedAt: string;
  readingMinutes: number;
  author: { name: string; role: string; avatarUrl: string };
  content: Array<{ type: string; text: string }>;
}

function toContentBlock(raw: { type: string; text: string }): ContentBlock {
  const type =
    raw.type === 'heading' || raw.type === 'quote' ? raw.type : 'paragraph';
  return { type, text: raw.text } as ContentBlock;
}

function toPost(raw: RawPost): Post {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title,
    excerpt: raw.excerpt,
    category: raw.category,
    tags: raw.tags ?? [],
    author: raw.author,
    coverImage: raw.coverImage,
    publishedAt: raw.publishedAt,
    readingMinutes: raw.readingMinutes,
    status: (raw.status === 'published' ? 'published' : 'draft') as PostStatus,
    content: (raw.content ?? []).map(toContentBlock),
  };
}

export async function fetchBlogPosts(): Promise<Post[]> {
  const data = await request<{ blogPosts: RawPost[] }>(
    `query BlogPosts { blogPosts { ${POST_FIELDS} } }`
  );
  return (data.blogPosts ?? []).map(toPost);
}

export async function fetchBlogPost(slug: string): Promise<Post | null> {
  const data = await request<{ blogPost: RawPost | null }>(
    `query BlogPost($slug: String!) { blogPost(slug: $slug) { ${POST_FIELDS} } }`,
    { slug }
  );
  return data.blogPost ? toPost(data.blogPost) : null;
}
