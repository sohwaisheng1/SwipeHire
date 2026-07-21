'use client'

import { useState } from 'react'
import { Briefcase, UserRound } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { UserRole } from '@/types/database.types'

const ROLES: { value: UserRole; label: string; description: string; icon: typeof UserRound }[] = [
  {
    value: 'seeker',
    label: 'Job Seeker',
    description: 'Swipe through roles, match with employers',
    icon: UserRound,
  },
  {
    value: 'employer',
    label: 'Employer',
    description: 'Swipe through candidates, build your team',
    icon: Briefcase,
  },
]

export function RoleSelector({ defaultValue }: { defaultValue?: UserRole }) {
  const [selected, setSelected] = useState<UserRole | undefined>(defaultValue)

  return (
    <div role="radiogroup" aria-label="Choose your role" className="grid grid-cols-2 gap-3">
      {ROLES.map(({ value, label, description, icon: Icon }) => {
        const isSelected = selected === value
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => setSelected(value)}
            className={cn(
              'flex flex-col items-start gap-2 rounded-xl border p-4 text-left transition-all',
              'hover:border-emerald-500/60 hover:bg-emerald-500/5',
              isSelected
                ? 'border-emerald-500 bg-emerald-500/10 ring-1 ring-emerald-500'
                : 'border-zinc-800 bg-zinc-900/50'
            )}
          >
            <Icon className={cn('h-5 w-5', isSelected ? 'text-emerald-400' : 'text-zinc-400')} />
            <span className="text-sm font-semibold text-zinc-100">{label}</span>
            <span className="text-xs text-zinc-400">{description}</span>
          </button>
        )
      })}
      {/* Hidden input carries the value into the surrounding <form>'s FormData. */}
      <input type="hidden" name="role" value={selected ?? ''} required />
    </div>
  )
}
