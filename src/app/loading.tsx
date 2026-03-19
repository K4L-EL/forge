import { FlaskConical } from "lucide-react";

export default function Loading() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream">
      <div className="pulse-soft">
        <FlaskConical className="h-12 w-12 text-coral" />
      </div>
      <p className="mt-4 text-muted-foreground text-sm font-medium">Loading...</p>
    </div>
  );
}
