// Re-export existing game types
export type * from './game'
export type * from './database'

// Extended types for Next.js app
export interface UserSession {
  user: {
    id: string
    email: string
    name?: string | null
    image?: string | null
    role: 'STUDENT' | 'TEACHER' | 'ADMIN'
  }
  expires: string
}

export interface ApiContext {
  userId: string
  userRole: 'STUDENT' | 'TEACHER' | 'ADMIN'
}
