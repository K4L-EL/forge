"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { ClayCard } from "@/components/atoms/clay-card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send, Bot, User, ArrowLeft, FlaskConical, Sparkles, Loader2 } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm your ForgeLabs AI Health Assistant, powered by Azure OpenAI. I can help you understand blood test results, explain biomarkers, and suggest evidence-based lifestyle improvements. What would you like to know?",
};

const QUICK_SUGGESTIONS = [
  "What does my vitamin D level mean?",
  "How can I improve my iron levels?",
  "Explain testosterone and training",
  "What is ApoB and why does it matter?",
];

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages
            .filter((m) => m.id !== "welcome")
            .map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();

      const assistantMessage: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: data.content ?? data.error ?? "Sorry, something went wrong. Please try again.",
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "I'm having trouble connecting right now. Please try again in a moment.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="h-screen flex flex-col bg-cream">
      <header className="shrink-0 flex items-center gap-4 px-4 py-4 border-b border-border bg-cream">
        <Link
          href="/"
          className="flex items-center justify-center w-10 h-10 rounded-xl clay-sm text-navy hover:bg-white/50 transition-colors"
          aria-label="Back to home"
        >
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Link
          href="/"
          className="flex items-center gap-2 font-display text-xl font-bold text-navy transition-opacity hover:opacity-90"
        >
          <FlaskConical className="h-6 w-6 text-coral" aria-hidden />
          ForgeLabs
        </Link>
        <div className="flex-1 flex items-center gap-4 px-4">
          <h1 className="text-lg font-semibold text-navy font-display">
            AI Health Assistant
          </h1>
          <span className="inline-flex items-center gap-1.5 clay-sm px-3 py-1 text-xs font-semibold text-teal">
            <Sparkles className="h-3.5 w-3.5" />
            GPT-5.4
          </span>
        </div>
      </header>

      <ScrollArea className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-2xl mx-auto space-y-6">
          {messages.map((msg) => (
            <div
              key={msg.id}
              ref={msg.id === messages[messages.length - 1]?.id ? scrollRef : undefined}
              className={cn(
                "flex gap-3",
                msg.role === "user" ? "flex-row-reverse" : "flex-row"
              )}
            >
              <div
                className={cn(
                  "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                  msg.role === "assistant" ? "clay-sm text-teal" : "clay-coral"
                )}
              >
                {msg.role === "assistant" ? (
                  <Bot className="h-5 w-5" aria-hidden />
                ) : (
                  <User className="h-5 w-5" aria-hidden />
                )}
              </div>
              <ClayCard
                variant={msg.role === "assistant" ? "sm" : "coral"}
                className={cn(
                  "max-w-[80%] px-4 py-3",
                  msg.role === "assistant" ? "text-navy" : "text-white"
                )}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</p>
              </ClayCard>
            </div>
          ))}

          {loading && (
            <div className="flex gap-3">
              <div className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center clay-sm text-teal">
                <Bot className="h-5 w-5" aria-hidden />
              </div>
              <ClayCard variant="sm" className="px-4 py-3">
                <Loader2 className="h-5 w-5 animate-spin text-teal" />
              </ClayCard>
            </div>
          )}
        </div>
      </ScrollArea>

      <div className="shrink-0 px-4 py-4 border-t border-border bg-cream">
        <div className="max-w-2xl mx-auto space-y-4">
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                disabled={loading}
                onClick={() => sendMessage(suggestion)}
                className="clay-sm px-4 py-2 text-sm font-medium text-navy hover:bg-white/50 transition-colors rounded-full disabled:opacity-50"
              >
                {suggestion}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your biomarkers..."
              disabled={loading}
              className="flex-1 clay-sm h-12 px-4 rounded-xl border-0 bg-white/50 text-navy placeholder:text-muted-foreground disabled:opacity-50"
            />
            <button
              type="submit"
              className="clay-btn shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform hover:scale-105 disabled:opacity-50"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              {loading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Send className="h-5 w-5" />
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
