import Link from 'next/link'
import { motion } from 'framer-motion'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent } from '@/components/ui/card'

const grades = [
  { id: 'G1', name: 'Grade 1', emoji: '🌱', color: 'from-green-400 to-green-600', age: '6-7' },
  { id: 'G2', name: 'Grade 2', emoji: '🌿', color: 'from-blue-400 to-blue-600', age: '7-8' },
  { id: 'G3', name: 'Grade 3', emoji: '🌳', color: 'from-purple-400 to-purple-600', age: '8-9' },
  { id: 'G4', name: 'Grade 4', emoji: '🌳✨', color: 'from-orange-400 to-orange-600', age: '9-10' },
  { id: 'G5', name: 'Grade 5', emoji: '🌳🌟', color: 'from-pink-400 to-pink-600', age: '10-11' },
]

export default async function StudentWelcomePage() {
  const session = await auth()

  if (!session?.user) {
    redirect('/login')
  }

  // Get user's recent progress
  const recentProgress = await prisma.studentProgress.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: 'desc' },
    take: 3,
    include: {
      weekProgress: {
        where: { completed: true },
        orderBy: { weekId: 'desc' },
        take: 1
      }
    }
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🌱</span>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Vocabulary Adventure</h1>
                <p className="text-sm text-gray-600">Welcome back, {session.user.name}!</p>
              </div>
            </div>
            <form action="/api/auth/signout" method="POST">
              <button type="submit" className="text-sm text-gray-600 hover:text-gray-900">
                Sign Out
              </button>
            </form>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Grade! 🎮
          </h2>
          <p className="text-lg text-gray-600">
            Learn new words through fun quizzes and grow your vocabulary garden!
          </p>
        </motion.div>

        {/* Recent Progress */}
        {recentProgress.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Continue Learning</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentProgress.map((progress) => {
                    const lastWeek = progress.weekProgress[0]
                    const plantEmoji = progress.currentPlantStage === 'MIGHTY_OAK' ? '🌳✨'
                      : progress.currentPlantStage === 'YOUNG_TREE' ? '🌳'
                        : progress.currentPlantStage === 'SAPLING' ? '🌿' : '🌱'
                    return (
                      <Link
                        key={progress.id}
                        href={`/student/${progress.grade}/${progress.subject}`}
                        className="block p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-gray-900">{progress.subject}</span>
                          <span className="text-2xl">{plantEmoji}</span>
                        </div>
                        <p className="text-sm text-gray-600">Grade {progress.grade}</p>
                        <div className="mt-2 h-2 bg-gray-200 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-green-500 rounded-full"
                            style={{ width: `${progress.overallProgress}%` }}
                          />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{Math.round(progress.overallProgress)}% complete</p>
                      </Link>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Grade Selection */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {grades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1, duration: 0.3 }}
            >
              <Link href={`/student/${grade.id}`} className="block h-full">
                <div className={`bg-gradient-to-br ${grade.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center justify-center gap-4`}>
                  <span className="text-6xl">{grade.emoji}</span>
                  <span className="text-2xl font-bold">{grade.name}</span>
                  <span className="text-sm opacity-90">Ages {grade.age}</span>
                  <span className="text-sm opacity-90 mt-auto">Start Learning →</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  )
}
