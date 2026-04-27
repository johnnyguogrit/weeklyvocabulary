import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { jwtDecode } from 'jwt-decode'

// Session cookie name from NextAuth
const SESSION_COOKIE_NAME = 'next-auth.session-token'
const SECURE_SESSION_COOKIE_NAME = '__Secure-next-auth.session-token'

interface JWTPayload {
  id: string
  email: string
  name?: string
  picture?: string
  role?: string
  iat: number
  exp: number
}

function getSessionToken(req: NextRequest): string | null {
  // Try both cookie names (http vs https)
  const token = req.cookies.get(SESSION_COOKIE_NAME)?.value ||
                req.cookies.get(SECURE_SESSION_COOKIE_NAME)?.value
  return token || null
}

function decodeSession(token: string): JWTPayload | null {
  try {
    return jwtDecode<JWTPayload>(token)
  } catch {
    return null
  }
}

export default function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl
  const token = getSessionToken(req)
  const session = token ? decodeSession(token) : null
  const isLoggedIn = !!session
  const userRole = session?.role

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
}

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
