import SubscribeForm from '@/components/SubscribeForm'
import { createClient } from '@/lib/supabase/server'
import Link from 'next/link'

export default async function HomePage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from('posts')
    .select('title, slug, content, created_at')
    .eq('published', true)
    .order('created_at', { ascending: false })
    .limit(6)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      <section className="text-center space-y-4">
        <h1 className="text-5xl font-bold tracking-tight">I Am AI</h1>
        <p className="text-xl text-gray-600">Your weekly digest of the most important AI stories.</p>
        <SubscribeForm />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts && posts.length > 0 ? (
            posts.map(post => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200 group"
              >
                <h3 className="text-xl font-semibold group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-400 text-sm mt-1">
                  {new Date(post.created_at).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
                <p className="text-gray-600 mt-3 leading-relaxed">
                  {post.content.slice(0, 140)}…
                </p>
              </Link>
            ))
          ) : (
            <p className="text-gray-500 col-span-2">No posts yet. Check back soon!</p>
          )}
        </div>
      </section>
    </main>
  )
}
