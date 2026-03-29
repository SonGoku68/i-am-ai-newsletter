import { NextRequest, NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: "Email required" }, { status: 400 })

  const supabase = await createClient()
  const { error } = await supabase.from("subscribers").insert({ email })

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json({ message: "Already subscribed" }, { status: 200 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ message: "Subscribed" }, { status: 200 })
}
