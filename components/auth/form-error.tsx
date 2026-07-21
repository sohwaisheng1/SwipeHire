import { AlertCircle } from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export function FormError({ message }: { message: string | null }) {
  if (!message) return null

  return (
    <Alert variant="destructive" className="border-red-900/50 bg-red-950/50 text-red-200">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}
