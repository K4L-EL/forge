"use client";

import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { useCartStore } from "@/stores/cart-store";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from "lucide-react";
import { PRODUCT_CATEGORIES } from "@/data/products";
import type { ProductCategory } from "@/lib/types";

function getCategoryLabel(category: ProductCategory): string {
  const found = PRODUCT_CATEGORIES.find((c) => c.id === category);
  return found?.label ?? category;
}

export default function CartPage() {
  const { items, updateQuantity, removeItem, totalItems, totalPrice } =
    useCartStore();
  const subtotal = totalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <MarketingLayout>
      <Section>
        <h1 className="text-3xl font-bold text-navy mb-8">
          Your Cart
          {items.length > 0 && (
            <span className="text-muted-foreground font-normal ml-2">
              ({totalItems()} {totalItems() === 1 ? "item" : "items"})
            </span>
          )}
        </h1>

        {items.length === 0 ? (
          <ClayCard className="p-12 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              Your cart is empty. Add some tests to get started!
            </p>
            <Link
              href="/products"
              className="clay-btn inline-flex items-center gap-2 px-6 py-3.5 text-base"
            >
              Browse Tests
            </Link>
          </ClayCard>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1 space-y-4">
              {items.map((item) => {
                const lineTotal = item.product.price * item.quantity;
                return (
                  <ClayCard key={item.product.id} className="p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-navy text-lg">
                          {item.product.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          {getCategoryLabel(item.product.category)}
                        </p>
                        <p className="text-lg font-bold text-teal mt-1">
                          £{item.product.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2 clay-sm rounded-xl p-1">
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity - 1)
                            }
                            className="p-2 rounded-lg hover:bg-white/50 transition-colors text-navy"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="inline-block min-w-8 text-center font-semibold text-navy">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateQuantity(item.product.id, item.quantity + 1)
                            }
                            className="p-2 rounded-lg hover:bg-white/50 transition-colors text-navy"
                            aria-label="Increase quantity"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-navy">£{lineTotal}</span>
                          <button
                            onClick={() => removeItem(item.product.id)}
                            className="p-2 rounded-lg clay-sm hover:bg-red-50 text-muted-foreground hover:text-destructive transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </ClayCard>
                );
              })}
            </div>

            <aside className="lg:w-96 shrink-0">
              <ClayCard className="p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-navy mb-8">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span className="font-semibold text-navy">£{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span className="font-semibold text-teal">Free</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-navy pt-3 border-t border-border">
                    <span>Total</span>
                    <span>£{total}</span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className={cn(
                    "clay-btn-teal w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                    "rounded-xl font-semibold"
                  )}
                >
                  Proceed to Checkout
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/products"
                  className="block text-center text-teal hover:text-teal-dark font-medium mt-4 text-sm"
                >
                  Continue Shopping
                </Link>
              </ClayCard>
            </aside>
          </div>
        )}
      </Section>
    </MarketingLayout>
  );
}
