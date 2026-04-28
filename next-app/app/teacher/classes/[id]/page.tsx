'use client'

import { useEffect, useState, useRef } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'
import { ArrowLeft, Users, Plus, Trash2, Upload, Download, FileSpreadsheet, CheckCircle, XCircle, AlertCircle, UserPlus, LogOut, Copy } from 'lucide-react'
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
    initialPassword?: string
    student: Student
  }[]
}

interface ImportResult {
  total: number
  success: number
  failed: number
  errors: Array<{ row: number; email: string; error: string }>
  students?: Array<{ name: string; email: string; password: string }>
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
  // Store recently imported passwords { email: password }
  const [recentPasswords, setRecentPasswords] = useState<Record<string, string>>({})

  // Single student addition
  const [showAddStudentDialog, setShowAddStudentDialog] = useState(false)
  const [isAddingStudent, setIsAddingStudent] = useState(false)
  const [newStudent, setNewStudent] = useState({
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    parentEmail: '',
    parentPhone: ''
  })

  useEffect(() => {
    fetchClass()
  }, [])

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/login' })
  }

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

      // Store passwords for recently imported students
      if (data.results.students) {
        const passwordMap: Record<string, string> = {}
        data.results.students.forEach((s: any) => {
          passwordMap[s.email] = s.password
        })
        setRecentPasswords(prev => ({ ...prev, ...passwordMap }))
      }

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
      ['john1@example.com', 'John', 'Chan', classData?.grade || 'G1', 'pass123', 'parent1@example.com', '+852-12345678'],
      ['mary2@example.com', 'Mary', 'Wong', classData?.grade || 'G1', 'pass456', 'parent2@example.com', '+852-23456789'],
      ['peter3@example.com', 'Peter', 'Lee', classData?.grade || 'G1', 'pass789', '', '']
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

  const handleAddSingleStudent = async () => {
    // Validate
    if (!newStudent.email || !newStudent.firstName || !newStudent.lastName) {
      toast.error('Please fill in all required fields')
      return
    }

    if (!newStudent.email.includes('@')) {
      toast.error('Please enter a valid email')
      return
    }

    setIsAddingStudent(true)

    try {
      // First, create the user account via register API
      const registerRes = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: `${newStudent.firstName} ${newStudent.lastName}`,
          email: newStudent.email,
          password: newStudent.password || 'password123',
          role: 'STUDENT'
        })
      })

      if (!registerRes.ok) {
        const error = await registerRes.json()
        // If user already exists, that's okay - just enroll them
        if (error.error?.includes('already exists')) {
          toast.info('Student already exists - enrolling to class...')
        } else {
          throw new Error(error.error || 'Failed to create student')
        }
      }

      // Now enroll the student to the class
      const enrollRes = await fetch(`/api/teacher/classes/${params.id}/students/enroll-existing`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: newStudent.email,
          parentEmail: newStudent.parentEmail || null,
          parentPhone: newStudent.parentPhone || null,
          initialPassword: passwordUsed
        })
      })

      if (!enrollRes.ok) {
        const error = await enrollRes.json()
        throw new Error(error.error || 'Failed to enroll student')
      }

      const passwordUsed = newStudent.password || 'password123'
      // Store password for recently added student
      setRecentPasswords(prev => ({ ...prev, [newStudent.email]: passwordUsed }))
      toast.success(
        `Student added! Password: ${passwordUsed}`,
        { duration: 5000 }
      )
      setShowAddStudentDialog(false)
      setNewStudent({
        email: '',
        firstName: '',
        lastName: '',
        password: '',
        parentEmail: '',
        parentPhone: ''
      })
      fetchClass()
    } catch (error: any) {
      toast.error(error.message || 'Failed to add student')
    } finally {
      setIsAddingStudent(false)
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/teacher/classes" className="text-gray-600 hover:text-gray-900">
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{classData.name}</h1>
                <p className="text-sm text-gray-600">Grade {classData.grade} • {classData.enrollments.length} students</p>
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

              {/* Imported Students with Passwords */}
              {importResult.students && importResult.students.length > 0 && (
                <div className="border-t pt-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">Imported Students</h3>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const csvContent = [
                          ['Name', 'Email', 'Password'],
                          ...importResult.students.map((s: any) => [s.name, s.email, s.password])
                        ].map((row: string[]) => row.join(',')).join('\n')
                        const blob = new Blob([csvContent], { type: 'text/csv' })
                        const url = window.URL.createObjectURL(blob)
                        const a = document.createElement('a')
                        a.href = url
                        a.download = `imported_students_passwords_${new Date().toISOString().split('T')[0]}.csv`
                        document.body.appendChild(a)
                        a.click()
                        window.URL.revokeObjectURL(url)
                        document.body.removeChild(a)
                      }}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Passwords
                    </Button>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4 max-h-60 overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="text-left border-b">
                          <th className="pb-2">Name</th>
                          <th className="pb-2">Email</th>
                          <th className="pb-2">Password</th>
                        </tr>
                      </thead>
                      <tbody>
                        {importResult.students.map((student: any, i: number) => (
                          <tr key={i} className="border-b last:border-0">
                            <td className="py-2 font-medium">{student.name}</td>
                            <td className="py-2 text-gray-600">{student.email}</td>
                            <td className="py-2">
                              <code className="bg-white px-2 py-1 rounded text-blue-600 font-mono">
                                {student.password}
                              </code>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

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
              <Button size="sm" onClick={() => setShowAddStudentDialog(true)}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add Single
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {classData.enrollments.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-16 w-16 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 mb-2">No students enrolled yet</p>
                <p className="text-gray-400 text-sm mb-6">Download the template, fill in student data, and import to add students</p>
                <div className="flex justify-center gap-3">
                  <Button onClick={downloadTemplate} variant="outline">
                    <Download className="h-4 w-4 mr-2" />
                    Download Template
                  </Button>
                  <Button size="sm" variant="outline" onClick={handleFileSelect} disabled={isImporting}>
                    <Upload className="h-4 w-4 mr-2" />
                    Import Excel
                  </Button>
                  <Button size="sm" onClick={() => setShowAddStudentDialog(true)}>
                    <UserPlus className="h-4 w-4 mr-2" />
                    Add Single Student
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {classData.enrollments.map(({ student, id, parentEmail, parentPhone, initialPassword }) => (
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
                      {/* Show password button if stored in database or recently imported */}
                      {(initialPassword || recentPasswords[student.email]) && (
                        <div className="flex items-center gap-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700">
                            {initialPassword || recentPasswords[student.email]}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              navigator.clipboard.writeText(initialPassword || recentPasswords[student.email])
                              toast.success('Password copied to clipboard')
                            }}
                            className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                            title="Copy password"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
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

      {/* Add Single Student Dialog */}
      <Dialog open={showAddStudentDialog} onOpenChange={setShowAddStudentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add Student to Class</DialogTitle>
            <DialogDescription>
              Create a new student account and add them to {classData.name}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name *</Label>
                <Input
                  id="firstName"
                  placeholder="John"
                  value={newStudent.firstName}
                  onChange={(e) => setNewStudent({ ...newStudent, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name *</Label>
                <Input
                  id="lastName"
                  placeholder="Chan"
                  value={newStudent.lastName}
                  onChange={(e) => setNewStudent({ ...newStudent, lastName: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="addEmail">Email *</Label>
              <Input
                id="addEmail"
                type="email"
                placeholder="student@example.com"
                value={newStudent.email}
                onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addPassword">Password</Label>
              <Input
                id="addPassword"
                type="password"
                placeholder="Leave empty for default password"
                value={newStudent.password}
                onChange={(e) => setNewStudent({ ...newStudent, password: e.target.value })}
              />
              <p className="text-xs text-gray-500">Default: password123</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="parentEmail">Parent Email</Label>
                <Input
                  id="parentEmail"
                  type="email"
                  placeholder="parent@example.com"
                  value={newStudent.parentEmail}
                  onChange={(e) => setNewStudent({ ...newStudent, parentEmail: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="parentPhone">Parent Phone</Label>
                <Input
                  id="parentPhone"
                  placeholder="+852-..."
                  value={newStudent.parentPhone}
                  onChange={(e) => setNewStudent({ ...newStudent, parentPhone: e.target.value })}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddStudentDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSingleStudent} disabled={isAddingStudent}>
              {isAddingStudent ? 'Adding...' : 'Add Student'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
