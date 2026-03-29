import { createClient } from '@/lib/supabase';
import { notFound } from 'next/navigation';

export const revalidate = 60;

interface Props {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: Props) {
  const supabase = createClient();
  const { data: post } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .single();

  if (!post) notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-400 text-sm mb-8">
        {post.published_at ? new Date(post.published_at).toLocaleDateString() : ''}
      </p>
      {post.summary && (
        <p className="text-lg text-gray-600 mb-8 italic">{post.summary}</p>
      )}
      <article
        className="prose prose-invert max-w-none"
        dangerouslySetInnerHTML={{ __html: post.body_html ?? post.body ?? '' }}
      />
    </main>
  );
}
