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
  visit_count: number;
}

export default async function HomePage() {
  const supabase = await createClient();

  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, slug, title, summary, published_at, visit_count')
    .order('published_at', { ascending: false })
    .limit(10);

  if (error) {
    console.error('Failed to fetch posts:', error.message);
  }

  const postList: Post[] = posts || [];

  return (
    <main className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">I Am AI</h1>
            <p className="text-sm text-gray-500">Daily AI news &amp; research</p>
          </div>
          <nav className="flex gap-4 text-sm font-medium text-gray-600">
            <Link href="/" className="hover:text-blue-600">Home</Link>
          </nav>
        </div>
      </header>

      {/* Newsletter CTA */}
      <section className="bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-10 text-center">
          <h2 className="text-2xl font-bold mb-2">Stay ahead in AI</h2>
          <p className="text-blue-100 mb-6">
            Get the top 5 AI stories of the week — every week, straight to your inbox.
          </p>
          <div className="flex justify-center">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-4 py-10">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Latest Posts</h2>
        {postList.length === 0 ? (
          <p className="text-gray-500">No posts yet. Check back soon.</p>
        ) : (
          <div className="grid gap-6">
            {postList.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition-shadow"
              >
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                </Link>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{post.summary}</p>
                <div className="flex items-center justify-between text-xs text-gray-400">
                  <time dateTime={post.published_at}>
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                  <span>{post.visit_count ?? 0} views</span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 mt-10">
        <div className="max-w-4xl mx-auto px-4 py-6 text-center text-sm text-gray-400">
          © {new Date().getFullYear()} I Am AI Newsletter. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
