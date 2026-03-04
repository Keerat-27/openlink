"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Layout, Palette, Zap, BarChart3, Globe, Smartphone, Music, MapPin, Video, Check, X, Users, MessageSquare, Star } from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <div ref={containerRef} className="relative flex min-h-screen flex-col overflow-hidden bg-background font-sans selection:bg-primary/30">
      {/* Abstract Animated Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-0 right-1/4 h-[800px] w-[800px] rounded-full bg-primary/10 blur-[150px] animate-float" />
        <div className="absolute -bottom-40 -left-20 h-[600px] w-[600px] rounded-full bg-accent/10 blur-[150px] animate-float [animation-delay:3s]" />
      </div>

      {/* Navigation */}
      <header className="sticky top-0 z-50 glass border-b border-border/40">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-brand shadow-lg shadow-primary/20">
              <Globe className="h-5 w-5 text-white" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-foreground font-heading">
              OpenLink
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="hidden sm:block text-sm font-medium text-muted-foreground hover:text-foreground transition-colors">
              Log in
            </Link>
            <Link href="/login">
              <Button className="rounded-full bg-foreground text-background hover:bg-foreground/90 px-6 py-5 text-sm font-semibold transition-all">
                Claim your link
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 flex flex-1 flex-col items-center pt-24 pb-16 lg:pt-32 lg:pb-32 px-6">
        <div className="mx-auto w-full max-w-7xl grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Hero Content */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex flex-col items-start text-left space-y-8"
          >
            <div className="inline-flex items-center gap-2 rounded-full glass-strong px-4 py-2 text-sm text-primary font-medium border border-primary/20">
              <Sparkles className="h-4 w-4" />
              <span>The premium personal landing page</span>
            </div>
            
            <h1 className="text-5xl sm:text-7xl font-extrabold tracking-tight text-foreground font-heading leading-[1.05]">
              Your links deserve a <span className="text-gradient">premium home.</span>
            </h1>
            
            <p className="max-w-xl text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Stop looking like everyone else. Build a digital storefront that actually looks like you—set up in seconds, with zero transaction fees.
            </p>
            
            <div className="w-full max-w-md pt-4">
              <div className="relative flex items-center p-2 rounded-2xl glass-strong border border-border/50 shadow-2xl focus-within:ring-2 focus-within:ring-primary/50 transition-all">
                <span className="pl-4 pr-1 text-muted-foreground font-medium text-lg hidden sm:block">openlink.hq/</span>
                <span className="pl-4 pr-1 text-muted-foreground font-medium text-lg sm:hidden">/</span>
                <input 
                  type="text" 
                  placeholder="yourname"
                  className="flex-1 bg-transparent border-0 outline-none text-foreground text-lg placeholder:text-muted-foreground/50 py-3"
                />
                <Button className="rounded-xl bg-gradient-brand text-white hover:opacity-90 px-6 py-6 text-base font-bold transition-all shadow-lg shadow-primary/25">
                  Claim
                </Button>
              </div>
              <p className="text-sm text-muted-foreground mt-4 ml-2">It's free, and takes less than a minute.</p>
            </div>
          </motion.div>

          {/* Hero Interactive Mockup */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative lg:ml-auto w-full max-w-[400px] aspect-[1/2] rounded-[3rem] border-[8px] border-card bg-background shadow-2xl overflow-hidden glass-strong flex flex-col mx-auto"
          >
            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-32 h-6 bg-card rounded-full z-20"></div>
            
            {/* Mockup Profile Header */}
            <div className="pt-16 pb-6 px-6 relative z-10 flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-primary to-accent p-1 mb-4 shadow-lg">
                <div className="w-full h-full rounded-full bg-card overflow-hidden">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200" alt="Profile avatar" className="w-full h-full object-cover" />
                </div>
              </div>
              <h2 className="text-2xl font-bold font-heading">Sarah Mitchell</h2>
              <p className="text-muted-foreground text-sm mt-1">Digital Creator & Founder</p>
            </div>

            {/* Mockup Bento Grid */}
            <div className="flex-1 p-4 grid grid-cols-2 gap-3 overflow-y-auto no-scrollbar relative z-10">
              {/* Full width link */}
              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 bg-card rounded-2xl p-4 flex items-center justify-between border border-border/50 cursor-pointer shadow-sm hover:border-primary/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                    <Video className="w-5 h-5" />
                  </div>
                  <span className="font-semibold text-sm">Latest Masterclass</span>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground" />
              </motion.div>

              {/* Square block 1 */}
              <motion.div whileHover={{ scale: 1.05 }} className="bg-card rounded-2xl p-4 flex flex-col items-center justify-center text-center border border-border/50 cursor-pointer shadow-sm hover:border-accent/50 transition-colors aspect-square gap-2">
                <div className="w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center text-rose-500">
                  <Layout className="w-6 h-6" />
                </div>
                <span className="font-semibold text-sm">Portfolio</span>
              </motion.div>

              {/* Square block 2 */}
              <motion.div whileHover={{ scale: 1.05 }} className="bg-gradient-brand rounded-2xl p-4 flex flex-col items-center justify-center text-center text-white shadow-lg cursor-pointer aspect-square gap-2 relative overflow-hidden group">
                <span className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                <Globe className="w-6 h-6 relative z-10" />
                <span className="font-bold text-sm relative z-10">My Website</span>
              </motion.div>

              {/* Wide block */}
              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 bg-card rounded-2xl p-4 flex items-center gap-4 border border-border/50 cursor-pointer shadow-sm hover:border-primary/50 transition-colors">
                <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=100" className="w-12 h-12 rounded-xl object-cover" />
                <div className="flex flex-col flex-1 pl-1">
                  <span className="font-semibold text-sm">Listen on Spotify</span>
                  <span className="text-xs text-muted-foreground mt-0.5">New single out now</span>
                </div>
                <Music className="w-4 h-4 text-muted-foreground mr-2" />
              </motion.div>
            </div>
            
            {/* Soft gradient fade at bottom of phone */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent z-20 pointer-events-none"></div>
          </motion.div>
        </div>

        {/* The Problem Section */}
        <div className="w-full max-w-7xl mt-48 mb-24 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="space-y-6 max-w-3xl"
          >
            <h2 className="text-4xl sm:text-5xl font-bold font-heading">
              The generic green wall is over.
            </h2>
            <p className="text-xl text-muted-foreground">
              Linktree was built for 2018. If your brand is premium, your link-in-bio shouldn't look like a commodity.
            </p>
          </motion.div>
          
          <div className="mt-16 grid lg:grid-cols-2 gap-8 w-full">
            {/* The Old Way */}
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass rounded-3xl p-8 flex flex-col items-center grayscale opacity-60 border-dashed border-2"
            >
              <div className="bg-emerald-50 text-emerald-900 rounded-full px-4 py-1.5 text-xs font-bold mb-8 tracking-widest uppercase">The Old Way</div>
              <div className="w-20 h-20 rounded-full bg-gray-200 mb-6"></div>
              <div className="w-32 h-4 bg-gray-200 rounded mb-8"></div>
              
              <div className="w-full max-w-sm space-y-4">
                {[1,2,3,4].map(i => (
                  <div key={i} className="w-full h-14 border border-gray-300 rounded-lg flex items-center justify-center">
                    <div className="w-24 h-3 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* The New Way */}
            <motion.div 
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="glass-strong rounded-3xl p-8 flex flex-col items-center relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 blur-[80px] rounded-full"></div>
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/20 blur-[80px] rounded-full"></div>
              
              <div className="bg-gradient-brand text-white rounded-full px-4 py-1.5 text-xs font-bold mb-8 tracking-widest uppercase shadow-lg z-10">OpenLink Bento Grid</div>
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-primary to-accent mb-6 z-10 p-1 shadow-lg">
                <div className="w-full h-full bg-card rounded-full"></div>
              </div>
              <div className="w-32 h-5 bg-foreground/90 rounded mb-8 z-10"></div>
              
              <div className="w-full max-w-sm grid grid-cols-2 gap-4 z-10">
                <div className="col-span-2 h-16 glass rounded-2xl flex items-center px-4 hover-lift">
                  <div className="w-8 h-8 rounded-full bg-primary/20"></div>
                  <div className="ml-4 w-32 h-3 bg-foreground/80 rounded"></div>
                </div>
                <div className="col-span-1 aspect-square glass rounded-2xl flex flex-col items-center justify-center group hover-lift border-primary/20">
                  <div className="w-12 h-12 rounded-full bg-gradient-brand flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                </div>
                <div className="col-span-1 h-full glass rounded-2xl p-4 flex flex-col justify-end relative overflow-hidden hover-lift">
                  <img src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&q=80&w=200" className="absolute inset-0 w-full h-full object-cover opacity-50" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                  <div className="w-20 h-3 bg-white rounded relative z-10"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Feature Differentiation */}
        <div className="w-full max-w-7xl mt-24 mb-32 space-y-16">
          <div className="text-center max-w-2xl mx-auto space-y-4">
            <h2 className="text-4xl font-bold font-heading">More than just links.</h2>
            <p className="text-muted-foreground text-lg">Rich embeddable blocks for a seamless experience right on your page.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div whileHover={{ y: -5 }} className="glass-strong rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all text-primary">
                <Palette className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2 relative z-10">Unlimited Themes</h3>
              <p className="text-muted-foreground relative z-10">Design it exactly how you want. Solid colors, glassmorphic blurs, dynamic mesh gradients, or full video backgrounds.</p>
            </motion.div>
            
            <motion.div whileHover={{ y: -5 }} className="glass-strong rounded-3xl p-8 relative overflow-hidden group border-primary/20">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all text-accent">
                <BarChart3 className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2 relative z-10">Pro Analytics</h3>
              <p className="text-muted-foreground relative z-10">Real-time click tracking, geolocation data, and referral sources—all included natively without third-party integrations.</p>
            </motion.div>

            <motion.div whileHover={{ y: -5 }} className="glass-strong rounded-3xl p-8 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-6 opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all text-emerald-500">
                <Zap className="w-12 h-12" />
              </div>
              <h3 className="text-2xl font-bold font-heading mb-2 relative z-10">0% Transaction Fees</h3>
              <p className="text-muted-foreground relative z-10">Keep 100% of what you earn. Monetize your audience directly through storefront blocks with no platform tax.</p>
            </motion.div>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="w-full max-w-5xl mt-24">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl font-bold font-heading">Why switch to OpenLink?</h2>
            <p className="text-muted-foreground text-lg">Stop paying for basic features that should be free.</p>
          </div>
          
          <div className="glass-strong rounded-3xl overflow-hidden border border-border/50">
            <div className="grid grid-cols-3 bg-card/50 p-6 border-b border-border/50 text-center">
              <div className="text-left font-semibold text-muted-foreground">Features</div>
              <div className="font-bold text-foreground">OpenLink</div>
              <div className="font-medium text-muted-foreground">Linktree PRO</div>
            </div>
            
            {[
              { feature: "Custom Themes & Layouts", us: true, them: false },
              { feature: "0% Transaction Fees", us: true, them: false },
              { feature: "Bento Grid Layout", us: true, them: false },
              { feature: "Advanced Analytics", us: true, them: true },
              { feature: "Custom Domain", us: true, them: true },
              { feature: "Video Backgrounds", us: true, them: false },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-3 p-6 border-b border-border/10 text-center hover:bg-card/50 transition-colors">
                <div className="text-left font-medium">{row.feature}</div>
                <div className="flex justify-center">
                  {row.us ? <Check className="w-6 h-6 text-primary" /> : <X className="w-6 h-6 text-muted-foreground/50" />}
                </div>
                <div className="flex justify-center">
                  {row.them ? <Check className="w-6 h-6 text-muted-foreground/80" /> : <X className="w-6 h-6 text-muted-foreground/50" />}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Proof */}
        <div className="w-full mt-32 mb-16 overflow-hidden relative">
          <div className="absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>
          
          <div className="text-center space-y-4 mb-12 relative z-20">
            <h2 className="text-4xl font-bold font-heading">Loved by creators worldwide.</h2>
          </div>

          <div className="flex gap-6 w-max animate-shimmer" style={{ animationDuration: "30s" }}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="w-[350px] glass-strong rounded-2xl p-6 flex flex-col gap-4 border-primary/10">
                <div className="flex text-amber-500 gap-1">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-current" />)}
                </div>
                <p className="text-muted-foreground italic text-sm">
                  "Switching from Linktree to OpenLink was the best decision for my brand. My page actually looks like a premium website now, and the bento grid converts way better."
                </p>
                <div className="flex items-center gap-3 mt-auto pt-4 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-primary/20"></div>
                  <div>
                    <div className="font-semibold text-sm text-foreground">Creator Name</div>
                    <div className="text-xs text-muted-foreground">@creator_handle</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="w-full max-w-5xl mt-16 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="glass-strong border border-primary/30 rounded-[3rem] p-12 sm:p-20 relative overflow-hidden shadow-2xl shadow-primary/10"
          >
            <div className="absolute inset-0 bg-gradient-animated opacity-20"></div>
            
            <h2 className="text-4xl sm:text-6xl font-extrabold font-heading text-foreground relative z-10 mb-6">
              Ready to elevate your identity?
            </h2>
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto relative z-10">
              Join thousands of creators who have upgraded from generic lists to premium landing pages.
            </p>
            
            <Link href="/login" className="relative z-10">
              <Button className="rounded-2xl bg-foreground text-background hover:bg-foreground/90 px-10 py-8 text-lg font-bold transition-all shadow-xl hover:scale-105 group">
                Create Your Free Profile
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative border-t border-border/40 py-12 mt-16 bg-background/50 glass">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Globe className="h-4 w-4" />
            </div>
            <span className="text-xl font-bold font-heading">OpenLink</span>
          </div>
          
          <div className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} OpenLink. The premium Linktree alternative.
          </div>
          
          <div className="flex gap-6 text-sm font-medium text-muted-foreground">
            <Link href="#" className="hover:text-foreground transition-colors">Twitter</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Terms</Link>
            <Link href="#" className="hover:text-foreground transition-colors">Privacy</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
