# Weekly Vocabulary Learning App - Technical Specification

## Document Information

| Field | Value |
|-------|-------|
| Version | 1.2.0 |
| Last Updated | 2025-04-25 |
| Status | Production Ready |

## 1. System Overview

### 1.1 Purpose
A gamified web application for teaching English vocabulary to students in Grades 1-5 across 8 academic subjects.

### 1.2 Target Audience
- Primary: Students ages 6-11 (Grades 1-5)
- Secondary: Teachers and parents tracking progress

### 1.3 Platform
- Web browser (modern browsers: Chrome, Firefox, Safari, Edge)
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
```
vocabularyData.ts (Keywords by week)
    ↓
predefinedQuestions.ts (Parsed from MD files)
    ↓
questionGenerator.ts (getSubjectData)
    ↓
App.tsx (Consumes SubjectData)
```

## 6. Content Management

### 6.1 Adding New Questions
1. Place PDF source files in `weeklytest/` directory
2. Parse PDFs to markdown using `python weeklytest/parse_pdf_pdfplumber.py`
3. Run parser: `cd app/ && node scripts/parseVocabularyMd.cjs`
4. Generated file: `src/data/predefinedQuestions.ts`

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

## 12. Future Enhancements

1. **Multiplayer Mode**: Compete with classmates
2. **Teacher Dashboard**: Track class progress
3. **Audio**: Text-to-speech for pronunciation
4. **Offline Mode**: Service worker for PWA
5. **Analytics**: Learning insights and recommendations
