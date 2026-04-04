export const dynamic = 'force-dynamic';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm px-6 py-4">
        <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
