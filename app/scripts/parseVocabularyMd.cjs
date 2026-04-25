#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SUBJECT_PATTERNS = [
  { cn: '数学', en: 'Maths' },
  { cn: '科学', en: 'Science' },
  { cn: 'STEAM', en: 'STEAM' },
  { cn: '音乐', en: 'Music' },
  { cn: '表演艺术', en: 'Performing Arts' },
  { cn: '戏剧', en: 'Drama' },
  { cn: '视觉艺术', en: 'Visual Arts' },
  { cn: '体育', en: 'PE' },
];

// Read translations from translations.ts
function loadTranslations() {
  const translationsPath = path.join(__dirname, '../src/data/translations.ts');
  try {
    const content = fs.readFileSync(translationsPath, 'utf-8');
    const translations = {};

    // Parse TRANSLATIONS object from TypeScript
    const lines = content.split('\n');
    let inObject = false;
    let currentKey = '';

    for (const line of lines) {
      const trimmed = line.trim();

      // Find TRANSLATIONS = { or export const TRANSLATIONS: Record<...
      if (trimmed.includes('TRANSLATIONS') && trimmed.includes('{')) {
        inObject = true;
        continue;
      }

      if (!inObject) continue;
      if (trimmed === '};' || trimmed === '}') break;

      // Parse key-value pairs like 'triangle': { cn: '三角形', ipa: '/ˈtraɪæŋɡl/', read: 'TRY-ang-guhl' },
      const match = trimmed.match(/'([^']+)':\s*\{\s*cn:\s*'([^']*)',\s*ipa:\s*'([^']*)',\s*read:\s*'([^']*)'/);
      if (match) {
        translations[match[1]] = {
          cn: match[2],
          ipa: match[3],
          read: match[4],
        };
      }
    }

    return translations;
  } catch (err) {
    console.warn('Could not load translations:', err.message);
    return {};
  }
}

const TRANSLATIONS = loadTranslations();

function escapeTs(str) {
  if (!str) return '';
  return String(str)
    .replace(/\\/g, '\\\\')
    .replace(/"/g, '\\"')
    .replace(/\n/g, '\\n')
    .replace(/\r/g, '')
    .replace(/\t/g, '\\t');
}

// Enhance explanation with complete Pronunciation Guide from translations
function enhanceExplanation(keyword, explanation) {
  if (!explanation) return '';

  // Clean up explanation first
  const cleanExplanation = explanation
    .replace(/^◦\s*/, '')
    .replace(/答案解析[：:]\s*/, '')
    .trim();

  if (!keyword) return cleanExplanation;

  const kwLower = keyword.toLowerCase().trim();
  let trans = null;
  let matchedKey = null;

  // Only do exact match (case-insensitive)
  for (const [key, value] of Object.entries(TRANSLATIONS)) {
    if (key.toLowerCase() === kwLower) {
      trans = value;
      matchedKey = key;
      break;
    }
  }

  if (!trans) return cleanExplanation;

  // Create complete Pronunciation Guide format:
  // keyword 中文
  // /IPA/ → "read"
  // [original explanation]
  const pronunciationGuide = `${matchedKey} ${trans.cn}\n${trans.ipa} → "${trans.read}"`;

  // If explanation is empty or just matches the keyword info, return just the pronunciation guide
  if (!cleanExplanation || cleanExplanation === `${matchedKey}意为"${trans.cn}"`) {
    return pronunciationGuide;
  }

  return `${pronunciationGuide}\n${cleanExplanation}`;
}

function parseMarkdownFile(content) {
  const result = {};
  let currentSubject = null;
  let currentWeek = null;
  let currentKeyword = null;
  let currentQuestion = null;
  let currentOptions = [];
  let currentAnswer = null;
  let currentExplanation = null;
  let currentPassage = null;

  // Clean control characters and normalize text
  const cleanContent = content
    .replace(//g, ' ')  // Remove control characters
    .replace(/­/g, '')   // Remove soft hyphens
    .normalize('NFC');        // Normalize Unicode

  const lines = cleanContent.split(/\r?\n/);

  // Detect format: G1 uses "• 第N周(keyword)", G2+ uses "第N周" followed by "keyword - questions"
  let format = 'G1';
  if (cleanContent.match(/^第\d+周/m)) {
    format = 'G2';
  }

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    for (const subject of SUBJECT_PATTERNS) {
      if (line.includes('学科：' + subject.cn) || line.includes('学科：' + subject.en)) {
        currentSubject = subject.en;
        result[currentSubject] = {};
        break;
      }
    }

    if (!currentSubject) continue;

    // G1 format: • 第2周(triangle)
    const weekMatchG1 = line.match(/^•\s*第(\d+)周\s*(?:\(|（)?([^)\】]+)?(?:\)|）)?/);
    // G2 format: 第2周 or 第2周(keyword1, keyword2)
    const weekMatchG2 = line.match(/^第(\d+)周\s*(?:\(|（)?([^)\]]+)?(?:\)|）)?/);

    if (weekMatchG1 || weekMatchG2) {
      const match = weekMatchG1 || weekMatchG2;
      if (currentWeek && currentQuestion) {
        if (!result[currentSubject][currentWeek]) result[currentSubject][currentWeek] = [];
        result[currentSubject][currentWeek].push({
          week: parseInt(currentWeek),
          keyword: currentKeyword || 'review',
          question: currentQuestion,
          options: currentOptions,
          answer: currentAnswer,
          explanation: currentExplanation,
          ...(currentPassage && { passage: currentPassage }),
        });
      }
      currentWeek = match[1];
      currentKeyword = match[2] ? match[2].trim() : 'review';
      currentQuestion = null;
      currentOptions = [];
      currentAnswer = null;
      currentExplanation = null;
      currentPassage = null;
      continue;
    }

    if (!currentWeek) continue;

    // G2 format: keyword - 题干：...选项：...正确答案：...
    if (format === 'G2' && line.match(/^[a-zA-Z\s]+-/)) {
      // Save previous question first
      if (currentQuestion) {
        if (!result[currentSubject][currentWeek]) result[currentSubject][currentWeek] = [];
        result[currentSubject][currentWeek].push({
          week: parseInt(currentWeek),
          keyword: currentKeyword || 'review',
          question: currentQuestion,
          options: currentOptions,
          answer: currentAnswer,
          explanation: currentExplanation,
          ...(currentPassage && { passage: currentPassage }),
        });
      }

      const keywordMatch = line.match(/^([a-zA-Z\s]+)-/);
      if (keywordMatch) {
        currentKeyword = keywordMatch[1].trim();
      }

      // Parse question
      const qm = line.match(/题[⼲干][：:]\s*(.+?)\s*选项[：:]/);
      if (qm) currentQuestion = qm[1].trim();

      // Parse options
      const om = line.match(/选项[：:]\s*(.+?)\s*正确答案/);
      if (om) {
        const optsText = om[1].trim();
        currentOptions = [];
        const regex = /([ABCD])\)\s*([^ABCD]+?)(?=\s*[ABCD]\)|$)/g;
        let m;
        while ((m = regex.exec(optsText)) !== null) {
          currentOptions.push(m[2].trim());
        }
      }

      // Parse answer
      const am = line.match(/正确答案[：:]\s*([ABCD])/);
      if (am) currentAnswer = am[1];

      // Parse explanation
      const em = line.match(/(?:解析|答案解析)[：:]\s*(.+)/);
      if (em) currentExplanation = em[1].replace(/[)]$/, '').trim();

      continue;
    }

    // Use flexible matching for Chinese variants (G1 format)
    if (line.match(/^◦\s*题[⼲干]/)) {
      currentQuestion = line.replace(/^◦\s*题[⼲干][：:]\s*/, '').trim();
      continue;
    }

    if (line.match(/^◦\s*选[項项]/)) {
      const optsText = line.replace(/^◦\s*选[項项][：:]\s*/, '').trim();
      currentOptions = [];
      const regex = /([ABCD])\)\s*([^ABCD]+?)(?=\s*[ABCD]\)|$)/g;
      let m;
      while ((m = regex.exec(optsText)) !== null) {
        currentOptions.push(m[2].trim());
      }
      if (currentOptions.length === 0) {
        const parts = optsText.split(/\s*(?=[ABCD]\))/);
        for (const part of parts) {
          const mm = part.match(/([ABCD])\)\s*(.+)/);
          if (mm) currentOptions.push(mm[2].trim());
        }
      }
      continue;
    }

    const ansMatch = line.match(/^◦\s*正确答案[：:]\s*([ABCD])/);
    if (ansMatch) { currentAnswer = ansMatch[1]; continue; }

    if (line.match(/^◦\s*答案[解析解析]/)) {
      currentExplanation = line.replace(/^◦\s*答案[解析解析][：:]\s*/, '').trim();
      continue;
    }

    if (line.match(/^◦\s*阅读[文本⽂本文]/)) {
      currentPassage = line.replace(/^◦\s*阅读[文本⽂本文]*[：:]\s*/, '').trim();
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j].trim();
        if (next.startsWith('•') || next.startsWith('◦') || next.match(/^第?\d+/)) break;
        if (next) currentPassage += ' ' + next;
        j++;
      }
      i = j - 1;
      continue;
    }
  }

  if (currentWeek && currentQuestion) {
    if (!result[currentSubject][currentWeek]) result[currentSubject][currentWeek] = [];
    result[currentSubject][currentWeek].push({
      week: parseInt(currentWeek),
      keyword: currentKeyword || 'review',
      question: currentQuestion,
      options: currentOptions,
      answer: currentAnswer,
      explanation: currentExplanation,
      ...(currentPassage && { passage: currentPassage }),
    });
  }

  return result;
}

const weeklytestDir = path.join(__dirname, '../../weeklytest');
const grades = ['G1', 'G2', 'G3', 'G4', 'G5'];
const allData = {};

for (const grade of grades) {
  const mdPath = path.join(weeklytestDir, grade + ' Subject Vocabulary 2025-2026.md');
  if (!fs.existsSync(mdPath)) continue;
  console.log('Parsing ' + grade + '...');
  const content = fs.readFileSync(mdPath, 'utf-8');
  const gradeData = parseMarkdownFile(content);
  if (Object.keys(gradeData).length > 0) {
    allData[grade] = gradeData;
    for (const [subject, weeks] of Object.entries(gradeData)) {
      const qCount = Object.values(weeks).reduce((s, a) => s + a.length, 0);
      console.log('  ' + grade + ' ' + subject + ': ' + Object.keys(weeks).length + ' weeks, ' + qCount + ' questions');
    }
  }
}

let ts = '// Auto-generated from markdown files\n\n';
ts += 'export interface PredefinedQuestion { week: number; keyword: string; question: string; options: string[]; answer: string; explanation: string; passage?: string; }\n\n';
ts += 'export const PREDEFINED_QUESTIONS: Record<string, Record<string, Record<number, PredefinedQuestion[]>>> = {\n';

for (const [grade, subjects] of Object.entries(allData)) {
  ts += '  "' + grade + '": {\n';
  for (const [subject, weeks] of Object.entries(subjects)) {
    ts += '    "' + subject + '": {\n';
    for (const [weekStr, questions] of Object.entries(weeks)) {
      ts += '      ' + weekStr + ': [';
      for (const q of questions) {
        const p = q.passage ? ', passage: "' + escapeTs(q.passage) + '"' : '';
        // Enhance explanation with IPA for G1 questions
        const enhancedExplanation = enhanceExplanation(q.keyword, q.explanation);
        ts += '{ week: ' + q.week + ', keyword: "' + escapeTs(q.keyword) + '", question: "' + escapeTs(q.question) + '", options: [' + q.options.map(o => '"' + escapeTs(o) + '"').join(', ') + '], answer: "' + q.answer + '", explanation: "' + escapeTs(enhancedExplanation) + '"' + p + ' },';
      }
      ts += '],\n';
    }
    ts += '    },\n';
  }
  ts += '  },\n';
}
ts += '};\n';

fs.writeFileSync(path.join(__dirname, '../src/data/predefinedQuestions.ts'), ts, 'utf-8');
console.log('Generated predefinedQuestions.ts');
