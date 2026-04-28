#!/usr/bin/env node

/**
 * Auto-convert G1 review-week format to individual questions per keyword
 * Extracts questions from explanation text and creates individual entries
 */

const fs = require('fs');
const path = require('path');

// Read the vocabulary data to get keyword-week mappings
const vocabDataPath = path.join(__dirname, '../next-app/data/vocabularyData.ts');
const vocabContent = fs.readFileSync(vocabDataPath, 'utf8');

// Extract G1 vocabulary data
const g1Data = {};
const vocabMatch = vocabContent.match(/"G1":\s*\{([\s\S]*?)\n\s*\},\s*\n\s*"G2"/);
if (vocabMatch) {
  // This is a simplified extraction - in production, use a proper TS parser
  const subjectMatches = vocabMatch[1].matchAll(/"([^"]+)":\s*\{([^}]+)\}/g);
  for (const match of subjectMatches) {
    const subject = match[1];
    const weekData = {};
    const weekMatches = match[2].matchAll(/"(\d+)":\s*\[\s*"([^"]+)"\s*(?:,\s*"([^"]+)"\s*)?\]/g);
    for (const wMatch of weekMatches) {
      const week = wMatch[1];
      const keywords = [];
      if (wMatch[2]) keywords.push(wMatch[2]);
      if (wMatch[3]) keywords.push(wMatch[3]);
      weekData[week] = keywords;
    }
    g1Data[subject] = weekData;
  }
}

console.log('G1 Vocabulary Data:', JSON.stringify(g1Data, null, 2));

// Extract questions from explanation format like:
// "• 第3周 (square) ◦ 题干：A _______ has four equal straight sides. ◦ 选项：A) triangle B) square C) star D) dot ◦ 正确答案：B"
function extractQuestionFromExplanation(keyword, explanation, weekNum) {
  // Pattern to find the question for a specific keyword
  const patterns = [
    // Format: • 第N周 (keyword) ◦ 题干：question ◦ 选项：options ◦ 正确答案：answer
    new RegExp(`•\\s*第(\\d+)周\\s*\\(\\s*${keyword}\\s*\\)[\\s\\S]*?◦\\s*题干[：:]\\s*([^◦]+?)[\\s​]*◦\\s*选项[：:]\\s*([^◦]+?)[\\s​]*◦\\s*正确答案[：:]\\s*([ABCD])`),
    // Alternative format
    new RegExp(`•\\s*第(\\d+)周\\s*\\(\\s*${keyword}\\s*\\)[\\s\\S]*?题干[：:]\\s*([^•]+?)\\s*选项[：:]\\s*([^•]+?)\\s*正确答案[：:]\\s*([ABCD])`),
  ];

  for (const pattern of patterns) {
    const match = explanation.match(pattern);
    if (match) {
      const questionWeek = parseInt(match[1]);
      if (questionWeek === parseInt(weekNum)) {
        const questionText = match[2].trim().replace(/[.​​]/g, '').trim();
        const optionsText = match[3].trim();
        const answer = match[4];

        // Parse options
        const options = [];
        const optionPattern = /([ABCD])\)\s*([^ABCD]+?)(?=\s*[ABCD]\)|$)/g;
        let optMatch;
        while ((optMatch = optionPattern.exec(optionsText)) !== null) {
          options.push(optMatch[2].trim());
        }

        if (options.length === 4) {
          return {
            question: questionText,
            options,
            answer
          };
        }
      }
    }
  }

  return null;
}

// Parse and convert a subject section
function convertSubject(subjectContent, subjectName) {
  const lines = subjectContent.split('\n');
  const result = [];

  let currentWeek = null;
  let currentKeyword = null;
  let currentPassage = null;
  let currentQuestion = null;
  let currentOptions = [];
  let currentAnswer = null;
  let currentExplanation = null;
  let inOptions = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // Check for week header
    const weekMatch = line.match(/^\*\*Week\s+(\d+):\s*(.+?)\*\*$/);
    if (weekMatch) {
      // Save previous entry if exists
      if (currentWeek && currentQuestion) {
        result.push({
          week: parseInt(currentWeek),
          keyword: currentKeyword,
          passage: currentPassage,
          question: currentQuestion,
          options: currentOptions,
          answer: currentAnswer,
          explanation: currentExplanation
        });
      }

      currentWeek = weekMatch[1];
      currentKeyword = weekMatch[2];
      currentPassage = null;
      currentQuestion = null;
      currentOptions = [];
      currentAnswer = null;
      currentExplanation = null;
      inOptions = false;
      continue;
    }

    // Check for passage
    if (line.startsWith('> Passage:')) {
      currentPassage = line.replace(/^>\s*Passage:\s*/, '').trim();
      continue;
    }

    // Check for question
    if (line.startsWith('**Question:**')) {
      currentQuestion = line.replace(/^\*\*Question:\*\*\s*/, '').trim();
      continue;
    }

    // Check for options
    if (line.startsWith('**Options:**')) {
      inOptions = true;
      currentOptions = [];
      continue;
    }

    // Parse option line
    if (inOptions && line.match(/^-\s*([ABCD])\)\s*(.+)$/)) {
      const optMatch = line.match(/^-\s*([ABCD])\)\s*(.+)$/);
      currentOptions[optMatch[1]] = optMatch[2].trim();
      continue;
    }

    // Check for answer
    if (line.startsWith('**Answer:**')) {
      inOptions = false;
      currentAnswer = line.replace(/^\*\*Answer:\*\*\s*/, '').trim();
      continue;
    }

    // Check for explanation
    if (line.startsWith('**Explanation:**')) {
      currentExplanation = line.replace(/^\*\*Explanation:\*\*\s*/, '').trim();
      // Continue reading explanation on following lines
      let j = i + 1;
      while (j < lines.length && !lines[j].trim().startsWith('---') && !lines[j].trim().startsWith('**')) {
        if (lines[j].trim()) {
          currentExplanation += '\n' + lines[j].trim();
        }
        j++;
        i = j - 1;
      }
      continue;
    }

    // Check for separator
    if (line === '---') {
      if (currentWeek && currentQuestion) {
        result.push({
          week: parseInt(currentWeek),
          keyword: currentKeyword,
          passage: currentPassage,
          question: currentQuestion,
          options: currentOptions,
          answer: currentAnswer,
          explanation: currentExplanation
        });
      }
      currentWeek = null;
      currentKeyword = null;
      currentPassage = null;
      currentQuestion = null;
      currentOptions = [];
      currentAnswer = null;
      currentExplanation = null;
      inOptions = false;
    }
  }

  // Don't forget the last entry
  if (currentWeek && currentQuestion) {
    result.push({
      week: parseInt(currentWeek),
      keyword: currentKeyword,
      passage: currentPassage,
      question: currentQuestion,
      options: currentOptions,
      answer: currentAnswer,
      explanation: currentExplanation
    });
  }

  // Now extract individual questions from explanations and create new entries
  const newEntries = [];

  for (const entry of result) {
    if (entry.keyword === 'review' && entry.explanation) {
      // Extract questions from explanation
      const pattern = /•\s*第(\d+)周\s*\(\s*([^)]+)\s*\)[\s\S]*?◦\s*题干[：:]\s*([^◦]+?)[\s​]*◦\s*选项[：:]\s*([^◦]+?)[\s​]*◦\s*正确答案[：:]\s*([ABCD])/g;
      let match;

      while ((match = pattern.exec(entry.explanation)) !== null) {
        const week = parseInt(match[1]);
        const keyword = match[2].trim();
        const question = match[3].trim().replace(/[.​​]/g, '').trim();
        const optionsText = match[4].trim();
        const answer = match[5];

        // Parse options
        const options = [];
        const optPattern = /([ABCD])\)\s*([^ABCD]+?)(?=\s*[ABCD]\)|$)/g;
        let optMatch;
        while ((optMatch = optPattern.exec(optionsText)) !== null) {
          options.push(optMatch[2].trim());
        }

        if (options.length === 4) {
          newEntries.push({
            week,
            keyword,
            passage: null,
            question,
            options,
            answer,
            explanation: `${keyword}意为"${keyword}"`
          });
        }
      }

      // Keep the review question
      newEntries.push(entry);
    } else {
      newEntries.push(entry);
    }
  }

  // Sort by week
  newEntries.sort((a, b) => {
    if (a.week !== b.week) return a.week - b.week;
    // Reviews go last for each week
    if (a.keyword === 'review' && b.keyword !== 'review') return 1;
    if (a.keyword !== 'review' && b.keyword === 'review') return -1;
    return 0;
  });

  return newEntries;
}

// Format entries as markdown
function formatAsMarkdown(entries, subjectName) {
  let markdown = `### Subject: ${subjectName}\n\n`;

  for (const entry of entries) {
    if (entry.passage) {
      markdown += `**Week ${entry.week}: review**\n\n`;
      markdown += `> Passage: ${entry.passage}\n\n`;
    } else if (entry.keyword === 'review') {
      markdown += `**Week ${entry.week}: review**\n\n`;
    } else {
      markdown += `**Week ${entry.week}: ${entry.keyword}**\n\n`;
    }

    markdown += `**Question:** ${entry.question}\n\n`;
    markdown += `**Options:**\n`;
    const optionLetters = ['A', 'B', 'C', 'D'];
    for (let i = 0; i < entry.options.length; i++) {
      markdown += `- ${optionLetters[i]}) ${entry.options[i]}\n`;
    }
    markdown += `\n**Answer:** ${entry.answer}\n\n`;
    markdown += `**Explanation:** ${entry.explanation}\n\n`;
    markdown += `---\n\n`;
  }

  return markdown;
}

// Main execution
const vocabPath = path.join(__dirname, '../weeklytest/UNIFIED_VOCABULARY.md');
const content = fs.readFileSync(vocabPath, 'utf8');

// Find G1 section
const g1Start = content.indexOf('## G1');
const g2Start = content.indexOf('## G2');

if (g1Start === -1 || g2Start === -1) {
  console.error('Could not find G1 or G2 section');
  process.exit(1);
}

const g1Content = content.substring(g1Start, g2Start);

// Split by subjects and process each
const subjectSections = g1Content.split(/### Subject:/);
const newG1Content = ['## G1'];

for (let i = 1; i < subjectSections.length; i++) {
  const subjectMatch = subjectSections[i].match(/^([^\n]+)/);
  if (!subjectMatch) continue;

  const subjectName = subjectMatch[1].trim();
  const subjectContent = '### Subject:' + subjectSections[i];

  const entries = convertSubject(subjectContent, subjectName);
  const markdown = formatAsMarkdown(entries, subjectName);

  newG1Content.push(markdown);
}

console.log(newG1Content.join('\n'));
