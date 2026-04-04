import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

interface Props {
  params: Promise<{ slug: string }>
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single()

  if (!post) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      {/* Header */}
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            I Am AI
          </Link>
          <Link href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to home
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Category */}
        {post.category && (
          <span className="text-xs font-medium text-blue-400 uppercase tracking-wider">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h1 className="text-3xl sm:text-4xl font-bold text-white mt-3 mb-4 leading-tight">
          {post.title}
        </h1>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-xl text-gray-400 mb-6 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-10 pb-6 border-b border-gray-800">
          {post.published_at && (
            <time>
              {new Date(post.published_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </time>
          )}
          {post.author && <span>By {post.author}</span>}
        </div>

        {/* Body */}
        <div
          className="prose prose-invert prose-lg max-w-none
            prose-headings:text-white
            prose-p:text-gray-300
            prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
            prose-strong:text-white
            prose-code:text-blue-300
            prose-blockquote:border-blue-500 prose-blockquote:text-gray-400"
          dangerouslySetInnerHTML={{ __html: post.content || '' }}
        />
      </article>

      {/* Footer */}
      <footer className="border-t border-gray-800 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© {new Date().getFullYear()} I Am AI Newsletter. Powered by curiosity and artificial intelligence.</p>
        </div>
      </footer>
    </main>
  )
}
