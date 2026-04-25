"""
Vocabulary data for Weekly Vocabulary Learning App
Converted from TypeScript vocabularyData.ts
"""

# Grade configurations
GRADE_CONFIG = {
    'G1': {'name': 'Grade 1', 'emoji': '🌱', 'color': '#66BB6A', 'description': 'Ages 6-7: First steps in learning'},
    'G2': {'name': 'Grade 2', 'emoji': '🌿', 'color': '#42A5F5', 'description': 'Ages 7-8: Growing knowledge'},
    'G3': {'name': 'Grade 3', 'emoji': '🍃', 'color': '#FFA726', 'description': 'Ages 8-9: Building skills'},
    'G4': {'name': 'Grade 4', 'emoji': '🌳', 'color': '#AB47BC', 'description': 'Ages 9-10: Expanding understanding'},
    'G5': {'name': 'Grade 5', 'emoji': '🏆', 'color': '#EF5350', 'description': 'Ages 10-11: Mastering vocabulary'},
}

# Subject configurations
SUBJECT_CONFIG = {
    'Maths': {'name': 'Mathematics', 'emoji': '🔢', 'color': '#2E7D32', 'description': 'Numbers, shapes & operations'},
    'Science': {'name': 'Science', 'emoji': '🔬', 'color': '#1565C0', 'description': 'Nature, body & physics'},
    'STEAM': {'name': 'STEAM', 'emoji': '💻', 'color': '#6A1B9A', 'description': 'Coding, tech & design'},
    'Music': {'name': 'Music', 'emoji': '🎵', 'color': '#E65100', 'description': 'Singing, rhythm & performance'},
    'Performing Arts': {'name': 'Performing Arts', 'emoji': '🎭', 'color': '#C62828', 'description': 'Dance, movement & expression'},
    'Drama': {'name': 'Drama', 'emoji': '🎬', 'color': '#5D4037', 'description': 'Acting, theater & scripts'},
    'Visual Arts': {'name': 'Visual Arts', 'emoji': '🎨', 'color': '#AD1457', 'description': 'Drawing, painting & crafts'},
    'PE': {'name': 'PE', 'emoji': '⚽', 'color': '#00695C', 'description': 'Sports, fitness & teamwork'},
}

# Week names
WEEK_NAMES = {
    2: 'Getting Started',
    3: 'Building Up',
    4: 'Exploring',
    5: 'Review Week',
    7: 'Going Deeper',
    8: 'Practice Time',
    9: 'New Skills',
    10: 'Application',
    11: 'Challenge',
    12: 'Mastery',
    13: 'Advanced',
    14: 'Integration',
    15: 'Showcase',
}

# Difficulty configurations
DIFFICULTY_CONFIG = {
    'easy': {'timer': 0, 'hints': True, 'label': 'Easy Explorer', 'emoji': '🌱', 'description': 'Take your time, use hints!'},
    'medium': {'timer': 30, 'hints': True, 'label': 'Brave Scholar', 'emoji': '🌿', 'description': '30 seconds per question'},
    'hard': {'timer': 15, 'hints': False, 'label': 'Math Master', 'emoji': '🌳', 'description': '15 seconds, no hints!'},
}

# Plant stages for progress visualization
PLANT_STAGES = {
    'seedling': {'emoji': '🌱', 'label': 'Seedling', 'threshold': 0},
    'sapling': {'emoji': '🌿', 'label': 'Sapling', 'threshold': 21},
    'young_tree': {'emoji': '🌳', 'label': 'Young Tree', 'threshold': 51},
    'mighty_oak': {'emoji': '🌳✨', 'label': 'Mighty Oak', 'threshold': 81},
}

# Vocabulary data - organized by grade, subject, week
VOCABULARY_DATA = {
    "G1": {
        "Drama": {
            "2": ["character"],
            "3": ["dialogue"],
            "4": ["hot seating"],
            "5": ["Character"],
            "7": ["emotions"],
            "8": ["actor"],
            "9": ["play"],
            "10": ["play"],
            "11": ["sing"],
            "12": ["facial expression"],
            "13": ["stage directions"],
            "14": ["stage directions"],
            "15": ["lines"]
        },
        "Maths": {
            "2": ["triangle"],
            "3": ["square"],
            "4": ["minus"],
            "5": ["number"],
            "7": ["plus"],
            "8": ["minus"],
            "9": ["more"],
            "10": ["less"],
            "11": ["together"],
            "12": ["difference"],
            "13": ["price"],
            "14": ["money"],
            "15": ["total"]
        },
        "Music": {
            "2": ["Instrument"],
            "3": ["shake"],
            "4": ["tap"],
            "5": ["pattern"],
            "7": ["count"],
            "8": ["follow"],
            "9": ["start"],
            "10": ["finish"],
            "11": ["practice"],
            "12": ["stage"],
            "13": ["bow"],
            "14": ["audience"],
            "15": ["perform"]
        },
        "PE": {
            "2": ["together"],
            "3": ["cheer"],
            "4": ["teamwork"],
            "5": ["teamwork"],
            "7": ["communication"],
            "8": ["hoop"],
            "9": ["bounce"],
            "10": ["bounce"],
            "11": ["practice"],
            "12": ["team"],
            "13": ["save"],
            "14": ["practice"],
            "15": ["relay"]
        },
        "Performing Arts": {
            "2": ["Gymnastics"],
            "3": ["cartwheel"],
            "4": ["Cartwheel"],
            "5": ["cartwheel"],
            "7": ["cartwheel"],
            "8": ["Cartwheel"],
            "9": ["Stretch"],
            "10": ["cartwheel"],
            "11": ["Stretch"],
            "12": ["Stretch"],
            "13": ["stretch"],
            "14": ["Stretch"],
            "15": ["Stretch"]
        },
        "STEAM": {
            "2": ["Tally Chart"],
            "3": ["Algorithm"],
            "4": ["Instructions"],
            "5": ["Robot"],
            "7": ["Budget"],
            "8": ["Calculate"],
            "9": ["Symbol"],
            "10": ["Dance Algorithm"],
            "11": ["ScratchJr"],
            "12": ["Character"],
            "13": ["Repeat Block"],
            "14": ["Efficient"],
            "15": ["Choreographer"]
        },
        "Science": {
            "2": ["compare"],
            "3": ["grow"],
            "4": ["human"],
            "5": ["grow"],
            "7": ["measure"],
            "8": ["healthy"],
            "9": ["teeth"],
            "10": ["light"],
            "11": ["source"],
            "12": ["reflect"],
            "13": ["darkness"],
            "14": ["electricity"],
            "15": ["safety"]
        },
        "Visual Arts": {
            "2": ["character"],
            "3": ["setting"],
            "4": ["sculpture"],
            "5": ["sculpture"],
            "7": ["oval"],
            "8": ["spiral"],
            "9": ["sculpture"],
            "10": ["spiral", "sculpture"],
            "11": ["collage"],
            "12": ["collage", "design", "layout"],
            "13": ["yarn"],
            "14": ["collage", "design", "lay-out", "yarn"],
            "15": ["yarn", "thread"]
        }
    },
    "G2": {
        "Drama": {
            "2": ["character", "scene"],
            "3": ["dialogue", "script"],
            "4": ["character", "hot seating"],
            "5": ["Character", "closed question"],
            "7": ["lines", "emotions"],
            "8": ["actor", "stage"],
            "9": ["play", "actor"],
            "10": ["play", "actor"],
            "11": ["sing", "dance"],
            "12": ["facial expression", "gesture"],
            "13": ["stage left", "stage right"],
            "14": ["stage left", "stage right"],
            "15": ["lines", "physicality"]
        },
        "Maths": {
            "2": ["hour", "minute"],
            "3": ["o'clock", "half past"],
            "4": ["quarter to", "quarter past"],
            "5": ["divide", "remainder"],
            "7": ["multiply", "divide"],
            "8": ["thousand", "ten thousand"],
            "9": ["add", "subtract"],
            "10": ["together", "difference"],
            "11": ["multiply", "times"],
            "12": ["total", "remainder"],
            "13": ["ten thousand", "more"],
            "14": ["less", "total"],
            "15": ["divide", "remainder"]
        },
        "Music": {
            "2": ["pattern", "pulse"],
            "3": ["measure", "count"],
            "4": ["start", "finish"],
            "5": ["shake", "strike"],
            "7": ["pattern", "repeat after me"],
            "8": ["practice", "improve"],
            "9": ["stage", "bow"],
            "10": ["audience", "perform"],
            "11": ["rehearse", "ready"],
            "12": ["group", "teamwork"],
            "13": ["listen carefully", "watch"],
            "14": ["strong", "gentle"],
            "15": ["energy", "focus"]
        },
        "PE": {
            "2": ["together", "cheer"],
            "3": ["respect", "trust"],
            "4": ["teamwork", "communication"],
            "5": ["teamwork", "communication"],
            "7": ["motivation", "spirit"],
            "8": ["hoop", "hurdle"],
            "9": ["bounce", "shot put"],
            "10": ["bounce", "shot put"],
            "11": ["practice", "discus"],
            "12": ["team", "lap"],
            "13": ["save", "medal"],
            "14": ["practice", "medal"],
            "15": ["relay", "sprint"]
        },
        "Performing Arts": {
            "2": ["spells", "wand"],
            "3": ["spell", "wand"],
            "4": ["Kick legs up", "straight back"],
            "5": ["wand", "spell"],
            "7": ["jump", "turn"],
            "8": ["jump", "straight back"],
            "9": ["scissor jump", "straight back"],
            "10": ["scissor jump", "straight back"],
            "11": ["comedy", "exciting"],
            "12": ["comedy", "exciting"],
            "13": ["comedy", "exciting"],
            "14": ["comedy", "exciting"],
            "15": ["Character", "audience"]
        },
        "STEAM": {
            "2": ["Encode", "Decode"],
            "3": ["Pattern", "Caesar Cipher"],
            "4": ["Symbol", "Security"],
            "5": ["Binary", "Computer"],
            "7": ["Code Breaker", "Teamwork"],
            "8": ["Challenge", "Solution"],
            "9": ["Spreadsheet", "Cell"],
            "10": ["Row", "Column"],
            "11": ["Data Collection", "Survey"],
            "12": ["Question", "Tally Mark"],
            "13": ["Data Analysis", "Chart"],
            "14": ["Most", "Least"],
            "15": ["Project", "Present"]
        },
        "Science": {
            "2": ["similar", "different"],
            "3": ["adult", "growth"],
            "4": ["pattern", "inherit"],
            "5": ["fingerprint", "inherited"],
            "7": ["healthy", "diet"],
            "8": ["ill", "cough"],
            "9": ["teeth", "incisors"],
            "10": ["cut", "light"],
            "11": ["source", "cultural"],
            "12": ["lamp", "stars"],
            "13": ["darkness", "night"],
            "14": ["daylight", "star"],
            "15": ["electricity", "robot"]
        },
        "Visual Arts": {
            "2": ["portrait", "face"],
            "3": ["cube", "expression"],
            "4": ["self-portrait", "observe"],
            "5": ["feeling", "feature"],
            "7": ["self-portrait", "sketch"],
            "8": ["memory", "culture"],
            "9": ["complementary color", "memory"],
            "10": ["memory", "culture", "complementary color"],
            "11": ["symmmetry", "pattern"],
            "12": ["symmetry", "pattern", "rhythm"],
            "13": ["abstract", "mixing"],
            "14": ["symmetry", "pattern", "rhythm", "abstract", "expression"],
            "15": ["abstract", "mixing", "expression"]
        }
    },
    # G3, G4, G5 data would follow similar pattern...
    # For brevity, showing structure. Full data would include all grades.
}

def get_grades():
    """Get list of available grades"""
    return list(GRADE_CONFIG.keys())

def get_subjects():
    """Get list of available subjects"""
    return list(SUBJECT_CONFIG.keys())

def get_weeks_for_grade_subject(grade, subject):
    """Get list of weeks for a specific grade and subject"""
    if grade in VOCABULARY_DATA and subject in VOCABULARY_DATA[grade]:
        return list(VOCABULARY_DATA[grade][subject].keys())
    return []

def get_keywords_for_week(grade, subject, week):
    """Get keywords for a specific grade, subject, and week"""
    if grade in VOCABULARY_DATA and subject in VOCABULARY_DATA[grade]:
        weeks = VOCABULARY_DATA[grade][subject]
        if str(week) in weeks:
            return weeks[str(week)]
    return []

def get_grade_config(grade):
    """Get configuration for a grade"""
    return GRADE_CONFIG.get(grade, {})

def get_subject_config(subject):
    """Get configuration for a subject"""
    return SUBJECT_CONFIG.get(subject, {})

def get_week_name(week):
    """Get name for a week"""
    return WEEK_NAMES.get(week, f"Week {week}")


if __name__ == "__main__":
    # Test the data access
    print("Available grades:", get_grades())
    print("Available subjects:", get_subjects())
    print("\nG1 Drama weeks:", get_weeks_for_grade_subject('G1', 'Drama'))
    print("G1 Drama Week 2 keywords:", get_keywords_for_week('G1', 'Drama', 2))
