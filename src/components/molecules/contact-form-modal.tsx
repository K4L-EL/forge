"use client";

import * as React from "react";
import {
  CheckCircle,
  Loader2,
  Mail,
  MessageSquare,
  XCircle,
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type FormStatus = "idle" | "sending" | "success" | "error";

const inputClass = cn(
  "clay-sm h-11 rounded-xl border-0 bg-white/80",
  "placeholder:text-muted-foreground",
  "focus-visible:ring-2 focus-visible:ring-teal/30"
);

export interface ContactFormModalProps {
  trigger: React.ReactNode;
  defaultSubject?: string;
}

export function ContactFormModal({
  trigger,
  defaultSubject = "",
}: ContactFormModalProps) {
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = React.useState<FormStatus>("idle");
  const [errorMessage, setErrorMessage] = React.useState("");

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [subject, setSubject] = React.useState(defaultSubject);
  const [message, setMessage] = React.useState("");

  const handleOpenChange = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      if (next) {
        setStatus("idle");
        setErrorMessage("");
        setName("");
        setEmail("");
        setSubject(defaultSubject);
        setMessage("");
      }
    },
    [defaultSubject]
  );

  React.useEffect(() => {
    if (status !== "success" || !open) return;
    const t = setTimeout(() => setOpen(false), 3000);
    return () => clearTimeout(t);
  }, [status, open]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          subject: subject.trim() || undefined,
          message: message.trim(),
        }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        error?: string;
      };

      if (!res.ok) {
        setErrorMessage(
          data.error ?? "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setErrorMessage(
        "Network error. Please check your connection and try again."
      );
      setStatus("error");
    }
  }

  const triggerRender = React.isValidElement(trigger)
    ? (trigger as React.ReactElement<Record<string, unknown>>)
    : (
        <button type="button" className="inline-flex items-center">
          {trigger}
        </button>
      );

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={triggerRender} />
      <DialogContent
        showCloseButton
        className={cn(
          "sm:max-w-lg gap-0 overflow-hidden border-0 bg-mist p-0",
          "shadow-xl ring-1 ring-navy/10"
        )}
        aria-describedby={
          status === "idle" || status === "sending"
            ? "contact-form-description"
            : status === "success"
              ? "contact-success-description"
              : "contact-error-description"
        }
      >
        <div className="bg-cream/80 px-6 pb-6 pt-8 sm:px-8 sm:pb-8 sm:pt-10">
          {status === "success" ? (
            <div
              className="flex flex-col items-center text-center py-4"
              role="status"
              aria-live="polite"
            >
              <CheckCircle
                className="h-14 w-14 text-teal mb-4"
                strokeWidth={1.75}
                aria-hidden
              />
              <DialogTitle
                className="font-display text-2xl font-bold text-navy mb-2 text-center"
              >
                Message sent!
              </DialogTitle>
              <DialogDescription
                id="contact-success-description"
                className="text-center text-muted-foreground text-sm leading-relaxed max-w-sm"
              >
                We&apos;ll be in touch at the email you provided.
              </DialogDescription>
            </div>
          ) : status === "error" ? (
            <div
              className="flex flex-col items-center text-center py-4"
              role="alert"
              aria-live="assertive"
            >
              <XCircle
                className="h-14 w-14 text-red-500 mb-4"
                strokeWidth={1.75}
                aria-hidden
              />
              <DialogTitle className="font-display text-xl font-bold text-navy mb-2 text-center">
                Couldn&apos;t send
              </DialogTitle>
              <DialogDescription
                id="contact-error-description"
                className="text-red-600 text-sm leading-relaxed max-w-sm text-center"
              >
                {errorMessage}
              </DialogDescription>
              <button
                type="button"
                className={cn(
                  "mt-6 clay-btn w-full rounded-xl py-3 font-semibold text-navy"
                )}
                onClick={() => {
                  setStatus("idle");
                  setErrorMessage("");
                }}
              >
                Try again
              </button>
            </div>
          ) : (
            <>
              <DialogHeader className="gap-4 text-left mb-8">
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      "clay-sm flex h-12 w-12 shrink-0 items-center justify-center",
                      "rounded-2xl bg-white/90 text-coral"
                    )}
                    aria-hidden
                  >
                    <Mail className="h-6 w-6" />
                  </div>
                  <div className="min-w-0 flex-1 pt-0.5">
                    <div className="flex items-center gap-2 mb-1">
                      <MessageSquare
                        className="h-4 w-4 text-teal shrink-0"
                        aria-hidden
                      />
                      <DialogTitle
                        className={cn(
                          "font-display text-2xl font-bold tracking-tight",
                          "text-navy"
                        )}
                      >
                        Get in touch
                      </DialogTitle>
                    </div>
                    <DialogDescription
                      id="contact-form-description"
                      className="text-base text-muted-foreground leading-relaxed"
                    >
                      Questions about a test or your results? Send us a message
                      and we&apos;ll reply within 24 hours.
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>

              <form
                onSubmit={handleSubmit}
                className="clay rounded-2xl p-5 sm:p-6 bg-white/60 space-y-5"
                noValidate
              >
                <div className="space-y-2">
                  <label
                    htmlFor="contact-name"
                    className="text-sm font-semibold text-navy"
                  >
                    Name <span className="text-coral">*</span>
                  </label>
                  <Input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClass}
                    disabled={status === "sending"}
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-email"
                    className="text-sm font-semibold text-navy"
                  >
                    Email <span className="text-coral">*</span>
                  </label>
                  <Input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClass}
                    disabled={status === "sending"}
                    aria-required="true"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-subject"
                    className="text-sm font-semibold text-navy"
                  >
                    Subject
                  </label>
                  <Input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    autoComplete="off"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClass}
                    disabled={status === "sending"}
                    placeholder="Optional"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="contact-message"
                    className="text-sm font-semibold text-navy"
                  >
                    Message <span className="text-coral">*</span>
                  </label>
                  <Textarea
                    id="contact-message"
                    name="message"
                    required
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={cn(
                      inputClass,
                      "min-h-[140px] h-auto py-3 resize-y"
                    )}
                    disabled={status === "sending"}
                    aria-required="true"
                    placeholder="How can we help?"
                  />
                </div>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className={cn(
                    "clay-btn w-full rounded-xl py-3.5 font-semibold text-navy",
                    "inline-flex items-center justify-center gap-2",
                    "transition-all disabled:opacity-70"
                  )}
                  aria-busy={status === "sending"}
                >
                  {status === "sending" ? (
                    <>
                      <Loader2
                        className="h-5 w-5 animate-spin"
                        aria-hidden
                      />
                      Sending...
                    </>
                  ) : (
                    "Send message"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
