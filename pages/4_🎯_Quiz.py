"""
Quiz Page - Weekly Vocabulary Learning App
Interactive quiz for vocabulary learning
Enhanced version with animations, points system, and better UX
"""

import streamlit as st
import sys
import os
import random
import time
from datetime import datetime

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

from data.question_generator import (
    generate_questions,
    generate_passage,
    get_subject_data
)

from data.predefined_questions import (
    PREDEFINED_QUESTIONS,
    get_predefined_questions
)

from data.translations import (
    get_translation,
    TRANSLATIONS
)

# Page config
st.set_page_config(
    page_title="Quiz - Vocabulary Adventure",
    page_icon="🎯",
    layout="centered"
)

# Enhanced CSS with animations
st.markdown("""
<style>
    /* Main container styling */
    .main-header {
        text-align: center;
        padding: 2rem 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 1rem;
        margin-bottom: 1.5rem;
        color: white;
    }

    /* Question card with animations */
    .quiz-question {
        padding: 2rem;
        border-radius: 1rem;
        background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
        margin: 1rem 0;
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        animation: slideIn 0.3s ease-out;
        border: 2px solid #e0e0e0;
    }

    @keyframes slideIn {
        from {
            opacity: 0;
            transform: translateX(20px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }

    /* Enhanced option buttons */
    .quiz-option {
        padding: 1.25rem 1.5rem;
        margin: 0.75rem 0;
        border: 3px solid #e0e0e0;
        border-radius: 1rem;
        cursor: pointer;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        background: white;
        font-weight: 600;
        font-size: 1.05rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .quiz-option:hover {
        background: linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%);
        border-color: #42a5f5;
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(66, 165, 245, 0.3);
    }

    .quiz-option.selected {
        background: linear-gradient(135deg, #bbdefb 0%, #90caf9 100%);
        border-color: #1565c0;
        box-shadow: 0 4px 15px rgba(21, 83, 192, 0.3);
    }

    .quiz-option.correct {
        background: linear-gradient(135deg, #c8e6c9 0%, #a5d6a7 100%);
        border-color: #4caf50;
        animation: pulseSuccess 0.5s ease-out;
    }

    .quiz-option.incorrect {
        background: linear-gradient(135deg, #ffcdd2 0%, #ef9a9a 100%);
        border-color: #f44336;
        animation: shake 0.5s ease-out;
    }

    @keyframes pulseSuccess {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.02); }
    }

    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        20% { transform: translateX(-8px); }
        40% { transform: translateX(8px); }
        60% { transform: translateX(-8px); }
        80% { transform: translateX(8px); }
    }

    /* Animated timer bar */
    .timer-container {
        width: 100%;
        height: 12px;
        background: #e0e0e0;
        border-radius: 10px;
        overflow: hidden;
        margin: 1rem 0;
        box-shadow: inset 0 2px 4px rgba(0,0,0,0.1);
    }

    .timer-bar {
        height: 100%;
        border-radius: 10px;
        transition: width 0.3s linear, background-color 0.3s ease;
    }

    .timer-bar.green { background: linear-gradient(90deg, #66bb6a 0%, #4caf50 100%); }
    .timer-bar.yellow { background: linear-gradient(90deg, #ffca28 0%, #ffa000 100%); }
    .timer-bar.red { background: linear-gradient(90deg, #ef5350 0%, #f44336 100%); }

    /* Lives display */
    .lives-container {
        display: flex;
        justify-content: center;
        gap: 0.5rem;
        margin: 1rem 0;
        font-size: 1.5rem;
    }

    .heart {
        animation: heartbeat 1s ease-in-out infinite;
    }

    @keyframes heartbeat {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.1); }
    }

    /* Score display */
    .score-display {
        text-align: center;
        padding: 1.5rem;
        border-radius: 1rem;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        font-size: 1.75rem;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        animation: scorePop 0.5s ease-out;
    }

    @keyframes scorePop {
        0% { transform: scale(0.8); opacity: 0; }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); opacity: 1; }
    }

    /* Points badge */
    .points-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        background: linear-gradient(135deg, #ffa726 0%, #ff9800 100%);
        color: white;
        border-radius: 2rem;
        font-weight: bold;
        box-shadow: 0 2px 10px rgba(255, 152, 0, 0.4);
    }

    /* Speed bonus notification */
    .speed-bonus {
        background: linear-gradient(135deg, #ffca28 0%, #ffa000 100%);
        color: white;
        padding: 0.75rem 1.5rem;
        border-radius: 0.75rem;
        font-weight: bold;
        text-align: center;
        margin: 0.5rem 0;
        animation: bonusPop 0.5s ease-out;
    }

    @keyframes bonusPop {
        0% { transform: scale(0); }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); }
    }

    /* Explanation box */
    .explanation-box {
        padding: 1.25rem;
        border-radius: 0.75rem;
        margin: 1rem 0;
        border-left: 5px solid;
        animation: fadeIn 0.3s ease-out;
    }

    .explanation-box.correct {
        background: #e8f5e9;
        border-color: #4caf50;
    }

    .explanation-box.incorrect {
        background: #ffebee;
        border-color: #f44336;
    }

    @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
    }

    /* Passage box */
    .passage-box {
        padding: 2rem;
        border-radius: 1rem;
        background: linear-gradient(145deg, #fff8e1 0%, #ffecb3 100%);
        border-left: 5px solid #ffc107;
        margin: 1.5rem 0;
        line-height: 1.8;
        box-shadow: 0 4px 15px rgba(255, 193, 7, 0.2);
    }

    /* Keyword highlight */
    .keyword-highlight {
        background-color: #fff59d;
        padding: 0.25rem 0.75rem;
        border-radius: 0.5rem;
        font-weight: bold;
        box-shadow: 0 1px 3px rgba(0,0,0,0.1);
    }

    /* Week complete celebration */
    .celebration {
        text-align: center;
        padding: 3rem 2rem;
        animation: celebrate 0.6s ease-out;
    }

    @keyframes celebrate {
        0% { transform: scale(0.5); opacity: 0; }
        70% { transform: scale(1.1); }
        100% { transform: scale(1); opacity: 1; }
    }

    /* Keyword badges */
    .keyword-badge {
        display: inline-block;
        padding: 0.5rem 1rem;
        margin: 0.25rem;
        background: rgba(103, 126, 234, 0.1);
        color: #667eea;
        border-radius: 1.5rem;
        font-weight: 600;
        font-size: 0.9rem;
    }

    /* Progress bar enhancement */
    .progress-container {
        margin: 1rem 0;
    }

    /* Confetti animation */
    .confetti {
        position: fixed;
        width: 10px;
        height: 10px;
        background: #f00;
        animation: fall 3s linear forwards;
    }

    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
        }
    }
</style>
""", unsafe_allow_html=True)


def check_auth():
    """Check if user is authenticated"""
    if not st.session_state.get('user'):
        st.error("Please login first")
        st.switch_page("pages/2_👨‍🎓_Student_Login.py")


def check_teacher_mode():
    """Check if teacher is practicing (no scoring)"""
    return st.session_state.get('user_role') == 'teacher'


def show_quiz_setup():
    """Display quiz setup screen"""
    is_teacher = check_teacher_mode()

    # Header
    st.markdown(f"""
    <div class="main-header">
        <h1 style="margin: 0; font-size: 2.5rem;">🎯 Vocabulary Adventure Quiz</h1>
        <p style="margin: 0.5rem 0 0 0; opacity: 0.9;">
            {"👨‍🏫 Teacher Practice Mode" if is_teacher else "👋 Test your vocabulary knowledge!"}
        </p>
    </div>
    """, unsafe_allow_html=True)

    if not is_teacher:
        user = st.session_state.get('user', {})
        st.markdown(f"### Welcome, **{user.get('full_name', 'Student')}**! 🌟")

    st.markdown("---")

    # Selection in columns
    col1, col2 = st.columns(2)

    with col1:
        # Grade selection
        grade = st.selectbox(
            "📚 Select Grade",
            options=get_grades(),
            format_func=lambda x: f"{GRADE_CONFIG[x]['emoji']} {GRADE_CONFIG[x]['name']}",
            key="setup_grade"
        )

        # Subject selection
        subjects = get_subjects()
        subject = st.selectbox(
            "📖 Select Subject",
            options=subjects,
            format_func=lambda x: f"{SUBJECT_CONFIG[x]['emoji']} {SUBJECT_CONFIG[x]['name']}",
            key="setup_subject"
        )

    with col2:
        # Week selection
        weeks = get_weeks_for_grade_subject(grade, subject)
        if not weeks:
            st.warning(f"No weeks available for {grade} {subject}")
            return

        week = st.selectbox(
            "📅 Select Week",
            options=weeks,
            format_func=lambda x: f"Week {x}: {WEEK_NAMES.get(int(x), 'Unknown')}",
            key="setup_week"
        )

        # Difficulty selection
        difficulty = st.selectbox(
            "⚡ Select Difficulty",
            options=list(DIFFICULTY_CONFIG.keys()),
            format_func=lambda x: f"{DIFFICULTY_CONFIG[x]['emoji']} {DIFFICULTY_CONFIG[x]['label']}",
            key="setup_difficulty"
        )

    # Show keywords for selected week
    keywords = get_keywords_for_week(grade, subject, week)
    if keywords:
        st.markdown("### 📝 Keywords this week:")
        keyword_html = " ".join([f'<span class="keyword-badge">{kw}</span>' for kw in keywords])
        st.markdown(keyword_html, unsafe_allow_html=True)

        # Sample translation
        trans = get_translation(keywords[0])
        if trans:
            st.info(f"💡 Sample: **{keywords[0]}** = {trans['cn']} ({trans['read']})")

    st.markdown("---")

    # Difficulty info
    diff_config = DIFFICULTY_CONFIG[difficulty]
    with st.expander(f"📋 {difficulty.title()} Mode Details"):
        st.markdown(f"""
        - **Timer**: {diff_config['timer']}s per question" if diff_config['timer'] > 0 else "- **Timer**: No limit"
        - **Hints**: {'✅ Available' if diff_config['hints'] else '❌ Not available'}
        - **Lives**: {'3 hearts (Hard mode!)' if difficulty == 'hard' else '∞ Unlimited'}
        - **Points**: {10 * (1 + (difficulty == 'hard'))} points per correct answer
        """)

    # Start quiz button
    if st.button("🚀 Start Quiz Adventure!", type="primary", use_container_width=True):
        # Use get_subject_data to prioritize predefined questions
        subject_data = get_subject_data(
            grade, subject,
            predefined_questions=PREDEFINED_QUESTIONS,
            translations=TRANSLATIONS
        )

        # Extract questions for the selected week
        week_data = next((w for w in subject_data['weeks'] if w['id'] == int(week)), None)
        if week_data and week_data.get('questions'):
            questions = week_data['questions']
        else:
            # Fallback to auto-generation if no predefined questions
            questions = generate_questions(keywords, int(week), subject)

        # Extract passage for the selected week
        passage = next((p for p in subject_data['passages'] if p['weekId'] == int(week)), None)
        if not passage:
            # Fallback to auto-generation if no predefined passage
            passage = generate_passage(keywords, subject, int(week))

        # Initialize quiz state
        st.session_state.quiz_questions = questions
        st.session_state.quiz_passage = passage
        st.session_state.current_question = 0
        st.session_state.answers = []
        st.session_state.quiz_grade = grade
        st.session_state.quiz_subject = subject
        st.session_state.quiz_week = week
        st.session_state.quiz_difficulty = difficulty
        st.session_state.show_passage = False  # Skip passage for now
        st.session_state.selected_option = None
        st.session_state.is_answered = False
        st.session_state.is_correct = False
        st.session_state.points = 0
        st.session_state.speed_bonuses = 0
        st.session_state.lives_remaining = 3 if difficulty == 'hard' else 999
        st.session_state.start_time = None
        st.rerun()


def show_quiz_question():
    """Display current quiz question with enhanced UX"""
    questions = st.session_state.quiz_questions
    current_idx = st.session_state.current_question
    question = questions[current_idx]
    difficulty = st.session_state.get('quiz_difficulty', 'easy')
    config = DIFFICULTY_CONFIG[difficulty]

    # Check for game over (lives)
    if difficulty == 'hard' and st.session_state.lives_remaining <= 0:
        show_game_over()
        return

    # Header with progress and score
    col1, col2, col3 = st.columns([2, 1, 1])
    with col1:
        st.markdown(f"### Question {current_idx + 1} of {len(questions)}")
    with col2:
        st.markdown(f'<div class="points-badge">⭐ {st.session_state.points} pts</div>', unsafe_allow_html=True)
    with col3:
        if difficulty == 'hard':
            hearts = "❤️" * st.session_state.lives_remaining + "🖤" * (3 - st.session_state.lives_remaining)
            st.markdown(f'<div class="lives-container">{hearts}</div>', unsafe_allow_html=True)

    # Progress bar
    st.markdown('<div class="progress-container">', unsafe_allow_html=True)
    progress = (current_idx) / len(questions)
    st.progress(progress)
    st.markdown('</div>', unsafe_allow_html=True)

    # Animated timer for medium/hard
    if config.timer > 0 and not st.session_state.is_answered:
        # Initialize timer if needed
        if 'time_remaining' not in st.session_state or st.session_state.get('question_id') != current_idx:
            st.session_state.time_remaining = config.timer
            st.session_state.question_id = current_idx
            st.session_state.start_time = time.time()

        # Calculate remaining time
        elapsed = time.time() - st.session_state.start_time
        st.session_state.time_remaining = max(0, config.timer - int(elapsed))

        # Determine color
        pct = st.session_state.time_remaining / config.timer
        color_class = 'green' if pct > 0.5 else 'yellow' if pct > 0.2 else 'red'

        st.markdown(f"""
        <div class="timer-container">
            <div class="timer-bar {color_class}" style="width: {pct * 100}%"></div>
        </div>
        <p style="text-align: center; color: #{'#4caf50' if pct > 0.5 else '#ffa000' if pct > 0.2 else '#f44336'}; font-weight: bold; margin: 0.5rem 0;">
            ⏱️ {st.session_state.time_remaining}s remaining
        </p>
        """, unsafe_allow_html=True)

        # Auto-fail if time runs out
        if st.session_state.time_remaining <= 0:
            handle_timeout()
            return

    # Question card
    st.markdown(f"""
    <div class="quiz-question">
        <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1rem;">
            <div style="width: 40px; height: 40px; border-radius: 50%; background: {SUBJECT_CONFIG[st.session_state.quiz_subject]['color']}; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">Q{current_idx + 1}</div>
            <span style="font-size: 1.5rem;">{SUBJECT_CONFIG[st.session_state.quiz_subject]['emoji']}</span>
        </div>
        <h3 style="color: #5D4037; margin: 0;">{question['question']}</h3>
    </div>
    """, unsafe_allow_html=True)

    # Options
    if not st.session_state.is_answered:
        st.markdown("### 📝 Select your answer:")
        for i, option in enumerate(question['options']):
            option_letter = chr(65 + i)
            is_selected = st.session_state.get('selected_option') == option

            col_a, col_b = st.columns([4, 1])
            with col_a:
                if st.button(
                    f"{option_letter}) {option}",
                    key=f"select_{current_idx}_{i}",
                    use_container_width=True,
                    disabled=st.session_state.is_answered,
                    **({"args": (option,)} if False else {})
                ):
                    st.session_state.selected_option = option
                    st.rerun()
            with col_b:
                if is_selected:
                    st.markdown("✅")

        # Check Answer button
        if st.session_state.get('selected_option'):
            col1, col2, col3 = st.columns([1, 2, 1])
            with col2:
                if st.button("✓ Check Answer", type="primary", use_container_width=True, key="check_answer"):
                    submit_answer(question)
    else:
        # Show results after answering
        is_correct = st.session_state.is_correct
        selected = st.session_state.selected_option

        for i, option in enumerate(question['options']):
            option_letter = chr(65 + i)
            is_correct_answer = option == question['correctAnswer']
            is_selected_answer = option == selected

            # Determine styling
            if is_correct_answer:
                bg_class = "correct"
                icon = "✅"
            elif is_selected_answer and not is_correct:
                bg_class = "incorrect"
                icon = "❌"
            else:
                bg_class = ""
                icon = ""

            st.markdown(f"""
            <div class="quiz-option {bg_class}">
                <span>{option_letter}) {option}</span>
                <span>{icon}</span>
            </div>
            """, unsafe_allow_html=True)

        # Explanation
        explanation = question.get('explanation', 'Great job!')
        st.markdown(f"""
        <div class="explanation-box {'correct' if is_correct else 'incorrect'}">
            <p style="margin: 0; font-weight: bold; color: {'#2e7d32' if is_correct else '#c62828'}">
                {('🎉 Correct! +' + str(get_points_per_question(difficulty)) + ' points') if is_correct else '💡 Not quite right'}
            </p>
            <p style="margin: 0.5rem 0 0 0; color: #5d4037;">{explanation}</p>
        </div>
        """, unsafe_allow_html=True)

        # Speed bonus
        if is_correct and config.timer > 0:
            time_taken = time.time() - st.session_state.start_time
            if time_taken < 10:
                st.markdown(f"""
                <div class="speed-bonus">
                    ⚡ Speed Bonus! +5 extra points
                </div>
                """, unsafe_allow_html=True)

        # Continue button
        col1, col2, col3 = st.columns([1, 2, 1])
        with col2:
            if st.button("Next Question →" if current_idx + 1 < len(questions) else "See Results →",
                        type="primary", use_container_width=True, key="next_question"):
                next_question()


def submit_answer(question):
    """Handle answer submission"""
    selected = st.session_state.selected_option
    is_correct = selected == question['correctAnswer']
    difficulty = st.session_state.quiz_difficulty

    # Calculate points
    base_points = get_points_per_question(difficulty)
    speed_bonus = 0

    if is_correct:
        time_taken = time.time() - st.session_state.start_time
        if DIFFICULTY_CONFIG[difficulty].timer > 0 and time_taken < 10:
            speed_bonus = 5
            st.session_state.speed_bonuses += 1

        st.session_state.points += base_points + speed_bonus
    else:
        if difficulty == 'hard':
            st.session_state.lives_remaining -= 1

    # Record answer
    st.session_state.answers.append({
        'type': 'vocabulary',
        'question': question['question'],
        'selected': selected,
        'correct': question['correctAnswer'],
        'is_correct': is_correct,
        'points': base_points + speed_bonus if is_correct else 0
    })

    st.session_state.is_answered = True
    st.session_state.is_correct = is_correct
    st.rerun()


def handle_timeout():
    """Handle timer timeout"""
    difficulty = st.session_state.quiz_difficulty

    # Record as incorrect
    question = st.session_state.quiz_questions[st.session_state.current_question]
    st.session_state.answers.append({
        'type': 'vocabulary',
        'question': question['question'],
        'selected': 'Time expired',
        'correct': question['correctAnswer'],
        'is_correct': False,
        'points': 0
    })

    if difficulty == 'hard':
        st.session_state.lives_remaining -= 1

    st.session_state.is_answered = True
    st.session_state.is_correct = False
    st.rerun()


def next_question():
    """Move to next question or show results"""
    st.session_state.current_question += 1
    st.session_state.selected_option = None
    st.session_state.is_answered = False
    st.session_state.is_correct = False
    st.session_state.time_remaining = DIFFICULTY_CONFIG[st.session_state.quiz_difficulty].timer
    st.rerun()


def get_points_per_question(difficulty):
    """Get points per question based on difficulty"""
    if difficulty == 'easy':
        return 10
    elif difficulty == 'medium':
        return 15
    else:  # hard
        return 20


def show_game_over():
    """Show game over screen when lives run out"""
    answers = st.session_state.answers
    correct = sum(1 for a in answers if a['is_correct'])

    st.markdown(f"""
    <div class="celebration">
        <div style="font-size: 5rem;">💔</div>
        <h2 style="color: #c62828;">Out of Lives!</h2>
        <p style="font-size: 1.2rem; color: #5d4037;">You got {correct} out of {len(answers)} correct.</p>
        <p style="font-size: 1.5rem; color: #ffa000; font-weight: bold;">⭐ {st.session_state.points} points</p>
    </div>
    """, unsafe_allow_html=True)

    if st.button("🔄 Try Again", use_container_width=True):
        reset_quiz()
        st.rerun()

    if st.button("🏠 Back to Home", use_container_width=True):
        reset_quiz()
        st.switch_page("pages/0_🏠_Home.py")


def show_quiz_results():
    """Display quiz results with celebration"""
    is_teacher = check_teacher_mode()
    answers = st.session_state.answers
    correct = sum(1 for a in answers if a['is_correct'])
    total = len(answers)
    score = int((correct / total * 100)) if total > 0 else 0
    total_points = st.session_state.points
    speed_bonuses = st.session_state.speed_bonuses

    # Determine performance level
    is_perfect = correct == total
    is_excellent = correct >= total * 0.8
    is_good = correct >= total * 0.6

    # Select emoji based on performance
    if is_perfect:
        emoji = "🌳✨"
        message = "Perfect Score!"
    elif is_excellent:
        emoji = "🌿"
        message = "Excellent Work!"
    elif is_good:
        emoji = "🌱"
        message = "Good Job!"
    else:
        emoji = "📚"
        message = "Keep Practicing!"

    # Save to database (students only)
    if not is_teacher and st.session_state.get('user'):
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

    # Results header
    st.markdown(f"""
    <div class="score-display">
        <div style="font-size: 4rem;">{emoji}</div>
        <h2 style="margin: 0.5rem 0;">{message}</h2>
        <p style="font-size: 1.2rem; margin: 0;">Score: {score}% ({correct}/{total})</p>
        <p style="font-size: 2rem; margin: 0.5rem 0;">⭐ {total_points} points</p>
        {f'<p style="font-size: 0.9rem;">⚡ {speed_bonuses} speed bonuses</p>' if speed_bonuses > 0 else ''}
    </div>
    """, unsafe_allow_html=True)

    # Confetti for perfect score
    if is_perfect:
        st.markdown("""
        <script>
        // Simple confetti effect
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.backgroundColor = ['#66BB6A', '#FFCA28', '#42A5F5', '#EF5350'][Math.floor(Math.random() * 4)];
            confetti.style.animationDelay = Math.random() * 2 + 's';
            document.body.appendChild(confetti);
        }
        </script>
        """, unsafe_allow_html=True)

    st.markdown("---")

    # Score breakdown
    st.markdown("### 📊 Score Breakdown")
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Correct Answers", f"{correct}/{total}", f"{score}%")
    with col2:
        st.metric("Total Points", total_points, f"+{speed_bonuses} bonuses")
    with col3:
        st.metric("Difficulty", st.session_state.quiz_difficulty.title(),
                  DIFFICULTY_CONFIG[st.session_state.quiz_difficulty]['label'])

    st.markdown("---")

    # Keywords mastered
    keywords = get_keywords_for_week(
        st.session_state.quiz_grade,
        st.session_state.quiz_subject,
        st.session_state.quiz_week
    )
    if keywords:
        st.markdown("### 🎯 Keywords Mastered")
        keyword_html = " ".join([f'<span class="keyword-badge">{kw}</span>' for kw in keywords])
        st.markdown(keyword_html, unsafe_allow_html=True)

    st.markdown("---")

    # Answer review
    st.markdown("### 📝 Answer Review")
    for i, answer in enumerate(answers, 1):
        q_type = "📖" if answer.get('type') == 'passage' else "📝"
        status = "✅" if answer['is_correct'] else "❌"
        points = answer.get('points', 0)

        with st.expander(f"{status} {q_type} Question {i}: {answer['question'][:50]}..."):
            st.markdown(f"**Your answer:** {answer['selected']}")
            if not answer['is_correct']:
                st.markdown(f"**Correct answer:** {answer['correct']}")
            st.markdown(f"**Points earned:** {points}")

    st.markdown("---")

    # Action buttons
    col1, col2, col3 = st.columns(3)
    with col1:
        if st.button("🔄 Try Again", use_container_width=True):
            reset_quiz()
            st.rerun()

    with col2:
        if st.button("📊 View Progress", use_container_width=True):
            reset_quiz()
            st.switch_page("pages/5_📊_Progress.py")

    with col3:
        if st.button("🏠 Home", use_container_width=True):
            reset_quiz()
            st.switch_page("pages/0_🏠_Home.py")


def reset_quiz():
    """Clear quiz state"""
    quiz_keys = [
        'quiz_questions', 'quiz_passage', 'current_question', 'answers',
        'quiz_grade', 'quiz_subject', 'quiz_week', 'quiz_difficulty',
        'show_passage', 'selected_option', 'is_answered', 'is_correct',
        'points', 'speed_bonuses', 'lives_remaining', 'time_remaining',
        'question_id', 'start_time'
    ]
    for key in quiz_keys:
        if key in st.session_state:
            del st.session_state[key]


def show_quiz():
    """Main quiz page"""
    check_auth()

    # Check if quiz is in progress
    if 'quiz_questions' not in st.session_state:
        show_quiz_setup()
    elif st.session_state.get('show_passage', False):
        # Skip passage for now
        st.session_state.show_passage = False
        st.rerun()
    elif st.session_state.current_question < len(st.session_state.quiz_questions):
        show_quiz_question()
    else:
        show_quiz_results()

    # Back button (only during setup)
    if 'quiz_questions' not in st.session_state:
        if st.button("← Back to Home", use_container_width=True):
            st.switch_page("pages/0_🏠_Home.py")


if __name__ == "__main__":
    show_quiz()
