import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Invalid email" }, { status: 400 })
  }

  const supabase = await createClient()
  const { error } = await supabase
    .from("subscribers")
    .upsert({ email, subscribed_at: new Date().toISOString() }, { onConflict: "email" })

  if (error) {
    console.error("Subscribe error:", error)
    return NextResponse.json({ error: "Could not subscribe. Please try again." }, { status: 500 })
  }

  return NextResponse.json({ ok: true })
}
