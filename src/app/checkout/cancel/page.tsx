import Link from "next/link";
import { XCircle, ArrowLeft, ShoppingCart } from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { cn } from "@/lib/utils";

export default function CheckoutCancelPage() {
  return (
    <MarketingLayout>
      <Section>
        <ClayCard className="p-10 md:p-12 max-w-lg mx-auto text-center">
          <XCircle className="mx-auto h-20 w-20 text-coral mb-6" />
          <h1 className="text-2xl font-bold text-navy mb-3">
            Payment Cancelled
          </h1>
          <p className="text-muted-foreground mb-10">
            You returned from checkout before completing payment. No charge
            was made to your card.
          </p>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              href="/cart"
              className={cn(
                "clay-btn flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                "rounded-xl font-semibold"
              )}
            >
              <ArrowLeft className="h-4 w-4" />
              Return to Cart
            </Link>
            <Link
              href="/products"
              className={cn(
                "clay-btn-teal flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                "rounded-xl font-semibold"
              )}
            >
              <ShoppingCart className="h-4 w-4" />
              Browse Tests
            </Link>
          </div>
        </ClayCard>
      </Section>
    </MarketingLayout>
  );
}
