# Weekly Vocabulary Learning App - Technical Specification

## Document Information

| Field | Value |
|-------|-------|
| Version | 1.4.1 |
| Last Updated | 2026-04-26 |
| Status | Production Ready |

## 1. System Overview

### 1.1 Purpose
A gamified vocabulary learning application for teaching English vocabulary to students in Grades 1-5 across 8 academic subjects.

**Dual-App Architecture**:
1. **React App** (`app/`): Local frontend for students (port 3000)
2. **Streamlit App** (`pages/`, `data/`): Web-based teacher interface with user management (port 8501)

### 1.2 Target Audience
- **Primary**: Students ages 6-11 (Grades 1-5)
- **Secondary**: Teachers managing class progress via Streamlit dashboard
- **Tertiary**: Parents tracking student performance

### 1.3 Platform
- React App: Modern browsers (Chrome, Firefox, Safari, Edge)
- Streamlit App: Python-based web interface
- Responsive design (desktop, tablet, mobile)

## 2. Functional Requirements

### 2.1 Grade Structure
| Grade | Age Range | Code |
|-------|-----------|------|
| Grade 1 | 6-7 | G1 |
| Grade 2 | 7-8 | G2 |
| Grade 3 | 8-9 | G3 |
| Grade 4 | 9-10 | G4 |
| Grade 5 | 10-11 | G5 |

### 2.2 Subject Coverage
| Subject | Emoji | Color | Code |
|---------|-------|-------|------|
| Mathematics | 🔢 | #2E7D32 | Maths |
| Science | 🔬 | #1565C0 | Science |
| STEAM | 💻 | #6A1B9A | STEAM |
| Music | 🎵 | #E65100 | Music |
| Performing Arts | 🎭 | #C62828 | Performing Arts |
| Drama | 🎬 | #5D4037 | Drama |
| Visual Arts | 🎨 | #AD1457 | Visual Arts |
| Physical Education | ⚽ | #00695C | PE |

### 2.3 Difficulty Levels
| Level | Timer | Hints | Lives | Label |
|-------|-------|-------|-------|-------|
| Easy | None | Yes | ∞ | Easy Explorer 🌱 |
| Medium | 30s | Yes | ∞ | Brave Scholar 🌿 |
| Hard | 15s | No | 3 | Math Master 🌳 |

### 2.4 Week Structure
- **Phase 1**: Weeks 2-5 (Review at Week 5)
- **Phase 2**: Weeks 7-10
- **Phase 3**: Weeks 11-14
- **Final**: Week 15

### 2.5 Game Flow
```
Welcome Screen
    ↓
Grade Selection (G1-G5)
    ↓
Subject Selection (8 options)
    ↓
Difficulty Selection (Easy/Medium/Hard)
    ↓
Week Map (Sequential unlocking)
    ↓
Quiz Section (Multiple choice questions with pronunciation guide)
    ↓
Week Complete Screen
    ↓
[Repeat until all weeks complete]
    ↓
Final Results Screen
```

**Note**: Reading comprehension passages have been disabled for all grades (G1-G5) as of v1.1.0.

## 3. Data Structures

### 3.1 Core Types

```typescript
// Grade and Difficulty
type Grade = 'G1' | 'G2' | 'G3' | 'G4' | 'G5';
type Difficulty = 'easy' | 'medium' | 'hard';
type PlantStage = 'seedling' | 'sapling' | 'young_tree' | 'mighty_oak';

// Question Structure
interface Question {
  id: string;
  type: 'multipleChoice' | 'fillBlank' | 'context';
  question: string;
  options: string[];
  correctAnswer: string;
  explanation: string;  // Includes pronunciation guide with IPA
  weekId: number;
}

// Week Data
interface WeekData {
  id: number;
  title: string;
  color: string;
  emoji: string;
  keywords: string[];
  questions: Question[];
}

// Subject Data
interface SubjectData {
  id: string;
  name: string;
  emoji: string;
  color: string;
  description: string;
  weeks: WeekData[];
  passages: ReadingPassage[];  // Always empty as of v1.1.0
}
```

### 3.2 Progress Tracking

```typescript
interface WeekProgress {
  weekId: number;
  completed: boolean;
  score: number;
  questionsCorrect: number;
  questionsTotal: number;
  keywordsMastered: string[];
  locked: boolean;
}

interface SubjectProgress {
  subject: string;
  weekProgress: WeekProgress[];
  totalScore: number;
  overallProgress: number;
  currentPlantStage: PlantStage;
}

interface PlayerState {
  name: string;
  difficulty: Difficulty;
  currentGrade: Grade | null;
  currentSubject: string | null;
  gradeProgress: Record<Grade, GradeProgress>;
  currentWeek: number | null;
}
```

## 4. Scoring System

### 4.1 Points Breakdown
| Activity | Points |
|----------|--------|
| Correct Quiz Answer | +10 |
| Speed Bonus (<10s) | +5 |
| Perfect Week Bonus | +20 |

### 4.2 Progress Stages
| Stage | Threshold | Emoji |
|-------|-----------|-------|
| Seedling | 0% | 🌱 |
| Sapling | 21% | 🌿 |
| Young Tree | 51% | 🌳 |
| Mighty Oak | 81% | 🌳✨ |

### 4.3 Grade Boundaries
| Percentage | Label | Color |
|------------|-------|-------|
| ≥90% | Outstanding! | #FF8F00 |
| ≥70% | Excellent! | #2E7D32 |
| ≥50% | Great Job! | #42A5F5 |
| <50% | Keep Learning! | #9C27B0 |

## 5. Technical Architecture

### 5.1 Technology Stack
```yaml
Frontend Framework: React 19.2.0
Language: TypeScript 5.9.3
Build Tool: Vite 7.2.4
Styling: Tailwind CSS 3.4.19
UI Components: Radix UI (various)
Animations: Framer Motion 12.38.0
Charts: Recharts 2.15.4
```

### 5.2 Component Architecture
```
App.tsx (Main Container)
├── FloatingEmojiBackground
├── WelcomeScreen
├── GradeSelectScreen
├── SubjectSelectScreen
├── DifficultyScreen
├── WeekMapScreen
│   └── ProgressBar
├── QuizScreen
├── WeekCompleteScreen
└── FinalResultsScreen
```

**Removed Components (v1.1.0)**:
- ~~PronunciationCard~~ (Pronunciation moved to explanation)
- ~~ReadingCompScreen~~ (Reading passages disabled)

### 5.3 Data Flow

**Question Data Flow (Dual-App Sync)**:
```
weeklytest/*.md (Source markdown files)
    ↓
┌─────────────────────────────────────────────┐
│  React App Generation                        │
│  node app/scripts/parseVocabularyMd.cjs     │
│  → app/src/data/predefinedQuestions.ts      │
│  (1023+ questions)                          │
└─────────────────────────────────────────────┘
    ↓
┌─────────────────────────────────────────────┐
│  Streamlit App Generation                    │
│  python scripts/convert_predefined_questions.py │
│  → data/predefined_questions.py             │
│  (Same 1023+ questions)                     │
└─────────────────────────────────────────────┘
    ↓
question_generator.get_subject_data()
    ↓
Both apps use identical predefined questions
```

**Question Priority** (both apps):
1. Predefined questions (from markdown) - 1023 high-quality questions
2. Auto-generated (template-based) - Fallback only

### 5.4 Streamlit Quiz Features (v1.4.0)

**Enhanced Quiz Experience** matching React app functionality:

#### Visual Features
- **Animated Timer Bar**: Real-time countdown with color transitions (green→yellow→red)
- **Gradient Buttons**: Hover effects with elevation and color shifts
- **CSS Animations**: Slide-in, pulse, shake, fade, and bounce effects
- **Performance Emojis**: Perfect→🌳✨, Excellent→🌿, Good→🌱, Keep Practicing→📚

#### Game Mechanics
- **Points System**:
  - Easy: 10 points per correct answer
  - Medium: 15 points + speed bonuses
  - Hard: 20 points + speed bonuses
- **Speed Bonus**: +5 extra points for answering in <10 seconds
- **Lives System** (Hard mode): 3 hearts with game over screen
- **Two-Step Flow**: Select answer → Check (more engaging than immediate submit)

#### Quiz States
1. **Setup Screen**: Grade/Subject/Week/Difficulty selection with keyword preview
2. **Quiz Screen**: Animated timer, options with hover effects, two-step submission
3. **Results Screen**: Score breakdown, performance level, keyword badges, answer review
4. **Game Over Screen**: Triggers when lives depleted in hard mode

#### CSS Animation Classes
```css
.quiz-question      - Slide-in animation for questions
.quiz-option        - Hover effects with elevation
.quiz-option.correct - Pulse animation for correct answers
.quiz-option.incorrect - Shake animation for wrong answers
.timer-bar          - Smooth width transition with color change
.score-display      - Pop-in animation
.speed-bonus        - Pop-in animation for bonus notification
```

## 6. Content Management

### 6.1 Adding New Questions (Dual-App Sync)
When updating questions from markdown files, BOTH apps must be regenerated:

```bash
# Step 1: Edit markdown files in weeklytest/ folder
vim weeklytest/*.md

# Step 2: Regenerate React app predefined questions
cd app/
node scripts/parseVocabularyMd.cjs
# Output: app/src/data/predefinedQuestions.ts

# Step 3: Regenerate Streamlit app predefined questions
cd ../
python scripts/convert_predefined_questions.py
# Output: data/predefined_questions.py

# Step 4: Verify consistency
python scripts/validate_question_sync.py
```

### 6.2 Question Data Files
| App | Predefined Questions File | Questions |
|-----|--------------------------|-----------|
| React | `app/src/data/predefinedQuestions.ts` | 1023+ |
| Streamlit | `data/predefined_questions.py` | 1023+ (synced) |

### 6.2 Markdown Format
The parser supports multiple formats for flexibility:

- **G1 Format**: `• 第N周(keyword)`
- **G2+ Format**: `第N周(keyword1, keyword2, keyword3)`
- **Question Format**: `keyword - 题干：...选项：A) xxx B) xxx C) xxx D) xxx 正确答案：X (解析：...)`

### 6.3 PDF Parsing Tools (weeklytest/)
| Script | Purpose |
|--------|---------|
| `parse_pdf_pdfplumber.py` | Primary PDF to markdown converter using pdfplumber |
| `fix_markdown.py` | Replaces zero-width spaces with newlines |
| `fix_markdown_v2.py` | Reconstructs incomplete questions |

### 6.4 Parser Features (parseVocabularyMd.cjs)
- Handles variant Chinese characters (e.g., `⾳乐` → `音乐`)
- Supports combined subject names (e.g., `表演艺术与戏剧`)
- Detects format automatically (G1, G2, G3/G4/G5)
- Preserves pronunciation guide in explanations

### 6.3 Translation Data
Located in `src/data/translations.ts`:
```typescript
interface Translation {
  cn: string;    // Chinese meaning
  ipa: string;   // IPA pronunciation
  read: string;  // Approximate pronunciation
}
```

### 6.4 Answer Explanation Format (v1.1.0)
Answer explanations now include full pronunciation guide:
```
keyword 中文翻译
/IPA/ → "pronunciation"
原有答案解析内容
```

Example:
```
triangle 三角形
/ˈtraɪæŋɡl/ → "TRY-ang-guhl"
triangle意为"三角形"，符合三条边的几何特征。
```

## 7. Storage

### 7.1 LocalStorage Schema
```typescript
key: "vocabularyAdventure_v2_progress"
value: {
  name: string;
  difficulty: Difficulty;
  currentGrade: Grade | null;
  currentSubject: string | null;
  gradeProgress: Record<Grade, GradeProgress>;
  currentWeek: number | null;
}
```

### 7.2 Persistence Strategy
- Auto-save on any state change
- Load on app initialization
- Merge strategy: preserved locked/unlocked states

## 8. Build & Deployment

### 8.1 Development
```bash
cd app/
npm install
npm run dev    # http://localhost:3000
```

### 8.2 Production
```bash
npm run build  # Creates dist/ folder
npm run preview
```

### 8.3 Output
- `dist/index.html` - Entry point
- `dist/assets/*.css` - Stylesheets
- `dist/assets/*.js` - Bundled JavaScript

## 9. Browser Compatibility

| Browser | Minimum Version |
|---------|-----------------|
| Chrome | 90+ |
| Firefox | 88+ |
| Safari | 14+ |
| Edge | 90+ |

Required features:
- ES2020 support
- CSS Grid & Flexbox
- LocalStorage API
- Canvas API (for confetti)

## 10. Accessibility

### 10.1 Keyboard Navigation
- Tab: Navigate between options
- Enter/Space: Select option
- Arrow keys: Not currently implemented

### 10.2 Screen Reader
- Basic ARIA labels present
- Alt text on images
- Could be improved with more semantic HTML

## 11. Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0.0 | 2025-04-25 | Initial release |
| 1.1.0 | 2025-04-25 | - Disabled reading comprehension for all grades<br>- Moved pronunciation guide to answer explanations<br>- Removed PronunciationCard component |
| 1.2.0 | 2025-04-25 | - Improved PDF parsing with pdfplumber for better text extraction<br>- Added support for variant Chinese characters in subject names<br>- Enhanced markdown format handling for G2-G5<br>- Fixed zero-width space issues from markitdown tool<br>- Regenerated predefinedQuestions.ts with complete question data |
| 1.2.1 | 2026-04-26 | - Fixed incorrect subject name mapping ("Question Type, Fill in the Blank, Fair, Specific, Engaging" → "STEAM")<br>- Added 21 missing predefined questions for G5<br>- Corrected keyword names (2-dimensional, 3-dimensional, half-smash)<br>- Added missing Maths questions: top view, factor, common, share, mixed number, whole<br>- Added missing Science questions: small intestine, grow, human, body, health, electricity, safety, thorn<br>- Added missing STEAM questions: Question Type, Fair<br>- Added missing PE questions: half-smash, base position |
| 1.3.0 | 2026-04-26 | - **CRITICAL FIX**: Streamlit app now uses same predefined questions as React app<br>- Created TS→Python converter script (`scripts/convert_predefined_questions.py`)<br>- Streamlit Quiz page updated to use `get_subject_data()` with predefined questions<br>- Cleaned up 18 old scripts and process files<br>- Added data sync documentation in CLAUDE.md<br>- Created validation script for question consistency<br>- **Result**: 1023 high-quality predefined questions now shared between both apps |
| 1.4.0 | 2026-04-26 | - **MAJOR ENHANCEMENT**: Streamlit Quiz page redesigned to match React app experience<br>- Added animated countdown timer with color transitions (green→yellow→red)<br>- Implemented full points system: Easy=10pts, Medium=15pts, Hard=20pts<br>- Added speed bonus (+5pts) for fast correct answers (<10s)<br>- Implemented two-step answer flow: Select → Check (more engaging)<br>- Added lives system (3 hearts) for hard mode with game over screen<br>- Enhanced CSS with slide-in, pulse, shake, and bounce animations<br>- Added gradient backgrounds, hover effects, and shadows<br>- Implemented celebration screen with performance levels (Perfect→🌳✨, Excellent→🌿, Good→🌱)<br>- Added comprehensive results screen with metrics breakdown and keyword badges<br>- Improved difficulty info expander with detailed mode descriptions |
| 1.4.1 | 2026-04-26 | - **HOTFIX**: Fixed dictionary access syntax in quiz page<br>- Changed `config.timer` to `config['timer']` throughout the file<br>- Fixed `DIFFICULTY_CONFIG[x].timer` to `DIFFICULTY_CONFIG[x]['timer']`<br>- Committed and pushed complete predefined_questions.py with 1023+ questions<br>- Resolved KeyError on Streamlit Cloud deployment |

## 12. Future Enhancements

1. **Multiplayer Mode**: Compete with classmates
2. **Teacher Dashboard**: Track class progress
3. **Audio**: Text-to-speech for pronunciation
4. **Offline Mode**: Service worker for PWA
5. **Analytics**: Learning insights and recommendations
