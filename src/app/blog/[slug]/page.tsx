import { createClient } from '@/lib/supabase/server'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let post: any = null

  try {
    const supabase = await createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('slug', params.slug)
      .single()
    if (error || !data) return notFound()
    post = data
  } catch {
    return notFound()
  }

  return (
    <main className="min-h-screen bg-[#090C10]">
      <article className="max-w-3xl mx-auto px-6 py-16">
        {/* Back */}
        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs text-[#7A8A9B] hover:text-[#00C2FF] transition-colors mb-10 tracking-wider uppercase">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          Back to feed
        </Link>

        {/* Header */}
        <header className="mb-10">
          <time className="font-mono text-xs text-[#3D4E60] tracking-wider">
            {new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
          </time>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-3 mb-4 text-[#E8EDF3] leading-tight">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-lg text-[#7A8A9B] leading-relaxed border-l-2 border-[#00C2FF] pl-4">
              {post.excerpt}
            </p>
          )}
        </header>

        {/* Divider */}
        <div className="h-px bg-[#1E2733] mb-10" />

        {/* Body */}
        <div className="prose prose-invert max-w-none text-[#7A8A9B] leading-relaxed
          prose-headings:text-[#E8EDF3] prose-headings:font-bold
          prose-a:text-[#00C2FF] prose-a:no-underline hover:prose-a:underline
          prose-code:text-[#00C2FF] prose-code:bg-[#1C2330] prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
          prose-pre:bg-[#0F1318] prose-pre:border prose-pre:border-[#1E2733]
          prose-blockquote:border-l-[#00C2FF] prose-blockquote:text-[#7A8A9B]
          prose-strong:text-[#E8EDF3]">
          {post.content ? (
            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          ) : (
            <p>No content available.</p>
          )}
        </div>
      </article>
    </main>
  )
}
