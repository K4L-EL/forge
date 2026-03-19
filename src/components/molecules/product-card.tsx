"use client";

import Link from "next/link";
import { ClayCard } from "@/components/atoms/clay-card";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, ArrowRight, Droplets, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { useCartStore } from "@/stores/cart-store";
import type { Product } from "@/lib/types";

const accentMap = {
  coral: "bg-coral/10 text-coral border-coral/20",
  teal: "bg-teal/10 text-teal border-teal/20",
  purple: "bg-purple/10 text-purple border-purple/20",
  sunny: "bg-sunny/20 text-navy border-sunny/30",
};

const dotMap = {
  coral: "bg-coral",
  teal: "bg-teal",
  purple: "bg-purple",
  sunny: "bg-sunny",
};

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);

  return (
    <ClayCard hover className={cn("p-6 flex flex-col h-full relative group", className)}>
      {product.badge && (
        <Badge
          className={cn(
            "absolute -top-3 right-6 border font-semibold text-xs px-3 py-1 rounded-full",
            accentMap[product.color]
          )}
        >
          {product.badge}
        </Badge>
      )}

      <div className="flex items-center gap-3 mb-4">
        <div className={cn("w-3 h-3 rounded-full", dotMap[product.color])} />
        <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          {product.category.replace("-", " ")}
        </span>
      </div>

      <h3 className="text-xl font-bold text-navy font-display mb-1">{product.name}</h3>
      <p className="text-sm text-muted-foreground mb-4">{product.tagline}</p>

      <div className="flex items-center gap-4 text-xs text-muted-foreground mb-5">
        <span className="flex items-center gap-1">
          <Droplets className="w-3.5 h-3.5" />
          {product.biomarkerCount} biomarkers
        </span>
        <span className="flex items-center gap-1">
          <Clock className="w-3.5 h-3.5" />
          {product.turnaroundDays} days
        </span>
      </div>

      <div className="mt-auto pt-4 border-t border-border/50 flex items-end justify-between">
        <div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-bold text-navy">£{product.price}</span>
            {product.originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                £{product.originalPrice}
              </span>
            )}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
            }}
            className="clay-btn px-3 py-2.5 text-sm flex items-center gap-1.5"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingCart className="w-4 h-4" />
            Add
          </button>
          <Link
            href={`/products/${product.slug}`}
            className="clay-btn-teal px-3 py-2.5 text-sm flex items-center gap-1.5"
          >
            View
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </ClayCard>
  );
}
