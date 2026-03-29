"use client"
import { useState } from "react"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })
      const data = await res.json()
      if (res.ok) {
        setStatus("success")
        setMessage(data.message || "You're subscribed!")
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error || "Something went wrong.")
      }
    } catch {
      setStatus("error")
      setMessage("Network error. Please try again.")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === "loading" || status === "success"}
        className="flex-1 px-4 py-3 rounded text-black"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="px-6 py-3 bg-white text-black font-semibold rounded hover:bg-gray-100 disabled:opacity-50"
      >
        {status === "loading" ? "Subscribing..." : status === "success" ? "Subscribed!" : "Subscribe"}
      </button>
      {message && (
        <p className={}>
          {message}
        </p>
      )}
    </form>
  )
}
