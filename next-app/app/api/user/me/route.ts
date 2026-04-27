import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'

// GET /api/user/me - Get current user info
export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  return NextResponse.json({ user: session.user })
}
