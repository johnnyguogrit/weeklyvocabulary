import { NextRequest, NextResponse } from 'next/server'
import { getSubjectData } from '@/data/questionGenerator'

// GET /api/subjects - Get subject data for a grade
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const grade = searchParams.get('grade') as any
    const subject = searchParams.get('subject')

    if (!grade) {
      return NextResponse.json({ error: 'Grade parameter required' }, { status: 400 })
    }

    if (subject) {
      // Get specific subject data
      const data = getSubjectData(grade, subject)
      return NextResponse.json(data)
    } else {
      // Get all subjects for grade
      const subjects = ['Maths', 'Science', 'STEAM', 'Music', 'Performing Arts', 'Drama', 'Visual Arts', 'PE']
      const data = subjects.map subj => ({
        id: subj.toLowerCase().replace(/\s+/g, '-'),
        name: subj,
        ...getSubjectData(grade, subj)
      }))
      return NextResponse.json(data)
    }
  } catch (error) {
    console.error('Error fetching subject data:', error)
    return NextResponse.json({ error: 'Failed to fetch subject data' }, { status: 500 })
  }
}
