"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    const supabase = createClient()
    const { error } = await supabase.from("subscribers").insert({ email })
    if (error) {
      if (error.code === "23505") {
        setMessage("You're already subscribed!")
        setStatus("success")
      } else {
        setMessage("Something went wrong. Please try again.")
        setStatus("error")
      }
    } else {
      setMessage("You're in! Check your inbox every week.")
      setStatus("success")
      setEmail("")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 w-full max-w-md">
      <input
        type="email"
        placeholder="your@email.com"
        value={email}
        onChange={e => setEmail(e.target.value)}
        required
        disabled={status === "loading" || status === "success"}
        className="flex-1 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <button
        type="submit"
        disabled={status === "loading" || status === "success"}
        className="bg-blue-600 text-white px-5 py-2 rounded text-sm font-medium hover:bg-blue-700 disabled:opacity-60"
      >
        {status === "loading" ? "Subscribing..." : "Subscribe"}
      </button>
      {message && (
        <p className={}>
          {message}
        </p>
      )}
    </form>
  )
}
