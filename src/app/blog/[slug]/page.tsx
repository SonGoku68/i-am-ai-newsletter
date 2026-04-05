import { createClient } from '@/lib/supabase/server'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import SubscribeForm from '@/components/SubscribeForm'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

async function getPost(slug: string) {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()
  if (error) return null
  return data
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) return { title: 'Post not found' }
  return {
    title: post.title,
    description: post.summary ?? undefined,
    openGraph: { title: post.title, description: post.summary ?? undefined },
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)
  if (!post) notFound()

  return (
    <div className="flex flex-col min-h-dvh">
      <Navbar />

      <main className="flex-1">
        {/* Article header */}
        <header className="relative overflow-hidden border-b border-zinc-800/60">
          <div className="absolute inset-0 bg-gradient-to-b from-brand-950/30 to-transparent pointer-events-none" />
          <div className="container-content relative py-14 sm:py-20 max-w-3xl">
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs text-zinc-500 mb-6">
              <Link href="/" className="hover:text-zinc-300 transition-colors">Home</Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-zinc-300 transition-colors">Blog</Link>
              <span>/</span>
              <span className="text-zinc-400 truncate max-w-[160px]">{post.title}</span>
            </div>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-2 mb-5">
              {post.category && <span className="badge-brand">{post.category}</span>}
              {post.read_time && (
                <span className="badge-zinc">{post.read_time} min read</span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-5 text-balance">
              {post.title}
            </h1>

            {post.summary && (
              <p className="text-zinc-400 text-lg leading-relaxed mb-6 max-w-2xl">
                {post.summary}
              </p>
            )}

            <time className="text-sm text-zinc-600">
              {formatDate(post.created_at)}
            </time>
          </div>
        </header>

        {/* Article body */}
        <article className="container-content max-w-3xl py-12">
          {post.content ? (
            <div
              className="prose-dark"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          ) : (
            <p className="text-zinc-500 italic">Content coming soon.</p>
          )}
        </article>

        {/* Back link */}
        <div className="container-content max-w-3xl pb-8">
          <Link href="/blog" className="btn-ghost text-sm">
            ← Back to all posts
          </Link>
        </div>

        {/* Newsletter CTA */}
        <div className="container-content max-w-3xl pb-24">
          <SubscribeForm />
        </div>
      </main>

      <Footer />
    </div>
  )
}
