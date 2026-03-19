import Link from "next/link";
import { FlaskConical, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4 text-center">
      <FlaskConical className="h-16 w-16 text-coral mb-6" />
      <h1 className="text-6xl font-bold text-navy font-display mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-navy mb-2">Page Not Found</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        The page you&apos;re looking for doesn&apos;t exist or has been moved.
        Let&apos;s get you back on track.
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link
          href="/"
          className="clay-btn inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
        <Link
          href="/products"
          className="clay-btn-teal inline-flex items-center gap-2 px-6 py-3.5 rounded-xl font-semibold"
        >
          Browse Tests
        </Link>
      </div>
    </div>
  );
}
