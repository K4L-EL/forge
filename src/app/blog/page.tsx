import Link from "next/link";
import { Calendar, User, ArrowRight, Tag } from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
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
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const posts = await prisma.post.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <MarketingLayout>
      <Section>
        <SectionHeading
          eyebrow="Blog"
          title="Health Insights & Guides"
        />

        {posts.length === 0 ? (
          <p className="text-center text-lg text-muted-foreground">
            No articles yet. Check back soon!
          </p>
        ) : (
          <ul
            className={cn(
              "grid gap-8 list-none p-0 m-0",
              "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
            )}
          >
            {posts.map((post) => {
              const tags = splitTags(post.tags);
              return (
                <li key={post.id}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal focus-visible:ring-offset-2 focus-visible:ring-offset-cream rounded-[24px]"
                  >
                    <ClayCard
                      hover
                      className="group flex h-full flex-col overflow-hidden"
                    >
                      {post.coverImage ? (
                        <img
                          src={post.coverImage}
                          alt=""
                          className="aspect-16/10 w-full object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                        />
                      ) : null}
                      <div className="flex flex-1 flex-col gap-3 p-6">
                        <h2 className="font-bold text-navy text-xl leading-snug">
                          {post.title}
                        </h2>
                        <p className="line-clamp-3 text-muted-foreground text-sm leading-relaxed">
                          {post.excerpt}
                        </p>
                        {tags.length > 0 ? (
                          <div className="flex flex-wrap gap-2">
                            {tags.map((tag) => (
                              <span
                                key={tag}
                                className="inline-flex items-center gap-1 rounded-full bg-mist px-2.5 py-0.5 text-xs font-medium text-navy"
                              >
                                <Tag
                                  className="h-3 w-3 shrink-0 text-teal"
                                  aria-hidden
                                />
                                {tag}
                              </span>
                            ))}
                          </div>
                        ) : null}
                        <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-1 border-t border-border/60 pt-4 text-xs text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <User className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
                            {post.author}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 shrink-0 text-teal" aria-hidden />
                            <time dateTime={post.createdAt.toISOString()}>
                              {formatDate(post.createdAt)}
                            </time>
                          </span>
                        </div>
                        <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-teal transition-colors group-hover:text-teal-dark">
                          Read More
                          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                        </span>
                      </div>
                    </ClayCard>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </Section>
    </MarketingLayout>
  );
}
