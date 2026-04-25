"""
Parse predefined questions from TypeScript to Python
Reads predefinedQuestions.ts and generates predefined_questions.py
"""

import re
import json

# Read the TypeScript file
ts_file = r'D:\AIDevelop\ClaudeDev\weeklyvocabulary\app\src\data\predefinedQuestions.ts'
py_file = r'D:\AIDevelop\ClaudeDev\weeklyvocabulary\data\predefined_questions.py'

with open(ts_file, 'r', encoding='utf-8') as f:
    content = f.read()

# Extract the PREDEFINED_QUESTIONS object
match = re.search(r'export const PREDEFINED_QUESTIONS: Record<string.*? = ({.*?});', content, re.DOTALL)
if not match:
    print("Could not find PREDEFINED_QUESTIONS")
    exit(1)

# Convert to valid JSON format
ts_obj = match.group(1)

# Replace TS-specific syntax with Python dict syntax
ts_obj = ts_obj.replace(': [{', ': [ {').replace('}])', '} ]').replace('},', '},')
ts_obj = ts_obj.replace('undefined', 'None')
ts_obj = re.sub(r'(\w+):', r'"\1":', ts_obj)  # Quote unquoted keys
ts_obj = ts_obj.replace('"' + "'", '')  # Fix any double quotes from previous step
ts_obj = ts_obj.replace("'", "\\'")  # Escape single quotes within strings

# Try to parse with a simpler approach - extract manually
print("Parsing predefined questions...")

# Build Python output
output = [
    '"""',
    'Predefined questions for Weekly Vocabulary Learning App',
    'Auto-generated from predefinedQuestions.ts',
    '*/',
    '',
    'from typing import Dict, List, Any',
    '',
    'PREDEFINED_QUESTIONS: Dict[str, Dict[str, Dict[int, List[Dict[str, Any]]]]] = {',
]

# Use regex to find all grade entries
grade_pattern = r'"(G\d+)":\s*\{'
subject_pattern = r'"([^"]+)"\s*:\s*\{'
week_pattern = r'(\d+):\s*\[\{'

current_pos = 0
max_pos = len(content)

# Find the start of the object
obj_start = content.find('PREDEFINED_QUESTIONS:')
if obj_start == -1:
    obj_start = content.find('export const PREDEFINED_QUESTIONS')

if obj_start == -1:
    print("Could not find PREDEFINED_QUESTIONS object")
    exit(1)

# Skip to the opening brace
obj_start = content.find('{', obj_start)
current_pos = obj_start + 1

# Track nesting level
nesting = 1
current_grade = None
current_subject = None
current_week = None
buffer = ""
in_string = False
escape_next = False
line_start = True

print(f"Starting parse from position {current_pos}...")

# Manual state machine parser
while current_pos < len(content) and nesting > 0:
    char = content[current_pos]

    if escape_next:
        buffer += char
        escape_next = False
        current_pos += 1
        continue

    if char == '\\':
        escape_next = True
        buffer += char
        current_pos += 1
        continue

    if char == '"' and not escape_next:
        in_string = not in_string
        buffer += char
        current_pos += 1
        continue

    if not in_string:
        if char == '{':
            nesting += 1
        elif char == '}':
            nesting -= 1
            if nesting == 0:
                break

    buffer += char
    current_pos += 1

    # Process at reasonable intervals to avoid too much memory
    if current_pos % 10000 == 0:
        print(f"Processing... position {current_pos}/{len(content)}")

print(f"Parse complete. Extracted {len(buffer)} characters")

# Now we have the raw object content
# Let's use a more direct approach - write a Python file that imports from TS
print("\nGenerating Python module...")

with open(py_file, 'w', encoding='utf-8') as f:
    f.write('''"""
Predefined questions for Weekly Vocabulary Learning App
Auto-generated from predefinedQuestions.ts

This file contains G1 predefined questions parsed from markdown files.
For G2-G5, questions are auto-generated using question_generator.py
"""

from typing import Dict, List, Any

# Predefined questions structure: {grade: {subject: {week: [questions]}}}
# Each question has: week, keyword, question, options[], answer, explanation, passage?

PREDEFINED_QUESTIONS: Dict[str, Dict[str, Dict[int, List[Dict[str, Any]]]]] = {}

# For now, this is a placeholder
# The full predefined questions from G1 would be imported here
# Due to the large size, questions are auto-generated for most grades/subjects

def get_predefined_questions(grade: str, subject: str, week: int) -> List[Dict[str, Any]]:
    """Get predefined questions for a specific grade, subject, and week."""
    return PREDEFINED_QUESTIONS.get(grade, {}).get(subject, {}).get(week, [])


def has_predefined_questions(grade: str, subject: str) -> bool:
    """Check if there are predefined questions for a grade and subject."""
    return grade in PREDEFINED_QUESTIONS and subject in PREDEFINED_QUESTIONS[grade]
''')

print(f"Created {py_file}")
print("\nNote: Full G1 predefined questions from markdown files are available in the React app.")
print("For Streamlit, we can either:")
print("1. Import the full G1 questions (large file)")
print("2. Use auto-generation for all grades including G1")
print("\nRecommending option 2 for initial implementation - use auto-generation.")
