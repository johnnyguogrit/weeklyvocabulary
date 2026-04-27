import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/teacher/students - Get all students (for enrollment)
export async function GET(request: NextRequest) {
  const session = await auth()

  if (!session?.user || (session.user as any).role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const students = await prisma.user.findMany({
      where: {
        role: 'STUDENT'
      },
      include: {
        studentProgress: true
      },
      orderBy: {
        name: 'asc'
      }
    })

    return NextResponse.json({ students })
  } catch (error) {
    console.error('Error fetching students:', error)
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 })
  }
}
