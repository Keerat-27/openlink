"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus_Jakarta_Sans } from "next/font/google";
import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  Sparkles,
  Layout,
  Palette,
  Zap,
  BarChart3,
  Globe,
  Smartphone,
  Music,
  Video,
  Check,
  Users,
  MessageSquare,
  Star,
} from "lucide-react";
import { motion } from "framer-motion";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

type FeatureSection = {
  id: string;
  label: string;
  title: string;
  description: string;
  bullets: string[];
  backgroundClass: string;
  accentClass: string;
  icon: LucideIcon;
};

type Stat = {
  label: string;
  value: string;
  helper: string;
  icon: LucideIcon;
};

type FooterColumnProps = {
  title: string;
  links: string[];
};

const featureSections: FeatureSection[] = [
  {
    id: "share",
    label: "Share",
    title: "Share everything with a single link in bio.",
    description:
      "Bring together your socials, content, storefronts, and projects in one branded link that is easy to remember and simple to share everywhere.",
    bullets: [
      "One URL that works across every platform",
      "Buttons, banners, embeds, and rich media blocks",
      "Optimized layouts that look great on every device",
    ],
    backgroundClass: "bg-[#fdf5ff]",
    accentClass: "text-purple-700",
    icon: Layout,
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Understand what your audience clicks on.",
    description:
      "Track performance in real time so you can see which links get attention, where visitors come from, and how they behave over time.",
    bullets: [
      "Real‑time click, view, and conversion tracking",
      "Top locations, referrers, and devices",
      "Exportable insights for sponsors and partners",
    ],
    backgroundClass: "bg-[#f2fbff]",
    accentClass: "text-sky-700",
    icon: BarChart3,
  },
  {
    id: "customize",
    label: "Design",
    title: "Make your link page feel like your brand.",
    description:
      "Customize colors, typography, buttons, and blocks so your OpenLink feels like a natural extension of your brand—not a generic list of links.",
    bullets: [
      "Preset themes plus fully custom styles",
      "Upload your own imagery and brand assets",
      "Fine‑tuned control over spacing and hierarchy",
    ],
    backgroundClass: "bg-[#e8fff4]",
    accentClass: "text-emerald-700",
    icon: Palette,
  },
  {
    id: "monetize",
    label: "Monetize",
    title: "Turn your audience into revenue, instantly.",
    description:
      "Add tip jars, featured offers, and product blocks so visitors can support you and buy from you directly from your link page.",
    bullets: [
      "Sell products, sessions, and digital downloads",
      "Highlight sponsors and affiliate offers",
      "0% platform transaction fees on what you earn",
    ],
    backgroundClass: "bg-[#fff5eb]",
    accentClass: "text-amber-700",
    icon: Zap,
  },
];

const stats: Stat[] = [
  {
    label: "Creators and brands",
    value: "50K+",
    helper: "across music, podcasts, ecommerce, and more",
    icon: Users,
  },
  {
    label: "Clicks tracked every month",
    value: "12M+",
    helper: "so you always know what is working",
    icon: BarChart3,
  },
  {
    label: "Countries reached",
    value: "150+",
    helper: "with fast, reliable link performance",
    icon: Globe,
  },
];

export default function HomePage() {
  return (
    <div
      className={`${plusJakarta.className} flex min-h-screen flex-col bg-background selection:bg-primary/30`}
    >
      <SiteHeader />
      <main className="flex-1">
        <HeroSection />
        <StatsSection />
        <FeaturesSection />
        <SocialProofSection />
        <BottomCTASection />
      </main>
      <SiteFooter />
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 flex justify-center">
      <div className="pointer-events-auto mx-auto flex h-14 w-[min(1100px,calc(100%-1.5rem))] items-center justify-between rounded-full bg-white/95 px-5 sm:px-8 text-slate-900 shadow-[0_18px_70px_rgba(15,23,42,0.32)] ring-1 ring-black/5 backdrop-blur-xl">
        {/* Logo / brand */}
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900 text-[#d3ff4a] shadow-sm shadow-slate-900/40">
            <Globe className="h-4 w-4" />
          </div>
          <span className="text-[1.1rem] font-semibold tracking-[-0.05em]">
            OpenLink
          </span>
        </Link>

        {/* Center nav links */}
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-600 md:flex">
          <Link href="#features" className="transition-colors hover:text-slate-900">
            Features
          </Link>
          <Link href="#analytics" className="transition-colors hover:text-slate-900">
            Analytics
          </Link>
          <Link href="#monetize" className="transition-colors hover:text-slate-900">
            Monetization
          </Link>
          <Link href="#learn" className="transition-colors hover:text-slate-900">
            Learn
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="hidden rounded-full bg-slate-100 px-4 py-1.5 text-xs font-medium text-slate-800 shadow-sm transition-colors hover:bg-slate-200 md:inline-flex"
          >
            Log in
          </Link>
          <Link href="/login">
            <Button className="rounded-full bg-slate-900 px-5 py-1.5 text-xs font-semibold text-[#d3ff4a] shadow-md shadow-slate-900/50 transition-transform duration-200 ease-out hover:scale-[1.04]">
              Sign up free
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-gradient-to-br from-[#d3ff4a] via-[#f5ffe6] to-[#ffe6ff]"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.7),transparent_55%),radial-gradient(circle_at_bottom_right,rgba(148,163,184,0.55),transparent_55%)]" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:py-28 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:px-10 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-9"
        >
          <div className="inline-flex items-center gap-2 rounded-full bg-black px-4 py-1.5 text-xs font-semibold tracking-wide text-white/90">
            <Sparkles className="h-3.5 w-3.5" />
            <span>Link-in-bio, leveled up</span>
          </div>

          <h1 className="font-extrabold text-slate-900 text-[clamp(3.5rem,6vw,5rem)] leading-[1.22] tracking-[-0.055em]">
            Everything you create,{" "}
            <br className="hidden sm:block" />
            <span className="underline decoration-4 decoration-slate-900/40 underline-offset-8">
              in one simple link.
            </span>
          </h1>

          <p className="max-w-xl text-[0.98rem] text-slate-900/80 sm:text-base md:text-lg leading-[1.75]">
            OpenLink is your homepage for the internet—collect your links,
            content, and storefronts in one place and share it everywhere with a
            single URL.
          </p>
          <div className="w-full max-w-md space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-full bg-white/75 px-5 py-3 shadow-lg shadow-slate-900/10 ring-1 ring-white/70 backdrop-blur">
                <div className="flex items-center gap-2">
                  <span className="hidden text-sm font-medium text-slate-500 sm:block">
                    openlink.page/
                  </span>
                  <input
                    type="text"
                    placeholder="yourname"
                    className="w-full bg-transparent text-sm font-medium text-slate-900 placeholder:text-slate-400 outline-none md:text-base"
                  />
                </div>
              </div>
              <Link href="/login">
                <Button className="w-full rounded-full bg-gradient-to-r from-slate-900 via-slate-900 to-slate-700 px-7 py-3 text-sm font-semibold text-[#d3ff4a] shadow-xl shadow-slate-900/40 transition-transform duration-200 ease-out hover:scale-[1.04] hover:shadow-slate-900/60 sm:w-auto">
                  Get started for free
                </Button>
              </Link>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs text-slate-800/80 sm:text-sm">
              <span>No credit card required.</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <Link
                href="/login"
                className="font-semibold underline-offset-4 hover:underline"
              >
                Already using OpenLink? Log in
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="mx-auto w-full max-w-[380px]"
        >
          <PhoneMockup />
        </motion.div>
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <motion.div
      className="relative flex aspect-[9/18] flex-col overflow-hidden rounded-[2.75rem] border-[10px] border-slate-900/90 bg-slate-950 shadow-[0_28px_80px_rgba(15,23,42,0.85)]"
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 10, ease: "easeInOut", repeat: Infinity }}
    >
      <div className="absolute left-1/2 top-3 z-20 h-7 w-24 -translate-x-1/2 rounded-full bg-slate-900" />

      <div className="relative z-10 flex flex-1 flex-col bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950">
        <div className="flex flex-col items-center px-6 pt-10 pb-6 text-center">
          <div className="mb-4 h-20 w-20 rounded-full bg-gradient-to-tr from-primary to-accent p-1 shadow-lg">
            <div className="h-full w-full overflow-hidden rounded-full bg-card">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                alt="Profile avatar"
                className="h-full w-full object-cover"
              />
            </div>
          </div>
          <h2 className="text-lg font-semibold text-white font-heading">
            Jordan Rivers
          </h2>
          <p className="mt-1 text-xs text-slate-300">
            Artist, podcaster & creator
          </p>
        </div>

        <div className="relative flex-1 space-y-3 overflow-y-auto px-4 pb-6 no-scrollbar">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center justify-between rounded-2xl bg-card/90 px-4 py-3 text-sm text-foreground shadow-md ring-1 ring-white/15"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Video className="h-5 w-5" />
              </div>
              <span className="font-semibold">New video: Behind the scenes</span>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground" />
          </motion.div>

          <div className="grid grid-cols-2 gap-3">
            <motion.div
              whileHover={{ scale: 1.04 }}
              className="flex aspect-square flex-col items-center justify-center gap-2 rounded-2xl border border-white/15 bg-card/90 text-center text-xs text-foreground shadow-md"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-rose-500/15 text-rose-400">
                <Layout className="h-5 w-5" />
              </div>
              <span className="font-semibold">Portfolio</span>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.04 }}
              className="relative flex aspect-square flex-col items-center justify-center gap-2 overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-accent text-center text-xs font-semibold text-white shadow-xl"
            >
              <span className="absolute inset-0 translate-y-full bg-white/20 transition-transform duration-300 ease-out group-hover:translate-y-0" />
              <Globe className="relative z-10 h-5 w-5" />
              <span className="relative z-10">Website</span>
            </motion.div>
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="flex items-center gap-4 rounded-2xl border border-white/15 bg-card/90 px-4 py-3 text-xs text-foreground shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=100"
              className="h-10 w-10 rounded-xl object-cover"
              alt="Music preview"
            />
            <div className="flex flex-1 flex-col">
              <span className="font-semibold">Listen on your favorite platform</span>
              <span className="mt-0.5 text-[11px] text-muted-foreground">
                New single out now
              </span>
            </div>
            <Music className="mr-1 h-4 w-4 text-muted-foreground" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function StatsSection() {
  return (
    <motion.section
      className="border-b border-border/40 bg-gradient-to-b from-background via-background to-background/95 py-24 sm:py-28"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-6 lg:flex-row lg:items-center lg:justify-between lg:px-10">
        <div className="max-w-md space-y-3">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
            Social proof
          </p>
          <h2 className="text-3xl font-semibold tracking-[-0.045em] text-foreground sm:text-4xl leading-[1.25]">
            The only link you need for everywhere you are online.
          </h2>
        </div>

        <div className="grid w-full gap-6 sm:grid-cols-3 lg:max-w-2xl">
          {stats.map((stat) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-col gap-2 rounded-2xl bg-card/80 px-5 py-5 shadow-lg shadow-slate-900/5 ring-1 ring-border/70 backdrop-blur"
            >
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                <stat.icon className="h-4 w-4" />
                <span>{stat.label}</span>
              </div>
              <div className="text-2xl font-semibold tracking-tight text-foreground">
                {stat.value}
              </div>
              <div className="text-xs text-muted-foreground">{stat.helper}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function FeaturesSection() {
  return (
    <section id="features">
      {featureSections.map((section, index) => {
        const isReversed = index % 2 === 1;
        return (
          <motion.section
            key={section.id}
            id={section.id}
            className={`${section.backgroundClass} border-t border-border/30`}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="mx-auto grid max-w-7xl items-center gap-14 px-6 py-24 lg:grid-cols-2 lg:px-10 lg:py-28">
              <div
                className={`${
                  isReversed ? "lg:order-2" : "lg:order-1"
                } space-y-5`}
              >
                <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-800/80 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-slate-900" />
                  <span>{section.label}</span>
                </div>
                <h2
                  className={`text-3xl font-semibold sm:text-4xl leading-[1.24] tracking-[-0.05em] ${section.accentClass}`}
                >
                  {section.title}
                </h2>
                <p className="max-w-xl text-[0.98rem] text-slate-800/80 sm:text-base md:text-lg leading-[1.78]">
                  {section.description}
                </p>
                <ul className="mt-4 space-y-2.5 text-sm text-slate-800/80 leading-[1.75]">
                  {section.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-start gap-2">
                      <Check className="mt-[2px] h-4 w-4 flex-shrink-0 text-slate-900" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
                <div className="relative mx-auto max-w-md rounded-[2rem] bg-white/80 p-1 shadow-[0_24px_70px_rgba(15,23,42,0.17)] ring-1 ring-white/70 backdrop-blur-xl">
                  <div className="flex items-center justify-between rounded-2xl bg-slate-950 px-5 py-4 text-white">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900/80">
                        <section.icon className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-sm font-semibold">OpenLink</div>
                        <div className="text-xs text-slate-300">Preview</div>
                      </div>
                    </div>
                    <Button className="hidden rounded-full bg-gradient-to-r from-[#d3ff4a] via-white to-[#d3ff4a] px-4 py-1.5 text-xs font-semibold text-slate-900 shadow-md shadow-lime-500/40 transition-transform duration-200 ease-out hover:scale-[1.04] sm:inline-flex">
                      Try it now
                    </Button>
                  </div>

                  <div className="space-y-3 p-4">
                    <div className="h-10 rounded-xl bg-gradient-to-r from-slate-100 via-slate-50 to-slate-100" />
                    <div className="grid grid-cols-2 gap-3">
                      <div className="h-24 rounded-xl bg-slate-100/90 shadow-sm" />
                      <div className="h-24 rounded-xl bg-slate-100/70 shadow-sm" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="h-16 rounded-xl bg-slate-100/80 shadow-sm" />
                      <div className="h-16 rounded-xl bg-slate-100 shadow-sm" />
                      <div className="h-16 rounded-xl bg-slate-100/80 shadow-sm" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </section>
  );
}

function SocialProofSection() {
  return (
    <>
      <motion.section
        id="social-proof"
        className="bg-gradient-to-b from-background via-background to-background py-24 md:py-28 border-t border-border/40"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="mb-12 space-y-4 text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Creators
            </p>
            <h2 className="text-3xl font-semibold tracking-[-0.045em] sm:text-4xl leading-[1.24]">
              Loved by creators of every size.
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base leading-[1.78] text-muted-foreground">
              From first-time streamers to established brands, OpenLink makes it
              easy to share everything you are in one simple place.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                className="flex flex-col rounded-2xl bg-card/85 p-7 shadow-lg shadow-slate-900/5 ring-1 ring-border/70 backdrop-blur"
              >
                <div className="flex gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, starIndex) => (
                    <Star
                      key={starIndex}
                      className="h-4 w-4 fill-current text-amber-500"
                    />
                  ))}
                </div>
                <p className="mt-4 text-sm leading-[1.8] text-muted-foreground">
                  &quot;OpenLink gives me a single, beautiful place to send my
                  audience—my music, videos, shop, and newsletter all live
                  together now.&quot;
                </p>
                <div className="mt-6 flex items-center gap-3 border-t border-border/60 pt-4">
                  <div className="h-10 w-10 rounded-full bg-primary/20" />
                  <div>
                    <div className="text-sm font-semibold text-foreground">
                      Creator Name
                    </div>
                    <div className="text-xs text-muted-foreground">@handle</div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      <section
        id="learn"
        className="bg-[#2f022f] bg-[radial-gradient(circle_at_top,rgba(251,113,133,0.28),transparent_55%),radial-gradient(circle_at_bottom,rgba(244,114,182,0.35),transparent_55%)] py-24 text-pink-100"
      >
        <div className="mx-auto max-w-4xl px-6 lg:px-10">
          <h2 className="mb-12 text-center text-3xl font-semibold tracking-[-0.045em] sm:text-4xl leading-[1.24]">
            Questions? Answered.
          </h2>
          <div className="space-y-4">
            {[
              "How long does it take to set up an OpenLink?",
              "Can I use my own domain?",
              "Does OpenLink work with my existing tools?",
              "Is there a free plan?",
            ].map((question) => (
              <details
                key={question}
                className="group rounded-2xl bg-[#520452]/90 px-5 py-4 text-sm shadow-[0_18px_50px_rgba(15,23,42,0.35)] ring-1 ring-pink-500/40 backdrop-blur"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                  <div className="flex items-center gap-3">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-pink-500/20 text-pink-300">
                      <MessageSquare className="h-3.5 w-3.5" />
                    </div>
                    <span className="font-medium">{question}</span>
                  </div>
                  <span className="text-xs font-semibold text-pink-200 transition-transform group-open:rotate-180">
                    ▼
                  </span>
                </summary>
                <p className="mt-3 pl-10 text-sm leading-[1.8] text-pink-100/80">
                  OpenLink is designed to be simple—most people publish in under
                  five minutes. You can customize as much or as little as you
                  like, and update your page any time.
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function BottomCTASection() {
  return (
    <section id="cta" className="bg-background py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.97, y: 12 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative overflow-hidden rounded-[2.75rem] bg-gradient-to-br from-[#d3ff4a] via-[#f5ffe6] to-[#ffe6ff] px-8 py-14 shadow-[0_28px_90px_rgba(15,23,42,0.45)] sm:px-14 sm:py-18"
        >
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,#ffffff88,transparent_55%),radial-gradient(circle_at_bottom_right,#a5b4fc99,transparent_55%)]" />
          <div className="relative space-y-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-[-0.05em] text-slate-900 sm:text-4xl md:text-5xl leading-[1.22]">
              The fast, friendly way to share everything you are.
            </h2>
            <p className="mx-auto max-w-2xl text-sm sm:text-base md:text-lg leading-[1.78] text-slate-900/80">
              Claim your OpenLink, add your content, and share one simple link
              in your bio, emails, and everywhere your audience discovers you.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
              <Link href="/login">
                <Button className="w-full rounded-full bg-gradient-to-r from-slate-900 via-slate-900 to-slate-700 px-8 py-3 text-sm font-semibold text-[#d3ff4a] shadow-xl shadow-slate-900/50 transition-transform duration-200 ease-out hover:scale-[1.04] sm:w-auto">
                  Get started free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Link
                href="#hero"
                className="text-sm font-semibold text-slate-900 underline-offset-4 hover:underline"
              >
                Explore how it works
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-gradient-to-t from-background via-background to-background/95">
      <div className="mx-auto max-w-7xl space-y-10 px-6 py-16 lg:px-10">
        <div className="grid gap-10 md:grid-cols-[1.5fr_repeat(3,minmax(0,1fr))]">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Globe className="h-4 w-4" />
              </div>
              <span className="text-lg font-semibold tracking-[-0.04em]">
                OpenLink
              </span>
            </div>
            <p className="max-w-xs text-sm text-muted-foreground">
              Bring everything you are into one simple, beautiful link in bio
              that grows with you as your audience grows.
            </p>
          </div>

          <FooterColumn
            title="Product"
            links={["Overview", "Templates", "Analytics", "Pricing"]}
          />
          <FooterColumn
            title="Company"
            links={["About", "Blog", "Press", "Careers"]}
          />
          <FooterColumn
            title="Support"
            links={["Help center", "Contact", "Status", "Guides"]}
          />
        </div>

        <div className="flex flex-col gap-4 border-t border-border/40 pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <div>© {new Date().getFullYear()} OpenLink. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Twitter
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Instagram
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              YouTube
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: FooterColumnProps) {
  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
      <ul className="space-y-2 text-sm text-muted-foreground">
        {links.map((link) => (
          <li key={link}>
            <Link
              href="#"
              className="hover:text-foreground transition-colors"
            >
              {link}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

