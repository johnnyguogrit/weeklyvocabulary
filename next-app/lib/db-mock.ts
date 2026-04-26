// Mock Prisma client for development when Prisma is not installed
// Replace this with the actual Prisma client once installed

export const prisma = {
  user: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    delete: async () => null,
  },
  studentProgress: {
    findUnique: async () => null,
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
    upsert: async () => null,
  },
  weekProgress: {
    findMany: async () => [],
    create: async () => null,
    update: async () => null,
  },
  quizSession: {
    create: async () => null,
    update: async () => null,
    findUnique: async () => null,
  },
  class: {
    findMany: async () => [],
    create: async () => null,
  },
}

// Types for development
export type { User, StudentProgress, WeekProgress, QuizSession } from '../types/database'
