"use client"
import { useState, useEffect } from "react"
import { createClient } from "@/lib/supabase/client"

export default function AdminPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [session, setSession] = useState(null)
  const [title, setTitle] = useState("")
  const [slug, setSlug] = useState("")
  const [body, setBody] = useState("")
  const [published, setPublished] = useState(false)
  const [msg, setMsg] = useState("")
  const sb = createClient()

  useEffect(() => {
    sb.auth.getSession().then(({ data }) => setSession(data.session))
  }, [])

  async function login(e) {
    e.preventDefault()
    const { error } = await sb.auth.signInWithPassword({ email, password })
    if (error) setMsg(error.message)
    else sb.auth.getSession().then(({ data }) => setSession(data.session))
  }

  async function save(e) {
    e.preventDefault()
    const { error } = await sb.from("posts").insert({ title, slug, content: body, published, views: 0 })
    if (error) setMsg(error.message)
    else { setMsg("Post saved!"); setTitle(""); setSlug(""); setBody("") }
  }

  if (!session) return (
    <div className="max-w-sm mx-auto mt-20 p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Login</h1>
      <form onSubmit={login} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input type="password" className="w-full border p-2 rounded" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button className="w-full bg-black text-white p-2 rounded">Login</button>
      </form>
      {msg && <p className="text-red-500 mt-2">{msg}</p>}
    </div>
  )

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6">
      <h1 className="text-2xl font-bold mb-4">New Post</h1>
      <form onSubmit={save} className="space-y-3">
        <input className="w-full border p-2 rounded" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} />
        <input className="w-full border p-2 rounded" placeholder="slug-here" value={slug} onChange={e => setSlug(e.target.value)} />
        <textarea className="w-full border p-2 rounded h-48" value={body} onChange={e => setBody(e.target.value)} />
        <label className="flex items-center gap-2">
          <input type="checkbox" checked={published} onChange={e => setPublished(e.target.checked)} />
          Published
        </label>
        <button className="bg-black text-white px-4 py-2 rounded">Save Post</button>
      </form>
      {msg && <p className="text-green-600 mt-2">{msg}</p>}
    </div>
  )
}
