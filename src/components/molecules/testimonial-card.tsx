import { ClayCard } from "@/components/atoms/clay-card";
import { Star } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  className?: string;
}

export function TestimonialCard({ testimonial, className }: TestimonialCardProps) {
  return (
    <ClayCard className={cn("p-6 flex flex-col h-full", className)}>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} className="w-4 h-4 fill-sunny text-sunny" />
        ))}
      </div>
      <blockquote className="text-navy leading-relaxed flex-1 mb-5">
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 pt-4 border-t border-border/50">
        <div className="w-10 h-10 rounded-full clay-coral flex items-center justify-center text-xs font-bold">
          {testimonial.avatar}
        </div>
        <div>
          <div className="font-semibold text-navy text-sm">{testimonial.name}</div>
          <div className="text-xs text-muted-foreground">
            {testimonial.role}, {testimonial.age}
          </div>
        </div>
      </div>
    </ClayCard>
  );
}
