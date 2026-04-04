"use client";
export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

interface Post {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

export default function AdminPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPosts() {
      const { data, error } = await supabase
        .from("posts")
        .select("id, title, slug, published, created_at")
        .order("created_at", { ascending: false });

      if (error) {
        setError(error.message);
      } else {
        setPosts(data ?? []);
      }
      setLoading(false);
    }
    fetchPosts();
  }, []);

  async function togglePublished(post: Post) {
    const { error } = await supabase
      .from("posts")
      .update({ published: !post.published })
      .eq("id", post.id);

    if (!error) {
      setPosts((prev) =>
        prev.map((p) =>
          p.id === post.id ? { ...p, published: !p.published } : p
        )
      );
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <h1 className="text-3xl font-bold mb-8">Admin — Post Manager</h1>

      {loading && <p className="text-gray-400">Loading posts…</p>}
      {error && <p className="text-red-400">Error: {error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="text-gray-400">No posts found.</p>
      )}

      {!loading && posts.length > 0 && (
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="border-b border-gray-700 text-left text-gray-400">
              <th className="py-2 pr-4">Title</th>
              <th className="py-2 pr-4">Slug</th>
              <th className="py-2 pr-4">Created</th>
              <th className="py-2">Published</th>
            </tr>
          </thead>
          <tbody>
            {posts.map((post) => (
              <tr
                key={post.id}
                className="border-b border-gray-800 hover:bg-gray-900 transition"
              >
                <td className="py-2 pr-4 font-medium">{post.title}</td>
                <td className="py-2 pr-4 text-gray-400">{post.slug}</td>
                <td className="py-2 pr-4 text-gray-400">
                  {new Date(post.created_at).toLocaleDateString()}
                </td>
                <td className="py-2">
                  <button
                    onClick={() => togglePublished(post)}
                    className={`px-3 py-1 rounded text-xs font-semibold ${
                      post.published
                        ? "bg-green-700 hover:bg-green-600"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    {post.published ? "Published" : "Draft"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}
