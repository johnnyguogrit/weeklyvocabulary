import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import type { ReactNode } from 'react'

export default async function TeacherLayout({ children }: { children: ReactNode }) {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const userRole = (session.user as any).role
  if (userRole !== 'TEACHER' && userRole !== 'ADMIN') {
    redirect('/student')
  }

  return <>{children}</>
}
