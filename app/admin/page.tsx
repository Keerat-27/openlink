import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { LinksManager } from "@/components/links-manager";

export const metadata = {
  title: "Manage Links | OpenLink",
};

export default async function AdminLinksPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("order", { ascending: true });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">Links</h1>
        <p className="text-slate-600 mt-1 text-sm">
          Add, edit, and reorder links on your public profile.
        </p>
      </div>

      <LinksManager initialLinks={links || []} />
    </div>
  );
}
