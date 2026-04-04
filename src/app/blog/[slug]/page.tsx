import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export const revalidate = 60

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const supabase = createClient()
  const { data: post } = await supabase
    .from("posts")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .single()

  if (!post) notFound()

  await supabase.rpc("increment_views", { post_id: post.id }).catch(() => {})

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      {post.cover_image && (
        <img src={post.cover_image} alt={post.title} className="w-full h-64 object-cover rounded-xl mb-8" />
      )}
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      {post.summary && <p className="text-gray-500 text-lg mb-6">{post.summary}</p>}
      <p className="text-xs text-gray-400 mb-8">
        {new Date(post.created_at).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
      </p>
      <article className="prose prose-gray max-w-none">
        {post.content.split("\n").map((line: string, i: number) => (
          <p key={i}>{line}</p>
        ))}
      </article>
    </main>
  )
}
