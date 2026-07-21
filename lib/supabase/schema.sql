-- ============================================================================
-- ASSUMED SCHEMA — Phase 1 (auth + onboarding) needs from `profiles`.
--
-- You told me profiles/jobs/swipes/matches already exist. I have no visibility
-- into your actual Supabase project in this session, so I could not verify
-- column names or diff against what's really there. Run this against a fresh
-- project, OR treat it as a checklist and reconcile column-by-column with your
-- existing `profiles` table before running any of it.
--
-- The one column Phase 1 specifically needs that a generic "profiles" table
-- might not have yet is `onboarded boolean` — it's how the app knows whether
-- to route a signed-in user to /onboarding or straight to /dashboard. If you
-- already track "profile complete" some other way (e.g. checking whether
-- full_name is null), tell me and I'll swap the logic in app/actions/auth.ts
-- and lib/supabase/middleware.ts instead of adding this column.
-- ============================================================================

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role text not null check (role in ('seeker', 'employer')),
  full_name text,
  avatar_url text,
  headline text,
  bio text,
  company_name text,
  company_website text,
  onboarded boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy if not exists "Profiles are viewable by the owner"
  on public.profiles for select
  using (auth.uid() = id);

create policy if not exists "Profiles are insertable by the owner"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy if not exists "Profiles are updatable by the owner"
  on public.profiles for update
  using (auth.uid() = id);

-- Keep updated_at current on every row change.
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
  before update on public.profiles
  for each row execute function public.set_updated_at();
