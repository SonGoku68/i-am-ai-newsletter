import { notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';

export const revalidate = 60;

interface Post {
  id: string;
  slug: string;
  title: string;
  summary: string;
  content: string;
  published_at: string;
  cover_image_url?: string;
  author?: string;
}

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from('posts')
    .select('title, summary')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (!data) return { title: 'Post Not Found — I Am AI' };

  return {
    title: `${data.title} — I Am AI`,
    description: data.summary,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data: post, error } = await supabase
    .from('posts')
    .select('id, slug, title, summary, content, published_at, cover_image_url, author')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) {
    notFound();
  }

  const typedPost = post as Post;

  return (
    <main className="min-h-screen bg-gray-950 text-gray-100">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Back link */}
        <Link
          href="/"
          className="text-indigo-400 text-sm hover:underline mb-8 inline-block"
        >
          ← Back to all posts
        </Link>

        {/* Cover image */}
        {typedPost.cover_image_url && (
          <img
            src={typedPost.cover_image_url}
            alt={typedPost.title}
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
        )}

        {/* Meta */}
        <p className="text-xs text-gray-500 uppercase tracking-widest mb-3">
          {new Date(typedPost.published_at).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
          {typedPost.author ? ` · ${typedPost.author}` : ''}
        </p>

        {/* Title */}
        <h1 className="text-4xl font-extrabold leading-tight mb-4">
          {typedPost.title}
        </h1>

        {/* Summary */}
        <p className="text-lg text-gray-400 mb-10 leading-relaxed">
          {typedPost.summary}
        </p>

        {/* Content */}
        <article
          className="prose prose-invert prose-lg max-w-none prose-headings:text-gray-100 prose-a:text-indigo-400"
          dangerouslySetInnerHTML={{ __html: typedPost.content ?? '' }}
        />
      </div>
    </main>
  );
}
