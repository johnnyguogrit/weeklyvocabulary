#!/usr/bin/env python3
"""
Directly parse G5 PDF to extract missing questions.
Output TypeScript format for predefinedQuestions.ts
"""

import pdfplumber
import re
import json
from pathlib import Path

# Subject mapping (Chinese to English)
SUBJECT_MAP = {
    '数学': 'Maths',
    '科学': 'Science',
    'STEAM': 'STEAM',
    '音乐': 'Music',
    '表演艺术': 'Performing Arts',
    '戏剧': 'Drama',
    '视觉艺术': 'Visual Arts',
    '体育': 'PE',
}

# Weeks we need to extract (missing questions)
NEEDED_WEEKS = {
    'Maths': {14},  # need line graph
    'Science': {4, 11, 13},  # need various keywords
    'Music': {3, 4, 7, 8, 9, 11, 13, 14},
    'Performing Arts': {7, 8, 9, 11, 12, 13},
    'Visual Arts': {7, 13, 14},
}


def extract_questions_from_page(page, page_num):
    """Extract questions from a single page."""
    text = page.extract_text(layout=False)
    if not text:
        return []

    questions = []
    lines = text.split('\n')

    current_week = None
    current_subject = None
    current_keyword = None
    current_question = None
    current_options = []
    current_answer = None
    current_explanation = None
    current_passage = None

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Detect week number
        week_match = re.search(r'第?(\d+)周', line)
        if week_match:
            current_week = int(week_match.group(1))

        # Detect subject
        for cn_subject, en_subject in SUBJECT_MAP.items():
            if cn_subject in line:
                current_subject = en_subject
                break

        # Detect keyword (pattern: word - 题干：)
        keyword_match = re.match(r'^([a-zA-Z][a-zA-Z\s\'\-]*)\s*-\s*题干[：:]', line)
        if keyword_match:
            current_keyword = keyword_match.group(1).strip()

            # Extract question text (may span multiple lines)
            question_text = line.split('题干[：:]', 1)[-1].strip()
            j = i + 1
            while j < len(lines) and not lines[j].strip().startswith(('选项', '正确答案', '阅读文本')):
                if lines[j].strip() and not lines[j].startswith(('A.', 'B.', 'C.', 'D.')):
                    question_text += ' ' + lines[j].strip()
                j += 1
            current_question = question_text

            # Look for options
            options = []
            option_pattern = r'^([A-D])\.\s*(.+?)(?=\s*[A-D]\.|选项|正确答案|$)'
            j = i + 1
            while j < len(lines):
                opt_line = lines[j].strip()
                if opt_line.startswith(('A.', 'B.', 'C.', 'D.')):
                    opt_match = re.match(r'^([A-D])\.\s*(.+)', opt_line)
                    if opt_match:
                        options.append(opt_match.group(2).strip())
                elif '选项' in opt_line or '正确答案' in opt_line:
                    break
                j += 1

            # Look for answer
            answer = None
            explanation = None
            passage = None

            j = i
            while j < len(lines) and j < i + 20:
                ans_line = lines[j].strip()
                if '正确答案' in ans_line or '答案' in ans_line:
                    ans_match = re.search(r'[A-D][\s、．]*答案|答案[：:]\s*([A-D])', ans_line)
                    if not ans_match:
                        ans_match = re.search(r'([A-D])[\.、\s]*答案', ans_line)
                    if not ans_match:
                        ans_match = re.search(r'答案[：:\s]*([A-D])', ans_line)
                    if ans_match:
                        answer = ans_match.group(1).upper()
                if '解释' in ans_line or 'explana' in ans_line.lower():
                    explanation = ans_line.split('解释')[-1].split('explana')[-1].strip('：: ')
                if '阅读文本' in ans_line or 'passage' in ans_line.lower():
                    passage_text = ans_line.split('阅读文本')[-1].split('passage')[-1].strip('：: ')
                    k = j + 1
                    while k < len(lines) and k < j + 10:
                        if lines[k].strip() and not any(x in lines[k] for x in ['第', '周', '学科', '题干', '正确答案']):
                            passage_text += ' ' + lines[k].strip()
                        elif lines[k].strip():
                            break
                        k += 1
                    passage = passage_text.strip()
                j += 1

            if current_keyword and current_question and options and answer:
                questions.append({
                    'week': current_week,
                    'subject': current_subject,
                    'keyword': current_keyword,
                    'question': current_question,
                    'options': options,
                    'answer': answer,
                    'explanation': explanation or '',
                    'passage': passage or None
                })

        i += 1

    return questions


def parse_g5_pdf(pdf_path):
    """Parse G5 PDF and extract all questions."""
    print(f"Parsing {pdf_path}...")

    all_questions = {subject: {} for subject in SUBJECT_MAP.values()}

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages, 1):
            questions = extract_questions_from_page(page, page_num)
            for q in questions:
                subject = q.get('subject')
                week = q.get('week')
                if subject and week:
                    if subject not in all_questions:
                        all_questions[subject] = {}
                    if week not in all_questions[subject]:
                        all_questions[subject][week] = []
                    all_questions[subject][week].append(q)

    return all_questions


def format_typescript_question(q):
    """Format a single question as TypeScript."""
    passage_part = f', passage: "{q["passage"]}"' if q.get('passage') else ''
    return f'''{{ week: {q['week']}, keyword: "{q['keyword']}", question: "{q['question']}", options: {json.dumps(q['options'])}, answer: "{q['answer']}", explanation: "{q.get('explanation', '')}"{passage_part} }}'''


def main():
    pdf_path = "D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest/G5 Subject Vocabulary 2025-2026.pdf"

    if not Path(pdf_path).exists():
        print(f"Error: PDF not found at {pdf_path}")
        return

    questions_by_subject = parse_g5_pdf(pdf_path)

    # Print results grouped by subject and week
    for subject in ['Maths', 'Science', 'Music', 'Performing Arts', 'Visual Arts', 'PE']:
        if subject not in questions_by_subject:
            continue
        print(f"\n// {subject}")
        for week in sorted(questions_by_subject[subject].keys()):
            questions = questions_by_subject[subject][week]
            print(f"// Week {week}: {len(questions)} questions")
            for q in questions:
                print(format_typescript_question(q) + ",")


if __name__ == '__main__':
    main()
