# Weekly Vocabulary Learning App

A gamified vocabulary learning application for Grades 1-5 covering 8 academic subjects (Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE).

## Version
**v2.3.0** (2026-04-27) - NextAuth Authentication Complete

## Features

### Student Features
- **8 Subject Areas**: Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE
- **5 Grade Levels**: G1 (age 6-7) through G5 (age 10-11)
- **3 Difficulty Levels**: Easy, Medium, Hard
- **Gamified Progress**: Plant growth metaphor from seedling to mighty oak
- **Progress Tracking**: LocalStorage-based progress saving
- **1035 Questions**: Predefined questions with Chinese translations and pronunciation

### Teacher Features (Next.js Beta)
- **Class Management**: Create classes with unique codes
- **Student Management**: Add students with auto-generated passwords
- **Progress Monitoring**: View class statistics and individual progress

## Quick Start

### Option 1: React App (Stable - Recommended)

```bash
cd app/
npm install
npm run dev
# Access at http://localhost:3001
```

### Option 2: Next.js App (Beta)

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

See [next-app/DATABASE_SETUP.md](next-app/DATABASE_SETUP.md) for detailed database setup.

## Tech Stack

### React App (Stable)
- **React 19** + TypeScript 5.9
- **Vite 7** for building
- **Tailwind CSS** + Radix UI
- **Framer Motion** animations
- **localStorage** for progress

### Next.js App (Beta)
- **Next.js 16** (App Router)
- **React 19** + TypeScript
- **Prisma** ORM (v6.19.3)
- **PostgreSQL** (Supabase) / SQLite
- **REST API** - Progress, Quiz, Subjects, Auth endpoints
- **NextAuth v5** - Authentication with role-based access

## Project Structure

```
weeklyvocabulary/
├── app/                          # React application (Stable)
│   ├── src/
│   │   ├── data/                 # Vocabulary and question data
│   │   │   ├── predefinedQuestions.ts  # 1035 questions from UNIFIED_VOCABULARY.md
│   │   │   ├── vocabularyData.ts       # Keywords by grade/subject/week
│   │   │   ├── translations.ts         # Chinese translations & IPA
│   │   │   └── questionGenerator.ts    # Question generation logic
│   │   ├── types/                # TypeScript type definitions
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions
│   │   └── App.tsx               # Main application
│   ├── public/                   # Static assets
│   └── scripts/
│       └── parseUnifiedVocabulary.cjs  # Data parser
├── next-app/                     # Next.js application (Beta)
│   ├── app/                      # Next.js App Router
│   ├── data/                     # Shared data files
│   ├── prisma/                   # Database schema
│   └── types/                    # TypeScript definitions
├── weeklytest/                   # Data source
│   └── UNIFIED_VOCABULARY.md     # Master vocabulary question source
├── SPECIFICATION.md              # Detailed technical specification
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

### Data Format

The `UNIFIED_VOCABULARY.md` uses the following format:

```markdown
## G1

### Subject: Maths

**Week 2: review**

> Passage: Look at my shapes! I have a triangle with 3 sides...

**Question:** A shape with three sides is a _______.​

**Options:**
- A) circle
- B) triangle
- C) square
- D) line​

**Answer:** B

**Explanation:** triangle意为"三角形"，符合三条边的几何特征。

---
```

## Game Flow

1. **Welcome** → Grade Select → Subject Select → Difficulty Select
2. **Week Map** → Quiz → Week Complete
3. **Final Results** when all weeks completed

## Difficulty Settings

| Level | Timer | Hints | Lives |
|-------|-------|-------|-------|
| Easy | None | Yes | Unlimited |
| Medium | 30s | Yes | Unlimited |
| Hard | 15s | No | 3 |

## Week Structure

- **Phase 1**: Weeks 2-5 (Review at Week 5)
- **Phase 2**: Weeks 7-10
- **Phase 3**: Weeks 11-14
- **Final**: Week 15

## Recent Updates (v2.3.0)

- **NextAuth Complete**: Full authentication system with NextAuth v5
  - Credentials provider with email/password
  - Role-based access control (Admin/Teacher/Student)
  - Protected routes with middleware
  - Register API for creating users
  - Demo accounts included
- **Login Page**: Beautiful gradient UI with role-based redirect
- **Session Management**: JWT-based session strategy

### Previous Updates (v2.2.0)

- **Database API Complete**: Full REST API for progress tracking
  - `GET/POST/DELETE /api/progress` - Student progress management
  - `POST/PUT /api/quiz` - Quiz session tracking
  - `GET /api/subjects` - Subject data retrieval
- **PostgreSQL Support**: Supabase-ready database configuration
- **Setup Guide**: [DATABASE_SETUP.md](next-app/DATABASE_SETUP.md)

### Previous Updates (v2.1.0)

- **Streamlit Removed**: Streamlit application deprecated and removed
- **New Parser**: Added `parseUnifiedVocabulary.cjs` for unified data management
- **Data Source**: `UNIFIED_VOCABULARY.md` is now the single source of truth
- **Bug Fixes**:
  - Fixed G5 Performing Arts subject name
  - Fixed broken subject names in UNIFIED_VOCABULARY.md
  - Added 1035 questions with pronunciation guides

## Subject Coverage

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

## Documentation

- **SPECIFICATION.md** - Detailed technical specification
- **CLAUDE.md** - Project context for Claude Code
- **app/README.md** - React app specific documentation

## License

Educational use only.
