import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Grade to display name mapping
export const GRADE_NAMES: Record<string, string> = {
  G1: 'Grade 1',
  G2: 'Grade 2',
  G3: 'Grade 3',
  G4: 'Grade 4',
  G5: 'Grade 5',
}

// Difficulty config
export const DIFFICULTY_CONFIG = {
  easy: {
    label: 'Easy',
    timer: 0, // No time limit
    hints: true,
    lives: 0,
    description: 'No time limit, hints available'
  },
  medium: {
    label: 'Medium',
    timer: 30, // 30 seconds per question
    hints: true,
    lives: 0,
    description: '30 seconds per question, hints available'
  },
  hard: {
    label: 'Hard',
    timer: 15, // 15 seconds per question
    hints: false,
    lives: 3,
    description: '15 seconds per question, 3 lives, no hints'
  },
} as const

// Plant stage thresholds
export const PLANT_STAGES = {
  seedling: { min: 0, max: 20, emoji: '🌱', name: 'Seedling' },
  sapling: { min: 21, max: 50, emoji: '🌿', name: 'Sapling' },
  young_tree: { min: 51, max: 80, emoji: '🌳', name: 'Young Tree' },
  mighty_oak: { min: 81, max: 100, emoji: '🌳✨', name: 'Mighty Oak' },
} as const

export function getPlantStage(progress: number): keyof typeof PLANT_STAGES {
  if (progress <= 20) return 'seedling'
  if (progress <= 50) return 'sapling'
  if (progress <= 80) return 'young_tree'
  return 'mighty_oak'
}

export function getWeekDisplayName(weekId: number): string {
  if (weekId <= 5) return `Review Week ${weekId}`
  return `Week ${weekId}`
}
