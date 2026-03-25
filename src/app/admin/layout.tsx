"use client";

import { useState, useEffect } from "react";
import { FlaskConical, LogOut, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [signingIn, setSigningIn] = useState(false);

  useEffect(() => {
    fetch("/api/admin/auth")
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .finally(() => setLoading(false));
  }, []);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setSigningIn(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (res.ok) {
        setAuthenticated(true);
        setPassword("");
      } else {
        setError("Invalid password. Try again.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSigningIn(false);
    }
  }

  async function handleLogout() {
    await fetch("/api/admin/auth", { method: "DELETE" });
    setAuthenticated(false);
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream">
        <div className="clay-sm px-8 py-6">
          <FlaskConical className="mx-auto h-8 w-8 animate-pulse text-coral" />
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-cream px-4">
        <div className="clay w-full max-w-sm p-8">
          <div className="mb-6 flex flex-col items-center gap-3">
            <div className="clay-coral flex h-14 w-14 items-center justify-center rounded-2xl">
              <FlaskConical className="h-7 w-7 text-white" />
            </div>
            <h1 className="font-display text-2xl font-bold text-navy">
              Admin Access
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter the admin password to continue
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="clay-pressed border-none pl-10"
                autoFocus
              />
            </div>

            {error && (
              <p className="text-center text-sm font-medium text-coral">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={signingIn || !password}
              className={cn(
                "clay-btn w-full px-6 py-3 text-sm",
                "disabled:opacity-50 disabled:hover:scale-100 disabled:hover:translate-y-0"
              )}
            >
              {signingIn ? "Signing in…" : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream">
      <header className="clay-sm sticky top-0 z-50 mx-4 mt-4 flex items-center justify-between rounded-2xl px-6 py-3">
        <Link
          href="/admin"
          className="flex items-center gap-2 font-display text-lg font-bold text-navy no-underline"
        >
          <FlaskConical className="h-5 w-5 text-coral" />
          ForgeLabs Admin
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="clay-sm px-4 py-1.5 text-sm font-medium text-navy no-underline transition-all hover:scale-105"
          >
            View Site
          </Link>
          <button
            onClick={handleLogout}
            className={cn(
              "flex items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm font-medium",
              "text-muted-foreground transition-all hover:text-coral"
            )}
          >
            <LogOut className="h-4 w-4" />
            Logout
          </button>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8">{children}</main>
    </div>
  );
}
