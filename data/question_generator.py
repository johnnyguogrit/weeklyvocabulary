"""
Question Generator for Weekly Vocabulary Learning App
Converted from TypeScript questionGenerator.ts

Generates questions dynamically based on keywords, subject, and templates.
"""

import random
from typing import List, Dict, Any
from .vocabulary_data import VOCABULARY_DATA, SUBJECT_CONFIG, WEEK_NAMES

# ─── Question Templates ─────────────────────────────────────
QUESTION_TEMPLATES = {
    "Maths": [
        'In Maths class, "{kw}" helps us {action}. What does it mean?',
        'When solving problems, "{kw}" means {explanation}. Can you tell what it is?',
        'Your Maths teacher says: "Remember, {kw} is when you {action}." What is {kw}?',
        'In a Maths quiz, the question asks about "{kw}". What does this word mean?',
        '"{kw}" is a Maths word for {explanation}. What is the Chinese for {kw}?',
        'Tom is doing his Maths homework. He needs to use "{kw}" to {action}. What does {kw} mean?'
    ],
    "Science": [
        'In Science lab, we learn that "{kw}" is {explanation}. What does {kw} mean?',
        '"{kw}" is an important Science word. It means {explanation}. Do you know it?',
        'During the Science experiment, the teacher mentions "{kw}". What does this word mean?',
        'In your Science textbook, "{kw}" is described as {explanation}. What is {kw}?',
        '"{kw}" helps us understand how nature works. What does {kw} mean?'
    ],
    "STEAM": [
        'When using computers, "{kw}" means {explanation}. What does {kw} mean?',
        'In STEAM class, your teacher says: "{kw} is important for coding." What does {kw} mean?',
        '"{kw}" is a technology word that means {explanation}. Can you tell what it is?',
        'On the computer screen, you see the word "{kw}". What does this word mean?'
    ],
    "Music": [
        'In Music class, "{kw}" means {explanation}. What does {kw} mean?',
        'Your music teacher says: "Use {kw} when you sing." What does {kw} mean?',
        '"{kw}" is a music word for {explanation}. Do you know it?',
        'When practising the song, remember "{kw}" means {explanation}. What is {kw}?'
    ],
    "Performing Arts": [
        'On stage, "{kw}" means {explanation}. What does {kw} mean?',
        'The director says: "Use {kw} in your performance." What does {kw} mean?',
        'In Performing Arts, "{kw}" is about {explanation}. Can you tell what it is?'
    ],
    "Drama": [
        'In Drama class, "{kw}" means {explanation}. What does {kw} mean?',
        'The Drama teacher asks: "Who knows what {kw} means?" What is the answer?',
        'On stage, actors use "{kw}" to {action}. What does {kw} mean?'
    ],
    "Visual Arts": [
        'In Art class, "{kw}" means {explanation}. What does {kw} mean?',
        'When drawing, artists use "{kw}" to {action}. What does {kw} mean?',
        '"{kw}" is an important art word for {explanation}. Do you know it?'
    ],
    "PE": [
        'In PE class, "{kw}" means {explanation}. What does {kw} mean?',
        'Your PE teacher shouts: "Use {kw}!" What does {kw} mean?',
        'When playing sports, "{kw}" helps you {action}. What does {kw} mean?',
        '"{kw}" is a sports word for {explanation}. Can you tell what it is?'
    ],
}

# ─── Reading Passage Templates ─────────────────────────────────
PASSAGE_TEMPLATES = {
    "Maths": [
        'In maths class this week, the students learned about {kw1}, {kw2}, and {kw3}. Sarah practiced using {kw4} and {kw5} to solve problems. Her teacher explained that {kw1} is very important to understand. Tom drew diagrams showing {kw2} and {kw3}. Everyone worked hard to master these new concepts!',
        'Today we explored {kw1}, {kw2}, and {kw3}. These ideas help us understand numbers better. When we use {kw4}, we can solve harder problems. The class also practiced {kw5} with partners. Math is full of interesting patterns!',
    ],
    "Science": [
        'In science lab, the students studied {kw1} and {kw2}. They observed how {kw3} works in nature. The teacher showed a diagram of {kw4}. Everyone was fascinated by {kw5} and wanted to learn more about how things work in our world.',
        'This week we learned about {kw1}. Scientists use {kw2} to understand the world. We did an experiment about {kw3}. Our results showed that {kw4} is true. We also discussed how {kw5} affects our daily lives.',
    ],
    "STEAM": [
        'In STEAM class, we explored {kw1} and {kw2}. The students used computers to practice {kw3}. They designed projects using {kw4} and {kw5}. Everyone enjoyed learning about technology and how things work behind the screen.',
        'This week in coding class, we learned about {kw1}. The teacher explained that {kw2} is essential for good programs. Students practiced {kw3} on their tablets. We also discussed {kw4} and {kw5} as important concepts in technology.',
    ],
    "Music": [
        'In music class, the students practiced {kw1} and {kw2}. Their teacher showed them how to use {kw3} correctly. Everyone sang with beautiful {kw4}. They also worked on {kw5} to improve their performance. The rehearsal was wonderful!',
        'Today the choir worked on {kw1} and {kw2}. The conductor reminded everyone about {kw3}. Students focused on their {kw4} and {kw5}. By the end of class, the music sounded much more polished and expressive.',
    ],
    "Performing Arts": [
        'In performing arts, the students practiced {kw1} and {kw2}. They moved across the stage using {kw3}. The director reminded them about {kw4}. Everyone showed great {kw5} during the rehearsal.',
        'The performers worked hard on {kw1} and {kw2}. They learned that {kw3} is key to a good show. The choreographer taught them {kw4}. By the end, their {kw5} had improved so much!',
    ],
    "Drama": [
        'In drama class, the students explored {kw1} and {kw2}. They practiced using {kw3} on stage. The teacher explained that good actors need {kw4}. Everyone rehearsed their {kw5} with great enthusiasm.',
        'The actors worked on {kw1} and {kw2}. Their director taught them about {kw3}. They used {kw4} to make their scenes more believable. The class ended with everyone practicing {kw5}.',
    ],
    "Visual Arts": [
        'In art class, the students created works using {kw1} and {kw2}. They learned about {kw3} from different cultures. The teacher demonstrated {kw4}. Everyone enjoyed exploring {kw5} in their own artwork.',
        'This week we studied {kw1} and {kw2}. The artist showed us how to use {kw3}. Students practiced {kw4} with colorful materials. Their final pieces showed beautiful {kw5}.',
    ],
    "PE": [
        'In PE class, the students practiced {kw1} and {kw2}. They worked on {kw3} in teams. The coach reminded everyone about {kw4}. By the end, everyone showed better {kw5}.',
        'The athletes trained hard on {kw1} and {kw2}. They learned that {kw3} helps them improve. The team worked on {kw4} together. Everyone was proud of their {kw5}.',
    ],
}

# ─── Subject-Specific Fallback Patterns ───────────────────────
FALLBACK_PATTERNS = {
    'maths': [
        'a mathematical term used in calculations',
        'a concept about numbers and operations',
        'an important word in mathematics'
    ],
    'science': [
        'a scientific term about the natural world',
        'a word used in studying how things work',
        'an important science vocabulary word'
    ],
    'steam': [
        'a technology and computing term',
        'a concept in digital literacy and coding',
        'an important word in technology'
    ],
    'music': [
        'a musical term for performers',
        'a word used when making music',
        'an important music vocabulary word'
    ],
    'performing arts': [
        'a performing arts term',
        'a word used in dance and movement',
        'an important performance word'
    ],
    'drama': [
        'a theatrical term for actors',
        'a word used in plays and acting',
        'an important drama vocabulary word'
    ],
    'visual arts': [
        'an art term for creative work',
        'a word used in making art',
        'an important art vocabulary word'
    ],
    'pe': [
        'a sports and fitness term',
        'a word used in physical activities',
        'an important PE vocabulary word'
    ],
}

# Pattern-based explanations for common keyword patterns
PATTERN_EXPLANATIONS = [
    ('view', 'a way of looking at something from a particular direction'),
    ('century|millennium|hour|minute|second', 'a unit or measurement of time'),
    ('angle|line|shape|side|corner|edge|vertex', 'a geometric property or feature of shapes'),
    ('fraction|decimal|percent|percentage', 'a way to represent parts of a whole number'),
    ('add|plus|sum|total|together|combine', 'to combine numbers to get a larger amount'),
    ('subtract|minus|difference|less|take away', 'to find the difference between numbers'),
    ('multiply|times|product|multiple', 'to add a number to itself multiple times'),
    ('divide|quotient|share|remainder|split', 'to split a number into equal parts'),
    ('force|gravity|friction|drag|thrust|push|pull', 'a type of force or push/pull in physics'),
    ('magnet|attract|repel|magnetic|pole', 'a property related to magnetic forces'),
    ('digest|stomach|intestine|organ|digestive', 'a part of the body or its functions'),
    ('diet|vitamin|fat|carb|protein|mineral|nutrition|healthy', 'a concept related to nutrition and healthy eating'),
    ('heart|brain|lung|kidney|blood|organ', 'an important organ in the human body'),
    ('earth|moon|sun|planet|orbit|solar|space', 'a concept about space and celestial bodies'),
    ('volcano|earthquake|lava|crust|mantle|erupt', "a concept about the Earth's structure or geology"),
    ('light|dark|reflect|shadow|source|optical', 'a concept about light and how we see'),
    ('animal|plant|habitat|life cycle|reptile|mammal|insect', 'a concept about living things and biology'),
    ('fossil|material|metal|iron|steel|gold|silver|copper|alloy', 'a concept about materials and natural resources'),
    ('code|program|algorithm|script|block|loop|variable', 'a concept in computer programming and coding'),
    ('input|output|interface|screen|keyboard|mouse|hardware', 'a concept about computer hardware and interaction'),
    ('data|spreadsheet|chart|graph|analysis|database', 'a concept about data and information processing'),
    ('network|router|server|ip|wifi|internet|lan|wan|protocol', 'a concept about computer networks and connectivity'),
    ('project|requirement|template|structure|design', 'a concept in project planning and design'),
    ('sing|song|melody|rhythm|note|tune|tempo|beat', 'a concept in music and singing'),
    ('recorder|instrument|finger|breath|tongue|mouthpiece', 'a concept about playing musical instruments'),
    ('stage|performance|audience|rehearse|conductor|director', 'a concept about performing in front of others'),
    ('expression|emotion|feeling|mood|intention|character', 'a concept about expressing feelings through art'),
    ('voice|vocal|projection|diaphragm|enunciation|clarity', 'a concept about using the voice in singing'),
    ('character|scene|dialogue|actor|script|prop|play', 'a concept in drama and theater performance'),
    ('direction|blocking|movement|formation|transition|position', 'a concept about movement and positioning on stage'),
    ('gymnastics|jump|stretch|cartwheel|balance|roll', 'a concept in gymnastics and physical movement'),
    ('dance|choreography|routine|movement|performance', 'a concept in dance and physical expression'),
    ('paint|draw|sketch|color|palette|brush|canvas', 'a concept in visual art and drawing'),
    ('sculpture|clay|carve|model|three-dimensional|3d', 'a concept in 3D art and sculpture'),
    ('motif|design|texture|symmetry|pattern|layout', 'a concept in art design and decoration'),
    ('collage|mosaic|weaving|paper|fabric|textile', 'a concept in mixed media and textile art'),
    ('exhibition|gallery|display|curate|showcase', 'a concept about showing art to the public'),
    ('sport|game|race|competition|tournament|match', 'a concept in sports and team activities'),
    ('bounce|throw|catch|kick|run|jump|hit|strike', 'a physical action in sports and games'),
    ('practice|train|exercise|workout|drill', 'the act of repeating to improve skill'),
    ('spirit|motivation|confidence|sportsmanship|respect|teamwork', 'a concept about attitude and behavior in sports'),
    ('strategy|tactic|plan|skill|technique|method', 'a concept about planning and methods in sports'),
    ('stamina|endurance|strength|speed|agility|fitness', 'a physical ability in sports and fitness'),
]


# ─── Helper Functions ────────────────────────────────────────

def shuffle_list(items: List[Any]) -> List[Any]:
    """Shuffle a list randomly."""
    result = items.copy()
    random.shuffle(result)
    return result


def smart_explanation(keyword: str, subject: str, translations: Dict = None) -> str:
    """
    Generate a smart explanation for a keyword.
    First checks translations, then pattern matching, then subject-specific fallbacks.
    """
    kw = keyword.lower().strip()

    # Check translations if provided
    if translations:
        for key, value in translations.items():
            if key.lower() == kw or kw in key.lower() or key.lower() in kw:
                cn = value.get('cn', '')
                read = value.get('read', '')
                if cn:
                    return f"{cn}; {read}"

    # Pattern-based fallbacks
    for pattern, explanation in PATTERN_EXPLANATIONS:
        if eval(f"'{pattern}' in kw"):
            return explanation

    # Subject-specific fallbacks
    theme = (SUBJECT_CONFIG.get(subject, {}) or {}).get('name', subject).lower()
    for key, patterns in FALLBACK_PATTERNS.items():
        if key in theme:
            return random.choice(patterns)

    return 'an important vocabulary word'


def generate_distractors(keyword: str, all_keywords: List[str], count: int = 3) -> List[str]:
    """Generate distractor options for a multiple choice question."""
    kw_lower = keyword.lower()
    candidates = [k for k in all_keywords if k.lower() != kw_lower and len(k) > 2]

    if len(candidates) >= count:
        return shuffle_list(candidates)[:count]

    # Add fillers if not enough candidates
    fillers = ['understanding', 'knowledge', 'learning', 'practice', 'skill', 'method', 'process']
    result = candidates.copy()
    while len(result) < count:
        filler = random.choice(fillers)
        if filler not in result:
            result.append(filler)

    return shuffle_list(result)[:count]


def generate_question(keyword: str, week_id: int, subject: str, all_keywords: List[str], translations: Dict = None) -> Dict:
    """Generate a single question for a keyword."""
    explanation = smart_explanation(keyword, subject, translations)
    distractors = generate_distractors(keyword, all_keywords)
    options = shuffle_list([keyword] + distractors)

    # Get subject templates
    subject_templates = QUESTION_TEMPLATES.get(subject, QUESTION_TEMPLATES['Maths'])
    template = random.choice(subject_templates)

    # Build question text
    action_words = explanation.split()[:3] if explanation else ['do something']
    question_text = template.replace('{kw}', keyword).replace('{explanation}', explanation).replace('{action}', ' '.join(action_words))

    return {
        'id': f'q-{week_id}-{keyword.lower().replace(" ", "-")}',
        'type': 'multipleChoice',
        'question': question_text,
        'options': options,
        'correctAnswer': keyword,
        'explanation': f'"{keyword}" means {explanation}.',
        'weekId': week_id,
    }


def generate_questions(keywords: List[str], week_id: int, subject: str, translations: Dict = None) -> List[Dict]:
    """Generate questions for a list of keywords."""
    if not keywords:
        return []

    # Limit to 5 questions per week
    used_keywords = shuffle_list(keywords)[:min(5, len(keywords))]
    questions = []

    for keyword in used_keywords:
        question = generate_question(keyword, week_id, subject, keywords, translations)
        questions.append(question)

    return questions


def generate_passage(keywords: List[str], subject: str, week_id: int, translations: Dict = None) -> Dict:
    """Generate a reading comprehension passage with questions."""
    templates = PASSAGE_TEMPLATES.get(subject, PASSAGE_TEMPLATES['Maths'])
    template = random.choice(templates)

    # Get featured keywords (up to 5)
    featured = keywords[:5] if len(keywords) >= 5 else keywords + [keywords[0]] * (5 - len(keywords))

    # Build passage
    passage = template
    for i, kw in enumerate(featured[:5], 1):
        passage = passage.replace(f'{{kw{i}}}', f'**{kw}**')

    # Bold all keywords in passage
    for kw in keywords:
        if f'**{kw}**' not in passage:
            import re
            passage = re.sub(rf'\b{re.escape(kw)}\b', f'**{kw}**', passage, flags=re.IGNORECASE)

    # Generate reading comprehension questions
    rc_questions = []
    used_indices = shuffle_list(list(range(min(5, len(featured)))))[:3]

    for idx in used_indices:
        kw = featured[idx]
        explanation = smart_explanation(kw, subject, translations)
        distractors = generate_distractors(kw, keywords)
        options = shuffle_list([kw] + distractors)

        question_templates = [
            f'What does "{kw}" mean in the passage?',
            f'In the passage, what is "{kw}"?',
            f'According to the passage, "{kw}" refers to what?',
        ]

        rc_questions.append({
            'question': random.choice(question_templates),
            'options': options,
            'correctAnswer': kw,
            'explanation': f'"{kw}" means {explanation}.',
        })

    return {
        'weekId': week_id,
        'title': f"{WEEK_NAMES.get(week_id, f'Week {week_id}')}",
        'passage': passage,
        'questions': rc_questions,
    }


def get_subject_data(grade: str, subject: str, predefined_questions: Dict = None, translations: Dict = None) -> Dict:
    """
    Get complete subject data including weeks and passages.
    Combines vocabulary data with predefined questions if available.
    """
    grade_data = VOCABULARY_DATA.get(grade, {})
    subject_data = grade_data.get(subject, {})

    if not subject_data:
        return {
            'id': subject,
            'name': SUBJECT_CONFIG.get(subject, {}).get('name', subject),
            'emoji': SUBJECT_CONFIG.get(subject, {}).get('emoji', '📚'),
            'color': SUBJECT_CONFIG.get(subject, {}).get('color', '#666'),
            'description': SUBJECT_CONFIG.get(subject, {}).get('description', ''),
            'weeks': [],
            'passages': [],
        }

    config = SUBJECT_CONFIG.get(subject, {})
    weeks = []
    passages = []

    for week_id_str, keywords in subject_data.items():
        week_id = int(week_id_str)

        # Check for predefined questions
        week_questions = []
        if predefined_questions and grade in predefined_questions and subject in predefined_questions:
            week_predefined = predefined_questions[grade][subject].get(week_id, [])
            for pq in week_predefined:
                # Convert answer letter to option text
                options = pq.get('options', [])
                answer_letter = pq.get('answer', 'A')
                answer_index = ord(answer_letter) - ord('A')
                correct_answer = options[answer_index] if 0 <= answer_index < len(options) else options[0]

                if pq.get('passage'):
                    # This is a reading comprehension question
                    existing_passage = next((p for p in passages if p['weekId'] == week_id), None)
                    if existing_passage:
                        existing_passage['questions'].append({
                            'question': pq['question'],
                            'options': options,
                            'correctAnswer': correct_answer,
                            'explanation': pq.get('explanation', ''),
                        })
                    else:
                        passages.append({
                            'weekId': week_id,
                            'title': f"Week {week_id} Reading",
                            'passage': pq['passage'],
                            'questions': [{
                                'question': pq['question'],
                                'options': options,
                                'correctAnswer': correct_answer,
                                'explanation': pq.get('explanation', ''),
                            }],
                        })
                else:
                    week_questions.append({
                        'id': f"q-{week_id}-{len(week_questions)}",
                        'type': 'multipleChoice',
                        'question': pq['question'],
                        'options': options,
                        'correctAnswer': correct_answer,
                        'explanation': pq.get('explanation', ''),
                        'weekId': week_id,
                    })

        # If no predefined questions, generate them
        if not week_questions:
            week_questions = generate_questions(keywords, week_id, subject, translations)

        weeks.append({
            'id': week_id,
            'title': WEEK_NAMES.get(week_id, f'Week {week_id}'),
            'color': config.get('color', '#666'),
            'emoji': config.get('emoji', '📚'),
            'keywords': keywords,
            'questions': week_questions,
        })

    # Sort weeks by ID
    weeks = sorted(weeks, key=lambda w: w['id'])

    return {
        'id': subject,
        'name': config.get('name', subject),
        'emoji': config.get('emoji', '📚'),
        'color': config.get('color', '#666'),
        'description': config.get('description', ''),
        'weeks': weeks,
        'passages': passages,
    }


def get_all_subjects_for_grade(grade: str) -> List[str]:
    """Get list of subjects available for a grade."""
    grade_data = VOCABULARY_DATA.get(grade, {})
    return list(grade_data.keys())


def get_all_grades() -> List[str]:
    """Get list of available grades."""
    return list(VOCABULARY_DATA.keys())


if __name__ == "__main__":
    # Test the question generator
    print("Available grades:", get_all_grades())
    print("G1 subjects:", get_all_subjects_for_grade('G1'))

    # Generate some questions
    keywords = ["triangle", "square", "minus"]
    questions = generate_questions(keywords, 2, "Maths")
    print("\nGenerated questions:")
    for q in questions:
        print(f"- {q['question']}")
        print(f"  Options: {q['options']}")
        print(f"  Correct: {q['correctAnswer']}")
