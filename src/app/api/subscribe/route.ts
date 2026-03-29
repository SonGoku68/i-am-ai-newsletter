import { createClient } from '@/lib/supabase';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  const supabase = createClient();
  const { error } = await supabase
    .from('subscribers')
    .upsert({ email, subscribed_at: new Date().toISOString() }, { onConflict: 'email' });

  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ error: 'Could not subscribe. Try again.' }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
