import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'

export default async function DashboardPage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  const role = (session.user as any).role

  // Redirect based on role
  if (role === 'TEACHER') {
    redirect('/teacher')
  } else if (role === 'ADMIN') {
    redirect('/admin')
  } else {
    redirect('/student')
  }
}
