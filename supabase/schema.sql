-- Xynetra website — Supabase schema
-- Run this in the Supabase SQL editor (or via the CLI) for the site's
-- authenticated features. Auth (email/password) is built into Supabase.

-- 1) profiles: mirrors sign-up metadata so it can be queried/updated server-side.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text,
  business_name text,
  billing_region text not null default 'international'
    check (billing_region in ('international', 'pakistan')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

drop policy if exists "profiles are self-readable" on public.profiles;
create policy "profiles are self-readable"
  on public.profiles for select using (auth.uid() = id);

drop policy if exists "profiles are self-updatable" on public.profiles;
create policy "profiles are self-updatable"
  on public.profiles for update using (auth.uid() = id);

-- Auto-create a profile row when a user signs up, from the metadata we set.
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, business_name, billing_region)
  values (
    new.id,
    new.raw_user_meta_data ->> 'full_name',
    new.raw_user_meta_data ->> 'business_name',
    coalesce(new.raw_user_meta_data ->> 'billing_region', 'international')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- 2) invoice_status: per-invoice status overrides (Pakistan "I've paid" flow).
create table if not exists public.invoice_status (
  user_id uuid not null references auth.users (id) on delete cascade,
  number text not null,
  status text not null default 'pending_verification'
    check (status in ('paid', 'due', 'pending_verification')),
  updated_at timestamptz not null default now(),
  primary key (user_id, number)
);

alter table public.invoice_status enable row level security;

drop policy if exists "own invoice status readable" on public.invoice_status;
create policy "own invoice status readable"
  on public.invoice_status for select using (auth.uid() = user_id);

drop policy if exists "own invoice status writable" on public.invoice_status;
create policy "own invoice status writable"
  on public.invoice_status for insert with check (auth.uid() = user_id);

drop policy if exists "own invoice status updatable" on public.invoice_status;
create policy "own invoice status updatable"
  on public.invoice_status for update using (auth.uid() = user_id);

-- 3) waitlist: early-access signups from the Lead-to-Booking page.
create table if not exists public.waitlist (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  product text,
  created_at timestamptz not null default now()
);

alter table public.waitlist enable row level security;

-- Allow anonymous inserts (public marketing form); no public read.
drop policy if exists "anyone can join waitlist" on public.waitlist;
create policy "anyone can join waitlist"
  on public.waitlist for insert with check (true);



