import Link from "next/link"
import SubscribeForm from "@/components/SubscribeForm"

export default function HomePage() {
  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-bold mb-2">I Am AI Newsletter</h1>
        <p className="text-gray-500 text-lg">Daily AI news, research &amp; insights — curated for curious minds.</p>
      </header>

      <section className="mb-12 bg-gray-50 border border-gray-200 rounded-xl p-6">
        <h2 className="text-xl font-semibold mb-1">Get the Weekly Top 5</h2>
        <p className="text-gray-500 mb-4 text-sm">Every week we send you the 5 most-read AI stories. No spam.</p>
        <SubscribeForm />
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-6">Latest Posts</h2>
        <p className="text-gray-400 italic">Posts loading soon...</p>
      </section>
    </main>
  )
}
