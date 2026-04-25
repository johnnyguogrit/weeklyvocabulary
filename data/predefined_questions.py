"""
Predefined questions for Weekly Vocabulary Learning App
Auto-generated from predefinedQuestions.ts

This file contains G1 predefined questions parsed from markdown files.
For G2-G5, questions are auto-generated using question_generator.py
"""

from typing import Dict, List, Any

# Predefined questions structure: {grade: {subject: {week: [questions]}}}
# Each question has: week, keyword, question, options[], answer, explanation, passage?

PREDEFINED_QUESTIONS: Dict[str, Dict[str, Dict[int, List[Dict[str, Any]]]]] = {}

# For now, this is a placeholder
# The full predefined questions from G1 would be imported here
# Due to the large size, questions are auto-generated for most grades/subjects

def get_predefined_questions(grade: str, subject: str, week: int) -> List[Dict[str, Any]]:
    """Get predefined questions for a specific grade, subject, and week."""
    return PREDEFINED_QUESTIONS.get(grade, {}).get(subject, {}).get(week, [])


def has_predefined_questions(grade: str, subject: str) -> bool:
    """Check if there are predefined questions for a grade and subject."""
    return grade in PREDEFINED_QUESTIONS and subject in PREDEFINED_QUESTIONS[grade]
