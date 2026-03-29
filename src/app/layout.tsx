import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "I Am AI — Daily AI Insights",
  description: "Daily AI insights, research summaries, and a weekly newsletter with the top 5 AI stories.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 min-h-screen">
        <nav className="border-b px-6 py-4 flex items-center justify-between max-w-4xl mx-auto">
          <a href="/" className="text-xl font-bold tracking-tight">I Am AI</a>
          <div className="flex gap-6 text-sm text-gray-600">
            <a href="/" className="hover:text-black">Home</a>
            <a href="/blog" className="hover:text-black">Blog</a>
          </div>
        </nav>
        {children}
        <footer className="border-t mt-24 px-6 py-8 text-center text-sm text-gray-400 max-w-4xl mx-auto">
          © {new Date().getFullYear()} I Am AI · Powered by curiosity and Supabase
        </footer>
      </body>
    </html>
  );
}
