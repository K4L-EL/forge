"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ProductCard } from "@/components/molecules/product-card";
import { getFeaturedProducts } from "@/data/products";
import { cn } from "@/lib/utils";

export function ProductHighlights() {
  const featuredProducts = getFeaturedProducts();
  const colCount =
    featuredProducts.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";

  return (
    <Section id="products" className="bg-cream">
      <SectionHeading
        eyebrow="Our Tests"
        title="Designed for People Who Train"
        description="Comprehensive biomarker panels that give you real insights — from hormones and recovery markers to metabolic health. Lab-accurate results, delivered to your door."
      />
      <div
        className={cn(
          "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8",
          colCount
        )}
      >
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      <div className="mt-12 flex justify-center">
        <Link
          href="/products"
          className={cn(
            "clay-btn-teal inline-flex items-center gap-2 px-6 py-3.5 text-base",
            "rounded-2xl font-semibold text-white no-underline transition-all"
          )}
        >
          View All Tests
          <ArrowRight className="h-4 w-4" aria-hidden />
        </Link>
      </div>
    </Section>
  );
}
