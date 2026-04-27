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

export default function RegisterPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'STUDENT'
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match')
      return
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters')
      return
    }

    setIsLoading(true)

    try {
      // Register
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: formData.role
        })
      })

      const data = await res.json()
      console.log('Register response:', data)

      if (!res.ok) {
        toast.error(data.error || 'Registration failed')
        setIsLoading(false)
        return
      }

      toast.success('Account created! Signing you in...')

      // Auto sign in
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      console.log('Auto sign in result:', result)

      if (result?.error) {
        console.error('Auto sign in error:', result.error)
        toast.error(`Account created but login failed: ${result.error}. Please try manual login.`)
        setIsLoading(false)
      } else if (result?.ok) {
        toast.success('Welcome to Vocabulary Adventure!')
        // Force a hard redirect to ensure session is loaded
        const redirectPath = formData.role === 'TEACHER' ? '/teacher' : '/student'
        window.location.href = redirectPath
      } else {
        toast.error('Account created. Please login manually.')
        setIsLoading(false)
        router.push('/login')
      }
    } catch (error) {
      console.error('Registration error:', error)
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="space-y-1 text-center">
          <div className="text-5xl mb-4">🌱</div>
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join Vocabulary Adventure and start learning!</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                type="text"
                placeholder="Your name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">I am a...</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  type="button"
                  variant={formData.role === 'STUDENT' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, role: 'STUDENT' })}
                  disabled={isLoading}
                  className="h-12"
                >
                  👦 Student
                </Button>
                <Button
                  type="button"
                  variant={formData.role === 'TEACHER' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, role: 'TEACHER' })}
                  disabled={isLoading}
                  className="h-12"
                >
                  👨‍🏫 Teacher
                </Button>
              </div>
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
                minLength={6}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                required
                disabled={isLoading}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </Button>
          </form>

          <div className="mt-6 text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link href="/login" className="text-blue-600 hover:underline font-medium">
              Sign In
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
