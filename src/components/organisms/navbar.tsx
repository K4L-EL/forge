"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, FlaskConical } from "lucide-react";
import { useCartStore } from "@/stores/cart-store";
import { NAV_LINKS } from "@/lib/constants";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

export function Navbar() {
  const pathname = usePathname();
  const totalItems = useCartStore((s) => s.totalItems());
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Announcement banner */}
      <div
        className={cn(
          "w-full px-4 py-2 text-center text-sm font-medium text-white",
          "bg-linear-to-r from-coral via-teal to-purple"
        )}
      >
        🔬 New: AI-Powered Health Insights — Get 20% off your first test
      </div>

      {/* Main nav bar */}
      <nav
        className={cn(
          "mx-4 mt-2 flex items-center justify-between px-4 py-3 transition-all duration-300",
          scrolled ? "rounded-2xl backdrop-blur-md bg-cream/80 shadow-lg" : "clay-sm"
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-navy transition-opacity hover:opacity-90"
        >
          <FlaskConical className="h-6 w-6 text-coral" aria-hidden />
          ForgeLabs
        </Link>

        {/* Center nav links - hidden on mobile */}
        <div className="hidden md:flex md:items-center md:gap-8">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-coral"
                  : "text-navy hover:text-teal"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right: Dashboard + Cart + Mobile menu */}
        <div className="flex items-center gap-4">
          <Link
            href="https://app.forgelabs.co.uk/sign-in"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center justify-center clay-btn-teal px-4 py-2 text-sm rounded-xl font-semibold"
          >
            Dashboard
          </Link>
          <Link
            href="/cart"
            className="relative flex items-center justify-center rounded-full p-2 text-navy transition-colors hover:bg-coral/10 hover:text-coral"
            aria-label={`Cart with ${totalItems} items`}
          >
            <ShoppingCart className="h-5 w-5" />
            {totalItems > 0 && (
              <span
                className={cn(
                  "absolute -right-0.5 -top-0.5 flex h-5 min-w-5 items-center justify-center rounded-full px-1",
                  "bg-coral text-xs font-bold text-white"
                )}
              >
                {totalItems > 99 ? "99+" : totalItems}
              </span>
            )}
          </Link>

          {/* Mobile menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger
              className="flex items-center justify-center rounded-full p-2 text-navy transition-colors hover:bg-teal/10 hover:text-teal md:hidden"
              aria-label="Open menu"
            >
              <Menu className="h-5 w-5" />
            </SheetTrigger>
            <SheetContent
              side="right"
              className="clay-sm border-l-0 bg-cream"
              showCloseButton={false}
            >
              <div className="flex flex-col gap-6 pt-12">
                <button
                  onClick={() => setOpen(false)}
                  className="absolute right-4 top-4 rounded-full p-2 text-navy hover:bg-navy/5"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "text-lg font-medium transition-colors",
                      pathname === link.href
                        ? "text-coral"
                        : "text-navy hover:text-teal"
                    )}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 text-lg font-medium text-navy hover:text-teal"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Cart {totalItems > 0 && `(${totalItems})`}
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>
  );
}
