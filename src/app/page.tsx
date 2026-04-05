import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SubscribeForm from '@/components/SubscribeForm';

export const revalidate = 60;

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  published_at: string;
  cover_image_url?: string;
}

export default async function HomePage() {
  const supabase = await createClient();
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, slug, title, summary, published_at, cover_image_url')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Supabase fetch error:', error.message);
  }

  const postList: Post[] = posts ?? [];

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-20 pb-12 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          I Am <span className="text-indigo-400">AI</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Daily deep-dives into AI research, industry shifts, and the ideas
          reshaping our world — curated for curious minds.
        </p>
        <SubscribeForm />
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">
          Latest Posts
        </h2>

        {postList.length === 0 ? (
          <p className="text-gray-500 text-center py-12">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid gap-8">
            {postList.map((post) => (
              <article
                key={post.id}
                className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-indigo-500 transition-colors"
              >
                {post.cover_image_url && (
                  <img
                    src={post.cover_image_url}
                    alt={post.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </p>
                  <h3 className="text-xl font-bold mb-2 leading-snug">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-indigo-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h3>
                  <p className="text-gray-400 text-sm leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="inline-block mt-4 text-indigo-400 text-sm font-medium hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
