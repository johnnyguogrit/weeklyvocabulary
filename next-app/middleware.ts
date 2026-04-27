// NextAuth middleware - uses JWT only, no database access
import { NextResponse, type NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

const secret = process.env.NEXTAUTH_SECRET || ''

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret })
  const { pathname } = request.nextUrl
  const isLoggedIn = !!token
  const userRole = token?.role as string | undefined

  // Public routes
  const isPublicRoute = pathname === '/login' || pathname === '/register' || pathname === '/'

  // Redirect to login if not authenticated
  if (!isLoggedIn && !isPublicRoute) {
    const url = new URL('/login', request.url)
    return NextResponse.redirect(url)
  }

  // Redirect based on role if logged in and on auth pages
  if (isLoggedIn && (pathname === '/login' || pathname === '/register')) {
    const role = userRole || 'STUDENT'
    const dashboard = role === 'TEACHER' || role === 'ADMIN' ? '/teacher' : '/student'
    const url = new URL(dashboard, request.url)
    return NextResponse.redirect(url)
  }

  // Role-based route protection
  if (pathname.startsWith('/teacher') && userRole !== 'TEACHER' && userRole !== 'ADMIN') {
    const url = new URL('/student', request.url)
    return NextResponse.redirect(url)
  }

  if (pathname.startsWith('/student') && userRole === 'TEACHER') {
    const url = new URL('/teacher', request.url)
    return NextResponse.redirect(url)
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
}
