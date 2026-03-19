"use client";

import { useState } from "react";
import { MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export function ChatWidget() {
  const [open, setOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open && (
        <div className="clay-lg mb-4 p-5 w-80 animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-bold text-navy font-display">Health Assistant</h3>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-navy transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-4">
            Got questions about your health or our tests? Our AI assistant is here to help.
          </p>
          <Link href="/chat" className="clay-btn block text-center px-4 py-2.5 text-sm">
            Start a Conversation
          </Link>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300",
          open ? "clay-pressed" : "clay-coral"
        )}
        aria-label="Toggle chat assistant"
      >
        {open ? (
          <X className="w-6 h-6 text-navy" />
        ) : (
          <MessageCircle className="w-6 h-6" />
        )}
      </button>
    </div>
  );
}
