"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ClayCard } from "@/components/atoms/clay-card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  Save,
  Upload,
  Eye,
  Image as ImageIcon,
  Trash2,
} from "lucide-react";
import Link from "next/link";

interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  author: string;
  tags: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export default function EditPostPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [author, setAuthor] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadPost() {
      try {
        const res = await fetch("/api/admin/posts");
        if (!res.ok) return;

        const posts: Post[] = await res.json();
        const post = posts.find((p) => p.id === params.id);
        if (!post) {
          setError("Post not found.");
          return;
        }

        setTitle(post.title);
        setSlug(post.slug);
        setExcerpt(post.excerpt);
        setContent(post.content);
        setTags(post.tags);
        setAuthor(post.author);
        setCoverImage(post.coverImage || "");
        setPublished(post.published);
      } catch {
        setError("Failed to load post.");
      } finally {
        setLoading(false);
      }
    }

    loadPost();
  }, [params.id]);

  function handleTitleChange(value: string) {
    setTitle(value);
    setSlug(slugify(value));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setCoverImage(data.url);
      }
    } finally {
      setUploading(false);
    }
  }

  async function handleUpdate() {
    if (!title.trim() || !slug.trim()) {
      setError("Title and slug are required.");
      return;
    }

    setError("");
    setSaving(true);

    try {
      const res = await fetch("/api/admin/posts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: params.id,
          title,
          slug,
          excerpt,
          content,
          tags,
          author,
          coverImage: coverImage || null,
          published,
        }),
      });

      if (res.ok) {
        router.push("/admin");
      } else {
        const data = await res.json().catch(() => null);
        setError(data?.error || "Failed to update post.");
      }
    } catch {
      setError("Something went wrong.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!confirm("Delete this post? This cannot be undone.")) return;

    const res = await fetch("/api/admin/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: params.id }),
    });

    if (res.ok) router.push("/admin");
  }

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="clay-sm h-10 w-48 animate-pulse rounded-xl" />
        <div className="clay h-96 animate-pulse rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/admin"
          className="clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy no-underline transition-all hover:scale-105"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Link>

        <div className="flex items-center gap-3">
          <button
            onClick={handleDelete}
            className={cn(
              "clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-medium",
              "text-coral transition-all hover:scale-105"
            )}
          >
            <Trash2 className="h-4 w-4" />
            Delete
          </button>
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={cn(
              "clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-navy transition-all hover:scale-105",
              showPreview && "clay-pressed"
            )}
          >
            <Eye className="h-4 w-4" />
            {showPreview ? "Editor" : "Preview"}
          </button>
          <button
            onClick={handleUpdate}
            disabled={saving}
            className={cn(
              "clay-btn-teal inline-flex items-center gap-2 px-5 py-2.5 text-sm",
              "disabled:opacity-50"
            )}
          >
            <Save className="h-4 w-4" />
            {saving ? "Saving…" : "Update Post"}
          </button>
        </div>
      </div>

      {error && (
        <div className="clay-sm border-l-4 border-coral px-4 py-3 text-sm text-coral">
          {error}
        </div>
      )}

      <div
        className={cn(
          "grid gap-6",
          showPreview ? "lg:grid-cols-2" : "grid-cols-1"
        )}
      >
        {/* Editor */}
        <div className="space-y-5">
          <ClayCard className="space-y-5 p-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Title</label>
              <Input
                value={title}
                onChange={(e) => handleTitleChange(e.target.value)}
                placeholder="Your post title"
                className="clay-pressed border-none text-lg font-medium"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Slug</label>
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="url-friendly-slug"
                className="clay-pressed border-none font-mono text-sm"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">Excerpt</label>
              <Textarea
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="Brief summary of the post"
                rows={2}
                className="clay-pressed border-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-navy">
                Content (Markdown)
              </label>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your post content here…"
                rows={20}
                className="clay-pressed border-none font-mono text-sm"
              />
            </div>
          </ClayCard>

          <ClayCard className="space-y-5 p-6">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-navy">Tags</label>
                <Input
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="health, fitness, biomarkers"
                  className="clay-pressed border-none"
                />
                <p className="text-xs text-muted-foreground">
                  Comma-separated
                </p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-navy">
                  Author
                </label>
                <Input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Author name"
                  className="clay-pressed border-none"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-sm font-semibold text-navy">
                Cover Image
              </label>
              <div className="flex items-center gap-3">
                <label
                  className={cn(
                    "clay-sm inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-navy transition-all hover:scale-105",
                    uploading && "pointer-events-none opacity-50"
                  )}
                >
                  <Upload className="h-4 w-4" />
                  {uploading ? "Uploading…" : "Upload Image"}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                </label>
                {coverImage && (
                  <span className="truncate text-xs text-teal">
                    Image uploaded
                  </span>
                )}
              </div>
              {coverImage && (
                <div className="clay-pressed overflow-hidden rounded-2xl">
                  <img
                    src={coverImage}
                    alt="Cover preview"
                    className="h-40 w-full object-cover"
                  />
                </div>
              )}
            </div>

            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 rounded accent-teal"
              />
              <span className="font-semibold text-navy">Published</span>
            </label>
          </ClayCard>
        </div>

        {/* Preview */}
        {showPreview && (
          <ClayCard className="h-fit space-y-4 p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              Preview
            </div>
            {coverImage && (
              <div className="overflow-hidden rounded-2xl">
                <img
                  src={coverImage}
                  alt="Cover"
                  className="h-48 w-full object-cover"
                />
              </div>
            )}
            <h1 className="font-display text-2xl font-bold text-navy">
              {title || "Untitled Post"}
            </h1>
            {excerpt && (
              <p className="text-sm italic text-muted-foreground">{excerpt}</p>
            )}
            <div className="prose prose-sm max-w-none whitespace-pre-wrap text-navy/80">
              {content || "Start writing to see a preview…"}
            </div>
            {tags && (
              <div className="flex flex-wrap gap-2 pt-2">
                {tags
                  .split(",")
                  .map((t) => t.trim())
                  .filter(Boolean)
                  .map((tag) => (
                    <span
                      key={tag}
                      className="clay-sm rounded-full px-3 py-1 text-xs font-medium text-navy"
                    >
                      {tag}
                    </span>
                  ))}
              </div>
            )}
          </ClayCard>
        )}
      </div>
    </div>
  );
}
