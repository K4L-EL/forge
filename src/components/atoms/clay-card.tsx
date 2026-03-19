import { cn } from "@/lib/utils";

type ClayVariant = "default" | "sm" | "lg" | "coral" | "teal" | "purple" | "sunny" | "pressed";

const variantMap: Record<ClayVariant, string> = {
  default: "clay",
  sm: "clay-sm",
  lg: "clay-lg",
  coral: "clay-coral",
  teal: "clay-teal",
  purple: "clay-purple",
  sunny: "clay-sunny",
  pressed: "clay-pressed",
};

interface ClayCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: ClayVariant;
  hover?: boolean;
  as?: React.ElementType;
}

export function ClayCard({
  variant = "default",
  hover = false,
  className,
  children,
  as: Component = "div",
  ...props
}: ClayCardProps) {
  return (
    <Component
      className={cn(variantMap[variant], hover && "clay-hover cursor-pointer", className)}
      {...props}
    >
      {children}
    </Component>
  );
}
