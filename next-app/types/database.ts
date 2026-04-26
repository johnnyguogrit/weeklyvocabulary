// Types derived from Prisma schema for use in components
import { Role, Grade, Difficulty, PlantStage, QuizStatus } from '@prisma/client'

export type { Role, Grade, Difficulty, PlantStage, QuizStatus }

// User types
export interface User {
  id: string
  email: string
  name: string | null
  image: string | null
  role: Role
  createdAt: Date
  updatedAt: Date
}

export interface StudentProgressWithWeeks {
  id: string
  userId: string
  grade: Grade
  subject: string
  difficulty: Difficulty
  totalScore: number
  overallProgress: number
  currentPlantStage: PlantStage
  weekProgress: WeekProgress[]
}

export interface WeekProgress {
  id: string
  studentProgressId: string
  weekId: number
  completed: boolean
  locked: boolean
  score: number
  questionsCorrect: number
  questionsTotal: number
  readingCompCorrect: number
  readingCompTotal: number
  keywordsMastered: string // JSON string
}

export interface QuizSession {
  id: string
  userId: string
  grade: Grade
  subject: string
  weekId: number
  difficulty: Difficulty
  currentQuestionIndex: number
  selectedAnswer: string | null
  isAnswered: boolean
  isCorrect: boolean
  timeRemaining: number
  livesRemaining: number
  scoreThisQuestion: number
  correctCount: number
  speedBonusCount: number
  answersHistory: string // JSON string
  status: QuizStatus
  startedAt: Date
  completedAt: Date | null
}

export interface Class {
  id: string
  name: string
  teacherId: string
  grade: Grade
  createdAt: Date
  updatedAt: Date
  _count?: {
    enrollments: number
  }
}

// API Request/Response types
export interface CreateStudentRequest {
  email: string
  name: string
  password?: string
  grade?: Grade
}

export interface UpdateProgressRequest {
  weekId: number
  score: number
  questionsCorrect: number
  questionsTotal: number
  readingCompCorrect?: number
  readingCompTotal?: number
  keywordsMastered?: string[]
  completed?: boolean
}

export interface CreateQuizSessionRequest {
  grade: Grade
  subject: string
  weekId: number
  difficulty: Difficulty
}

export interface SubmitAnswerRequest {
  answer: string
  timeSpent: number
}
