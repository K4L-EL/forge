import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/db";

async function isAuthenticated() {
  const cookieStore = await cookies();
  return cookieStore.get("admin-auth")?.value === "authenticated";
}

function slugify(title: string): string {
  const s = title
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return s || "post";
}

function prismaErrorResponse(error: unknown) {
  const code =
    typeof error === "object" && error !== null && "code" in error
      ? String((error as { code: unknown }).code)
      : undefined;
  if (code === "P2002") {
    return NextResponse.json(
      { error: "A post with this slug already exists" },
      { status: 409 },
    );
  }
  if (code === "P2025") {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  console.error("[admin/posts]", error);
  return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const publishedOnly = searchParams.get("published") === "true";

  const posts = await prisma.post.findMany({
    where: publishedOnly ? { published: true } : undefined,
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const title = typeof b.title === "string" ? b.title : undefined;
  const excerpt = typeof b.excerpt === "string" ? b.excerpt : undefined;
  const content = typeof b.content === "string" ? b.content : undefined;

  if (!title?.trim() || !excerpt?.trim() || !content?.trim()) {
    return NextResponse.json(
      { error: "title, excerpt, and content are required" },
      { status: 400 },
    );
  }

  const slugRaw = typeof b.slug === "string" ? b.slug.trim() : "";
  const slug = slugRaw ? slugify(slugRaw) : slugify(title);

  const coverImage = typeof b.coverImage === "string" ? b.coverImage : undefined;
  const published = typeof b.published === "boolean" ? b.published : undefined;
  const author = typeof b.author === "string" ? b.author : undefined;
  const tags = typeof b.tags === "string" ? b.tags : undefined;

  try {
    const post = await prisma.post.create({
      data: {
        title,
        slug,
        excerpt,
        content,
        ...(coverImage !== undefined && { coverImage }),
        ...(published !== undefined && { published }),
        ...(author !== undefined && { author }),
        ...(tags !== undefined && { tags }),
      },
    });
    return NextResponse.json(post);
  } catch (error) {
    return prismaErrorResponse(error);
  }
}

export async function PUT(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const b = body as Record<string, unknown>;
  const id = typeof b.id === "string" ? b.id : undefined;
  if (!id) {
    return NextResponse.json({ error: "id is required" }, { status: 400 });
  }

  const data: {
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    coverImage?: string | null;
    published?: boolean;
    author?: string;
    tags?: string;
  } = {};

  if (typeof b.title === "string") data.title = b.title;
  if (typeof b.excerpt === "string") data.excerpt = b.excerpt;
  if (typeof b.content === "string") data.content = b.content;
  if (typeof b.coverImage === "string") data.coverImage = b.coverImage;
  if (b.coverImage === null) data.coverImage = null;
  if (typeof b.published === "boolean") data.published = b.published;
  if (typeof b.author === "string") data.author = b.author;
  if (typeof b.tags === "string") data.tags = b.tags;

  if (typeof b.slug === "string") {
    const slugRaw = b.slug.trim();
    if (slugRaw) {
      data.slug = slugify(slugRaw);
    } else if (typeof b.title === "string") {
      data.slug = slugify(b.title);
    } else {
      const existing = await prisma.post.findUnique({
        where: { id },
        select: { title: true },
      });
      if (!existing) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      data.slug = slugify(existing.title);
    }
  }

  if (Object.keys(data).length === 0) {
    return NextResponse.json({ error: "No fields to update" }, { status: 400 });
  }

  try {
    const post = await prisma.post.update({
      where: { id },
      data,
    });
    return NextResponse.json(post);
  } catch (error) {
    return prismaErrorResponse(error);
  }
}

export async function DELETE(request: Request) {
  if (!(await isAuthenticated())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = new URL(request.url).searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id query parameter is required" }, { status: 400 });
  }

  try {
    await prisma.post.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return prismaErrorResponse(error);
  }
}
