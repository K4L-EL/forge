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
    <Section className="relative overflow-hidden min-h-[85vh] flex items-center" container={false}>
      {/* Full-width blob background */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="blob-shape float-animation absolute h-[340px] w-[340px] sm:h-[420px] sm:w-[420px] lg:h-[520px] lg:w-[520px] bg-[#FF3399] opacity-[0.35]"
          style={{
            borderRadius: "60% 40% 30% 70% / 60% 30% 70% 40%",
            top: "5%",
            right: "5%",
          }}
        />
        <div
          className="blob-shape float-slow absolute h-[280px] w-[280px] sm:h-[360px] sm:w-[360px] lg:h-[440px] lg:w-[440px] bg-[#9B6DFF] opacity-[0.32]"
          style={{
            borderRadius: "40% 60% 70% 30% / 40% 50% 60% 50%",
            top: "15%",
            left: "-5%",
          }}
        />
        <div
          className="blob-shape float-animation absolute h-[240px] w-[240px] sm:h-[300px] sm:w-[300px] lg:h-[380px] lg:w-[380px] bg-[#FFCB3D] opacity-[0.35]"
          style={{
            borderRadius: "70% 30% 50% 50% / 30% 70% 30% 70%",
            animationDelay: "2s",
            bottom: "0%",
            right: "25%",
          }}
        />
        <div
          className="blob-shape float-slow absolute h-[200px] w-[200px] sm:h-[260px] sm:w-[260px] lg:h-[320px] lg:w-[320px] bg-[#26D3EC] opacity-[0.28]"
          style={{
            borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%",
            animationDelay: "1s",
            bottom: "10%",
            left: "10%",
          }}
        />
        <div
          className="blob-shape float-animation absolute h-[160px] w-[160px] sm:h-[200px] sm:w-[200px] lg:h-[240px] lg:w-[240px] bg-[#E6007E] opacity-[0.22]"
          style={{
            borderRadius: "50% 50% 30% 70% / 60% 40% 60% 40%",
            animationDelay: "3s",
            top: "40%",
            right: "40%",
          }}
        />
        <div
          className="blob-shape float-slow absolute h-[120px] w-[120px] sm:h-[160px] sm:w-[160px] lg:h-[200px] lg:w-[200px] bg-[#7C3AED] opacity-[0.22]"
          style={{
            borderRadius: "45% 55% 60% 40% / 50% 40% 60% 50%",
            animationDelay: "4s",
            top: "60%",
            right: "10%",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-3xl mx-auto text-center lg:mx-0 lg:text-left">
          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight text-navy sm:text-5xl lg:text-7xl">
            Blood Testing for People Who{" "}
            <span className="text-gradient-coral">Push Harder</span>
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl lg:text-2xl leading-relaxed mx-auto lg:mx-0">
            Advanced biomarker testing for athletes and fitness enthusiasts.
            Understand your body, optimise performance, and recover smarter.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
            {BENEFIT_PILLS.map(({ label, icon: Icon }) => (
              <span
                key={label}
                className={cn(
                  "clay-sm inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-navy"
                )}
              >
                <Icon className="h-4 w-4 text-coral" aria-hidden />
                {label}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <Link
              href="/products"
              className={cn(
                "clay-btn inline-flex items-center justify-center gap-2 px-8 py-4 text-base",
                "rounded-2xl font-semibold text-white no-underline transition-all"
              )}
            >
              Explore Tests
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Link>
            <Link
              href="/#how-it-works"
              className={cn(
                "clay-btn-teal inline-flex items-center justify-center gap-2 px-8 py-4 text-base",
                "rounded-2xl font-semibold text-white no-underline transition-all"
              )}
            >
              How It Works
            </Link>
          </div>
        </div>
      </div>
    </Section>
  );
}
