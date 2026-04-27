import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'

// DELETE /api/teacher/classes/[id]/students/[studentId] - Remove student from class
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string; studentId: string }> }
) {
  const session = await auth()
  const { id, studentId } = await params

  if (!session?.user || (session.user as any).role !== 'TEACHER') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Verify ownership
    const classData = await prisma.class.findUnique({ where: { id } })
    if (!classData || classData.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Delete enrollment
    await prisma.enrollment.deleteMany({
      where: {
        classId: id,
        studentId: studentId
      }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error removing student:', error)
    return NextResponse.json({ error: 'Failed to remove student' }, { status: 500 })
  }
}
