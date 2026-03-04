import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Link2, ArrowRight, Sparkles, BarChart3, Palette } from "lucide-react";

export default function HomePage() {
  return (
    <div className="relative flex min-h-screen flex-col overflow-hidden bg-background">
      {/* Animated gradient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-purple-500/20 blur-[120px] animate-float" />
        <div className="absolute top-1/3 -right-40 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px] animate-float [animation-delay:2s]" />
        <div className="absolute -bottom-40 left-1/3 h-96 w-96 rounded-full bg-violet-500/15 blur-[120px] animate-float [animation-delay:4s]" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 glass">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-brand shadow-lg shadow-purple-500/25">
              <Link2 className="h-4.5 w-4.5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-foreground">
              OpenLink
            </span>
          </div>
          <Link href="/login">
            <Button className="rounded-xl bg-gradient-brand px-5 text-sm font-semibold text-white shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105 cursor-pointer border-0">
              Get Started
            </Button>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative flex flex-1 flex-col items-center justify-center px-6 py-24">
        <div className="mx-auto max-w-3xl text-center space-y-8">
          {/* Badge */}
          <div className="animate-fade-in-1 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-sm text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-purple-400" />
            <span>Your premium link-in-bio platform</span>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-in-2 text-5xl font-extrabold tracking-tight text-foreground sm:text-7xl leading-[1.1]">
            All your links.
            <br />
            <span className="text-gradient">One stunning page.</span>
          </h1>

          {/* Subtext */}
          <p className="animate-fade-in-3 mx-auto max-w-xl text-lg text-muted-foreground leading-relaxed">
            Create a beautiful, customizable page for all your important links.
            Share it with the world and track every click.
          </p>

          {/* CTA */}
          <div className="animate-fade-in-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link href="/login">
              <Button
                size="lg"
                className="group relative gap-2 rounded-2xl bg-gradient-brand px-8 py-6 text-base font-semibold text-white shadow-xl shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40 hover:scale-105 cursor-pointer border-0 overflow-hidden"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Create Your Page
                  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </span>
                {/* Shimmer overlay */}
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mx-auto mt-24 grid max-w-4xl gap-6 px-6 sm:grid-cols-3">
          {[
            {
              icon: Link2,
              title: "Unlimited Links",
              description: "Add as many links as you want. Drag and drop to reorder them instantly.",
              color: "purple",
              delay: "animate-slide-up-1",
            },
            {
              icon: Palette,
              title: "Customize Everything",
              description: "Choose colors, button styles, and themes to match your personal brand.",
              color: "cyan",
              delay: "animate-slide-up-2",
            },
            {
              icon: BarChart3,
              title: "Click Analytics",
              description: "Track how many people click your links with built-in analytics dashboards.",
              color: "emerald",
              delay: "animate-slide-up-3",
            },
          ].map((feature) => {
            const Icon = feature.icon;
            const colorClasses = {
              purple: "from-purple-500/20 to-purple-500/5 text-purple-400 shadow-purple-500/10",
              cyan: "from-cyan-500/20 to-cyan-500/5 text-cyan-400 shadow-cyan-500/10",
              emerald: "from-emerald-500/20 to-emerald-500/5 text-emerald-400 shadow-emerald-500/10",
            }[feature.color]!;

            return (
              <div
                key={feature.title}
                className={`${feature.delay} group glass rounded-2xl p-6 transition-all duration-300 hover-lift`}
              >
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br ${colorClasses} shadow-lg`}>
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold tracking-tight text-foreground">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border py-8">
        <div className="mx-auto max-w-6xl px-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} OpenLink. All rights reserved.
        </div>
      </footer>
    </div>
  );
}
