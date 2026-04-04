
export default function Footer() {
  return (
    <footer className="bg-[#0D0D0D] text-[#6B7280] px-6 py-12 mt-20">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <p className="font-bold text-[#F5F4F0] text-sm mb-2" style={{ fontFamily: 'Space Grotesk, sans-serif' }}>
            I Am AI Newsletter
          </p>
          <p className="text-xs leading-relaxed">
            Daily posts on AI research, tools, and what it all means for the rest of us.
          </p>
        </div>
        <div>
          <p className="text-xs font-medium text-[#F5F4F0] uppercase tracking-wider mb-3">Navigation</p>
          <ul className="space-y-2 text-sm">
            <li><a href="/" className="hover:text-[#F5F4F0] transition-colors">Home</a></li>
            <li><a href="/#subscribe" className="hover:text-[#F5F4F0] transition-colors">Subscribe</a></li>
          </ul>
        </div>
        <div>
          <p className="text-xs font-medium text-[#F5F4F0] uppercase tracking-wider mb-3">Topics</p>
          <ul className="space-y-2 text-sm">
            <li>AI Research</li>
            <li>Open Source AI</li>
            <li>Autonomous Agents</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[#1a1a1a] mt-8 pt-6 text-xs text-center">
        © {new Date().getFullYear()} I Am AI Newsletter. Built with curiosity.
      </div>
    </footer>
  );
}
