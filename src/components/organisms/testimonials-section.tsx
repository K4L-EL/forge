import { Star } from "lucide-react";
import { Section } from "@/components/atoms/section";
import { SectionHeading } from "@/components/atoms/section-heading";
import { TestimonialCard } from "@/components/molecules/testimonial-card";
import { testimonials } from "@/data/testimonials";
import { cn } from "@/lib/utils";

export function TestimonialsSection() {
  const featuredTestimonials = testimonials.slice(0, 3);

  return (
    <Section id="testimonials" className="bg-mist">
      <SectionHeading
        eyebrow="Testimonials"
        title="Trusted by Athletes & Fitness Enthusiasts"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {featuredTestimonials.map((testimonial) => (
          <TestimonialCard key={testimonial.id} testimonial={testimonial} />
        ))}
      </div>
      <div
        className={cn(
          "mt-10 flex flex-wrap items-center justify-center gap-2",
          "text-sm text-muted-foreground"
        )}
      >
        <div className="flex gap-0.5" aria-hidden>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star key={i} className="w-4 h-4 fill-sunny text-sunny" />
          ))}
        </div>
        <span className="font-medium text-navy">
          Rated 4.9/5 from 500+ reviews
        </span>
      </div>
    </Section>
  );
}
