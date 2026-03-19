"use client";

import Link from "next/link";
import { FlaskConical } from "lucide-react";
import { SITE_CONFIG, FOOTER_LINKS } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const FOOTER_COLUMNS = [
  { title: "Product", links: FOOTER_LINKS.product },
  { title: "Company", links: FOOTER_LINKS.company },
  { title: "Support", links: FOOTER_LINKS.support },
  { title: "Legal", links: FOOTER_LINKS.legal },
] as const;

export function Footer() {
  return (
    <footer
      className={cn(
        "clay-lg bg-cream/50 text-navy",
        "py-16 md:py-20"
      )}
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Top: Logo and description */}
        <div className="mb-12 md:mb-16">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-display text-2xl font-bold text-navy transition-opacity hover:opacity-90"
          >
            <FlaskConical className="h-7 w-7 text-coral" aria-hidden />
            {SITE_CONFIG.name}
          </Link>
          <p className="mt-4 max-w-md text-muted-foreground leading-relaxed">
            {SITE_CONFIG.description}
          </p>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12 mb-12 md:mb-16">
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="font-semibold text-navy mb-4">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-coral transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom: Newsletter, copyright, social */}
        <div className="pt-8 border-t border-navy/10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          {/* Newsletter */}
          <div className="flex-1 max-w-md">
            <label htmlFor="newsletter-email" className="block font-semibold text-navy mb-3">
              Stay in the loop
            </label>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <Input
                id="newsletter-email"
                type="email"
                placeholder="Your email"
                className={cn(
                  "clay-sm h-10 flex-1 border-0 bg-white/80",
                  "placeholder:text-muted-foreground"
                )}
              />
              <button
                type="submit"
                className={cn(
                  "clay-btn-teal px-5 h-10 rounded-xl font-semibold text-sm",
                  "whitespace-nowrap transition-all hover:scale-105 active:scale-100"
                )}
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Copyright and social */}
          <div className="flex flex-col items-start md:items-end gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link
                href="#"
                aria-label="Twitter"
                className="clay-sm p-2.5 text-navy hover:text-coral transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="LinkedIn"
                className="clay-sm p-2.5 text-navy hover:text-coral transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </Link>
              <Link
                href="#"
                aria-label="Instagram"
                className="clay-sm p-2.5 text-navy hover:text-coral transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.067-.06-1.407-.06-4.123v-.08c0-2.643.012-2.987.06-4.043.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.994 2.013 9.338 2 12 2h.315zm0 2.162c-2.43 0-2.784.013-3.808.06-1.064.049-1.791.218-2.427.465a2.74 2.74 0 00-1.018 1.018 2.74 2.74 0 00-.465 2.427c.047 1.024.06 1.379.06 3.808v.08c0 2.597-.012 2.952-.06 3.976-.049 1.064-.218 1.791-.465 2.427a2.74 2.74 0 00-1.018 1.018 2.74 2.74 0 00-.465 2.427c.047 1.024.06 1.379.06 3.808v.08c0 2.597.012 2.952.06 3.976.049 1.064.218 1.791.465 2.427a2.74 2.74 0 001.018 1.018 2.74 2.74 0 002.427.465c1.024-.047 1.379-.06 3.808-.06h.08c2.597 0 2.952.012 3.976.06 1.064.049 1.791.218 2.427.465a2.74 2.74 0 001.018 1.018 2.74 2.74 0 002.427.465c1.024-.047 1.379-.06 3.808-.06h.08c2.597 0 2.952-.012 3.976-.06 1.064-.049 1.791-.218 2.427-.465a2.74 2.74 0 001.018-1.018 2.74 2.74 0 00.465-2.427c-.047-1.024-.06-1.379-.06-3.808v-.08c0-2.597-.012-2.952-.06-3.976-.049-1.064-.218-1.791-.465-2.427a2.74 2.74 0 00-1.018-1.018 2.74 2.74 0 00-2.427-.465c-1.024.047-1.379.06-3.808.06h-.08zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 8.468a3.333 3.333 0 110-6.666 3.333 3.333 0 010 6.666zm5.338-9.87a1.2 1.2 0 110-2.4 1.2 1.2 0 010 2.4z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
