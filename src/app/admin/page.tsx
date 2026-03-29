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
    return str
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
  }

  function handleTitleChange(val: string) {
    setTitle(val)
    setSlug(toSlug(val))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setMessage("")

    const tagsArray = tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean)

    const { error } = await supabase.from("posts").insert([
      {
        title,
        slug,
        summary,
        content,
        tags: tagsArray,
        status,
        published_at: status === "published" ? new Date().toISOString() : null,
      },
    ])

    if (error) {
      setMessage("Error: " + error.message)
    } else {
      setMessage("Post saved successfully!")
      setTitle("")
      setSlug("")
      setSummary("")
      setContent("")
      setTags("")
      setStatus("draft")
    }
    setLoading(false)
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-400">Admin — New Post</h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-1">Title</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Slug</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-gray-400"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Summary</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white h-20"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Content (Markdown)</label>
            <textarea
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white h-48 font-mono text-sm"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
            <input
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1">Status</label>
            <select
              className="w-full bg-gray-800 border border-gray-700 rounded px-3 py-2 text-white"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
          <button
            type="submit"
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-bold py-2 px-6 rounded transition"
          >
            {loading ? "Saving..." : "Save Post"}
          </button>
          {message && (
            <p className={message.startsWith("Error") ? "text-red-400" : "text-green-400"}>
              {message}
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
