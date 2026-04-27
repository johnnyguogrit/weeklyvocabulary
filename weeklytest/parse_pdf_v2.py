#!/usr/bin/env python3
"""
Re-parse PDF vocabulary files to clean markdown format.
Creates unified format for all grades G2-G5.
"""

import fitz  # PyMuPDF
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
    """Extract text from PDF using PyMuPDF with layout preservation."""
    doc = fitz.open(pdf_path)
    text_parts = []

    for page in doc:
        # Get text blocks with position information
        blocks = page.get_text("dict")["blocks"]
        page_text = ""

        for block in blocks:
            if "lines" in block:
                for line in block["lines"]:
                    line_text = ""
                    for span in line["spans"]:
                        line_text += span["text"]
                    page_text += line_text + "\n"

        text_parts.append(page_text)

    doc.close()
    return "\n".join(text_parts)


def clean_and_format_text(text: str) -> str:
    """Clean and format text into unified markdown format."""
    # Remove control characters
    text = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]', ' ', text)

    # Fix common character issues
    text = text.replace('题⼲', '题干')
    text = text.replace('题干干', '题干')
    text = text.replace('选項', '选项')
    text = text.replace('题⽂本', '阅读文本')
    text = text.replace('阅读⽂本', '阅读文本')

    # Normalize whitespace
    text = re.sub(r'[ \t]+', ' ', text)  # Replace multiple spaces with single space

    # Fix line breaks that were incorrectly inserted in the middle of text
    lines = text.split('\n')
    formatted_lines = []

    for line in lines:
        line = line.strip()
        if not line:
            formatted_lines.append('')
            continue

        # Check if this is a continuation of a previous line
        # (starts with lowercase or mid-word)
        if formatted_lines and line and not line[0].isupper() and not line.startswith('第') and not line.startswith('学科') and not line.startswith('•') and not re.match(r'^[A-Z][a-z]*\s*-', line):
            # Likely continuation
            if formatted_lines[-1]:
                # Append to previous line
                formatted_lines[-1] += ' ' + line
                continue

        formatted_lines.append(line)

    return '\n'.join(formatted_lines)


def reformat_questions_section(text: str, grade: str) -> str:
    """Reformat questions into unified format."""
    lines = text.split('\n')
    output_lines = []
    i = 0

    while i < len(lines):
        line = lines[i].strip()

        # Keep headers and empty lines
        if not line or line.startswith('G') or '学科：' in line or line.startswith('根据') or line.startswith('测试'):
            output_lines.append(line)
            i += 1
            continue

        # Week header
        week_match = re.match(r'第(\d+)周\s*(?:\(([^)]*)\))?', line)
        if week_match:
            output_lines.append(line)
            i += 1
            continue

        # Review Week header
        if 'Review Week' in line or '复习' in line:
            output_lines.append(line)
            i += 1
            continue

        # Question line - detect and format
        if re.match(r'^[a-zA-Z][a-zA-Z\s]*\s*-\s*题干', line):
            # This is a question - ensure it's properly formatted
            # Check if options are on the same line or next lines
            if '正确答案' in line:
                # Single line format - keep as is
                output_lines.append(line)
            else:
                # Multi-line format - collect continuation
                combined = line
                j = i + 1
                while j < len(lines) and '正确答案' not in combined:
                    next_line = lines[j].strip()
                    if not next_line or next_line.startswith('第') or '学科：' in next_line:
                        break
                    combined += ' ' + next_line
                    j += 1
                output_lines.append(combined)
                i = j - 1

        i += 1

    return '\n'.join(output_lines)


def parse_pdf_to_unified_markdown(pdf_path: str, output_path: str):
    """Parse PDF and output unified markdown format."""
    print(f"Parsing {pdf_path}...")

    # Extract text with layout
    raw_text = extract_text_from_pdf(pdf_path)

    # Detect grade from filename
    grade_match = re.search(r'G[1-5]', pdf_path)
    grade = grade_match.group(0) if grade_match else ''

    # Clean and format
    cleaned = clean_and_format_text(raw_text)

    # Reformat questions
    formatted = reformat_questions_section(cleaned, grade)

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
            parse_pdf_to_unified_markdown(str(pdf_file), str(md_file))

    print("\nDone! G2-G5 markdown files regenerated.")


if __name__ == '__main__':
    main()
