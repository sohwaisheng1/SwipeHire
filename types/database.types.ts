/**
 * ASSUMPTION FLAG:
 * I don't have access to your actual Supabase project, so this is the shape
 * of `profiles` that Phase 1 needs — not a generated type from your real schema.
 * Before wiring this against production data:
 *   1. Run `lib/supabase/schema.sql` (or diff it against your existing table).
 *   2. Better yet, once your project is connected, regenerate this file with:
 *      npx supabase gen types typescript --project-id <your-project-ref> > types/database.types.ts
 */

export type UserRole = 'seeker' | 'employer'

export interface Profile {
  id: string
  role: UserRole
  full_name: string | null
  avatar_url: string | null
  headline: string | null
  bio: string | null
  company_name: string | null
  company_website: string | null
  onboarded: boolean
  created_at: string
  updated_at: string
}

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: Partial<Profile> & { id: string; role: UserRole }
        Update: Partial<Profile>
      }
    }
  }
}
