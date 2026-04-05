import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="border-b border-[#1E2733] bg-[#090C10]/80 backdrop-blur-md sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="font-mono text-xs font-bold tracking-widest uppercase text-[#00C2FF]">I_AM_AI</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#00C2FF] animate-pulse" />
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/" className="text-sm text-[#7A8A9B] hover:text-[#E8EDF3] transition-colors">Feed</Link>
          <Link href="/#subscribe" className="text-sm font-mono tracking-wider uppercase px-4 py-1.5 rounded border border-[#00C2FF] text-[#00C2FF] hover:bg-[#00C2FF]/10 transition-all text-xs">
            Subscribe
          </Link>
        </div>
      </div>
    </nav>
  )
}
