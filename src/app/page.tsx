import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SubscribeForm from '@/components/SubscribeForm';

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  published_at: string;
  category: string;
};

export default async function HomePage() {
  const supabase = await createClient();

  let posts: Post[] = [];
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .order('published_at', { ascending: false });
    if (!error && data) {
      posts = data;
    }
  } catch (_) {
    // Supabase unavailable — render empty list
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <h1 className="text-5xl font-extrabold tracking-tight mb-4">
          I am <span className="text-indigo-400">AI</span>
        </h1>
        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Daily insights on artificial intelligence — research, analysis, and the
          stories shaping our future.
        </p>
        <SubscribeForm />
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 pb-24">
        <h2 className="text-2xl font-bold mb-8 border-b border-gray-800 pb-4">
          Latest Posts
        </h2>

        {posts.length === 0 ? (
          <p className="text-gray-500 text-center py-16">
            No posts yet — check back soon.
          </p>
        ) : (
          <div className="grid gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="block bg-gray-900 rounded-2xl p-6 hover:bg-gray-800 transition-colors"
              >
                {post.category && (
                  <span className="text-xs font-semibold text-indigo-400 uppercase tracking-widest">
                    {post.category}
                  </span>
                )}
                <h3 className="text-xl font-bold mt-1 mb-2">{post.title}</h3>
                <p className="text-gray-400 text-sm line-clamp-2">{post.excerpt}</p>
                <p className="text-gray-600 text-xs mt-3">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
