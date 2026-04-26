# 🌱 Weekly Vocabulary Learning App

A gamified vocabulary learning application for students in Grades 1-5. Learn English vocabulary across 8 subjects through interactive quizzes, reading comprehension, and progress tracking.

![Grade Levels](https://img.shields.io/badge/Grades-G1--G5-green)
![React](https://img.shields.io/badge/React-19.2-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Vite](https://img.shields.io/badge/Vite-7.2-purple)

## ✨ Features

- **5 Grade Levels**: Content tailored for Grades 1-5 (ages 6-11)
- **8 Subjects**: Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE
- **3 Difficulty Modes**: Easy Explorer, Brave Scholar, Math Master
- **Gamified Learning**: Points, badges, plant growth metaphor
- **Progress Tracking**: Automatically saves to local storage
- **Responsive Design**: Works on desktop, tablet, and mobile
- **15+ Weeks per Subject**: Structured learning path with review weeks

## 🎯 How It Works

1. **Select your grade** (G1-G5)
2. **Choose a subject** (8 options)
3. **Pick difficulty** (Easy/Medium/Hard)
4. **Complete weeks sequentially** - each week unlocks the next
5. **Answer vocabulary questions** with multiple choice options
6. **Read passages** and answer comprehension questions
7. **Earn points** and watch your vocabulary plant grow! 🌱→🌳✨

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist/` directory.

## 📁 Project Structure

```
app/
├── src/
│   ├── App.tsx                 # Main application
│   ├── types/game.ts           # Type definitions
│   ├── data/
│   │   ├── questionGenerator.ts    # Question logic
│   │   ├── predefinedQuestions.ts   # 1000+ predefined questions
│   │   ├── vocabularyData.ts       # Keywords by week/subject
│   │   └── translations.ts         # Chinese translations
│   └── components/ui/         # Reusable UI components
├── public/assets/             # Images and assets
├── scripts/                   # Utilities
│   └── parseUnifiedVocabulary.cjs  # UNIFIED_VOCABULARY.md to TypeScript parser
└── ../weeklytest/            # Source markdown files
```

## 📚 Subjects Covered

| Subject | Description | Color |
|---------|-------------|-------|
| 🔢 Mathematics | Numbers, shapes & operations | Green |
| 🔬 Science | Nature, body & physics | Blue |
| 💻 STEAM | Coding, tech & design | Purple |
| 🎵 Music | Singing, rhythm & performance | Orange |
| 🎭 Performing Arts | Dance, movement & expression | Red |
| 🎬 Drama | Acting, theater & scripts | Brown |
| 🎨 Visual Arts | Drawing, painting & crafts | Pink |
| ⚽ PE | Sports, fitness & teamwork | Teal |

## 🎮 Difficulty Levels

| Level | Timer | Hints | Lives | Best For |
|-------|-------|-------|-------|----------|
| 🌱 Easy Explorer | None | ✅ | Unlimited | Learning new words |
| 🌿 Brave Scholar | 30s | ✅ | Unlimited | Practice & review |
| 🌳 Math Master | 15s | ❌ | 3 | Challenge & speed |

## 📝 Adding Content

### Adding New Questions

1. Edit `../weeklytest/UNIFIED_VOCABULARY.md`
2. Run the parser:
   ```bash
   node scripts/parseUnifiedVocabulary.cjs
   ```
3. The `predefinedQuestions.ts` file will be regenerated

### Adding Translations

Edit `src/data/translations.ts`

## 🛠️ Technology Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Radix UI** - Component library
- **Framer Motion** - Animations

## 📊 Data Summary

| Grade | Subjects | Weeks | Questions |
|-------|----------|-------|-----------|
| G1 | 7 | 13 | 114 |
| G2 | 7 | 11 | 167 |
| G3 | 7 | 10 | 191 |
| G4 | 7 | 10 | 268 |
| G5 | 6 | 10 | 247 |

## 📖 Documentation

- [CLAUDE.md](../CLAUDE.md) - Developer documentation
- [SPECIFICATION.md](../SPECIFICATION.md) - Technical specification

## 📄 License

MIT License

---

Made with 💚 for vocabulary learners everywhere
