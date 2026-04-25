const fs = require('fs');

// Read predefinedQuestions.ts content
const predefinedContent = fs.readFileSync('./app/src/data/predefinedQuestions.ts', 'utf8');

// G5 Music keywords from vocabularyData.ts
const g5Music = {
  2: ['soprano recorder', 'fingering', 'thumb hole', 'breath control'],
  3: ['storytelling', 'emotion', 'intention', 'meaning', 'expression'],
  4: ['enunciation', 'consonant', 'vowel shape', 'clarity', 'resonance'],
  5: ['projection', 'diaphragm', 'posture alignment', 'vocal energy', 'stamina'],
  7: ['cue line', 'timing moment', 'reaction', 'interaction', 'connection'],
  8: ['stage direction', 'blocking', 'movement path', 'formation', 'transition'],
  9: ['acting choice', 'dramatic moment', 'character voice', 'personality', 'imagination'],
  10: ['rehearsal process', 'refine', 'adjust', 'repeat section', 'improvement'],
  11: ['musical phrasing', 'musical intention', 'emotional color', 'intensity', 'nuance'],
  12: ['audience engagement', 'stage confidence', 'stage focus', 'commitment', 'presence'],
  13: ['teamwork', 'responsibility', 'preparation', 'discipline', 'reliability'],
  14: ['performance readiness', 'polish', 'final rehearsal', 'dress rehearsal', 'presentation'],
  15: ['reflection', 'critique', 'growth', 'achievement', 'celebration']
};

let missing = [];
for (const [week, keywords] of Object.entries(g5Music)) {
  for (const keyword of keywords) {
    const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const regex = new RegExp('keyword: "' + escaped + '"', 'i');
    if (!predefinedContent.match(regex)) {
      missing.push('Week ' + week + ': ' + keyword);
    }
  }
}
console.log('Missing Music questions:');
missing.forEach(m => console.log('  - ' + m));
console.log('\nTotal missing: ' + missing.length);
