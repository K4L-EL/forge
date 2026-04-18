import type { CSSProperties } from "react";
import Image from "next/image";
import { FlaskConical } from "lucide-react";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

const gradientByColor: Record<Product["color"], string> = {
  coral:
    "bg-gradient-to-br from-coral via-coral/85 to-purple from-20% via-40% to-100%",
  teal: "bg-gradient-to-br from-teal via-teal/85 to-purple from-15% via-45% to-100%",
  purple:
    "bg-gradient-to-br from-purple via-purple/80 to-coral from-20% via-50% to-100%",
  sunny:
    "bg-gradient-to-br from-sunny via-sunny/90 to-teal from-25% via-55% to-100%",
};

const aspectBySize = {
  sm: "aspect-[4/5]",
  md: "aspect-square",
  lg: "aspect-square",
} as const;

const iconBySize = {
  sm: "h-12 w-12",
  md: "h-20 w-20",
  lg: "h-24 w-24",
} as const;

const patternStyle: CSSProperties = {
  backgroundImage: [
    "radial-gradient(circle at 18% 22%, rgba(255,255,255,0.35) 0%, transparent 42%)",
    "radial-gradient(circle at 82% 78%, rgba(255,255,255,0.22) 0%, transparent 48%)",
    "radial-gradient(circle at 50% 50%, rgba(10,10,31,0.06) 0%, transparent 60%)",
  ].join(", "),
};

interface ProductImageProps {
  product: Product;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function ProductImage({
  product,
  className,
  size = "md",
}: ProductImageProps) {
  if (product.image) {
    return (
      <div
        className={cn(
          "relative overflow-hidden rounded-2xl",
          aspectBySize[size],
          className
        )}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 480px"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "relative isolate overflow-hidden rounded-2xl",
        aspectBySize[size],
        gradientByColor[product.color],
        className
      )}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.55]"
        style={patternStyle}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.12]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(-18deg, transparent, transparent 6px, rgba(255,255,255,0.08) 6px, rgba(255,255,255,0.08) 7px)",
        }}
        aria-hidden
      />
      <span
        className={cn(
          "absolute right-2 top-2 z-10 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide",
          "bg-white/25 text-white backdrop-blur-sm ring-1 ring-white/40 shadow-sm"
        )}
      >
        {product.biomarkerCount} markers
      </span>
      <div className="absolute inset-0 flex items-center justify-center">
        <FlaskConical
          className={cn(
            iconBySize[size],
            "text-white drop-shadow-[0_8px_24px_rgba(10,10,31,0.35)]"
          )}
          strokeWidth={1.25}
          aria-hidden
        />
      </div>
      <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-navy/55 via-navy/20 to-transparent px-3 pb-2.5 pt-8">
        <p className="text-center text-[11px] font-semibold leading-tight text-white drop-shadow-sm sm:text-xs">
          {product.name}
        </p>
      </div>
    </div>
  );
}
