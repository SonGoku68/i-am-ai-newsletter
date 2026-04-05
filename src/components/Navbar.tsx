'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-zinc-800/60 bg-surface-950/80 backdrop-blur-xl">
      <div className="container-content flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 shadow-glow-sm text-white font-bold text-sm select-none group-hover:bg-brand-500 transition-colors">
            AI
          </span>
          <span className="font-semibold text-white text-[15px] tracking-tight">
            I Am AI
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          <Link href="/" className="btn-ghost text-[13px]">Home</Link>
          <Link href="/blog" className="btn-ghost text-[13px]">Blog</Link>
          <Link href="/#subscribe" className="btn-primary text-[13px] ml-2">
            Subscribe
          </Link>
        </nav>

        {/* Mobile hamburger */}
        <button
          className="md:hidden btn-ghost p-2"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-zinc-400 mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-zinc-400 mb-1 transition-all" />
          <span className="block w-5 h-0.5 bg-zinc-400 transition-all" />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-zinc-800 bg-surface-950 px-4 py-3 flex flex-col gap-1">
          <Link href="/"        className="btn-ghost justify-start" onClick={() => setOpen(false)}>Home</Link>
          <Link href="/blog"    className="btn-ghost justify-start" onClick={() => setOpen(false)}>Blog</Link>
          <Link href="/#subscribe" className="btn-primary justify-center mt-2" onClick={() => setOpen(false)}>Subscribe</Link>
        </div>
      )}
    </header>
  )
}
