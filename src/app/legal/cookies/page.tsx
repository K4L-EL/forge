import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { MarketingLayout } from "@/components/templates/marketing-layout";
import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import { ClayCard } from "@/components/atoms/clay-card";
import { ContactFormModal } from "@/components/molecules/contact-form-modal";
import { cn } from "@/lib/utils";

export const metadata = {
  title: "Cookie Policy — ForgeLabs",
  description: "How ForgeLabs uses cookies and similar technologies.",
};

export default function CookiePolicyPage() {
  return (
    <MarketingLayout>
      <Section>
        <SectionHeading
          eyebrow="Legal"
          title="Cookie Policy"
          description="We're working on this page. Content coming soon."
        />

        <ClayCard className="mx-auto max-w-2xl p-8 md:p-10 text-center space-y-6">
          <p className="text-base text-muted-foreground leading-relaxed">
            In the meantime, have a question about our use of cookies?
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <ContactFormModal
              defaultSubject="Cookie Policy question"
              trigger={
                <button
                  type="button"
                  className={cn(
                    "clay-btn-teal inline-flex items-center justify-center gap-2",
                    "px-6 py-3 rounded-xl font-semibold text-sm"
                  )}
                >
                  Contact us
                </button>
              }
            />
            <Link
              href="/"
              className={cn(
                "clay-btn inline-flex items-center justify-center gap-2",
                "px-6 py-3 rounded-xl font-semibold text-sm text-navy"
              )}
            >
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Back to home
            </Link>
          </div>
        </ClayCard>
      </Section>
    </MarketingLayout>
  );
}
