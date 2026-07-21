import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { OnboardingForm } from './onboarding-form'

export default async function OnboardingPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) redirect('/login')

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, onboarded, full_name, headline, bio, company_name, company_website')
    .eq('id', user.id)
    .single()

  if (!profile) redirect('/login')
  if (profile.onboarded) redirect('/dashboard')

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-white">Finish setting up your profile</h1>
          <p className="mt-2 text-sm text-zinc-400">
            {profile.role === 'employer'
              ? 'Tell candidates a bit about your company.'
              : 'Tell employers a bit about yourself.'}
          </p>
        </div>
        <OnboardingForm role={profile.role} defaults={profile} />
      </div>
    </div>
  )
}
