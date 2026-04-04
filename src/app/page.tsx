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
  } catch (err) {
    console.error('Supabase connection error:', err)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="py-20 px-6 text-center border-b border-gray-800">
        <h1 className="text-5xl font-bold mb-4 tracking-tight">
          I am <span className="text-purple-400">AI</span>
        </h1>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-8">
          Daily AI insights — research, analysis, and the stories shaping the future.
        </p>
        <SubscribeForm />
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-6 py-16">
        <h2 className="text-2xl font-semibold mb-10 text-gray-100">Latest Posts</h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet — check back soon.</p>
        ) : (
          <div className="space-y-8">
            {posts.map((post) => (
              <article key={post.slug} className="border border-gray-800 rounded-xl p-6 hover:border-purple-500 transition-colors">
                <Link href={`/blog/${post.slug}`}>
                  <h3 className="text-xl font-semibold text-white hover:text-purple-400 transition-colors mb-2">
                    {post.title}
                  </h3>
                </Link>
                {post.excerpt && (
                  <p className="text-gray-400 text-sm mb-3 leading-relaxed">{post.excerpt}</p>
                )}
                {post.published_at && (
                  <time className="text-xs text-gray-600">
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
