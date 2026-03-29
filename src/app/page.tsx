import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import SubscribeForm from "@/components/SubscribeForm"

export const revalidate = 60

export default async function HomePage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, summary, cover_image, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false })
    .limit(10)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight mb-3">I Am AI</h1>
        <p className="text-gray-500 text-lg">Daily insights on artificial intelligence — research, analysis, and stories that matter.</p>
      </header>

      <section className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-12 text-center">
        <h2 className="text-xl font-semibold mb-2">Get the Weekly Top 5</h2>
        <p className="text-gray-500 text-sm mb-4">Every week, the 5 most-read stories delivered to your inbox.</p>
        <div className="flex justify-center">
          <SubscribeForm />
        </div>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        {(!posts || posts.length === 0) && (
          <p className="text-gray-400">No posts yet. Check back soon!</p>
        )}
        <div className="grid gap-6">
          {posts?.map(post => (
            <article key={post.id} className="border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              {post.cover_image && (
                <img src={post.cover_image} alt={post.title} className="w-full h-48 object-cover" />
              )}
              <div className="p-5">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={} className="hover:text-blue-600">
                    {post.title}
                  </Link>
                </h3>
                {post.summary && <p className="text-gray-500 text-sm">{post.summary}</p>}
                <div className="mt-3">
                  <Link href={} className="text-blue-600 text-sm font-medium hover:underline">
                    Read more →
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}
