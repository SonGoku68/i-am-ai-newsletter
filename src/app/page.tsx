import Link from 'next/link'
import SubscribeForm from '@/components/SubscribeForm'
import { createClient } from '@/lib/supabase/server'

type Post = {
  title: string
  slug: string
  excerpt: string
  published_at: string
}

export default async function HomePage() {
  let posts: Post[] = []

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
    <main className="min-h-screen bg-[#090C10]">
      {/* Hero */}
      <section className="relative bg-grid overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#090C10]/60 to-[#090C10] pointer-events-none" />
        <div className="relative max-w-5xl mx-auto px-6 py-28 text-center">
          <div className="inline-block font-mono text-xs font-semibold tracking-widest uppercase text-[#00C2FF] bg-[#00C2FF]/[0.08] border border-[#00C2FF]/20 px-3 py-1 rounded mb-6">
            Daily Intelligence Feed
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-none text-gradient">
            I am AI
          </h1>
          <p className="text-lg md:text-xl text-[#7A8A9B] max-w-2xl mx-auto mb-10 leading-relaxed">
            Cutting-edge AI research, analysis, and the stories reshaping our world — delivered daily.
          </p>
          <div id="subscribe">
            <SubscribeForm />
          </div>
        </div>
      </section>

      {/* Posts Feed */}
      <section className="max-w-5xl mx-auto px-6 py-16">
        <div className="flex items-center gap-3 mb-10">
          <span className="font-mono text-xs text-[#00C2FF] tracking-widest uppercase">Latest</span>
          <div className="flex-1 h-px bg-[#1E2733]" />
          <span className="font-mono text-xs text-[#3D4E60]">{posts.length} posts</span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-24 border border-[#1E2733] rounded-xl bg-[#0F1318]">
            <span className="font-mono text-xs text-[#3D4E60] tracking-widest uppercase">// incoming transmission</span>
            <p className="text-[#7A8A9B] mt-4">First posts coming soon.</p>
          </div>
        ) : (
          <div className="grid gap-4">
            {posts.map((post) => (
              <article key={post.slug} className="group border border-[#1E2733] rounded-xl bg-[#0F1318] p-6 hover:border-[#2A3543] hover:bg-[#151A21] transition-all duration-200">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <time className="font-mono text-xs text-[#3D4E60] tracking-wider">
                      {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </time>
                    <Link href={`/blog/${post.slug}`}>
                      <h2 className="text-lg font-semibold text-[#E8EDF3] mt-1 mb-2 group-hover:text-[#00C2FF] transition-colors leading-snug">
                        {post.title}
                      </h2>
                    </Link>
                    <p className="text-[#7A8A9B] text-sm leading-relaxed line-clamp-2">{post.excerpt}</p>
                  </div>
                  <Link href={`/blog/${post.slug}`} className="shrink-0 text-[#00C2FF] hover:text-[#E8EDF3] transition-colors mt-1">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
