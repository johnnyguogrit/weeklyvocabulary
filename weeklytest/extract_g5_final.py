#!/usr/bin/env python3
"""
G5 PDF question extractor - handles special characters properly.
"""

import pdfplumber
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')


def main():
    pdf_path = "G5 Subject Vocabulary 2025-2026.pdf"

    with pdfplumber.open(pdf_path) as pdf:
        full_text = ""
        for page in pdf.pages:
            text = page.extract_text()
            if text:
                full_text += text + "\n"

    # Clean up special characters and normalize
    full_text = full_text.replace('\x01', ' ')  # Replace separator with space
    full_text = full_text.replace('题⼲', '题干')
    full_text = full_text.replace('阅读⽂本', '阅读文本')

    lines = full_text.split('\n')

    current_week = None
    current_subject = None

    subjects = {
        '数学': 'Maths',
        '科学': 'Science',
        'STEAM': 'STEAM',
        '音乐': 'Music',
        '表演艺术': 'Performing Arts',
        '戏剧': 'Drama',
        '视觉艺术': 'Visual Arts',
        '体育': 'PE',
    }

    # Collect questions first to handle multi-line questions
    i = 0
    while i < len(lines):
        line = lines[i].strip()

        # Detect subject
        for cn, en in subjects.items():
            if cn in line:
                if current_subject != en:
                    current_subject = en
                    print(f"\n// {current_subject}")

        # Detect week
        week_match = re.search(r'第(\d+)周', line)
        if week_match:
            current_week = int(week_match.group(1))

        # Parse question line
        if '- 题干：' in line or '- 题干:' in line:
            parts = line.split('- 题干', 1)
            if len(parts) >= 2:
                keyword = parts[0].strip()

                # Get the rest which contains question, options, answer
                rest = parts[1]

                # Find options marker
                if '选项：' in rest or '选项:' in rest:
                    marker = '选项：' if '选项：' in rest else '选项:'
                    q_and_opts = rest.split(marker, 1)

                    question = q_and_opts[0].strip()
                    opts_and_ans = q_and_opts[1] if len(q_and_opts) > 1 else ""

                    # Parse options using regex
                    options = []
                    for letter in ['A', 'B', 'C', 'D']:
                        # Pattern: A) text B) text or A] text B] text
                        pattern = rf'{letter}[\)\]]\s*([^A-D]+?)(?=\s*[A-D][\)\]]|正确答案|$)'
                        match = re.search(pattern, opts_and_ans)
                        if match:
                            opt_text = match.group(1).strip()
                            options.append(opt_text)
                        else:
                            options.append("")

                    # Find answer
                    ans_match = re.search(r'正确答案[：:]\s*([A-D])', opts_and_ans)
                    answer = ans_match.group(1) if ans_match else 'A'

                    # Find explanation
                    expl_match = re.search(r'解析[：:](.+?)(?:【|$|学科|第\d周)', opts_and_ans)
                    explanation = expl_match.group(1).strip() if expl_match else ''
                    # Clean explanation
                    explanation = re.sub(r'\s+', ' ', explanation)

                    # Output TypeScript format
                    print(f'// Week {current_week}: {keyword}')
                    print(f'{{ week: {current_week}, keyword: "{keyword}", question: "{question}", options: {json.dumps(options[:4])}, answer: "{answer}", explanation: "{explanation}" }},')

        i += 1


if __name__ == '__main__':
    main()
