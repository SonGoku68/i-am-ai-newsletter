import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import SubscribeForm from "@/components/SubscribeForm"

export default async function HomePage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from("posts")
    .select("title,slug,content,created_at")
    .eq("published", true)
    .order("created_at", { ascending: false })
    .limit(6)

  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-16">
      <section className="text-center space-y-6">
        <h1 className="text-5xl font-bold tracking-tight">I Am AI</h1>
        <p className="text-xl text-gray-500">Daily AI insights.</p>
        <div className="flex justify-center">
          <SubscribeForm />
        </div>
      </section>
      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {posts?.map(p => (
            <Link key={p.slug} href={"/blog/" + p.slug} className="border rounded-xl p-5 hover:shadow-lg transition block">
              <h3 className="font-semibold text-lg">{p.title}</h3>
              <p className="text-gray-400 text-sm mt-1">{new Date(p.created_at).toLocaleDateString()}</p>
              <p className="text-gray-600 text-sm mt-2">{p.content.slice(0, 120)}...</p>
            </Link>
          ))}
          {(!posts || posts.length === 0) && (
            <p className="text-gray-400 col-span-2">No posts yet. Check back soon.</p>
          )}
        </div>
      </section>
    </main>
  )
}
