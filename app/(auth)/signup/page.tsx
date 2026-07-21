'use client'

import { useActionState } from 'react'
import Link from 'next/link'
import { signUp, authInitialState } from '@/app/actions/auth'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { SubmitButton } from '@/components/auth/submit-button'
import { FormError } from '@/components/auth/form-error'
import { RoleSelector } from '@/components/auth/role-selector'

export default function SignupPage() {
  const [state, formAction] = useActionState(signUp, authInitialState)

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardHeader>
        <CardTitle className="text-white">Create your account</CardTitle>
        <CardDescription>Start swiping in under a minute.</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label>I am a…</Label>
            <RoleSelector />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" placeholder="you@example.com" required autoComplete="email" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" name="password" type="password" required minLength={8} autoComplete="new-password" />
            <p className="text-xs text-zinc-500">At least 8 characters.</p>
          </div>
          <FormError message={state.error} />
          <SubmitButton pendingText="Creating account…">Sign up</SubmitButton>
        </form>
        <p className="mt-6 text-center text-sm text-zinc-400">
          Already have an account?{' '}
          <Link href="/login" className="font-medium text-emerald-400 hover:text-emerald-300">
            Log in
          </Link>
        </p>
      </CardContent>
    </Card>
  )
}
