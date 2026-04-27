'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import { ArrowLeft, Users, Plus, Trash2, Upload, Download, FileSpreadsheet, CheckCircle, XCircle, AlertCircle } from 'lucide-react'
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
    id: string
    parentEmail?: string
    parentPhone?: string
    student: Student
  }[]
}

interface ImportResult {
  total: number
  success: number
  failed: number
  errors: Array<{ row: number; email: string; error: string }>
}

export default function ClassDetailPage() {
  const params = useParams()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [classData, setClassData] = useState<ClassData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isImporting, setIsImporting] = useState(false)
  const [isExporting, setIsExporting] = useState(false)
  const [importResult, setImportResult] = useState<ImportResult | null>(null)
  const [showErrors, setShowErrors] = useState(false)

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

  const handleExport = async () => {
    setIsExporting(true)
    try {
      const res = await fetch(`/api/teacher/classes/${params.id}/students/export`)
      if (!res.ok) throw new Error('Failed to export')

      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = res.headers.get('Content-Disposition')?.match(/filename="(.+)"/)?.[1] || 'students.xlsx'
      document.body.appendChild(a)
      a.click()
      window.URL.revokeObjectURL(url)
      document.body.removeChild(a)

      toast.success('Students exported successfully')
    } catch (error) {
      toast.error('Failed to export students')
    } finally {
      setIsExporting(false)
    }
  }

  const handleFileSelect = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    const validTypes = [
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
      'application/vnd.ms-excel', // .xls
      'text/csv' // .csv
    ]

    if (!validTypes.includes(file.type) && !file.name.endsWith('.xlsx') && !file.name.endsWith('.xls') && !file.name.endsWith('.csv')) {
      toast.error('Please upload an Excel file (.xlsx, .xls) or CSV file')
      return
    }

    setIsImporting(true)
    setImportResult(null)

    try {
      const formData = new FormData()
      formData.append('file', file)

      const res = await fetch(`/api/teacher/classes/${params.id}/students/import`, {
        method: 'POST',
        body: formData
      })

      if (!res.ok) {
        const error = await res.json()
        throw new Error(error.error || 'Failed to import students')
      }

      const data = await res.json()
      setImportResult(data.results)

      if (data.results.failed === 0) {
        toast.success(`Imported ${data.results.success} students successfully`)
      } else if (data.results.success > 0) {
        toast.warning(`Imported ${data.results.success} students, ${data.results.failed} failed`)
      } else {
        toast.error('Import failed for all students')
      }

      fetchClass()
    } catch (error: any) {
      toast.error(error.message || 'Failed to import students')
    } finally {
      setIsImporting(false)
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    }
  }

  const downloadTemplate = () => {
    // Create a simple template
    const template = [
      ['Email', 'FirstName', 'LastName', 'Grade', 'Password', 'ParentEmail', 'ParentPhone'],
      ['john1@example.com', 'John', 'Chan', 'G1', 'pass123', 'parent1@example.com', '+852-12345678'],
      ['mary2@example.com', 'Mary', 'Wong', 'G2', 'pass456', 'parent2@example.com', '+852-23456789'],
      ['peter3@example.com', 'Peter', 'Lee', 'G3', 'pass789', '', '']
    ]

    const csvContent = template.map(row => row.join(',')).join('\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'student_import_template.csv'
    document.body.appendChild(a)
    a.click()
    window.URL.revokeObjectURL(url)
    document.body.removeChild(a)
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
        {/* Import Result Card */}
        {importResult && (
          <Card className="mb-6 border-2">
            <CardHeader className="bg-gray-50">
              <CardTitle className="flex items-center gap-2">
                <FileSpreadsheet className="h-5 w-5" />
                Import Results
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-6 mb-4">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <span className="font-medium">{importResult.success} successful</span>
                </div>
                {importResult.failed > 0 && (
                  <div className="flex items-center gap-2">
                    <XCircle className="h-5 w-5 text-red-500" />
                    <span className="font-medium">{importResult.failed} failed</span>
                  </div>
                )}
                <div className="text-gray-500 text-sm">
                  {importResult.total} total records
                </div>
              </div>

              {importResult.errors.length > 0 && (
                <div className="border-t pt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowErrors(!showErrors)}
                    className="mb-2"
                  >
                    <AlertCircle className="h-4 w-4 mr-2" />
                    {showErrors ? 'Hide' : 'Show'} Errors ({importResult.errors.length})
                  </Button>

                  {showErrors && (
                    <div className="bg-red-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="text-left border-b">
                            <th className="pb-2">Row</th>
                            <th className="pb-2">Email</th>
                            <th className="pb-2">Error</th>
                          </tr>
                        </thead>
                        <tbody>
                          {importResult.errors.map((error, i) => (
                            <tr key={i} className="border-b last:border-0">
                              <td className="py-2">{error.row}</td>
                              <td className="py-2">{error.email}</td>
                              <td className="py-2 text-red-600">{error.error}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              <Button
                variant="outline"
                size="sm"
                onClick={() => setImportResult(null)}
                className="mt-4"
              >
                Dismiss
              </Button>
            </CardContent>
          </Card>
        )}

        <Card>
          <CardHeader className="flex flex-row items-center justify-between flex-wrap gap-4">
            <CardTitle>Students</CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Button size="sm" variant="outline" onClick={downloadTemplate}>
                <Download className="h-4 w-4 mr-2" />
                Template
              </Button>
              <Button size="sm" variant="outline" onClick={handleExport} disabled={isExporting || classData.enrollments.length === 0}>
                {isExporting ? 'Exporting...' : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Export
                  </>
                )}
              </Button>
              <Button size="sm" variant="outline" onClick={handleFileSelect} disabled={isImporting}>
                {isImporting ? 'Importing...' : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Import
                  </>
                )}
              </Button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button size="sm" onClick={() => {
                localStorage.setItem('selectedClassId', params.id as string)
                router.push('/teacher/students')
              }}>
                <Plus className="h-4 w-4 mr-2" />
                Add Student
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {classData.enrollments.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-4">No students enrolled yet</p>
                <div className="flex justify-center gap-3">
                  <Button onClick={downloadTemplate} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleFileSelect} disabled={isImporting}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Excel
                  </Button>
                  <Button onClick={() => {
                    localStorage.setItem('selectedClassId', params.id as string)
                    router.push('/teacher/students')
                  }}>
                    <Plus className="h-4 w-4 mr-2" />
                    Browse Students
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {classData.enrollments.map(({ student, id, parentEmail, parentPhone }) => (
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
                        {(parentEmail || parentPhone) && (
                          <p className="text-xs text-gray-500">
                            {parentEmail && `Parent: ${parentEmail}`}
                            {parentEmail && parentPhone && ' • '}
                            {parentPhone}
                          </p>
                        )}
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
