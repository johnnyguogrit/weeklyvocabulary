# Weekly Vocabulary Adventure - Next.js

> **Version**: 2.6.0 | **Status**: Stable

A gamified vocabulary learning application for Grades 1-5, built with Next.js 16, Prisma, and SQLite.

## Features

### Student Portal
- 🎮 **Gamified Learning**: Quiz-based vocabulary learning with points, stages, and rewards
- 📚 **8 Subjects**: Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE
- 📊 **Progress Tracking**: Track student progress with plant growth stages
- 🎯 **Difficulty Levels**: Easy, Medium, Hard with different timers and hints
- 📖 **Reading Comprehension**: Vocabulary in context passages

### Teacher Portal
- 👨‍🏫 **Dashboard**: Overview of classes and student progress
- 🏫 **Class Management**: Create and manage classes
- 👥 **Student Enrollment**: Add/remove students from classes
- 📥 **Bulk Import**: Import students from Excel files
- 📤 **Bulk Export**: Export student data to Excel
- 👨‍👩‍👧 **Parent Contacts**: Store parent email and phone
- 📈 **Progress Monitoring**: View individual student progress by subject

### Authentication
- 🔐 **NextAuth v5**: Secure authentication system
- 👤 **Role-based Access**: Separate portals for teachers and students
- 🔄 **Session Management**: JWT-based sessions

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **UI Components**: Radix UI
- **ORM**: Prisma 6.0
- **Database**: SQLite (local) / PostgreSQL (production)
- **Authentication**: NextAuth v5
- **Animations**: Framer Motion
- **Package Manager**: pnpm

## Getting Started

### Prerequisites

- Node.js 20+
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install

# Generate Prisma client
npx prisma generate

# Push database schema
npx prisma db push

# Seed database (optional)
npx tsx prisma/seed.ts
```

### Development

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database

### Seed Accounts

After running the seed script, use these accounts:

| Role | Email | Password |
|------|-------|----------|
| Teacher | teacher@school.com | teacher123 |
| Student | student@school.com | student123 |

Or register new accounts via `/register` page.

### Database Commands

```bash
# Generate Prisma client
npx prisma generate

# Push schema changes
npx prisma db push

# Open database UI
npx prisma studio

# Reset database
rm prisma/dev.db
npx prisma db push
npx tsx prisma/seed.ts
```

### Migration to PostgreSQL

1. Create a Supabase project
2. Update `.env` with your DATABASE_URL
3. Update `prisma/schema.prisma`: `provider = "postgresql"`
4. Run `npx prisma db push`

## Project Structure

```
├── app/                    # Next.js App Router
│   ├── login/              # Login page
│   ├── register/           # Registration page
│   ├── student/            # Student portal
│   │   ├── grades/         # Grade selection
│   │   └── subjects/       # Subject & week selection
│   ├── teacher/            # Teacher portal
│   │   ├── classes/        # Class management
│   │   └── students/       # Student directory
│   └── api/                # API routes
├── components/             # React components
│   └── ui/                 # Radix UI components
├── data/                   # Question and vocabulary data
├── lib/                    # Utilities (db, auth, utils)
├── prisma/                 # Database schema and seeds
└── types/                  # TypeScript definitions
```

## API Routes

### Public APIs
- `GET /api/subjects` - Get subject data
- `POST /api/auth/register` - Register new user

### Student APIs (Authenticated)
- `GET /api/progress` - Get student progress
- `POST /api/progress` - Update student progress
- `POST /api/quiz` - Start quiz session
- `PUT /api/quiz` - Submit quiz answers

### Excel Import/Export

**Import Template Format:**
| Column | Required | Description |
|--------|----------|-------------|
| Email | ✓ | Student email (unique) |
| FirstName | ✓ | First name |
| LastName | ✓ | Last name |
| Grade | ✓ | G1, G2, G3, G4, or G5 |
| Password | - | Defaults to password123 |
| ParentEmail | - | Parent contact email |
| ParentPhone | - | Parent contact phone |

**Features:**
- Download template from class page
- Upload .xlsx, .xls, or .csv files
- View import results with success/failure counts
- Error log for failed rows
- Export class roster with progress stats

### Teacher APIs (Authenticated)
- `GET /api/teacher/dashboard` - Get dashboard stats
- `GET /api/teacher/classes` - List all classes
- `POST /api/teacher/classes` - Create new class
- `GET /api/teacher/classes/[id]` - Get class details
- `DELETE /api/teacher/classes/[id]` - Delete class
- `POST /api/teacher/classes/[id]/students` - Add student to class
- `DELETE /api/teacher/classes/[id]/students/[studentId]` - Remove student
- `POST /api/teacher/classes/[id]/students/import` - Bulk import from Excel
- `GET /api/teacher/classes/[id]/students/export` - Export to Excel
- `GET /api/teacher/students` - List all students (for enrollment)

## Game Mechanics

### Difficulty Levels

| Level | Timer | Hints |
|-------|-------|-------|
| Easy | None | Yes |
| Medium | 30s | Yes |
| Hard | 15s | No |

### Scoring

- Correct answer: +10 points
- Speed bonus: +5 points (under 10s)
- Perfect week: +20 bonus points

### Progress Stages

| Progress | Stage | Emoji |
|----------|-------|-------|
| 0-20% | Seedling | 🌱 |
| 21-50% | Sapling | 🌿 |
| 51-80% | Young Tree | 🌳 |
| 81-100% | Mighty Oak | 🌳✨ |

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Environment Variables

Set these in your deployment platform:

```env
DATABASE_URL=your_database_url
NEXTAUTH_SECRET=your_secret_key
NEXTAUTH_URL=your_domain_url
```

## Legacy Apps

The original Vite + React app and Streamlit app are preserved in the parent directory:

- **React App**: `../app/` - Local frontend
- **Streamlit App**: `../pages/` - Teacher interface

## Contributing

1. Edit question data in `weeklytest/*.md`
2. Run parser: `node ../app/scripts/parseVocabularyMd.cjs`
3. Data is automatically available in Next.js app

## License

MIT
