import Link from 'next/link'
import { auth } from '@/lib/auth'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/db'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, BookOpen, Trophy, TrendingUp } from 'lucide-react'

export default async function TeacherPage() {
  const session = await auth()

  if (!session?.user || (session.user as any).role !== 'TEACHER') {
    redirect('/login')
  }

  const teacherId = session.user.id

  // Fetch teacher's classes and statistics
  const classes = await prisma.class.findMany({
    where: { teacherId },
    include: {
      enrollments: {
        include: {
          student: {
            include: {
              studentProgress: true
            }
          }
        }
      }
    }
  })

  const totalStudents = classes.reduce((sum, cls) => sum + cls.enrollments.length, 0)
  const totalProgress = classes.reduce((sum, cls) => {
    return sum + cls.enrollments.reduce((s, e) => s + e.student.studentProgress.reduce((sp, p) => sp + p.overallProgress, 0), 0)
  }, 0)
  const avgProgress = totalStudents > 0 ? Math.round(totalProgress / totalStudents) : 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Teacher Portal</h1>
              <p className="text-gray-600">Welcome, {session.user.name}</p>
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
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Classes</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{classes.length}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Total Students</CardTitle>
              <Users className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalStudents}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Avg Progress</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{avgProgress}%</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">Completed Weeks</CardTitle>
              <Trophy className="h-4 w-4 text-yellow-600" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {classes.reduce((sum, cls) => {
                  return sum + cls.enrollments.reduce((s, e) => {
                    return s + e.student.studentProgress.filter(p => p.overallProgress >= 100).length
                  }, 0)
                }, 0)}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Classes List */}
        <Card>
          <CardHeader>
            <CardTitle>My Classes</CardTitle>
          </CardHeader>
          <CardContent>
            {classes.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">No classes yet. Create your first class!</p>
                <Link
                  href="/teacher/classes"
                  className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  Create Class
                </Link>
              </div>
            ) : (
              <div className="space-y-4">
                {classes.map((cls) => (
                  <Link
                    key={cls.id}
                    href={`/teacher/classes/${cls.id}`}
                    className="block p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{cls.name}</h3>
                        <p className="text-sm text-gray-600">Grade {cls.grade} • {cls.enrollments.length} students</p>
                      </div>
                      <span className="text-gray-400">→</span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
