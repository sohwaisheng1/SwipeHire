import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { signOut } from '@/app/actions/auth'
import { Button } from '@/components/ui/button'

// Deliberately minimal — Phase 2 replaces this with the real navbar + dashboard UI.
// It exists in Phase 1 only so signup → onboarding → dashboard → logout is a
// fully testable loop, and so middleware has a real destination to redirect to.
export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, full_name, onboarded')
    .eq('id', user.id)
    .single()

  if (profile && !profile.onboarded) redirect('/onboarding')

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-bold">
        Welcome, {profile?.full_name ?? user.email} ({profile?.role})
      </h1>
      <p className="text-zinc-400">Phase 1 checkpoint: you&apos;re authenticated and onboarded.</p>
      <form action={signOut}>
        <Button variant="outline" className="border-zinc-700 text-zinc-100">
          Log out
        </Button>
      </form>
    </main>
  )
}
