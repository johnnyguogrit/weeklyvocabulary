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
- Supabase account (free tier works)

### Quick Start with Supabase

1. **Clone and install:**
```bash
cd next-app
npm install
```

2. **Set up Supabase:**
   - Create project at https://supabase.com
   - Go to Database → Connection string
   - Copy connection strings

3. **Configure `.env`:**
```env
# From Supabase Connection Pooling (port 6543)
DATABASE_URL="postgresql://postgres.projectid:password@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"

# From Supabase Direct connection (port 5432)
DIRECT_URL="postgresql://postgres:password@db.projectid.supabase.co:5432/postgres"

# Generate with: openssl rand -base64 32
NEXTAUTH_SECRET="your-generated-secret"
NEXTAUTH_URL="http://localhost:3000"
```

4. **Create database tables:**
   - Option A: Run `npx prisma db push` (if connection works)
   - Option B: Manually run SQL in Supabase SQL Editor (see DEPLOYMENT.md)

5. **Start development:**
```bash
npm run dev
```

Visit `http://localhost:3000`

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

## Deployment

### Vercel (Recommended)

1. **Push code to GitHub**

2. **Import in Vercel:**
   - Go to https://vercel.com/new
   - Import your repository
   - Framework preset: **Next.js**

3. **Configure Environment Variables:**
   ```env
   DATABASE_URL=postgresql://postgres.projectid:password@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
   DIRECT_URL=postgresql://postgres:password@db.projectid.supabase.co:5432/postgres
   NEXTAUTH_SECRET=your-generated-secret
   NEXTAUTH_URL=https://your-app.vercel.app
   ```

4. **Deploy**

### Other Platforms

Use the same environment variables for any Node.js hosting platform.

**See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed Supabase setup instructions.**

## Version History

### v2.6.1 (2026-04-27)
- **Bug Fixes:**
  - Fixed week unlock after completion
  - Fixed progress saving (completion percentage calculation)
  - Fixed average score calculation (excludes unattempted weeks)
  - Changed "Total Points" to "Average Score" for clarity
- **Infrastructure:**
  - Migrated from SQLite to Supabase PostgreSQL
  - Added Supabase deployment documentation
  - Fixed Next.js 16 compatibility (removed deprecated eslint config)

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
