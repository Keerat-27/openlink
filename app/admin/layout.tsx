import { ReactNode } from "react";
import Link from "next/link";
import { Link2, Palette, BarChart, Settings, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/login/actions";
import { AdminProvider } from "@/components/admin-provider";
import { MobilePreview } from "@/components/mobile-preview";

interface AdminLayoutProps {
  children: ReactNode;
}

export default async function AdminLayout({ children }: AdminLayoutProps) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: links } = await supabase
    .from("links")
    .select("*")
    .eq("profile_id", profile.id)
    .order("order", { ascending: true });

  const navLinks = [
    { name: "Links", href: "/admin", icon: Link2 },
    { name: "Appearance", href: "/admin/appearance", icon: Palette },
    { name: "Analytics", href: "/admin/analytics", icon: BarChart },
    { name: "Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <AdminProvider initialProfile={profile} initialLinks={links || []}>
      <div className="flex h-screen flex-col md:flex-row bg-background">
        {/* Sidebar (Desktop) */}
        <aside className="hidden w-64 flex-col md:flex shrink-0 border-r border-white/[0.06] bg-white/[0.02]">
          <div className="flex flex-col h-full px-4 pt-6">
            {/* Logo */}
            <div className="flex items-center gap-2.5 px-3 mb-8">
              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-brand shadow-lg shadow-purple-500/20">
                <Link2 className="h-4 w-4 text-white" />
              </div>
              <span className="text-xl font-bold tracking-tight text-foreground">
                OpenLink
              </span>
            </div>

            {/* Navigation */}
            <nav className="flex flex-col gap-1 flex-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 text-muted-foreground hover:text-foreground hover:bg-white/[0.06] group"
                  >
                    <Icon className="h-[18px] w-[18px] transition-colors" />
                    {link.name}
                  </Link>
                );
              })}
            </nav>

            {/* User Section */}
            <div className="mt-auto pb-4 pt-4 border-t border-white/[0.06]">
              <div className="flex items-center gap-3 rounded-xl p-2 group">
                <div className="h-9 w-9 rounded-full overflow-hidden flex items-center justify-center shrink-0 ring-2 ring-white/10 bg-white/[0.06]">
                  {profile?.avatar_url ? (
                    <img src={profile.avatar_url} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <span className="text-xs font-bold text-muted-foreground">
                      {profile?.display_name?.[0] || profile?.username?.[0]?.toUpperCase()}
                    </span>
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="text-sm font-medium text-foreground truncate">
                    {profile?.display_name || profile?.username}
                  </p>
                  <p className="text-xs text-muted-foreground truncate">
                    @{profile?.username}
                  </p>
                </div>
              </div>
              <form className="mt-1">
                <button
                  formAction={signOut}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:bg-white/[0.06] hover:text-foreground cursor-pointer"
                >
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </button>
              </form>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full md:pb-0 pb-20">
          <div className="mx-auto max-w-3xl w-full p-4 md:p-8">
            {children}
          </div>
        </main>

        {/* Mobile Preview Area (Desktop) */}
        <div className="hidden lg:flex w-[450px] flex-col items-center justify-center shrink-0 sticky top-0 h-screen border-l border-white/[0.06] bg-white/[0.01] p-8">
          <MobilePreview />
        </div>

        {/* Bottom Tab Bar (Mobile) */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t border-white/[0.06] glass md:hidden justify-around items-center px-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center justify-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </AdminProvider>
  );
}
