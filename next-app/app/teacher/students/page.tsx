'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ArrowLeft, Search, UserPlus, Mail } from 'lucide-react'
import Link from 'next/link'

interface Student {
  id: string
  name: string
  email: string
  grade: string
  studentProgress: Array<{
    id: string
    grade: string
    subject: string
    overallProgress: number
    totalScore: number
  }>
}

export default function StudentsPage() {
  const router = useRouter()
  const [students, setStudents] = useState<Student[]>([])
  const [filtered, setFiltered] = useState<Student[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [enrolling, setEnrolling] = useState<string | null>(null)

  useEffect(() => {
    fetchStudents()
  }, [])

  useEffect(() => {
    if (search) {
      setFiltered(students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase())
      ))
    } else {
      setFiltered(students)
    }
  }, [search, students])

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/teacher/students')
      if (!res.ok) throw new Error('Failed to fetch students')
      const data = await res.json()
      setStudents(data.students || [])
      setFiltered(data.students || [])
    } catch (error) {
      toast.error('Failed to load students')
    } finally {
      setIsLoading(false)
    }
  }

  const handleEnroll = async (studentId: string) => {
    const classId = localStorage.getItem('selectedClassId')
    if (!classId) {
      toast.error('Please select a class first')
      router.push('/teacher/classes')
      return
    }

    setEnrolling(studentId)
    try {
      const res = await fetch(`/api/teacher/classes/${classId}/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ studentId })
      })
      if (!res.ok) throw new Error('Failed to enroll student')
      toast.success('Student enrolled successfully')
      router.push(`/teacher/classes/${classId}`)
    } catch (error) {
      toast.error('Failed to enroll student')
    } finally {
      setEnrolling(null)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
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
            <h1 className="text-xl font-bold text-gray-900">All Students</h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-4">
              <CardTitle>Students Directory</CardTitle>
              <div className="flex-1 max-w-md relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search by name or email..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <Mail className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {search ? 'No students match your search' : 'No students registered yet'}
                </p>
              </div>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((student) => (
                  <div
                    key={student.id}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <span className="text-blue-600 font-semibold">
                          {student.name.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 truncate">{student.name}</h3>
                        <p className="text-sm text-gray-600 truncate">{student.email}</p>
                        <p className="text-xs text-gray-500 mt-1">Grade {student.grade}</p>
                      </div>
                    </div>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {student.studentProgress.length} subject{student.studentProgress.length !== 1 ? 's' : ''}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => handleEnroll(student.id)}
                        disabled={enrolling === student.id}
                      >
                        {enrolling === student.id ? (
                          'Adding...'
                        ) : (
                          <>
                            <UserPlus className="h-4 w-4 mr-1" />
                            Add to Class
                          </>
                        )}
                      </Button>
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
