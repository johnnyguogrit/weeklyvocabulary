# Weekly Vocabulary Learning App - Technical Specification

## Document Information

| Field | Value |
|-------|-------|
| Version | 2.6.0 |
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
│   ├── login/                     # Login page
│   │   └── page.tsx               # Unified login for all roles
│   ├── register/                  # Registration page
│   │   └── page.tsx               # Student registration
│   ├── student/                   # Student portal (new simplified structure)
│   │   ├── page.tsx               # Welcome screen
│   │   ├── grades/[grade]/        # Grade selection
│   │   └── subjects/[subject]/    # Subject → Week selection
│   ├── teacher/                   # Teacher portal
│   │   ├── page.tsx               # Dashboard overview
│   │   ├── classes/               # Class management
│   │   │   ├── page.tsx           # Class list
│   │   │   └── [id]/page.tsx      # Class details + students + import/export
│   │   └── students/              # Student directory
│   │       └── page.tsx           # All students (for enrollment)
│   ├── api/                       # API Routes
│   │   ├── auth/[...nextauth]/    # NextAuth handler
│   │   ├── auth/register/route.ts # User registration
│   │   ├── subjects/route.ts      # Subject data
│   │   ├── progress/route.ts      # Progress tracking
│   │   ├── quiz/route.ts          # Quiz sessions
│   │   └── teacher/               # Teacher APIs
│   │       ├── classes/route.ts   # CRUD for classes
│   │       ├── classes/[id]/      # Class details API
│   │       ├── students/route.ts  # All students
│   │       └── dashboard/route.ts # Dashboard stats
│   ├── layout.tsx                 # Root layout
│   └── page.tsx                   # Landing/home page
├── components/
│   └── ui/                        # Radix UI components
├── data/                          # Vocabulary data
│   ├── predefinedQuestions.ts
│   ├── vocabularyData.ts
│   ├── questionGenerator.ts
│   └── translations.ts
├── lib/                           # Utilities
│   ├── auth.ts                    # NextAuth configuration
│   ├── db.ts                      # Prisma client
│   └── utils.ts
├── prisma/
│   ├── schema.prisma              # Database schema
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
ORM: Prisma 6.19.3
Database: PostgreSQL (Supabase) / SQLite (local)
Authentication: NextAuth v5 (Credentials Provider)
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

# Database setup
npx prisma generate # Generate Prisma client
npx prisma db push  # Push schema to database
npx prisma studio   # View database in browser
```

## 7. API Endpoints

### 7.1 Authentication APIs
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler (sign in/out, session) |
| `/api/auth/register` | POST | Register new user (student/teacher) |

### 7.2 Progress API (`/api/progress`)
| Method | Query/Body | Description |
|--------|------------|-------------|
| GET | `?userId={id}&grade={G1}&subject={Maths}` | Get student progress |
| GET | `?userId={id}` | Get all progress for user |
| POST | `{userId, grade, subject, weekId, score, completed, quizData}` | Create/update progress |
| DELETE | `?userId={id}&grade={G1}&subject={Maths}` | Reset progress |

### 7.3 Quiz API (`/api/quiz`)
| Method | Body | Description |
|--------|------|-------------|
| POST | `{userId, grade, subject, weekId, difficulty}` | Start quiz session |
| PUT | `{sessionId, answers, timeSpent}` | Submit quiz answers |

### 7.4 Subjects API (`/api/subjects`)
| Method | Query | Description |
|--------|-------|-------------|
| GET | `?grade={G1}` | Get all subjects for grade |
| GET | `?grade={G1}&subject={Maths}` | Get specific subject data |

### 7.5 Teacher APIs
| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/teacher/dashboard` | GET | Get teacher dashboard stats |
| `/api/teacher/classes` | GET | Get all classes for teacher |
| `/api/teacher/classes` | POST | Create new class |
| `/api/teacher/classes/[id]` | GET | Get class details with students |
| `/api/teacher/classes/[id]` | DELETE | Delete a class |
| `/api/teacher/classes/[id]/students` | POST | Add student to class |
| `/api/teacher/classes/[id]/students/[studentId]` | DELETE | Remove student from class |
| `/api/teacher/classes/[id]/students/import` | POST | Bulk import students from Excel |
| `/api/teacher/classes/[id]/students/export` | GET | Export students to Excel |
| `/api/teacher/students` | GET | Get all students (for enrollment) |

### 7.6 Bulk Import/Excel Format
**Excel Template Columns:**
| Column | Required | Description |
|--------|----------|-------------|
| Email | Yes | Student email address (must be unique) |
| FirstName | Yes | Student first name |
| LastName | Yes | Student last name |
| Grade | Yes | Grade level (G1, G2, G3, G4, G5) |
| Password | No | Student password (default: password123) |
| ParentEmail | No | Parent contact email |
| ParentPhone | No | Parent contact phone |

**Import Response:**
```json
{
  "success": true,
  "results": {
    "total": 25,
    "success": 23,
    "failed": 2,
    "errors": [
      {"row": 5, "email": "invalid@", "error": "Invalid email format"},
      {"row": 12, "email": "duplicate@example.com", "error": "Email already exists"}
    ]
  }
}
```

### 7.4 Response Examples

**Progress GET Response:**
```json
{
  "id": "cm4xxx",
  "userId": "user-123",
  "grade": "G1",
  "subject": "Maths",
  "difficulty": "EASY",
  "totalScore": 150,
  "overallProgress": 33.3,
  "currentPlantStage": "SAPLING",
  "weekProgress": [
    {
      "weekId": 2,
      "locked": false,
      "completed": true,
      "score": 85,
      "keywordsMastered": ["triangle", "circle"]
    }
  ]
}
```

### 7.5 Authentication API (`/api/auth`)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/[...nextauth]` | GET/POST | NextAuth handler (sign in/out, session) |
| `/api/auth/register` | POST | Register new user |

**Register Request:**
```json
{
  "name": "Student Name",
  "email": "student@example.com",
  "password": "password123",
  "role": "STUDENT"
}
```

**Demo Accounts:**
```
Admin:   admin@school.com / admin123
Teacher: teacher@school.com / teacher123
Student: student@school.com / student123
```
```json
{
  "id": "cm4xxx",
  "userId": "user-123",
  "grade": "G1",
  "subject": "Maths",
  "difficulty": "EASY",
  "totalScore": 150,
  "overallProgress": 33.3,
  "currentPlantStage": "SAPLING",
  "weekProgress": [
    {
      "weekId": 2,
      "locked": false,
      "completed": true,
      "score": 85,
      "keywordsMastered": ["triangle", "circle"]
    }
  ]
}
```

### 6.3 Data Parser
```bash
cd app/
node scripts/parseUnifiedVocabulary.cjs
```

## 8. Version History

| Version | Date | Changes |
|---------|------|---------|
| 2.6.0 | 2026-04-27 | **BULK IMPORT/EXPORT**: Excel-based student management<br>- ImportBatch model for tracking bulk operations<br>- Excel import API (POST /students/import)<br>- Excel export API (GET /students/export)<br>- Parent contact fields (parentEmail, parentPhone)<br>- Download template functionality<br>- Import results display with error logging<br>- xlsx library integration |
| 2.5.0 | 2026-04-27 | **TEACHER/STUDENT PORTAL COMPLETE**: Full portal implementation<br>- Student welcome screen with grade/subject selection<br>- Week map with progress visualization<br>- Quiz interface with difficulty levels<br>- Reading comprehension section<br>- Teacher dashboard with class management<br>- Student enrollment system<br>- Class detail view with student roster<br>- Progress tracking per student/subject |
| 2.4.0 | 2026-04-27 | **UI COMPONENTS ADDED**: Radix UI integration<br>- Dialog, Select, Popover, Dropdown Menu<br>- Progress, Scroll Area, Separator, Tabs<br>- Label, Slot components<br>- Form components with validation |
| 2.3.0 | 2026-04-27 | **NEXTAUTH COMPLETE**: Full authentication system<br>- NextAuth v5 (Credentials provider) implemented<br>- Login page with role-based redirect<br>- Middleware route protection<br>- Register API endpoint<br>- Demo accounts (admin/teacher/student)<br>- JWT session strategy |
| 2.2.0 | 2026-04-27 | **DATABASE API COMPLETE**: Full database integration<br>- Progress API (GET/POST/DELETE) implemented<br>- Quiz API (POST/PUT) with session tracking<br>- Subjects API (GET) with syntax fix<br>- PostgreSQL support (Supabase ready)<br>- Database setup guide and seed script |
| 2.1.0 | 2026-04-27 | **STREAMLIT REMOVAL**: Streamlit app deprecated and removed<br>- Added parseUnifiedVocabulary.cjs parser<br>- UNIFIED_VOCABULARY.md as single data source<br>- Fixed G5 subject name (Performing Arts & Drama → Performing Arts)<br>- Fixed broken subject names in UNIFIED_VOCABULARY.md<br>- Data sync between React and Next.js apps |
| 2.0.1 | 2026-04-27 | **BETA RELEASE**: Prisma integration complete<br>- SQLite database configured<br>- Seed data created (teacher/student accounts) |
| 2.0.0 | 2026-04-27 | **NEXT.JS MIGRATION**: Started migration to Next.js App Router |
| 1.4.1 | 2026-04-26 | Last legacy version |

## 9. Known Issues

| Issue | Severity | Status |
|-------|----------|--------|
| Data sync automation | Low | Manual copy required |

## 10. Next Steps

1. **Complete**: Teacher and student portals fully functional
2. **Short-term**: Add reading comprehension content
3. **Medium-term**: Production deployment (Vercel/Supabase)
