'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'
import { signOut } from 'next-auth/react'

const grades = [
  { id: 'G1', name: 'Grade 1', emoji: '🌱', color: 'from-green-400 to-green-600', age: '6-7' },
  { id: 'G2', name: 'Grade 2', emoji: '🌿', color: 'from-blue-400 to-blue-600', age: '7-8' },
  { id: 'G3', name: 'Grade 3', emoji: '🌳', color: 'from-purple-400 to-purple-600', age: '8-9' },
  { id: 'G4', name: 'Grade 4', emoji: '🌳✨', color: 'from-orange-400 to-orange-600', age: '9-10' },
  { id: 'G5', name: 'Grade 5', emoji: '🌳🌟', color: 'from-pink-400 to-pink-600', age: '10-11' },
]

interface RecentProgress {
  subject: string
  grade: string
  overallProgress: number
}

export default function StudentWelcomePage() {
  const router = useRouter()
  const [userName, setUserName] = useState('')
  const [recentProgress, setRecentProgress] = useState<RecentProgress[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Fetch user session and progress
    const fetchData = async () => {
      try {
        // Fetch user info
        const userRes = await fetch('/api/user/me')
        if (userRes.ok) {
          const userData = await userRes.json()
          setUserName(userData.user?.name || 'Student')
        }

        // Fetch recent progress
        const progressRes = await fetch('/api/user/progress')
        if (progressRes.ok) {
          const progressData = await progressRes.json()
          setRecentProgress(progressData.recent || [])
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

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
                <p className="text-sm text-gray-600">Welcome back, {userName}!</p>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Choose Your Grade</h2>
          <p className="text-gray-600">Select your grade to begin your vocabulary adventure!</p>
        </motion.div>

        {/* Grades Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {grades.map((grade, index) => (
            <motion.div
              key={grade.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Link href={`/student/${grade.id}`}>
                <Card className="h-full cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6">
                    <div className={`w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br ${grade.color} flex items-center justify-center text-4xl shadow-lg`}>
                      {grade.emoji}
                    </div>
                    <h3 className="text-xl font-bold text-center text-gray-900 mb-1">{grade.name}</h3>
                    <p className="text-sm text-center text-gray-500">{grade.age} years</p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Recent Progress */}
        {recentProgress.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-12"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-4">Continue Learning</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {recentProgress.map((progress) => (
                <Link key={`${progress.grade}-${progress.subject}`} href={`/student/${progress.grade}/${progress.subject}`}>
                  <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-900">{progress.subject}</p>
                          <p className="text-sm text-gray-500">{progress.grade}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-bold text-blue-600">{progress.overallProgress}%</p>
                          <p className="text-xs text-gray-500">Progress</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
