#!/usr/bin/env python3
"""
Comprehensive fix for markdown files from markitdown tool.
Properly reconstructs incomplete questions by looking ahead for continuation.
"""

import re
from pathlib import Path


def fix_incomplete_questions(content: str) -> str:
    """Fix incomplete questions by finding continuation lines."""

    # First, replace zero-width spaces with newlines
    content = content.replace('​', '\n')

    lines = content.split('\n')
    fixed_lines = []

    i = 0
    while i < len(lines):
        line = lines[i].rstrip()

        # Check if this is an incomplete question line
        # Pattern: "keyword - 题干：... 选项：A) xxx B) xxx C) xxx"
        # Missing: ") D) xxx 正确答案：X"
        question_pattern = re.match(
            r'^([a-zA-Z][a-zA-Z\s\'\-]*)\s*-\s*题干[：:](.+?)选项[：:](.+)$', line)

        if question_pattern:
            keyword = question_pattern.group(1).strip()
            question_text = question_pattern.group(2).strip()
            options_text = question_pattern.group(3).strip()

            # Check if options are incomplete (missing D) or "正确答案")
            # Complete pattern: "A) xxx B) xxx C) xxx D) xxx 正确答案：X"
            # If we don't see "正确答案", the question is incomplete

            # Check how many options we have
            option_count = len(re.findall(r'[ABCD]\)', options_text))

            if option_count < 4 or '正确答案' not in line:
                # Question is incomplete, look ahead for continuation
                j = i + 1
                continuation = []

                while j < len(lines):
                    next_line = lines[j].strip()

                    # Stop if we hit a new subject, week, or complete question
                    if next_line.startswith('学科：'):
                        break
                    if re.match(r'^第\d+周', next_line):
                        break
                    if next_line.startswith('阅读文本：') or next_line.startswith('测试题：'):
                        break
                    if re.match(r'^[a-zA-Z][a-zA-Z\s\'\-]*\s*-\s*题干', next_line):
                        # This is a new question, stop
                        break

                    # Collect continuation
                    if next_line:
                        continuation.append(next_line)

                    # Check if we now have the complete question
                    combined = ' '.join(continuation)
                    if '正确答案' in combined:
                        # Found the complete question
                        full_line = f"{keyword} - 题干：{question_text} 选项：{options_text} {combined}"
                        fixed_lines.append(full_line)
                        i = j
                        break

                    j += 1

                if '正确答案' not in ' '.join(continuation):
                    # Couldn't find complete question, add as-is
                    fixed_lines.append(line)
            else:
                # Question is complete, add as-is
                fixed_lines.append(line)
        else:
            # Not a question line, add as-is
            fixed_lines.append(line)

        i += 1

    return '\n'.join(fixed_lines)


def fix_markdown_file(md_path: str):
    """Fix markdown file format."""
    print(f"Fixing {md_path}...")

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Fix incomplete questions
    fixed_content = fix_incomplete_questions(content)

    # Write back
    with open(md_path, 'w', encoding='utf-8') as f:
        f.write(fixed_content)

    print(f"  Fixed {md_path}")


def main():
    """Fix all G2-G5 markdown files."""
    base_dir = Path("D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest")

    for grade in ['G2', 'G3', 'G4', 'G5']:
        md_file = base_dir / f"{grade} Subject Vocabulary 2025-2026.md"
        if md_file.exists():
            fix_markdown_file(str(md_file))

    print("\nDone! All markdown files have been fixed.")


if __name__ == '__main__':
    main()
