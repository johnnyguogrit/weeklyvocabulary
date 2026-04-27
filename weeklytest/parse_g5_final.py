#!/usr/bin/env python3
"""
Fixed G5 PDF parser with correct option extraction.
"""

import pdfplumber
import re
import sys
import json

sys.stdout.reconfigure(encoding='utf-8')


def extract_options(opts_part):
    """Extract options from the options text."""
    options = []

    # Find position of first option (A)
    remaining = opts_part
    for letter in ['A', 'B', 'C', 'D']:
        pattern = letter + r')'
        if pattern in remaining:
            idx = remaining.index(pattern)
            # Get text after "A)" or "B)"
            after_marker = remaining[idx + 2:]  # Skip "X)"
            # Find where next option starts
            opt_end = len(after_marker)
            for next_letter in ['A', 'B', 'C', 'D', '正']:  # 正 for 正确答案
                if next_letter in after_marker:
                    opt_end = min(opt_end, after_marker.index(next_letter))
            opt_text = after_marker[:opt_end].strip()
            options.append(opt_text)
            # Update remaining for next iteration
            remaining = after_marker
        else:
            options.append("")

    return options


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

        # Parse question
        if '- 题干：' in line or '- 题干:' in line:
            parts = line.split('- 题干', 1)
            if len(parts) >= 2:
                keyword = parts[0].strip()
                accumulated = parts[1]

                # Look ahead for complete question
                j = i + 1
                while j < len(lines) and '正确答案' not in accumulated:
                    if lines[j].strip() and not lines[j].startswith('第') and '学科' not in lines[j]:
                        accumulated += ' ' + lines[j].strip()
                    j += 1

                # Parse accumulated text
                if '选项：' in accumulated:
                    q_part = accumulated.split('选项：', 1)[0].strip()
                    opts_part = accumulated.split('选项：', 1)[1]

                    question = q_part.lstrip('：:').strip()

                    ans_match = re.search(r'正确答案[：:]\s*([A-D])', opts_part)
                    answer = ans_match.group(1) if ans_match else 'A'

                    expl_match = re.search(r'解析[：:](.+)', opts_part)
                    explanation = expl_match.group(1).strip(')）') if expl_match else ''

                    options = extract_options(opts_part)

                    while len(options) < 4:
                        options.append("")

                    print(f'// Week {current_week}: {keyword}')
                    print(f'{{ week: {current_week}, keyword: "{keyword}", question: "{question}", options: {json.dumps(options[:4])}, answer: "{answer}", explanation: "{explanation}" }},')

        i += 1


if __name__ == '__main__':
    main()
