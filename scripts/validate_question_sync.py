#!/usr/bin/env python3
"""
Validate that predefined questions are consistent between React and Streamlit apps.

This script checks:
1. That predefined_questions.py exists and is valid
2. That question counts match between apps
3. That each grade/subject has the expected number of weeks

Usage:
    python scripts/validate_question_sync.py
"""

import sys
from pathlib import Path

# Add parent directory to path
sys.path.insert(0, str(Path(__file__).parent.parent))

from data.predefined_questions import (
    PREDEFINED_QUESTIONS,
    get_all_grades,
    get_subjects_for_grade
)

# TypeScript file path
TS_FILE = Path(__file__).parent.parent / "app" / "src" / "data" / "predefinedQuestions.ts"


def count_ts_questions() -> dict:
    """Count questions in TypeScript file"""
    with open(TS_FILE, 'r', encoding='utf-8') as f:
        content = f.read()

    # Count question objects using regex
    # Each question has: week: number
    import re
    week_matches = re.findall(r'week\s*:\s*\d+', content)
    return len(week_matches)


def validate_explanation_sync():
    """Validate that explanations match their questions"""
    print("\n" + "=" * 60)
    print("Question-Explanation Sync Validation")
    print("=" * 60)
    print()

    total_questions = 0
    total_issues = 0
    issue_details = []

    for grade in sorted(PREDEFINED_QUESTIONS.keys()):
        print(f"\n{grade}:")
        grade_data = PREDEFINED_QUESTIONS[grade]

        for subject in sorted(grade_data.keys()):
            subject_data = grade_data[subject]
            subject_issues = 0

            for week in sorted(subject_data.keys()):
                questions = subject_data[week]

                for i, q in enumerate(questions):
                    total_questions += 1

                    # Get answer text from letter
                    options = q.get('options', [])
                    answer_letter = q.get('answer', 'A').upper()
                    answer_idx = ord(answer_letter) - ord('A')

                    if 0 <= answer_idx < len(options):
                        correct_answer = options[answer_idx]
                    else:
                        subject_issues += 1
                        total_issues += 1
                        issue_details.append({
                            'grade': grade,
                            'subject': subject,
                            'week': week,
                            'q_index': i,
                            'issue': f"Invalid answer index: {answer_letter}",
                            'question': q['question'][:50]
                        })
                        continue

                    # Get explanation
                    explanation = q.get('explanation', '')
                    if not explanation:
                        subject_issues += 1
                        total_issues += 1
                        issue_details.append({
                            'grade': grade,
                            'subject': subject,
                            'week': week,
                            'q_index': i,
                            'issue': "No explanation",
                            'question': q['question'][:50],
                            'answer': correct_answer
                        })
                        continue

                    # Extract first sentence (before Chinese period or bullet)
                    first_sentence = explanation.split('。')[0] if '。' in explanation else explanation.split('.')[0]

                    # Check if first sentence contains the correct answer
                    if correct_answer.lower() not in first_sentence.lower():
                        subject_issues += 1
                        total_issues += 1
                        issue_details.append({
                            'grade': grade,
                            'subject': subject,
                            'week': week,
                            'q_index': i,
                            'issue': f"Explanation doesn't mention answer '{correct_answer}'",
                            'question': q['question'][:50],
                            'answer': correct_answer,
                            'first_sentence': first_sentence[:80]
                        })

            if subject_issues > 0:
                print(f"  {subject}: {subject_issues} issues found")
            else:
                print(f"  {subject}: OK")

    print()
    print(f"Total questions checked: {total_questions}")
    print(f"Total issues found: {total_issues}")

    if issue_details:
        print("\n--- ISSUE DETAILS (first 20) ---")
        for detail in issue_details[:20]:  # Show first 20
            print(f"\n{detail['grade']}/{detail['subject']}/Week {detail['week']}/Q{detail.get('q_index', '?')+1}")
            for key, value in detail.items():
                if key not in ['grade', 'subject', 'week', 'q_index']:
                    # Safe string handling for Windows console
                    try:
                        print(f"  {key}: {value}")
                    except UnicodeEncodeError:
                        print(f"  {key}: [encoding error - see file]")
                    except Exception as e:
                        print(f"  {key}: [error: {e}]")

        if len(issue_details) > 20:
            print(f"\n... and {len(issue_details) - 20} more issues")

        # Save to file
        issues_file = Path(__file__).parent.parent / 'question_explanation_issues.txt'
        with open(issues_file, 'w', encoding='utf-8') as f:
            for detail in issue_details:
                f.write(f"\n{detail['grade']}/{detail['subject']}/Week {detail['week']}/Q{detail.get('q_index', '?')+1}\n")
                for key, value in detail.items():
                    if key not in ['grade', 'subject', 'week', 'q_index']:
                        f.write(f"  {key}: {value}\n")
        print(f"\nIssue details saved to: question_explanation_issues.txt")

    return total_issues == 0


def validate_sync():
    """Validate question sync between apps"""
    print("=" * 60)
    print("Question Sync Validation")
    print("=" * 60)
    print()

    # Check Python file
    print(f"Python file: data/predefined_questions.py")
    py_total = 0
    for grade, subjects in PREDEFINED_QUESTIONS.items():
        for subject, weeks in subjects.items():
            for week, questions in weeks.items():
                py_total += len(questions)

    print(f"  Total questions: {py_total}")
    print(f"  Grades: {sorted(PREDEFINED_QUESTIONS.keys())}")
    print()

    # Check TypeScript file
    print(f"TypeScript file: app/src/data/predefinedQuestions.ts")
    ts_total = count_ts_questions()
    print(f"  Total question markers found: {ts_total}")
    print()

    # Compare
    print("Comparison:")
    if ts_total == py_total:
        print(f"  [OK] Question counts match: {ts_total}")
    else:
        print(f"  [WARNING] Mismatch: TS={ts_total}, Python={py_total}")
        print(f"      Difference: {abs(ts_total - py_total)} questions")
    print()

    # Detailed breakdown
    print("Detailed breakdown (Python data):")
    for grade in sorted(PREDEFINED_QUESTIONS.keys()):
        subjects = PREDEFINED_QUESTIONS[grade]
        print(f"\n  {grade}:")
        for subject in sorted(subjects.keys()):
            weeks = subjects[subject]
            total_q = sum(len(q) for q in weeks.values())
            print(f"    {subject}: {total_q} questions in {len(weeks)} week(s)")

    print()
    print("=" * 60)

    # Return exit code based on match
    return 0 if ts_total == py_total else 1


if __name__ == "__main__":
    # Run both validations
    sync_ok = validate_sync() == 0
    expl_ok = validate_explanation_sync()

    print("\n" + "=" * 60)
    print("FINAL RESULT")
    print("=" * 60)
    print(f"Question count sync: {'PASS' if sync_ok else 'FAIL'}")
    print(f"Question-Explanation sync: {'PASS' if expl_ok else 'FAIL'}")
    print("=" * 60)

    sys.exit(0 if (sync_ok and expl_ok) else 1)
