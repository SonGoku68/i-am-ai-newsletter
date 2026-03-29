"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loggedIn, setLoggedIn] = useState(false)
  const [posts, setPosts] = useState<any[]>([])
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [status, setStatus] = useState("published")
  const [message, setMessage] = useState("")

  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setLoggedIn(true)
    })
  }, [])

  useEffect(() => {
    if (loggedIn) fetchPosts()
  }, [loggedIn])

  async function fetchPosts() {
    const { data } = await supabase
      .from("posts")
      .select("id, title, slug, status, created_at")
      .order("created_at", { ascending: false })
    setPosts(data || [])
  }

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) {
      setMessage("Login failed: " + error.message)
    } else {
      setLoggedIn(true)
      setMessage("")
    }
  }

  async function handleLogout() {
    await supabase.auth.signOut()
    setLoggedIn(false)
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const { error } = await supabase.from("posts").insert({
      title,
      slug,
      summary,
      content,
      cover_image: coverImage,
      status,
    })
    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Post created!")
      setTitle(""); setSlug(""); setSummary(""); setContent(""); setCoverImage("")
      fetchPosts()
    }
  }

  async function handleDelete(id: string) {
    await supabase.from("posts").delete().eq("id", id)
    fetchPosts()
  }

  if (!loggedIn) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-50">
        <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4">
          <h1 className="text-2xl font-bold">Admin Login</h1>
          {message && <p className="text-red-500 text-sm">{message}</p>}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Login
          </button>
        </form>
      </main>
    )
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Admin Panel</h1>
        <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500">Logout</button>
      </div>

      <section className="bg-white border rounded p-6 mb-8">
        <h2 className="text-xl font-semibold mb-4">New Post</h2>
        {message && <p className="text-green-600 text-sm mb-4">{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-3">
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="w-full border rounded px-3 py-2" required />
          <input placeholder="Slug (e.g. my-post)" value={slug} onChange={e => setSlug(e.target.value)} className="w-full border rounded px-3 py-2" required />
          <input placeholder="Summary" value={summary} onChange={e => setSummary(e.target.value)} className="w-full border rounded px-3 py-2" />
          <textarea placeholder="Content (Markdown)" value={content} onChange={e => setContent(e.target.value)} className="w-full border rounded px-3 py-2 h-40" required />
          <input placeholder="Cover Image URL" value={coverImage} onChange={e => setCoverImage(e.target.value)} className="w-full border rounded px-3 py-2" />
          <select value={status} onChange={e => setStatus(e.target.value)} className="w-full border rounded px-3 py-2">
            <option value="published">Published</option>
            <option value="draft">Draft</option>
          </select>
          <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">Create Post</button>
        </form>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-4">All Posts</h2>
        {posts.length === 0 && <p className="text-gray-400">No posts yet.</p>}
        <ul className="space-y-2">
          {posts.map(post => (
            <li key={post.id} className="flex justify-between items-center border rounded px-4 py-3 bg-white">
              <div>
                <span className="font-medium">{post.title}</span>
                <span className={}>
                  {post.status}
                </span>
              </div>
              <button onClick={() => handleDelete(post.id)} className="text-red-500 text-sm hover:underline">Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
