# Weekly Vocabulary Adventure - Next.js

A gamified vocabulary learning application for Grades 1-5, built with Next.js 16, Prisma, and SQLite.

## Features

- 🎮 **Gamified Learning**: Quiz-based vocabulary learning with points, stages, and rewards
- 📚 **8 Subjects**: Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE
- 📊 **Progress Tracking**: Track student progress with plant growth stages
- 👨‍🏫 **Teacher Portal**: Dashboard for managing students and viewing progress
- 💾 **Database**: SQLite with Prisma ORM (easily migrate to PostgreSQL)

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript 5.9
- **Styling**: Tailwind CSS 4
- **ORM**: Prisma 6.0
- **Database**: SQLite (local) / PostgreSQL (production)
- **Animations**: Framer Motion

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

- **Teacher**: `teacher@example.com` / `password123`
- **Student**: `student@example.com`

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
│   ├── (student)/          # Student portal
│   ├── (teacher)/          # Teacher portal
│   └── api/                # API routes
├── data/                   # Question and vocabulary data
├── lib/                    # Utilities (db, auth, utils)
├── prisma/                 # Database schema and seeds
├── components/             # React components
└── types/                  # TypeScript definitions
```

## API Routes

- `GET /api/subjects` - Get subject data
- `GET /api/progress` - Get student progress
- `POST /api/progress` - Update student progress
- `POST /api/quiz` - Start quiz session

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
