import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import { StepCard } from "@/components/molecules/step-card";
import { HOW_IT_WORKS_STEPS } from "@/lib/constants";

export function HowItWorks() {
  return (
    <Section id="how-it-works" className="bg-cream">
      <SectionHeading
        eyebrow="How It Works"
        title="Simple as 1, 2, 3"
        description="From choosing your test to getting personalised insights — our process is designed to be effortless. No lab visits, no hassle."
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6">
        {HOW_IT_WORKS_STEPS.map((step, index) => (
          <StepCard key={step.number} step={step} index={index} />
        ))}
      </div>
      {/* Connecting line between cards - visible on desktop */}
      <div
        className="mt-8 md:mt-12 mx-auto max-w-2xl h-0 border-t-2 border-dashed border-teal/30"
        aria-hidden
      />
    </Section>
  );
}
