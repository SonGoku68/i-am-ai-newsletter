import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import SubscribeForm from '@/components/SubscribeForm';

export default async function HomePage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, title, slug, summary, published_at, category')
    .order('published_at', { ascending: false })
    .limit(20);

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
          I am AI
        </h1>
        <p className="text-xl text-gray-500 max-w-xl mx-auto">
          Daily insights on artificial intelligence — research, analysis, and the stories shaping our future.
        </p>
      </header>

      {/* Subscribe */}
      <section className="mb-14 bg-blue-50 border border-blue-100 rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Weekly Newsletter
        </h2>
        <p className="text-gray-600 mb-6">
          Get the top 5 AI stories of the week, curated by visits, delivered to your inbox every week.
        </p>
        <SubscribeForm />
      </section>

      {/* Posts */}
      <section>
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Latest Posts</h2>
        {error && (
          <p className="text-red-500 text-sm mb-4">Could not load posts. Please try again later.</p>
        )}
        {!error && (!posts || posts.length === 0) && (
          <p className="text-gray-500">No posts yet. Check back soon!</p>
        )}
        <div className="space-y-8">
          {posts?.map((post) => (
            <article key={post.id} className="border-b border-gray-100 pb-8 last:border-0">
              <div className="flex items-center gap-3 mb-2">
                {post.category && (
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full text-xs font-medium">
                    {post.category}
                  </span>
                )}
                {post.published_at && (
                  <time className="text-sm text-gray-400" dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 leading-snug">
                <Link
                  href={`/blog/${post.slug}`}
                  className="hover:text-blue-600 transition-colors"
                >
                  {post.title}
                </Link>
              </h3>
              {post.summary && (
                <p className="text-gray-600 leading-relaxed">{post.summary}</p>
              )}
              <Link
                href={`/blog/${post.slug}`}
                className="inline-block mt-3 text-sm font-medium text-blue-600 hover:underline"
              >
                Read more →
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
