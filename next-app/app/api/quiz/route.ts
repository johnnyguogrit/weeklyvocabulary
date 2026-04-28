import { NextRequest, NextResponse } from 'next/server'
import { getSubjectData } from '@/data/questionGenerator'
import { prisma } from '@/lib/db'
import { normalizeSubject } from '@/lib/subjectUtils'

// POST /api/quiz - Start a new quiz session
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, grade, subject, weekId, difficulty } = body

    if (!grade || !subject || weekId === undefined) {
      return NextResponse.json(
        { error: 'Missing required parameters: grade, subject, weekId' },
        { status: 400 }
      )
    }

    // Normalize subject name to match data keys
    const normalizedSubject = normalizeSubject(subject)

    // Get subject data
    const subjectData = getSubjectData(grade, normalizedSubject)
    const week = subjectData.weeks.find(w => w.id === weekId)

    if (!week) {
      return NextResponse.json({ error: 'Week not found' }, { status: 404 })
    }

    // Create quiz session in database if userId provided
    let quizSession = null
    if (userId) {
      // Get or create student progress
      let studentProgress = await prisma.studentProgress.findUnique({
        where: {
          userId_grade_subject: {
            userId,
            grade,
            subject: normalizedSubject,
          },
        },
      })

      if (!studentProgress) {
        studentProgress = await prisma.studentProgress.create({
          data: {
            userId,
            grade,
            subject: normalizedSubject,
            difficulty: difficulty?.toUpperCase() || 'EASY',
            totalScore: 0,
            overallProgress: 0,
            currentPlantStage: 'SEEDLING',
          },
        })
      }

      // Create quiz session
      quizSession = await prisma.quizSession.create({
        data: {
          userId,
          grade,
          subject: normalizedSubject,
          weekId,
          difficulty: difficulty?.toUpperCase() || 'EASY',
          currentQuestionIndex: 0,
          timeRemaining: 0,
          livesRemaining: difficulty === 'hard' ? 3 : 0,
          answersHistory: JSON.stringify([]),
        },
      })
    }

    return NextResponse.json({
      sessionId: quizSession?.id || `session_${Date.now()}`,
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

// PUT /api/quiz - Submit quiz answers
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { sessionId, answers, timeSpent } = body

    if (!sessionId) {
      return NextResponse.json({ error: 'sessionId is required' }, { status: 400 })
    }

    // Find quiz session
    const quizSession = await prisma.quizSession.findUnique({
      where: { id: sessionId },
    })

    if (!quizSession) {
      return NextResponse.json({ error: 'Quiz session not found' }, { status: 404 })
    }

    // Calculate score
    let correctCount = 0
    const results = answers.map((answer: any) => {
      const isCorrect = answer.selectedOption === answer.correctOption
      if (isCorrect) correctCount++
      return {
        questionId: answer.questionId,
        selectedOption: answer.selectedOption,
        isCorrect,
      }
    })

    const score = Math.round((correctCount / answers.length) * 100)

    // Update quiz session with answers history
    await prisma.quizSession.update({
      where: { id: sessionId },
      data: {
        answersHistory: JSON.stringify(results),
        correctCount,
        scoreThisQuestion: score,
        isAnswered: true,
        isCorrect: score >= 70,
      },
    })

    // Get student progress
    const studentProgress = await prisma.studentProgress.findUnique({
      where: {
        userId_grade_subject: {
          userId: quizSession.userId,
          grade: quizSession.grade,
          subject: quizSession.subject,
        },
      },
    })

    if (studentProgress) {
      // Find or create week progress
      let weekProgress = await prisma.weekProgress.findUnique({
        where: {
          studentProgressId_weekId: {
            studentProgressId: studentProgress.id,
            weekId: quizSession.weekId,
          },
        },
      })

      if (weekProgress) {
        // Update existing week progress
        const newQuestionsTotal = weekProgress.questionsTotal + answers.length
        const newQuestionsCorrect = weekProgress.questionsCorrect + correctCount
        const newScore = Math.round((newQuestionsCorrect / newQuestionsTotal) * 100)

        await prisma.weekProgress.update({
          where: { id: weekProgress.id },
          data: {
            questionsCorrect: newQuestionsCorrect,
            questionsTotal: newQuestionsTotal,
            score: newScore,
            completed: newScore >= 70,
          },
        })
      } else {
        // Create new week progress
        await prisma.weekProgress.create({
          data: {
            studentProgressId: studentProgress.id,
            weekId: quizSession.weekId,
            locked: false,
            completed: score >= 70,
            score: score,
            questionsCorrect: correctCount,
            questionsTotal: answers.length,
            readingCompCorrect: 0,
            readingCompTotal: 0,
            keywordsMastered: JSON.stringify([]),
          },
        })
      }

      // Update overall progress
      const allWeekProgress = await prisma.weekProgress.findMany({
        where: { studentProgressId: studentProgress.id },
      })

      const totalWeeks = allWeekProgress.length
      const completedWeeks = allWeekProgress.filter(wp => wp.completed).length
      const avgScore = allWeekProgress.reduce((sum, wp) => sum + wp.score, 0) / totalWeeks

      await prisma.studentProgress.update({
        where: { id: studentProgress.id },
        data: {
          overallProgress: Math.round((completedWeeks / totalWeeks) * 100),
          totalScore: avgScore,
        },
      })
    }

    return NextResponse.json({
      success: true,
      score,
      correctCount,
      totalQuestions: answers.length,
      passed: score >= 70,
    })
  } catch (error) {
    console.error('Error submitting quiz:', error)
    return NextResponse.json({ error: 'Failed to submit quiz' }, { status: 500 })
  }
}
