#!/usr/bin/env python3
"""
Simple, efficient G5 PDF parser.
"""

import pdfplumber
import re
import sys

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


def main():
    pdf_path = "D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest/G5 Subject Vocabulary 2025-2026.pdf"

    print(f"Parsing {pdf_path}...", file=sys.stderr)

    with pdfplumber.open(pdf_path) as pdf:
        # Get all text
        all_text = ""
        for page in pdf.pages:
            text = page.extract_text(layout=False)
            if text:
                all_text += text + "\n"

    # Process text line by line
    lines = all_text.split('\n')

    current_week = None
    current_subject = None
    in_review = False
    passage = ""

    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Skip empty lines
        if not line:
            i += 1
            continue

        # Detect subject
        for cn, en in SUBJECT_MAP.items():
            if cn in line:
                current_subject = en
                break

        # Detect week header
        week_match = re.search(r'第(\d+)周', line)
        if week_match:
            current_week = int(week_match.group(1))
            # Check if review week
            in_review = 'review' in line.lower() or 'Review' in line

        # Parse reading passage for review weeks
        if in_review and ('阅读文本' in line or '阅读⽂本' in line):
            passage = line.split('阅读文本')[-1].split('阅读⽂本')[-1].strip('：: ')
            j = i + 1
            while j < len(lines) and '测试题' not in lines[j]:
                if lines[j].strip():
                    passage += " " + lines[j].strip()
                j += 1
            passage = passage.strip()

        # Parse regular question: keyword - 题干：
        if '- 题干' in line or '- 题干' in line:
            parts = line.split('- 题干', 1)
            if len(parts) == 2:
                keyword = parts[0].strip()
                rest = parts[1]

                # Find options (选项：)
                if '选项：' in rest or '选项:' in rest:
                    opt_parts = re.split(r'选项[：:]', rest, 1)
                    question = opt_parts[0].strip()
                    opts_and_ans = opt_parts[1] if len(opt_parts) > 1 else ""

                    # Parse options A-D
                    options = []
                    opt_matches = re.findall(r'([A-D])[\)\]]\s*([^A-D]+?)(?=\s*[A-D][\)\]]|正确答案|$)', opts_and_ans)
                    for m in opt_matches:
                        opt_text = m[1].strip()
                        if opt_text:
                            options.append(opt_text)

                    # Find answer
                    ans_match = re.search(r'正确答案[：:]\s*([A-D])', opts_and_ans)
                    answer = ans_match.group(1).upper() if ans_match else 'A'

                    # Find explanation
                    expl_match = re.search(r'解析[：:](.+)', opts_and_ans)
                    explanation = expl_match.group(1).strip() if expl_match else ''

                    # Output TypeScript format
                    passage_part = f', passage: "{passage}"' if passage and in_review else ''
                    print(f'{{ week: {current_week}, keyword: "{keyword}", question: "{question}", options: {options}, answer: "{answer}", explanation: "{explanation}"{passage_part} }},')

                    passage = ""

        # Parse review week test question
        if in_review and '测试题' in line:
            question = line.split('测试题')[-1].strip('：: ')

            # Look ahead for options and answer
            j = i + 1
            full_text = question
            options = []
            answer = 'A'
            explanation = ''

            while j < len(lines) and j < i + 10:
                full_text += " " + lines[j].strip()

                # Check if we have options
                opt_matches = re.findall(r'([A-D])[\)\]]\s*([^A-D]+?)(?=\s*[A-D][\)\]]|正确答案|$)', full_text)
                if len(opt_matches) >= 4:
                    options = [m[1].strip() for m in opt_matches]

                # Check for answer
                ans_match = re.search(r'正确答案[：:]\s*([A-D])', full_text)
                if ans_match:
                    answer = ans_match.group(1).upper()

                # Check for explanation
                expl_match = re.search(r'解析[：:](.+)', full_text)
                if expl_match:
                    explanation = expl_match.group(1).strip()

                j += 1

            passage_part = f', passage: "{passage}"' if passage else ''
            print(f'{{ week: {current_week}, keyword: "review", question: "{question}", options: {options}, answer: "{answer}", explanation: "{explanation}"{passage_part} }},')
            passage = ""

        i += 1


if __name__ == '__main__':
    main()
