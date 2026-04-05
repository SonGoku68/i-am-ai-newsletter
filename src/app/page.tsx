import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import SubscribeForm from '@/components/SubscribeForm'

export const revalidate = 60

export default async function HomePage() {
  let posts: any[] = []
  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('id, slug, title, excerpt, published_at')
      .eq('published', true)
      .order('published_at', { ascending: false })
      .limit(10)
    if (error) {
      console.error('Posts error:', error.message)
    } else {
      posts = data ?? []
    }
  } catch (err) {
    console.error('Supabase error:', err)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <section className="border-b border-gray-800 px-6 py-20 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight text-white">
          I Am AI Newsletter
        </h1>
        <p className="mx-auto mb-8 max-w-xl text-lg text-gray-400">
          Curated AI research, stories, and analysis — delivered every week.
        </p>
        <SubscribeForm />
      </section>
      <section className="mx-auto max-w-5xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold text-white">Latest Posts</h2>
        {posts.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group rounded-xl border border-gray-800 bg-gray-900 p-6 transition hover:border-indigo-500"
              >
                <h3 className="mb-2 text-lg font-semibold text-white group-hover:text-indigo-300 transition">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="mb-4 text-sm text-gray-400 line-clamp-3">{post.excerpt}</p>
                )}
                <p className="text-xs text-gray-500">
                  {new Date(post.published_at).toLocaleDateString('en-US', {
                    year: 'numeric', month: 'long', day: 'numeric',
                  })}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No posts yet. Check back soon!</p>
        )}
      </section>
    </main>
  )
}
