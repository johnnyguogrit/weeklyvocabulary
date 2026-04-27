// Middleware disabled - authentication handled at route level
// See: app/(auth)/login/page.tsx and layouts for auth checks

export default function middleware() {
  // No-op - let all requests through
}

export const config = {
  matcher: [],
}
