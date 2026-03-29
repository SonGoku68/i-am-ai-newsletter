import SubscribeForm from '@/components/SubscribeForm';
import { createClient } from '@/lib/supabase';
import Link from 'next/link';

export const revalidate = 60;

export default async function HomePage() {
  const supabase = createClient();
  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, summary, published_at')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(10);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-2">I am AI Newsletter</h1>
      <p className="text-gray-500 mb-8">Daily posts on AI — research, analysis, and insights.</p>

      <section className="mb-12">
        <h2 className="text-xl font-semibold mb-4">Latest Posts</h2>
        {posts && posts.length > 0 ? (
          <ul className="space-y-6">
            {posts.map((post) => (
              <li key={post.id} className="border-b pb-6">
                <Link href={} className="text-2xl font-medium hover:underline">
                  {post.title}
                </Link>
                <p className="text-gray-400 text-sm mt-1">
                  {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
                </p>
                {post.summary && <p className="text-gray-600 mt-2">{post.summary}</p>}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-400">No posts yet. Check back soon.</p>
        )}
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">Subscribe to the Weekly Newsletter</h2>
        <SubscribeForm />
      </section>
    </main>
  );
}
