-- -- Xynetra website — Supabase schema
-- -- Run this in the Supabase SQL editor (or via the CLI) for the site's
-- -- authenticated features. Auth (email/password) is built into Supabase.

-- -- 1) profiles: mirrors sign-up metadata so it can be queried/updated server-side.
-- create table if not exists public.profiles (
--   id uuid primary key references auth.users (id) on delete cascade,
--   full_name text,
--   business_name text,
--   billing_region text not null default 'international'
--     check (billing_region in ('international', 'pakistan')),
--   created_at timestamptz not null default now()
-- );

-- alter table public.profiles enable row level security;

-- drop policy if exists "profiles are self-readable" on public.profiles;
-- create policy "profiles are self-readable"
--   on public.profiles for select using (auth.uid() = id);

-- drop policy if exists "profiles are self-updatable" on public.profiles;
-- create policy "profiles are self-updatable"
--   on public.profiles for update using (auth.uid() = id);

-- -- Auto-create a profile row when a user signs up, from the metadata we set.
-- create or replace function public.handle_new_user()
-- returns trigger
-- language plpgsql
-- security definer set search_path = public
-- as $$
-- begin
--   insert into public.profiles (id, full_name, business_name, billing_region)
--   values (
--     new.id,
--     new.raw_user_meta_data ->> 'full_name',
--     new.raw_user_meta_data ->> 'business_name',
--     coalesce(new.raw_user_meta_data ->> 'billing_region', 'international')
--   )
--   on conflict (id) do nothing;
--   return new;
-- end;
-- $$;

-- drop trigger if exists on_auth_user_created on auth.users;
-- create trigger on_auth_user_created
--   after insert on auth.users
--   for each row execute function public.handle_new_user();

-- -- 2) invoice_status: per-invoice status overrides (Pakistan "I've paid" flow).
-- create table if not exists public.invoice_status (
--   user_id uuid not null references auth.users (id) on delete cascade,
--   number text not null,
--   status text not null default 'pending_verification'
--     check (status in ('paid', 'due', 'pending_verification')),
--   updated_at timestamptz not null default now(),
--   primary key (user_id, number)
-- );

-- alter table public.invoice_status enable row level security;

-- drop policy if exists "own invoice status readable" on public.invoice_status;
-- create policy "own invoice status readable"
--   on public.invoice_status for select using (auth.uid() = user_id);

-- drop policy if exists "own invoice status writable" on public.invoice_status;
-- create policy "own invoice status writable"
--   on public.invoice_status for insert with check (auth.uid() = user_id);

-- drop policy if exists "own invoice status updatable" on public.invoice_status;
-- create policy "own invoice status updatable"
--   on public.invoice_status for update using (auth.uid() = user_id);

-- -- 3) waitlist: early-access signups from the Lead-to-Booking page.
-- create table if not exists public.waitlist (
--   id uuid primary key default gen_random_uuid(),
--   email text not null,
--   product text,
--   created_at timestamptz not null default now()
-- );

-- alter table public.waitlist enable row level security;

-- -- Allow anonymous inserts (public marketing form); no public read.
-- drop policy if exists "anyone can join waitlist" on public.waitlist;
-- create policy "anyone can join waitlist"
--   on public.waitlist for insert with check (true);





-- Xynetra — migration 002
-- Adds the tables/columns the app already queries but schema.sql never created.
-- Safe to re-run.

-- ---------------------------------------------------------------
-- 1) profiles: billing + plan state the admin panel reads/writes
-- ---------------------------------------------------------------
alter table public.profiles
  add column if not exists subscription_status text not null default 'inactive',
  add column if not exists plan               text,
  add column if not exists updated_at         timestamptz not null default now();

alter table public.profiles
  drop constraint if exists profiles_subscription_status_check;
alter table public.profiles
  add constraint profiles_subscription_status_check
  check (subscription_status in ('active', 'inactive', 'past_due', 'cancelled'));

-- ---------------------------------------------------------------
-- 2) clients: per-tenant operational state (WhatsApp line, intake)
-- ---------------------------------------------------------------
create table if not exists public.clients (
  id                       uuid primary key references auth.users (id) on delete cascade,
  whatsapp_phone_number_id text,
  phone_provisioning       jsonb not null default '{}'::jsonb,  -- { option, phone_number, country }
  timezone                 text,
  owner_whatsapp           text,
  subscription_status      text not null default 'inactive',
  created_at               timestamptz not null default now(),
  updated_at               timestamptz not null default now()
);

create index if not exists clients_phone_number_id_idx
  on public.clients (whatsapp_phone_number_id)
  where whatsapp_phone_number_id is not null;

alter table public.clients enable row level security;

drop policy if exists "clients are self-readable" on public.clients;
create policy "clients are self-readable"
  on public.clients for select using (auth.uid() = id);

-- ---------------------------------------------------------------
-- 3) appointments
-- ---------------------------------------------------------------
create table if not exists public.appointments (
  id                      uuid primary key default gen_random_uuid(),
  client_id               uuid not null references auth.users (id) on delete cascade,
  customer_name           text,
  customer_phone          text,
  appointment_time        timestamptz not null,
  status                  text not null default 'confirmed'
                            check (status in ('confirmed', 'cancelled', 'pending', 'no_show')),
  timezone                text,
  value                   numeric(10, 2) not null default 0,
  recovered_from_waitlist boolean not null default false,
  created_at              timestamptz not null default now()
);

create index if not exists appointments_client_time_idx
  on public.appointments (client_id, appointment_time desc);

alter table public.appointments enable row level security;

drop policy if exists "own appointments readable" on public.appointments;
create policy "own appointments readable"
  on public.appointments for select using (auth.uid() = client_id);

-- ---------------------------------------------------------------
-- 4) reminders
-- ---------------------------------------------------------------
create table if not exists public.reminders (
  id         uuid primary key default gen_random_uuid(),
  client_id  uuid not null references auth.users (id) on delete cascade,
  message    text not null,
  sent_at    timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index if not exists reminders_client_sent_idx
  on public.reminders (client_id, sent_at desc);

alter table public.reminders enable row level security;

drop policy if exists "own reminders readable" on public.reminders;
create policy "own reminders readable"
  on public.reminders for select using (auth.uid() = client_id);

-- ---------------------------------------------------------------
-- 5) new signups get BOTH a profile and a clients row
-- ---------------------------------------------------------------
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

  insert into public.clients (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ---------------------------------------------------------------
-- 6) backfill clients rows for users who already exist
-- ---------------------------------------------------------------
insert into public.clients (id)
select id from public.profiles
on conflict (id) do nothing;