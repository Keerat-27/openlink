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
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-md">
            <Link2 className="h-7 w-7 text-primary-foreground" />
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
          <div className="flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {/* Onboarding Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="space-y-1 pb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              <CardTitle className="text-xl font-bold tracking-tight">
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
              <div className="rounded-xl bg-slate-50 p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Your public page
                </p>
                <p className="text-base font-semibold text-foreground tracking-tight">
                  openlink.com/
                  <span className={username ? "text-primary" : "text-muted-foreground"}>
                    {username || "username"}
                  </span>
                </p>
              </div>

              {/* Username Input */}
              <div className="space-y-2">
                <Label htmlFor="username" className="text-sm font-medium">
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
                    className="rounded-xl pl-10 pr-10 py-5 transition-colors focus:border-primary"
                    autoComplete="off"
                    autoFocus
                  />
                  {/* Status indicator */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {isChecking && (
                      <Loader2 className="h-4 w-4 animate-spin text-muted-foreground" />
                    )}
                    {!isChecking && availability?.available && (
                      <CheckCircle2 className="h-4 w-4 text-green-600" />
                    )}
                    {!isChecking && availability && !availability.available && (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                </div>

                {/* Availability message */}
                {!isChecking && availability && (
                  <p
                    className={`text-xs mt-1.5 ${
                      availability.available
                        ? "text-green-600"
                        : "text-red-500"
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
                className="w-full rounded-xl py-5 text-sm font-semibold transition-all hover:shadow-md cursor-pointer disabled:opacity-50"
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

        <p className="text-center text-xs text-muted-foreground">
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
        <div className="flex min-h-screen items-center justify-center bg-slate-50">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      }
    >
      <OnboardingForm />
    </Suspense>
  );
}
