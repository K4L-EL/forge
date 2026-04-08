export const dynamic = "force-dynamic";

import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, User, Tag } from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { prisma } from "@/lib/db";
import { cn } from "@/lib/utils";

function splitTags(raw: string): string[] {
  return raw
    .split(/[,;]/)
    .map((t) => t.trim())
    .filter(Boolean);
}

function formatDate(d: Date): string {
  return d.toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = await prisma.post.findUnique({
    where: { slug },
  });

  if (!post || !post.published) {
    notFound();
  }

  const tags = splitTags(post.tags);

  return (
    <MarketingLayout>
      <Section>
        <Link
          href="/blog"
          className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-teal transition-colors hover:text-teal-dark"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to blog
        </Link>

        <ClayCard className="overflow-hidden p-0">
          {post.coverImage ? (
            <div className="w-full overflow-hidden">
              <img
                src={post.coverImage}
                alt=""
                className="max-h-[min(420px,50vh)] w-full object-cover"
              />
            </div>
          ) : null}
          <div className="space-y-6 p-6 md:p-10">
            <header className="space-y-4">
              <h1 className="font-display text-3xl font-bold tracking-tight text-navy sm:text-4xl md:text-5xl">
                {post.title}
              </h1>
              <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground">
                <span className="inline-flex items-center gap-1.5">
                  <User className="h-4 w-4 shrink-0 text-teal" aria-hidden />
                  {post.author}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4 shrink-0 text-teal" aria-hidden />
                  <time dateTime={post.createdAt.toISOString()}>
                    {formatDate(post.createdAt)}
                  </time>
                </span>
              </div>
              {tags.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-full bg-mist px-3 py-1 text-xs font-medium text-navy"
                    >
                      <Tag className="h-3 w-3 shrink-0 text-teal" aria-hidden />
                      {tag}
                    </span>
                  ))}
                </div>
              ) : null}
            </header>

            <div
              className={cn(
                "prose max-w-none text-base leading-relaxed text-navy",
                "[&_h1]:font-display [&_h1]:text-3xl [&_h1]:font-bold [&_h1]:tracking-tight [&_h1]:text-navy [&_h1]:mt-10 [&_h1]:mb-4 [&_h1]:first:mt-0",
                "[&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-bold [&_h2]:text-navy [&_h2]:mt-8 [&_h2]:mb-3",
                "[&_h3]:font-display [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-navy [&_h3]:mt-6 [&_h3]:mb-2",
                "[&_p]:mb-4 [&_p]:text-muted-foreground",
                "[&_a]:font-medium [&_a]:text-teal [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-teal-dark",
                "[&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-6 [&_ul]:text-muted-foreground",
                "[&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-6 [&_ol]:text-muted-foreground",
                "[&_li]:leading-relaxed",
                "[&_strong]:font-semibold [&_strong]:text-navy",
                "[&_code]:rounded-md [&_code]:bg-mist/90 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-sm [&_code]:text-navy",
                "[&_blockquote]:border-l-4 [&_blockquote]:border-teal/35 [&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground",
                "[&_img]:my-6 [&_img]:max-w-full [&_img]:rounded-xl"
              )}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </ClayCard>
      </Section>
    </MarketingLayout>
  );
}
