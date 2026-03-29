"use client";
import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type Post = {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
};

export default function AdminPage() {
  const supabase = createClientComponentClient();
  const [session, setSession] = useState<any>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, [supabase]);

  useEffect(() => {
    if (session) {
      supabase
        .from("posts")
        .select("id, title, slug, published, created_at")
        .order("created_at", { ascending: false })
        .then(({ data }) => {
          if (data) setPosts(data);
          setLoading(false);
        });
    }
  }, [session, supabase]);

  if (!session) {
    return (
      <main className="max-w-xl mx-auto py-20 px-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Admin — Not signed in</h1>
        <p className="text-gray-400">Sign in via Supabase to access this panel.</p>
      </main>
    );
  }

  return (
    <main className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Panel</h1>
      {loading ? (
        <p className="text-gray-400">Loading posts…</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border border-gray-700 rounded p-4 flex justify-between items-center">
              <div>
                <p className="font-medium">{post.title}</p>
                <p className="text-sm text-gray-400">{post.slug} — {post.published ? "Published" : "Draft"}</p>
              </div>
              <span className={`text-xs px-2 py-1 rounded ${post.published ? "bg-green-800 text-green-200" : "bg-yellow-800 text-yellow-200"}`}>
                {post.published ? "Live" : "Draft"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
