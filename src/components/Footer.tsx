import Link from 'next/link'

export default function Footer() {
  const year = new Date().getFullYear()
  return (
    <footer className="border-t border-zinc-800 bg-surface-950 mt-20">
      <div className="container-content py-10 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-brand-600 text-white font-bold text-xs">
            AI
          </span>
          <span className="text-sm text-zinc-500">
            © {year} I Am AI. All rights reserved.
          </span>
        </div>
        <nav className="flex items-center gap-4 text-sm text-zinc-500">
          <Link href="/"      className="hover:text-white transition-colors">Home</Link>
          <Link href="/blog"  className="hover:text-white transition-colors">Blog</Link>
          <Link href="/#subscribe" className="hover:text-white transition-colors">Newsletter</Link>
        </nav>
      </div>
    </footer>
  )
}
