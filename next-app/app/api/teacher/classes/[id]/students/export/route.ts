import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import * as XLSX from 'xlsx'

// GET /api/teacher/classes/[id]/students/export - Export students to Excel
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
    // Verify class ownership
    const classData = await prisma.class.findUnique({
      where: { id }
    })

    if (!classData || classData.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Get all enrolled students with progress
    const enrollments = await prisma.enrollment.findMany({
      where: { classId: id },
      include: {
        student: {
          include: {
            studentProgress: true
          }
        }
      }
    })

    // Prepare data for export
    const exportData = enrollments.map((enrollment, index) => {
      const student = enrollment.student
      const progress = student.studentProgress || []

      // Calculate overall stats
      const totalSubjects = progress.length
      const avgProgress = totalSubjects > 0
        ? Math.round(progress.reduce((sum, p) => sum + p.overallProgress, 0) / totalSubjects)
        : 0
      const totalScore = progress.reduce((sum, p) => sum + p.totalScore, 0)

      // Parse name
      const nameParts = student.name?.split(' ') || ['', '']
      const firstName = nameParts[0] || ''
      const lastName = nameParts.slice(1).join(' ') || ''

      return {
        'No': index + 1,
        'Email': student.email,
        'FirstName': firstName,
        'LastName': lastName,
        'Grade': classData.grade,
        'Password': '(hidden)', // Don't export passwords
        'ParentEmail': enrollment.parentEmail || '',
        'ParentPhone': enrollment.parentPhone || '',
        'TotalSubjects': totalSubjects,
        'AvgProgress': `${avgProgress}%`,
        'TotalScore': totalScore,
        'EnrolledDate': new Date(enrollment.enrolledAt).toLocaleDateString()
      }
    })

    // Create worksheet
    const worksheet = XLSX.utils.json_to_sheet(exportData)

    // Set column widths
    worksheet['!cols'] = [
      { wch: 5 },   // No
      { wch: 25 },  // Email
      { wch: 15 },  // FirstName
      { wch: 15 },  // LastName
      { wch: 8 },   // Grade
      { wch: 12 },  // Password
      { wch: 25 },  // ParentEmail
      { wch: 15 },  // ParentPhone
      { wch: 12 },  // TotalSubjects
      { wch: 10 },  // AvgProgress
      { wch: 10 },  // TotalScore
      { wch: 12 }   // EnrolledDate
    ]

    // Create workbook
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Students')

    // Generate buffer
    const buffer = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' })

    // Return file
    const filename = `${classData.name}_students_${new Date().toISOString().split('T')[0]}.xlsx`

    return new NextResponse(buffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'Content-Disposition': `attachment; filename="${filename}"`
      }
    })
  } catch (error: any) {
    console.error('Error exporting students:', error)
    return NextResponse.json(
      { error: 'Failed to export students', details: error.message },
      { status: 500 }
    )
  }
}
