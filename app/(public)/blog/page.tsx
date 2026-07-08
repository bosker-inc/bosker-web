import { Metadata } from 'next';
import { SectionHeading } from '@/components/SectionHeading';
import { Reveal } from '@/components/motion/Reveal';
import { StaggerGroup } from '@/components/motion/StaggerGroup';
import { StaggerItem } from '@/components/motion/StaggerItem';
import { PostCard } from '@/features/blog/components/PostCard';
import { getAllPosts } from '@/features/blog/repository';

// BFF-backed content: revalidate periodically so new/edited posts appear
// without a full redeploy (ISR).
export const revalidate = 300;

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Beauty industry news, trends, and expert tips from the professionals on Bosker.',
  openGraph: {
    title: 'Bosker Blog — Beauty News, Trends & Tips',
    description: 'Insights and inspiration from beauty professionals.',
  },
};

export default async function BlogPage() {
  const posts = await getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main>
      <section className="relative overflow-hidden bg-surface-2 bg-mesh py-16 md:py-20">
        <div className="container">
          <SectionHeading
            eyebrow="Blog"
            title="Beauty news, trends & expert tips"
            subtitle="Insights from the professionals who know beauty best — from color trends to skincare science."
          />
        </div>
      </section>

      <section className="py-14 md:py-20">
        <div className="container space-y-12">
          {featured && (
            <Reveal>
              <PostCard post={featured} featured />
            </Reveal>
          )}

          {rest.length > 0 && (
            <StaggerGroup className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {rest.map((post) => (
                <StaggerItem key={post.id} className="group">
                  <PostCard post={post} />
                </StaggerItem>
              ))}
            </StaggerGroup>
          )}
        </div>
      </section>
    </main>
  );
}
