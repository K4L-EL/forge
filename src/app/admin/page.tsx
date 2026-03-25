"use client";

import { useState, useEffect } from "react";
import { ClayCard } from "@/components/atoms/clay-card";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Plus, Edit, Trash2, Eye, EyeOff, Calendar } from "lucide-react";

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

export default function AdminDashboard() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchPosts() {
    try {
      const res = await fetch("/api/admin/posts");
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function togglePublish(post: Post) {
    const res = await fetch("/api/admin/posts", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id, published: !post.published }),
    });
    if (res.ok) fetchPosts();
  }

  async function deletePost(post: Post) {
    if (!confirm(`Delete "${post.title}"? This cannot be undone.`)) return;

    const res = await fetch("/api/admin/posts", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: post.id }),
    });
    if (res.ok) fetchPosts();
  }

  function formatDate(dateStr: string) {
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="clay-sm h-24 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold text-navy">
          Blog Posts
        </h1>
        <Link
          href="/admin/blog/new"
          className={cn(
            "clay-btn inline-flex items-center gap-2 px-5 py-2.5 text-sm no-underline"
          )}
        >
          <Plus className="h-4 w-4" />
          New Post
        </Link>
      </div>

      {posts.length === 0 ? (
        <ClayCard className="flex flex-col items-center gap-4 px-8 py-16 text-center">
          <div className="clay-sm flex h-16 w-16 items-center justify-center rounded-2xl">
            <Edit className="h-7 w-7 text-muted-foreground" />
          </div>
          <h2 className="font-display text-xl font-semibold text-navy">
            No posts yet
          </h2>
          <p className="max-w-sm text-sm text-muted-foreground">
            Start writing your first blog post to share insights with your
            audience.
          </p>
          <Link
            href="/admin/blog/new"
            className={cn(
              "clay-btn-teal mt-2 inline-flex items-center gap-2 px-5 py-2.5 text-sm no-underline"
            )}
          >
            <Plus className="h-4 w-4" />
            Create First Post
          </Link>
        </ClayCard>
      ) : (
        <div className="space-y-4">
          {posts.map((post) => (
            <ClayCard key={post.id} variant="sm" className="p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1 space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <h2 className="truncate font-display text-lg font-semibold text-navy">
                      {post.title}
                    </h2>
                    <span
                      className={cn(
                        "inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-semibold",
                        post.published
                          ? "bg-teal/15 text-teal-dark"
                          : "bg-sunny/25 text-sunny-dark"
                      )}
                    >
                      {post.published ? "Published" : "Draft"}
                    </span>
                  </div>
                  <p className="line-clamp-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {formatDate(post.createdAt)}
                    {post.tags && (
                      <>
                        <span className="mx-1">·</span>
                        <span className="truncate">
                          {post.tags
                            .split(",")
                            .map((t) => t.trim())
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Link
                    href={`/admin/blog/${post.id}/edit`}
                    className={cn(
                      "clay-sm flex h-9 w-9 items-center justify-center rounded-xl",
                      "text-navy transition-all hover:scale-110 hover:text-teal"
                    )}
                    title="Edit"
                  >
                    <Edit className="h-4 w-4" />
                  </Link>
                  <button
                    onClick={() => togglePublish(post)}
                    className={cn(
                      "clay-sm flex h-9 w-9 items-center justify-center rounded-xl",
                      "text-navy transition-all hover:scale-110",
                      post.published ? "hover:text-sunny-dark" : "hover:text-teal"
                    )}
                    title={post.published ? "Unpublish" : "Publish"}
                  >
                    {post.published ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={() => deletePost(post)}
                    className={cn(
                      "clay-sm flex h-9 w-9 items-center justify-center rounded-xl",
                      "text-navy transition-all hover:scale-110 hover:text-coral"
                    )}
                    title="Delete"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </ClayCard>
          ))}
        </div>
      )}
    </div>
  );
}
