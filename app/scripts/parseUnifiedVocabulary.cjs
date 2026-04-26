#!/usr/bin/env node

/**
 * Parser for UNIFIED_VOCABULARY.md
 * Generates predefinedQuestions.ts from the unified markdown file
 */

const fs = require('fs');
const path = require('path');

// Subject name mappings to ensure consistency
const SUBJECT_ALIASES = {
  'Tally Chart': 'Tally Chart',
  'Maths': 'Maths',
  'Science': 'Science',
  'STEAM': 'STEAM',
  'Music': 'Music',
  'Performing Arts': 'Performing Arts',
  'Drama': 'Drama',
  'Visual Arts': 'Visual Arts',
  'PE': 'PE',
  'Performing Arts & Drama': 'Performing Arts',  // Normalize to Performing Arts
  // Handle broken subject names in UNIFIED_VOCABULARY.md
  '解析：Encode意为"编码"': 'STEAM',
  'Code, Program, Pseudocode': 'STEAM',
  'Digital Tools, Information, Accurate, Organize': 'STEAM',
  'Question Type, Fill in the Blank, Fair, Specific, Engaging': 'STEAM',
};

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

/**
 * Parse UNIFIED_VOCABULARY.md format
 *
 * Format:
 * ## G1
 * ### Subject: Maths
 * **Week 2: review**
 * > Passage: ... (optional)
 * **Question:** ...
 * **Options:**
 * - A) ...
 * - B) ...
 * **Answer:** B
 * **Explanation:** ...
 * ---
 */
function parseUnifiedVocabulary(content) {
  const result = {};  // { grade: { subject: { week: [questions] } } }
  const allData = {};  // { G1: { Maths: { 2: [...] } }, G2: {...}, ... }

  // Clean control characters and normalize text
  const cleanContent = content
    .replace(/[\x00-\x08\x0B-\x0C\x0E-\x1F\x7F]/g, ' ')
    .replace(/­/g, '')
    .normalize('NFC');

  const lines = cleanContent.split(/\r?\n/);

  let currentGrade = null;
  let currentSubject = null;
  let currentWeek = null;
  let currentKeyword = null;
  let currentPassage = null;
  let currentQuestion = null;
  let currentOptions = [];
  let currentAnswer = null;
  let currentExplanation = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    // Parse grade: ## G1, ## G2, etc.
    const gradeMatch = line.match(/^##\s*(G[1-5])$/);
    if (gradeMatch) {
      currentGrade = gradeMatch[1];
      if (!allData[currentGrade]) allData[currentGrade] = {};
      console.log(`  Found grade: ${currentGrade}`);
      continue;
    }

    // Parse subject: ### Subject: Maths
    const subjectMatch = line.match(/^###\s*Subject:\s*(.+)$/);
    if (subjectMatch) {
      let subjectName = subjectMatch[1].trim();
      // Normalize subject name
      subjectName = SUBJECT_ALIASES[subjectName] || subjectName;

      currentSubject = subjectName;
      if (!allData[currentGrade][currentSubject]) {
        allData[currentGrade][currentSubject] = {};
      }
      console.log(`    Found subject: ${currentSubject}`);
      continue;
    }

    // Parse week header: **Week 2: review**
    const weekMatch = line.match(/^\*\*Week\s+(\d+):\s*(.+?)\*\*$/);
    if (weekMatch) {
      // Save previous question if exists
      if (currentWeek && currentQuestion) {
        if (!allData[currentGrade][currentSubject][currentWeek]) {
          allData[currentGrade][currentSubject][currentWeek] = [];
        }
        allData[currentGrade][currentSubject][currentWeek].push({
          week: parseInt(currentWeek),
          keyword: currentKeyword || 'review',
          question: currentQuestion,
          options: currentOptions,
          answer: currentAnswer,
          explanation: currentExplanation,
          ...(currentPassage && { passage: currentPassage }),
        });
      }

      currentWeek = parseInt(weekMatch[1]);
      currentKeyword = weekMatch[2].trim();
      currentPassage = null;
      currentQuestion = null;
      currentOptions = [];
      currentAnswer = null;
      currentExplanation = null;
      continue;
    }

    // Parse passage: > Passage: ...
    if (line.startsWith('> Passage:')) {
      currentPassage = line.replace(/^>\s*Passage:\s*/, '').trim();
      // Check if passage continues on next lines
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j].trim();
        if (next.startsWith('**') || next === '---') break;
        if (next) {
          // Check if it's a continuation (not a new field)
          if (!next.startsWith('>')) {
            currentPassage += ' ' + next;
          } else {
            break;
          }
        }
        j++;
      }
      i = j - 1;
      continue;
    }

    // Parse question: **Question:** ...
    if (line.startsWith('**Question:**')) {
      currentQuestion = line.replace(/^\*\*Question:\*\*\s*/, '').trim();
      continue;
    }

    // Parse options start
    if (line.startsWith('**Options:**')) {
      currentOptions = [];
      // Look ahead for option lines
      let j = i + 1;
      while (j < lines.length) {
        const optLine = lines[j].trim();
        if (!optLine) { j++; continue; }
        if (optLine.startsWith('**Answer:') || optLine.startsWith('**Explanation:') || optLine === '---') break;

        // Parse option: - A) xxx
        const optMatch = optLine.match(/^-\s*([ABCD])\)\s*(.+)$/);
        if (optMatch) {
          currentOptions.push(optMatch[2].trim());
        }
        j++;
      }
      i = j - 1;
      continue;
    }

    // Parse answer: **Answer:** B
    if (line.startsWith('**Answer:**')) {
      currentAnswer = line.replace(/^\*\*Answer:\*\*\s*/, '').trim();
      continue;
    }

    // Parse explanation: **Explanation:** ...
    if (line.startsWith('**Explanation:**')) {
      currentExplanation = line.replace(/^\*\*Explanation:\*\*\s*/, '').trim();
      // Explanation may span multiple lines
      let j = i + 1;
      while (j < lines.length) {
        const next = lines[j].trim();
        if (!next) { j++; continue; }
        if (next.startsWith('**') || next === '---') break;
        currentExplanation += ' ' + next;
        j++;
      }
      i = j - 1;
      continue;
    }

    // Week separator: ---
    if (line === '---') {
      // Save current question
      if (currentWeek && currentQuestion) {
        if (!allData[currentGrade][currentSubject][currentWeek]) {
          allData[currentGrade][currentSubject][currentWeek] = [];
        }
        allData[currentGrade][currentSubject][currentWeek].push({
          week: currentWeek,
          keyword: currentKeyword || 'review',
          question: currentQuestion,
          options: currentOptions,
          answer: currentAnswer,
          explanation: currentExplanation,
          ...(currentPassage && { passage: currentPassage }),
        });
      }
      // Reset for next week
      currentWeek = null;
      currentKeyword = null;
      currentPassage = null;
      currentQuestion = null;
      currentOptions = [];
      currentAnswer = null;
      currentExplanation = null;
      continue;
    }
  }

  // Save the last question
  if (currentWeek && currentQuestion) {
    if (!allData[currentGrade][currentSubject][currentWeek]) {
      allData[currentGrade][currentSubject][currentWeek] = [];
    }
    allData[currentGrade][currentSubject][currentWeek].push({
      week: currentWeek,
      keyword: currentKeyword || 'review',
      question: currentQuestion,
      options: currentOptions,
      answer: currentAnswer,
      explanation: currentExplanation,
      ...(currentPassage && { passage: currentPassage }),
    });
  }

  return allData;
}

function main() {
  const unifiedPath = path.join(__dirname, '../../weeklytest/UNIFIED_VOCABULARY.md');

  if (!fs.existsSync(unifiedPath)) {
    console.error(`File not found: ${unifiedPath}`);
    process.exit(1);
  }

  console.log('Parsing UNIFIED_VOCABULARY.md...');
  const content = fs.readFileSync(unifiedPath, 'utf-8');
  const allData = parseUnifiedVocabulary(content);

  // Count questions
  let totalWeeks = 0;
  let totalQuestions = 0;
  for (const [grade, subjects] of Object.entries(allData)) {
    for (const [subject, weeks] of Object.entries(subjects)) {
      const qCount = Object.values(weeks).reduce((s, arr) => s + arr.length, 0);
      totalWeeks += Object.keys(weeks).length;
      totalQuestions += qCount;
      console.log(`  ${grade} ${subject}: ${Object.keys(weeks).length} weeks, ${qCount} questions`);
    }
  }
  console.log(`Total: ${totalWeeks} week-entries, ${totalQuestions} questions`);

  // Generate TypeScript
  let ts = '// Auto-generated from UNIFIED_VOCABULARY.md\n\n';
  ts += 'export interface PredefinedQuestion { week: number; keyword: string; question: string; options: string[]; answer: string; explanation: string; passage?: string; }\n\n';
  ts += 'export const PREDEFINED_QUESTIONS: Record<string, Record<string, Record<number, PredefinedQuestion[]>>> = {\n';

  // Sort grades: G1, G2, G3, G4, G5
  const sortedGrades = Object.keys(allData).sort();
  for (const grade of sortedGrades) {
    ts += '  "' + grade + '": {\n';
    const subjects = allData[grade];
    // Sort subjects alphabetically
    const sortedSubjects = Object.keys(subjects).sort();
    for (const subject of sortedSubjects) {
      ts += '    "' + subject + '": {\n';
      const weeks = subjects[subject];
      // Sort weeks numerically
      const sortedWeeks = Object.keys(weeks).map(Number).sort((a, b) => a - b);
      for (const week of sortedWeeks) {
        ts += '      ' + week + ': [';
        for (const q of weeks[week]) {
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

  const outputPath = path.join(__dirname, '../src/data/predefinedQuestions.ts');
  fs.writeFileSync(outputPath, ts, 'utf-8');
  console.log(`\nGenerated: ${outputPath}`);
}

main();
