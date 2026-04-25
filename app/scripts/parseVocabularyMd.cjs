#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const SUBJECT_PATTERNS = [
  { cn: '数学', en: 'Maths' },
  { cn: '科学', en: 'Science' },
  { cn: 'STEAM', en: 'STEAM' },
  { cn: '音乐', en: 'Music', alt: ['⾳乐'] },
  { cn: '表演艺术', en: 'Performing Arts', alt: ['表演艺术与戏剧'] },
  { cn: '戏剧', en: 'Drama', alt: ['表演艺术与戏剧'] },
  { cn: '视觉艺术', en: 'Visual Arts' },
  { cn: '体育', en: 'PE' },
];

// Read translations from translations.ts
function loadTranslations() {
  const translationsPath = path.join(__dirname, '../src/data/translations.ts');
  try {
    const content = fs.readFileSync(translationsPath, 'utf-8');
    const translations = {};

    const lines = content.split('\n');
    let inObject = false;

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes('TRANSLATIONS') && trimmed.includes('{')) {
        inObject = true;
        continue;
      }
      if (!inObject) continue;
      if (trimmed === '};' || trimmed === '}') break;

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

function enhanceExplanation(keyword, explanation) {
  if (!explanation) return '';

  const cleanExplanation = explanation
    .replace(/^◦\s*/, '')
    .replace(/答案解析[：:]\s*/, '')
    .trim();

  if (!keyword) return cleanExplanation;

  const kwLower = keyword.toLowerCase().trim();
  let trans = null;
  let matchedKey = null;

  for (const [key, value] of Object.entries(TRANSLATIONS)) {
    if (key.toLowerCase() === kwLower) {
      trans = value;
      matchedKey = key;
      break;
    }
  }

  if (!trans) return cleanExplanation;

  const pronunciationGuide = `${matchedKey} ${trans.cn}\n${trans.ipa} → "${trans.read}"`;

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
    .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, ' ')
    .replace(/­/g, '')
    .normalize('NFC');

  const lines = cleanContent.split(/\r?\n/);

  // Detect format
  let format = 'G1';
  let g1SampleCount = 0;
  let g2SampleCount = 0;
  let g3SampleCount = 0;

  for (const line of lines) {
    const trimmed = line.trim();
    if (trimmed.match(/^•\s*第\d+周\(/)) g1SampleCount++;
    if (trimmed.match(/^第\d+周\s*\(/) && !trimmed.startsWith('•')) g3SampleCount++;
    if (trimmed.match(/^[a-zA-Z]+\s*-\s*题[干⼲]/)) g2SampleCount++;
  }

  if (g3SampleCount > g1SampleCount) {
    format = 'G3';
  } else if (g2SampleCount > 0) {
    format = 'G2';
  }

  console.log(`  Detected format: ${format} (G1:${g1SampleCount}, G2:${g2SampleCount}, G3:${g3SampleCount})`);

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i].trim();

    // Skip empty lines
    if (!line) continue;

    // Detect subject header
    for (const subject of SUBJECT_PATTERNS) {
      const checks = [subject.cn, subject.en].concat(subject.alt || []);
      let found = false;
      for (const check of checks) {
        if (check && line.includes('学科：' + check)) {
          currentSubject = subject.en;
          result[currentSubject] = {};
          console.log(`    Found subject: ${subject.en}`);
          found = true;
          break;
        }
      }
      if (found) break;
    }

    if (!currentSubject) continue;

    // G1 format: • 第2周(keyword)
    const weekMatchG1 = line.match(/^•\s*第(\d+)周\s*(?:\(|（)?([^)\】]*)?(?:\)|）)?/);
    // G3/G4/G5 format: 第2周(keyword1, keyword2, ...)
    const weekMatchG3 = line.match(/^第(\d+)周\s*\(([^)]+)\)/);
    // G2 format: 第2周
    const weekMatchG2 = line.match(/^第(\d+)周\s*$/);

    if (weekMatchG1 || weekMatchG3 || weekMatchG2) {
      // Save previous question first
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

      // Reset for new week
      if (weekMatchG1) {
        currentWeek = weekMatchG1[1];
        currentKeyword = weekMatchG1[2] ? weekMatchG1[2].trim() : 'review';
      } else if (weekMatchG3) {
        currentWeek = weekMatchG3[1];
        const keywordsStr = weekMatchG3[2];
        const keywords = keywordsStr.split(',').map(k => k.trim()).filter(k => k);
        currentKeyword = keywords[0] || 'review';
      } else if (weekMatchG2) {
        currentWeek = weekMatchG2[1];
        currentKeyword = 'review';
      }

      currentQuestion = null;
      currentOptions = [];
      currentAnswer = null;
      currentExplanation = null;
      currentPassage = null;
      continue;
    }

    if (!currentWeek) continue;

    // For G3/G4/G5: check if this is a question line (keyword - 题干：...)
    // Note: "题干" can use various character variants for the second character
    const questionLineMatch = (format === 'G3' || format === 'G2') && line.match(/^[a-zA-Z][a-zA-Z\s]*\s*-\s*题./);
    if (questionLineMatch) {
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

      // Parse keyword and question from this line
      const keywordMatch = line.match(/^([a-zA-Z][a-zA-Z\s\-]*)\s*-\s*题.[：:]/);
      const questionMatch = line.match(/题.[：:]\s*(.+?)\s*选项[：:]/);

      if (keywordMatch) {
        currentKeyword = keywordMatch[1].trim();
      }
      currentQuestion = questionMatch ? questionMatch[1].trim() : '';

      // Reset options/answer/explanation
      currentOptions = [];
      currentAnswer = '';
      currentExplanation = '';

      // Check if this is a G2 single-line format with everything on one line
      // Format: "keyword - 题干：... 选项：A) xxx B) xxx C) xxx D) xxx 正确答案：X (解析：...)"
      const singleLineMatch = line.match(/选项[：:]\s*A\)\s*(.+?)\s*B\)\s*(.+?)\s*C\)\s*(.+?)\s*D\)\s*(.+?)\s*正确答案[：:]\s*([ABCD])/);
      if (singleLineMatch) {
        // G2 single-line format
        currentOptions = [singleLineMatch[1].trim(), singleLineMatch[2].trim(), singleLineMatch[3].trim(), singleLineMatch[4].trim()];
        currentAnswer = singleLineMatch[5];
        const expMatch = line.match(/(?:\(|（)?解析[：:]\s*(.+?)(?:\)|）)?$/);
        if (expMatch) currentExplanation = expMatch[1].trim();
        continue;
      }

      // Check if the current line has "选项：A) value B)" format (some options on this line)
      const endOfLineMatch = line.match(/选项[：:]\s*A\)\s*(.+?)\s*B\)\s*$/);
      if (endOfLineMatch) {
        // Format: "选项：A) divide B)" at end of line
        // Next line: "subtract C) multiply D) round 正确答案：C"
        const optionAValue = endOfLineMatch[1].trim();
        currentOptions.push(optionAValue);

        // Look at next line for remaining options
        let nextLineIndex = i + 1;
        while (nextLineIndex < lines.length && !lines[nextLineIndex].trim()) {
          nextLineIndex++;
        }

        if (nextLineIndex < lines.length) {
          const nextLine = lines[nextLineIndex].trim();
          const optsEndMatch = nextLine.match(/正确答案[：:]\s*([ABCD])/);
          if (optsEndMatch) {
            currentAnswer = optsEndMatch[1];
            const optsText = nextLine.substring(0, optsEndMatch.index).trim();

            // Parse "subtract C) multiply D) round"
            const bMatch = optsText.match(/^([a-zA-Z\s]+?)\s+C\)/);
            if (bMatch) currentOptions.push(bMatch[1].trim());

            const parts = optsText.split(/\s*(?=[CD]\)\s*)/);
            for (const part of parts) {
              const m = part.match(/([CD])\)\s*(.+)/);
              if (m) currentOptions.push(m[2].trim());
            }

            const expMatch = nextLine.match(/(?:\(|（)?解析[：:]\s*(.+?)(?:\)|）)?$/);
            if (expMatch) currentExplanation = expMatch[1].trim();

            i = nextLineIndex;
          }
        }
      } else {
        // Two remaining formats:
        // Format 1: "选项：A)" at end, next line: "point B) bracket C) order D) shape"
        // Format 3: "选项：" at end, next line: "A) order B) fraction C) bracket D) mean"
        let nextLineIndex = i + 1;
        while (nextLineIndex < lines.length && !lines[nextLineIndex].trim()) {
          nextLineIndex++;
        }

        if (nextLineIndex < lines.length) {
          const nextLine = lines[nextLineIndex].trim();
          const optsEndMatch = nextLine.match(/正确答案[：:]\s*([ABCD])/);
          if (optsEndMatch) {
            currentAnswer = optsEndMatch[1];
            const optsText = nextLine.substring(0, optsEndMatch.index).trim();

            // Check if next line starts with "A)" (Format 3)
            if (nextLine.startsWith('A)')) {
              // Format 3: "A) order B) fraction C) bracket D) mean"
              const parts = optsText.split(/\s*(?=[ABCD]\)\s*)/);
              for (const part of parts) {
                const m = part.match(/([ABCD])\)\s*(.+)/);
                if (m) currentOptions.push(m[2].trim());
              }
            } else {
              // Format 1: "point B) bracket C) order D) shape"
              // Prepend "A) " to parse correctly
              const fullOptsText = "A) " + optsText;
              const parts = fullOptsText.split(/\s*(?=[ABCD]\)\s*)/);
              for (const part of parts) {
                const m = part.match(/([ABCD])\)\s*(.+)/);
                if (m) currentOptions.push(m[2].trim());
              }
            }

            const expMatch = nextLine.match(/(?:\(|（)?解析[：:]\s*(.+?)(?:\)|）)?$/);
            if (expMatch) currentExplanation = expMatch[1].trim();

            i = nextLineIndex;
          }
        }
      }
      continue;
    }

    // Review Week format: "阅读文本：..." "测试题：..." "选项：..." "正确答案：..."
    if (line.match(/^阅读[文本⽂本文][：:]/) || line === '阅读文本：' || line.startsWith('阅读文本')) {
      let passage = line.replace(/^阅读[文本⽂本文]*[：:]\s*/, '').trim();
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j].trim();
        if (next.startsWith('测试题') || next.startsWith('选项') || next.startsWith('正确答案') || next.match(/^第?\d+/) || next.startsWith('•')) break;
        if (next) passage += ' ' + next;
        j++;
      }
      i = j - 1;
      currentPassage = passage;
      continue;
    }

    if (line.match(/^测试题[：:]/)) {
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

      currentKeyword = 'review';
      currentQuestion = line.replace(/^测试题[：:]\s*/, '').trim();
      currentOptions = [];
      currentAnswer = '';
      currentExplanation = '';

      // Look for options on next line
      let nextLineIndex = i + 1;
      while (nextLineIndex < lines.length && !lines[nextLineIndex].trim()) {
        nextLineIndex++;
      }

      if (nextLineIndex < lines.length) {
        const nextLine = lines[nextLineIndex].trim();
        if (nextLine.startsWith('选项')) {
          const optsText = nextLine.replace(/^选项[：:]\s*/, '').trim();
          const parts = optsText.split(/\s*(?=[ABCD]\)\s*)/);
          for (const part of parts) {
            const m = part.match(/([ABCD])\)\s*(.+)/);
            if (m) currentOptions.push(m[2].trim());
          }

          // Look for answer on the line after options
          let answerLineIndex = nextLineIndex + 1;
          while (answerLineIndex < lines.length && !lines[answerLineIndex].trim()) {
            answerLineIndex++;
          }

          if (answerLineIndex < lines.length) {
            const answerLine = lines[answerLineIndex].trim();
            const ansMatch = answerLine.match(/正确答案[：:]\s*([ABCD])/);
            if (ansMatch) currentAnswer = ansMatch[1];

            const expMatch = answerLine.match(/(?:\(|（)?解析[：:]\s*(.+?)(?:\)|）)?$/);
            if (expMatch) currentExplanation = expMatch[1].trim();

            i = answerLineIndex;
          } else {
            i = nextLineIndex;
          }
        }
      }
      continue;
    }

    // G1 format with ◦ bullets
    if (line.match(/^◦\s*题./)) {
      currentQuestion = line.replace(/^◦\s*题.[：:]\s*/, '').trim();
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

  // Save the last question
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
