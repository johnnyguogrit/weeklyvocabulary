import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// GET /api/teacher/classes/[id] - Get class details
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const { id } = await params

  if (!session?.user || (session.user as any).role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const classData = await prisma.class.findUnique({
      where: { id },
      include: {
        enrollments: {
          include: {
            student: {
              include: {
                studentProgress: true
              }
            }
          }
        }
      }
    })

    if (!classData) {
      return NextResponse.json({ error: 'Class not found' }, { status: 404 })
    }

    // Verify ownership
    if (classData.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    return NextResponse.json({ class: classData })
  } catch (error) {
    console.error('Error fetching class:', error)
    return NextResponse.json({ error: 'Failed to fetch class' }, { status: 500 })
  }
}

// DELETE /api/teacher/classes/[id] - Delete a class
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth()
  const { id } = await params

  if (!session?.user || (session.user as any).role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Verify ownership
    const classData = await prisma.class.findUnique({ where: { id } })
    if (!classData || classData.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete enrollments first (cascade)
    await prisma.enrollment.deleteMany({
      where: { classId: id }
    })

    // Delete class
    await prisma.class.delete({
      where: { id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting class:', error)
    return NextResponse.json({ error: 'Failed to delete class' }, { status: 500 })
  }
}
