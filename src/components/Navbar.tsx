
'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-[#0D0D0D] text-[#F5F4F0] px-6 py-4 flex items-center justify-between sticky top-0 z-50 border-b border-[#1a1a1a]">
      <Link href="/" className="font-bold text-lg tracking-tight" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
        I Am AI
      </Link>
      <div className="flex items-center gap-6">
        <Link href="/" className="text-sm text-[#6B7280] hover:text-[#F5F4F0] transition-colors">
          Home
        </Link>
        <Link href="/#subscribe" className="bg-[#6366F1] text-white text-sm px-4 py-2 rounded-md hover:bg-indigo-500 transition-colors">
          Subscribe
        </Link>
      </div>
    </nav>
  );
}
