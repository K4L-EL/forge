import { NextResponse } from "next/server";
import { sendEmail } from "@/lib/email";

interface ContactBody {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactBody;
    const { name, email, subject, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json(
        { error: "Invalid email address" },
        { status: 400 }
      );
    }

    const to = process.env.CONTACT_FORM_TO_EMAIL ?? "info@forgelabs.co.uk";
    const cleanSubject = subject?.trim() || "New contact form submission";

    const html = `
      <div style="font-family: -apple-system, system-ui, sans-serif; max-width: 560px; margin: 0 auto; padding: 24px;">
        <h2 style="color: #0A0A1F; margin: 0 0 16px;">New ForgeLabs enquiry</h2>
        <table style="width: 100%; border-collapse: collapse;">
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #0A0A1F; width: 100px;">From</td>
            <td style="padding: 8px 0; color: #333;">${escapeHtml(name)}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #0A0A1F;">Email</td>
            <td style="padding: 8px 0; color: #333;"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; font-weight: 600; color: #0A0A1F;">Subject</td>
            <td style="padding: 8px 0; color: #333;">${escapeHtml(cleanSubject)}</td>
          </tr>
        </table>
        <div style="margin-top: 24px; padding: 16px; background: #FFF8F2; border-left: 4px solid #E6007E; border-radius: 8px;">
          <p style="margin: 0; color: #0A0A1F; white-space: pre-wrap; line-height: 1.6;">${escapeHtml(message)}</p>
        </div>
        <p style="color: #888; font-size: 12px; margin-top: 32px;">
          Submitted via the ForgeLabs website contact form.
        </p>
      </div>
    `;

    await sendEmail({
      to,
      subject: `[ForgeLabs] ${cleanSubject}`,
      html,
      replyTo: { address: email, displayName: name },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send message. Please try again or email info@forgelabs.co.uk directly." },
      { status: 500 }
    );
  }
}
