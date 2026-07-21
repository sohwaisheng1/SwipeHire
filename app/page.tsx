import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <main className="flex min-h-dvh flex-col items-center justify-center px-4 text-center">
      <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
        Swipe<span className="text-emerald-400">Hire</span>
      </h1>
      <p className="mt-4 max-w-md text-zinc-400">
        Right for interested, left to pass. Job matching, but it doesn&apos;t feel like a chore.
      </p>
      <div className="mt-8 flex gap-3">
        <Button asChild size="lg" className="bg-emerald-500 text-zinc-950 hover:bg-emerald-400">
          <Link href="/signup">Get started</Link>
        </Button>
        <Button asChild size="lg" variant="outline" className="border-zinc-700 text-zinc-100">
          <Link href="/login">Log in</Link>
        </Button>
      </div>
      <p className="mt-10 text-xs text-zinc-600">
        Phase 1 build — navbar, dashboard, and the swipe deck land in Phases 2–3.
      </p>
    </main>
  )
}
