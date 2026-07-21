'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import type { UserRole } from '@/types/database.types'

export type AuthState = { error: string | null }

const initialState: AuthState = { error: null }
export { initialState as authInitialState }

export async function signUp(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')
  const role = formData.get('role') as UserRole | null

  if (!email || !password) return { error: 'Email and password are required.' }
  if (role !== 'seeker' && role !== 'employer') return { error: 'Choose a role to continue.' }
  if (password.length < 8) return { error: 'Password must be at least 8 characters.' }

  const supabase = await createClient()
  const { data, error } = await supabase.auth.signUp({ email, password })

  if (error) return { error: error.message }
  if (!data.user) return { error: 'Sign up failed. Please try again.' }

  // If email confirmation is required in your Supabase Auth settings, there is
  // no session yet at this point — the profile row still gets created because
  // Supabase issues a user id immediately on signUp(). Adjust the redirect
  // below to a "check your email" page if you have confirmations enabled.
  const { error: profileError } = await supabase.from('profiles').insert({
    id: data.user.id,
    role,
    onboarded: false,
  })

  if (profileError) {
    return { error: `Account created, but profile setup failed: ${profileError.message}` }
  }

  revalidatePath('/', 'layout')
  redirect('/onboarding')
}

export async function signIn(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const email = String(formData.get('email') ?? '').trim()
  const password = String(formData.get('password') ?? '')

  if (!email || !password) return { error: 'Email and password are required.' }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}

export async function signOut() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/login')
}

export async function completeProfile(_prevState: AuthState, formData: FormData): Promise<AuthState> {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return { error: 'Not authenticated.' }

  const full_name = String(formData.get('full_name') ?? '').trim()
  const headline = String(formData.get('headline') ?? '').trim() || null
  const bio = String(formData.get('bio') ?? '').trim() || null
  const company_name = String(formData.get('company_name') ?? '').trim() || null
  const company_website = String(formData.get('company_website') ?? '').trim() || null

  if (!full_name) return { error: 'Name is required.' }

  const { error } = await supabase
    .from('profiles')
    .update({ full_name, headline, bio, company_name, company_website, onboarded: true })
    .eq('id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/', 'layout')
  redirect('/dashboard')
}
