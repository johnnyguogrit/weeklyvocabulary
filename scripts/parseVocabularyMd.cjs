const fs = require('fs');
const path = require('path');

const INPUT_DIR = path.join(__dirname, '../weeklytest');
const UNIFIED_OUTPUT = path.join(__dirname, '../weeklytest/UNIFIED_VOCABULARY.md');
const TS_OUTPUT = path.join(__dirname, '../app/src/data/predefinedQuestions.ts');

// Expected questions per week (non-review weeks)
const QUESTIONS_PER_WEEK = {
  'G1': 1,
  'G2': 2,
  'G3': 3,
  'G4': 4,
  'G5': 5
};

// Subject name mapping (Chinese -> English)
const SUBJECT_MAP = {
  '数学': 'Maths',
  'Maths': 'Maths',
  '科学': 'Science',
  'Science': 'Science',
  'STEAM': 'STEAM',
  '音乐': 'Music',
  'Music': 'Music',
  '表演艺术': 'Performing Arts',
  'Performing Arts': 'Performing Arts',
  '戏剧': 'Drama',
  'Drama': 'Drama',
  '视觉艺术': 'Visual Arts',
  'Visual Arts': 'Visual Arts',
  '体育': 'PE',
  'PE': 'PE',
  '表演艺术与戏剧': 'Performing Arts' // G5 combined subject
};

// Normalize subject names
function normalizeSubject(subject) {
  const clean = subject.trim().replace(/[​-‍﻿]/g, '');
  return SUBJECT_MAP[clean] || clean;
}

// Parse G1 format (single line with special characters)
function parseG1Format(content) {
  const questions = {};

  // Find all subject sections
  const subjectRegex = /学科[：:]\s*([^\(]+)\s*\(([^)]+)\)/g;
  const subjects = [];

  let match;
  while ((match = subjectRegex.exec(content)) !== null) {
    subjects.push({
      name: match[1].trim(),
      english: match[2].trim(),
      index: match.index
    });
  }

  for (const s of subjects) {
    const subjectName = normalizeSubject(s.english);
    if (!questions[subjectName]) {
      questions[subjectName] = {};
    }

    // Get content for this subject
    const nextSubjectIndex = subjects[subjects.indexOf(s) + 1]?.index || content.length;
    let subjectContent = content.slice(s.index, nextSubjectIndex);

    // Split by bullet marker for weeks (• 第N周)
    // First, let's find all week markers
    const weekMarkers = [];
    const weekRegex = /[•\s]*第(\d+)[周期周末]?\s*[（(]([^）]+)[）\)]/g;
    let wMatch;
    while ((wMatch = weekRegex.exec(subjectContent)) !== null) {
      weekMarkers.push({
        week: parseInt(wMatch[1]),
        keyword: wMatch[2].trim(),
        index: wMatch.index
      });
    }

    for (let i = 0; i < weekMarkers.length; i++) {
      const w = weekMarkers[i];
      const weekNum = w.week;
      const keyword = w.keyword;
      const isReview = keyword.includes('综合复习') || keyword.includes('复习');

      // Get content until next week marker
      const nextIndex = weekMarkers[i + 1]?.index || subjectContent.length;
      const weekContent = subjectContent.slice(w.index, nextIndex);

      // For G1, each week has exactly 1 question (except review which has passage + question)
      // Parse the question block
      // Pattern: ◦ 题干：... ◦ 选项：... ◦ 正确答案：... ◦ 答案解析：...

      // First, check if there's a passage (for review weeks)
      const passageMatch = weekContent.match(/◦\s*阅读文本[：:]\s*([^◆]+?)(?=◦\s*题干|$)/s);
      const passage = passageMatch ? passageMatch[1].trim() : null;

      // Find the question block
      const questionMatch = weekContent.match(/◦\s*题干[：:]\s*([^◆]+?)◦\s*选项[：:]\s*([^◆]+?)◦\s*正确答案[：:]\s*([A-D])[^◆]*?◦\s*答案解析[：:]\s*([^◆]+?)(?=◦\s*第|$)/s);

      if (questionMatch) {
        const questionText = questionMatch[1].trim();
        const optionsText = questionMatch[2].trim();
        const answer = questionMatch[3].trim();
        const explanation = questionMatch[4].trim();

        // Parse options
        const options = [];
        const optPattern = /([A-D])\)\s*([^A-D]+?)(?=\s*[A-D]\)|$)/g;
        let optMatch;
        while ((optMatch = optPattern.exec(optionsText)) !== null) {
          options.push(optMatch[2].trim());
        }

        if (!questions[subjectName][weekNum]) {
          questions[subjectName][weekNum] = [];
        }

        questions[subjectName][weekNum].push({
          week: weekNum,
          keyword: isReview ? 'review' : keyword,
          question: questionText,
          options,
          answer,
          explanation,
          ...(passage && { passage })
        });
      }
    }
  }

  return questions;
}

// Parse G2-G5 format (multi-line)
function parseG2Format(content, grade) {
  const questions = {};
  const expectedPerWeek = QUESTIONS_PER_WEEK[grade] || 2;

  // Split by subject first
  const subjectBlocks = content.split(/学科[：:]\s*/).filter(s => s.trim());

  for (let subjectBlock of subjectBlocks) {
    // Extract subject name
    const subjectMatch = subjectBlock.match(/^([^\(]+)\s*\(([^)]+)\)/);
    if (!subjectMatch) continue;

    const subjectName = normalizeSubject(subjectMatch[2].trim());
    if (!questions[subjectName]) {
      questions[subjectName] = {};
    }

    // Get content after subject header
    const subjectContent = subjectBlock.slice(subjectMatch[0].length);

    // Split by week markers (第N周)
    const weekBlocks = subjectContent.split(/第(\d+)周/).filter(s => s.trim());

    let currentWeek = null;
    for (let i = 0; i < weekBlocks.length; i++) {
      const block = weekBlocks[i];

      // Check if this block starts with a number (week number)
      const weekNumMatch = block.match(/^(\d+)/);
      if (weekNumMatch) {
        currentWeek = parseInt(weekNumMatch[1]);
        continue;
      }

      if (!currentWeek) continue;

      const weekContent = block;

      // Check if this is a review week (has "阅读文本" or "Review Week")
      const isReview = weekContent.includes('阅读文本') ||
                       weekContent.includes('Review Week') ||
                       weekContent.includes('阶段复习');

      // Parse questions based on grade
      if (isReview) {
        // Review week: passage + 1 question
        const passageMatch = weekContent.match(/阅读文本[：:]\s*\n?(.+?)(?=测试题|题干)/s);
        const passage = passageMatch ? passageMatch[1].trim() : '';

        const questionMatch = weekContent.match(/(?:测试题|题干)[：:]\s*(.+?)\s*选项[：:]\s*\n?(.+?)\s*正确答案[：:]\s*([A-D])/s);
        if (questionMatch) {
          const questionText = questionMatch[1].trim();
          const optionsText = questionMatch[2].trim();
          const answer = questionMatch[3].trim();

          // Parse options
          const options = [];
          const optPattern = /([A-D])\)\s*([^\n]+)/g;
          let optMatch;
          while ((optMatch = optPattern.exec(optionsText)) !== null) {
            options.push(optMatch[2].trim());
          }

          // Get explanation
          const explMatch = weekContent.match(/[（(]解析[：:]\s*(.+?)[）\)]/);
          const explanation = explMatch ? explMatch[1].trim() : '';

          if (!questions[subjectName][currentWeek]) {
            questions[subjectName][currentWeek] = [];
          }

          questions[subjectName][currentWeek].push({
            week: currentWeek,
            keyword: 'review',
            question: questionText,
            options,
            answer,
            explanation,
            passage
          });
        }
      } else {
        // Regular week: parse N questions based on grade
        // Each question format: keyword - 题干：... 选项：... 正确答案：...
        // But this may span multiple lines

        // Split content by looking for patterns that start new questions
        // A new question starts with a keyword followed by " - 题干："
        const questionPattern = /([a-zA-Z一-龥\s]+?)\s*-\s*题干[：:]\s*/g;
        const questionStarts = [];
        let qMatch;
        while ((qMatch = questionPattern.exec(weekContent)) !== null) {
          questionStarts.push({
            keyword: qMatch[1].trim(),
            index: qMatch.index
          });
        }

        for (let j = 0; j < questionStarts.length; j++) {
          const qStart = questionStarts[j];
          const keyword = qStart.keyword;

          // Get content until next question or end
          const nextIndex = questionStarts[j + 1]?.index || weekContent.length;
          let questionContent = weekContent.slice(qStart.index, nextIndex);

          // Normalize line breaks and whitespace - replace CR/LF with space
          questionContent = questionContent.replace(/[\r\n]+/g, ' ').replace(/\s+/g, ' ');

          // Parse: 题干：XXX 选项：XXX 正确答案：X (解析：XXX)
          // This may span multiple lines, so use non-greedy matching with DOTALL

          // Extract question (from after "题干：" to before "选项：")
          const qTextMatch = questionContent.match(/题干[：:]\s*(.+?)(?=\s*选项[：:])/s);
          // Extract options (from after "选项：" to before "正确答案：")
          const optMatch = questionContent.match(/选项[：:]\s*(.+?)(?=\s*正确答案[：:])/s);
          // Extract answer and explanation
          // First try to match with explanation
          let answer = '';
          let explanation = '';
          const ansMatchWithExpl = questionContent.match(/正确答案[：:]\s*([A-D])\s*\([（(]解析[：:]\s*(.+?)\s*[）)]/s);
          const ansMatchNoExpl = questionContent.match(/正确答案[：:]\s*([A-D])/s);

          if (ansMatchWithExpl) {
            answer = ansMatchWithExpl[1].trim();
            explanation = ansMatchWithExpl[2].trim();
          } else if (ansMatchNoExpl) {
            answer = ansMatchNoExpl[1].trim();
            // Try to find explanation separately
            const explMatch = questionContent.match(/解析[：:]\s*(.+?)[）)]/s);
            if (explMatch) {
              explanation = explMatch[1].trim();
            }
          }

          if (qTextMatch && optMatch && answer) {
            const questionText = qTextMatch[1].trim();
            // Options are already normalized from questionContent
            let optionsText = optMatch[1].trim();

            // Parse options - handle format: A) option1 B) option2 C) option3 D) option4
            // First, normalize the text by replacing newlines
            const options = [];
            const multiOptPattern = /([A-D])\)\s*([^(]+?)(?=\s*[A-D]\)|$)/g;
            let moMatch;
            while ((moMatch = multiOptPattern.exec(optionsText)) !== null) {
              let opt = moMatch[2].trim().replace(/\s+/g, ' ');
              if (opt) options.push(opt);
            }

            if (questionText && options.length >= 2) {
              if (!questions[subjectName][currentWeek]) {
                questions[subjectName][currentWeek] = [];
              }

              questions[subjectName][currentWeek].push({
                week: currentWeek,
                keyword,
                question: questionText,
                options,
                answer,
                explanation
              });
            }
          }
        }
      }
    }
  }

  return questions;
}

// Generate unified markdown format
function generateUnifiedMarkdown(allData) {
  let output = '# Unified Vocabulary Questions\n\n';

  for (const [grade, subjects] of Object.entries(allData)) {
    output += `## ${grade}\n\n`;

    for (const [subject, weeks] of Object.entries(subjects)) {
      output += `### Subject: ${subject}\n\n`;

      const sortedWeeks = Object.keys(weeks).map(Number).sort((a, b) => a - b);

      for (const week of sortedWeeks) {
        const questions = weeks[week];
        for (const q of questions) {
          output += `**Week ${q.week}: ${q.keyword}**\n\n`;
          if (q.passage) {
            output += `> Passage: ${q.passage}\n\n`;
          }
          output += `**Question:** ${q.question}\n\n`;
          output += `**Options:**\n`;
          q.options.forEach((opt, i) => {
            output += `- ${String.fromCharCode(65 + i)}) ${opt}\n`;
          });
          output += `\n**Answer:** ${q.answer}\n\n`;
          output += `**Explanation:** ${q.explanation}\n\n`;
          output += `---\n\n`;
        }
      }
    }
  }

  return output;
}

// Generate TypeScript output from unified data
function generateTypeScript(allData) {
  let output = '// Auto-generated from markdown files\n\n';
  output += 'export interface PredefinedQuestion { week: number; keyword: string; question: string; options: string[]; answer: string; explanation: string; passage?: string; }\n\n';
  output += 'export const PREDEFINED_QUESTIONS: Record<string, Record<string, Record<number, PredefinedQuestion[]>>> = {\n';

  for (const [grade, subjects] of Object.entries(allData)) {
    output += `  "${grade}": {\n`;
    for (const [subject, weeks] of Object.entries(subjects)) {
      output += `    "${subject}": {\n`;
      for (const [week, questions] of Object.entries(weeks)) {
        output += `      ${week}: [`;
        output += questions.map(q => {
          const escapeQuotes = (str) => {
            if (!str) return '';
            // Replace curly quotes using their Unicode code points
            // Left curly quote: U+201C (“), Right curly quote: U+201D (”)
            // Left single quote: U+2018 (‘), Right single quote: U+2019 (’)
            let result = str;
            // Replace curly quotes with straight quotes
            result = result.replace(/“/g, '"');  // Left double curly quote
            result = result.replace(/”/g, '"');  // Right double curly quote
            result = result.replace(/‘/g, "'");  // Left single curly quote
            result = result.replace(/’/g, "'");  // Right single curly quote
            // Escape straight double quotes for TypeScript
            result = result.replace(/"/g, '\\"');
            // Replace newlines and clean up whitespace
            result = result.replace(/\n/g, ' ').replace(/\s+/g, ' ');
            return result;
          };
          let qStr = `{ week: ${q.week}, keyword: "${escapeQuotes(q.keyword)}", question: "${escapeQuotes(q.question)}", options: [${q.options.map(o => `"${escapeQuotes(o)}"`).join(', ')}], answer: "${q.answer}", explanation: "${escapeQuotes(q.explanation)}"`;
          if (q.passage) {
            qStr += `, passage: "${escapeQuotes(q.passage)}"`;
          }
          qStr += ' }';
          return qStr;
        }).join(', ');
        output += '],\n';
      }
      output += '    },\n';
    }
    output += '  },\n';
  }

  output += '};\n';
  return output;
}

// Main execution
function main() {
  const allData = {};

  // Get all markdown files
  const files = fs.readdirSync(INPUT_DIR).filter(f => f.endsWith('.md') && f.includes('Subject Vocabulary'));

  for (const file of files) {
    const gradeMatch = file.match(/G(\d+)/);
    if (!gradeMatch) continue;

    const grade = `G${gradeMatch[1]}`;
    const filePath = path.join(INPUT_DIR, file);

    console.log(`\nParsing ${file}...`);
    console.log(`  Expected: ${QUESTIONS_PER_WEEK[grade]} questions per week (non-review)`);

    const content = fs.readFileSync(filePath, 'utf-8');

    // Detect format and parse accordingly
    let questions;
    if (grade === 'G1') {
      // G1 has single-line format with special characters
      questions = parseG1Format(content);
    } else {
      // G2+ has multi-line format
      questions = parseG2Format(content, grade);
    }

    allData[grade] = questions;

    console.log(`  Found subjects: ${Object.keys(questions).join(', ')}`);
    for (const [subject, weeks] of Object.entries(questions)) {
      const weekList = Object.keys(weeks).map(Number).sort((a, b) => a - b);
      console.log(`    ${subject}:`);
      for (const week of weekList) {
        const qCount = weeks[week].length;
        const expected = week % 3 === 2 ? 1 : QUESTIONS_PER_WEEK[grade]; // Review weeks (5, 9, 12, 15) have 1 question
        console.log(`      Week ${week}: ${qCount} question(s) ${qCount !== expected ? `(expected ${expected}) ⚠️` : '✓'}`);
      }
    }
  }

  // Generate unified markdown
  const mdContent = generateUnifiedMarkdown(allData);
  fs.writeFileSync(UNIFIED_OUTPUT, mdContent, 'utf-8');
  console.log(`\n✓ Generated unified markdown: ${UNIFIED_OUTPUT}`);

  // Generate TypeScript file
  const tsContent = generateTypeScript(allData);
  fs.writeFileSync(TS_OUTPUT, tsContent, 'utf-8');
  console.log(`✓ Generated TypeScript: ${TS_OUTPUT}`);

  // Final statistics
  console.log('\n=== Final Summary ===');
  let totalQuestions = 0;
  for (const [grade, subjects] of Object.entries(allData)) {
    let gradeTotal = 0;
    for (const [subject, weeks] of Object.entries(subjects)) {
      gradeTotal += Object.values(weeks).flat().length;
    }
    totalQuestions += gradeTotal;
    console.log(`${grade}: ${gradeTotal} questions`);
  }
  console.log(`Total: ${totalQuestions} questions`);
}

main();
