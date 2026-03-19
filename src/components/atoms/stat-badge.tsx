import { cn } from "@/lib/utils";

interface StatBadgeProps {
  value: string;
  suffix?: string;
  label: string;
  className?: string;
}

export function StatBadge({ value, suffix, label, className }: StatBadgeProps) {
  return (
    <div className={cn("text-center", className)}>
      <div className="text-4xl sm:text-5xl font-bold text-navy font-display">
        {value}
        {suffix && <span className="text-coral">{suffix}</span>}
      </div>
      <div className="mt-2 text-sm font-medium text-muted-foreground">{label}</div>
    </div>
  );
}
