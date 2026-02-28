import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointerClick, BarChart3 } from "lucide-react";

export default async function AnalyticsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("id", user.id)
    .single();

  if (!profile) {
    redirect("/onboarding");
  }

  // Get user links
  const { data: links } = await supabase
    .from("links")
    .select("id, title, url")
    .eq("profile_id", profile.id)
    .order("created_at", { ascending: false });

  const activeLinks = links || [];
  const linkIds = activeLinks.map((l) => l.id);

  let totalClicks = 0;
  let clicksData: any[] = [];

  // Fetch all clicks for the user's links
  if (linkIds.length > 0) {
    const { data: clicks } = await supabase
      .from("clicks")
      .select("*")
      .in("link_id", linkIds);
      
    if (clicks) {
      clicksData = clicks;
      totalClicks = clicks.length;
    }
  }

  // Count clicks per link
  const clickCountsByLink = clicksData.reduce((acc: any, click: any) => {
    acc[click.link_id] = (acc[click.link_id] || 0) + 1;
    return acc;
  }, {});

  const linksWithClicks = activeLinks.map((link) => ({
    ...link,
    clicks: clickCountsByLink[link.id] || 0,
  })).sort((a, b) => b.clicks - a.clicks); // Sort by highest clicks

  return (
    <div className="flex-1 space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
        <p className="text-muted-foreground mt-2">
          Track the performance of your links.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Lifetime Clicks</CardTitle>
            <MousePointerClick className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClicks}</div>
            <p className="text-xs text-muted-foreground mt-1">Across all your links</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Link Performance</CardTitle>
          <CardDescription>
            See how your individual links are performing.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {linksWithClicks.length > 0 ? (
            <div className="divide-y relative -mx-6 px-6 sm:mx-0 sm:px-0">
              {linksWithClicks.map((link) => (
                <div key={link.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0">
                  <div className="space-y-1 pr-4 overflow-hidden">
                    <p className="font-medium text-sm leading-none truncate">
                      {link.title || "Untitled Link"}
                    </p>
                    <p className="text-sm text-muted-foreground truncate">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-medium shrink-0">
                    <div className="bg-muted px-2.5 py-0.5 rounded-full text-sm">
                      {link.clicks} <span className="text-muted-foreground text-xs font-semibold uppercase ml-1">clicks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BarChart3 className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
              <h3 className="text-lg font-medium">No link click data yet</h3>
              <p className="text-sm text-muted-foreground mt-2">
                Share your public profile to start getting clicks.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
