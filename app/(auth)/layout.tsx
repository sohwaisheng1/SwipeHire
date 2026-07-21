import Link from 'next/link'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-zinc-950 px-4 py-12">
      <Link href="/" className="mb-8 flex items-center gap-2">
        <span className="text-2xl font-bold tracking-tight text-white">
          Swipe<span className="text-emerald-400">Hire</span>
        </span>
      </Link>
      <div className="w-full max-w-sm">{children}</div>
    </div>
  )
}
