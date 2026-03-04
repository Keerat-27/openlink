"use client";

import { useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { checkUsernameAvailability, claimUsername } from "./actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Link2,
  Loader2,
  AtSign,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Sparkles,
} from "lucide-react";

function OnboardingForm() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error");

  const [username, setUsername] = useState("");
  const [isChecking, setIsChecking] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availability, setAvailability] = useState<{
    available: boolean;
    error: string | null;
  } | null>(null);

  // Debounced username availability check
  const checkAvailability = useCallback(async (value: string) => {
    if (value.length < 3) {
      setAvailability(null);
      return;
    }

    setIsChecking(true);
    const result = await checkUsernameAvailability(value.toLowerCase().trim());
    setAvailability(result);
    setIsChecking(false);
  }, []);

  useEffect(() => {
    if (username.length < 3) {
      setAvailability(null);
      return;
    }

    const timeout = setTimeout(() => {
      checkAvailability(username);
    }, 400);

    return () => clearTimeout(timeout);
  }, [username, checkAvailability]);

  function handleUsernameChange(e: React.ChangeEvent<HTMLInputElement>) {
    // Only allow valid characters as they type
    const value = e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, "");
    setUsername(value);
  }

  async function handleSubmit(formData: FormData) {
    setIsSubmitting(true);
    try {
      await claimUsername(formData);
    } catch {
      // Next.js redirect throws — expected
    } finally {
      setIsSubmitting(false);
    }
  }

  const isValid = availability?.available === true && username.length >= 3;

  return (
    <div className="relative flex min-h-screen items-center justify-center px-4 py-12 overflow-hidden">
      {/* Animated background orbs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-purple-500/15 blur-[100px] animate-float" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-cyan-500/15 blur-[100px] animate-float [animation-delay:3s]" />
      </div>

      <div className="relative w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3 animate-fade-in-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-brand shadow-xl shadow-purple-500/25">
            <Link2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Claim your link
          </h1>
          <p className="text-sm text-muted-foreground text-center">
            Choose a unique username for your OpenLink page
          </p>
        </div>

        {/* Error from server */}
        {error && (
          <div className="flex items-center gap-3 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400 backdrop-blur-sm animate-fade-in">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Onboarding Card */}
        <Card className="animate-fade-in-2 glass-strong rounded-2xl shadow-2xl shadow-black/20">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-purple-400" />
              <CardTitle className="text-xl font-bold tracking-tight text-foreground">
                Pick your username
              </CardTitle>
            </div>
            <CardDescription className="text-muted-foreground">
              This will be your public page URL. You can&apos;t change it later.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form action={handleSubmit} className="space-y-6">
              {/* URL Preview */}
              <div className="rounded-xl bg-white/5 border border-white/8 p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Your public page
                </p>
                <p className="text-base font-semibold text-foreground tracking-tight font-mono">
                  openlink.com/
                  <span className={username ? "text-gradient" : "text-muted-foreground"}>
                    {username || "username"}
                  </span>
                </p>
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium text-foreground">
                  Username
                </Label>
                <div className="relative">
                  <AtSign className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    id="username"
                    name="username"
                    type="text"
                    placeholder="your-username"
                    value={username}
                    onChange={handleUsernameChange}
                    maxLength={30}
                    required
                    disabled={isSubmitting}
                    className="rounded-xl pl-10 pr-10 py-5 bg-white/5 border-white/10 text-foreground placeholder:text-muted-foreground transition-all duration-300 focus:border-purple-500/50 focus:ring-purple-500/20"
                    autoComplete="off"
                    autoFocus
                  />
                  {/* Status indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isChecking && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {!isChecking && availability?.available && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                    )}
                    {!isChecking && availability && !availability.available && (
                      <XCircle className="h-4 w-4 text-red-400" />
                    )}
                  </div>
                </div>

                {/* Availability message */}
                {!isChecking && availability && (
                  <p
                    className={`text-xs mt-1.5 ${
                      availability.available
                        ? "text-emerald-400"
                        : "text-red-400"
                    }`}
                  >
                    {availability.available
                      ? "✓ This username is available!"
                      : availability.error}
                  </p>
                )}

                {/* Character hint */}
                {username.length > 0 && username.length < 3 && (
                  <p className="text-xs text-muted-foreground mt-1.5">
                    Username must be at least 3 characters
                  </p>
                )}
              </div>

              {/* Submit */}
              <Button
                type="submit"
                className="w-full rounded-xl py-5 text-sm font-semibold bg-gradient-brand text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-[1.02] cursor-pointer disabled:opacity-50 border-0"
                disabled={!isValid || isSubmitting}
              >
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Claim Username
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="animate-fade-in-3 text-center text-xs text-muted-foreground">
          Choose wisely — your username is permanent and visible to everyone.
        </p>
      </div>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}
