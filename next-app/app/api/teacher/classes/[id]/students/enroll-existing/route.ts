import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// POST /api/teacher/classes/[id]/students/enroll-existing - Enroll existing student by email
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
    const { email, parentEmail, parentPhone, initialPassword } = body

    if (!email) {
      return NextResponse.json({ error: 'Email required' }, { status: 400 })
    }

    // Verify class ownership
    const classData = await prisma.class.findUnique({
      where: { id }
    })

    if (!classData || classData.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Find student by email
    const student = await prisma.user.findUnique({
      where: { email },
      select: { id: true, role: true }
    })

    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 })
    }

    if (student.role !== 'STUDENT') {
      return NextResponse.json({ error: 'User is not a student' }, { status: 400 })
    }

    // Check if already enrolled
    const existing = await prisma.enrollment.findUnique({
      where: {
        classId_studentId: {
          classId: id,
          studentId: student.id
        }
      }
    })

    if (existing) {
      return NextResponse.json({ error: 'Student already enrolled in this class' }, { status: 400 })
    }

    // Create enrollment with optional parent contact info
    await prisma.enrollment.create({
      data: {
        classId: id,
        studentId: student.id,
        parentEmail: parentEmail || null,
        parentPhone: parentPhone || null,
        initialPassword: initialPassword || null
      }
    })

    return NextResponse.json({ success: true, studentId: student.id })
  } catch (error) {
    console.error('Error enrolling student by email:', error)
    return NextResponse.json({ error: 'Failed to enroll student' }, { status: 500 })
  }
}
