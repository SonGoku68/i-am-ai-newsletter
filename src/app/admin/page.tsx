"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [loginError, setLoginError] = useState("")
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [postStatus, setPostStatus] = useState("draft")
  const [message, setMessage] = useState("")
  const [saving, setSaving] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => setSession(s))
    return () => subscription.unsubscribe()
  }, [])

  function toSlug(str) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  }

  async function handleLogin(e) {
    e.preventDefault()
    setLoginError("")
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setLoginError(error.message)
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setSaving(true)
    setMessage("")
    const tagsArray = tags.split(",").map(t => t.trim()).filter(Boolean)
    const { error } = await supabase.from("posts").insert([{
      title, slug, summary, content,
      tags: tagsArray, status: postStatus,
      published_at: postStatus === "published" ? new Date().toISOString() : null,
    }])
    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Post saved!")
      setTitle(""); setSlug(""); setSummary(""); setContent(""); setTags(""); setPostStatus("draft")
    }
    setSaving(false)
  }

  if (loading) return <div className="p-8 text-gray-500">Loading...</div>

  if (!session) return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded shadow w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-bold">Admin Login</h1>
        {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border rounded px-3 py-2" required />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border rounded px-3 py-2" required />
        <button type="submit" className="w-full bg-black text-white py-2 rounded">Sign In</button>
      </form>
    </main>
  )

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-purple-400">New Post</h1>
          <button onClick={() => supabase.auth.signOut()} className="text-sm text-gray-400 hover:text-white">Sign out</button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div><label className="block text-sm text-gray-400 mb-1">Title</label>
            <input className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={title} onChange={e => { setTitle(e.target.value); setSlug(toSlug(e.target.value)) }} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Slug</label>
            <input className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-400"
              value={slug} onChange={e => setSlug(e.target.value)} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Summary</label>
            <textarea className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white h-20"
              value={summary} onChange={e => setSummary(e.target.value)} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Content (Markdown)</label>
            <textarea className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white h-48 font-mono text-sm"
              value={content} onChange={e => setContent(e.target.value)} required /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
            <input className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={tags} onChange={e => setTags(e.target.value)} /></div>
          <div><label className="block text-sm text-gray-400 mb-1">Status</label>
            <select className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={postStatus} onChange={e => setPostStatus(e.target.value)}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select></div>
          <button type="submit" disabled={saving}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded">
            {saving ? "Saving..." : "Save Post"}
          </button>
          {message && <p className={message.startsWith("Error") ? "text-red-400" : "text-green-400"}>{message}</p>}
        </form>
      </div>
    </main>
  )
}
