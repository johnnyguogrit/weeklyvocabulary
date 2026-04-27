# Test Cases - Weekly Vocabulary Learning System

## Test Environment

### Production (Vercel)
- **URL**: https://weeklyvocabulary.vercel.app
- **Test Date**: 2026-04-28
- **Version**: 3.0.0
- **Database**: Supabase PostgreSQL (Project: weeklyvocabulary)

### Local Development
- **URL**: http://localhost:3000
- **Database**: Supabase PostgreSQL / SQLite

## Important Flow Notes

**v2.7.0 Changes:**
- **Authentication**: NextAuth v5 with role-based routing
- **Database Connection**: Supabase Pooler for better performance
- **Role-Based Redirects**:
  - Teachers → `/teacher` dashboard after login
  - Students → `/student` welcome page after login
- **Registration**: Teacher-only registration at `/register`

**v2.6.0+ Changes:**
- **Student Self-Registration**: DISABLED - Only teachers can register
- **Student Creation**: Teachers create student accounts directly within class pages
- **No Standalone Students**: No `/teacher/students` directory - all students must belong to a class
- **Two Ways to Add Students**:
  1. **Add Single**: Create one student at a time via dialog form
  2. **Import Excel**: Bulk create students from Excel/CSV file

---

## Test Scenario 1: Teacher Registration & Authentication

### TC-001: Register New Teacher Account

| Field | Value |
|-------|-------|
| **Test ID** | TC-001 |
| **Title** | Register as new teacher |
| **Priority** | High |
| **Preconditions** | System is running, no teacher account exists |

**Steps:**

1. Navigate to http://localhost:3000
2. Click "Register" button or visit http://localhost:3000/register
3. Fill in registration form:
   - Name: `Test Teacher`
   - Email: `teacher.test@example.com`
   - Password: `Test1234!`
   - Confirm Password: `Test1234!`
4. Click "Create Teacher Account" button

**Expected Result:**
- Success message: "Teacher account created! Signing you in..."
- User is auto-signed in
- Redirected to teacher dashboard (`/teacher`)
- Dashboard shows: 0 classes, 0 students
- Welcome message shows teacher name

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-002: Teacher Login

| Field | Value |
|-------|-------|
| **Test ID** | TC-002 |
| **Title** | Teacher login with credentials |
| **Priority** | High |
| **Preconditions** | Teacher account exists |

**Steps:**

1. Navigate to http://localhost:3000/login
2. Click "Teacher" tab
3. Enter credentials:
   - Email: `teacher.test@example.com`
   - Password: `Test1234!`
4. Click "Sign In" button

**Expected Result:**
- Success message: "Login successful! Redirecting..."
- Redirected to `/teacher` dashboard
- Teacher sees their classes and stats

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-003: Teacher Logout

| Field | Value |
|-------|-------|
| **Test ID** | TC-003 |
| **Title** | Teacher logout |
| **Priority** | Medium |
| **Preconditions** | Teacher is logged in |

**Steps:**

1. From teacher dashboard, click "Sign Out" button
2. Verify redirect to login page

**Expected Result:**
- Session cleared
- Redirected to `/login`
- Cannot access `/teacher` without login

**Actual Result:** ___________________

**Status:** Pass / Fail

---

## Test Scenario 2: Class Management

### TC-101: Create G1 Class

| Field | Value |
|-------|-------|
| **Test ID** | TC-101 |
| **Title** | Create Grade 1 class |
| **Priority** | High |
| **Preconditions** | Teacher is logged in |

**Steps:**

1. From teacher dashboard, click "Create Class" button
2. Fill in class details:
   - Class Name: `G1 Test Class 2026`
   - Grade: `G1`
3. Click "Create" button

**Expected Result:**
- Success message: "Class created successfully"
- New class appears in class list
- Class shows: 0 students
- Link to class detail page

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-102: Add Single Student

| Field | Value |
|-------|-------|
| **Test ID** | TC-102 |
| **Title** | Create new student account and add to class |
| **Priority** | High |
| **Preconditions** | Class exists |

**Steps:**

1. Navigate to class detail page (`/teacher/classes/[class-id]`)
2. Click "Add Single" button
3. Fill in student details:
   - First Name: `Diana`
   - Last Name: `Ho`
   - Email: `diana.ho@example.com`
   - Password: (leave empty for default)
   - Parent Email: `parent.diana@example.com`
   - Parent Phone: `+852-98765433`
4. Click "Add Student"

**Expected Result:**
- Success message: "Student added successfully!"
- Student appears in class roster
- Student count updates to 1
- Student card shows: Diana Ho (diana.ho@example.com)

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-103: Bulk Import Students via Excel

| Field | Value |
|-------|-------|
| **Test ID** | TC-103 |
| **Title** | Bulk import 3 students via Excel |
| **Priority** | High |
| **Preconditions** | Class exists |

**Test Data (Excel/CSV):**

```csv
Email,FirstName,LastName,Grade,Password,ParentEmail,ParentPhone
alice.chan@example.com,Alice,Chan,G1,Pass123,parent.alice@example.com,+852-98765432
bob.wong@example.com,Bob,Wong,G1,Pass456,parent.bob@example.com,+852-87654321
charlie.lee@example.com,Charlie,Lee,G1,Pass789,parent.charlie@example.com,+852-76543210
```

**Steps:**

1. Navigate to class detail page
2. Click "Template" button to download template
3. Fill template with test data above
4. Save as `test_students.xlsx`
5. Click "Import" button
6. Select `test_students.xlsx` file
7. Wait for import to complete

**Expected Result:**
- Import progress indicator shows
- Success message: "Imported 3 students successfully"
- All 3 students appear in class roster
- Student count updates to 4 (1 from TC-102 + 3 imported)

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-104: Export Class Roster

| Field | Value |
|-------|-------|
| **Test ID** | TC-104 |
| **Title** | Export students to Excel |
| **Priority** | Medium |
| **Preconditions** | Class has students |

**Steps:**

1. Navigate to class detail page
2. Click "Export" button
3. Verify downloaded file

**Expected Result:**
- File downloads automatically: `G1 Test Class 2026_students_YYYY-MM-DD.xlsx`
- File contains all 4 students with their data
- Columns: No, Email, FirstName, LastName, Grade, Password, ParentEmail, ParentPhone, TotalSubjects, AvgProgress, TotalScore, EnrolledDate

**Actual Result:** ___________________

**Status:** Pass / Fail

---

## Test Scenario 3: Student Learning Flow

### TC-201: Student Login

| Field | Value |
|-------|-------|
| **Test ID** | TC-201 |
| **Title** | Student login to system |
| **Priority** | High |
| **Preconditions** | Student account exists |

**Steps:**

1. Navigate to http://localhost:3000
2. Click "Login" button
3. Click "Student" tab
4. Enter credentials:
   - Email: `alice.chan@example.com`
   - Password: `Pass123`
5. Click "Sign In"

**Expected Result:**
- Login successful
- Redirected to student welcome page (`/student`)
- Welcome message displays student name: "Alice Chan"

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-202: Select Grade

| Field | Value |
|-------|-------|
| **Test ID** | TC-202 |
| **Title** | Select Grade 1 |
| **Priority** | High |
| **Preconditions** | Student is logged in |

**Steps:**

1. From welcome page, click on "Grade 1" card

**Expected Result:**
- Grade 1 selected
- Redirected to subject selection page (`/student/1`)
- All 8 subjects displayed with progress indicators

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-203: Select Subject and Start Quiz

| Field | Value |
|-------|-------|
| **Test ID** | TC-203 |
| **Title** | Start Week 2 quiz |
| **Priority** | High |
| **Preconditions** | Grade is selected |

**Steps:**

1. From subject page, click "Mathematics" card
2. Click "Week 2" on the week map
3. Select difficulty: "Easy"
4. Click "Start Quiz"

**Expected Result:**
- Quiz interface loads
- Question displayed with 4 options (A, B, C, D)
- Timer disabled (Easy mode)
- Hint button available
- Lives: ∞ (Easy mode)

**Actual Result:** ___________________

**Status:** Pass / Fail

---

### TC-204: Complete Quiz and View Results

| Field | Value |
|-------|-------|
| **Test ID** | TC-204 |
| **Title** | Complete week and view results |
| **Priority** | High |
| **Preconditions** | Quiz is started |

**Steps:**

1. Answer all questions in Week 2
2. View completion screen
3. Note final score
4. Click "Continue" or "Back to Weeks"

**Expected Result:**
- Completion screen displays:
  - Final score
  - Number of correct answers
  - Performance message
  - Plant growth stage
- Week marked as completed
- Next week (Week 3) unlocks
- Progress saved to database

**Actual Result:** ___________________

**Status:** Pass / Fail

---

## Test Accounts Summary

### Teacher Account
| Field | Value |
|-------|-------|
| Name | Test Teacher |
| Email | teacher.test@example.com |
| Password | Test1234! |
| Role | Teacher |

### Student Accounts
| Name | Email | Password | Grade | Created Via |
|------|-------|----------|-------|-------------|
| Diana Ho | diana.ho@example.com | password123 (default) | G1 | TC-102 (Add Single) |
| Alice Chan | alice.chan@example.com | Pass123 | G1 | TC-103 (Import) |
| Bob Wong | bob.wong@example.com | Pass456 | G1 | TC-103 (Import) |
| Charlie Lee | charlie.lee@example.com | Pass789 | G1 | TC-103 (Import) |

---

## Bug Fixes - v2.7.0 (2026-04-27)

### 🐛 BUG-001: Teacher Login Redirecting to Student Page
**Status:** FIXED

**Issue:**
After teacher registration and login, users were redirected to the student vocabulary test page instead of the teacher dashboard.

**Root Cause:**
- `auth.config.ts` authorize function was not returning the `role` field
- JWT callback was using `(user as any).role` which was undefined
- Middleware couldn't determine user role for routing

**Fixes Applied:**
| File | Change |
|------|--------|
| `lib/auth.config.ts` | Added `role: user.role` to authorize return value |
| `lib/auth.config.ts` | Simplified JWT callback to use `user.role` directly |

### 🐛 BUG-002: Database Connection Failure
**Status:** FIXED

**Issue:**
Error: "Can't reach database server at `db.udczwafhjuewnzvrcvdq.supabase.co:5432`"

**Root Cause:**
- Using direct connection string in serverless environment
- DNS resolution issues with direct connection hostname

**Fixes Applied:**
| File | Change |
|------|--------|
| `.env.local` | Changed to Supabase Pooler connection (port 6543) |
| `.env.local` | Added `AUTH_SECRET` and `AUTH_URL` for NextAuth v5 |

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| v3.0.0 | 2026-04-28 | **PRODUCTION RELEASE** - Deployed to Vercel, Tailwind v3 compatibility, Prisma Client location fix |
| v2.7.0 | 2026-04-27 | Fixed auth routing, database connection |
| v2.6.1 | 2026-04-27 | Fixed progress saving, week unlock |
| v2.6.0 | 2026-04-25 | Teacher-only registration |

---

## Production Deployment - v3.0.0 (2026-04-28)

### Deployment Details
- **Platform**: Vercel
- **Framework**: Next.js 16.2.4 (App Router)
- **Runtime**: Node.js (not Edge)
- **Build**: Turbopack
- **Root Directory**: `next-app/`

### Key Changes for Production
1. **Tailwind CSS v3**: Downgraded from v4 for Vercel compatibility
2. **Prisma Client**: Custom output location (`generated/client`) committed to git
3. **Edge Runtime**: Disabled - using Node.js runtime for Prisma compatibility
4. **Environment Variables**: Configured in Vercel Dashboard

### Vercel Configuration
| Setting | Value |
|---------|-------|
| Root Directory | `next-app` |
| Framework Preset | `Next.js` |
| Build Command | (auto-detected: `pnpm run build`) |
| Install Command | (auto-detected: `pnpm install`) |

### Demo Accounts (Production)
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@school.com | admin123 |
| Teacher | teacher@school.com | teacher123 |
| Student | student@school.com | student123 |

### Known Issues
- None major - fully functional on Vercel

---

## Test Execution Summary

| Date | Tester | Pass | Fail | Blocked | Notes |
|------|--------|------|------|---------|-------|
| 2026-04-28 | Claude | - | - | - | v3.0.0 - Production deployment on Vercel |
| 2026-04-27 | Claude | - | - | - | v2.7.0 - Auth fixes |
