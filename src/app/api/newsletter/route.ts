import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = await createClient()

    // Get top 5 posts by views this week
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)

    const { data: topPosts } = await supabase
      .from("posts")
      .select("title, slug, summary, views")
      .eq("status", "published")
      .gte("created_at", oneWeekAgo.toISOString())
      .order("views", { ascending: false })
      .limit(5)

    const { data: subscribers } = await supabase
      .from("subscribers")
      .select("email")
      .eq("active", true)

    if (!topPosts || topPosts.length === 0) {
      return NextResponse.json({ message: "No posts to send" }, { status: 200 })
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ message: "No subscribers" }, { status: 200 })
    }

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://i-am-ai-newsletter.vercel.app"

    const postList = topPosts.map((p, i) =>
      
    ).join("<br/><br/>")

    const html = 

    // Send via Resend
    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 })
    }

    const emailPromises = subscribers.map(sub =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ,
        },
        body: JSON.stringify({
          from: "I Am AI <newsletter@i-am-ai.com>",
          to: sub.email,
          subject: "Your Weekly AI Top 5 🤖",
          html,
        }),
      })
    )

    await Promise.all(emailPromises)

    return NextResponse.json({ message:  })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
