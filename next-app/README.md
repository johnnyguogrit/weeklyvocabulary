# Weekly Vocabulary Learning System

A gamified vocabulary learning application for Grades 1-5 covering 8 subjects (Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE).

## Version

**Current Version:** v2.6.1

## Tech Stack

- **Frontend:** Next.js 16 (App Router), React 19, TypeScript 5.9
- **UI:** Tailwind CSS 4, Radix UI components, Framer Motion animations
- **Authentication:** NextAuth v5 (beta) with JWT strategy
- **Database:** PostgreSQL with Prisma ORM
- **State Management:** React hooks, Server Actions
- **Styling:** Tailwind CSS with custom themes

## Project Structure

```
next-app/
├── app/
│   ├── api/
│   │   ├── auth/              # NextAuth authentication
│   │   ├── progress/          # Student progress tracking
│   │   ├── quiz/              # Quiz questions API
│   │   ├── subjects/          # Subject data API
│   │   └── teacher/           # Teacher management APIs
│   ├── login/                 # Login page
│   ├── register/              # Teacher registration (v2.6+)
│   ├── student/               # Student portal
│   │   ├── [grade]/           # Grade selection
│   │   │   ├── [subject]/     # Subject week map
│   │   │   │   └── [weekId]/  # Quiz page
│   │   │   └── page.tsx       # Subject selection
│   │   └── page.tsx           # Student welcome
│   └── teacher/               # Teacher portal
│       ├── page.tsx           # Teacher dashboard
│       └── classes/           # Class management
├── data/                      # Shared vocabulary data
├── lib/
│   ├── auth.ts               # NextAuth configuration
│   └── db.ts                 # Prisma client
├── prisma/
│   └── schema.prisma         # Database schema
└── types/                    # TypeScript definitions
```

## Features

### For Students
- **Grade Selection:** G1-G5 (G5 excludes Drama)
- **8 Subjects:** Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE
- **13 Weeks per Subject:** Weeks 2-5, 7-10, 11-14, 15
- **3 Difficulty Levels:** Easy (no timer), Medium (30s), Hard (15s, 3 lives)
- **Progress Tracking:** Automatic save, plant growth gamification
- **Immediate Feedback:** Explanations after each answer

### For Teachers
- **Class Management:** Create and manage classes by grade
- **Student Management:**
  - Add single students
  - Bulk import via Excel/CSV
  - Export class roster
- **Progress Monitoring:** View student progress across subjects

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

```bash
cd next-app
npm install
```

### Environment Variables

Create `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/vocabdb"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Setup

```bash
# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx tsx scripts/seed-db.ts
```

### Development

```bash
npm run dev
```

Visit `http://localhost:3000`

### Build

```bash
npm run build
npm start
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new teacher
- `GET /api/auth/session` - Get current session

### Progress
- `GET /api/progress?userId=&grade=&subject=` - Get progress
- `POST /api/progress` - Save/update progress
- `DELETE /api/progress` - Reset progress

### Quiz
- `GET /api/quiz?grade=&subject=&weekId=` - Get quiz questions

### Teacher
- `GET /api/teacher/classes` - List classes
- `POST /api/teacher/classes` - Create class
- `POST /api/teacher/classes/[id]/students/import` - Bulk import
- `POST /api/teacher/classes/[id]/students/enroll-existing` - Add student
- `DELETE /api/teacher/classes/[id]/students/[studentId]` - Remove student
- `GET /api/teacher/classes/[id]/students/export` - Export roster

## Progress System

### Scoring
- **Average Score:** Calculated from attempted weeks only
- **Completion Threshold:** 70% accuracy required to unlock next week
- **Plant Growth:**
  - 0-20%: 🌱 Seedling
  - 21-50%: 🌿 Sapling
  - 51-80%: 🌳 Young Tree
  - 81-100%: 🌳✨ Mighty Oak

### Week Unlocking
- Week 2 is unlocked by default
- Completing a week (70%+) automatically creates and unlocks the next week

## Version History

### v2.6.1 (2026-04-27)
- **Bug Fixes:**
  - Fixed week unlock after completion
  - Fixed progress saving (completion percentage calculation)
  - Fixed average score calculation (excludes unattempted weeks)
  - Changed "Total Points" to "Average Score" for clarity

### v2.6.0 (2026-04-25)
- **New Features:**
  - Teacher-only registration
  - Single student addition
  - Bulk student import via Excel
  - Class roster export
- **Removed:**
  - Student self-registration
  - Standalone students directory

### v2.5.0
- Complete Teacher and Student Portals

### v2.4.0
- Teacher Dashboard and Student Game UI

### v2.3.0
- NextAuth v5 authentication

## License

MIT
