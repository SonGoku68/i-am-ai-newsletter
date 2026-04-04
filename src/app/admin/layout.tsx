export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
        <h1 className="text-lg font-semibold text-gray-800">Admin Panel — I Am AI</h1>
      </nav>
      <main className="p-6">{children}</main>
    </div>
  );
}
