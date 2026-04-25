const fs = require('fs');

// Read predefinedQuestions.ts content
const predefinedContent = fs.readFileSync('./app/src/data/predefinedQuestions.ts', 'utf8');

// Check for subjects that need verification
const checkKeywords = (subjectName, weeksData) => {
  let missing = [];
  for (const [week, keywords] of Object.entries(weeksData)) {
    for (const keyword of keywords) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('keyword: "' + escaped + '"', 'i');
      if (!predefinedContent.match(regex)) {
        missing.push('Week ' + week + ': ' + keyword);
      }
    }
  }
  if (missing.length > 0) {
    console.log('\\n' + subjectName + ' missing (' + missing.length + '):');
    missing.forEach(m => console.log('  - ' + m));
  }
  return missing.length;
};

// Define keywords from vocabularyData.ts that need verification
const maths = {
  2: ['top view'],
  3: ['2-dimensional', '3-dimensional'],
  5: ['factor', 'common', 'share'],
  8: ['mixed number'],
  10: ['whole'],
  15: ['factor']
};

const science = {
  2: ['small intestine'],
  5: ['grow', 'human', 'body', 'health'],
  14: ['electricity'],
  15: ['safety', 'thorn']
};

const steam = {
  2: ['Question Type', 'Fair'],
  4: ['Cycle'],
  8: ['Debug', 'Constructive', 'Suggestion'],
  12: ['AVERAGE', 'MAX', 'MIN', 'COUNT'],
  14: ['Axis', 'Label', 'Legend', 'Comparison']
};

const performingArts = {
  7: ['project voice'],
  12: ['eye contact'],
  13: ['project'],
  14: ['connect to audience']
};

const visualArts = {
  2: ['foreground'],
  3: ['horizon', 'depth'],
  4: ['measure'],
  13: ['reflect']
};

const pe = {
  3: ['training plan', 'photo finish'],
  7: ['adaptability', 'confidence'],
  11: ['high serve'],
  12: ['low serve'],
  13: ['half-smash'],
  15: ['base position']
};

let total = 0;
total += checkKeywords('Maths', maths);
total += checkKeywords('Science', science);
total += checkKeywords('STEAM', steam);
total += checkKeywords('Performing Arts', performingArts);
total += checkKeywords('Visual Arts', visualArts);
total += checkKeywords('PE', pe);

console.log('\\n=== TOTAL MISSING: ' + total + ' ===');
