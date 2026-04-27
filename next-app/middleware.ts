// Middleware disabled to avoid Edge Runtime issues with NextAuth + Prisma
// Authentication is now handled at the route level using server-side auth checks

export default function middleware() {
  // Pass through all requests
  return
}

export const config = {
  matcher: [],
}
