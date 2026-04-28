#!/usr/bin/env node

/**
 * Convert G1 review-week format to individual questions per keyword per week
 * Extracts questions embedded in explanation text and formats them like G2+
 */

const fs = require('fs');
const path = require('path');

// Extract question from explanation text like:
// "• 第3周 (square)​ ◦ 题干：A _______ has four equal straight sides.​ ◦ 选项：A) triangle B) square C) star D) dot​ ◦ 正确答案：B​"
function extractQuestionsFromExplanation(explanation) {
  const questions = [];

  // Pattern to match: • 第N周 (keyword) ◦ 题干：question ◦ 选项：options ◦ 正确答案：answer
  const pattern = /•\s*第(\d+)周\s*\(([^)]+)\)[\s\S]*?◦\s*题干[：:]\s*([^•]+?)[\s​]*◦\s*选项[：:]\s*([^•]+?)[\s​]*◦\s*正确答案[：:]\s*([ABCD])/g;

  let match;
  while ((match = pattern.exec(explanation)) !== null) {
    const week = match[1];
    const keyword = match[2].trim();
    const questionText = match[3].trim().replace(/[.​​]/g, '').trim();
    const optionsText = match[4].trim();
    const answer = match[5];

    // Parse options: "A) triangle B) square C) star D) dot"
    const options = [];
    const optionPattern = /([ABCD])\)\s*([^ABCD]+?)(?=\s*[ABCD]\)|$)/g;
    let optMatch;
    while ((optMatch = optionPattern.exec(optionsText)) !== null) {
      options.push(optMatch[2].trim());
    }

    questions.push({
      week: parseInt(week),
      keyword,
      question: questionText,
      options,
      answer
    });
  }

  return questions;
}

// Parse the current G1 format
function parseG1Section(content) {
  const lines = content.split('\n');
  const subjects = {};
  let currentSubject = null;
  let currentWeek = null;
  let inQuestion = false;
  let inOptions = false;
  let inExplanation = false;
  let inPassage = false;

  let currentEntry = {
    week: null,
    passage: null,
    question: null,
    options: [],
    answer: null,
    explanation: null
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    const originalLine = lines[i];

    // Check for subject header
    if (line.match(/^###\s*Subject:\s*(.+)$/)) {
      if (currentSubject && currentEntry.week) {
        if (!subjects[currentSubject]) subjects[currentSubject] = [];
        subjects[currentSubject].push({...currentEntry});
      }
      currentSubject = line.match(/^###\s*Subject:\s*(.+)$/)[1];
      currentEntry = { week: null, passage: null, question: null, options: [], answer: null, explanation: null };
      continue;
    }

    // Check for week header
    const weekMatch = line.match(/^\*\*Week\s+(\d+):\s*(.+?)\*\*$/);
    if (weekMatch) {
      if (currentSubject && currentEntry.week) {
        if (!subjects[currentSubject]) subjects[currentSubject] = [];
        subjects[currentSubject].push({...currentEntry});
      }
      currentEntry = {
        week: parseInt(weekMatch[1]),
        keyword: weekMatch[2],
        passage: null,
        question: null,
        options: [],
        answer: null,
        explanation: null
      };
      continue;
    }

    // Check for G2 header (end of G1 section)
    if (line.match(/^##\s*G2/)) {
      if (currentSubject && currentEntry.week) {
        if (!subjects[currentSubject]) subjects[currentSubject] = [];
        subjects[currentSubject].push({...currentEntry});
      }
      break;
    }

    // Check for passage
    if (line.startsWith('> Passage:')) {
      currentEntry.passage = line.replace(/^>\s*Passage:\s*/, '').trim();
      continue;
    }

    // Check for question
    if (line.startsWith('**Question:**')) {
      currentEntry.question = line.replace(/^\*\*Question:\*\*\s*/, '').trim();
      inQuestion = true;
      continue;
    }

    // Check for options
    if (line.startsWith('**Options:**')) {
      inOptions = true;
      continue;
    }

    // Parse option line
    if (inOptions && line.match(/^-\s*([ABCD])\)\s*(.+)$/)) {
      const optMatch = line.match(/^-\s*([ABCD])\)\s*(.+)$/);
      currentEntry.options[optMatch[1]] = optMatch[2].trim();
      continue;
    }

    // Check for answer
    if (line.startsWith('**Answer:**')) {
      inOptions = false;
      currentEntry.answer = line.replace(/^\*\*Answer:\*\*\s*/, '').trim();
      continue;
    }

    // Check for explanation
    if (line.startsWith('**Explanation:**')) {
      inExplanation = true;
      currentEntry.explanation = line.replace(/^\*\*Explanation:\*\*\s*/, '').trim();
      continue;
    }

    // Append to explanation if we're in it
    if (inExplanation && line && !line.startsWith('---') && !line.startsWith('**')) {
      currentEntry.explanation += '\n' + originalLine.trim();
    }

    // Check for separator
    if (line === '---') {
      inExplanation = false;
      if (currentSubject && currentEntry.week) {
        if (!subjects[currentSubject]) subjects[currentSubject] = [];
        subjects[currentSubject].push({...currentEntry});
      }
      currentEntry = { week: null, passage: null, question: null, options: [], answer: null, explanation: null };
      inQuestion = false;
      inOptions = false;
      inExplanation = false;
    }
  }

  return subjects;
}

// Convert to new format
function convertG1ToNewFormat(subjects) {
  const newContent = [];

  newContent.push('# Unified Vocabulary Questions');
  newContent.push('');
  newContent.push('## G1');
  newContent.push('');

  for (const [subjectName, entries] of Object.entries(subjects)) {
    newContent.push(`### Subject: ${subjectName}`);
    newContent.push('');

    // Collect all extracted questions and original review questions
    const allQuestions = [];

    for (const entry of entries) {
      if (!entry.week) continue;

      // Extract questions from explanation
      const extracted = extractQuestionsFromExplanation(entry.explanation || '');
      for (const q of extracted) {
        allQuestions.push({
          week: q.week,
          keyword: q.keyword,
          question: q.question,
          options: q.options,
          answer: q.answer,
          explanation: `${q.keyword} 意为"${q.keyword}"`, // Simplified explanation
          isExtracted: true
        });
      }

      // Keep the original review question
      if (entry.question) {
        // Convert options object to array
        const optionsArray = [];
        for (let i = 0; i < 4; i++) {
          const letter = String.fromCharCode(65 + i); // A, B, C, D
          if (entry.options[letter]) {
            optionsArray.push(entry.options[letter]);
          }
        }

        allQuestions.push({
          week: entry.week,
          keyword: 'review',
          question: entry.question,
          options: optionsArray,
          answer: entry.answer,
          explanation: entry.explanation ? entry.explanation.split('\n')[0] : '',
          passage: entry.passage,
          isReview: true
        });
      }
    }

    // Sort by week and output
    allQuestions.sort((a, b) => {
      if (a.week !== b.week) return a.week - b.week;
      // Reviews go last for each week
      if (a.isReview && !b.isReview) return 1;
      if (!a.isReview && b.isReview) return -1;
      return 0;
    });

    for (const q of allQuestions) {
      if (q.isReview && q.passage) {
        newContent.push(`**Week ${q.week}: review**`);
        newContent.push('');
        newContent.push(`> Passage: ${q.passage}`);
      } else if (q.isReview) {
        newContent.push(`**Week ${q.week}: review**`);
      } else {
        newContent.push(`**Week ${q.week}: ${q.keyword}**`);
      }
      newContent.push('');
      newContent.push(`**Question:** ${q.question}`);
      newContent.push('');
      newContent.push('**Options:**');
      for (let i = 0; i < q.options.length; i++) {
        const letter = String.fromCharCode(65 + i);
        newContent.push(`- ${letter}) ${q.options[i]}`);
      }
      newContent.push('');
      newContent.push(`**Answer:** ${q.answer}`);
      newContent.push('');
      newContent.push(`**Explanation:** ${q.explanation}`);
      newContent.push('');
      newContent.push('---');
      newContent.push('');
    }
  }

  return newContent.join('\n');
}

// Main execution
const vocabPath = path.join(__dirname, '../weeklytest/UNIFIED_VOCABULARY.md');
const content = fs.readFileSync(vocabPath, 'utf8');

// Find G1 section (from ## G1 to ## G2)
const g1Start = content.indexOf('## G1');
const g2Start = content.indexOf('## G2');

if (g1Start === -1 || g2Start === -1) {
  console.error('Could not find G1 or G2 section');
  process.exit(1);
}

const g1Content = content.substring(g1Start, g2Start);
const subjects = parseG1Section(g1Content);
const newG1Content = convertG1ToNewFormat(subjects);

// Output the new G1 section
console.log(newG1Content);
