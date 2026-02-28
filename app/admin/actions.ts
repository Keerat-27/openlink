"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createLink() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    throw new Error("Unauthorized");
  }

  // Get current links to determine order
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    throw new Error("Profile not found");
  }

  const { data: existingLinks } = await supabase
    .from("links")
    .select("order")
    .eq("profile_id", profile.id)
    .order("order", { ascending: true })
    .limit(1);

  const newOrder = existingLinks && existingLinks.length > 0 ? existingLinks[0].order - 1 : 0;

  const { data: newLink, error } = await supabase
    .from("links")
    .insert({
      profile_id: profile.id,
      title: "",
      url: "",
      order: newOrder,
      is_active: false,
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating link", error);
    throw new Error("Failed to create link");
  }

  revalidatePath("/admin");
  return newLink;
}

export async function updateLink(id: string, updates: { title?: string; url?: string; is_active?: boolean }) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("links")
    .update(updates)
    .eq("id", id);

  if (error) {
    console.error("Error updating link", error);
    throw new Error("Failed to update link");
  }

  revalidatePath("/admin");
}

export async function deleteLink(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("links")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting link", error);
    throw new Error("Failed to delete link");
  }

  revalidatePath("/admin");
}

export async function reorderLinks(updates: { id: string; order: number }[]) {
  const supabase = await createClient();

  // Supabase update for multiple rows can be done with .upsert
  // We need the profile_id to do upsert or we can do a loop of updates.
  // Given links count is small, loop is fine, or we can use upsert if we fetch existing link data first.
  for (const update of updates) {
    await supabase
      .from("links")
      .update({ order: update.order })
      .eq("id", update.id);
  }

  revalidatePath("/admin");
}
