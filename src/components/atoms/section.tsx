import { cn } from "@/lib/utils";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  container?: boolean;
}

export function Section({
  as: Component = "section",
  container = true,
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <Component className={cn("py-20 md:py-28", className)} {...props}>
      {container ? (
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">{children}</div>
      ) : (
        children
      )}
    </Component>
  );
}
