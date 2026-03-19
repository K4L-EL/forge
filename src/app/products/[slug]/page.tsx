"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { getProductBySlug, products, PRODUCT_CATEGORIES } from "@/data/products";
import { ProductCard } from "@/components/molecules/product-card";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";
import {
  ShoppingCart,
  ArrowLeft,
  Check,
  Droplets,
  Clock,
  Beaker,
} from "lucide-react";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const product = getProductBySlug(slug);
  const addItem = useCartStore((s) => s.addItem);

  const categoryLabel =
    PRODUCT_CATEGORIES.find((c) => c.id === product?.category)?.label ??
    product?.category;

  const relatedProducts = product
    ? products.filter((p) => p.id !== product.id).slice(0, 3)
    : [];

  if (!product) {
    return (
      <MarketingLayout>
        <Section>
          <div className="rounded-2xl clay-sm p-12 text-center">
            <h2 className="text-xl font-bold text-navy mb-2">Test not found</h2>
            <p className="text-muted-foreground mb-4">
              The blood test you&apos;re looking for doesn&apos;t exist or has
              been removed.
            </p>
            <Link
              href="/products"
              className="clay-btn-teal inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to all tests
            </Link>
          </div>
        </Section>
      </MarketingLayout>
    );
  }

  return (
    <MarketingLayout>
      <Section>
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all tests
        </Link>

        <div className="grid gap-10 lg:grid-cols-3 lg:gap-12">
          <div className="lg:col-span-2 space-y-6">
            <div>
              <span className="inline-block clay-sm px-4 py-1.5 text-sm font-semibold text-muted-foreground mb-3 rounded-full">
                {categoryLabel}
              </span>
              <h1 className="text-3xl sm:text-4xl font-bold text-navy font-display mb-2">
                {product.name}
              </h1>
              <p className="text-xl text-muted-foreground">{product.tagline}</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Droplets className="w-4 h-4" />
                {product.sampleType}
              </span>
              <span className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {product.turnaroundDays} days turnaround
              </span>
              <span className="flex items-center gap-2">
                <Beaker className="w-4 h-4" />
                {product.biomarkerCount} biomarkers
              </span>
            </div>

            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl font-bold text-navy">
                £{product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-muted-foreground line-through">
                  £{product.originalPrice}
                </span>
              )}
            </div>

            <button
              onClick={() => addItem(product)}
              className="clay-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-base"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to cart
            </button>
          </div>

          <div className="space-y-8">
            <ClayCard className="p-6">
              <h3 className="text-lg font-bold text-navy mb-4 font-display">
                Biomarkers Tested
              </h3>
              <div className="flex flex-wrap gap-2">
                {product.biomarkers.map((biomarker) => (
                  <span
                    key={biomarker}
                    className={cn(
                      "inline-flex items-center gap-1.5 clay-sm px-3 py-1.5 text-sm rounded-lg"
                    )}
                  >
                    <Check className="w-3.5 h-3.5 text-teal shrink-0" />
                    {biomarker}
                  </span>
                ))}
              </div>
            </ClayCard>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold text-navy mb-6 font-display">
              Related Tests
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </div>
        )}
      </Section>
    </MarketingLayout>
  );
}
