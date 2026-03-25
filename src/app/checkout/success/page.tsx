"use client";

import { useEffect } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight, Package } from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { useCartStore } from "@/stores/cart-store";
import { cn } from "@/lib/utils";

const steps = [
  {
    title: "Your kit arrives",
    description: "We ship your test kit to the address you provided.",
  },
  {
    title: "Collect your sample",
    description: "Follow the simple instructions included in the kit.",
  },
  {
    title: "Get results in 3–5 days",
    description:
      "Once we receive your sample, your results are usually ready within 3–5 days.",
  },
] as const;

export default function CheckoutSuccessPage() {
  const clearCart = useCartStore((s) => s.clearCart);

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <MarketingLayout>
      <Section>
        <ClayCard className="p-10 md:p-12 max-w-2xl mx-auto">
          <CheckCircle className="mx-auto h-24 w-24 text-teal mb-6" />
          <h1 className="text-3xl font-bold text-navy text-center mb-2">
            Order Confirmed!
          </h1>
          <p className="text-center text-muted-foreground text-lg mb-2">
            Thank you for your order.
          </p>
          <p className="text-center text-muted-foreground mb-10">
            Your test kit should arrive within 1–2 working days.
          </p>

          <div className="rounded-2xl bg-mist/60 p-6 mb-10">
            <h2 className="text-lg font-semibold text-navy mb-6 flex items-center gap-2">
              <Package className="h-5 w-5 text-teal" />
              What happens next?
            </h2>
            <ol className="space-y-5">
              {steps.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span
                    className={cn(
                      "flex h-8 w-8 shrink-0 items-center justify-center rounded-full",
                      "bg-teal text-white text-sm font-bold"
                    )}
                  >
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-navy">{step.title}</p>
                    <p className="text-sm text-muted-foreground mt-0.5">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/dashboard"
              className={cn(
                "clay-btn-teal flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                "rounded-xl font-semibold"
              )}
            >
              View Your Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/products"
              className={cn(
                "clay-btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                "rounded-xl font-semibold text-center"
              )}
            >
              Continue Shopping
            </Link>
          </div>
        </ClayCard>
      </Section>
    </MarketingLayout>
  );
}
