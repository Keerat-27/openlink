"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export async function checkUsernameAvailability(username: string) {
  const supabase = await createClient();

  // Validate format: only lowercase letters, numbers, hyphens, underscores
  const usernameRegex = /^[a-z0-9_-]+$/;
  if (!usernameRegex.test(username)) {
    return {
      available: false,
      error: "Username can only contain lowercase letters, numbers, hyphens, and underscores.",
    };
  }

  if (username.length < 3) {
    return { available: false, error: "Username must be at least 3 characters." };
  }

  if (username.length > 30) {
    return { available: false, error: "Username must be 30 characters or less." };
  }

  // Reserved usernames
  const reserved = ["admin", "login", "onboarding", "api", "auth", "settings", "help", "support", "about"];
  if (reserved.includes(username)) {
    return { available: false, error: "This username is reserved." };
  }

  const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq("username", username)
    .maybeSingle();

  if (error) {
    return { available: false, error: "Could not check username. Please try again." };
  }

  if (data) {
    return { available: false, error: "This username is already taken." };
  }

  return { available: true, error: null };
}

export async function claimUsername(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const username = (formData.get("username") as string).toLowerCase().trim();

  // Re-validate on server
  const check = await checkUsernameAvailability(username);
  if (!check.available) {
    redirect(`/onboarding?error=${encodeURIComponent(check.error || "Invalid username")}`);
  }

  // Update the profile with the chosen username
  const { data: updatedProfile, error: updateError } = await supabase
    .from("profiles")
    .update({
      username,
      display_name: user.user_metadata?.full_name || user.email?.split("@")[0] || username,
    })
    .eq("id", user.id)
    .select()
    .maybeSingle();

  if (updateError) {
    redirect(`/onboarding?error=${encodeURIComponent(updateError.message)}`);
  }

  if (!updatedProfile) {
    // If the profile doesn't exist yet (trigger may not have fired), insert it
    const { error: insertError } = await supabase.from("profiles").insert({
      id: user.id,
      username,
      display_name: user.user_metadata?.full_name || user.email?.split("@")[0] || username,
    });

    if (insertError) {
      redirect(`/onboarding?error=${encodeURIComponent(insertError.message)}`);
    }
  }

  revalidatePath("/", "layout");
  redirect("/admin");
}
