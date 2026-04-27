import { auth } from '@/lib/auth'
import { NextResponse } from 'next/server'

export const runtime = 'nodejs'

export default auth((req) => {
  const { pathname } = req.nextUrl
  const isLoggedIn = !!req.auth
  const userRole = (req.auth?.user as any)?.role

  // Public routes
  const isPublicRoute = pathname === '/login' || pathname === '/register' || pathname === '/'

  // Redirect to login if not authenticated
  if (!isLoggedIn && !isPublicRoute) {
    return NextResponse.redirect(new URL('/login', req.url))
  }

  // Redirect based on role if logged in and on auth pages
  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    const role = userRole || 'STUDENT'
    const dashboard = role === 'TEACHER' || role === 'ADMIN' ? '/teacher' : '/student'
    return NextResponse.redirect(new URL(dashboard, req.url))
  }

  // Role-based route protection
  if (pathname.startsWith('/teacher') && userRole !== 'TEACHER' && userRole !== 'ADMIN') {
    return NextResponse.redirect(new URL('/student', req.url))
  }

  if (pathname.startsWith('/student') && userRole === 'TEACHER') {
    return NextResponse.redirect(new URL('/teacher', req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api/auth (auth routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
