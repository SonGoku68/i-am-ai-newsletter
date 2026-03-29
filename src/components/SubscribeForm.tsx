"use client"
import { useState } from "react"
import { createClient } from "@/lib/supabase/client"

export default function SubscribeForm() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const supabase = createClient()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus("loading")
    const { error } = await supabase.from("subscribers").insert({ email })
    if (error) {
      setStatus("error")
    } else {
      setStatus("success")
      setEmail("")
    }
  }

  if (status === "success") {
    return (
      <div className="text-center py-4">
        <p className="text-green-600 font-semibold text-lg">You are in! Check your inbox soon.</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center gap-3 w-full max-w-md mx-auto">
      <div className="flex gap-2 w-full">
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder="your@email.com"
          required
          className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={status === "loading"}
          className="px-6 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold disabled:opacity-50 whitespace-nowrap"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe Free"}
        </button>
      </div>
      {status === "error" && (
        <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
      )}
    </form>
  )
}
