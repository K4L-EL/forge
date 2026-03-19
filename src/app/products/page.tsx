"use client";

import { useState } from "react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ProductCard } from "@/components/molecules/product-card";
import { products, PRODUCT_CATEGORIES } from "@/data/products";
import { cn } from "@/lib/utils";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("all");

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      !search ||
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.tagline.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <MarketingLayout>
      <Section>
        <SectionHeading
          title="All Blood Tests"
          description="Browse our full range of at-home blood tests. Filter by category or search for specific biomarkers."
        />

        <div className="mb-10 flex flex-col gap-6">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search tests by name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className={cn(
                "clay-sm pl-11 h-11 border-0 bg-white/80 rounded-xl"
              )}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {PRODUCT_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-semibold transition-colors",
                  category === cat.id
                    ? "clay-coral text-navy"
                    : "clay-sm text-muted-foreground hover:text-navy"
                )}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl clay-sm p-12 text-center">
            <p className="text-lg text-muted-foreground">
              No tests found. Try adjusting your search or filters.
            </p>
          </div>
        )}
      </Section>
    </MarketingLayout>
  );
}
