import Link from "next/link";
import { Section } from "@/components/atoms/section";
import { ArrowRight, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export function CtaSection() {
  return (
    <Section
      as="section"
      container={false}
      className={cn(
        "relative overflow-hidden clay-coral py-20 md:py-28",
        "text-white"
      )}
    >
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className={cn(
            "blob-shape float-animation absolute h-32 w-32 md:h-40 md:w-40",
            "bg-white/20 top-1/4 left-1/4"
          )}
          style={{ borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%" }}
        />
        <div
          className={cn(
            "blob-shape float-slow absolute h-24 w-24 md:h-32 md:w-32",
            "bg-white/15 top-1/2 right-1/4"
          )}
          style={{
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            animationDelay: "2s",
          }}
        />
        <div
          className={cn(
            "blob-shape float-animation absolute h-20 w-20 md:h-28 md:w-28",
            "bg-white/10 bottom-1/4 right-1/3"
          )}
          style={{
            borderRadius: "70% 30% 50% 50% / 30% 70% 30% 70%",
            animationDelay: "1s",
          }}
        />
        <div
          className={cn(
            "blob-shape float-slow absolute h-16 w-16 md:h-24 md:w-24",
            "bg-white/15 bottom-1/3 left-1/4"
          )}
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            animationDelay: "0.5s",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 clay-sm px-4 py-2 mb-6 bg-white/20 text-white">
            <Sparkles className="h-4 w-4" aria-hidden />
            <span className="text-sm font-semibold uppercase tracking-wide">
              Start Your Journey
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display tracking-tight mb-4">
            Ready to Take Control of Your Health?
          </h2>
          <p className="text-lg md:text-xl text-white/90 mb-10 leading-relaxed">
            Join thousands who have transformed their health with data-driven
            insights. Your personalised blood test results are just a few clicks
            away.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/products"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl",
                "font-semibold text-base bg-white text-coral",
                "clay-pressed transition-all hover:scale-105 active:scale-100"
              )}
            >
              Get Started
              <ArrowRight className="h-5 w-5" aria-hidden />
            </Link>
            <Link
              href="/#faq"
              className={cn(
                "inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl",
                "font-semibold text-base border-2 border-white text-white",
                "bg-transparent transition-all hover:bg-white/20 active:bg-white/10"
              )}
            >
              Talk to Us
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
