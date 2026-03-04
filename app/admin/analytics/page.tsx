import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MousePointerClick, BarChart3, TrendingUp } from "lucide-react";

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
  })).sort((a, b) => b.clicks - a.clicks);

  return (
    <div className="flex-1 space-y-6">
      <div className="animate-fade-in-1">
        <h1 className="text-3xl font-bold tracking-tight text-foreground">Analytics</h1>
        <p className="text-muted-foreground mt-2 text-sm">
          Track the performance of your links.
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 animate-fade-in-2">
        <Card className="glass rounded-2xl shadow-xl shadow-black/10 overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-transparent pointer-events-none" />
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-6 relative">
            <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Total Lifetime Clicks
            </CardTitle>
            <div className="h-8 w-8 rounded-lg bg-gradient-brand flex items-center justify-center shadow-lg shadow-purple-500/20">
              <MousePointerClick className="h-4 w-4 text-white" />
            </div>
          </CardHeader>
          <CardContent className="px-6 pb-6 relative">
            <div className="text-3xl font-bold text-foreground">{totalClicks}</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
              <TrendingUp className="h-3 w-3 text-emerald-400" />
              Across all your links
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Link Performance */}
      <Card className="glass rounded-2xl shadow-xl shadow-black/10 animate-fade-in-3">
        <CardHeader className="p-6 md:p-8">
          <CardTitle className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2">
            Link Performance
          </CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            See how your individual links are performing.
          </CardDescription>
        </CardHeader>
        <CardContent className="px-6 md:px-8 pb-6 md:pb-8">
          {linksWithClicks.length > 0 ? (
            <div className="divide-y divide-white/[0.06] relative -mx-6 px-6 sm:mx-0 sm:px-0">
              {linksWithClicks.map((link, index) => (
                <div key={link.id} className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 first:pt-0 last:pb-0 group">
                  <div className="space-y-1 pr-4 overflow-hidden">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono text-muted-foreground">#{index + 1}</span>
                      <p className="font-medium text-sm leading-none truncate text-foreground">
                        {link.title || "Untitled Link"}
                      </p>
                    </div>
                    <p className="text-xs text-muted-foreground truncate font-mono">
                      {link.url}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 font-medium shrink-0">
                    <div className="bg-white/[0.06] px-3 py-1 rounded-full text-sm border border-white/[0.06]">
                      <span className="text-foreground font-bold">{link.clicks}</span>
                      <span className="text-muted-foreground text-xs font-semibold uppercase ml-1.5">clicks</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="mx-auto h-16 w-16 rounded-2xl bg-white/[0.04] flex items-center justify-center mb-4">
                <BarChart3 className="h-8 w-8 text-muted-foreground/50" />
              </div>
              <h3 className="text-lg font-semibold text-foreground">No link click data yet</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-xs mx-auto">
                Share your public profile to start getting clicks.
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
