#!/usr/bin/env python3
"""
Parse PDF files using pdfplumber with layout-aware text extraction.
Creates properly formatted markdown files.
"""

import pdfplumber
import re
from pathlib import Path


def extract_text_with_layout(pdf_path: str) -> str:
    """Extract text from PDF preserving layout as much as possible."""
    text_parts = []

    with pdfplumber.open(pdf_path) as pdf:
        for page_num, page in enumerate(pdf.pages):
            # Get text with x tolerance to help join nearby text
            text = page.extract_text(x_tolerance=2, y_tolerance=2)

            if text:
                text_parts.append(text)

    return "\n".join(text_parts)


def clean_and_format(raw_text: str, grade: str) -> str:
    """Clean and format the extracted text into markdown."""
    # Remove control characters
    text = re.sub(r'[\x00-\x08\x0b-\x0c\x0e-\x1f\x7f]', ' ', raw_text)

    # Fix common character issues
    replacements = {
        '题⼲': '题干',
        '题干干': '题干',
        '选項': '选项',
        '题⽂本': '阅读文本',
        '阅读⽂本': '阅读文本',
    }
    for old, new in replacements.items():
        text = text.replace(old, new)

    # Normalize whitespace but preserve newlines
    lines = text.split('\n')
    formatted_lines = []

    for line in lines:
        # Remove leading/trailing spaces
        line = line.strip()

        # Skip empty lines
        if not line:
            continue

        formatted_lines.append(line)

    return "\n".join(formatted_lines)


def parse_pdf_to_markdown(pdf_path: str, output_path: str, grade: str):
    """Parse PDF and output clean markdown."""
    print(f"Parsing {grade}...")

    # Extract text with layout
    raw_text = extract_text_with_layout(pdf_path)

    # Clean and format
    formatted = clean_and_format(raw_text, grade)

    # Add header
    output = f"{grade} Subject Vocabulary 2025-2026\n\n{formatted}"

    # Write output
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(output)

    print(f"  Generated {output_path}")


def main():
    """Process G2-G5 PDF files using pdfplumber."""
    base_dir = Path("D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest")

    for grade in ['G2', 'G3', 'G4', 'G5']:
        pdf_file = base_dir / f"{grade} Subject Vocabulary 2025-2026.pdf"
        md_file = base_dir / f"{grade} Subject Vocabulary 2025-2026.md"

        if pdf_file.exists():
            parse_pdf_to_markdown(str(pdf_file), str(md_file), grade)

    print("\nDone! PDFs re-parsed with pdfplumber.")


if __name__ == '__main__':
    main()
