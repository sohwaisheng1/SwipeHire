import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })

export const metadata: Metadata = {
  title: 'SwipeHire — Swipe your way to your next hire (or job)',
  description: 'Tinder-style job matching for candidates and employers.',
}

export const viewport: Viewport = {
  themeColor: '#09090b',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    // Dark mode by default: Tailwind's `dark` class is set unconditionally.
    // Swap this for next-themes in a later phase if you want a user toggle.
    <html lang="en" className={`dark ${inter.variable}`}>
      <body className="min-h-dvh bg-zinc-950 font-sans text-zinc-100 antialiased">{children}</body>
    </html>
  )
}
