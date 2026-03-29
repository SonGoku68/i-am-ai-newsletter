import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"

export default async function PostPage({ params }: { params: { slug: string } }) {
  const supabase = await createClient()
  const { data: post } = await supabase
    .from("posts")
    .select("title,content,created_at")
    .eq("slug", params.slug)
    .single()

  if (!post) notFound()

  return (
    <main className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-500 text-sm mb-8">{new Date(post.created_at).toLocaleDateString()}</p>
      <article className="whitespace-pre-wrap prose max-w-none">{post.content}</article>
    </main>
  )
}
