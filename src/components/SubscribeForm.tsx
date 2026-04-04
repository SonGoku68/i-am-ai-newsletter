'use client'

import { useState } from 'react'
import { createClient } from '@/lib/supabase/client'

export default function SubscribeForm() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email) return

    setStatus('loading')

    try {
      const supabase = createClient()
      const { error } = await supabase
        .from('subscribers')
        .insert([{ email, subscribed_at: new Date().toISOString() }])

      if (error) {
        if (error.code === '23505') {
          setStatus('success')
          setMessage('You are already subscribed!')
        } else {
          setStatus('error')
          setMessage('Something went wrong. Please try again.')
        }
      } else {
        setStatus('success')
        setMessage('You are subscribed! Welcome aboard 🎉')
        setEmail('')
      }
    } catch {
      setStatus('error')
      setMessage('Something went wrong. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="your@email.com"
        required
        disabled={status === 'loading' || status === 'success'}
        className="flex-1 px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={status === 'loading' || status === 'success'}
        className="px-6 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white rounded-lg font-medium transition-colors"
      >
        {status === 'loading' ? 'Subscribing...' : 'Subscribe'}
      </button>
      {message && (
        <p className={`text-sm mt-2 sm:mt-0 sm:col-span-2 ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
          {message}
        </p>
      )}
    </form>
  )
}
