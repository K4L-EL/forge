import { cn } from "@/lib/utils";

const BRAND_PILLS = [
  "Men's Health",
  "Runner's World",
  "The Telegraph",
  "BBC Sport",
  "GQ",
] as const;

export function SocialProof() {
  return (
    <div className="py-12 md:py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <p className="text-center text-sm text-muted-foreground mb-6">
          Trusted by 10,000+ customers
        </p>
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/80 mb-4">
          As seen in
        </p>
        <div className="flex flex-wrap justify-center items-center gap-3">
          {BRAND_PILLS.map((brand) => (
            <span
              key={brand}
              className={cn(
                "clay-sm px-4 py-2 text-sm text-muted-foreground",
                "font-medium"
              )}
            >
              {brand}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
