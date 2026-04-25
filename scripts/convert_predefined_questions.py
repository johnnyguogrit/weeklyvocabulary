#!/usr/bin/env python3
"""
Convert predefinedQuestions.ts to predefined_questions.py

Usage:
    python scripts/convert_predefined_questions.py
"""

import re
from pathlib import Path

# Paths
TS_FILE = Path(__file__).parent.parent / "app" / "src" / "data" / "predefinedQuestions.ts"
PY_FILE = Path(__file__).parent.parent / "data" / "predefined_questions.py"


def convert_ts_to_py():
    """Convert TypeScript file to Python format"""
    print(f"Reading: {TS_FILE}")
    with open(TS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Find the PREDEFINED_QUESTIONS object
    start_match = re.search(r'export const PREDEFINED_QUESTIONS.*?=\s*\{', content)
    if not start_match:
        print("Error: Could not find PREDEFINED_QUESTIONS object")
        return {}

    start_pos = start_match.end() - 1
    brace_count = 1
    pos = start_pos + 1
    while pos < len(content) and brace_count > 0:
        if content[pos] == '{':
            brace_count += 1
        elif content[pos] == '}':
            brace_count -= 1
        pos += 1

    obj_content = content[start_pos:pos]
    result = {}

    # Parse grades
    grade_pattern = r'"(G[1-5])"\s*:\s*\{'
    current_pos = 0
    while current_pos < len(obj_content):
        grade_match = re.search(grade_pattern, obj_content[current_pos:])
        if not grade_match:
            break
        grade = grade_match.group(1)
        grade_start = current_pos + grade_match.end() - 1
        brace_count = 1
        grade_end = grade_start + 1
        while grade_end < len(obj_content) and brace_count > 0:
            if obj_content[grade_end] == '{':
                brace_count += 1
            elif obj_content[grade_end] == '}':
                brace_count -= 1
            grade_end += 1
        grade_content = obj_content[grade_start:grade_end]
        result[grade] = parse_subjects(grade_content)
        current_pos = grade_end

    return result


def parse_subjects(content: str) -> dict:
    """Parse subjects from grade content"""
    result = {}
    # Match subjects: "Maths": {, "Code, Program, Pseudocode": {, etc.
    subject_pattern = r'"([^"]+)"\s*:\s*\{'
    current_pos = 0
    while current_pos < len(content):
        subject_match = re.search(subject_pattern, content[current_pos:])
        if not subject_match:
            break
        subject = subject_match.group(1)
        # Skip grades (G1, G2, etc.) and non-standard entries
        if subject in ['G1', 'G2', 'G3', 'G4', 'G5'] or any(char in subject for char in ['：', '释', '意']):
            current_pos += subject_match.end()
            continue
        subject_start = current_pos + subject_match.end() - 1
        brace_count = 1
        subject_end = subject_start + 1
        while subject_end < len(content) and brace_count > 0:
            if content[subject_end] == '{':
                brace_count += 1
            elif content[subject_end] == '}':
                brace_count -= 1
            subject_end += 1
        subject_content = content[subject_start:subject_end]
        result[subject] = parse_weeks(subject_content)
        current_pos = subject_end
    return result


def parse_weeks(content: str) -> dict:
    """Parse weeks from subject content"""
    result = {}
    week_pattern = r'(\d+)\s*:\s*\['
    current_pos = 0
    while current_pos < len(content):
        week_match = re.search(week_pattern, content[current_pos:])
        if not week_match:
            break
        week_num = int(week_match.group(1))
        week_start = current_pos + week_match.end() - 1
        bracket_count = 1
        week_end = week_start + 1
        while week_end < len(content) and bracket_count > 0:
            if content[week_end] == '[':
                bracket_count += 1
            elif content[week_end] == ']':
                bracket_count -= 1
            week_end += 1
        week_content = content[week_start:week_end]
        questions = parse_questions_array(week_content)
        if questions:
            result[week_num] = questions
        current_pos = week_end
    return result


def parse_questions_array(content: str) -> list:
    """Parse questions array"""
    result = []
    current_pos = 0
    while current_pos < len(content):
        brace_start = content.find('{', current_pos)
        if brace_start == -1:
            break
        brace_count = 1
        brace_end = brace_start + 1
        while brace_end < len(content) and brace_count > 0:
            if content[brace_end] == '{':
                brace_count += 1
            elif content[brace_end] == '}':
                brace_count -= 1
            brace_end += 1
        obj_content = content[brace_start:brace_end]
        question = parse_question_object(obj_content)
        if question:
            result.append(question)
        current_pos = brace_end
    return result


def parse_question_object(content: str) -> dict:
    """Parse a single question object"""
    result = {}
    week_match = re.search(r'week\s*:\s*(\d+)', content)
    if week_match:
        result['week'] = int(week_match.group(1))
    keyword_match = re.search(r'keyword\s*:\s*"((?:[^"\\]|\\.)*)"', content)
    if keyword_match:
        result['keyword'] = keyword_match.group(1).replace('\\"', '"')
    question_match = re.search(r'question\s*:\s*"((?:[^"\\]|\\.)*)"', content)
    if question_match:
        result['question'] = question_match.group(1).replace('\\"', '"')
    options_match = re.search(r'options\s*:\s*\[([^\]]+)\]', content, re.DOTALL)
    if options_match:
        options_str = options_match.group(1)
        options = []
        for opt_match in re.finditer(r'"((?:[^"\\]|\\.)*)"', options_str):
            options.append(opt_match.group(1).replace('\\"', '"'))
        result['options'] = options
    answer_match = re.search(r'answer\s*:\s*"([A-D])"', content)
    if answer_match:
        result['answer'] = answer_match.group(1)
    expl_match = re.search(r'explanation\s*:\s*"((?:[^"\\]|\\.)*)"', content, re.DOTALL)
    if expl_match:
        result['explanation'] = expl_match.group(1).replace('\\"', '"')
    passage_match = re.search(r'passage\s*:\s*"((?:[^"\\]|\\.)*)"', content, re.DOTALL)
    if passage_match:
        result['passage'] = passage_match.group(1).replace('\\"', '"')
    return result if len(result) >= 6 else None


def escape_string(s: str) -> str:
    """Escape strings for Python"""
    if not s:
        return '""'
    s = s.replace('\\', '\\\\').replace('"', '\\"')
    s = s.replace('​', '').replace('‌', '').replace('‍', '')
    return f'"{s}"'


def format_question(q: dict) -> str:
    """Format a single question"""
    lines = ['            {']
    if 'week' in q:
        lines.append(f'                "week": {q["week"]},')
    if 'keyword' in q:
        lines.append(f'                "keyword": {escape_string(q["keyword"])},')
    if 'question' in q:
        lines.append(f'                "question": {escape_string(q["question"])},')
    if 'options' in q:
        opts = ', '.join(escape_string(opt) for opt in q["options"])
        lines.append(f'                "options": [{opts}],')
    if 'answer' in q:
        lines.append(f'                "answer": {escape_string(q["answer"])},')
    if 'explanation' in q:
        lines.append(f'                "explanation": {escape_string(q["explanation"])},')
    if 'passage' in q:
        lines.append(f'                "passage": {escape_string(q["passage"])},')
    lines.append('            }')
    return '\n'.join(lines)


def generate_python_output(data: dict) -> str:
    """Generate Python file content"""
    lines = [
        '"""',
        'Predefined questions for Weekly Vocabulary Learning App',
        'Converted from predefinedQuestions.ts',
        '',
        'This file contains predefined questions parsed from markdown files.',
        'For grades with predefined questions, they are used instead of auto-generation.',
        '"""',
        '',
        'from typing import Dict, List, Any',
        '',
        '# Predefined questions structure: {grade: {subject: {week: [questions]}}}',
        '# Each question has: week, keyword, question, options[], answer, explanation, passage?',
        '',
        'PREDEFINED_QUESTIONS: Dict[str, Dict[str, Dict[int, List[Dict[str, Any]]]]] = {'
    ]

    for grade in sorted(data.keys()):
        subjects = data[grade]
        lines.append(f'    "{grade}": {{')
        for subject in sorted(subjects.keys()):
            weeks = subjects[subject]
            lines.append(f'        {escape_string(subject)}: {{')
            for week_num in sorted(weeks.keys()):
                questions = weeks[week_num]
                lines.append(f'                {week_num}: [')
                for q in questions:
                    lines.append(format_question(q) + ',')
                lines.append('                ],')
            lines.append('        },')
        lines.append('    },')
    lines.append('}')

    lines.extend([
        '',
        '',
        'def get_predefined_questions(grade: str, subject: str, week: int) -> List[Dict[str, Any]]:',
        '    """Get predefined questions for a specific grade, subject, and week."""',
        '    return PREDEFINED_QUESTIONS.get(grade, {}).get(subject, {}).get(week, [])',
        '',
        '',
        'def has_predefined_questions(grade: str, subject: str) -> bool:',
        '    """Check if there are predefined questions for a grade and subject."""',
        '    return grade in PREDEFINED_QUESTIONS and subject in PREDEFINED_QUESTIONS[grade]',
        '',
        '',
        'def get_all_grades() -> List[str]:',
        '    """Get list of grades with predefined questions."""',
        '    return list(PREDEFINED_QUESTIONS.keys())',
        '',
        '',
        'def get_subjects_for_grade(grade: str) -> List[str]:',
        '    """Get list of subjects with predefined questions for a grade."""',
        '    if grade not in PREDEFINED_QUESTIONS:',
        '        return []',
        '    return list(PREDEFINED_QUESTIONS[grade].keys())',
    ])

    return '\n'.join(lines) + '\n'


def main():
    """Main function"""
    print("Converting predefinedQuestions.ts to predefined_questions.py...")
    data = convert_ts_to_py()

    total_questions = 0
    for grade, subjects in data.items():
        for subject, weeks in subjects.items():
            for week, questions in weeks.items():
                total_questions += len(questions)

    print(f"Extracted {total_questions} questions")

    output = generate_python_output(data)

    PY_FILE.parent.mkdir(parents=True, exist_ok=True)
    with open(PY_FILE, 'w', encoding='utf-8') as f:
        f.write(output)

    print(f"Successfully wrote: {PY_FILE}")

    print("\nSummary:")
    for grade in sorted(data.keys()):
        subjects = data[grade]
        print(f"  {grade}:")
        for subject in sorted(subjects.keys()):
            weeks = subjects[subject]
            count = sum(len(q) for q in weeks.values())
            print(f"    {subject}: {count} questions in {len(weeks)} week(s)")


if __name__ == "__main__":
    main()
