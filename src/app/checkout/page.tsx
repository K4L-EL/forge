"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingBag,
  ArrowLeft,
  Lock,
  CreditCard,
  Loader2,
} from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

export default function CheckoutPage() {
  const { items, totalPrice } = useCartStore();
  const [loading, setLoading] = useState(false);
  const subtotal = totalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  async function handlePayWithStripe() {
    setLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            name: item.product.name,
            price: item.product.price,
            quantity: item.quantity,
          })),
        }),
      });
      const data = (await res.json()) as { url?: string; error?: string };
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Checkout failed");
      }
      window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  if (items.length === 0) {
    return (
      <MarketingLayout>
        <Section>
          <ClayCard className="p-12 text-center">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <p className="text-lg text-muted-foreground mb-6">
              Your cart is empty. Add some tests to continue to checkout.
            </p>
            <Link
              href="/products"
              className="clay-btn inline-flex items-center gap-2 px-6 py-3.5 text-base"
            >
              Browse Tests
            </Link>
          </ClayCard>
        </Section>
      </MarketingLayout>
    );
  }

  return (
    <MarketingLayout>
      <Section>
        <Link
          href="/cart"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-navy mb-8 text-sm font-medium"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to cart
        </Link>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 space-y-6">
            <ClayCard className="p-6">
              <h2 className="text-xl font-semibold text-navy mb-2 flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Checkout
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                You will be redirected to Stripe to complete payment securely.
              </p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Lock className="h-4 w-4 shrink-0" />
                <span>Secure checkout powered by Stripe</span>
              </div>
            </ClayCard>

            <button
              type="button"
              disabled={loading}
              onClick={handlePayWithStripe}
              className={cn(
                "clay-btn w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                "rounded-xl font-semibold disabled:opacity-60 disabled:pointer-events-none"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Redirecting…
                </>
              ) : (
                "Pay with Stripe"
              )}
            </button>
          </div>

          <aside className="lg:w-96 shrink-0">
            <ClayCard className="p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-navy mb-6">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6 max-h-64 overflow-y-auto">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <div>
                      <span className="font-medium text-navy">
                        {item.product.name}
                      </span>
                      <span className="text-muted-foreground ml-1">
                        × {item.quantity}
                      </span>
                    </div>
                    <span className="font-semibold text-navy">
                      £{item.product.price * item.quantity}
                    </span>
                  </div>
                ))}
              </div>
              <div className="space-y-3 pt-4 border-t border-border">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal</span>
                  <span className="font-semibold text-navy">£{subtotal}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span className="font-semibold text-teal">Free</span>
                </div>
                <div className="flex justify-between text-lg font-bold text-navy pt-3">
                  <span>Total</span>
                  <span>£{total}</span>
                </div>
              </div>
            </ClayCard>
          </aside>
        </div>
      </Section>
    </MarketingLayout>
  );
}
