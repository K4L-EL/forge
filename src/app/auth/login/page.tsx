"use client";

import Link from "next/link";
import { FlaskConical, Mail, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { ClayCard } from "@/components/atoms/clay-card";
import { cn } from "@/lib/utils";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-cream px-4">
      <Link
        href="/"
        className="flex items-center gap-2 font-display text-2xl font-bold text-navy mb-8 transition-opacity hover:opacity-90"
      >
        <FlaskConical className="h-8 w-8 text-coral" aria-hidden />
        ForgeLabs
      </Link>

      <ClayCard className="w-full max-w-md p-8 space-y-6">
        <h1 className="text-2xl font-bold text-navy font-display">Welcome Back</h1>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="email"
              placeholder="Email"
              className="pl-10 h-11 rounded-xl"
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="password"
              placeholder="Password"
              className="pl-10 h-11 rounded-xl"
            />
          </div>
        </div>

        <button
          type="button"
          className={cn(
            "clay-btn w-full inline-flex items-center justify-center gap-2",
            "px-6 py-3.5 rounded-xl font-semibold text-base"
          )}
        >
          Sign In
        </button>

        <Link
          href="#"
          className="block text-sm text-muted-foreground hover:text-teal transition-colors text-center"
        >
          Forgot password?
        </Link>

        <div className="border-t border-border my-6" />

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link href="/auth/signup" className="font-semibold text-teal hover:text-teal-dark transition-colors">
            Sign up
          </Link>
        </p>
      </ClayCard>
    </div>
  );
}
