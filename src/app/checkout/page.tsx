"use client";

import { useState } from "react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { useCartStore } from "@/stores/cart-store";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ArrowLeft, CreditCard, Lock, CheckCircle } from "lucide-react";
export default function CheckoutPage() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const { items, totalPrice, clearCart } = useCartStore();
  const subtotal = totalPrice();
  const shipping = 0;
  const total = subtotal + shipping;

  if (items.length === 0 && !formSubmitted) {
    return (
      <MarketingLayout>
        <Section>
          <ClayCard className="p-12 text-center">
            <p className="text-lg text-muted-foreground mb-6">
              Your cart is empty.
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

  if (formSubmitted) {
    const orderNumber = `ORD-${Date.now().toString(36).toUpperCase()}`;
    return (
      <MarketingLayout>
        <Section>
          <ClayCard className="p-12 text-center max-w-lg mx-auto">
            <CheckCircle className="mx-auto h-20 w-20 text-teal mb-6" />
            <h2 className="text-2xl font-bold text-navy mb-2">
              Order Confirmed!
            </h2>
            <p className="text-muted-foreground mb-2">
              Thank you for your order. Your order number is:
            </p>
            <p className="font-mono font-bold text-teal text-lg mb-8">
              {orderNumber}
            </p>
            <Link
              href="/products"
              className="clay-btn-teal inline-flex items-center gap-2 px-6 py-3.5 text-base"
            >
              Continue Shopping
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
          <div className="flex-1">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                clearCart();
                setFormSubmitted(true);
              }}
              className="space-y-8"
            >
              <ClayCard className="p-6">
                <h2 className="text-xl font-semibold text-navy mb-6">
                  Contact Information
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    type="email"
                    placeholder="Email"
                    required
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                  />
                  <Input
                    type="tel"
                    placeholder="Phone"
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                  />
                </div>
              </ClayCard>

              <ClayCard className="p-6">
                <h2 className="text-xl font-semibold text-navy mb-6">
                  Shipping Address
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    placeholder="First name"
                    required
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                  />
                  <Input
                    placeholder="Last name"
                    required
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                  />
                  <Input
                    placeholder="Address"
                    required
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl sm:col-span-2"
                  />
                  <Input
                    placeholder="City"
                    required
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                  />
                  <Input
                    placeholder="Postcode"
                    required
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                  />
                  <Input
                    placeholder="Country"
                    required
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl sm:col-span-2"
                  />
                </div>
              </ClayCard>

              <ClayCard className="p-6">
                <h2 className="text-xl font-semibold text-navy mb-6 flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment
                </h2>
                <div className="space-y-4">
                  <Input
                    placeholder="Card number"
                    className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      placeholder="Expiry (MM/YY)"
                      className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                    />
                    <Input
                      placeholder="CVC"
                      className="clay-sm h-11 border-0 bg-white/80 rounded-xl"
                    />
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>Secure payment</span>
                  </div>
                </div>
              </ClayCard>

              <button
                type="submit"
                className={cn(
                  "clay-btn-teal w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 text-base",
                  "rounded-xl font-semibold"
                )}
              >
                Place Order
              </button>
            </form>
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
