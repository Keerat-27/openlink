import { createClient } from "@/lib/supabase/server";
import { type NextRequest } from "next/server";
import { redirect } from "next/navigation";
import { userAgent } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const linkId = searchParams.get("linkId");

  if (!linkId) {
    return new Response("Missing linkId", { status: 400 });
  }

  const supabase = await createClient();

  // 1. Fetch the actual URL
  const { data: link, error } = await supabase
    .from("links")
    .select("url")
    .eq("id", linkId)
    .single();

  if (error || !link) {
    return new Response("Link not found", { status: 404 });
  }

  // 2. Determine device type
  const { device } = userAgent(request);
  const deviceType = device.type === "mobile" || device.type === "tablet" ? "mobile" : "desktop";

  // 3. Insert click record
  await supabase.from("clicks").insert({
    link_id: linkId,
    device_type: deviceType,
  });

  // 4. Redirect to actual URL
  redirect(link.url);
}
