import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email } = await req.json();

  if (!email || typeof email !== "string") {
    return NextResponse.json({ error: "Email is required" }, { status: 400 });
  }

  const apiKey = process.env.MAILCHIMP_API_KEY ?? process.env.mailchimp_api_key;
  const audienceId = process.env.MAILCHIMP_AUDIENCE_ID ?? process.env.mailchimp_audience_id;
  const dc = process.env.MAILCHIMP_DC ?? process.env.mailchimp_dc;

  if (!apiKey || !audienceId || !dc) {
    return NextResponse.json({ error: "Server misconfiguration" }, { status: 500 });
  }

  const res = await fetch(
    `https://${dc}.api.mailchimp.com/3.0/lists/${audienceId}/members`,
    {
      method: "POST",
      headers: {
        Authorization: `apikey ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, status: "subscribed" }),
    }
  );

  const data = await res.json();

  if (!res.ok) {
    // 400 with "Member Exists" is fine — treat it as success
    if (data.title === "Member Exists") {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: data.detail ?? "Subscription failed" }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
