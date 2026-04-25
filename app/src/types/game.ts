export type Grade = 'G1' | 'G2' | 'G3' | 'G4' | 'G5';
export type Difficulty = 'easy' | 'medium' | 'hard';
export type PlantStage = 'seedling' | 'sapling' | 'young_tree' | 'mighty_oak';
export type GameScreen = 'welcome' | 'gradeSelect' | 'subjectSelect' | 'difficulty' | 'weekMap' | 'quiz' | 'readingComp' | 'weekComplete' | 'results';
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
} as const;

export const PLANT_STAGES: Record<PlantStage, { emoji: string; label: string; threshold: number }> = {
  seedling: { emoji: '🌱', label: 'Seedling', threshold: 0 },
  sapling: { emoji: '🌿', label: 'Sapling', threshold: 21 },
  young_tree: { emoji: '🌳', label: 'Young Tree', threshold: 51 },
  mighty_oak: { emoji: '🌳✨', label: 'Mighty Oak', threshold: 81 },
};

export const GRADE_CONFIG: Record<Grade, { name: string; emoji: string; color: string; description: string }> = {
  G1: { name: 'Grade 1', emoji: '🌱', color: '#66BB6A', description: 'Ages 6-7: First steps in learning' },
  G2: { name: 'Grade 2', emoji: '🌿', color: '#42A5F5', description: 'Ages 7-8: Growing knowledge' },
  G3: { name: 'Grade 3', emoji: '🍃', color: '#FFA726', description: 'Ages 8-9: Building skills' },
  G4: { name: 'Grade 4', emoji: '🌳', color: '#AB47BC', description: 'Ages 9-10: Expanding understanding' },
  G5: { name: 'Grade 5', emoji: '🏆', color: '#EF5350', description: 'Ages 10-11: Mastering vocabulary' },
};

export const SUBJECT_CONFIG: Record<string, { name: string; emoji: string; color: string; description: string }> = {
  Maths: { name: 'Mathematics', emoji: '🔢', color: '#2E7D32', description: 'Numbers, shapes & operations' },
  Science: { name: 'Science', emoji: '🔬', color: '#1565C0', description: 'Nature, body & physics' },
  STEAM: { name: 'STEAM', emoji: '💻', color: '#6A1B9A', description: 'Coding, tech & design' },
  Music: { name: 'Music', emoji: '🎵', color: '#E65100', description: 'Singing, rhythm & performance' },
  'Performing Arts': { name: 'Performing Arts', emoji: '🎭', color: '#C62828', description: 'Dance, movement & expression' },
  Drama: { name: 'Drama', emoji: '🎬', color: '#5D4037', description: 'Acting, theater & scripts' },
  'Visual Arts': { name: 'Visual Arts', emoji: '🎨', color: '#AD1457', description: 'Drawing, painting & crafts' },
  PE: { name: 'PE', emoji: '⚽', color: '#00695C', description: 'Sports, fitness & teamwork' },
};

export const WEEK_NAMES: Record<number, string> = {
  2: 'Getting Started',
  3: 'Building Up',
  4: 'Exploring',
  5: 'Review Week',
  7: 'Going Deeper',
  8: 'Practice Time',
  9: 'New Skills',
  10: 'Application',
  11: 'Challenge',
  12: 'Mastery',
  13: 'Advanced',
  14: 'Integration',
  15: 'Showcase',
};
