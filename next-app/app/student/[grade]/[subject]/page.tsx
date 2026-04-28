import Link from 'next/link'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Lock, CheckCircle } from 'lucide-react'
import { normalizeSubject, subjectToSlug } from '@/lib/subjectUtils'

const WEEK_CONFIG = [
  { id: 2, emoji: '🌱', title: 'Week 2', color: 'bg-green-100 border-green-300 text-green-700' },
  { id: 3, emoji: '🌿', title: 'Week 3', color: 'bg-green-100 border-green-300 text-green-700' },
  { id: 4, emoji: '🌿', title: 'Week 4', color: 'bg-green-100 border-green-300 text-green-700' },
  { id: 5, emoji: '🌳', title: 'Week 5 - Review', color: 'bg-yellow-100 border-yellow-300 text-yellow-700' },
  { id: 7, emoji: '🌳', title: 'Week 7', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { id: 8, emoji: '🌳', title: 'Week 8', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { id: 9, emoji: '🌳', title: 'Week 9', color: 'bg-blue-100 border-blue-300 text-blue-700' },
  { id: 10, emoji: '🌳✨', title: 'Week 10 - Review', color: 'bg-purple-100 border-purple-300 text-purple-700' },
  { id: 11, emoji: '🌳', title: 'Week 11', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  { id: 12, emoji: '🌳', title: 'Week 12', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  { id: 13, emoji: '🌳', title: 'Week 13', color: 'bg-orange-100 border-orange-300 text-orange-700' },
  { id: 14, emoji: '🌳✨', title: 'Week 14 - Review', color: 'bg-pink-100 border-pink-300 text-pink-700' },
  { id: 15, emoji: '🌳🌟', title: 'Week 15 - Final', color: 'bg-amber-100 border-amber-300 text-amber-700' },
]

const SUBJECT_INFO: Record<string, { name: string; emoji: string; color: string }> = {
  'Maths': { name: 'Mathematics', emoji: '🔢', color: 'from-green-500 to-green-700' },
  'Science': { name: 'Science', emoji: '🔬', color: 'from-blue-500 to-blue-700' },
  'STEAM': { name: 'STEAM', emoji: '💻', color: 'from-purple-500 to-purple-700' },
  'Music': { name: 'Music', emoji: '🎵', color: 'from-orange-500 to-orange-700' },
  'Performing Arts': { name: 'Performing Arts', emoji: '🎭', color: 'from-red-500 to-red-700' },
  'Drama': { name: 'Drama', emoji: '🎬', color: 'from-amber-600 to-amber-800' },
  'Visual Arts': { name: 'Visual Arts', emoji: '🎨', color: 'from-pink-500 to-pink-700' },
  'PE': { name: 'Physical Education', emoji: '⚽', color: 'from-teal-500 to-teal-700' },
}

export default async function WeekMapPage({ params }: { params: Promise<{ grade: string; subject: string }> }) {
  const session = await auth()
  const { grade, subject: rawSubject } = await params

  if (!session?.user) {
    redirect('/login')
  }

  // Normalize subject name to match data keys (e.g., "maths" -> "Maths")
  const subject = normalizeSubject(rawSubject)

  const subjectInfo = SUBJECT_INFO[subject] || { name: subject, emoji: '📚', color: 'from-gray-500 to-gray-700' }
  const normalizedGrade = grade.toUpperCase()

  let progress = await prisma.studentProgress.findUnique({
    where: {
      userId_grade_subject: {
        userId: session.user.id,
        grade: normalizedGrade,
        subject: subject
      }
    },
    include: {
      weekProgress: true
    }
  })

  if (!progress) {
    await prisma.studentProgress.create({
      data: {
        userId: session.user.id,
        grade: normalizedGrade,
        subject: subject,
        difficulty: 'EASY',
        totalScore: 0,
        overallProgress: 0,
        currentPlantStage: 'SEEDLING',
        weekProgress: {
          create: WEEK_CONFIG.map(w => ({
            weekId: w.id,
            locked: w.id !== 2,
            completed: false,
            score: 0,
            questionsCorrect: 0,
            questionsTotal: 0,
            readingCompCorrect: 0,
            readingCompTotal: 0,
            keywordsMastered: JSON.stringify([])
          }))
        }
      },
    })
    // Re-fetch with include
    progress = await prisma.studentProgress.findUnique({
      where: {
        userId_grade_subject: {
          userId: session.user.id,
          grade: normalizedGrade,
          subject: subject
        }
      },
      include: {
        weekProgress: true
      }
    })
  }

  // Progress should exist now (either found or created)
  if (!progress) {
    redirect('/login')
  }

  const weekProgressMap = new Map(progress.weekProgress.map(wp => [wp.weekId, wp]))
  const completedWeeks = progress.weekProgress.filter(wp => wp.completed).length
  const totalWeeks = WEEK_CONFIG.length

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <header className={`bg-gradient-to-r ${subjectInfo.color} text-white shadow-lg`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href={`/student/${grade}`} className="text-white/80 hover:text-white">← Back</Link>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{subjectInfo.emoji}</span>
                  <h1 className="text-2xl font-bold">{subjectInfo.name}</h1>
                </div>
                <p className="text-white/80">Grade {grade.replace('G', '')} • {completedWeeks}/{totalWeeks} weeks completed</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">{progress.totalScore}%</div>
              <div className="text-sm text-white/80">Average Score</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Your Vocabulary Garden</h3>
                <p className="text-gray-600">Keep learning to grow your plant!</p>
              </div>
              <div className="text-center">
                <div className="text-6xl mb-2">
                  {progress.currentPlantStage === 'MIGHTY_OAK' ? '🌳✨'
                    : progress.currentPlantStage === 'YOUNG_TREE' ? '🌳'
                      : progress.currentPlantStage === 'SAPLING' ? '🌿' : '🌱'}
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500"
                  style={{ width: `${progress.overallProgress}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {WEEK_CONFIG.map((week) => {
            const wp = weekProgressMap.get(week.id)
            const isLocked = wp?.locked ?? true
            const isCompleted = wp?.completed ?? false

            return (
              <Card key={week.id} className={`${isLocked ? 'opacity-60' : ''} hover:shadow-lg transition-all`}>
                <CardContent className="p-4">
                  <div className={`border-2 rounded-lg p-4 ${week.color} ${isLocked ? 'bg-gray-50' : ''}`}>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-3xl">{isLocked ? '🔒' : week.emoji}</span>
                      {isCompleted && <CheckCircle className="h-6 w-6 text-green-600" />}
                    </div>
                    <h3 className="font-semibold">{week.title}</h3>
                  </div>
                  {!isLocked && (
                    <Link href={`/student/${normalizedGrade}/${subjectToSlug(subject)}/${week.id}`}>
                      <button className="w-full mt-3 px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 text-sm font-medium">
                        {isCompleted ? 'Play Again' : 'Start Quiz'}
                      </button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            )
          })}
        </div>
      </main>
    </div>
  )
}
