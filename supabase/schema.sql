-- ============================================
-- OpenLink Database Schema
-- Run this in the Supabase SQL Editor
-- (Dashboard → SQL Editor → New Query → Paste & Run)
-- ============================================

-- =====================
-- 1. PROFILES TABLE
-- =====================
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text unique,
  display_name text,
  bio text,
  avatar_url text,
  theme_color text default '#3b82f6',
  bg_color text default '#f8fafc',
  button_style text default 'rounded' check (button_style in ('solid', 'outline', 'rounded')),
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.profiles enable row level security;

-- Policies: Users can read any profile (public pages need this)
create policy "Public profiles are viewable by everyone"
  on public.profiles for select
  using (true);

-- Policies: Users can insert their own profile
create policy "Users can insert their own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

-- Policies: Users can update their own profile
create policy "Users can update their own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- =====================
-- 2. LINKS TABLE
-- =====================
create table if not exists public.links (
  id uuid default gen_random_uuid() primary key,
  profile_id uuid references public.profiles(id) on delete cascade not null,
  title text not null default '',
  url text not null default '',
  "order" integer not null default 0,
  is_active boolean not null default true,
  icon text,
  created_at timestamp with time zone default now()
);

-- Enable RLS
alter table public.links enable row level security;

-- Policies: Anyone can read active links (for public pages)
create policy "Active links are viewable by everyone"
  on public.links for select
  using (true);

-- Policies: Users can manage their own links
create policy "Users can insert their own links"
  on public.links for insert
  with check (auth.uid() = profile_id);

create policy "Users can update their own links"
  on public.links for update
  using (auth.uid() = profile_id);

create policy "Users can delete their own links"
  on public.links for delete
  using (auth.uid() = profile_id);

-- =====================
-- 3. CLICKS TABLE
-- =====================
create table if not exists public.clicks (
  id uuid default gen_random_uuid() primary key,
  link_id uuid references public.links(id) on delete cascade not null,
  created_at timestamp with time zone default now(),
  device_type text check (device_type in ('mobile', 'desktop'))
);

-- Enable RLS
alter table public.clicks enable row level security;

-- Policies: Anyone can insert clicks (public page visitors)
create policy "Anyone can insert clicks"
  on public.clicks for insert
  with check (true);

-- Policies: Link owners can read their own click data
create policy "Users can read clicks on their own links"
  on public.clicks for select
  using (
    exists (
      select 1 from public.links
      where links.id = clicks.link_id
      and links.profile_id = auth.uid()
    )
  );

-- =====================
-- 4. AUTO-CREATE PROFILE ON SIGNUP (Trigger)
-- =====================
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = ''
as $$
begin
  insert into public.profiles (id, display_name, avatar_url)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name', ''),
    coalesce(new.raw_user_meta_data ->> 'avatar_url', new.raw_user_meta_data ->> 'picture', '')
  );
  return new;
end;
$$;

-- Trigger: Run after a new user signs up
create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =====================
-- 5. HELPER: Lowercase username constraint
-- =====================
create or replace function public.enforce_lowercase_username()
returns trigger
language plpgsql
as $$
begin
  new.username := lower(trim(new.username));
  new.updated_at := now();
  return new;
end;
$$;

create or replace trigger on_profile_update
  before insert or update on public.profiles
  for each row execute function public.enforce_lowercase_username();

-- =====================
-- 6. INDEX for fast username lookups
-- =====================
create index if not exists idx_profiles_username on public.profiles(username);
create index if not exists idx_links_profile_id on public.links(profile_id);
create index if not exists idx_links_order on public.links(profile_id, "order");
create index if not exists idx_clicks_link_id on public.clicks(link_id);
