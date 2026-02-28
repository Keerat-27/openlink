# OpenLink

A **link-in-bio** platform. Create a single, customizable page for all your important links—like Linktree—with your own username, appearance, and optional analytics.

## What it does

- **Public profile** — Each user gets a page at `yoursite.com/[username]` with avatar, bio, and a list of links.
- **Custom appearance** — Background color, theme color, and button style (solid, outline, rounded).
- **Link management** — Add, edit, reorder (drag-and-drop), and toggle links from an admin dashboard.
- **Auth & storage** — Sign in with Supabase; optional avatar uploads via Supabase Storage.

## Prerequisites

- **Node.js** 18+
- **Supabase** account ([supabase.com](https://supabase.com))

## Setup

### 1. Clone and install

```bash
git clone <your-repo-url>
cd Openlink
npm install
```

### 2. Environment variables

Create a `.env.local` in the project root with:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous (public) key |
| `NEXT_PUBLIC_SITE_URL` | App URL (e.g. `http://localhost:3000` for dev) |

Get the Supabase values from **Project Settings → API** in the Supabase dashboard.

### 3. Supabase project setup

- Create a Supabase project and add the **Auth** and **Database** setup your app expects (e.g. `profiles`, `links` tables and RLS).
- For avatar uploads, run the SQL in **`lib/supabase/create_storage.sql`** in the Supabase SQL Editor (creates the `avatars` bucket and policies).

### 4. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You’ll see the landing page; use **Get Started** to sign in and reach the admin area.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Build for production |
| `npm run start` | Run the production build |
| `npm run lint` | Run ESLint |

## Project structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router: home, login, `[username]` (public profile), `admin/` (dashboard, appearance) |
| `components/` | UI: `links-manager`, `appearance-editor`, `ui/` (shadcn) |
| `lib/supabase/` | Supabase client (server, client, middleware) and SQL for storage |

## Tech stack

- **Next.js 16** (App Router)
- **Supabase** (auth, database, optional storage)
- **Tailwind CSS**, **Radix UI**, **shadcn/ui**
- **@dnd-kit** for drag-and-drop link reordering

## Deploy

You can deploy the Next.js app to [Vercel](https://vercel.com) or any Node-compatible host. Set the same env vars in the platform’s dashboard and ensure `NEXT_PUBLIC_SITE_URL` matches your production URL.

---

For more on Next.js: [Next.js docs](https://nextjs.org/docs) · [Learn Next.js](https://nextjs.org/learn)
