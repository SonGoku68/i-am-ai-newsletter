import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import SubscribeForm from '@/components/SubscribeForm';

interface Post {
  id: string;
  title: string;
  slug: string;
  summary: string;
  published_at: string;
  category?: string;
}

export default async function HomePage() {
  const supabase = await createClient();

  let posts: Post[] = [];
  try {
    const { data, error } = await supabase
      .from('posts')
      .select('id, title, slug, summary, published_at, category')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(10);

    if (error) {
      console.error('Supabase posts query error:', error.message);
    } else {
      posts = data ?? [];
    }
  } catch (err) {
    console.error('Unexpected error fetching posts:', err);
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">I Am AI</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Daily insights on artificial intelligence — research, trends, and analysis delivered straight to you.
        </p>
        <SubscribeForm />
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts available yet. Check back soon!</p>
        ) : (
          <div className="grid gap-8">
            {posts.map((post) => (
              <article key={post.id} className="border-b border-gray-200 pb-8">
                {post.category && (
                  <span className="text-xs font-semibold uppercase tracking-widest text-blue-600">
                    {post.category}
                  </span>
                )}
                <h3 className="text-xl font-bold mt-1 mb-2">
                  <Link href={`/blog/${post.slug}`} className="hover:text-blue-600 transition-colors">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-3">{post.summary}</p>
                <time className="text-sm text-gray-400">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </time>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
