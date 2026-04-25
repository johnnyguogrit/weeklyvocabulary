#!/usr/bin/env python3
"""
Parse vocabulary questions from PDF files directly.
Handles both G1 format (bullet points) and G2+ format (linear).
"""

import fitz  # PyMuPDF
import json
import re
import os
from pathlib import Path

# Zero-width and problematic characters to remove
CLEAN_PATTERN = re.compile(r'[​‌‍﻿ ]')

def clean_text(text):
    """Remove zero-width and other problematic characters from PDF text."""
    return CLEAN_PATTERN.sub('', text)

# Configuration
INPUT_DIR = Path(__file__).parent.parent / 'weeklytest'
OUTPUT_DIR = Path(__file__).parent.parent / 'app/src/data'
UNIFIED_OUTPUT = INPUT_DIR / 'UNIFIED_VOCABULARY.md'
TS_OUTPUT = OUTPUT_DIR / 'predefinedQuestions.ts'

# Questions per week for each grade
QUESTIONS_PER_WEEK = {
    'G1': 1,
    'G2': 2,
    'G3': 3,
    'G4': 4,
    'G5': 5
}

# Subject order for each grade (based on PDF structure)
SUBJECT_ORDER = {
    'G1': ['Maths', 'Science', 'STEAM', 'Music', 'Performing Arts', 'Drama', 'Visual Arts', 'PE'],
    'G2': ['Maths', 'Science', 'STEAM', 'Music', 'Performing Arts', 'Drama', 'Visual Arts', 'PE'],
    'G3': ['Maths', 'Science', 'STEAM', 'Music', 'Performing Arts', 'Drama', 'Visual Arts', 'PE'],
    'G4': ['Maths', 'Science', 'STEAM', 'Music', 'Performing Arts', 'Drama', 'Visual Arts', 'PE'],
    # G5 PDF has "Performing Arts & Drama" combined, and includes PE
    'G5': ['Maths', 'Science', 'STEAM', 'Music', 'Performing Arts', 'Visual Arts', 'PE'],
}

# Alternative subject names that might appear in PDFs
SUBJECT_ALIASES = {
    'Maths': ['Maths', '数学'],
    'Science': ['Science', '科学'],
    'STEAM': ['STEAM'],
    'Music': ['Music', '音乐'],
    'Performing Arts': ['Performing Arts', 'Performing Arts & Drama', '表演艺术'],
    'Drama': ['Drama', '戏剧'],
    'Visual Arts': ['Visual Arts', '视觉艺术'],
    'PE': ['PE', '体育'],
}

# Invalid subject names that should be filtered out
INVALID_SUBJECTS = [
    'Question Type',
    'Fill in the Blank',
    'Fair',
    'Specific',
    'Engaging',
]

def extract_text_from_pdf(pdf_path):
    """Extract all text from PDF using PyMuPDF."""
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return clean_text(text)

def parse_g1_questions(text):
    """Parse G1 format with bullet points."""
    questions = {}

    # Split by subject - G1 uses "学科：XXX" pattern
    # We'll use the known subject order
    subjects = SUBJECT_ORDER['G1']
    subject_index = 0

    # Find first subject marker
    subject_pattern = r'学科[：:]\s*[^\(]*\(([^)]+)\)'
    subject_matches = list(re.finditer(subject_pattern, text))

    for subj_idx, subj_match in enumerate(subject_matches):
        if subj_idx >= len(subjects):
            break

        subject_name = subjects[subj_idx]

        # Get content for this subject
        subj_start = subj_match.end()
        next_subj = subject_matches[subj_idx + 1] if subj_idx + 1 < len(subject_matches) else None
        subj_end = len(text) if not next_subj else next_subj.start()
        subject_content = text[subj_start:subj_end]

        # Parse weeks using bullet points
        # Format: • [newline] 第N周 (keyword) or 第N周（综合复习
        # Need to handle newlines between bullet and week marker
        week_pattern = r'•[\s\S]*?第(\d+)[周期周末]?\s*[（(]([^）\)]+)[）\)]'
        week_matches = list(re.finditer(week_pattern, subject_content))

        for week_match in week_matches:
            week_num = int(week_match.group(1))
            keyword_part = week_match.group(2).strip().strip(')')  # Remove trailing )
            # Clean up keyword: remove newlines, extra spaces, and Chinese "周" character
            keyword_part = re.sub(r'[\n\r\t\s]+', ' ', keyword_part).strip()
            keyword_part = keyword_part.replace('周', '').strip()
            is_review = '综合复习' in keyword_part or '复习' in keyword_part

            # Get content for this week
            week_start = week_match.end()
            next_week = week_matches[week_matches.index(week_match) + 1] if week_matches.index(week_match) + 1 < len(week_matches) else None
            week_end = len(subject_content) if not next_week else next_week.start()
            week_content = subject_content[week_match.start():week_end]

            # Extract question components
            # For G1, format is:
            # ◦ [newline] 题干：...
            # ◦ [newline] 选项：...
            # ◦ [newline] 正确答案：...
            # ◦ [newline] 答案解析：...

            # First check for passage (review weeks)
            passage_match = re.search(r'◦\s*阅读文本[：:]\s*([^◦]+?)(?=◦\s*题干|$)', week_content, re.DOTALL)
            passage = passage_match.group(1).strip().replace('\n', ' ') if passage_match else None

            # Extract question
            q_match = re.search(r'◦\s*题干[：:]\s*([^◦]+?)(?=◦\s*选项|$)', week_content, re.DOTALL)
            opt_match = re.search(r'◦\s*选项[：:]\s*([^◦]+?)(?=◦\s*正确答案|$)', week_content, re.DOTALL)
            ans_match = re.search(r'◦\s*正确答案[：:]\s*([A-D])[^◦]*?(?=◦\s*答案解析|$)', week_content, re.DOTALL)
            expl_match = re.search(r'◦\s*答案解析[：:]\s*([^◦]+?)(?=◦\s*第|$)', week_content, re.DOTALL)

            if q_match and opt_match and ans_match:
                question_text = q_match.group(1).strip().replace('\n', ' ')
                options_text = opt_match.group(1).strip().replace('\n', ' ')
                answer = ans_match.group(1).strip()
                explanation = expl_match.group(1).strip().replace('\n', ' ') if expl_match else ''

                # Parse options - look for A) text B) text pattern
                options = []
                # Find all option markers and extract text between them
                opt_pattern = r'([A-D])\)\s*'
                parts = re.split(opt_pattern, options_text)
                # parts is ['', 'A', 'text1', 'B', 'text2', 'C', 'text3', 'D', 'text4', '']
                for i in range(1, len(parts), 2):
                    if i + 1 < len(parts):
                        opt_letter = parts[i]
                        opt_text = parts[i + 1].strip()
                        if opt_text:
                            options.append(opt_text)

                if question_text and options and len(options) >= 2:
                    if subject_name not in questions:
                        questions[subject_name] = {}
                    if week_num not in questions[subject_name]:
                        questions[subject_name][week_num] = []

                    q_data = {
                        'week': week_num,
                        'keyword': 'review' if is_review else keyword_part,
                        'question': question_text,
                        'options': options,
                        'answer': answer,
                        'explanation': explanation
                    }
                    if passage:
                        q_data['passage'] = passage

                    questions[subject_name][week_num].append(q_data)

    return questions

def parse_g2plus_questions(text, grade):
    """Parse G2+ format (linear)."""
    questions = {}

    # Use known subject order
    subjects = SUBJECT_ORDER.get(grade, SUBJECT_ORDER['G2'])

    # Split by subject markers - handle both formats:
    # 1. "学科：XXX (EnglishName)" - with parentheses
    # 2. "学科：XXX" - without parentheses (e.g., STEAM)
    # For case 1, extract English name from parentheses
    # For case 2, use the Chinese name to look up in SUBJECT_ALIASES
    subject_pattern_with_paren = r'学科[：:][^（(]*[（(]([^（),]{3,30}?)[）)]'
    subject_pattern_no_paren = r'学科[：:]\s*([A-Z]+)(?:\s*【)?'

    all_matches = []
    for match in re.finditer(subject_pattern_with_paren, text):
        all_matches.append(('with_paren', match))
    for match in re.finditer(subject_pattern_no_paren, text):
        all_matches.append(('no_paren', match))

    # Filter out invalid subjects and normalize names
    subject_matches = []
    for match_type, match in all_matches:
        if match_type == 'with_paren':
            subject_name = match.group(1).strip()
        else:  # no_paren
            subject_name = match.group(1).strip()

        # Check if this is an invalid subject
        is_invalid = any(invalid.lower() in subject_name.lower() for invalid in INVALID_SUBJECTS)
        # Also filter if it contains multiple commas (likely a keyword list)
        if subject_name.count(',') > 2:
            is_invalid = True
        if not is_invalid:
            subject_matches.append((subject_name, match))

    # Also try to find PE subject which might have encoding issues
    # Look for "PE" followed by content pattern
    if grade == 'G5':
        # For G5, specifically find PE by looking for pattern after last subject
        pe_pattern = r'体育[^\(]*\((PE)\)|\(PE\)'
        pe_match = re.search(pe_pattern, text)
        if pe_match:
            # Check if PE is already in subject_matches
            pe_names = [name for name, _ in subject_matches]
            if 'PE' not in pe_names and 'pe' not in [n.lower() for n in pe_names]:
                subject_matches.append(('PE', pe_match))

    # Sort subject_matches according to SUBJECT_ORDER
    # Create a mapping of subject name to index in SUBJECT_ORDER
    subject_order_map = {}
    for i, subj in enumerate(subjects):
        subject_order_map[subj] = i
        # Also add common aliases
        for alias in SUBJECT_ALIASES.get(subj, []):
            subject_order_map[alias] = i

    # Sort by position in SUBJECT_ORDER, then by position in text
    def sort_key(item):
        name, match = item
        # Try to find this subject in SUBJECT_ORDER or its aliases
        for subj, idx in subject_order_map.items():
            # Direct match or alias match (using the subject_order_map which already includes aliases)
            if name.lower() == subj.lower():
                return (idx, match.start())
        # If not found, put it at the end
        return (len(subjects), match.start())

    subject_matches.sort(key=sort_key)

    for subj_idx in range(len(subjects)):
        if subj_idx >= len(subject_matches):
            # This subject is not in the PDF - skip it
            continue

        subject_name_from_match, subj_match = subject_matches[subj_idx]
        # Use predefined subject name instead of parsed one
        subject_name = subjects[subj_idx]

        # Get content for this subject
        subj_start = subj_match.end()
        next_subj = subject_matches[subj_idx + 1] if subj_idx + 1 < len(subject_matches) else None
        if next_subj:
            next_subj = next_subj[1]  # Extract match object from tuple
        subj_end = len(text) if not next_subj else next_subj.start()
        subject_content = text[subj_start:subj_end]

        # Split by week markers: 第N周
        week_pattern = r'第(\d+)周'
        week_splits = list(re.finditer(week_pattern, subject_content))

        for i, week_match in enumerate(week_splits):
            week_num = int(week_match.group(1))
            week_start = week_match.end()

            # Find week end
            next_week = week_splits[i + 1] if i + 1 < len(week_splits) else None
            week_end = len(subject_content) if not next_week else next_week.start()
            week_content = subject_content[week_match.start():week_end]

            # Check if review week (5, 9, 12, 15)
            is_review = week_num in [5, 9, 12, 15] or '(Review Week)' in week_content or '综合复习' in week_content or '阶段复习' in week_content

            if is_review:
                # Parse review week format
                passage_match = re.search(r'阅读文本[：:]\s*(.+?)(?=测试题|题干|$)', week_content, re.DOTALL)
                question_match = re.search(r'(?:测试题|题干)[：:]\s*(.+?)\s*选项[：:]', week_content, re.DOTALL)
                options_match = re.search(r'选项[：:]\s*(.+?)(?=\s*正确答案[：:])', week_content, re.DOTALL)
                answer_match = re.search(r'正确答案[：:]\s*([A-D])\s*(?:[（(]解析[：:]\s*([^）\)]+)[）\)]?)?', week_content)

                if question_match and options_match and answer_match:
                    passage = passage_match.group(1).strip().replace('\n', ' ') if passage_match else None
                    question_text = question_match.group(1).strip().replace('\n', ' ')
                    options_text = options_match.group(1).strip()
                    answer = answer_match.group(1).strip()
                    explanation = answer_match.group(2).strip() if answer_match.group(2) else ''

                    # Parse options
                    options = []
                    # Find all option markers and extract text between them
                    opt_pattern = r'([A-D])\)\s*'
                    parts = re.split(opt_pattern, options_text)
                    # parts is ['', 'A', 'text1', 'B', 'text2', 'C', 'text3', 'D', 'text4', '']
                    for i in range(1, len(parts), 2):
                        if i + 1 < len(parts):
                            opt_text = parts[i + 1].strip()
                            if opt_text:
                                options.append(opt_text)

                    if question_text and options:
                        if subject_name not in questions:
                            questions[subject_name] = {}
                        if week_num not in questions[subject_name]:
                            questions[subject_name][week_num] = []

                        questions[subject_name][week_num].append({
                            'week': week_num,
                            'keyword': 'review',
                            'question': question_text,
                            'options': options,
                            'answer': answer,
                            'explanation': explanation,
                            'passage': passage
                        })
            else:
                # Check for G5 format: 第N周 (keyword1, keyword2, ...)
                # Or regular format: each keyword has its own question
                g5_keywords_match = re.search(r'第\d+周\s*[（(]([^）)]+)[）)]', week_content)

                if g5_keywords_match and ',' in g5_keywords_match.group(1):
                    # G5 format with multiple keywords in parentheses
                    keywords_str = g5_keywords_match.group(1)
                    keywords = [k.strip() for k in keywords_str.split(',')]

                    # Now parse each question for each keyword
                    # Format: keyword - 题干：...
                    question_pattern = r'([a-zA-Z一-龥\s\-]+?)\s*-\s*题干[：:]\s*'
                    question_starts = list(re.finditer(question_pattern, week_content))

                    for j, q_match in enumerate(question_starts):
                        keyword = q_match.group(1).strip().strip(')')
                        # Clean up keyword: remove newlines, extra spaces, and Chinese "周" character
                        keyword = re.sub(r'[\n\r\t\s]+', ' ', keyword).strip()
                        keyword = keyword.replace('周', '').strip()

                        # Find question boundaries
                        q_start = q_match.end()
                        next_q = question_starts[j + 1] if j + 1 < len(question_starts) else None
                        q_end = len(week_content) if not next_q else next_q.start()
                        q_content = week_content[q_start:q_end]

                        # Parse question components
                        # First try normal pattern, then try pattern with "选" and "项：" split
                        q_text_match = re.search(r'(.+?)\s*选项[：:]', q_content, re.DOTALL)
                        if not q_text_match:
                            # Handle case where "选" and "项：" are on different lines (PDF encoding issue)
                            q_text_match = re.search(r'(.+?)\s*选[\s\n\r]*项[：:]', q_content, re.DOTALL)
                        opt_match = re.search(r'选项[：:]\s*(.+?)(?=\s*正确答案[：:])', q_content, re.DOTALL)
                        if not opt_match:
                            # Handle case where "选" and "项：" are on different lines
                            opt_match = re.search(r'选[\s\n\r]*项[：:]\s*(.+?)(?=\s*正确答案[：:])', q_content, re.DOTALL)
                        ans_match = re.search(r'正确答案[：:]\s*([A-D])\s*(?:[（(]解析[：:]\s*([^）\)]+)[）\)]?)?', q_content)

                        if q_text_match and opt_match and ans_match:
                            question_text = q_text_match.group(1).strip().replace('\n', ' ')
                            options_text = opt_match.group(1).strip()
                            answer = ans_match.group(1).strip()
                            explanation = ans_match.group(2).strip() if ans_match.group(2) else ''

                            # Parse options
                            options = []
                            for opt_m in re.finditer(r'([A-D])\)\s*([^A-D]+?)(?=\s*[A-D]\)|$)', options_text):
                                options.append(opt_m.group(2).strip())

                            if question_text and options and len(options) >= 2:
                                if subject_name not in questions:
                                    questions[subject_name] = {}
                                if week_num not in questions[subject_name]:
                                    questions[subject_name][week_num] = []

                                questions[subject_name][week_num].append({
                                    'week': week_num,
                                    'keyword': keyword,
                                    'question': question_text,
                                    'options': options,
                                    'answer': answer,
                                    'explanation': explanation
                                })
                else:
                    # Regular format - each keyword has its own question
                    question_pattern = r'([a-zA-Z一-龥\s\-]+?)\s*-\s*题干[：:]\s*'
                    question_starts = list(re.finditer(question_pattern, week_content))

                    for j, q_match in enumerate(question_starts):
                        keyword = q_match.group(1).strip().strip(')')
                        # Clean up keyword: remove newlines, extra spaces, and Chinese "周" character
                        keyword = re.sub(r'[\n\r\t\s]+', ' ', keyword).strip()
                        keyword = keyword.replace('周', '').strip()

                        # Find question boundaries
                        q_start = q_match.end()
                        next_q = question_starts[j + 1] if j + 1 < len(question_starts) else None
                        q_end = len(week_content) if not next_q else next_q.start()
                        q_content = week_content[q_start:q_end]

                        # Parse question components
                        # First try normal pattern, then try pattern with "选" and "项：" split
                        q_text_match = re.search(r'(.+?)\s*选项[：:]', q_content, re.DOTALL)
                        if not q_text_match:
                            # Handle case where "选" and "项：" are on different lines (PDF encoding issue)
                            q_text_match = re.search(r'(.+?)\s*选[\s\n\r]*项[：:]', q_content, re.DOTALL)
                        opt_match = re.search(r'选项[：:]\s*(.+?)(?=\s*正确答案[：:])', q_content, re.DOTALL)
                        if not opt_match:
                            # Handle case where "选" and "项：" are on different lines
                            opt_match = re.search(r'选[\s\n\r]*项[：:]\s*(.+?)(?=\s*正确答案[：:])', q_content, re.DOTALL)
                        ans_match = re.search(r'正确答案[：:]\s*([A-D])\s*(?:[（(]解析[：:]\s*([^）\)]+)[）\)]?)?', q_content)

                        if q_text_match and opt_match and ans_match:
                            question_text = q_text_match.group(1).strip().replace('\n', ' ')
                            options_text = opt_match.group(1).strip()
                            answer = ans_match.group(1).strip()
                            explanation = ans_match.group(2).strip() if ans_match.group(2) else ''

                            # Parse options
                            options = []
                            for opt_m in re.finditer(r'([A-D])\)\s*([^A-D]+?)(?=\s*[A-D]\)|$)', options_text):
                                options.append(opt_m.group(2).strip())

                            if question_text and options and len(options) >= 2:
                                if subject_name not in questions:
                                    questions[subject_name] = {}
                                if week_num not in questions[subject_name]:
                                    questions[subject_name][week_num] = []

                                questions[subject_name][week_num].append({
                                    'week': week_num,
                                    'keyword': keyword,
                                    'question': question_text,
                                    'options': options,
                                    'answer': answer,
                                    'explanation': explanation
                                })

    return questions

def parse_all_pdfs():
    """Parse all PDF files and return structured data."""
    all_data = {}

    pdf_files = sorted(INPUT_DIR.glob('G* Subject Vocabulary *.pdf'))

    for pdf_path in pdf_files:
        grade_match = re.search(r'G(\d+)', pdf_path.name)
        if not grade_match:
            continue

        grade = f'G{grade_match.group(1)}'
        expected = QUESTIONS_PER_WEEK[grade]

        print(f'\nParsing {pdf_path.name}...')
        print(f'  Expected: {expected} questions per week (non-review)')

        text = extract_text_from_pdf(pdf_path)

        # Use appropriate parser based on grade
        if grade == 'G1':
            subject_data = parse_g1_questions(text)
        else:
            subject_data = parse_g2plus_questions(text, grade)

        all_data[grade] = subject_data

        # Print summary
        print(f'  Found subjects: {list(subject_data.keys())}')
        for subj, weeks in subject_data.items():
            week_nums = sorted(weeks.keys())
            print(f'    {subj}:')
            for wn in week_nums:
                qcount = len(weeks[wn])
                expected_q = 1 if wn in [5, 9, 12, 15] else expected
                status = 'OK' if qcount == expected_q else f'(expected {expected_q}) !'
                print(f'      Week {wn}: {qcount} question(s) {status}')

    return all_data

def generate_unified_markdown(data):
    """Generate unified markdown from parsed data."""
    output = '# Unified Vocabulary Questions\n\n'

    for grade in sorted(data.keys()):
        output += f'## {grade}\n\n'

        for subject in sorted(data[grade].keys()):
            output += f'### Subject: {subject}\n\n'

            weeks = data[grade][subject]
            for week_num in sorted(weeks.keys()):
                for q in weeks[week_num]:
                    output += f"**Week {q['week']}: {q['keyword']}**\n\n"

                    if q.get('passage'):
                        output += f"> Passage: {q['passage']}\n\n"

                    output += f"**Question:** {q['question']}\n\n"
                    output += "**Options:**\n"
                    for i, opt in enumerate(q['options']):
                        output += f"- {chr(65 + i)}) {opt}\n"
                    output += f"\n**Answer:** {q['answer']}\n\n"
                    output += f"**Explanation:** {q['explanation']}\n\n"
                    output += "---\n\n"

    return output

def escape_ts_string(s):
    """Escape string for TypeScript output."""
    if not s:
        return ''
    # Replace quotes with escaped quotes
    s = s.replace(chr(34), '\\"')
    # Replace newlines with spaces
    s = s.replace('\n', ' ').replace('\r', ' ')
    # Replace other problematic characters
    s = s.replace('\t', ' ')
    return s.strip()

def generate_typescript(data):
    """Generate TypeScript file from parsed data."""
    output = '// Auto-generated from PDF files\n\n'
    output += 'export interface PredefinedQuestion { week: number; keyword: string; question: string; options: string[]; answer: string; explanation: string; passage?: string; }\n\n'
    output += 'export const PREDEFINED_QUESTIONS: Record<string, Record<string, Record<number, PredefinedQuestion[]>>> = {\n'

    for grade in sorted(data.keys()):
        output += f'  "{grade}": {{\n'
        for subject in sorted(data[grade].keys()):
            output += f'    "{subject}": {{\n'
            for week_num in sorted(data[grade][subject].keys()):
                questions = data[grade][subject][week_num]
                output += f'      {week_num}: ['
                output += ', '.join([
                    f"{{ week: {q['week']}, keyword: \"{escape_ts_string(q['keyword'])}\", question: \"{escape_ts_string(q['question'])}\", options: [{', '.join([f'\"{escape_ts_string(o)}\"' for o in q['options']])}], answer: \"{q['answer']}\", explanation: \"{escape_ts_string(q['explanation'])}\"{', passage: \"' + escape_ts_string(q.get('passage', '')) + '\"' if q.get('passage') else ''} }}"
                    for q in questions
                ])
                output += '],\n'
            output += '    },\n'
        output += '  },\n'

    output += '};\n'
    return output

def main():
    """Main function."""
    print('=' * 60)
    print('PDF Vocabulary Parser')
    print('=' * 60)

    # Parse all PDFs
    data = parse_all_pdfs()

    # Generate unified markdown
    print('\nGenerating unified markdown...')
    md_content = generate_unified_markdown(data)
    UNIFIED_OUTPUT.write_text(md_content, encoding='utf-8')
    print(f'[OK] Generated: {UNIFIED_OUTPUT}')

    # Generate TypeScript
    print('Generating TypeScript...')
    ts_content = generate_typescript(data)
    TS_OUTPUT.write_text(ts_content, encoding='utf-8')
    print(f'[OK] Generated: {TS_OUTPUT}')

    # Final summary
    print('\n' + '=' * 60)
    print('SUMMARY')
    print('=' * 60)
    total = 0
    for grade in sorted(data.keys()):
        grade_total = sum(len(weeks[w]) for weeks in data[grade].values() for w in weeks)
        total += grade_total
        print(f'{grade}: {grade_total} questions')
    print(f'Total: {total} questions')
    print('=' * 60)

if __name__ == '__main__':
    main()
