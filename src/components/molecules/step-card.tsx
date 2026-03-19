"use client";

import { ClayCard } from "@/components/atoms/clay-card";
import { Search, Droplets, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Step } from "@/lib/types";

const iconMap: Record<string, React.ElementType> = {
  search: Search,
  droplets: Droplets,
  "bar-chart-3": BarChart3,
};

const colorClasses = [
  "bg-coral/10 text-coral",
  "bg-teal/10 text-teal",
  "bg-purple/10 text-purple",
];

interface StepCardProps {
  step: Step;
  index: number;
  className?: string;
}

export function StepCard({ step, index, className }: StepCardProps) {
  const Icon = iconMap[step.icon] ?? Search;

  return (
    <ClayCard hover className={cn("p-8 text-center relative", className)}>
      <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full clay-coral flex items-center justify-center text-sm font-bold">
        {step.number}
      </div>
      <div
        className={cn(
          "w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5",
          colorClasses[index % colorClasses.length]
        )}
      >
        <Icon className="w-7 h-7" />
      </div>
      <h3 className="text-xl font-bold text-navy mb-3 font-display">{step.title}</h3>
      <p className="text-muted-foreground leading-relaxed">{step.description}</p>
    </ClayCard>
  );
}
