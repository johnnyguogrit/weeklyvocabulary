#!/usr/bin/env python3
"""
Fix markdown files by replacing zero-width spaces with proper newlines.
Converts the format from markitdown tool to a parser-friendly format.
"""

import re
from pathlib import Path

def fix_markdown_file(md_path: str):
    """Fix markdown file format."""
    print(f"Fixing {md_path}...")

    with open(md_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace zero-width spaces with newlines before new questions
    # Pattern: (space after closing paren)ZWSP(keyword - 题干：)
    content = re.sub(r'\)​([a-zA-Z])', r')\n\\1', content)

    # Also handle the case where ZWSP separates other content
    content = content.replace('​', '\n')

    # Fix lines that have multiple questions - split them
    lines = content.split('\n')
    fixed_lines = []

    for line in lines:
        # Check if this line has multiple question patterns
        questions = re.findall(r'[a-zA-Z][a-zA-Z\s]*\s*-\s*题干[：:]', line)
        if len(questions) > 1:
            # Split this line into multiple question lines
            # Find each question start and split
            parts = re.split(r'(?=[a-zA-Z][a-zA-Z\s]*\s*-\s*题干[：:])', line)
            for part in parts:
                if part.strip():
                    fixed_lines.append(part.strip())
        else:
            fixed_lines.append(line)

    fixed_content = '\n'.join(fixed_lines)

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
