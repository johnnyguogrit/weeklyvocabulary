'use client'

import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { toast } from 'sonner'
import Link from 'next/link'

type UserRole = 'STUDENT' | 'TEACHER'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [role, setRole] = useState<UserRole>('STUDENT')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        role: role,
        redirect: false
      })

      console.log('Sign in result:', result)

      if (result?.error) {
        console.error('Sign in error:', result.error)
        toast.error(`Login failed: ${result.error}`)
      } else if (result?.ok) {
        toast.success('Login successful! Redirecting...')
        // Redirect based on role
        const redirectUrl = role === 'TEACHER' ? '/teacher' : '/student'
        window.location.href = redirectUrl
      } else {
        toast.error('Unknown error occurred')
      }
    } catch (error) {
      console.error('Login exception:', error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="text-5xl mb-4">{role === 'TEACHER' ? '👨‍🏫' : '👦'}</div>
          <CardTitle className="text-2xl font-bold">
            {role === 'TEACHER' ? 'Teacher Portal' : 'Student Portal'}
          </CardTitle>
          <CardDescription>
            {role === 'TEACHER'
              ? 'Sign in to manage your classes'
              : 'Sign in to continue your learning journey'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role Tabs */}
          <div className="flex mb-6 bg-gray-100 rounded-lg p-1">
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                role === 'STUDENT'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👦 Student
            </button>
            <button
              type="button"
              onClick={() => setRole('TEACHER')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-all ${
                role === 'TEACHER'
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              👨‍🏫 Teacher
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder={role === 'TEACHER' ? 'teacher@school.com' : 'student@school.com'}
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Don't have an account? </span>
            <Link href="/register" className="text-blue-600 hover:underline font-medium">
              Teacher Sign Up
            </Link>
          </div>

          <div className="mt-4 text-center text-sm text-muted-foreground">
            <p>Demo Accounts:</p>
            <div className="mt-2 space-y-1 text-xs">
              {role === 'TEACHER' ? (
                <p>👨‍🏫 Teacher: teacher@school.com / teacher123</p>
              ) : (
                <p>👦 Student: student@school.com / student123</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
