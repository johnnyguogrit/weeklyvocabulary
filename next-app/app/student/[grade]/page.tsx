import Link from 'next/link'

import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { subjectToSlug } from '@/lib/subjectUtils'

const SUBJECTS = [
  { id: 'Maths', name: 'Mathematics', emoji: '🔢', color: 'from-green-500 to-green-700' },
  { id: 'Science', name: 'Science', emoji: '🔬', color: 'from-blue-500 to-blue-700' },
  { id: 'STEAM', name: 'STEAM', emoji: '💻', color: 'from-purple-500 to-purple-700' },
  { id: 'Music', name: 'Music', emoji: '🎵', color: 'from-orange-500 to-orange-700' },
  { id: 'Performing Arts', name: 'Performing Arts', emoji: '🎭', color: 'from-red-500 to-red-700' },
  { id: 'Drama', name: 'Drama', emoji: '🎬', color: 'from-amber-600 to-amber-800' },
  { id: 'Visual Arts', name: 'Visual Arts', emoji: '🎨', color: 'from-pink-500 to-pink-700' },
  { id: 'PE', name: 'Physical Education', emoji: '⚽', color: 'from-teal-500 to-teal-700' },
]

function getSubjectsForGrade(grade: string) {
  if (grade === 'G5') {
    return SUBJECTS.filter(s => s.id !== 'Drama')
  }
  return SUBJECTS
}

export default async function SubjectPage({ params }: { params: Promise<{ grade: string }> }) {
  const session = await auth()
  const { grade } = await params

  if (!session?.user) {
    redirect('/login')
  }

  const subjects = getSubjectsForGrade(grade)

  const progressData = await prisma.studentProgress.findMany({
    where: {
      userId: session.user.id,
      grade: grade.toUpperCase()
    }
  })

  const progressMap = new Map(progressData.map(p => [p.subject, p]))

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/student" className="text-gray-600 hover:text-gray-900">← Back</Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Choose a Subject</h1>
              <p className="text-sm text-gray-600">Grade {grade.replace('G', '')}</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, index) => {
            const progress = progressMap.get(subject.id)
            const progressPercent = progress?.overallProgress || 0
            const plantEmoji = !progress ? '🌱'
              : progress.currentPlantStage === 'MIGHTY_OAK' ? '🌳✨'
                : progress.currentPlantStage === 'YOUNG_TREE' ? '🌳'
                  : progress.currentPlantStage === 'SAPLING' ? '🌿' : '🌱'

            return (
              <div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.3 }}
              >
                <Link href={`/student/${grade}/${subjectToSlug(subject.id)}`} className="block h-full">
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <CardContent className="p-6">
                      <div className={`bg-gradient-to-br ${subject.color} rounded-xl p-4 text-white mb-4`}>
                        <span className="text-4xl">{subject.emoji}</span>
                        <h3 className="text-lg font-bold mt-2">{subject.name}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-gray-600">Progress</span>
                          <span className="font-medium">{Math.round(progressPercent)}%</span>
                        </div>
                        <Progress value={progressPercent} className="h-2" />
                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Your plant:</span>
                          <span className="text-xl">{plantEmoji}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </div>
            )
          })}
        </div>
      </main>
    </div>
  )
}
