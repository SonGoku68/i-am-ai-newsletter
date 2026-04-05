import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'I am AI — Daily AI Intelligence',
  description: 'Daily insights on artificial intelligence — research, analysis, and the stories shaping our future.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#090C10] text-[#E8EDF3] min-h-screen`}>
        <Navbar />
        {children}
        <footer className="border-t border-[#1E2733] mt-20">
          <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <span className="font-mono text-xs text-[#3D4E60] tracking-widest uppercase">I am AI © {new Date().getFullYear()}</span>
            <span className="font-mono text-xs text-[#3D4E60]">Daily intelligence on artificial minds</span>
          </div>
        </footer>
      </body>
    </html>
  )
}
