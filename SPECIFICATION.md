# Weekly Vocabulary Learning App - Technical Specification

## Document Information

| Field | Value |
|-------|-------|
| Version | 2.0.1 |
| Last Updated | 2026-04-27 |
| Status | **Beta Testing** |

## 1. System Overview

### 1.1 Purpose
A gamified vocabulary learning application for teaching English vocabulary to students in Grades 1-5 across 8 academic subjects.

**New Architecture (Beta)**:
- **Next.js App** (`next-app/`): Modern web app with App Router, SQLite database
  - Student Portal: Game interface with progress tracking
  - Teacher Portal: Management dashboard
  - API Routes: Backend services
  - Database: SQLite with Prisma ORM

**Legacy Architecture (Preserved)**:
- **React App** (`app/`): Local Vite + React frontend (port 3000)
- **Streamlit App** (`pages/`, `data/`): Python-based teacher interface (port 8501)

### 1.2 Target Audience
- **Primary**: Students ages 6-11 (Grades 1-5)
- **Secondary**: Teachers managing class progress via dashboard
- **Tertiary**: Parents tracking student performance

## 2. Next.js Architecture (v2.0)

### 2.1 Directory Structure
```
next-app/
├── app/
│   ├── (student)/                 # Student portal route group
│   │   ├── layout.tsx             # Student layout
│   │   ├── page.tsx               # Welcome screen
│   │   ├── grades/[grade]/        # Grade → Subject selection
│   │   └── [grade]/subjects/[subject]/weeks/[weekId]/  # Quiz flow
│   ├── (teacher)/                 # Teacher portal route group
│   │   ├── layout.tsx             # Teacher layout
│   │   ├── page.tsx               # Dashboard
│   │   ├── students/              # Student management
│   │   └── classes/               # Class management
│   ├── api/                       # API Routes
│   │   ├── subjects/route.ts      # Subject data
│   │   ├── progress/route.ts      # Progress tracking
│   │   └── quiz/route.ts          # Quiz sessions
│   └── layout.tsx                 # Root layout
├── data/                          # Migrated from app/src/data/
│   ├── vocabularyData.ts
│   ├── predefinedQuestions.ts
│   ├── questionGenerator.ts
│   └── translations.ts
├── lib/                           # Utilities
│   ├── db.ts                      # Prisma client
│   ├── auth.ts                    # NextAuth configuration
│   └── utils.ts
├── prisma/
│   ├── schema.prisma              # Database schema (SQLite)
│   └── seed.ts                    # Seed data script
├── components/                    # React components
│   ├── student/                   # Student-specific components
│   ├── teacher/                   # Teacher-specific components
│   └── ui/                        # Shared UI components
├── types/                         # TypeScript definitions
│   ├── game.ts                    # Game types
│   ├── database.ts                # Database types
│   └── index.ts
└── .env                           # Environment variables
```

### 2.2 Technology Stack
```yaml
Framework: Next.js 16.2.4 (App Router)
React: 19.2.4
TypeScript: 5.9.3
Styling: Tailwind CSS 4
ORM: Prisma 6.0.0
Database: SQLite (local) / PostgreSQL (Supabase)
State: React Hooks + SWR
Animations: Framer Motion 12.38.0
Package Manager: pnpm
```

### 2.3 Database Schema

**Core Models**:
- `User` - User accounts (students, teachers, admins)
- `StudentProgress` - Progress tracking per grade/subject
- `WeekProgress` - Weekly progress details
- `QuizSession` - Active quiz sessions
- `Class` - Teacher classes
- `Enrollment` - Student-class relationships

**Seed Data**:
- Teacher: `teacher@example.com` / `password123`
- Student: `student@example.com`
- Sample G1 Maths progress (13 weeks)

### 2.4 Route Structure

**Student Routes**:
- `/` - Welcome page with grade selection
- `/grades/{G1-G5}` - Subject selection
- `/{grade}/subjects/{subject}` - Week map
- `/{grade}/subjects/{subject}/weeks/{weekId}` - Quiz

**Teacher Routes**:
- `/teacher` - Dashboard
- `/teacher/students` - Student list
- `/teacher/classes` - Class management

## 3. Migration Status

### 3.1 Completed ✅
| Component | Status | Notes |
|-----------|--------|-------|
| Next.js project setup | ✅ | App Router configured |
| TypeScript configuration | ✅ | Path aliases working |
| Tailwind CSS setup | ✅ | v4 configured |
| Data layer migration | ✅ | All data files copied |
| API Routes structure | ✅ | /api/* endpoints created |
| Student routes | ✅ | Welcome, grades, subjects, quiz |
| Teacher routes | ✅ | Dashboard, students page |
| Prisma setup | ✅ | SQLite configured |
| Database schema | ✅ | All models defined |
| Seed data | ✅ | Test users and progress |

### 3.2 In Progress 🔄
| Component | Status | Notes |
|-----------|--------|-------|
| Progress API | 🔄 | Database integration |
| Quiz session API | 🔄 | Session management |

### 3.3 Pending ⏳
| Component | Priority | Notes |
|-----------|----------|-------|
| NextAuth integration | High | Login/logout |
| Teacher CRUD | Medium | Student management |
| Progress persistence | High | Save to database |
| Reading comprehension | Low | Currently disabled |

## 4. Functional Requirements (Preserved)

All existing game mechanics, scoring, and content from v1.4.1 are preserved:

### 4.1 Grade Structure
| Grade | Age Range | Code |
|-------|-----------|------|
| Grade 1 | 6-7 | G1 |
| Grade 2 | 7-8 | G2 |
| Grade 3 | 8-9 | G3 |
| Grade 4 | 9-10 | G4 |
| Grade 5 | 10-11 | G5 |

### 4.2 Subject Coverage
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

### 4.3 Difficulty Levels
| Level | Timer | Hints | Lives | Label |
|-------|-------|-------|-------|-------|
| Easy | None | Yes | ∞ | Easy Explorer 🌱 |
| Medium | 30s | Yes | ∞ | Brave Scholar 🌿 |
| Hard | 15s | No | 3 | Math Master 🌳 |

### 4.4 Scoring System
| Activity | Points |
|----------|--------|
| Correct Quiz Answer | +10 |
| Speed Bonus (<10s) | +5 |
| Perfect Week Bonus | +20 |

### 4.5 Progress Stages
| Stage | Threshold | Emoji |
|-------|-----------|-------|
| Seedling | 0% | 🌱 |
| Sapling | 21% | 🌿 |
| Young Tree | 51% | 🌳 |
| Mighty Oak | 81% | 🌳✨ |

## 5. Development Commands

### 5.1 Next.js App
```bash
cd next-app/
pnpm install        # Install dependencies
pnpm dev            # Start dev server (localhost:3000)
pnpm build          # Production build
pnpm start          # Start production server
```

### 5.2 Database Commands
```bash
cd next-app/
npx prisma generate    # Generate Prisma client
npx prisma db push     # Push schema to database
npx prisma studio      # Open database UI
npx tsx prisma/seed.ts # Run seed script
```

### 5.3 Environment Variables
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_SECRET="development-secret-change-in-production"
NEXTAUTH_URL="http://localhost:3000"
NODE_ENV="development"
```

## 6. Build & Deployment

### 6.1 Development
```bash
cd next-app/
pnpm dev    # http://localhost:3000
```

### 6.2 Production
```bash
pnpm build  # Creates .next/ folder
pnpm start  # Start production server
```

### 6.3 Deployment (Vercel)
```bash
# Push to GitHub
git push origin main

# Or deploy via Vercel CLI
vercel --prod
```

## 7. Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.0.1 | 2026-04-27 | **BETA RELEASE**: Prisma integration complete<br>- SQLite database configured<br>- Seed data created (teacher/student accounts)<br>- Database schema finalized (SQLite compatible)<br>- All core routes functional |
| 2.0.0 | 2026-04-27 | **NEXT.JS MIGRATION**: Started migration to Next.js App Router<br>- Created next-app/ directory structure<br>- Migrated all data files<br>- Created student and teacher portals<br>- Added Prisma schema<br>- API Routes structure |
| 1.4.1 | 2026-04-26 | Last legacy version (see CLAUDE.md for full history) |

## 8. Known Issues

| Issue | Severity | Status |
|-------|----------|--------|
| Progress not saving to DB | Medium | API routes need implementation |
| No authentication | Medium | NextAuth pending |
| Teacher CRUD not functional | Low | Backend pending |

## 9. Next Steps

1. **Immediate**: Implement progress API
   - Connect quiz results to database
   - Load progress from database

2. **Short-term**: Authentication
   - Configure NextAuth.js
   - Add login/logout flow
   - Protect teacher routes

3. **Medium-term**: Teacher features
   - Student CRUD operations
   - Class management
   - Progress analytics

4. **Long-term**: Production
   - Migrate to Supabase PostgreSQL
   - E2E testing with Playwright
   - Deploy to production
