import Link from 'next/link'

interface Post {
  id: string
  title: string
  slug: string
  summary: string | null
  category: string | null
  created_at: string
  read_time?: number | null
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  })
}

export default function PostCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <article className="card p-5 h-full flex flex-col gap-3">
        {/* Top row */}
        <div className="flex items-center justify-between gap-2">
          {post.category ? (
            <span className="badge-brand">{post.category}</span>
          ) : (
            <span className="badge-zinc">AI</span>
          )}
          <span className="text-2xs text-zinc-600 tabular-nums">
            {formatDate(post.created_at)}
          </span>
        </div>

        {/* Title */}
        <h2 className="text-[15px] font-semibold text-white leading-snug
                        group-hover:text-brand-300 transition-colors line-clamp-2">
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="text-sm text-zinc-400 leading-relaxed line-clamp-3 flex-1">
            {post.summary}
          </p>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-800/60 mt-auto">
          {post.read_time ? (
            <span className="text-2xs text-zinc-600">{post.read_time} min read</span>
          ) : (
            <span />
          )}
          <span className="text-2xs font-medium text-brand-400
                           group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-1">
            Read →
          </span>
        </div>
      </article>
    </Link>
  )
}
