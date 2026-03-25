"use client";

import { useState } from "react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ProductCard } from "@/components/molecules/product-card";
import { products, PRODUCT_CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";
import { Search, SlidersHorizontal, ArrowUpDown } from "lucide-react";
import { Input } from "@/components/ui/input";

type CategoryId = (typeof PRODUCT_CATEGORIES)[number]["id"];

type SortOption =
  | "default"
  | "price-asc"
  | "price-desc"
  | "biomarkers-desc"
  | "name-asc";

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "biomarkers-desc", label: "Most Biomarkers" },
  { value: "name-asc", label: "Name A-Z" },
];

function countByCategory(): Record<string, number> {
  const counts: Record<string, number> = { all: products.length };
  for (const p of products) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts;
}

const CATEGORY_COUNTS = countByCategory();

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<CategoryId>("all");
  const [sort, setSort] = useState<SortOption>("default");

  const q = search.trim().toLowerCase();

  let filteredAndSorted = products.filter((product) => {
    const matchesSearch =
      !q ||
      product.name.toLowerCase().includes(q) ||
      product.tagline.toLowerCase().includes(q) ||
      product.description.toLowerCase().includes(q);
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  switch (sort) {
    case "price-asc":
      filteredAndSorted = [...filteredAndSorted].sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      filteredAndSorted = [...filteredAndSorted].sort((a, b) => b.price - a.price);
      break;
    case "biomarkers-desc":
      filteredAndSorted = [...filteredAndSorted].sort(
        (a, b) => b.biomarkerCount - a.biomarkerCount
      );
      break;
    case "name-asc":
      filteredAndSorted = [...filteredAndSorted].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      break;
    default:
      break;
  }

  return (
    <MarketingLayout>
      <Section>
        <SectionHeading
          title="All Blood Tests"
          description="Browse our full range of at-home blood tests — from single biomarkers to comprehensive panels. Filter by category, search, and sort."
        />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
          <aside className="hidden w-64 shrink-0 lg:block">
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Categories
            </p>
            <nav className="flex flex-col gap-2" aria-label="Product categories">
              {PRODUCT_CATEGORIES.map((cat) => {
                const count = CATEGORY_COUNTS[cat.id] ?? 0;
                const isActive = category === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCategory(cat.id)}
                    className={cn(
                      "w-full rounded-xl px-4 py-3 text-left text-sm font-semibold transition-colors text-navy clay-hover",
                      isActive ? "clay-coral" : "clay-sm text-muted-foreground"
                    )}
                  >
                    {cat.label}{" "}
                    <span
                      className={cn(
                        "font-medium",
                        isActive ? "text-navy/80" : "text-muted-foreground"
                      )}
                    >
                      ({count})
                    </span>
                  </button>
                );
              })}
            </nav>
          </aside>

          <div className="min-w-0 flex-1">
            <div className="mb-6 lg:hidden">
              <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                <SlidersHorizontal className="h-3.5 w-3.5" aria-hidden />
                Category
              </div>
              <div className="-mx-1 flex gap-2 overflow-x-auto pb-1">
                {PRODUCT_CATEGORIES.map((cat) => {
                  const count = CATEGORY_COUNTS[cat.id] ?? 0;
                  const isActive = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={cn(
                        "shrink-0 rounded-full px-4 py-2 text-sm font-semibold transition-colors clay-hover",
                        isActive ? "clay-coral text-navy" : "clay-sm text-muted-foreground"
                      )}
                    >
                      {cat.label}{" "}
                      <span className="font-medium opacity-80">({count})</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="relative min-w-0 flex-1 sm:max-w-md">
                <Search
                  className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <Input
                  type="search"
                  placeholder="Search by name, tagline, or description..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className={cn(
                    "clay-sm h-11 rounded-xl border-0 bg-white/80 pl-11"
                  )}
                  aria-label="Search blood tests"
                />
              </div>

              <div className="relative w-full shrink-0 sm:w-auto sm:min-w-[220px]">
                <ArrowUpDown
                  className="pointer-events-none absolute left-3 top-1/2 z-10 h-4 w-4 -translate-y-1/2 text-muted-foreground"
                  aria-hidden
                />
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className={cn(
                    "clay-sm h-11 w-full cursor-pointer appearance-none rounded-xl border-0 bg-white/80 py-0 pl-10 pr-10 text-sm font-medium text-navy outline-none focus-visible:ring-2 focus-visible:ring-teal/30"
                  )}
                  aria-label="Sort tests"
                >
                  {SORT_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {filteredAndSorted.length > 0 ? (
              <>
                <p className="mb-4 text-sm font-medium text-muted-foreground">
                  Showing {filteredAndSorted.length}{" "}
                  {filteredAndSorted.length === 1 ? "test" : "tests"}
                </p>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {filteredAndSorted.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="rounded-2xl clay-sm bg-cream/50 p-12 text-center">
                <p className="text-lg font-medium text-navy">No tests match your filters</p>
                <p className="mt-2 text-muted-foreground">
                  Try a different search term, category, or sort option.
                </p>
              </div>
            )}
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
}
