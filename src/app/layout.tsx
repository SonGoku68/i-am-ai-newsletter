import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'I Am AI Newsletter',
  description: 'Daily AI news, research, and insights. Subscribe to the weekly top 5 stories.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-gray-900 antialiased">
        {children}
      </body>
    </html>
  );
}
