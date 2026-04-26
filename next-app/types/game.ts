export type Grade = 'G1' | 'G2' | 'G3' | 'G4' | 'G5';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type PlantStage = 'seedling' | 'sapling' | 'young_tree' | 'mighty_oak';
export type QuestionType = 'multipleChoice' | 'fillBlank' | 'context';

export interface Question {
  id: string;
  type: QuestionType;
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  emoji?: string;
  weekId: number;
}

export interface ReadingPassage {
  weekId: number;
  title: string;
  passage: string;
  questions: {
    question: string;
    options: string[];
    correctAnswer: string;
    explanation: string;
  }[];
}

export interface WeekData {
  id: number;
  title: string;
  color: string;
  emoji: string;
  keywords: string[];
  questions: Question[];
}

export interface SubjectData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  weeks: WeekData[];
  passages: ReadingPassage[];
}

export interface WeekProgress {
  weekId: number;
  completed: boolean;
  score: number;
  questionsCorrect: number;
  questionsTotal: number;
  readingCompCorrect: number;
  readingCompTotal: number;
  keywordsMastered: string[];
  locked: boolean;
}

export interface SubjectProgress {
  subject: string;
  weekProgress: WeekProgress[];
  totalScore: number;
  overallProgress: number;
  currentPlantStage: PlantStage;
}

export interface GradeProgress {
  grade?: Grade;
  subjects: Record<string, SubjectProgress>;
}

export interface PlayerState {
  name: string;
  difficulty: Difficulty;
  currentGrade: Grade | null;
  currentSubject: string | null;
  gradeProgress: Record<Grade, GradeProgress>;
  currentWeek: number | null;
}

export interface QuizState {
  currentQuestionIndex: number;
  selectedAnswer: string | null;
  isAnswered: boolean;
  isCorrect: boolean;
  timeRemaining: number;
  scoreThisQuestion: number;
  showHint: boolean;
  livesRemaining: number;
  totalQuestions: number;
  correctCount: number;
  speedBonusCount: number;
}

export const DIFFICULTY_CONFIG = {
  easy: { timer: 0, hints: true, label: 'Easy Explorer', emoji: '🌱', description: 'Take your time, use hints!' },
  medium: { timer: 30, hints: true, label: 'Brave Scholar', emoji: '🌿', description: '30 seconds per question' },
  hard: { timer: 15, hints: false, label: 'Math Master', emoji: '🌳', description: '15 seconds, no hints!' },
};
