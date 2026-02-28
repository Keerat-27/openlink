import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { signOut } from "@/app/login/actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LogOut, Shield, Link2 } from "lucide-react";

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-12">
      <div className="w-full max-w-lg space-y-8">
        {/* Header */}
        <div className="flex flex-col items-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary shadow-md">
            <Link2 className="h-7 w-7 text-primary-foreground" />
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
          <p className="text-sm text-muted-foreground">
            Welcome to your OpenLink admin panel
          </p>
        </div>

        {/* Auth Status Card */}
        <Card className="border border-gray-200 shadow-sm rounded-2xl">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-green-100">
                <Shield className="h-5 w-5 text-green-700" />
              </div>
              <div>
                <CardTitle className="text-lg font-bold tracking-tight">
                  Authenticated
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  You are signed in successfully
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-xl bg-slate-50 p-4 space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="font-medium text-foreground">
                  {user.email}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">User ID</span>
                <span className="font-mono text-xs text-muted-foreground">
                  {user.id.slice(0, 8)}...
                </span>
              </div>
            </div>
            <form>
              <Button
                formAction={signOut}
                variant="outline"
                className="w-full gap-2 rounded-xl py-5 text-sm font-medium transition-all hover:bg-red-50 hover:text-red-700 hover:border-red-200 cursor-pointer"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </Button>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          🚧 Full dashboard coming in Phase 3
        </p>
      </div>
    </div>
  );
}
