import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import { createClient } from '@/lib/supabase/server'

export default async function HomePage() {
  let posts: any[] = []
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('title, slug, excerpt, published_at')
      .order('published_at', { ascending: false })
    if (error) {
      console.error('Posts error:', error.message)
    } else {
      posts = data ?? []
    }
  } catch (err: any) {
    console.error('Supabase connection error:', err?.message ?? err)
  }

  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero */}
      <section className="bg-black text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">I am AI</h1>
        <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Daily insights on artificial intelligence — research, analysis, and ideas that matter.
        </p>
        <SubscribeForm />
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto py-16 px-6">
        <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border-b border-gray-200 pb-8">
                <Link href={`/blog/${post.slug}`} className="group">
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors mb-2">
                    {post.title}
                  </h3>
                </Link>
                {post.excerpt && (
                  <p className="text-gray-600 mb-3">{post.excerpt}</p>
                )}
                {post.published_at && (
                  <time className="text-sm text-gray-400">
                    {new Date(post.published_at).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </time>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
