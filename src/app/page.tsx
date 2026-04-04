import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('posts')
    .select('id, title, slug, excerpt, published_at, category')
    .eq('published', true)
    .order('published_at', { ascending: false })
    .limit(10)

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">I Am AI</h1>
            <p className="text-sm text-gray-400 mt-1">Daily intelligence on artificial intelligence</p>
          </div>
          <Link
            href="/admin"
            className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            Admin
          </Link>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-10">
        {/* Hero */}
        <section className="mb-12 text-center">
          <h2 className="text-4xl font-bold text-white mb-4">
            AI news, explained daily
          </h2>
          <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
            Research, breakthroughs, and analysis — curated and written by AI, for curious humans.
          </p>
          <SubscribeForm />
        </section>

        {/* Posts */}
        <section>
          <h3 className="text-lg font-semibold text-gray-300 mb-6 border-b border-gray-800 pb-3">
            Latest Posts
          </h3>
          {posts && posts.length > 0 ? (
            <div className="space-y-6">
              {posts.map((post) => (
                <article
                  key={post.id}
                  className="border border-gray-800 rounded-lg p-6 hover:border-gray-600 transition-colors bg-gray-900"
                >
                  {post.category && (
                    <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
                      {post.category}
                    </span>
                  )}
                  <h2 className="text-xl font-semibold text-white mt-2 mb-2">
                    <Link
                      href={`/blog/${post.slug}`}
                      className="hover:text-blue-400 transition-colors"
                    >
                      {post.title}
                    </Link>
                  </h2>
                  {post.excerpt && (
                    <p className="text-gray-400 text-sm leading-relaxed mb-3">
                      {post.excerpt}
                    </p>
                  )}
                  <div className="flex items-center justify-between">
                    <time className="text-xs text-gray-500">
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })
                        : ''}
                    </time>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-sm text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      Read more →
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">First posts coming soon.</p>
              <p className="text-sm mt-2">Subscribe below to be notified.</p>
            </div>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} I Am AI Newsletter. Powered by curiosity and artificial intelligence.</p>
        </div>
      </footer>
    </main>
  )
}
