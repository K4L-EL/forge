"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { ClayCard } from "@/components/atoms/clay-card";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Send, Bot, User, ArrowLeft, FlaskConical, Sparkles } from "lucide-react";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const WELCOME_MESSAGE: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Hello! I'm your ForgeLabs AI Health Assistant. I can help you understand blood test results, explain biomarkers, and suggest lifestyle improvements. What would you like to know?",
};

const QUICK_SUGGESTIONS = [
  "What does my vitamin D level mean?",
  "How can I improve my iron?",
  "Explain testosterone results",
  "Best foods for heart health",
];

function getAssistantResponse(message: string): string {
  const lower = message.toLowerCase();
  if (lower.includes("vitamin d")) {
    return "Vitamin D is crucial for athletes! It supports bone health, immune function, and muscle recovery. Low levels can impact performance and recovery. Aim for 30–50 ng/mL (75–125 nmol/L). If you're deficient, consider supplementation and sensible sun exposure—especially important during winter months.";
  }
  if (lower.includes("iron")) {
    return "Iron and ferritin are essential for endurance athletes. Ferritin stores iron—low levels can cause fatigue, reduced VO2 max, and poor recovery. Athletes often need more iron due to foot-strike hemolysis and sweat loss. Aim for ferritin above 30 ng/mL; endurance athletes may benefit from 50+ ng/mL. Pair iron-rich foods with vitamin C for better absorption.";
  }
  if (lower.includes("testosterone")) {
    return "Testosterone is a key hormone for athletes—it affects muscle mass, recovery, and energy. Levels naturally vary with sleep, stress, and training load. Optimal ranges depend on age and sex. If your results are low, consider: sleep quality, managing stress, resistance training, and adequate nutrition. Avoid overtraining, which can suppress testosterone.";
  }
  if (lower.includes("heart") || lower.includes("cholesterol")) {
    return "Cardiovascular markers like total cholesterol, LDL, HDL, and triglycerides give a complete picture. HDL is your 'good' cholesterol—higher is better. LDL can be nuanced—small, dense particles are more concerning than large, fluffy ones. Triglycerides often respond well to reducing refined carbs and alcohol. Aim for a balanced lipid profile through diet and exercise.";
  }
  return "That's a great question! In a full implementation, I'd connect to an AI model to give you personalised insights based on your blood test results. For now, try asking about specific biomarkers like Vitamin D, Iron, or Testosterone.";
}

export default function ChatPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: ChatMessage = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");

    setTimeout(() => {
      const assistantResponse: ChatMessage = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: getAssistantResponse(trimmed),
      };
      setMessages((prev) => [...prev, assistantResponse]);
    }, 1000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="h-screen flex flex-col bg-cream">
      {/* Top bar */}
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
            Beta
          </span>
        </div>
      </header>

      {/* Chat area */}
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
                <p className="text-sm leading-relaxed">{msg.content}</p>
              </ClayCard>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input area */}
      <div className="shrink-0 px-4 py-4 border-t border-border bg-cream">
        <div className="max-w-2xl mx-auto space-y-4">
          {/* Quick suggestion chips */}
          <div className="flex flex-wrap gap-2">
            {QUICK_SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                type="button"
                onClick={() => sendMessage(suggestion)}
                className="clay-sm px-4 py-2 text-sm font-medium text-navy hover:bg-white/50 transition-colors rounded-full"
              >
                {suggestion}
              </button>
            ))}
          </div>

          {/* Input + Send */}
          <form onSubmit={handleSubmit} className="flex gap-3">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your biomarkers..."
              className="flex-1 clay-sm h-12 px-4 rounded-xl border-0 bg-white/50 text-navy placeholder:text-muted-foreground"
            />
            <button
              type="submit"
              className="clay-btn shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white transition-transform hover:scale-105 disabled:opacity-50"
              disabled={!input.trim()}
              aria-label="Send message"
            >
              <Send className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
