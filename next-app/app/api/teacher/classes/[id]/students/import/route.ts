import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/db'
import * as XLSX from 'xlsx'
import bcrypt from 'bcryptjs'

// POST /api/teacher/classes/[id]/students/import - Import students from Excel
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
    const formData = await request.formData()
    const file = formData.get('file') as File

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 })
    }

    // Verify class ownership
    const classData = await prisma.class.findUnique({
      where: { id }
    })

    if (!classData || classData.teacherId !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
    }

    // Parse Excel file
    const buffer = await file.arrayBuffer()
    const workbook = XLSX.read(buffer, { type: 'buffer' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const data = XLSX.utils.sheet_to_json(sheet)

    // Expected columns: Email, FirstName, LastName, Grade, Password, ParentEmail, ParentPhone
    const results = {
      total: data.length,
      success: 0,
      failed: 0,
      errors: [] as Array<{ row: number; email: string; error: string }>,
      students: [] as Array<{ name: string; email: string; password: string }>
    }

    // Process each row
    for (let i = 0; i < data.length; i++) {
      const row = data[i] as any
      const rowNum = i + 2 // Excel rows are 1-indexed, plus header

      try {
        // Validate required fields
        const email = row.Email || row.email
        const firstName = row.FirstName || row.firstName || row.firstname
        const lastName = row.LastName || row.lastName || row.lastname
        const grade = row.Grade || row.grade
        const password = row.Password || row.password || ''
        const parentEmail = row.ParentEmail || row.parentemail || row.parentEmail || ''
        const parentPhone = row.ParentPhone || row.parentphone || row.parentPhone || ''

        if (!email || !firstName || !lastName || !grade) {
          throw new Error('Missing required fields (Email, FirstName, LastName, Grade)')
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          throw new Error('Invalid email format')
        }

        // Validate grade
        const validGrades = ['G1', 'G2', 'G3', 'G4', 'G5']
        if (!validGrades.includes(grade)) {
          throw new Error('Invalid grade (must be G1-G5)')
        }

        // Check if user already exists
        let user = await prisma.user.findUnique({
          where: { email }
        })

        if (!user) {
          // Create new user
          const hashedPassword = password
            ? await bcrypt.hash(password, 10)
            : await bcrypt.hash('password123', 10) // Default password

          user = await prisma.user.create({
            data: {
              email,
              name: `${firstName} ${lastName}`,
              password: hashedPassword,
              role: 'STUDENT'
            }
          })
        }

        // Check if already enrolled in this class
        const existingEnrollment = await prisma.enrollment.findUnique({
          where: {
            classId_studentId: {
              classId: id,
              studentId: user.id
            }
          }
        })

        if (!existingEnrollment) {
          // Create enrollment
          await prisma.enrollment.create({
            data: {
              classId: id,
              studentId: user.id,
              parentEmail: parentEmail || null,
              parentPhone: parentPhone ? String(parentPhone) : null
            }
          })
        }

        results.success++
        // Add student to results with password info
        results.students.push({
          name: user.name,
          email: user.email,
          password: password || 'password123'
        })
      } catch (error: any) {
        results.failed++
        results.errors.push({
          row: rowNum,
          email: row.Email || row.email || 'unknown',
          error: error.message
        })
      }
    }

    // Create import batch record
    await prisma.importBatch.create({
      data: {
        teacherId: session.user.id,
        classId: id,
        fileName: file.name,
        recordsCount: results.total,
        successCount: results.success,
        failureCount: results.failed,
        errorLog: results.errors.length > 0 ? JSON.stringify(results.errors) : null
      }
    })

    return NextResponse.json({
      success: true,
      results
    })
  } catch (error: any) {
    console.error('Error importing students:', error)
    return NextResponse.json(
      { error: 'Failed to import students', details: error.message },
      { status: 500 }
    )
  }
}
