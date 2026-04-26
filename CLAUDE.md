# Weekly Vocabulary Learning App - Claude Context

## Project Overview

A gamified vocabulary learning application for Grades 1-5 covering 8 subjects (Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE). Built with React + TypeScript + Vite.

## Key Technologies

- **Frontend**: React 19, TypeScript 5.9, Vite 7
- **UI**: Tailwind CSS, Radix UI components, Framer Motion animations
- **State Management**: React hooks (useState, useEffect, useCallback)
- **Build**: Vite bundler, ESLint

## Project Structure

```
app/                              # React frontend app
├── src/
│   ├── App.tsx                 # Main application with all game screens
│   ├── main.tsx                # Entry point
│   ├── types/
│   │   └── game.ts             # Type definitions for game state
│   ├── data/
│   │   ├── questionGenerator.ts    # Question generation logic
│   │   ├── predefinedQuestions.ts   # Predefined questions from MD files
│   │   ├── vocabularyData.ts       # Grade/subject vocabulary structure
│   │   └── translations.ts         # Chinese translations & IPA
│   ├── components/
│   │   └── ui/                  # Radix UI components
│   ├── hooks/
│   │   └── use-mobile.ts        # Mobile detection hook
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/
│   └── assets/                 # Images (badges, hero, etc.)
├── scripts/
│   └── parseUnifiedVocabulary.cjs   # Parse UNIFIED_VOCABULARY.md to TypeScript
└── weeklytest/                 # Source markdown files
    └── UNIFIED_VOCABULARY.md   # Master vocabulary question source

next-app/                        # Next.js App Router version (beta)
├── app/                         # Next.js app directory
├── data/                        # Shared data files
└── prisma/                      # Database schema

scripts/                         # Shared scripts
├── parseUnifiedVocabulary.cjs   # Parse UNIFIED_VOCABULARY.md → predefinedQuestions.ts
└── check_missing_*.cjs           # Validation utilities
```

## Architecture

### Game Flow
1. **Welcome** → Grade Select → Subject Select → Difficulty Select
2. **Week Map** → Quiz → Reading Comprehension → Week Complete
3. **Results** when all weeks completed

### State Management
- `PlayerState`: Current grade, subject, difficulty, progress
- `QuizState`: Current question, timer, score, lives
- Progress saved to localStorage (`vocabularyAdventure_v2_progress`)

### Question Data Flow
1. `vocabularyData.ts` defines keywords by week/subject/grade
2. `predefinedQuestions.ts` contains parsed questions from markdown
3. `questionGenerator.ts::getSubjectData()` combines both
   - Uses predefined questions if available
   - Falls back to auto-generation if not

## Important Files When Adding Content

### To Add New Vocabulary Questions
1. Edit `weeklytest/UNIFIED_VOCABULARY.md`
2. Run: `node app/scripts/parseUnifiedVocabulary.cjs`
3. This updates `predefinedQuestions.ts` (used by both React and Next.js apps)

### To Add New Grades/Subjects
1. Update `VOCABULARY_DATA` in `vocabularyData.ts`
2. Add grade config to `GRADE_CONFIG` in `types/game.ts`
3. Add subject config to `SUBJECT_CONFIG` in `types/game.ts`

### To Modify Game Mechanics
- Quiz logic: `QuizScreen` component in `App.tsx` (lines 312-445)
- Progress calculation: Lines 730-789 in `App.tsx`
- Timer/difficulty: `DIFFICULTY_CONFIG` in `types/game.ts`

## Data Structures

### PredefinedQuestion Interface
```typescript
interface PredefinedQuestion {
  week: number;
  keyword: string;
  question: string;
  options: string[];
  answer: string;  // 'A', 'B', 'C', or 'D'
  explanation: string;
  passage?: string;
}
```

### WeekData Structure
```typescript
interface WeekData {
  id: number;          // Week number (2-15)
  title: string;       // Display name
  color: string;       // Subject color
  emoji: string;       // Week emoji
  keywords: string[];  // Vocabulary words for this week
  questions: Question[];
}
```

## Build Commands

```bash
cd app/
npm install           # Install dependencies
npm run dev          # Start dev server (localhost:3000)
npm run build        # Production build
npm run preview      # Preview production build
```

## Notes for AI Assistants

1. **Predefined Questions Take Priority**: The app uses `PREDEFINED_QUESTIONS` first, only falling back to auto-generation
2. **Week Numbers Skip 1, 6**: Weeks are 2-5 (Review), 7-10, 11-14, 15 - this is intentional
3. **Progress is Persistent**: All progress saves to localStorage; use "Reset All" button to clear
4. **Chinese Characters**: Use `TRANSLATIONS` in `translations.ts` for keyword translations
5. **Subject Colors**: Each subject has a unique color used throughout UI for consistency

## Current Known Issues

- None major; app fully functional for G1-G5
- Some weeks have multiple questions which appear as separate week entries in TS output
- Markdown parser handles both G1 format (`• 第N周(keyword)`) and G2+ format (`第N周(keyword-list)`)

## Data Consistency Between Apps

**CRITICAL**: Both React (local) and Streamlit apps MUST use the same predefined questions.

### Data Files
- **React app**: `app/src/data/predefinedQuestions.ts` (930+ questions)
- **Streamlit app**: `data/predefined_questions.py` (converted from TS)

### Sync Process
When updating questions from markdown files:
1. Edit `weeklytest/UNIFIED_VOCABULARY.md`
2. Run `node app/scripts/parseUnifiedVocabulary.cjs` → updates `predefinedQuestions.ts`
3. Both React and Next.js apps use the same predefined questions

### Question Priority
Both apps follow the same priority:
1. **Predefined questions** (from UNIFIED_VOCABULARY.md) - high quality, human-curated
2. **Auto-generated questions** (template-based) - fallback only
