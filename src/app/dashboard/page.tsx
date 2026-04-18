"use client";

import Link from "next/link";
import {
  Package,
  Activity,
  Bell,
  FlaskConical,
  ArrowRight,
  Calendar,
} from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { ClayCard } from "@/components/atoms/clay-card";
import { ContactFormModal } from "@/components/molecules/contact-form-modal";
import { cn } from "@/lib/utils";

type QuickAction = {
  title: string;
  description: string;
  icon: typeof Activity;
  variant: "default" | "teal";
} & (
  | { kind: "link"; href: string }
  | { kind: "modal"; subject: string }
);

const QUICK_ACTIONS: QuickAction[] = [
  {
    kind: "link",
    title: "My Results",
    description: "View your latest blood test results",
    icon: Activity,
    href: "#recent-results",
    variant: "default",
  },
  {
    kind: "link",
    title: "Orders",
    description: "Track your orders",
    icon: Package,
    href: "/dashboard/orders",
    variant: "default",
  },
  {
    kind: "modal",
    title: "Activate Kit",
    description: "Activate a new test kit",
    icon: FlaskConical,
    subject: "Activate test kit",
    variant: "teal",
  },
  {
    kind: "link",
    title: "AI Assistant",
    description: "Get health insights from our AI",
    icon: Bell,
    href: "/chat",
    variant: "default",
  },
];

const MOCK_RESULTS = [
  { id: "1", name: "Performance Panel", date: "2025-03-15", status: "Complete" },
  { id: "2", name: "Hormone Check", date: "2025-03-10", status: "Processing" },
  { id: "3", name: "Vitamin D & B12", date: "2025-03-05", status: "Complete" },
];

export default function DashboardPage() {
  return (
    <MarketingLayout>
      <Section className="bg-cream">
        <div className="space-y-10">
          {/* Welcome banner */}
          <div className="clay-lg p-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-navy font-display mb-2">
              Welcome back, Alex
            </h1>
            <p className="text-muted-foreground">
              Here&apos;s an overview of your health journey and recent activity.
            </p>
          </div>

          {/* Quick action cards */}
          <div>
            <h2 className="text-xl font-bold text-navy font-display mb-6">Quick Actions</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                const card = (
                  <ClayCard
                    variant={action.variant}
                    hover
                    className={cn(
                      "p-6 h-full flex flex-col text-left",
                      action.variant === "teal" && "clay-teal"
                    )}
                  >
                    <div
                      className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                        action.variant === "teal"
                          ? "bg-white/20"
                          : "clay-sm bg-cream/50"
                      )}
                    >
                      <Icon
                        className={cn(
                          "h-6 w-6",
                          action.variant === "teal" ? "text-white" : "text-teal"
                        )}
                      />
                    </div>
                    <h3
                      className={cn(
                        "font-semibold mb-1",
                        action.variant === "teal" ? "text-white" : "text-navy"
                      )}
                    >
                      {action.title}
                    </h3>
                    <p
                      className={cn(
                        "text-sm flex-1",
                        action.variant === "teal"
                          ? "text-white/90"
                          : "text-muted-foreground"
                      )}
                    >
                      {action.description}
                    </p>
                    <span
                      className={cn(
                        "inline-flex items-center gap-1 text-sm font-medium mt-2",
                        action.variant === "teal"
                          ? "text-white"
                          : "text-teal hover:text-teal-dark"
                      )}
                    >
                      View
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  </ClayCard>
                );

                if (action.kind === "modal") {
                  return (
                    <ContactFormModal
                      key={action.title}
                      defaultSubject={action.subject}
                      trigger={
                        <button type="button" className="block w-full">
                          {card}
                        </button>
                      }
                    />
                  );
                }

                return (
                  <Link key={action.title} href={action.href} className="block">
                    {card}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Recent Results */}
          <div id="recent-results" className="scroll-mt-24">
            <h2 className="text-xl font-bold text-navy font-display mb-6">
              Recent Results
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {MOCK_RESULTS.map((result) => (
                <ClayCard key={result.id} hover className="p-6">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-semibold text-navy mb-1">{result.name}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-1.5">
                        <Calendar className="h-3.5 w-3.5" />
                        {result.date}
                      </p>
                    </div>
                    <span
                      className={cn(
                        "shrink-0 px-3 py-1 rounded-full text-xs font-semibold",
                        result.status === "Complete"
                          ? "bg-teal/15 text-teal"
                          : "bg-sunny/30 text-navy"
                      )}
                    >
                      {result.status}
                    </span>
                  </div>
                  <Link
                    href="/dashboard/orders"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dark transition-colors"
                  >
                    View Results
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </ClayCard>
              ))}
            </div>
          </div>
        </div>
      </Section>
    </MarketingLayout>
  );
}
