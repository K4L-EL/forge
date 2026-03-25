import { NextResponse } from "next/server";
import { cookies } from "next/headers";

const COOKIE_NAME = "admin-auth";
const COOKIE_VALUE = "authenticated";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const password =
    typeof body === "object" &&
    body !== null &&
    "password" in body &&
    typeof (body as { password: unknown }).password === "string"
      ? (body as { password: string }).password
      : undefined;

  if (password === undefined) {
    return NextResponse.json({ error: "password is required" }, { status: 400 });
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected || password !== expected) {
    return NextResponse.json({ error: "Invalid password" }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    path: "/",
    maxAge: 86400,
  });

  return NextResponse.json({ success: true });
}

export async function GET() {
  const cookieStore = await cookies();
  const authenticated = cookieStore.get(COOKIE_NAME)?.value === COOKIE_VALUE;
  return NextResponse.json({ authenticated });
}

export async function DELETE() {
  const cookieStore = await cookies();
  cookieStore.delete({ name: COOKIE_NAME, path: "/" });
  return NextResponse.json({ success: true });
}
