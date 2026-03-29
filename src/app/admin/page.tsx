"use client"

import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function AdminPage() {
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [summary, setSummary] = useState("")
  const [content, setContent] = useState("")
  const [tags, setTags] = useState("")
  const [status, setStatus] = useState("draft")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  function toSlug(str: string) {
    return str.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
  }

  function handleTitleChange(val: string) {
    setTitle(val)
    setSlug(toSlug(val))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")
    const tagsArray = tags.split(",").map((t) => t.trim()).filter(Boolean)
    const { error } = await supabase.from("posts").insert([
      { title, slug, summary, content, tags: tagsArray, status }
    ])
    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Post saved successfully!")
      setTitle(""); setSlug(""); setSummary(""); setContent(""); setTags(""); setStatus("draft")
    }
    setLoading(false)
  }

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">Admin — New Post</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input className="border p-2 rounded" placeholder="Title" value={title} onChange={(e) => handleTitleChange(e.target.value)} required />
        <input className="border p-2 rounded" placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} required />
        <textarea className="border p-2 rounded" placeholder="Summary" value={summary} onChange={(e) => setSummary(e.target.value)} rows={2} required />
        <textarea className="border p-2 rounded" placeholder="Content (markdown)" value={content} onChange={(e) => setContent(e.target.value)} rows={10} required />
        <input className="border p-2 rounded" placeholder="Tags (comma separated)" value={tags} onChange={(e) => setTags(e.target.value)} />
        <select className="border p-2 rounded" value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        <button className="bg-black text-white py-2 rounded" type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Post"}
        </button>
        {message && <p className="text-sm mt-2">{message}</p>}
      </form>
    </main>
  )
}
