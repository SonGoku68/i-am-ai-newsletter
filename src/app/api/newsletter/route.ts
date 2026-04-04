import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"

export async function POST() {
  try {
    const supabase = createClient()

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
      `${i + 1}. <a href="${baseUrl}/blog/${p.slug}"><strong>${p.title}</strong></a><br/>${p.summary || ""}`
    ).join("<br/><br/>")

    const html = `
      <h1>Your Weekly AI Top 5</h1>
      <p>Here are the top AI stories this week:</p>
      ${postList}
      <hr/>
      <p style="font-size:12px;color:#666;">
        You received this because you subscribed at <a href="${baseUrl}">${baseUrl}</a>.
      </p>
    `

    const RESEND_API_KEY = process.env.RESEND_API_KEY
    if (!RESEND_API_KEY) {
      return NextResponse.json({ error: "RESEND_API_KEY not set" }, { status: 500 })
    }

    await Promise.all(subscribers.map(sub =>
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: "I Am AI <newsletter@i-am-ai.com>",
          to: sub.email,
          subject: "Your Weekly AI Top 5",
          html,
        }),
      })
    ))

    return NextResponse.json({ message: `Sent to ${subscribers.length} subscribers` })
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 500 })
  }
}
