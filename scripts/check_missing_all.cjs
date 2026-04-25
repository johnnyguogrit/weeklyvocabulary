const fs = require('fs');

// Read predefinedQuestions.ts content
const predefinedContent = fs.readFileSync('./app/src/data/predefinedQuestions.ts', 'utf8');

// All G5 keywords from vocabularyData.ts
const g5Keywords = {
  "Maths": {
    2: ['century', 'millennium', 'front view', 'side view', 'top view'],
    3: ['perspective', '2-dimensional', '3-dimensional', 'object', 'block'],
    4: ['cube', 'cuboid', 'rectangular prism', 'length', 'height'],
    5: ['factor', 'multiple', 'common', 'divisible', 'share'],
    7: ['common factor', 'common multiple', 'divisible', 'remainder', 'divide'],
    8: ['fraction', 'mixed number', 'improper', 'equal', 'part'],
    9: ['add', 'subtract', 'fraction', 'improper', 'simplify'],
    10: ['division', 'divide', 'fraction', 'whole', 'equal'],
    11: ['cube', 'cuboid', 'surface', 'edge', 'volume'],
    12: ['volume', 'unit', 'centimetre', 'count', 'space'],
    13: ['movement', 'slide', 'turn', 'flip', 'shape'],
    14: ['observe', 'line graph', 'data', 'point', 'trend'],
    15: ['fraction', 'factor', 'multiple', 'volume', 'line graph']
  },
  "Science": {
    2: ['compare', 'digestive', 'stomach', 'small intestine', 'function'],
    3: ['balance', 'diet', 'fats', 'vitamins', 'carbohydrates'],
    4: ['force', 'attract', 'repel', 'magnet', 'normal'],
    5: ['grow', 'human', 'body', 'health', 'digestive'],
    7: ['measure', 'drag', 'friction', 'upthrust', 'multiple'],
    8: ['healthy', 'thrust', 'push', 'pull', 'object'],
    9: ['teeth', 'material', 'magnet', 'alloy', 'test'],
    10: ['light', 'predict', 'change', 'attract', 'upthrust'],
    11: ['source', 'magnetic', 'measure', 'conclusion'],
    12: ['reflect', 'season', 'plant', 'animal', 'Earth', 'orbit'],
    13: ['darkness', 'sunrise', 'adapt', 'chlorophyll'],
    14: ['electricity', 'sunrise', 'sunset', 'season', 'plant', 'animal'],
    15: ['safety', 'thorn', 'habitat', 'adapt']
  }
};

let missing = [];
for (const [subject, weeks] of Object.entries(g5Keywords)) {
  for (const [week, keywords] of Object.entries(weeks)) {
    for (const keyword of keywords) {
      const escaped = keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const regex = new RegExp('keyword: "' + escaped + '"', 'i');
      if (!predefinedContent.match(regex)) {
        missing.push(subject + ' Week ' + week + ': ' + keyword);
      }
    }
  }
}
console.log('Missing questions:');
missing.forEach(m => console.log('  - ' + m));
console.log('\nTotal missing: ' + missing.length);
