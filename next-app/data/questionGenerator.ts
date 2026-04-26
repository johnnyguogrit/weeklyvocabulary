import { VOCABULARY_DATA } from './vocabularyData';
import { TRANSLATIONS } from './translations';
import { PREDEFINED_QUESTIONS } from './predefinedQuestions';
import type { Question, ReadingPassage, WeekData, SubjectData, QuestionType } from '@/types/game';
import { SUBJECT_CONFIG, WEEK_NAMES } from '@/types/game';

export function getTranslation(keyword: string): { cn: string; ipa: string; read: string } | null {
  const exact = TRANSLATIONS[keyword];
  if (exact) return exact;
  for (const [k, v] of Object.entries(TRANSLATIONS)) {
    if (k.toLowerCase() === keyword.toLowerCase()) return v;
  }
  for (const [k, v] of Object.entries(TRANSLATIONS)) {
    if (k.toLowerCase().includes(keyword.toLowerCase()) || keyword.toLowerCase().includes(k.toLowerCase())) return v;
  }
  return null;
}

// ─── Smart Explanation Generator ─────────────────────────────────────
function smartExplanation(keyword: string, subject: string): string {
  const kw = keyword.toLowerCase().trim();
  const trans = getTranslation(keyword);
  if (trans) return trans.cn + "; " + trans.read;
  // Pattern-based fallbacks
  if (kw.includes('view')) return 'a way of looking at something from a particular direction';
  if (kw.includes('century') || kw.includes('millennium') || kw.includes('hour') || kw.includes('minute')) return 'a unit or measurement of time';
  if (kw.includes('angle') || kw.includes('line') || kw.includes('shape') || kw.includes('side') || kw.includes('corner') || kw.includes('edge')) return 'a geometric property or feature of shapes';
  if (kw.includes('fraction') || kw.includes('decimal') || kw.includes('percent')) return 'a way to represent parts of a whole number';
  if (kw.includes('add') || kw.includes('plus') || kw.includes('sum') || kw.includes('total') || kw.includes('together')) return 'to combine numbers to get a larger amount';
  if (kw.includes('subtract') || kw.includes('minus') || kw.includes('difference') || kw.includes('less') || kw.includes('take away')) return 'to find the difference between numbers';
  if (kw.includes('multiply') || kw.includes('times') || kw.includes('product')) return 'to add a number to itself multiple times';
  if (kw.includes('divide') || kw.includes('quotient') || kw.includes('share') || kw.includes('remainder')) return 'to split a number into equal parts';
  if (kw.includes('force') || kw.includes('gravity') || kw.includes('friction') || kw.includes('drag') || kw.includes('thrust')) return 'a type of force or push/pull in physics';
  if (kw.includes('magnet') || kw.includes('attract') || kw.includes('repel')) return 'a property related to magnetic forces';
  if (kw.includes('digest') || kw.includes('stomach') || kw.includes('intestine') || kw.includes('organ')) return 'a part of the body or its functions';
  if (kw.includes('diet') || kw.includes('vitamin') || kw.includes('fat') || kw.includes('carb') || kw.includes('protein') || kw.includes('mineral')) return 'a concept related to nutrition and healthy eating';
  if (kw.includes('heart') || kw.includes('brain') || kw.includes('lung') || kw.includes('kidney') || kw.includes('blood')) return 'an important organ in the human body';
  if (kw.includes('earth') || kw.includes('moon') || kw.includes('sun') || kw.includes('planet') || kw.includes('orbit')) return 'a concept about space and celestial bodies';
  if (kw.includes('volcano') || kw.includes('earthquake') || kw.includes('lava') || kw.includes('crust') || kw.includes('mantle')) return "a concept about the Earth's structure or geology";
  if (kw.includes('light') || kw.includes('dark') || kw.includes('reflect') || kw.includes('shadow') || kw.includes('source')) return 'a concept about light and how we see';
  if (kw.includes('animal') || kw.includes('plant') || kw.includes('habitat') || kw.includes('life cycle') || kw.includes('reptile') || kw.includes('mammal')) return 'a concept about living things and biology';
  if (kw.includes('fossil') || kw.includes('material') || kw.includes('metal') || kw.includes('iron') || kw.includes('steel') || kw.includes('gold')) return 'a concept about materials and natural resources';
  if (kw.includes('code') || kw.includes('program') || kw.includes('algorithm') || kw.includes('script') || kw.includes('block') || kw.includes('loop')) return 'a concept in computer programming and coding';
  if (kw.includes('input') || kw.includes('output') || kw.includes('interface') || kw.includes('screen') || kw.includes('keyboard') || kw.includes('mouse')) return 'a concept about computer hardware and interaction';
  if (kw.includes('data') || kw.includes('spreadsheet') || kw.includes('chart') || kw.includes('graph') || kw.includes('analysis')) return 'a concept about data and information processing';
  if (kw.includes('network') || kw.includes('router') || kw.includes('server') || kw.includes('ip') || kw.includes('wifi') || kw.includes('internet')) return 'a concept about computer networks and connectivity';
  if (kw.includes('variable') || kw.includes('score') || kw.includes('conditional') || kw.includes('flowchart')) return 'a concept in programming logic';
  if (kw.includes('project') || kw.includes('requirement') || kw.includes('template') || kw.includes('structure')) return 'a concept in project planning and design';
  if (kw.includes('sing') || kw.includes('song') || kw.includes('melody') || kw.includes('rhythm') || kw.includes('note') || kw.includes('tune')) return 'a concept in music and singing';
  if (kw.includes('recorder') || kw.includes('instrument') || kw.includes('finger') || kw.includes('breath') || kw.includes('tongue')) return 'a concept about playing musical instruments';
  if (kw.includes('stage') || kw.includes('performance') || kw.includes('audience') || kw.includes('rehearse') || kw.includes('conductor')) return 'a concept about performing in front of others';
  if (kw.includes('expression') || kw.includes('emotion') || kw.includes('feeling') || kw.includes('mood') || kw.includes('intention')) return 'a concept about expressing feelings through art';
  if (kw.includes('voice') || kw.includes('vocal') || kw.includes('sing') || kw.includes('projection') || kw.includes('diaphragm')) return 'a concept about using the voice in singing';
  if (kw.includes('enunciation') || kw.includes('consonant') || kw.includes('vowel') || kw.includes('clarity') || kw.includes('resonance')) return 'a concept about clear pronunciation in singing';
  if (kw.includes('character') || kw.includes('scene') || kw.includes('dialogue') || kw.includes('actor') || kw.includes('script') || kw.includes('prop')) return 'a concept in drama and theater performance';
  if (kw.includes('direction') || kw.includes('blocking') || kw.includes('movement') || kw.includes('formation') || kw.includes('transition')) return 'a concept about movement and positioning on stage';
  if (kw.includes('gymnastics') || kw.includes('jump') || kw.includes('stretch') || kw.includes('cartwheel')) return 'a concept in gymnastics and physical movement';
  if (kw.includes('dance') || kw.includes('choreography') || kw.includes('routine')) return 'a concept in dance and physical expression';
  if (kw.includes('paint') || kw.includes('draw') || kw.includes('sketch') || kw.includes('color') || kw.includes('palette') || kw.includes('brush')) return 'a concept in visual art and drawing';
  if (kw.includes('sculpture') || kw.includes('clay') || kw.includes('carve') || kw.includes('model') || kw.includes('three-dimensional')) return 'a concept in 3D art and sculpture';
  if (kw.includes('motif') || kw.includes('design') || kw.includes('texture') || kw.includes('symmetry')) return 'a concept in art design and decoration';
  if (kw.includes('collage') || kw.includes('mosaic') || kw.includes('weaving') || kw.includes('paper') || kw.includes('fabric')) return 'a concept in mixed media and textile art';
  if (kw.includes('exhibition') || kw.includes('gallery') || kw.includes('display') || kw.includes('curate')) return 'a concept about showing art to the public';
  if (kw.includes('sport') || kw.includes('game') || kw.includes('race') || kw.includes('competition')) return 'a concept in sports and team activities';
  if (kw.includes('bounce') || kw.includes('throw') || kw.includes('catch') || kw.includes('kick') || kw.includes('run') || kw.includes('jump')) return 'a physical action in sports and games';
  if (kw.includes('practice') || kw.includes('train') || kw.includes('exercise') || kw.includes('workout')) return 'the act of repeating to improve skill';
  if (kw.includes('spirit') || kw.includes('motivation') || kw.includes('confidence') || kw.includes('sportsmanship') || kw.includes('respect')) return 'a concept about attitude and behavior in sports';
  if (kw.includes('strategy') || kw.includes('tactic') || kw.includes('plan') || kw.includes('skill') || kw.includes('technique')) return 'a concept about planning and methods in sports';
  if (kw.includes('stamina') || kw.includes('endurance') || kw.includes('strength') || kw.includes('speed') || kw.includes('agility')) return 'a physical ability in sports and fitness';

  const fallbacks: Record<string, string[]> = {
    maths: ['a mathematical term used in calculations', 'a concept about numbers and operations', 'an important word in mathematics'],
    science: ['a scientific term about the natural world', 'a word used in studying how things work', 'an important science vocabulary word'],
    steam: ['a technology and computing term', 'a concept in digital literacy and coding', 'an important word in technology'],
    music: ['a musical term for performers', 'a word used when making music', 'an important music vocabulary word'],
    'performing arts': ['a performing arts term', 'a word used in dance and movement', 'an important performance word'],
    drama: ['a theatrical term for actors', 'a word used in plays and acting', 'an important drama vocabulary word'],
    'visual arts': ['an art term for creative work', 'a word used in making art', 'an important art vocabulary word'],
    pe: ['a sports and fitness term', 'a word used in physical activities', 'an important PE vocabulary word'],
  };
  const theme = (SUBJECT_CONFIG[subject]?.name || 'maths').toLowerCase();
  const pool = fallbacks[theme] || fallbacks['maths'];
  return pool[Math.floor(Math.random() * pool.length)];
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ─── Engaging Question Templates ─────────────────────────────────────
const QUESTION_TEMPLATES: Record<string, string[][]> = {
  Maths: [
    ['In Maths class, "{kw}" helps us {action}. What does it mean?', 'When solving problems, "{kw}" means {explanation}. Can you tell what it is?', 'Your Maths teacher says: "Remember, {kw} is when you {action}." What is {kw}?', 'In a Maths quiz, the question asks about "{kw}". What does this word mean?', '"{kw}" is a Maths word for {explanation}. What is the Chinese for {kw}?', 'Tom is doing his Maths homework. He needs to use "{kw}" to {action}. What does {kw} mean?'],
  ],
  Science: [
    ['In Science lab, we learn that "{kw}" is {explanation}. What does {kw} mean?', '"{kw}" is an important Science word. It means {explanation}. Do you know it?', 'During the Science experiment, the teacher mentions "{kw}". What does this word mean?', 'In your Science textbook, "{kw}" is described as {explanation}. What is {kw}?', '"{kw}" helps us understand how nature works. What does {kw} mean?'],
  ],
  STEAM: [
    ['When using computers, "{kw}" means {explanation}. What does {kw} mean?', 'In STEAM class, your teacher says: "{kw} is important for coding." What does {kw} mean?', '"{kw}" is a technology word that means {explanation}. Can you tell what it is?', 'On the computer screen, you see the word "{kw}". What does this word mean?'],
  ],
  Music: [
    ['In Music class, "{kw}" means {explanation}. What does {kw} mean?', 'Your music teacher says: "Use {kw} when you sing." What does {kw} mean?', '"{kw}" is a music word for {explanation}. Do you know it?', 'When practising the song, remember "{kw}" means {explanation}. What is {kw}?'],
  ],
  'Performing Arts': [
    ['On stage, "{kw}" means {explanation}. What does {kw} mean?', 'The director says: "Use {kw} in your performance." What does {kw} mean?', 'In Performing Arts, "{kw}" is about {explanation}. Can you tell what it is?'],
  ],
  Drama: [
    ['In Drama class, "{kw}" means {explanation}. What does {kw} mean?', 'The Drama teacher asks: "Who knows what {kw} means?" What is the answer?', 'On stage, actors use "{kw}" to {action}. What does {kw} mean?'],
  ],
  'Visual Arts': [
    ['In Art class, "{kw}" means {explanation}. What does {kw} mean?', 'When drawing, artists use "{kw}" to {action}. What does {kw} mean?', '"{kw}" is an important art word for {explanation}. Do you know it?'],
  ],
  PE: [
    ['In PE class, "{kw}" means {explanation}. What does {kw} mean?', 'Your PE teacher shouts: "Use {kw}!" What does {kw} mean?', 'When playing sports, "{kw}" helps you {action}. What does {kw} mean?', '"{kw}" is a sports word for {explanation}. Can you tell what it is?'],
  ],
};

function generateDistractors(keyword: string, allKeywords: string[], count = 3): string[] {
  const kwLower = keyword.toLowerCase();
  const candidates = allKeywords.filter(k => k.toLowerCase() !== kwLower && k.length > 2);
  if (candidates.length >= count) return shuffleArray(candidates).slice(0, count);
  const fillers = ['understanding', 'knowledge', 'learning', 'practice', 'skill', 'method', 'process'];
  const result = [...candidates];
  while (result.length < count) result.push(fillers[Math.floor(Math.random() * fillers.length)]);
  return shuffleArray(result).slice(0, count);
}

export function generateQuestions(keywords: string[], weekId: number, subject: string): Question[] {
  const questions: Question[] = [];
  const usedKeywords = shuffleArray(keywords).slice(0, Math.min(5, keywords.length));
  const subjectTemplates = QUESTION_TEMPLATES[subject] || QUESTION_TEMPLATES['Maths'];
  const templates = subjectTemplates[0] || subjectTemplates.flat();

  usedKeywords.forEach((keyword, i) => {
    const explanation = smartExplanation(keyword, subject);
    const distractors = generateDistractors(keyword, keywords);
    const options = shuffleArray([...distractors, keyword]);
    const qType: QuestionType = i % 3 === 0 ? 'multipleChoice' : i % 3 === 1 ? 'context' : 'fillBlank';

    let questionText: string;
    if (qType === 'multipleChoice') {
      questionText = `What does "${keyword}" mean?`;
    } else if (qType === 'fillBlank') {
      questionText = `The word "______" means ${explanation}.`;
    } else {
      const tmpl = templates[i % templates.length];
      questionText = tmpl
        .replace('{kw}', keyword)
        .replace('{explanation}', explanation)
        .replace('{action}', explanation.split(' ').slice(0, 3).join(' '));
    }

    questions.push({
      id: `q-${weekId}-${i}`,
      type: qType,
      question: questionText,
      options,
      correctAnswer: keyword,
      explanation: `"${keyword}" means ${explanation}.`,
      weekId,
    });
  });

  return questions;
}

const PASSAGE_TEMPLATES: Record<string, string[]> = {
  Maths: [
    'In maths class this week, the students learned about {kw1}, {kw2}, and {kw3}. Sarah practiced using {kw4} and {kw5} to solve problems. Her teacher explained that {kw1} is very important to understand. Tom drew diagrams showing {kw2} and {kw3}. Everyone worked hard to master these new concepts!',
    'Today we explored {kw1}, {kw2}, and {kw3}. These ideas help us understand numbers better. When we use {kw4}, we can solve harder problems. The class also practiced {kw5} with partners. Math is full of interesting patterns!',
  ],
  Science: [
    'In science lab, the students studied {kw1} and {kw2}. They observed how {kw3} works in nature. The teacher showed a diagram of {kw4}. Everyone was fascinated by {kw5} and wanted to learn more about how things work in our world.',
    'This week we learned about {kw1}. Scientists use {kw2} to understand the world. We did an experiment about {kw3}. Our results showed that {kw4} is true. We also discussed how {kw5} affects our daily lives.',
  ],
  STEAM: [
    'In STEAM class, we explored {kw1} and {kw2}. The students used computers to practice {kw3}. They designed projects using {kw4} and {kw5}. Everyone enjoyed learning about technology and how things work behind the screen.',
    'This week in coding class, we learned about {kw1}. The teacher explained that {kw2} is essential for good programs. Students practiced {kw3} on their tablets. We also discussed {kw4} and {kw5} as important concepts in technology.',
  ],
  Music: [
    'In music class, the students practiced {kw1} and {kw2}. Their teacher showed them how to use {kw3} correctly. Everyone sang with beautiful {kw4}. They also worked on {kw5} to improve their performance. The rehearsal was wonderful!',
    'Today the choir worked on {kw1} and {kw2}. The conductor reminded everyone about {kw3}. Students focused on their {kw4} and {kw5}. By the end of class, the music sounded much more polished and expressive.',
  ],
  'Performing Arts': [
    'In performing arts, the students practiced {kw1} and {kw2}. They moved across the stage using {kw3}. The director reminded them about {kw4}. Everyone showed great {kw5} during the rehearsal.',
    'The performers worked hard on {kw1} and {kw2}. They learned that {kw3} is key to a good show. The choreographer taught them {kw4}. By the end, their {kw5} had improved so much!',
  ],
  Drama: [
    'In drama class, the students explored {kw1} and {kw2}. They practiced using {kw3} on stage. The teacher explained that good actors need {kw4}. Everyone rehearsed their {kw5} with great enthusiasm.',
    'The actors worked on {kw1} and {kw2}. Their director taught them about {kw3}. They used {kw4} to make their scenes more believable. The class ended with everyone practicing {kw5}.',
  ],
  'Visual Arts': [
    'In art class, the students created works using {kw1} and {kw2}. They learned about {kw3} from different cultures. The teacher demonstrated {kw4}. Everyone enjoyed exploring {kw5} in their own artwork.',
    'This week we studied {kw1} and {kw2}. The artist showed us how to use {kw3}. Students practiced {kw4} with colorful materials. Their final pieces showed beautiful {kw5}.',
  ],
  PE: [
    'In PE class, the students practiced {kw1} and {kw2}. They worked on {kw3} in teams. The coach reminded everyone about {kw4}. By the end, everyone showed better {kw5}.',
    'The athletes trained hard on {kw1} and {kw2}. They learned that {kw3} helps them improve. The team worked on {kw4} together. Everyone was proud of their {kw5}.',
  ],
};

export function generatePassage(keywords: string[], subject: string, weekId: number): ReadingPassage {
  const templates = PASSAGE_TEMPLATES[subject] || PASSAGE_TEMPLATES['Maths'];
  const template = templates[Math.floor(Math.random() * templates.length)];
  const featured = keywords.slice(0, 5);
  while (featured.length < 5) featured.push(keywords[0]);

  let passage = template;
  passage = passage.replace('{kw1}', `**${featured[0]}**`);
  passage = passage.replace('{kw2}', `**${featured[1]}**`);
  passage = passage.replace('{kw3}', `**${featured[2]}**`);
  passage = passage.replace('{kw4}', `**${featured[3]}**`);
  passage = passage.replace('{kw5}', `**${featured[4]}**`);

  keywords.forEach(kw => {
    if (!passage.includes(`**${kw}**`)) {
      passage = passage.replace(new RegExp(`\\b${kw}\\b`, 'g'), `**${kw}**`);
    }
  });

  const rcQuestions = [];
  const usedIndices = shuffleArray([0, 1, 2, 3, 4]).slice(0, 3);
  for (const idx of usedIndices) {
    const kw = featured[idx];
    const expl = smartExplanation(kw, subject);
    const options = shuffleArray([...generateDistractors(kw, keywords), kw]);
    const rcQ = [
      `What does "${kw}" mean in the passage?`,
      `In the passage, what is "${kw}"?`,
      `According to the passage, "${kw}" refers to what?`,
    ][Math.floor(Math.random() * 3)];
    rcQuestions.push({
      question: rcQ,
      options,
      correctAnswer: kw,
      explanation: `"${kw}" means ${expl}.`,
    });
  }

  return {
    weekId,
    title: `${WEEK_NAMES[weekId] || 'Week ' + weekId}`,
    passage,
    questions: rcQuestions,
  };
}

// ─── Predefined Question Helpers ────────────────────────────────────────

/** Convert answer letter (A/B/C/D) to the actual option text */
function letterToAnswer(options: string[], letter: string): string {
  const idx = letter.charCodeAt(0) - 'A'.charCodeAt(0);
  return options[idx] || options[0];
}

/** Build SubjectData from predefined questions for any grade */
function buildSubjectDataFromPredefined(
  grade: string,
  subject: string,
  keywordsByWeek: Record<string, string[]>
): { weeks: WeekData[]; passages: ReadingPassage[] } {
  const config = SUBJECT_CONFIG[subject] || { name: subject, emoji: '📚', color: '#666', description: '' };
  const subjectQuestions = PREDEFINED_QUESTIONS[grade]?.[subject] || {};

  const weeks: WeekData[] = [];
  const passages: ReadingPassage[] = [];

  for (const [weekIdStr, keywords] of Object.entries(keywordsByWeek)) {
    const weekId = parseInt(weekIdStr);
    const predefined = subjectQuestions[weekId];

    let weekQuestions: Question[] = [];

    if (predefined && predefined.length > 0) {
      // Use ALL predefined questions for this week
      for (let i = 0; i < predefined.length; i++) {
        const pd = predefined[i];
        const correctText = letterToAnswer(pd.options, pd.answer);

        // Check if this question has a reading passage
        if (pd.passage) {
          // This is a reading comprehension question
          // Add it to passages instead of week questions
          const existingPassage = passages.find(p => p.weekId === weekId);
          if (existingPassage) {
            // Add question to existing passage
            existingPassage.questions.push({
              question: pd.question,
              options: pd.options,
              correctAnswer: correctText,
              explanation: pd.explanation,
            });
          } else {
            // Create new passage
            passages.push({
              weekId,
              title: `Week ${weekId} Reading`,
              passage: pd.passage,
              questions: [{
                question: pd.question,
                options: pd.options,
                correctAnswer: correctText,
                explanation: pd.explanation,
              }],
            });
          }
        } else {
          // Regular quiz question
          weekQuestions.push({
            id: `q-${weekId}-${i}`,
            type: 'fillBlank',
            question: pd.question,
            options: pd.options,
            correctAnswer: correctText,
            explanation: pd.explanation,
            weekId,
          });
        }
      }
    }

    // If no predefined questions, fall back to auto-generation
    if (weekQuestions.length === 0) {
      weekQuestions = generateQuestions(keywords, weekId, subject);
    }

    weeks.push({
      id: weekId,
      title: WEEK_NAMES[weekId] || `Week ${weekId}`,
      color: config.color,
      emoji: config.emoji,
      keywords,
      questions: weekQuestions,
    });
  }

  return { weeks: weeks.sort((a, b) => a.id - b.id), passages };
}

export function getSubjectData(grade: string, subject: string): SubjectData {
  const gradeData = VOCABULARY_DATA[grade];
  const subjectData = gradeData?.[subject];
  if (!subjectData) {
    return { id: subject, name: subject, emoji: '📚', color: '#666', description: '', weeks: [], passages: [] };
  }

  const config = SUBJECT_CONFIG[subject] || { name: subject, emoji: '📚', color: '#666', description: '' };

  // Use predefined questions if available for this grade and subject
  const gradePredefined = PREDEFINED_QUESTIONS[grade]?.[subject];
  if (gradePredefined && Object.keys(gradePredefined).length > 0) {
    const { weeks, passages } = buildSubjectDataFromPredefined(grade, subject, subjectData);
    return {
      id: subject,
      name: config.name,
      emoji: config.emoji,
      color: config.color,
      description: config.description,
      weeks,
      passages,
    };
  }

  // For other grades, auto-generate
  const weeks: WeekData[] = [];

  for (const [weekIdStr, keywords] of Object.entries(subjectData)) {
    const weekId = parseInt(weekIdStr);
    const questions = generateQuestions(keywords, weekId, subject);
    weeks.push({
      id: weekId,
      title: WEEK_NAMES[weekId] || `Week ${weekId}`,
      color: config.color,
      emoji: config.emoji,
      keywords,
      questions,
    });
  }

  // No reading comprehension passages for any grade
  return {
    id: subject,
    name: config.name,
    emoji: config.emoji,
    color: config.color,
    description: config.description,
    weeks: weeks.sort((a, b) => a.id - b.id),
    passages: [],
  };
}

export function getAllSubjectsForGrade(grade: string): string[] {
  const gradeData = VOCABULARY_DATA[grade];
  if (!gradeData) return [];
  return Object.keys(gradeData).sort();
}

export function getAllGrades(): string[] {
  return Object.keys(VOCABULARY_DATA).sort();
}
