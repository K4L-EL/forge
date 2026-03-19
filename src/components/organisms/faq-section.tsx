"use client";

import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqItems } from "@/data/faq";
import { cn } from "@/lib/utils";

export function FaqSection() {
  return (
    <Section id="faq">
      <SectionHeading
        eyebrow="FAQ"
        title="Got Questions? We've Got Answers"
      />
      <div className="max-w-3xl mx-auto">
        <Accordion className="flex flex-col gap-4">
          {faqItems.map((item) => (
            <AccordionItem
              key={item.id}
              value={item.id}
              className={cn(
                "clay-sm px-5 py-1 rounded-2xl border-0",
                "data-[open]:clay-pressed"
              )}
            >
              <AccordionTrigger className="py-5 text-left text-navy font-semibold text-base hover:no-underline hover:text-coral data-panel-open:text-coral">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="pb-5 text-muted-foreground leading-relaxed">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Section>
  );
}
