"use client"
import { useState } from "react"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState("idle")

  async function handleSubmit(e) {
    e.preventDefault()
    if (!email) return
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      setStatus(res.ok ? "success" : "error")
    } catch {
      setStatus("error")
    }
  }

  if (status === "success") return <p className="text-green-400 text-sm">You are in! Check your inbox.</p>

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 flex-wrap">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        className="flex-1 min-w-0 px-4 py-2 rounded-lg bg-zinc-800 border border-zinc-700 text-sm text-white"
      />
      <button type="submit" disabled={status === "loading"}
        className="px-5 py-2 rounded-lg bg-amber-500 text-black font-bold text-sm hover:bg-amber-400 disabled:opacity-50">
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {status === "error" && <p className="w-full text-red-400 text-xs">Something went wrong. Try again.</p>}
    </form>
  )
}
