'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'

interface Post {
  id: string
  title: string
  slug: string
  published: boolean
  published_at: string | null
  category: string | null
}

interface Subscriber {
  id: string
  email: string
  subscribed_at: string
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [activeTab, setActiveTab] = useState<'posts' | 'subscribers'>('posts')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      const supabase = createClient()

      const [postsRes, subsRes] = await Promise.all([
        supabase
          .from('posts')
          .select('id, title, slug, published, published_at, category')
          .order('published_at', { ascending: false }),
        supabase
          .from('subscribers')
          .select('id, email, subscribed_at')
          .order('subscribed_at', { ascending: false }),
      ])

      if (postsRes.data) setPosts(postsRes.data)
      if (subsRes.data) setSubscribers(subsRes.data)
      setLoading(false)
    }

    fetchData()
  }, [])

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <header className="border-b border-gray-800 bg-gray-900">
        <div className="max-w-5xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="text-xl font-bold text-white">I Am AI — Admin</h1>
          <a href="/" className="text-sm text-gray-400 hover:text-white transition-colors">
            ← Back to site
          </a>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-sm text-gray-400">Total Posts</p>
            <p className="text-3xl font-bold text-white mt-1">{posts.length}</p>
            <p className="text-xs text-gray-500 mt-1">
              {posts.filter((p) => p.published).length} published
            </p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-lg p-6">
            <p className="text-sm text-gray-400">Subscribers</p>
            <p className="text-3xl font-bold text-white mt-1">{subscribers.length}</p>
            <p className="text-xs text-gray-500 mt-1">email list</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6 border-b border-gray-800">
          <button
            onClick={() => setActiveTab('posts')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'posts'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab('subscribers')}
            className={`pb-3 text-sm font-medium transition-colors border-b-2 ${
              activeTab === 'subscribers'
                ? 'border-blue-500 text-white'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Subscribers
          </button>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading...</div>
        ) : activeTab === 'posts' ? (
          <div className="space-y-3">
            {posts.length === 0 ? (
              <p className="text-center py-16 text-gray-500">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <div
                  key={post.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center justify-between"
                >
                  <div>
                    <p className="font-medium text-white">{post.title}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {post.slug} {post.category ? `· ${post.category}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    {post.published_at && (
                      <span className="text-xs text-gray-500">
                        {new Date(post.published_at).toLocaleDateString()}
                      </span>
                    )}
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        post.published
                          ? 'bg-green-900 text-green-400'
                          : 'bg-gray-800 text-gray-400'
                      }`}
                    >
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="space-y-3">
            {subscribers.length === 0 ? (
              <p className="text-center py-16 text-gray-500">No subscribers yet.</p>
            ) : (
              subscribers.map((sub) => (
                <div
                  key={sub.id}
                  className="bg-gray-900 border border-gray-800 rounded-lg p-4 flex items-center justify-between"
                >
                  <p className="text-white">{sub.email}</p>
                  <span className="text-xs text-gray-500">
                    {new Date(sub.subscribed_at).toLocaleDateString()}
                  </span>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </main>
  )
}
