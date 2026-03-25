import Link from "next/link";
import { Section } from "@/components/atoms/section";
import { ArrowRight, Shield, Zap, HeartPulse } from "lucide-react";
import { cn } from "@/lib/utils";

const BENEFIT_PILLS = [
  { label: "Lab Accurate", icon: Shield },
  { label: "3-5 Day Results", icon: Zap },
  { label: "AI Insights", icon: HeartPulse },
] as const;

export function Hero() {
  return (
    <Section className="overflow-hidden">
      <div className="relative flex flex-col items-center gap-12 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        {/* Left: Content */}
        <div className="flex-1 space-y-8 text-center lg:text-left">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-6xl">
            Blood Testing for People Who{" "}
            <span className="text-gradient-coral">Push Harder</span>
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground sm:text-xl">
            Advanced biomarker testing for athletes and fitness enthusiasts.
            Understand your body, optimise performance, and recover smarter.
          </p>

          {/* Benefit pills */}
          <div className="flex flex-wrap justify-center gap-3 lg:justify-start">
            {BENEFIT_PILLS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className={cn(
                  "clay-sm inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-navy"
                )}
              >
                <Icon className="h-4 w-4 text-coral" aria-hidden />
                {label}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/products"
              className={cn(
                "clay-btn inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                "rounded-2xl font-semibold text-white no-underline transition-all"
              )}
            >
              Explore Tests
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#how-it-works"
              className={cn(
                "clay-btn-teal inline-flex items-center justify-center gap-2 px-6 py-3.5 text-base",
                "rounded-2xl font-semibold text-white no-underline transition-all"
              )}
            >
              How It Works
            </Link>
          </div>
        </div>

        {/* Right: Decorative blobs */}
        <div className="relative h-64 w-full shrink-0 sm:h-80 lg:h-96 lg:max-w-[480px]">
          <div
            className={cn(
              "absolute inset-0 flex items-center justify-center",
              "rounded-[42%_58%_62%_38%/45%_55%_45%_55%]"
            )}
          >
            <div
              className={cn(
                "blob-shape float-animation absolute h-40 w-40 sm:h-48 sm:w-48",
                "bg-[#F7949F] opacity-90",
                "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
              )}
              style={{
                borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
              }}
            />
            <div
              className={cn(
                "blob-shape float-slow absolute h-32 w-32 sm:h-40 sm:w-40",
                "bg-[#72DFD5] opacity-[0.85]",
                "top-1/4 right-1/4 -translate-y-1/2"
              )}
              style={{
                borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
              }}
            />
            <div
              className={cn(
                "blob-shape float-animation absolute h-28 w-28 sm:h-36 sm:w-36",
                "bg-[#FFE080] opacity-90",
                "bottom-1/4 left-1/4 -translate-x-1/2"
              )}
              style={{
                borderRadius: "70% 30% 50% 50% / 30% 70% 30% 70%",
                animationDelay: "2s",
              }}
            />
            <div
              className={cn(
                "blob-shape float-slow absolute h-24 w-24 sm:h-28 sm:w-28",
                "bg-[#B8A5FD] opacity-80",
                "top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2"
              )}
              style={{
                borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
                animationDelay: "1s",
              }}
            />
            <div
              className={cn(
                "blob-shape absolute h-20 w-20 sm:h-24 sm:w-24",
                "bg-[#D8D5E8] opacity-70",
                "bottom-1/3 right-1/3"
              )}
              style={{
                borderRadius: "50% 50% 30% 70% / 60% 40% 60% 40%",
              }}
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
