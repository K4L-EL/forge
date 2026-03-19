"use client";

import Link from "next/link";
import { Package, ArrowLeft, Truck, CheckCircle } from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { cn } from "@/lib/utils";

const MOCK_ORDERS = [
  {
    id: "1",
    orderNumber: "FL-2025-0847",
    date: "2025-03-12",
    product: "Performance Panel",
    status: "Delivered",
    total: "£149",
  },
  {
    id: "2",
    orderNumber: "FL-2025-0821",
    date: "2025-03-08",
    product: "Hormone Check",
    status: "Shipped",
    total: "£89",
  },
  {
    id: "3",
    orderNumber: "FL-2025-0795",
    date: "2025-03-01",
    product: "Vitamin D & B12",
    status: "Processing",
    total: "£49",
  },
];

function StatusBadge({
  status,
}: {
  status: "Delivered" | "Shipped" | "Processing";
}) {
  if (status === "Delivered") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/15 text-green-700">
        <CheckCircle className="h-3.5 w-3.5" />
        Delivered
      </span>
    );
  }
  if (status === "Shipped") {
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-teal/15 text-teal">
        <Truck className="h-3.5 w-3.5" />
        Shipped
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sunny/30 text-navy">
      <Package className="h-3.5 w-3.5" />
      Processing
    </span>
  );
}

export default function OrdersPage() {
  const orders = MOCK_ORDERS;

  return (
    <MarketingLayout>
      <Section className="bg-cream">
        <div className="space-y-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-navy transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to dashboard
          </Link>

          <h1 className="text-2xl sm:text-3xl font-bold text-navy font-display">
            Your Orders
          </h1>

          {orders.length === 0 ? (
            <ClayCard className="p-12 text-center">
              <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
              <h3 className="text-lg font-semibold text-navy mb-2">
                No orders yet
              </h3>
              <p className="text-muted-foreground mb-6 max-w-sm mx-auto">
                When you place an order, it will appear here. Start by exploring
                our tests.
              </p>
              <Link
                href="/products"
                className="clay-btn-teal inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm"
              >
                Browse Tests
              </Link>
            </ClayCard>
          ) : (
            <div className="space-y-4">
              {orders.map((order) => (
                <ClayCard key={order.id} hover className="p-6">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Order {order.orderNumber} · {order.date}
                      </p>
                      <h3 className="font-semibold text-navy">{order.product}</h3>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6">
                      <StatusBadge status={order.status as "Delivered" | "Shipped" | "Processing"} />
                      <span className="font-bold text-navy">{order.total}</span>
                    </div>
                  </div>
                </ClayCard>
              ))}
            </div>
          )}
        </div>
      </Section>
    </MarketingLayout>
  );
}
