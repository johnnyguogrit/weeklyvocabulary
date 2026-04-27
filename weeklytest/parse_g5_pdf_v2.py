#!/usr/bin/env python3
"""
Parse G5 PDF to extract all questions and output TypeScript format.
"""

import pdfplumber
import re
import json
import sys

# Set UTF-8 encoding
sys.stdout.reconfigure(encoding='utf-8')

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

# Keywords we need to extract (missing from predefinedQuestions.ts)
MISSING_KEYWORDS = {
    'Maths': {
        14: ['line graph'],
    },
    'Science': {
        4: ['normal force', 'repel'],
        11: ['magnet', 'test'],
        13: ['migration', 'habitat'],
    },
    'Music': {
        3: ['storytelling'],
        4: ['vowel shape', 'clarity', 'resonance'],
        7: ['cue line', 'connection'],
        8: ['formation', 'transition'],
        9: ['character voice'],
        11: ['musical intention'],
        13: ['discipline'],
        14: ['performance readiness'],
    },
    'Performing Arts': {
        7: ['emotion'],
        8: ['feel angry', 'sound angry', 'sing angry'],
        9: ['feel angry', 'sound angry', 'sing angry'],
        11: ['eyeline lifted'],
        12: ['project', 'eyeline lifted'],
        13: ['connect to audience', 'project', 'eyeline lifted', 'feel'],
    },
    'Visual Arts': {
        7: ['line', 'measurement'],
        13: ['reflect'],
        14: ['Essence'],
    },
}


def parse_question_line(line, current_week, current_subject):
    """Parse a single question line."""
    # Pattern: keyword - 题干：question 选项：A) ... B) ... C) ... D) ... 正确答案：X (解析：...)
    question_match = re.match(
        r'^([a-zA-Z][a-zA-Z\s\'\-]*)\s*-\s*题干[：:](.+?)选项[：:]([A-D][\).][^A-D]+?)[A-D][\).][^A-D]+?正确答案[：:]\s*([A-D])',
        line, re.DOTALL
    )

    if question_match:
        keyword = question_match.group(1).strip()
        question_text = question_match.group(2).strip()
        options_text = question_match.group(3).strip()
        answer = question_match.group(4).upper()

        # Parse options
        options = re.findall(r'([A-D])[\).]\s*([^A-D]+?)(?=\s*[A-D][\).]|$)', options_text)
        options = [opt[1].strip() for opt in options]

        # Extract explanation
        expl_match = re.search(r'解析[：:](.+?)$', line)
        explanation = expl_match.group(1).strip() if expl_match else ''

        return {
            'week': current_week,
            'subject': current_subject,
            'keyword': keyword,
            'question': question_text,
            'options': options,
            'answer': answer,
            'explanation': explanation,
            'passage': None
        }
    return None


def parse_review_week(lines, start_idx, current_week, current_subject):
    """Parse a review week with passage."""
    passage = None
    question = None

    # Find passage (阅读文本)
    for i in range(start_idx, min(start_idx + 10, len(lines))):
        if '阅读文本' in lines[i] or '阅读⽂本' in lines[i]:
            passage_text = lines[i].split('阅读文本')[-1].split('阅读⽂本')[-1].strip('：: ')
            j = i + 1
            while j < len(lines) and j < i + 5:
                if '测试题' in lines[j]:
                    break
                passage_text += ' ' + lines[j].strip()
                j += 1
            passage = passage_text.strip()
            break

    # Find test question (测试题)
    for i in range(start_idx, min(start_idx + 15, len(lines))):
        if '测试题' in lines[i]:
            q_text = lines[i].split('测试题')[-1].strip('：: ')

            # Look for options on next lines
            options = []
            answer = None
            explanation = ''

            for j in range(i + 1, min(i + 8, len(lines))):
                if '正确答案' in lines[j]:
                    # Extract options from accumulated text
                    full_q = q_text + ' ' + ' '.join(lines[i+1:j])
                    ans_match = re.search(r'正确答案[：:]\s*([A-D])', lines[j])
                    if ans_match:
                        answer = ans_match.group(1).upper()
                    expl_match = re.search(r'解析[：:](.+)', lines[j])
                    if expl_match:
                        explanation = expl_match.group(1).strip()

                    # Parse options from full question text
                    opt_pattern = r'([A-D])[\)\]]\s*([^A-D]+?)(?=\s*[A-D][\)\]]|$)'
                    opts = re.findall(opt_pattern, full_q)
                    options = [opt[1].strip() for opt in opts if opt[1].strip()]
                    break

            if passage and q_text and options and answer:
                return {
                    'week': current_week,
                    'subject': current_subject,
                    'keyword': 'review',
                    'question': q_text,
                    'options': options,
                    'answer': answer,
                    'explanation': explanation,
                    'passage': passage
                }
            break

    return None


def parse_g5_pdf(pdf_path, needed_only=False):
    """Parse G5 PDF and extract all questions."""
    print(f"Parsing {pdf_path}...")

    all_questions = {}

    with pdfplumber.open(pdf_path) as pdf:
        full_text = ''
        for page in pdf.pages:
            text = page.extract_text(layout=False)
            if text:
                full_text += text + '\n'

    lines = full_text.split('\n')

    current_week = None
    current_subject = None
    current_keywords = []
    in_review_week = False

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Detect week
        week_match = re.search(r'第?(\d+)周[\(（](.+?)[\）)]', line)
        if week_match:
            current_week = int(week_match.group(1))
            keywords_str = week_match.group(2)
            # Clean up keywords
            keywords_str = keywords_str.replace(' ', ',')
            current_keywords = [k.strip() for k in keywords_str.split(',') if k.strip()]
            in_review_week = 'review' in keywords_str.lower() or 'Review' in keywords_str

        # Detect subject
        for cn_subject, en_subject in SUBJECT_MAP.items():
            if cn_subject in line:
                current_subject = en_subject
                break

        # Parse regular question
        if '- 题干' in line or '- 题干' in line:
            # Reconstruct full question (may be split across lines)
            full_line = line
            j = i + 1
            while j < len(lines) and '正确答案' not in full_line:
                if lines[j].strip() and not lines[j].startswith(('第', '学科')):
                    full_line += ' ' + lines[j].strip()
                else:
                    break
                j += 1

            question = parse_question_line(full_line, current_week, current_subject)
            if question:
                if current_subject not in all_questions:
                    all_questions[current_subject] = {}
                if current_week not in all_questions[current_subject]:
                    all_questions[current_subject][current_week] = []
                all_questions[current_subject][current_week].append(question)

        # Handle review week passage
        if in_review_week and '阅读文本' in line:
            review_q = parse_review_week(lines, i, current_week, current_subject)
            if review_q:
                if current_subject not in all_questions:
                    all_questions[current_subject] = {}
                if current_week not in all_questions[current_subject]:
                    all_questions[current_subject][current_week] = []
                all_questions[current_subject][current_week].append(review_q)

        i += 1

    return all_questions


def format_ts_question(q):
    """Format question as TypeScript."""
    passage = f', passage: "{q["passage"]}"' if q.get('passage') else ''
    return f'{{ week: {q["week"]}, keyword: "{q["keyword"]}", question: "{q["question"]}", options: {json.dumps(q["options"])}, answer: "{q["answer"]}", explanation: "{q.get("explanation", "")}"{passage} }}'


def main():
    pdf_path = "D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest/G5 Subject Vocabulary 2025-2026.pdf"

    all_questions = parse_g5_pdf(pdf_path)

    # Print all questions by subject and week
    for subject in ['Maths', 'Science', 'Music', 'Performing Arts', 'Visual Arts', 'PE']:
        if subject not in all_questions:
            continue
        print(f"\n// ===== {subject} =====")
        for week in sorted(all_questions[subject].keys()):
            questions = all_questions[subject][week]
            print(f"// Week {week}: {len(questions)} questions")
            for q in questions:
                print(format_ts_question(q) + ',')


if __name__ == '__main__':
    main()
