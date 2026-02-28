# Project Plan: OpenLink (Linktree Alternative)

## 📌 Project Overview

We are building a "link-in-bio" platform where users can sign up, claim a unique username, create a list of links, customize their page appearance, and track click analytics.

## 🛠 Tech Stack (Optimized for AI/Vibe Coding)

- **Framework:** Next.js (App Router, TypeScript)
- **Styling:** Tailwind CSS + shadcn/ui (for rapid, accessible components)
- **Database & Auth:** Supabase (PostgreSQL, Magic Link / OAuth)
- **State Management:** React Hooks + Zustand (if needed for global state)
- **Drag & Drop:** `@dnd-kit/core` (for reordering links)
- **Deployment:** Vercel

---

## 🗄️ Database Schema Definition

_(Give this to the AI when setting up the database so it understands the data structure)_

1.  **`users`** (Handled via Supabase Auth)
2.  **`profiles`**
    - `id` (uuid, references auth.users)
    - `username` (text, unique, lowercase)
    - `display_name` (text)
    - `bio` (text)
    - `avatar_url` (text)
    - `theme_color` (text, hex code)
    - `bg_color` (text, hex code)
    - `button_style` (text: 'solid', 'outline', 'rounded')
3.  **`links`**
    - `id` (uuid)
    - `profile_id` (uuid, references profiles.id)
    - `title` (text)
    - `url` (text)
    - `order` (integer, for sorting)
    - `is_active` (boolean)
    - `icon` (text, optional)
4.  **`clicks`** (Analytics)
    - `id` (uuid)
    - `link_id` (uuid, references links.id)
    - `created_at` (timestamp)
    - `device_type` (text: 'mobile', 'desktop')

---

## 🚀 Execution Steps (Feed these phases to the AI sequentially)

### Phase 1: Foundation & Authentication

**Goal:** Initialize the project and allow users to sign up and log in.

- [ ] **Step 1.1:** Initialize a new Next.js project with TypeScript, Tailwind CSS, and App Router. Install `supabase-js`.
- [ ] **Step 1.2:** Set up Supabase environment variables (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`).
- [ ] **Step 1.3:** Create an authentication page (`/login`). Implement Supabase Auth (Email/Password or Google OAuth).
- [ ] **Step 1.4:** Create middleware (`middleware.ts`) to protect the `/admin` route. Unauthenticated users should be redirected to `/login`.
- **Definition of Done:** I can sign up, log in, log out, and cannot access `/admin` without being logged in.

### Phase 2: User Onboarding & Profile Setup

**Goal:** Ensure every user has a unique username before they can create links.

- [ ] **Step 2.1:** Create a Supabase SQL script to automatically create a `profile` row when a new user signs up (via database triggers) OR handle it on first login.
- [ ] **Step 2.2:** Create an onboarding screen (`/onboarding`) that prompts the user to pick a unique `username`.
- [ ] **Step 2.3:** Add a check: If a user accesses `/admin` but hasn't picked a username, redirect them to `/onboarding`.
- **Definition of Done:** Logged-in users have a confirmed `username` in the database.

### Phase 3: Admin Dashboard - Link Management (CRUD)

**Goal:** Build the interface where users add and manage their links.

- [ ] **Step 3.1:** Build the `/admin` layout with a sidebar (Links, Appearance, Analytics, Settings).
- [ ] **Step 3.2:** Build the "Links" page. Fetch and display existing links for the current user from Supabase.
- [ ] **Step 3.3:** Add an "Add Link" button. It should append a new, blank link card to the top of the list and save it to the DB.
- [ ] **Step 3.4:** Make the link cards editable. The user should be able to update the `title` and `url`. Auto-save changes on blur using server actions.
- [ ] **Step 3.5:** Add a toggle switch to make a link active/inactive. Add a delete button to remove a link.
- [ ] **Step 3.6:** (Bonus Vibe) Integrate `@dnd-kit` to allow drag-and-drop reordering of link cards. Update the `order` field in the database after dropping.
- **Definition of Done:** I can fully manage my links (Create, Read, Update, Delete, Reorder) in the dashboard.

### Phase 4: Admin Dashboard - Appearance Editor

**Goal:** Allow users to customize how their page looks.

- [ ] **Step 4.1:** Build the `/admin/appearance` page.
- [ ] **Step 4.2:** Add inputs for Profile Details: Profile Picture upload (save to Supabase Storage), Display Name, and Bio.
- [ ] **Step 4.3:** Add controls for Theming: A color picker for the background, a color picker for the buttons, and a selector for button styles (rounded, square, outline).
- [ ] **Step 4.4:** Build a "Mobile Preview" component that sits on the right side of the admin dashboard, showing a live preview of their public page.
- **Definition of Done:** I can change my avatar, bio, and colors, and see the changes in real-time in the preview.

### Phase 5: The Public Link Page

**Goal:** Build the actual page that visitors will see (e.g., `openlink.com/[username]`).

- [ ] **Step 5.1:** Create a dynamic route: `app/[username]/page.tsx`.
- [ ] **Step 5.2:** Fetch the user's profile and active links based on the `username` parameter in the URL. If the user doesn't exist, show a custom 404 page.
- [ ] **Step 5.3:** Render the public page applying the user's custom styling (background colors, button styles, avatar, bio).
- [ ] **Step 5.4:** Ensure only links where `is_active` is true are displayed, sorted by the `order` column.
- **Definition of Done:** Visiting `/ksk` shows my customized page with my active links.

### Phase 6: Analytics & Tracking

**Goal:** Track link clicks.

- [ ] **Step 6.1:** Modify the public page. Instead of `<a>` tags linking directly to the destination, route clicks through an API endpoint (e.g., `/api/click?linkId=123`).
- [ ] **Step 6.2:** In the API route, log a new row in the `clicks` table with the `link_id` and basic user agent info, then redirect the user to the actual URL.
- [ ] **Step 6.3:** Build the `/admin/analytics` page. Query the `clicks` table to show Total Clicks, and click counts per individual link.
- **Definition of Done:** Clicking a link on the public page increments a counter that I can see in the analytics dashboard.

### Phase 7: Polish & Launch

- [ ] **Step 7.1:** Add SEO metadata to the dynamic `[username]` route.
- [ ] **Step 7.2:** Audit for mobile responsiveness (Tailwind responsive classes).
- [ ] **Step 7.3:** Deploy to Vercel and test production database connections.

  ## 🎨 Frontend & UI Guidelines (System Rules)

  _(AI Agent: Strictly adhere to these design principles when writing frontend code)_
  1.  **Component Library:** Use `shadcn/ui` for all base components (buttons, inputs, dialogs, dropdowns). Do not build custom interactive primitives if a shadcn equivalent exists.
  2.  **Styling Engine:** Use Tailwind CSS exclusively. Do not use raw CSS files or inline styles.
  3.  **Aesthetics & Spacing:**
      - Use generous padding and margins to let the UI breathe (e.g., `p-6`, `gap-4`).
      - Use subtle, modern borders and shadows (e.g., `border border-gray-200`, `shadow-sm`).
      - Keep background colors soft (e.g., `bg-gray-50` or `bg-slate-50` for the app background, `bg-white` for cards).
      - Use rounded corners consistently (e.g., `rounded-xl` or `rounded-2xl` for cards, `rounded-md` for buttons).
  4.  **Typography:**
      - Use standard Tailwind typography sizing.
      - Make headings bold and distinct (`text-2xl font-bold tracking-tight`).
      - Use muted colors for secondary text (`text-gray-500` or `text-muted-foreground`).
  5.  **Icons:** Use `lucide-react` for all iconography. Ensure icons are consistently sized (usually `w-4 h-4` or `w-5 h-5`) and vertically centered with text.
  6.  **State Feedback:** Always include hover, focus, and disabled states for interactive elements (e.g., `hover:bg-gray-100`, `disabled:opacity-50`). Include loading states (spinners or skeletons) for async operations.
  7.  **Responsiveness:** Build mobile-first. Ensure all dashboards and public pages stack correctly on mobile (`flex-col` on small screens, `md:flex-row` on larger screens).
