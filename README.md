# Weekly Vocabulary Learning App

A gamified vocabulary learning application for Grades 1-5 covering 8 academic subjects (Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE).

## 🚀 Live Demo
**Production:** https://weeklyvocabulary.vercel.app

## Version
**v3.0.2** (2026-04-28) - G1 Vocabulary Format Update & Quiz Flow Fixes

## Features

### Student Features
- **8 Subject Areas**: Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE
- **5 Grade Levels**: G1 (age 6-7) through G5 (age 10-11)
- **3 Difficulty Levels**: Easy, Medium, Hard
- **Gamified Progress**: Plant growth metaphor from seedling to mighty oak
- **Authentication**: Secure login with role-based access (Student/Teacher/Admin)
- **Progress Tracking**: Database-backed progress saving

### Teacher Features
- **Dashboard**: Overview of classes, students, and progress statistics
- **Class Management**: Create and manage classes with unique codes
- **Student Enrollment**: Add students individually or bulk import via Excel
- **Progress Monitoring**: View individual student progress per subject
- **Bulk Import/Export**: Excel-based student management

## Quick Start

### Local Development (Next.js)

```bash
cd next-app/
pnpm install

# Setup database (first time only)
cp .env.example .env
# Edit .env with your DATABASE_URL
npx prisma generate
npx prisma db push
pnpm db:seed  # Create demo accounts

pnpm dev
# Access at http://localhost:3000
```

**Demo Accounts:**
- Admin: `admin@school.com` / `admin123`
- Teacher: `teacher@school.com` / `teacher123`
- Student: `student@school.com` / `student123`

### React App (Standalone - Not Deployed)

```bash
cd app/
npm install
npm run dev
# Access at http://localhost:3001
```

## Tech Stack

### Production (Vercel)
- **Next.js 16.2.4** (App Router)
- **React 19.2.4** + TypeScript 5.9.3
- **Tailwind CSS 3.4** (v3 for Vercel compatibility)
- **Prisma 6.19.3** ORM
- **PostgreSQL** (Supabase)
- **NextAuth v5** (JWT strategy, Credentials provider)
- **pnpm** package manager

### Local Development
- **React 19** + Vite 7 (standalone app)
- **Next.js 16** + Turbopack (full-featured app)
- **SQLite** (local database alternative)

## Deployment

### Vercel Configuration

| Setting | Value |
|---------|-------|
| **Root Directory** | `next-app` |
| **Framework Preset** | `Next.js` |
| **Build Command** | (auto-detected) |
| **Install Command** | (auto-detected) |

### Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string with `?pgbouncer=true` |
| `DIRECT_URL` | Yes | Direct database connection with `?pgbouncer=true` (Supabase) |
| `AUTH_SECRET` | Yes | NextAuth v5 JWT secret |
| `NEXTAUTH_SECRET` | Yes | NextAuth compatibility (same as AUTH_SECRET) |
| `NEXTAUTH_URL` | Yes | Production URL |

### Manual Deployment

```bash
cd next-app
vercel --prod
```

See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for detailed deployment guide.

## Project Structure

```
weeklyvocabulary/
├── next-app/                     # Next.js application (Production)
│   ├── app/                      # Next.js App Router
│   │   ├── (auth)/               # Auth group (login, register)
│   │   ├── student/              # Student portal
│   │   │   ├── layout.tsx        # Auth check for students
│   │   │   └── [grade]/[subject]/  # Subject & week pages
│   │   ├── teacher/              # Teacher portal
│   │   │   ├── layout.tsx        # Auth check for teachers
│   │   │   ├── classes/          # Class management
│   │   │   └── [id]/             # Class details
│   │   └── api/                  # API routes
│   │       ├── auth/             # NextAuth endpoints
│   │       ├── progress/         # Progress tracking
│   │       ├── quiz/             # Quiz sessions
│   │       └── teacher/          # Teacher APIs
│   ├── components/ui/            # Radix UI components
│   ├── data/                     # Vocabulary data
│   ├── lib/                      # Utilities (auth, db)
│   ├── prisma/                   # Database schema
│   └── generated/client/         # Prisma Client (committed)
├── app/                          # React application (Local)
│   └── src/
│       ├── data/                 # Vocabulary data
│       └── App.tsx               # Main game
├── weeklytest/                   # Data source
│   └── UNIFIED_VOCABULARY.md     # Master vocabulary
├── VERCEL_DEPLOYMENT.md          # Deployment guide
├── SPECIFICATION.md              # Technical specification
├── TEST_CASES.md                 # Test cases
└── README.md                     # This file
```

## Data Management

### Adding New Vocabulary Questions

1. Edit `weeklytest/UNIFIED_VOCABULARY.md`
2. Run the parser:
   ```bash
   cd app && node scripts/parseUnifiedVocabulary.cjs
   ```
3. Copy to Next.js:
   ```bash
   cp app/src/data/predefinedQuestions.ts next-app/data/
   ```

## Game Flow

1. **Login** → Role selection (Student/Teacher)
2. **Student**: Grade → Subject → Week → Quiz
3. **Teacher**: Dashboard → Classes → Students → Progress

## Recent Updates (v3.0.2)

- ✅ **G1 Vocabulary Format Update**: Changed from "review weeks" to individual keyword weeks
- ✅ **Week Unlocking Fix**: Fixed non-consecutive week ID unlocking for G1 (2,3,4,5,7,8,9...)
- ✅ **Quiz Completion Flow**: Fixed redirect after finishing quiz using hard refresh
- ✅ **Progress Save Fix**: Awaited async progress save to ensure completion before navigation
- ✅ **Data Parser Update**: Now updates both app/ and next-app/ directories

## Previous Updates (v3.0.1)

- 🎉 **PRODUCTION RELEASE**: Deployed to Vercel
- ✅ **Authentication**: NextAuth v5 with role-based access
- ✅ **Database**: PostgreSQL on Supabase
- ✅ **Teacher Portal**: Full class and student management
- ✅ **Student Portal**: Grade/subject selection with progress tracking
- ✅ **Bulk Import**: Excel-based student enrollment
- ✅ **Progress Tracking**: Database-backed progress saving

## Documentation

- **[SPECIFICATION.md](SPECIFICATION.md)** - Detailed technical specification
- **[VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md)** - Deployment experience & troubleshooting
- **[TEST_CASES.md](TEST_CASES.md)** - Test cases
- **[CLAUDE.md](CLAUDE.md)** - Project context for AI assistants

## License

Educational use only.
