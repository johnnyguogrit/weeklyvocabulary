"""
Quiz Page - Weekly Vocabulary Learning App
Interactive quiz for vocabulary learning
"""

import streamlit as st
import sys
import os
import random

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import (
    get_user_progress,
    save_quiz_attempt
)

from data.vocabulary_data import (
    GRADE_CONFIG,
    SUBJECT_CONFIG,
    WEEK_NAMES,
    get_grades,
    get_subjects,
    get_weeks_for_grade_subject,
    get_keywords_for_week,
    DIFFICULTY_CONFIG
)

# Page config
st.set_page_config(
    page_title="Quiz - Vocabulary Adventure",
    page_icon="🎯",
    layout="centered"
)

# Custom CSS
st.markdown("""
<style>
    .quiz-question {
        padding: 1.5rem;
        border-radius: 0.5rem;
        background: #f8f9fa;
        margin: 1rem 0;
    }
    .quiz-option {
        padding: 1rem;
        margin: 0.5rem 0;
        border: 2px solid #ddd;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;
    }
    .quiz-option:hover {
        background-color: #e9ecef;
        border-color: #adb5bd;
    }
    .quiz-option.correct {
        background-color: #d4edda;
        border-color: #28a745;
    }
    .quiz-option.incorrect {
        background-color: #f8d7da;
        border-color: #dc3545;
    }
    .score-display {
        text-align: center;
        padding: 1rem;
        border-radius: 0.5rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 1.5rem;
    }
</style>
""", unsafe_allow_html=True)


def check_auth():
    """Check if user is authenticated"""
    if not st.session_state.get('user'):
        st.error("Please login first")
        st.switch_page("pages/2_👨‍🎓_Student_Login.py")


def generate_question(keyword, grade, subject):
    """Generate a quiz question for a keyword"""
    # Simple question templates
    templates = [
        f"What does '{keyword}' mean?",
        f"Which definition best describes '{keyword}'?",
        f"In the context of {subject}, what is '{keyword}'?",
    ]

    # Generate options (1 correct + 3 distractors)
    correct_answer = f"The meaning of {keyword}"

    # Distractors (generic for now)
    distractors = [
        f"Something unrelated A",
        f"Something unrelated B",
        f"Something unrelated C"
    ]

    options = [correct_answer] + distractors
    random.shuffle(options)

    return {
        'question': random.choice(templates),
        'options': options,
        'correct_answer': correct_answer,
        'keyword': keyword
    }


def show_quiz_setup():
    """Display quiz setup screen"""
    st.title("🎯 Vocabulary Quiz")
    st.markdown("---")

    user = st.session_state.get('user', {})
    st.markdown(f"### 👋 Welcome, {user.get('full_name', 'Student')}!")

    st.markdown("Choose your quiz settings:")

    # Grade selection
    grade = st.selectbox(
        "Select Grade",
        options=get_grades(),
        format_func=lambda x: f"{GRADE_CONFIG[x]['emoji']} {GRADE_CONFIG[x]['name']}"
    )

    # Subject selection
    subjects = get_subjects()
    subject = st.selectbox(
        "Select Subject",
        options=subjects,
        format_func=lambda x: f"{SUBJECT_CONFIG[x]['emoji']} {SUBJECT_CONFIG[x]['name']}"
    )

    # Week selection
    weeks = get_weeks_for_grade_subject(grade, subject)
    if not weeks:
        st.warning(f"No weeks available for {grade} {subject}")
        return

    week = st.selectbox(
        "Select Week",
        options=weeks,
        format_func=lambda x: f"Week {x}: {WEEK_NAMES.get(int(x), 'Unknown')}"
    )

    # Difficulty selection
    difficulty = st.selectbox(
        "Select Difficulty",
        options=list(DIFFICULTY_CONFIG.keys()),
        format_func=lambda x: f"{DIFFICULTY_CONFIG[x]['emoji']} {DIFFICULTY_CONFIG[x]['label']}"
    )

    # Show keywords for selected week
    keywords = get_keywords_for_week(grade, subject, week)
    if keywords:
        st.markdown(f"**Keywords this week:** {', '.join(keywords)}")

    # Start quiz button
    if st.button("🚀 Start Quiz", type="primary", use_container_width=True):
        # Generate questions
        questions = []
        for keyword in keywords:
            q = generate_question(keyword, grade, subject)
            questions.append(q)

        st.session_state.quiz_questions = questions
        st.session_state.current_question = 0
        st.session_state.answers = []
        st.session_state.quiz_grade = grade
        st.session_state.quiz_subject = subject
        st.session_state.quiz_week = week
        st.session_state.quiz_difficulty = difficulty
        st.rerun()


def show_quiz_question():
    """Display current quiz question"""
    questions = st.session_state.quiz_questions
    current_idx = st.session_state.current_question
    question = questions[current_idx]

    # Progress bar
    progress = (current_idx) / len(questions)
    st.progress(progress)

    st.markdown(f"### Question {current_idx + 1} of {len(questions)}")

    # Question
    st.markdown(f"""
    <div class="quiz-question">
        {question['question']}
    </div>
    """, unsafe_allow_html=True)

    # Options
    for i, option in enumerate(question['options']):
        if st.button(option, key=f"option_{i}", use_container_width=True):
            # Record answer
            is_correct = (option == question['correct_answer'])
            st.session_state.answers.append({
                'question': question['question'],
                'selected': option,
                'correct': question['correct_answer'],
                'is_correct': is_correct
            })

            # Show feedback
            if is_correct:
                st.success("✅ Correct!")
            else:
                st.error(f"❌ Incorrect. The answer was: {question['correct_answer']}")

            # Next question or finish
            st.session_state.current_question += 1
            import time
            time.sleep(0.5)
            st.rerun()


def show_quiz_results():
    """Display quiz results"""
    answers = st.session_state.answers
    correct = sum(1 for a in answers if a['is_correct'])
    total = len(answers)
    score = int((correct / total * 100)) if total > 0 else 0

    st.markdown("---")
    st.markdown(f"""
    <div class="score-display">
        <h2>🎉 Quiz Complete!</h2>
        <p>Your Score: {score}% ({correct}/{total})</p>
    </div>
    """, unsafe_allow_html=True)

    # Save to database
    if st.session_state.get('user'):
        try:
            save_quiz_attempt(
                user_id=st.session_state.user['id'],
                grade=st.session_state.quiz_grade,
                subject=st.session_state.quiz_subject,
                week_id=int(st.session_state.quiz_week),
                difficulty=st.session_state.quiz_difficulty,
                total_score=float(score),
                max_score=100.0,
                questions_correct=correct,
                questions_total=total
            )
        except Exception as e:
            st.warning(f"Could not save progress: {e}")

    # Answer review
    st.markdown("### 📝 Answer Review")
    for i, answer in enumerate(answers, 1):
        status = "✅" if answer['is_correct'] else "❌"
        st.markdown(f"{status} **Q{i}:** {answer['question']}")
        st.markdown(f"   Your answer: {answer['selected']}")
        if not answer['is_correct']:
            st.markdown(f"   Correct answer: {answer['correct']}")
        st.markdown("---")

    # Buttons
    col1, col2 = st.columns(2)
    with col1:
        if st.button("🔄 Try Again", use_container_width=True):
            # Clear quiz state
            for key in ['quiz_questions', 'current_question', 'answers',
                       'quiz_grade', 'quiz_subject', 'quiz_week', 'quiz_difficulty']:
                if key in st.session_state:
                    del st.session_state[key]
            st.rerun()

    with col2:
        if st.button("📊 View Progress", use_container_width=True):
            st.switch_page("pages/5_📊_Progress.py")


def show_quiz():
    """Main quiz page"""
    check_auth()

    # Check if quiz is in progress
    if 'quiz_questions' not in st.session_state:
        show_quiz_setup()
    elif st.session_state.current_question < len(st.session_state.quiz_questions):
        show_quiz_question()
    else:
        show_quiz_results()

    # Logout button
    if st.button("← Back to Home", use_container_width=True):
        st.switch_page("pages/0_🏠_Home.py")


if __name__ == "__main__":
    show_quiz()
