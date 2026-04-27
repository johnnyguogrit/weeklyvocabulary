#!/usr/bin/env python3
"""
Robust G5 PDF parser that handles multi-line questions.
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

    # Clean and normalize
    full_text = full_text.replace('\x01', ' ')
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

        # Parse question - accumulate across lines until we find answer
        if '- 题干：' in line or '- 题干:' in line:
            parts = line.split('- 题干', 1)
            if len(parts) >= 2:
                keyword = parts[0].strip()
                accumulated = parts[1]  # Start with everything after "- 题干"

                # Look ahead to find the complete question (until 正确答案)
                j = i + 1
                while j < len(lines) and '正确答案' not in accumulated:
                    if lines[j].strip() and not lines[j].startswith('第') and '学科' not in lines[j]:
                        accumulated += ' ' + lines[j].strip()
                    j += 1

                # Now parse the accumulated text
                if '选项：' in accumulated:
                    q_part = accumulated.split('选项：', 1)[0].strip()
                    opts_part = accumulated.split('选项：', 1)[1]

                    # Clean question (remove leading colon)
                    question = q_part.lstrip('：:').strip()

                    # Find answer
                    ans_match = re.search(r'正确答案[：:]\s*([A-D])', opts_part)
                    answer = ans_match.group(1) if ans_match else 'A'

                    # Find explanation
                    expl_match = re.search(r'解析[：:](.+)', opts_part)
                    explanation = expl_match.group(1).strip(')）') if expl_match else ''

                    # Parse options
                    options = []
                    for letter in ['A', 'B', 'C', 'D']:
                        pattern = rf'{letter}[\)\]]\s*'
                        if pattern in opts_part:
                            idx = opts_part.index(letter) if letter in opts_part else -1
                            if idx >= 0:
                                after_marker = opts_part[idx:].split(pattern, 1)[1] if pattern in opts_part[idx:] else ""
                                # Find end of this option
                                opt_end = len(after_marker)
                                for next_letter in ['A', 'B', 'C', 'D', '正确', '解析']:
                                    if next_letter in after_marker:
                                        opt_end = min(opt_end, after_marker.index(next_letter))
                                opt_text = after_marker[:opt_end].strip()
                                options.append(opt_text)
                            else:
                                options.append("")
                        else:
                            options.append("")

                    # Ensure 4 options
                    while len(options) < 4:
                        options.append("")

                    # Output
                    print(f'// Week {current_week}: {keyword}')
                    print(f'{{ week: {current_week}, keyword: "{keyword}", question: "{question}", options: {json.dumps(options[:4])}, answer: "{answer}", explanation: "{explanation}" }},')

        i += 1


if __name__ == '__main__':
    main()
