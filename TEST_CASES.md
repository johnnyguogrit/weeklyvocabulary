# Test Cases - Weekly Vocabulary Learning System

## Test Environment

- **URL**: http://localhost:3000
- **Test Date**: 2026-04-27
- **Version**: 2.6.1
- **Database**: Supabase PostgreSQL (Project: weeklyvocabulary)

## Important Flow Notes

**v2.6.0+ Changes:**
- **Student Self-Registration**: DISABLED - Only teachers can register
- **Student Creation**: Teachers create student accounts directly within class pages
- **No Standalone Students**: No `/teacher/students` directory - all students must belong to a class
- **Two Ways to Add Students**:
  1. **Add Single**: Create one student at a time via dialog form
  2. **Import Excel**: Bulk create students from Excel/CSV file

---

## Test Scenario 1: Teacher Registration & Class Setup

### TC-001: Register New Teacher Account

| Field | Value |
|-------|-------|
| **Test ID** | TC-001 |
| **Title** | Register as new teacher |
| **Priority** | High |
| **Preconditions** | System is running, no teacher account exists |

**Steps:**

1. Navigate to http://localhost:3000
2. Click "Register" button
3. Fill in registration form:
   - Name: `Test Teacher`
   - Email: `teacher.test@example.com`
   - Password: `Test1234!`
   - Role: Select `Teacher`
4. Click "Sign Up" button

**Expected Result:**
- Registration successful message appears
- User is redirected to teacher dashboard (`/teacher`)
- Dashboard shows: 0 classes, 0 students

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-002: Create G1 Class

| Field | Value |
|-------|-------|
| **Test ID** | TC-002 |
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

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-003: Add Single Student (Create New Account)

| Field | Value |
|-------|-------|
| **Test ID** | TC-003 |
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

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-004: Bulk Import Students via Excel

| Field | Value |
|-------|-------|
| **Test ID** | TC-004 |
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
- Student count updates to 4 (1 from TC-003 + 3 imported)

**Note:** Students are created directly during import - no standalone student accounts exist

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-005: Export Class Roster

| Field | Value |
|-------|-------|
| **Test ID** | TC-005 |
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

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-006: View Student Progress in Class

| Field | Value |
|-------|-------|
| **Test ID** | TC-006 |
| **Title** | View student progress from class view |
| **Priority** | Medium |
| **Preconditions** | Students have taken quizzes |

**Steps:**

1. Navigate to class detail page
2. Check student cards for progress indicators

**Expected Result:**
- Each student card shows:
  - Student avatar (first letter of name)
  - Student name and email
  - Number of subjects active
  - Average progress percentage
  - Total score
  - Remove button

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-006: View Student Progress in Class

| Field | Value |
|-------|-------|
| **Test ID** | TC-007 |
| **Title** | Remove student from class |
| **Priority** | Low |
| **Preconditions** | Class has enrolled students |

**Steps:**

1. Navigate to class detail page
2. Find student: `charlie.lee@example.com`
3. Click trash icon (Remove button)
4. Confirm removal in dialog

**Expected Result:**
- Confirmation dialog appears
- After confirming, success message appears
- Student is removed from roster
- Student count decreases by 1

**Actual Result:** _________________

**Status:** Pass / Fail

---

## Test Scenario 2: Student Learning Flow

### TC-101: Student Login

| Field | Value |
|-------|-------|
| **Test ID** | TC-101 |
| **Title** | Student login to system |
| **Priority** | High |
| **Preconditions** | Student account exists |

**Steps:**

1. Navigate to http://localhost:3000
2. Click "Login" button
3. Enter credentials:
   - Email: `alice.chan@example.com`
   - Password: `Pass123`
4. Click "Sign In"

**Expected Result:**
- Login successful
- Redirected to student welcome page (`/student`)
- Welcome message displays student name: "Alice Chan"

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-102: Select Grade

| Field | Value |
|-------|-------|
| **Test ID** | TC-102 |
| **Title** | Select Grade 1 |
| **Priority** | High |
| **Preconditions** | Student is logged in |

**Steps:**

1. From welcome page, click on "Grade 1" card

**Expected Result:**
- Grade 1 selected
- Redirected to subject selection page
- All 8 subjects displayed with progress indicators

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-103: Select Subject

| Field | Value |
|-------|-------|
| **Test ID** | TC-103 |
| **Title** | Select Mathematics subject |
| **Priority** | High |
| **Preconditions** | Grade is selected |

**Steps:**

1. From subject page, click "Mathematics" card

**Expected Result:**
- Mathematics selected
- Redirected to week map view
- Week progression shown (Weeks 2-5, 7-10, 11-14, 15)
- Week 2 is unlocked (not locked)
- Future weeks are locked

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-104: Select Week and Start Quiz

| Field | Value |
|-------|-------|
| **Test ID** | TC-104 |
| **Title** | Start Week 2 quiz |
| **Priority** | High |
| **Preconditions** | Subject is selected |

**Steps:**

1. From week map, click "Week 2"
2. Select difficulty: "Easy"
3. Click "Start Quiz"

**Expected Result:**
- Quiz interface loads
- Question displayed with 4 options (A, B, C, D)
- Timer disabled (Easy mode)
- Hint button available
- Lives: ∞ (Easy mode)

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-105: Complete Quiz Questions

| Field | Value |
|-------|-------|
| **Test ID** | TC-105 |
| **Title** | Answer quiz questions |
| **Priority** | High |
| **Preconditions** | Quiz is started |

**Steps:**

1. Read question
2. Select answer option
3. Click "Submit" or wait for auto-submit
4. View feedback (correct/incorrect with explanation)
5. Click "Next" to continue
6. Repeat for all questions

**Expected Result:**
- Each answer shows immediate feedback
- Correct answers: Green highlight + confetti animation
- Incorrect answers: Red highlight + correct answer shown
- Explanation displayed after each answer
- Progress indicator updates
- Score accumulates

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-106: Complete Week and View Results

| Field | Value |
|-------|-------|
| **Test ID** | TC-106 |
| **Title** | Complete week and view results |
| **Priority** | High |
| **Preconditions** | All questions answered |

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
  - Plant growth stage (Seedling → Sapling)
- Week marked as completed
- Next week (Week 3) unlocks
- Progress saved to database

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-107: View Overall Progress

| Field | Value |
|-------|-------|
| **Test ID** | TC-107 |
| **Title** | View student progress |
| **Priority** | Medium |
| **Preconditions** | Student has completed activities |

**Steps:**

1. From subject page, view progress indicators
2. Check overall progress percentage
3. Check plant growth stage

**Expected Result:**
- Progress bar shows completion percentage
- Plant emoji reflects stage:
  - 0-20%: 🌱 Seedling
  - 21-50%: 🌿 Sapling
  - 51-80%: 🌳 Young Tree
  - 81-100%: 🌳✨ Mighty Oak

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-108: Retry Completed Week

| Field | Value |
|-------|-------|
| **Test ID** | TC-108 |
| **Title** | Redo a completed week |
| **Priority** | Medium |
| **Preconditions** | Week is completed |

**Steps:**

1. Navigate back to Mathematics week map
2. Click on completed Week 2
3. Select difficulty
4. Click "Start Quiz"

**Expected Result:**
- Warning/message: "You've completed this week. Retrying may update your score."
- Quiz starts with new questions or same questions
- Previous score is compared to new score
- Higher score replaces previous score

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-109: Test Different Difficulty Levels

| Field | Value |
|-------|-------|
| **Test ID** | TC-109 |
| **Title** | Test Medium and Hard modes |
| **Priority** | Medium |
| **Preconditions** | Student is on a week |

**Steps:**

**Medium Mode:**
1. Select Week 3
2. Choose "Medium" difficulty
3. Start quiz

**Hard Mode:**
1. Select Week 3
2. Choose "Hard" difficulty
3. Start quiz

**Expected Results:**

| Mode | Timer | Hints | Lives |
|------|-------|-------|-------|
| Easy | None | Yes (3) | ∞ |
| Medium | 30s/question | Yes (3) | ∞ |
| Hard | 15s/question | No | 3 |

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-110: Student Logout

| Field | Value |
|-------|-------|
| **Test ID** | TC-110 |
| **Title** | Student logout |
| **Priority** | Low |
| **Preconditions** | Student is logged in |

**Steps:**

1. Click user menu/profile
2. Click "Logout"

**Expected Result:**
- Session cleared
- Redirected to login page
- Progress saved (not lost)

**Actual Result:** _________________

**Status:** Pass / Fail

---

## Test Scenario 3: Cross-Role Verification

### TC-201: Teacher View Student Progress

| Field | Value |
|-------|-------|
| **Test ID** | TC-201 |
| **Title** | Teacher views student progress after quiz |
| **Priority** | High |
| **Preconditions** | Student has completed quiz |

**Steps:**

1. Login as teacher (`teacher.test@example.com`)
2. Navigate to "G1 Test Class 2026"
3. Find student: `alice.chan@example.com`
4. Check progress displayed on student card

**Expected Result:**
- Student card shows updated progress
- Subjects active: 1 (Mathematics)
- Average progress: > 0%
- Total score reflects quiz completion

**Actual Result:** _________________

**Status:** Pass / Fail

---

### TC-202: Multiple Students Progress

| Field | Value |
|-------|-------|
| **Test ID** | TC-202 |
| **Title** | View all students' progress |
| **Priority** | Medium |
| **Preconditions** | Multiple students have activity |

**Steps:**

1. As teacher, view class roster
2. Compare progress across all 4 students

**Expected Result:**
- Each student shows individual progress
- Students who haven't taken quizzes show 0% progress
- Active students show their respective progress

**Actual Result:** _________________

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
| Diana Ho | diana.ho@example.com | password123 (default) | G1 | TC-003 (Add Single) |
| Alice Chan | alice.chan@example.com | Pass123 | G1 | TC-004 (Import) |
| Bob Wong | bob.wong@example.com | Pass456 | G1 | TC-004 (Import) |
| Charlie Lee | charlie.lee@example.com | Pass789 | G1 | TC-004 (Import) |

**Note:** All students are created by teachers and automatically enrolled in a class. No standalone "student directory" exists.

---

## Bug Report Template

If any test fails, document below:

| Bug ID | TC Reference | Description | Severity |
|--------|-------------|-------------|----------|
| BUG-001 | TC-___ | | |

---

## Test Execution Summary

| Date | Tester | Pass | Fail | Blocked | Notes |
|------|--------|------|------|---------|-------|
| 2026-04-27 | Claude | 3 | 0 | 0 | v2.6.0 - Student registration disabled |

---

## Test Results - 2026-04-27

### ✅ TC-REG-001: Student Self-Registration Disabled
**Status:** PASS

**Verification:**
- Register page only shows "Teacher Registration"
- Note displayed: "Student accounts are created by teachers through class import"
- No student role selection option available
- Attempting to register as student returns error

---

### ✅ TC-REG-002: No Standalone Students Page
**Status:** PASS

**Verification:**
- `/teacher/students` route removed
- `/api/teacher/students` API endpoint removed
- Navigation no longer references students directory

---

### ✅ TC-REG-003: Class Page Student Management
**Status:** PASS

**Verification:**
- "Add Single" button available for individual student creation
- "Import" button available for bulk Excel import
- "Export" button for downloading class roster
- "Template" button for downloading import template
- All operations happen within class context - no orphan students

---

## Bug Fixes - 2026-04-27 (v2.6.1)

### 🐛 BUG-001: Progress Not Saving After Quiz Completion
**Status:** FIXED

**Issues:**
1. Completing a week did not unlock the next week
2. "Grade 5 • 0/13 weeks completed" was not updating
3. Total Score was not updating
4. Vocabulary Garden progress bar was not updating

**Root Causes:**
1. Completion calculation used cumulative score instead of accuracy percentage
2. Next week was not being created when completing a week (only updated if existed)
3. Total score was averaged over ALL weeks (including unattempted weeks with 0 score)

**Fixes Applied:**
| File | Change |
|------|--------|
| `app/student/[grade]/[subject]/[weekId]/page.tsx` | Fixed completion calculation using accuracy |
| `app/api/progress/route.ts` | Changed `updateMany` to `upsert` for next week creation |
| `app/api/progress/route.ts` | Total score now only counts attempted weeks |
| `app/student/[grade]/[subject]/page.tsx` | Label changed from "Total Points" to "Average Score" |

**Verification Steps:**
1. Complete Week 2 with 70%+ accuracy
2. Verify Week 3 is unlocked and visible
3. Verify "Grade 5 • 1/13 weeks completed" updates
4. Verify "Average Score" shows correct percentage
5. Verify progress bar updates correctly

---

## API Changes Summary

### New Endpoints
- `POST /api/teacher/classes/[id]/students/enroll-existing` - Enroll student by email to class

### Removed Endpoints
- `GET /api/teacher/students` - No longer needed (no student directory)
- `DELETE /api/teacher/students/[id]` - Use class-specific endpoint instead

### Existing Endpoints (Unchanged)
- `POST /api/teacher/classes/[id]/students/import` - Bulk import students
- `GET /api/teacher/classes/[id]/students/export` - Export class roster
- `DELETE /api/teacher/classes/[id]/students/[studentId]` - Remove from class

---

## Files Modified

| File | Change |
|------|--------|
| `next-app/app/register/page.tsx` | Removed student registration option |
| `next-app/app/teacher/students/page.tsx` | **DELETED** |
| `next-app/app/api/teacher/students/route.ts` | **DELETED** |
| `next-app/app/teacher/classes/[id]/page.tsx` | Added single student creation dialog |
| `next-app/app/api/teacher/classes/[id]/students/enroll-existing/route.ts` | **NEW** - Enroll by email |
| `TEST_CASES.md` | Updated to reflect new flow |

---

## Deployment - Supabase Setup (v2.6.1)

### Supabase Project Configuration

| Setting | Value |
|---------|-------|
| **Project Name** | weeklyvocabulary |
| **Project ID** | udczwafhjuewnzvrcvdq |
| **Region** | Southeast Asia (Singapore) |
| **Database** | PostgreSQL |
| **Status** | Active |

### Connection Strings

**Direct Connection (Port 5432):**
```
postgresql://postgres:[PASSWORD]@db.udczwafhjuewnzvrcvdq.supabase.co:5432/postgres
```

**Connection Pooler (Port 6543):**
```
postgresql://postgres.udczwafhjuewnzvrcvdq:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres
```

### Environment Variables Required

```env
DATABASE_URL="postgresql://postgres.udczwafhjuewnzvrcvdq:[PASSWORD]@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres:[PASSWORD]@db.udczwafhjuewnzvrcvdq.supabase.co:5432/postgres"
NEXTAUTH_SECRET="[GENERATED_SECRET]"
NEXTAUTH_URL="http://localhost:3000"
```

### Database Tables Created

All tables manually created via Supabase SQL Editor:
- `User` - User accounts (teachers/students)
- `Class` - Teacher classes
- `Enrollment` - Student-class relationships
- `StudentProgress` - Student learning progress
- `WeekProgress` - Week-by-week progress
- `QuizSession` - Active quiz sessions
- `ImportBatch` - Bulk import tracking

### Local Development

```bash
cd next-app
npm run dev
# Access at http://localhost:3001 (or 3000)
```

### Production Deployment (Vercel)

1. Push code to Git repository
2. Import project in Vercel
3. Configure environment variables:
   - `DATABASE_URL` (Supabase Pooler URL)
   - `DIRECT_URL` (Supabase Direct URL)
   - `NEXTAUTH_SECRET` (Generate with `openssl rand -base64 32`)
   - `NEXTAUTH_URL` (Production domain, e.g., `https://your-app.vercel.app`)

---

## Version History
