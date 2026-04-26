# Weekly Vocabulary Learning App - Technical Specification

## Document Information

| Field | Value |
|-------|-------|
| Version | 2.1.0 |
| Last Updated | 2026-04-27 |
| Status | **Stable** |

## 1. System Overview

### 1.1 Purpose
A gamified vocabulary learning application for teaching English vocabulary to students in Grades 1-5 across 8 academic subjects.

**Architecture**:
- **React App** (`app/`): Vite + React frontend (port 3001) - **Stable**
- **Next.js App** (`next-app/`): Modern web app with App Router, SQLite database (port 3000) - **Beta**

**Note**: Streamlit application has been **deprecated and removed**.

### 1.2 Target Audience
- **Primary**: Students ages 6-11 (Grades 1-5)
- **Secondary**: Teachers managing class progress via dashboard
- **Tertiary**: Parents tracking student performance

## 2. React App Architecture (Stable)

### 2.1 Directory Structure
```
app/                              # React frontend app
├── src/
│   ├── App.tsx                 # Main application with all game screens
│   ├── main.tsx                # Entry point
│   ├── types/
│   │   └── game.ts             # Type definitions for game state
│   ├── data/
│   │   ├── predefinedQuestions.ts   # Predefined questions (from UNIFIED_VOCABULARY.md)
│   │   ├── vocabularyData.ts       # Grade/subject vocabulary structure
│   │   ├── questionGenerator.ts    # Question generation logic
│   │   └── translations.ts         # Chinese translations & IPA
│   ├── components/
│   │   └── ui/                  # Radix UI components
│   ├── hooks/
│   │   └── use-mobile.ts        # Mobile detection hook
│   └── lib/
│       └── utils.ts             # Utility functions
├── public/
│   └── assets/                 # Images (badges, hero, etc.)
└── scripts/
    └── parseUnifiedVocabulary.cjs   # UNIFIED_VOCABULARY.md → TypeScript parser

weeklytest/                      # Data source
└── UNIFIED_VOCABULARY.md        # Master vocabulary question source
```

### 2.2 Technology Stack
```yaml
Framework: React 19
Build Tool: Vite 7
Language: TypeScript 5.9
Styling: Tailwind CSS
UI: Radix UI Components
Animations: Framer Motion
State Management: React Hooks
Package Manager: npm
```

## 3. Next.js Architecture (Beta)

### 3.1 Directory Structure
```
next-app/
├── app/
│   ├── (student)/                 # Student portal route group
│   │   ├── layout.tsx             # Student layout
│   │   ├── page.tsx               # Welcome screen
│   │   └── grades/[grade]/        # Grade → Subject selection
│   ├── (teacher)/                 # Teacher portal route group
│   │   ├── layout.tsx             # Teacher layout
│   │   ├── page.tsx               # Dashboard
│   │   └── students/              # Student management
│   ├── api/                       # API Routes
│   │   ├── subjects/route.ts      # Subject data
│   │   ├── progress/route.ts      # Progress tracking
│   │   └── quiz/route.ts          # Quiz sessions
│   └── layout.tsx                 # Root layout
├── data/                          # Migrated from app/src/data/
│   ├── predefinedQuestions.ts
│   ├── vocabularyData.ts
│   ├── questionGenerator.ts
│   └── translations.ts
├── lib/                           # Utilities
│   ├── db.ts                      # Prisma client
│   └── utils.ts
├── prisma/
│   ├── schema.prisma              # Database schema (SQLite)
│   └── seed.ts                    # Seed data script
└── types/                         # TypeScript definitions
    └── game.ts
```

### 3.2 Technology Stack
```yaml
Framework: Next.js 16.2.4 (App Router)
React: 19.2.4
TypeScript: 5.9.3
Styling: Tailwind CSS 4
ORM: Prisma 6.0.0
Database: SQLite (local)
Package Manager: pnpm
```

## 4. Data Management

### 4.1 Data Source
**Primary Source**: `weeklytest/UNIFIED_VOCABULARY.md`
- Single markdown file containing all vocabulary questions
- Format: Grade → Subject → Week → Question
- 426 week-entries, 1035 questions

### 4.2 Data Sync Process
1. Edit `weeklytest/UNIFIED_VOCABULARY.md`
2. Run: `cd app && node scripts/parseUnifiedVocabulary.cjs`
3. This updates:
   - `app/src/data/predefinedQuestions.ts`
   - `next-app/data/predefinedQuestions.ts` (copied manually)

### 4.3 Subject Coverage
| Subject | Emoji | Color | Code |
|---------|-------|-------|-------|
| Mathematics | 🔢 | #2E7D32 | Maths |
| Science | 🔬 | #1565C0 | Science |
| STEAM | 💻 | #6A1B9A | STEAM |
| Music | 🎵 | #E65100 | Music |
| Performing Arts | 🎭 | #C62828 | Performing Arts |
| Drama | 🎬 | #5D4037 | Drama |
| Visual Arts | 🎨 | #AD1457 | Visual Arts |
| Physical Education | ⚽ | #00695C | PE |

**Note**: G5 uses "Performing Arts" instead of separate "Drama" subject.

## 5. Functional Requirements

### 5.1 Grade Structure
| Grade | Age Range | Code |
|-------|-----------|------|
| Grade 1 | 6-7 | G1 |
| Grade 2 | 7-8 | G2 |
| Grade 3 | 8-9 | G3 |
| Grade 4 | 9-10 | G4 |
| Grade 5 | 10-11 | G5 |

### 5.2 Difficulty Levels
| Level | Timer | Hints | Lives | Label |
|-------|-------|-------|-------|------|
| Easy | None | Yes | ∞ | Easy Explorer 🌱 |
| Medium | 30s | Yes | ∞ | Brave Scholar 🌿 |
| Hard | 15s | No | 3 | Math Master 🌳 |

### 5.3 Scoring System
| Activity | Points |
|----------|--------|
| Correct Quiz Answer | +10 |
| Speed Bonus (<10s) | +5 |
| Perfect Week Bonus | +20 |

### 5.4 Progress Stages
| Stage | Threshold | Emoji |
|-------|-----------|-------|
| Seedling | 0% | 🌱 |
| Sapling | 21% | 🌿 |
| Young Tree | 51% | 🌳 |
| Mighty Oak | 81% | 🌳✨ |

## 6. Development Commands

### 6.1 React App
```bash
cd app/
npm install           # Install dependencies
npm run dev          # Start dev server (localhost:3001)
npm run build        # Production build
npm run preview      # Preview production build
```

### 6.2 Next.js App
```bash
cd next-app/
pnpm install        # Install dependencies
pnpm dev            # Start dev server (localhost:3000)
pnpm build          # Production build
pnpm start          # Start production server
```

### 6.3 Data Parser
```bash
cd app/
node scripts/parseUnifiedVocabulary.cjs
```

## 7. Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.1.0 | 2026-04-27 | **STREAMLIT REMOVAL**: Streamlit app deprecated and removed<br>- Added parseUnifiedVocabulary.cjs parser<br>- UNIFIED_VOCABULARY.md as single data source<br>- Fixed G5 subject name (Performing Arts & Drama → Performing Arts)<br>- Fixed broken subject names in UNIFIED_VOCABULARY.md<br>- Data sync between React and Next.js apps |
| 2.0.1 | 2026-04-27 | **BETA RELEASE**: Prisma integration complete<br>- SQLite database configured<br>- Seed data created (teacher/student accounts) |
| 2.0.0 | 2026-04-27 | **NEXT.JS MIGRATION**: Started migration to Next.js App Router |
| 1.4.1 | 2026-04-26 | Last legacy version |

## 8. Known Issues

| Issue | Severity | Status |
|-------|----------|--------|
| Next.js progress API | Medium | In development |
| Next.js authentication | Medium | Pending |
| Data sync automation | Low | Manual copy required |

## 9. Next Steps

1. **Immediate**: None - Stable release
2. **Short-term**: Next.js progress tracking
3. **Medium-term**: Next.js authentication
4. **Long-term**: Production deployment
