import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link2, ArrowRight, Sparkles, BarChart3, Palette } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      {/* Navigation */}
      <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary">
              <Link2 className="h-4.5 w-4.5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold tracking-tight">OpenLink</span>
          </div>
          <Link href="/login">
            <Button className="rounded-xl px-5 text-sm font-semibold cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex flex-1 flex-col items-center justify-center px-6 py-20">
        <div className="mx-auto max-w-2xl text-center space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-4 py-1.5 text-sm text-muted-foreground shadow-sm">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Your link-in-bio platform</span>
          </div>

          <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
            All your links.
            <br />
            <span className="text-primary">One simple page.</span>
          </h1>

          <p className="mx-auto max-w-lg text-lg text-muted-foreground leading-relaxed">
            Create a beautiful, customizable page for all your important links.
            Share it with the world and track every click.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="gap-2 rounded-xl px-8 py-6 text-base font-semibold shadow-md transition-all hover:shadow-lg cursor-pointer"
              >
                Create Your Page
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto mt-20 grid max-w-4xl gap-6 px-6 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-blue-100">
              <Link2 className="h-5 w-5 text-blue-700" />
            </div>
            <h3 className="text-base font-bold tracking-tight">
              Unlimited Links
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Add as many links as you want. Drag and drop to reorder them
              instantly.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100">
              <Palette className="h-5 w-5 text-purple-700" />
            </div>
            <h3 className="text-base font-bold tracking-tight">
              Customize Everything
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Choose colors, button styles, and themes to match your personal
              brand.
            </p>
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all hover:shadow-md">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-100">
              <BarChart3 className="h-5 w-5 text-emerald-700" />
            </div>
            <h3 className="text-base font-bold tracking-tight">
              Click Analytics
            </h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
              Track how many people click your links with built-in analytics
              dashboards.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} OpenLink. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
