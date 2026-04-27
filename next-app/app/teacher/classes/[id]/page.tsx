'use client'

import { useEffect, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowLeft, Users, Plus, Trash2 } from 'lucide-react'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  email: string
  studentProgress: Array<{
    id: string
    grade: string
    subject: string
    overallProgress: number
    totalScore: number
  }>
}

interface ClassData {
  id: string
  name: string
  grade: string
  enrollments: {
    student: Student
  }[]
}

export default function ClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [classData, setClassData] = useState<ClassData | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchClass()
  }, [])

  const fetchClass = async () => {
    try {
      const res = await fetch(`/api/teacher/classes/${params.id}`)
      if (!res.ok) throw new Error('Failed to fetch class')
      const data = await res.json()
      setClassData(data.class)
    } catch (error) {
      toast.error('Failed to load class')
      router.push('/teacher/classes')
    } finally {
      setIsLoading(false)
    }
  }

  const handleRemoveStudent = async (studentId: string) => {
    if (!confirm('Remove this student from the class?')) return

    try {
      const res = await fetch(`/api/teacher/classes/${params.id}/students/${studentId}`, {
        method: 'DELETE'
      })
      if (!res.ok) throw new Error('Failed to remove student')
      toast.success('Student removed')
      fetchClass()
    } catch (error) {
      toast.error('Failed to remove student')
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    )
  }

  if (!classData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-gray-600">Class not found</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-4">
            <Link href="/teacher/classes" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-gray-900">{classData.name}</h1>
              <p className="text-sm text-gray-600">Grade {classData.grade} • {classData.enrollments.length} students</p>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Students</CardTitle>
            <Button size="sm" onClick={() => {
              localStorage.setItem('selectedClassId', params.id as string)
              router.push('/teacher/students')
            }}>
              <Plus className="h-4 w-4 mr-2" />
              Add Student
            </Button>
          </CardHeader>
          <CardContent>
            {classData.enrollments.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No students enrolled yet</p>
                <Button onClick={() => {
                  localStorage.setItem('selectedClassId', params.id as string)
                  router.push('/teacher/students')
                }}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Students
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {classData.enrollments.map(({ student }) => (
                  <div
                    key={student.id}
                    className="flex items-center justify-between p-4 rounded-lg border hover:bg-gray-50"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <span className="text-blue-600 font-medium">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{student.name}</p>
                        <p className="text-sm text-gray-600">{student.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right text-sm">
                        <p className="text-gray-600">
                          {student.studentProgress.length} subject{student.studentProgress.length !== 1 ? 's' : ''}
                        </p>
                        <p className="font-medium">
                          {student.studentProgress.length > 0
                            ? Math.round(student.studentProgress.reduce((sum, p) => sum + p.overallProgress, 0) / student.studentProgress.length)
                            : 0}% avg progress
                        </p>
                      </div>
                      <button
                        onClick={() => handleRemoveStudent(student.id)}
                        className="text-gray-400 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </div>
  )
}
