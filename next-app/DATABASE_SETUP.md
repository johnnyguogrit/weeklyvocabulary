# Next.js App - Database Setup Guide

## Prerequisites

1. **Supabase Account** (recommended) or any PostgreSQL database
2. Node.js 18+ installed

## Step 1: Set up Database

### Option A: Supabase (Recommended)

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned
3. Go to Project Settings > Database
4. Copy the Connection String (URI format)

### Option B: Local PostgreSQL

```bash
# Install PostgreSQL
# Windows: Download from postgresql.org
# Mac: brew install postgresql
# Linux: sudo apt-get install postgresql

# Create database
createdb vocabulary_adventure
```

## Step 2: Configure Environment

1. Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

2. Edit `.env` and update `DATABASE_URL`:
```env
# Supabase format
DATABASE_URL="postgresql://postgres:[YOUR-PASSWORD]@db.[YOUR-PROJECT].supabase.co:5432/postgres"

# Local format
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/vocabulary_adventure"
```

## Step 3: Run Migrations

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (development)
npx prisma db push

# Or use migrations (production)
npx prisma migrate dev --name init
```

## Step 4: (Optional) Seed Database

```bash
npx ts-node scripts/seed-db.ts
```

## Step 5: Verify Connection

```bash
# Open Prisma Studio to view data
npx prisma studio
```

## API Endpoints

After setup, these API endpoints are available:

### Progress API
- `GET /api/progress?userId={id}&grade={G1}&subject={Maths}` - Get progress
- `POST /api/progress` - Create/update progress
- `DELETE /api/progress?userId={id}&grade={G1}&subject={Maths}` - Reset progress

### Quiz API
- `POST /api/quiz` - Start quiz session
- `PUT /api/quiz` - Submit quiz answers

### Subjects API
- `GET /api/subjects?grade={G1}` - Get all subjects for grade
- `GET /api/subjects?grade={G1}&subject={Maths}` - Get specific subject

## Troubleshooting

### Connection Issues
- Check DATABASE_URL format
- Verify database is running
- Check firewall settings

### Migration Errors
```bash
# Reset database (WARNING: deletes all data)
npx prisma migrate reset

# Or force push
npx prisma db push --force-reset
```
