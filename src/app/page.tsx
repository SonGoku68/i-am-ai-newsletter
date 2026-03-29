import Link from "next/link"
import { createClient } from "@/lib/supabase/server"
import SubscribeForm from "@/components/SubscribeForm"

export const revalidate = 60

export default async function HomePage() {
  const supabase = createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select("id, title, slug, excerpt, published_at, category")
    .eq("published", true)
    .order("published_at", { ascending: false })
    .limit(10)

  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-black text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-bold mb-4">I Am AI</h1>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-8">
          Daily insights on artificial intelligence — research, analysis, and the stories shaping our future.
        </p>
        <SubscribeForm />
      </section>

      {/* Posts Grid */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-2xl font-bold mb-8">Latest Posts</h2>
        {posts && posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <Link
                key={post.id}
                href={}
                className="block border rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                {post.category && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-blue-600">
                    {post.category}
                  </span>
                )}
                <h3 className="text-lg font-bold mt-2 mb-2">{post.title}</h3>
                {post.excerpt && (
                  <p className="text-gray-600 text-sm line-clamp-3">{post.excerpt}</p>
                )}
                {post.published_at && (
                  <p className="text-xs text-gray-400 mt-4">
                    {new Date(post.published_at).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 text-gray-400">
            <p className="text-xl">First posts coming soon.</p>
            <p className="mt-2">Subscribe above to get notified.</p>
          </div>
        )}
      </section>
    </main>
  )
}
