import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// POST /api/teacher/classes/[id]/students - Add student to class
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const { id } = await params

  if (!session?.user || (session.user as any).role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const body = await request.json()
    const { studentId } = body

    if (!studentId) {
      return NextResponse.json({ error: 'Student ID required' }, { status: 400 })
    }

    // Verify class ownership
    const classData = await prisma.class.findUnique({
      where: { id }
    })

    if (!classData || classData.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        classId_studentId: {
          classId: id,
          studentId
        }
      }
    })

    if (existing) {
      return NextResponse.json({ error: 'Student already enrolled' }, { status: 400 })
    }

    // Create enrollment
    await prisma.enrollment.create({
      data: {
        classId: id,
        studentId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error enrolling student:', error)
    return NextResponse.json({ error: 'Failed to enroll student' }, { status: 500 })
  }
}
