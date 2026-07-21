'use client'

import { useActionState } from 'react'
import { completeProfile, authInitialState } from '@/app/actions/auth'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { SubmitButton } from '@/components/auth/submit-button'
import { FormError } from '@/components/auth/form-error'
import type { Profile, UserRole } from '@/types/database.types'

type Defaults = Pick<Profile, 'full_name' | 'headline' | 'bio' | 'company_name' | 'company_website'>

export function OnboardingForm({ role, defaults }: { role: UserRole; defaults: Defaults }) {
  const [state, formAction] = useActionState(completeProfile, authInitialState)

  return (
    <Card className="border-zinc-800 bg-zinc-900/50">
      <CardContent className="pt-6">
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="full_name">{role === 'employer' ? 'Your name' : 'Full name'}</Label>
            <Input id="full_name" name="full_name" defaultValue={defaults.full_name ?? ''} required />
          </div>

          {role === 'seeker' ? (
            <>
              <div className="space-y-2">
                <Label htmlFor="headline">Headline</Label>
                <Input
                  id="headline"
                  name="headline"
                  placeholder="Senior Frontend Engineer"
                  defaultValue={defaults.headline ?? ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Short bio</Label>
                <Textarea id="bio" name="bio" rows={4} defaultValue={defaults.bio ?? ''} />
              </div>
            </>
          ) : (
            <>
              <div className="space-y-2">
                <Label htmlFor="company_name">Company name</Label>
                <Input
                  id="company_name"
                  name="company_name"
                  defaultValue={defaults.company_name ?? ''}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company_website">Company website</Label>
                <Input
                  id="company_website"
                  name="company_website"
                  type="url"
                  placeholder="https://"
                  defaultValue={defaults.company_website ?? ''}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">About the company</Label>
                <Textarea id="bio" name="bio" rows={4} defaultValue={defaults.bio ?? ''} />
              </div>
            </>
          )}

          <FormError message={state.error} />
          <SubmitButton pendingText="Saving…">Continue</SubmitButton>
        </form>
      </CardContent>
    </Card>
  )
}
