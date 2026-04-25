# Weekly Vocabulary Learning App

A gamified vocabulary learning application for Grades 1-5 covering 8 academic subjects (Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE).

## Version
**v1.2.1** (2026-04-26)

## Features

- **8 Subject Areas**: Maths, Science, STEAM, Music, Performing Arts, Drama, Visual Arts, PE
- **5 Grade Levels**: G1 (age 6-7) through G5 (age 10-11)
- **3 Difficulty Levels**: Easy, Medium, Hard
- **Gamified Progress**: Plant growth metaphor from seedling to mighty oak
- **Local Progress Saving**: Uses browser localStorage
- **Responsive Design**: Works on desktop, tablet, and mobile

## Tech Stack

- **React 19** + TypeScript 5.9
- **Vite 7** for building
- **Tailwind CSS** for styling
- **Radix UI** components
- **Framer Motion** for animations

## Quick Start

```bash
# Install dependencies
cd app/
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000` in development mode.

## Project Structure

```
weeklyvocabulary/
├── app/                          # React application
│   ├── src/
│   │   ├── data/                 # Vocabulary and question data
│   │   │   ├── vocabularyData.ts     # Keywords by grade/subject/week
│   │   │   ├── predefinedQuestions.ts # Parsed questions from MD files
│   │   │   ├── translations.ts        # Chinese translations & IPA
│   │   │   └── questionGenerator.ts   # Question generation logic
│   │   ├── types/                # TypeScript type definitions
│   │   ├── components/           # React components
│   │   ├── hooks/                # Custom React hooks
│   │   ├── lib/                  # Utility functions
│   │   └── App.tsx               # Main application
│   ├── public/                   # Static assets
│   └── package.json
├── weeklytest/                   # Source PDF files and parsing scripts
│   ├── *.pdf                     # Grade-specific vocabulary PDFs
│   └── *.md                      # Parsed markdown files
├── scripts/                      # Utility scripts
├── SPECIFICATION.md              # Detailed technical specification
└── README.md                     # This file
```

## Adding New Vocabulary Questions

1. Place PDF source files in `weeklytest/` directory
2. Parse PDFs to markdown: `python weeklytest/parse_pdf_pdfplumber.py`
3. Run the parser: `cd app/ && node scripts/parseVocabularyMd.cjs`
4. This regenerates `src/data/predefinedQuestions.ts`

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

## Recent Updates (v1.2.1)

- Fixed incorrect subject name mapping in predefinedQuestions.ts
- Added 21 missing predefined questions for G5
- Corrected keyword names (e.g., "2-dimensional" instead of "dimensional")
- Added missing questions for: Maths (factor, common, share, mixed number, whole, top view), Science (small intestine, grow, human, body, health, electricity, safety, thorn), STEAM (Question Type, Fair), PE (half-smash, base position)

## License

Educational use only.
