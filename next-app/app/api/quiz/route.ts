import { NextRequest, NextResponse } from 'next/server'
import { getSubjectData } from '@/data/questionGenerator'

// POST /api/quiz - Start a new quiz session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { grade, subject, weekId, difficulty } = body

    if (!grade || !subject || !weekId) {
      return NextResponse.json(
        { error: 'Missing required parameters: grade, subject, weekId' },
        { status: 400 }
      )
    }

    // Get subject data
    const subjectData = getSubjectData(grade, subject)
    const week = subjectData.weeks.find(w => w.id === weekId)

    if (!week) {
      return NextResponse.json({ error: 'Week not found' }, { status: 404 })
    }

    // Create quiz session (TODO: Implement with Prisma)
    const sessionId = `session_${Date.now()}`

    return NextResponse.json({
      sessionId,
      questions: week.questions,
      weekId: week.id,
      weekTitle: week.title,
      difficulty: difficulty || 'easy'
    })
  } catch (error) {
    console.error('Error creating quiz session:', error)
    return NextResponse.json({ error: 'Failed to create quiz session' }, { status: 500 })
  }
}
