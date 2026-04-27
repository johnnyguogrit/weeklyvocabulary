#!/usr/bin/env python3
"""
Extract G5 missing questions from PDF.
"""

import pdfplumber
import re
import sys
import json

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

# Keywords we need to extract
MISSING_KEYWORDS = {
    'Maths': {
        14: ['line graph'],
    },
    'Science': {
        4: ['normal', 'repel'],  # normal force is in vocabulary as just normal
        11: ['magnet', 'test'],
        13: ['migration', 'habitat'],
    },
    'Music': {
        3: ['storytelling'],
        4: ['vowel', 'clarity', 'resonance'],  # vowel shape -> vowel
        7: ['cue line', 'connection'],
        8: ['formation', 'transition'],
        9: ['character'],  # character voice -> character
        11: ['intention'],  # musical intention -> intention
        13: ['discipline'],
        14: ['readiness'],  # performance readiness -> readiness
    },
    'Performing Arts': {
        8: ['feel', 'sound', 'sing'],  # feel angry -> feel
        12: ['project', 'eyeline'],  # eyeline lifted -> eyeline
        13: ['connect', 'project', 'eyeline', 'feel'],
    },
    'Visual Arts': {
        7: ['measurement'],
        13: ['reflect'],
        14: ['Essence'],
    },
}


def extract_all_questions(pdf_path):
    """Extract all questions from PDF."""
    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text(layout=False)
            if text:
                full_text += text + "\n"

    # Normalize the special character
    full_text = full_text.replace('题⼲', '题干')

    questions = []

    # Split by subject
    for cn_subject, en_subject in SUBJECT_MAP.items():
        if cn_subject not in full_text:
            continue

        # Extract section for this subject
        subject_idx = full_text.index(cn_subject)
        next_subject_start = len(full_text)
        for other_cn in SUBJECT_MAP.keys():
            if other_cn != cn_subject and other_cn in full_text[subject_idx + 2:]:
                idx = full_text.index(other_cn, subject_idx + 2)
                if idx < next_subject_start:
                    next_subject_start = idx

        subject_text = full_text[subject_idx:next_subject_start]

        # Find all questions in this subject
        # Pattern: keyword - 题干：question 选项：A) xxx B) xxx C) xxx D) xxx 正确答案：X
        lines = subject_text.split('\n')

        for line in lines:
            if '- 题干：' in line or '- 题干:' in line:
                # Extract keyword
                keyword_part = line.split('- 题干', 1)[0].strip()

                # Extract question and options
                rest = line.split('- 题干', 1)[1]

                # Find 选项
                if '选项：' in rest or '选项:' in rest:
                    opt_marker = '选项：' if '选项：' in rest else '选项:'
                    q_part = rest.split(opt_marker)[0].strip()
                    opts_part = rest.split(opt_marker)[1]

                    # Find answer
                    ans_match = re.search(r'正确答案[：:]\s*([A-D])', opts_part)
                    answer = ans_match.group(1) if ans_match else 'A'

                    # Find explanation
                    expl_match = re.search(r'解析[：:](.+?)(?:$|【)', opts_part)
                    explanation = expl_match.group(1).strip() if expl_match else ''

                    # Parse options
                    options = []
                    # Find all A) xxx B) xxx patterns
                    opt_pattern = r'([A-D])[\)\]]\s*([^A-D]+?)(?=\s*[A-D][\)\]]|正确答案|$)'
                    for match in re.finditer(opt_pattern, opts_part):
                        opt_text = match.group(2).strip()
                        if opt_text and len(opt_text) > 0:
                            options.append(opt_text)

                    # Ensure we have 4 options
                    while len(options) < 4:
                        options.append("")

                    # Find week number from surrounding context
                    week = None
                    for prev_line in reversed(lines[:lines.index(line)]):
                        week_match = re.search(r'第(\d+)周', prev_line)
                        if week_match:
                            week = int(week_match.group(1))
                            break

                    if week and keyword_part:
                        questions.append({
                            'subject': en_subject,
                            'week': week,
                            'keyword': keyword_part,
                            'question': q_part,
                            'options': options[:4],
                            'answer': answer,
                            'explanation': explanation
                        })

    return questions


def main():
    pdf_path = "D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest/G5 Subject Vocabulary 2025-2026.pdf"

    all_questions = extract_all_questions(pdf_path)

    # Group by subject and week
    by_subject = {}
    for q in all_questions:
        subj = q['subject']
        week = q['week']
        if subj not in by_subject:
            by_subject[subj] = {}
        if week not in by_subject[subj]:
            by_subject[subj][week] = []
        by_subject[subj][week].append(q)

    # Output TypeScript format for missing weeks
    for subject in ['Maths', 'Science', 'Music', 'Performing Arts', 'Visual Arts', 'PE']:
        if subject not in by_subject:
            continue

        print(f"\n// {subject}")
        for week in sorted(by_subject[subject].keys()):
            questions = by_subject[subject][week]
            print(f"// Week {week}: {len(questions)} questions")
            for q in questions:
                passage = f', passage: "{q.get("passage", "")}"' if q.get('passage') else ''
                print(f'{{ week: {q["week"]}, keyword: "{q["keyword"]}", question: "{q["question"]}", options: {json.dumps(q["options"])}, answer: "{q["answer"]}", explanation: "{q["explanation"]}"{passage} }},')


if __name__ == '__main__':
    main()
