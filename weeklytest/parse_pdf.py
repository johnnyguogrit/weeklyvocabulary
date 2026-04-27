#!/usr/bin/env python3
"""
Re-parse PDF vocabulary files to clean markdown format.
Handles G2-G5 vocabulary test PDFs with unified output format.
"""

import fitz  # PyMuPDF
import re
import json
from pathlib import Path
from typing import List, Dict, Tuple

# Control character to space mapping
CONTROL_CHARS = {
    '\x00': ' ', '\x01': ' ', '\x02': ' ', '\x03': ' ', '\x04': ' ',
    '\x05': ' ', '\x06': ' ', '\x07': ' ', '\x08': ' ', '\x0b': ' ',
    '\x0c': ' ', '\x0e': ' ', '\x0f': ' ', '\x10': ' ', '\x11': ' ',
    '\x12': ' ', '\x13': ' ', '\x14': ' ', '\x15': ' ', '\x16': ' ',
    '\x17': ' ', '\x18': ' ', '\x19': ' ', '\x1a': ' ', '\x1b': ' ',
    '\x1c': ' ', '\x1d': ' ', '\x1e': ' ', '\x1f': ' ', '\x7f': ' ',
}

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
    """Extract text from PDF using PyMuPDF."""
    doc = fitz.open(pdf_path)
    text = ""
    for page in doc:
        text += page.get_text()
    doc.close()
    return text


def clean_text(text: str) -> str:
    """Clean control characters and normalize text."""
    # Replace control characters with spaces
    for ctrl, space in CONTROL_CHARS.items():
        text = text.replace(ctrl, space)

    # Remove soft hyphens
    text = text.replace('\xad', '')

    # Normalize whitespace
    text = re.sub(r'\s+', ' ', text)

    # Fix common issues
    text = text.replace('题⼲', '题干')  # Kangxi radical to regular
    text = text.replace('题干干', '题干')
    text = text.replace('选項', '选项')
    text = text.replace('题⽂本', '阅读文本')
    text = text.replace('阅读⽂本', '阅读文本')
    text = text.replace('阅读⽂本', '阅读文本')

    return text


def detect_grade_and_subject(text: str) -> Tuple[str, str]:
    """Detect grade from text."""
    if 'G1' in text or '一年级' in text:
        return 'G1'
    elif 'G2' in text or '二年级' in text:
        return 'G2'
    elif 'G3' in text or '三年级' in text:
        return 'G3'
    elif 'G4' in text or '四年级' in text:
        return 'G4'
    elif 'G5' in text or '五年级' in text:
        return 'G5'
    return ''


def parse_subject_section(text: str, start_idx: int, subject: str) -> Tuple[List[Dict], int]:
    """Parse a subject section and return list of questions with new end index."""
    questions = []
    lines = text.split('\n')
    i = start_idx
    current_week = None
    current_keywords = []

    while i < len(lines):
        line = lines[i].strip()

        # Check for new subject
        found_subject = None
        for cn_name, en_name in SUBJECT_MAP.items():
            if f'学科：{cn_name}' in line or f'学科：{en_name}' in line:
                found_subject = en_name
                break

        if found_subject and found_subject != subject:
            # End of current subject
            break

        # Check for week header
        week_match = re.match(r'第(\d+)周\s*(?:\(([^)]*)\))?', line)
        if week_match:
            current_week = int(week_match.group(1))
            keywords_str = week_match.group(2) or ''
            current_keywords = [k.strip() for k in keywords_str.split(',') if k.strip()]
            i += 1
            continue

        # Check for question line: keyword - 题干：...
        if line and re.match(r'^[a-zA-Z][a-zA-Z\s]*\s*-\s*题干', line):
            question_data = parse_question_line(line, i, lines, current_week, current_keywords)
            if question_data:
                questions.append(question_data)

        i += 1

    return questions, i


def parse_question_line(line: str, line_idx: int, all_lines: List[str], week: int, keywords: List[str]) -> Dict:
    """Parse a single question line and its continuation."""
    # Extract keyword
    keyword_match = re.match(r'^([a-zA-Z][a-zA-Z\s\-]*)\s*-\s*题干[：:]', line)
    if not keyword_match:
        return None

    keyword = keyword_match.group(1).strip()

    # Extract question text
    question_match = re.search(r'题干[：:]\s*(.+?)\s*选项[：:]', line)
    question = question_match.group(1).strip() if question_match else ''

    # Extract options and answer - need to look at continuation lines
    options = []
    answer = ''
    explanation = ''

    # Check if options are on the same line
    opts_end_match = re.search(r'正确答案[：:]\s*([ABCD])', line)

    if opts_end_match:
        # Single-line format (G2)
        answer = opts_end_match.group(1)
        opts_text = line[:opts_end_match.start()].strip()

        # Extract options from 选项：... to 正确答案：
        opts_section_match = re.search(r'选项[：:]\s*(.+)', opts_text)
        if opts_section_match:
            opts_str = opts_section_match.group(1).strip()
            # Parse A) xxx B) xxx C) xxx D) xxx
            option_pattern = r'([ABCD])\)\s*([^A]+?)(?=\s*[ABCD]\)\s*|$)'
            matches = re.findall(option_pattern, opts_str)
            options = [m[1].strip() for m in matches if m[1].strip()]

        # Extract explanation
        exp_match = re.search(r'(?:\(|（)?解析[：:]\s*(.+?)(?:\)|）)?$', line)
        if exp_match:
            explanation = exp_match.group(1).strip()
    else:
        # Multi-line format - look at next lines
        j = line_idx + 1
        combined_line = line

        while j < len(all_lines):
            next_line = all_lines[j].strip()
            if not next_line or next_line.startswith('第') or '学科：' in next_line:
                break

            combined_line += ' ' + next_line

            # Check if we now have the complete question
            opts_end_match = re.search(r'正确答案[：:]\s*([ABCD])', combined_line)
            if opts_end_match:
                answer = opts_end_match.group(1)
                opts_text = combined_line[:opts_end_match.start()].strip()

                # Check format
                if opts_text.startswith('A)'):
                    # Format: A) xxx B) xxx C) xxx D) xxx
                    option_pattern = r'([ABCD])\)\s*([^A]+?)(?=\s*[ABCD]\)\s*|$)'
                    matches = re.findall(option_pattern, opts_text)
                    options = [m[1].strip() for m in matches if m[1].strip()]
                else:
                    # Format: xxx B) xxx C) xxx D) xxx (A is missing prefix)
                    parts = opts_text.split()
                    if parts:
                        # First word is option A
                        options = [parts[0]]
                        # Then parse B) C) D)
                        for m in re.finditer(r'([BCD])\)\s*(\S+)', opts_text):
                            options.append(m.group(2))

                # Extract explanation
                exp_match = re.search(r'(?:\(|（)?解析[：:]\s*(.+?)(?:\)|）)?$', combined_line)
                if exp_match:
                    explanation = exp_match.group(1).strip()

                break

            j += 1

    # Determine keyword
    if keywords and len(keywords) > 0:
        kw_idx = 0
        # Try to find keyword in the list
        for idx, kw in enumerate(keywords):
            if kw.lower() in keyword.lower() or keyword.lower() in kw.lower():
                kw_idx = idx
                break
        final_keyword = keywords[kw_idx] if kw_idx < len(keywords) else keyword
    else:
        final_keyword = keyword

    return {
        'week': week,
        'keyword': final_keyword,
        'question': question,
        'options': options,
        'answer': answer,
        'explanation': explanation,
    }


def parse_pdf_to_markdown(pdf_path: str, output_path: str):
    """Parse PDF and output clean markdown."""
    print(f"Parsing {pdf_path}...")

    # Extract text
    raw_text = extract_text_from_pdf(pdf_path)

    # Clean text
    clean = clean_text(raw_text)

    # Detect grade
    grade = detect_grade_and_subject(clean)
    if not grade:
        print(f"  Warning: Could not detect grade for {pdf_path}")
        grade = Path(pdf_path).stem.split()[0]

    # Write output with proper formatting
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(f"{grade} Subject Vocabulary 2025-2026\n\n")
        f.write(clean)

    print(f"  Generated {output_path}")


def main():
    """Process all PDF files in the weeklytest directory."""
    base_dir = Path("D:/AIDevelop/ClaudeDev/weeklyvocabulary/weeklytest")

    pdf_files = sorted(base_dir.glob("G*.pdf"))

    for pdf_file in pdf_files:
        md_file = pdf_file.with_suffix('.md')
        parse_pdf_to_markdown(str(pdf_file), str(md_file))

    print("\nDone! All PDF files have been re-parsed.")


if __name__ == '__main__':
    main()
