#!/usr/bin/env python3
"""
Parse PDF vocabulary files using pdfplumber for better text extraction.
Creates unified markdown format for G2-G5.
"""

import pdfplumber
import re
from pathlib import Path

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


def extract_text_from_pdf(pdf_path: str) -> str:
    """Extract text from PDF using pdfplumber with better line handling."""
    text_parts = []

    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            # Extract text with preserve layout
            text = page.extract_text(layout=False)
            if text:
                text_parts.append(text)

    return '\n'.join(text_parts)


def clean_line(line: str) -> str:
    """Clean a single line."""
    # Remove control characters
    line = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]', '', line)

    # Fix common character issues
    replacements = {
        '题⼲': '题干',
        '题干干': '题干',
        '选項': '选项',
        '题⽂本': '阅读文本',
        '阅读⽂本': '阅读文本',
    }
    for old, new in replacements.items():
        line = line.replace(old, new)

    # Normalize spaces
    line = re.sub(r'[ \t]+', ' ', line)

    return line.strip()


def parse_question_block(lines: list, start_idx: int) -> tuple:
    """
    Parse a question block that may span multiple lines.
    Returns (question_text, next_idx)
    """
    question_lines = []
    i = start_idx

    while i < len(lines):
        line = lines[i].strip()

        # Stop conditions
        if not line:
            i += 1
            continue

        # New week or subject
        if line.startswith('第') and '周' in line:
            break
        if '学科：' in line:
            break

        question_lines.append(line)
        i += 1

    full_question = ' '.join(question_lines)
    return full_question, i


def format_markdown_content(raw_text: str, grade: str) -> str:
    """Format the extracted text into clean markdown."""
    lines = raw_text.split('\n')
    output_lines = []

    # Header
    output_lines.append(f"{grade} Subject Vocabulary 2025-2026")
    output_lines.append("")

    i = 0
    while i < len(lines):
        line = clean_line(lines[i])

        if not line:
            output_lines.append("")
            i += 1
            continue

        # Week header
        week_match = re.match(r'第(\d+)周', line)
        if week_match:
            output_lines.append(line)
            i += 1
            continue

        # Subject header
        if '学科：' in line:
            output_lines.append("")
            output_lines.append(line)
            i += 1
            continue

        # Review week or phase header
        if 'Review' in line or '复习' in line or '阶段' in line:
            output_lines.append(line)
            i += 1
            continue

        # Question line - starts with a word followed by " - 题干："
        if re.match(r'^[a-zA-Z][a-zA-Z\s\'\-]*\s*-\s*题干[：:]', line):
            # Check if this line contains the full question
            if '正确答案' in line:
                # Single complete question
                output_lines.append(line)
            else:
                # Need to gather continuation lines
                full_question, i = parse_question_block(lines, i)
                output_lines.append(full_question)
            i += 1
            continue

        # Other content - just add it
        output_lines.append(line)
        i += 1

    return '\n'.join(output_lines)


def parse_pdf_to_markdown(pdf_path: str, output_path: str):
    """Parse PDF and output clean markdown."""
    print(f"Parsing {pdf_path}...")

    # Extract text
    raw_text = extract_text_from_pdf(pdf_path)

    # Detect grade
    grade_match = re.search(r'G[2-5]', pdf_path)
    grade = grade_match.group(0) if grade_match else 'G2'

    # Format content
    formatted = format_markdown_content(raw_text, grade)

    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(formatted)

    print(f"  -> {output_path}")


def main():
    """Process G2-G5 PDF files."""
    base_dir = Path("D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest")

    for grade in ['G2', 'G3', 'G4', 'G5']:
        pdf_file = base_dir / f"{grade} Subject Vocabulary 2025-2026.pdf"
        md_file = base_dir / f"{grade} Subject Vocabulary 2025-2026.md"

        if pdf_file.exists():
            parse_pdf_to_markdown(str(pdf_file), str(md_file))

    print("\nDone! G2-G5 markdown files regenerated with pdfplumber.")


if __name__ == '__main__':
    main()
