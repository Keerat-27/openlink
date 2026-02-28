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
      <div className="flex h-screen flex-col md:flex-row bg-gray-50">
        {/* Sidebar (Desktop) */}
        <aside className="hidden w-64 flex-col border-r bg-white md:flex pl-4 pr-4 pt-6 pb-6 shrink-0">
          <div className="flex items-center gap-2 px-2 mb-8">
            <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-primary">
              <Link2 className="h-4 w-4 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">OpenLink</span>
          </div>
          
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 text-gray-500`}
                >
                  <Icon className="h-5 w-5" />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          <div className="mt-auto px-2 border-t pt-4">
            <div className="mb-4 text-sm font-medium text-gray-900 px-1">
              @{profile?.username}
            </div>
            <form>
              <button
                formAction={signOut}
                className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-gray-500 transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer"
              >
                <LogOut className="h-5 w-5" />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto w-full md:pb-0 pb-24 border-r border-gray-200">
          <div className="mx-auto max-w-3xl w-full p-4 md:p-8">
             {children}
          </div>
        </main>

        {/* Mobile Preview Area (Desktop) */}
        <div className="hidden lg:flex w-[450px] flex-col items-center justify-center bg-gray-50 p-8 shrink-0">
          <MobilePreview />
        </div>

        {/* Bottom Tab Bar (Mobile) */}
        <nav className="fixed bottom-0 left-0 right-0 z-50 flex h-16 border-t bg-white md:hidden justify-around items-center px-4">
          {navLinks.map((link) => {
            const Icon = link.icon;
            return (
              <Link
                key={link.name}
                href={link.href}
                className="flex flex-col items-center justify-center gap-1 text-gray-500 hover:text-gray-900 transition-colors"
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
