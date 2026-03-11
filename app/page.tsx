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
  MessageSquare,
  Star,
  Twitter,
  Instagram,
  Youtube,
  Users,
  ChevronDown,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

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
    title: "Create and customize your Linktree in minutes",
    description:
      "Connect your TikTok, Instagram, Twitter, website, store, videos, music, podcast, events and more. It all comes together in a link in bio landing page designed to convert.",
    bullets: [
      "Bring your brand to life with custom colors and fonts",
      "Upload your own logo or profile picture",
      "Get started with a pre-designed template",
    ],
    backgroundClass: "bg-[#2563eb]",
    accentClass: "text-[#d3ff4a]",
    icon: Palette,
  },
  {
    id: "analytics",
    label: "Analytics",
    title: "Share your Linktree from your Instagram, TikTok, Twitter and other bios",
    description:
      "Add your unique Linktree URL to all the platforms and places you find your audience. Then use your QR code to drive your offline traffic online.",
    bullets: [
      "Share your Linktree anywhere",
      "Embed it on your website or blog",
      "Add it to your email signature",
    ],
    backgroundClass: "bg-[#7e1423]",
    accentClass: "text-[#e9c0e9]",
    icon: Layout,
  },
  {
    id: "customize",
    label: "Design",
    title: "Analyze your audience and keep your followers engaged",
    description:
      "Track your engagement over time, monitor revenue and learn what's converting your audience. Make informed updates on the fly to keep them coming back.",
    bullets: [
      "Track clicks and views for each link",
      "See where your audience is coming from",
      "Watch your subscriber list grow",
    ],
    backgroundClass: "bg-[#f3f6e8]",
    accentClass: "text-[#346618]",
    icon: BarChart3,
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
        <LogoCloudSection />
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
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="pointer-events-none fixed inset-x-0 top-6 z-50 flex justify-center"
    >
      <div className="pointer-events-auto mx-auto flex h-[76px] w-[min(1200px,calc(100%-2rem))] items-center justify-between rounded-[38px] bg-white px-3 shadow-[0_8px_30px_rgb(0,0,0,0.08)]">
        {/* Logo / brand */}
        <div className="flex items-center pl-3">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0f172a] text-[#d3ff4a]">
              <Globe className="h-[20px] w-[20px]" strokeWidth={2.5} />
            </div>
            <span className="text-[1.25rem] font-bold tracking-[-0.03em] text-[#0f172a]">
              OpenLink
            </span>
          </Link>
        </div>

        {/* Center nav links */}
        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-10 text-[15px] font-semibold text-[#64748b] lg:flex">
          <Link href="#features" className="transition-colors hover:text-[#0f172a]">
            Features
          </Link>
          <Link href="#analytics" className="transition-colors hover:text-[#0f172a]">
            Analytics
          </Link>
          <Link href="#monetize" className="transition-colors hover:text-[#0f172a]">
            Monetization
          </Link>
          <Link href="#learn" className="transition-colors hover:text-[#0f172a]">
            Learn
          </Link>
        </nav>

        {/* CTAs */}
        <div className="flex items-center gap-2 pr-1">
          <Link
            href="/login"
            className="hidden items-center justify-center rounded-full bg-[#f1f5f9] px-6 py-3.5 text-[15px] font-bold text-[#475569] transition-colors hover:bg-[#e2e8f0] hover:text-[#0f172a] md:flex"
          >
            Log in
          </Link>
          <Link href="/login">
            <Button className="flex h-auto items-center justify-center rounded-full bg-[#0f172a] px-6 py-3.5 text-[15px] font-bold text-[#d3ff4a] transition-transform hover:scale-105 hover:bg-[#0f172a]">
              Sign up free
            </Button>
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
function HeroSection() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-[#d3ff4a]"
    >
      <div className="relative mx-auto grid max-w-7xl items-center gap-16 px-6 py-24 md:py-28 lg:grid-cols-[1.1fr_1fr] lg:px-10 lg:py-32 xl:py-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="space-y-8"
        >
          <h1 className="font-extrabold text-[#254f1a] text-[clamp(3.5rem,6.5vw,5.5rem)] leading-[1.05] tracking-[-0.04em]">
            Everything you
            <br />
            are. In one,
            <br />
            simple link in bio.
          </h1>

          <p className="max-w-xl text-[1.05rem] text-[#254f1a] sm:text-lg md:text-xl font-semibold leading-[1.5]">
            Join 50M+ people using Linktree for their link in bio. One link to help you share everything you create, curate and sell from your Instagram, TikTok, Twitter, YouTube and other social media profiles.
          </p>
          <div className="w-full max-w-lg space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
              <div className="flex-1 rounded-xl bg-white px-4 py-3 sm:py-4 shadow-sm ring-1 ring-black/5">
                <div className="flex items-center gap-1">
                  <span className="text-base font-semibold text-slate-400">
                    linktr.ee/
                  </span>
                  <input
                    type="text"
                    placeholder="yourname"
                    className="w-full bg-transparent text-base font-semibold text-slate-900 placeholder:text-slate-300 outline-none"
                  />
                </div>
              </div>
              <Link href="/login" className="w-full sm:w-auto">
                <Button className="w-full rounded-full bg-[#E9C0E9] px-8 py-6 text-base font-semibold text-slate-900 transition-transform duration-200 ease-out hover:scale-[1.02] hover:bg-[#d8a8d8]">
                  Claim your Linktree
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-[500px]"
        >
          {/* Staggered Image Grid from Reference */}
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
             <div className="space-y-4 pt-12">
               <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-black/10">
                 <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Creator 1" className="h-full w-full object-cover" />
               </div>
               <div className="aspect-square overflow-hidden rounded-3xl bg-black/10">
                 <img src="https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=400" alt="Creator 2" className="h-full w-full object-cover" />
               </div>
             </div>
             <div className="space-y-4">
               <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-black/10">
                 <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" alt="Creator 3" className="h-full w-full object-cover" />
               </div>
               <div className="aspect-[3/4] overflow-hidden rounded-3xl bg-black/10">
                 <img src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=400" alt="Creator 4" className="h-full w-full object-cover" />
               </div>
             </div>
             <div className="space-y-4 pt-8 hidden md:block">
               <div className="aspect-square overflow-hidden rounded-3xl bg-black/10">
                 <img src="https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=400" alt="Creator 5" className="h-full w-full object-cover" />
               </div>
               <div className="aspect-[4/5] overflow-hidden rounded-3xl bg-black/10">
                 <img src="https://images.unsplash.com/photo-1488161628813-04466f872e42?auto=format&fit=crop&q=80&w=400" alt="Creator 6" className="h-full w-full object-cover" />
               </div>
             </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function LogoCloudSection() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-white py-16 sm:py-24 border-b border-slate-100"
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl text-[32px]">
          The only link in bio trusted by 50M+ people
        </h2>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8 sm:gap-x-16 lg:gap-x-24">
          <div className="text-2xl font-bold text-slate-300 uppercase tracking-wider">Tik Tok</div>
          <div className="text-2xl font-bold text-slate-300 uppercase tracking-wider">HBO</div>
          <div className="text-2xl font-bold text-slate-300 uppercase tracking-wider">Comedy Central</div>
          <div className="text-2xl font-bold text-slate-300 uppercase tracking-wider">Clippers</div>
          <div className="text-2xl font-bold text-slate-300 uppercase tracking-wider">Barstool Sports</div>
          <div className="text-2xl font-bold text-slate-300 uppercase tracking-wider">GQ</div>
        </div>
      </div>
    </motion.section>
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
                <p className={`max-w-xl text-[1.1rem] sm:text-lg md:text-xl font-medium leading-[1.5] ${index === 2 ? 'text-[#346618]' : 'text-[#e9c0e9]'}`}>
                  {section.description}
                </p>
                <div className="pt-6">
                  <Button className={`rounded-[2rem] px-8 py-6 text-base font-semibold transition-transform duration-200 ease-out hover:scale-[1.02] ${
                    index === 0 ? 'bg-[#E9C0E9] text-slate-900 hover:bg-[#d8a8d8]' :
                    index === 1 ? 'bg-[#E9C0E9] text-slate-900 hover:bg-[#d8a8d8]' :
                    'bg-[#E9C0E9] text-slate-900 hover:bg-[#d8a8d8]'
                  }`}>
                    Get started for free
                  </Button>
                </div>
              </div>

              <div className={isReversed ? "lg:order-1" : "lg:order-2"}>
                <div className="relative mx-auto w-full max-w-[500px] aspect-[4/5] md:aspect-square rounded-[2.5rem] overflow-hidden bg-black/10 shadow-2xl">
                  {index === 0 && (
                     <img src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop" alt="Customize Linktree UI" className="w-full h-full object-cover" />
                  )}
                  {index === 1 && (
                     <img src="https://images.unsplash.com/photo-1616469829941-c7200edec809?q=80&w=2070&auto=format&fit=crop" alt="Share Linktree everywhere" className="w-full h-full object-cover" />
                  )}
                  {index === 2 && (
                     <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Analyze audience" className="w-full h-full object-cover" />
                  )}
                </div>
              </div>
            </div>
          </motion.section>
        );
      })}
    </section>
  );
}

function FeatureCardsGrid() {
  const container: Variants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 30, scale: 0.98 },
    show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.6, ease: "easeOut" } }
  };

  return (
    <section className="bg-white py-12 md:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto max-w-7xl px-6 lg:px-10 space-y-6"
      >
        {/* Top row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.5fr_1fr] gap-6">
          {/* Pink card */}
          <motion.div variants={item} className="bg-[#E9C0E9] rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden relative">
            <h3 className="text-[#52225e] text-3xl md:text-4xl font-bold leading-tight z-10">
              Share every type of content in a single link.
            </h3>
            {/* Visual element placeholder representing the mockups in the card */}
            <div className="mt-8 relative h-48 w-full z-10 bg-white/40 rounded-2xl border-4 border-[#52225e] flex items-center justify-center -mb-20">
              <span className="text-[#52225e] font-bold">Content Blocks UI</span>
            </div>
          </motion.div>
          {/* Blue card */}
          <motion.div variants={item} className="bg-[#2563eb] rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            <h3 className="text-white text-3xl md:text-4xl font-bold leading-tight">
              Grow, own and engage your audience.
            </h3>
            {/* Visual element placeholder */}
            <div className="mt-8 relative h-32 w-full bg-white/10 rounded-2xl flex items-center justify-center">
               <span className="text-white font-bold text-sm">Integrations UI (Mailchimp, Spotify, etc.)</span>
            </div>
          </motion.div>
        </div>
        
        {/* Bottom row */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1fr_1.5fr] gap-6">
          {/* Yellow card */}
          <motion.div variants={item} className="bg-[#d3ff4a] rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden">
             <h3 className="text-[#254f1a] text-3xl md:text-4xl font-bold leading-tight">
              Sell products, collect payments and monetise.
            </h3>
            <div className="mt-8 relative h-32 w-full bg-[#254f1a]/10 rounded-2xl flex items-center justify-center">
               <span className="text-[#254f1a] font-bold text-sm">Monetization UI</span>
            </div>
          </motion.div>
           {/* Gray/White detailed card */}
          <motion.div variants={item} className="bg-[#f3f4f6] rounded-3xl p-8 md:p-12 flex flex-col justify-between overflow-hidden">
            <h3 className="text-slate-900 text-3xl md:text-4xl font-bold leading-tight text-center">
              The only link in bio trusted by 50M+ people
            </h3>
            <div className="mt-8 text-center">
              <Link href="/login">
                <Button className="rounded-full bg-[#E9C0E9] px-8 py-6 text-base font-semibold text-slate-900 transition-transform duration-200 ease-out hover:scale-[1.02] hover:bg-[#d8a8d8]">
                  Get started for free
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function PressLogosSection() {
  const container: Variants = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut", staggerChildren: 0.1 }
    }
  };

  const item: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    show: { opacity: 1, scale: 1, transition: { duration: 0.4 } }
  };

  return (
    <section className="bg-white py-12 md:py-24">
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.5 }}
        className="mx-auto max-w-7xl px-6 lg:px-10"
      >
        <h2 className="text-center text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl mb-12">
          As featured in...
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6">
          <motion.div variants={item} className="bg-[#f3f4f6] px-8 py-4 rounded-full text-slate-800 font-bold uppercase tracking-wider">TC</motion.div>
          <motion.div variants={item} className="bg-[#f3f4f6] px-8 py-4 rounded-full text-slate-800 font-bold uppercase tracking-wider">GQ</motion.div>
          <motion.div variants={item} className="bg-[#f3f4f6] px-8 py-4 rounded-full text-slate-800 font-bold uppercase tracking-wider">Forbes</motion.div>
          <motion.div variants={item} className="bg-[#f3f4f6] px-8 py-4 rounded-full text-slate-800 font-bold uppercase tracking-wider">Mashable</motion.div>
          <motion.div variants={item} className="bg-[#f3f4f6] px-8 py-4 rounded-full text-slate-800 font-bold uppercase tracking-wider">TechCrunch</motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function SocialProofSection() {
  return (
    <>
      <FeatureCardsGrid />
      <PressLogosSection />
      <motion.section
        id="social-proof"
        className="bg-white py-24 md:py-32 border-t border-slate-100"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-7xl px-6 lg:px-10">
          <div className="bg-[#0b5c46] rounded-[2.5rem] p-8 md:p-16 lg:p-20 relative overflow-hidden flex flex-col items-center text-center">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#14785b] rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#0a4837] rounded-full blur-3xl opacity-50 translate-y-1/3 -translate-x-1/3"></div>
            
            <div className="relative z-10 max-w-4xl mx-auto space-y-8 md:space-y-12">
               <h2 className="text-[#d3ff4a] text-3xl md:text-5xl lg:text-6xl font-extrabold leading-[1.15] tracking-tight">
                "Linktree simplifies the process for creators to share multiple parts of themselves in one inclusive link."
               </h2>
               <div className="flex flex-col items-center gap-4">
                 <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#d3ff4a]/20">
                   <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400" alt="Riley Lemon" className="w-full h-full object-cover" />
                 </div>
                 <div className="text-white space-y-1">
                   <div className="text-xl font-bold">Riley Lemon</div>
                   <div className="text-white/70 text-base">YouTuber, Content Creator</div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </motion.section>

      <motion.section
        id="learn"
        className="bg-[#780016] py-24 md:py-32"
        initial={{ opacity: 0, y: 32 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="mb-14 text-center text-[2.5rem] font-extrabold tracking-tight sm:text-[3.5rem] text-[#e9c0e9]">
            Questions? Answered
          </h2>
          <div className="space-y-4">
            {[
              "Why should podcasters use Linktree?",
              "Is Linktree the original link in bio tool?",
              "Can you get paid and sell things from a Linktree?",
              "Is Linktree safe to use on all of my social media profiles?",
              "What makes Linktree better than the other link in bio options?",
              "How can I drive more traffic to and through my Linktree?",
            ].map((question) => (
              <details
                key={question}
                className="group rounded-3xl bg-[#590412] text-[#e9c0e9] transition-all"
              >
                <summary className="flex cursor-pointer items-center justify-between gap-3 list-none px-6 py-6 sm:px-8 sm:py-7">
                  <span className="text-[1.05rem] font-semibold">{question}</span>
                  <ChevronDown className="h-5 w-5 transition-transform duration-300 group-open:rotate-180" strokeWidth={2.5} />
                </summary>
                <p className="px-6 pb-6 pt-0 sm:px-8 sm:pb-8 pr-10 text-base leading-relaxed text-[#e9c0e9]/80 font-medium">
                  OpenLink is designed to be simple—most people publish in under
                  five minutes. You can customize as much or as little as you
                  like, and update your page any time.
                </p>
              </details>
            ))}
          </div>
        </div>
      </motion.section>
    </>
  );
}

function BottomCTASection() {
  return (
    <section id="cta" className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-6 lg:px-10">
        <motion.div
           initial={{ opacity: 0, scale: 0.97, y: 12 }}
           whileInView={{ opacity: 1, scale: 1, y: 0 }}
           viewport={{ once: true, amount: 0.3 }}
           transition={{ duration: 0.6, ease: "easeOut" }}
           className="relative overflow-hidden rounded-[2.5rem] bg-[#52225e] px-8 py-16 sm:px-14 sm:py-20 flex flex-col items-center justify-center text-center shadow-2xl"
         >
           <h2 className="text-[#e9c0e9] text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl leading-[1.15] max-w-2xl mb-10">
             Jumpstart your corner of the internet today
           </h2>
           <div className="w-full max-w-lg space-y-5 relative mt-4">
             <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
               <div className="flex-1 rounded-full bg-white px-5 py-4 shadow-sm ring-1 ring-black/5">
                 <div className="flex items-center gap-1">
                   <span className="text-base font-semibold text-slate-400">
                     linktr.ee/
                   </span>
                   <input
                     type="text"
                     placeholder="yourname"
                     className="w-full bg-transparent text-base font-semibold text-slate-900 placeholder:text-slate-300 outline-none"
                   />
                 </div>
               </div>
               <Link href="/login" className="w-full sm:w-auto shrink-0 -ml-12 sm:-ml-10 z-10">
                 <Button className="w-full rounded-full bg-[#E9C0E9] px-8 py-7 text-lg font-semibold text-slate-900 transition-transform duration-200 ease-out hover:scale-[1.02] hover:bg-[#d8a8d8]">
                   Claim your Linktree
                 </Button>
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
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="bg-white rounded-[2.5rem] mx-6 mb-6 px-10 py-16 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100"
    >
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between mb-16 gap-10">
          <div className="flex items-center gap-4 hidden md:flex">
             <Link href="/login" className="px-6 py-2 rounded-full border border-slate-200 hover:bg-slate-50 font-semibold text-slate-800 transition-colors">Log in</Link>
             <Link href="/login" className="px-6 py-2 rounded-full border border-slate-200 hover:bg-slate-50 font-semibold text-slate-800 transition-colors">Get started for free</Link>
          </div>
          <div className="block md:hidden">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-[#d3ff4a]">
                <Globe className="h-4 w-4" />
              </div>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                OpenLink
              </span>
            </div>
          </div>

          <div className="flex gap-14 flex-wrap md:flex-nowrap">
             <FooterColumn
              title="Company"
               links={["The Linktree Blog", "Engineering Blog", "Developer Portal", "Linktree for Enterprise", "Careers", "About", "Press", "Social Good", "Contact"]}
             />
             <FooterColumn
               title="Community"
               links={["Linktree for Enterprise", "Charities", "Creators", "Link in Bio", "What is a URL", "Link in bio Instagram", "Link in bio TikTok", "Link in bio YouTube"]}
             />
             <FooterColumn
               title="Support"
               links={["Help Topics", "Getting Started", "Linktree PRO", "Features & How-Tos", "Trust & Safety"]}
             />
             <FooterColumn
               title="Trust & Legal"
               links={["Terms & Conditions", "Privacy Notice", "Privacy Notice (Brazil)", "Privacy Notice (US)", "Cookie Notice", "Trust Center", "Cookie Preferences"]}
             />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between pt-10 border-t border-slate-200">
          <div className="flex items-center gap-4 mb-6 md:mb-0">
            <div className="w-32 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">App Store</div>
            <div className="w-32 h-10 bg-slate-900 rounded-lg flex items-center justify-center text-white">Google Play</div>
          </div>
          
          <div className="flex items-center justify-center w-full">
            <div className="hidden md:flex items-center gap-3 mx-auto">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black text-[#d3ff4a]">
                  <Globe className="h-5 w-5" />
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  OpenLink
                </span>
            </div>
          </div>

          <div className="flex items-center gap-6 mt-6 md:mt-0">
             <div className="flex gap-4">
                <div className="w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center"><Twitter className="h-4 w-4 text-slate-800"/></div>
                <div className="w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center"><Instagram className="h-4 w-4 text-slate-800"/></div>
                <div className="w-8 h-8 rounded-full bg-slate-100/80 flex items-center justify-center"><Youtube className="h-4 w-4 text-slate-800"/></div>
             </div>
             <p className="text-sm font-semibold text-slate-800">© 2025 OpenLink</p>
          </div>
        </div>
      </div>
    </motion.footer>
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

