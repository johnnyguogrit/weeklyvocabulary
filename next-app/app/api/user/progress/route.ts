import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/user/progress - Get user's recent progress
export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session?.user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Get user's recent progress
    const recentProgress = await prisma.studentProgress.findMany({
      where: { userId: session.user.id },
      orderBy: { updatedAt: 'desc' },
      take: 3,
      select: {
        grade: true,
        subject: true,
        overallProgress: true,
      }
    })

    return NextResponse.json({ recent: recentProgress })
  } catch (error) {
    console.error('Error fetching user progress:', error)
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 })
  }
}
