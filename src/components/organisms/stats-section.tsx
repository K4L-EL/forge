import { Section } from "@/components/atoms/section";
import { StatBadge } from "@/components/atoms/stat-badge";
import { STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function StatsSection() {
  return (
    <Section className="clay-lg mx-4 md:mx-6 lg:mx-auto lg:max-w-6xl px-6 py-12 md:py-16">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-4">
        {STATS.map((stat, index) => (
          <div
            key={stat.label}
            className={cn(
              "flex flex-col items-center justify-center",
              index > 0 && "md:border-l md:border-navy/10"
            )}
          >
            <StatBadge
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
            />
          </div>
        ))}
      </div>
    </Section>
  );
}
