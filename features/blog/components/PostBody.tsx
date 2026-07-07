import type { ContentBlock } from '@/features/blog/types';

interface PostBodyProps {
  blocks: ContentBlock[];
}

/**
 * Renders typed content blocks. Keeping the body as structured data (rather
 * than raw HTML/MDX) keeps it storable in a DB column and safe to render.
 */
export function PostBody({ blocks }: PostBodyProps) {
  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case 'heading':
            return (
              <h2 key={i} className="h2 text-fg pt-2">
                {block.text}
              </h2>
            );
          case 'quote':
            return (
              <blockquote
                key={i}
                className="border-l-4 border-accent pl-5 text-xl italic text-fg"
              >
                {block.text}
              </blockquote>
            );
          case 'paragraph':
          default:
            return (
              <p key={i} className="text-lg leading-relaxed text-muted">
                {block.text}
              </p>
            );
        }
      })}
    </div>
  );
}
