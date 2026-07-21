# Phase 1 — Auth & Onboarding: how to drop this in

## Before you run it

1. **Reconcile the schema.** I couldn't see your actual Supabase project in this
   session (none of the projects available to me were named SwipeHire), so
   `lib/supabase/schema.sql` and `types/database.types.ts` are my best
   assumption of what `profiles` needs for Phase 1 — not your real schema.
   Diff it against your actual table before running anything, especially:
   - the `role` column (name + allowed values — I assumed `text` with a
     `seeker | employer` check constraint)
   - whether you already have an "is onboarding complete" signal, or need the
     `onboarded boolean` column this code adds
2. **Install deps** (if not already present):
   ```
   npm install @supabase/ssr @supabase/supabase-js class-variance-authority clsx tailwind-merge lucide-react @radix-ui/react-label @radix-ui/react-slot
   ```
3. **Env vars** — copy `.env.local.example` to `.env.local` and fill in your
   project URL + anon key (same names you said are already set on Vercel).
4. Confirm in Supabase Auth settings whether **email confirmation** is
   required. If it is, `signUp()` in `app/actions/auth.ts` currently redirects
   straight to `/onboarding` — you'll want a "check your email" interstitial
   instead, since there's no session yet until the user confirms.

## What's in this drop

| Path | Purpose |
|---|---|
| `lib/supabase/client.ts` | Browser Supabase client |
| `lib/supabase/server.ts` | Server Component / Server Action Supabase client |
| `lib/supabase/middleware.ts` + `middleware.ts` | Session refresh + route protection |
| `types/database.types.ts` | Assumed `profiles` types — flagged, needs verification |
| `lib/supabase/schema.sql` | Assumed schema — flagged, needs verification |
| `app/actions/auth.ts` | Server Actions: signUp, signIn, signOut, completeProfile |
| `app/(auth)/login`, `app/(auth)/signup` | Auth pages |
| `app/onboarding` | Post-signup profile step, role-aware form |
| `app/dashboard` | Minimal protected stub — just enough to prove the loop works; Phase 2 replaces it |
| `app/page.tsx` | Landing page |
| `components/auth/*` | Role selector, submit button with pending state, form error |
| `components/ui/*` | Standard shadcn/ui primitives (button, card, input, label, textarea, alert) — skip any that already exist in your repo |

## What I did NOT build (by design, not oversight)

- Navbar / role-based nav — Phase 2
- Swipe interface — Phase 3
- Password reset / OAuth providers — not in your brief, ask if you want it
- next-themes toggle — dark mode is hardcoded default per your brief; add a
  toggle later if you want light mode too

## Known open item

`app/dashboard/page.tsx` is intentionally bare. Middleware redirects here after
login and onboarding redirects here on completion, so it has to exist for the
loop to be testable — but it's not "Phase 2 work," just a placeholder.
