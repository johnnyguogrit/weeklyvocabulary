"""
Weekly Vocabulary Learning App - Main Streamlit Application
A gamified vocabulary learning app for Grades 1-5
"""

import streamlit as st
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from backend.database import (
    init_databases,
    authenticate_teacher,
    authenticate_student,
    get_class_by_code,
    get_teacher_classes,
    get_class_students,
    create_class,
    add_students_to_class,
    get_user_progress,
    save_quiz_attempt,
    ANIMAL_PASSWORDS
)

from data.vocabulary_data import (
    GRADE_CONFIG,
    SUBJECT_CONFIG,
    WEEK_NAMES,
    get_grades,
    get_subjects,
    get_weeks_for_grade_subject,
    get_keywords_for_week
)

# Page configuration
st.set_page_config(
    page_title="Weekly Vocabulary Adventure",
    page_icon="📚",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .big-button {
        width: 100%;
        padding: 1.5rem;
        font-size: 1.5rem;
        margin: 0.5rem 0;
        border-radius: 0.5rem;
        border: none;
        cursor: pointer;
        transition: all 0.3s;
    }
    .teacher-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    .student-button {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
    }
    .stButton > button {
        width: 100%;
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
        background-color: #f0f0f0;
        border-color: #666;
    }
    .animal-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 10px;
    }
    .animal-button {
        font-size: 3rem;
        padding: 1rem;
        border: 2px solid #ddd;
        border-radius: 0.5rem;
        cursor: pointer;
        transition: all 0.2s;
    }
    .animal-button:hover {
        transform: scale(1.1);
        border-color: #666;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state
if 'user' not in st.session_state:
    st.session_state.user = None
if 'user_role' not in st.session_state:
    st.session_state.user_role = None  # 'teacher' or 'student'
if 'current_grade' not in st.session_state:
    st.session_state.current_grade = None
if 'current_subject' not in st.session_state:
    st.session_state.current_subject = None
if 'current_week' not in st.session_state:
    st.session_state.current_week = None
if 'quiz_score' not in st.session_state:
    st.session_state.quiz_score = 0
if 'quiz_total' not in st.session_state:
    st.session_state.quiz_total = 0

# Initialize databases
@st.cache_resource
def init_db():
    """Initialize databases (cached to run only once)"""
    init_databases()

init_db()


def logout():
    """Clear session state and logout"""
    st.session_state.user = None
    st.session_state.user_role = None
    st.session_state.current_grade = None
    st.session_state.current_subject = None
    st.session_state.current_week = None
    st.rerun()


# ============================================================================
# HOME PAGE
# ============================================================================

def show_home():
    """Display the home/landing page"""
    st.title("📚 Weekly Vocabulary Adventure")
    st.markdown("---")

    col1, col2 = st.columns(2)

    with col1:
        if st.button("👨‍🏫 Teacher Login", key="teacher_btn", use_container_width=True):
            st.switch_page("pages/1_👨‍🏫_Teacher_Login.py")

    with col2:
        if st.button("👨‍🎓 Student Login", key="student_btn", use_container_width=True):
            st.switch_page("pages/2_👨‍🎓_Student_Login.py")

    st.markdown("---")
    st.markdown("""
    ### Welcome to the Weekly Vocabulary Adventure! 🌟

    A fun and interactive way to learn subject vocabulary for Grades 1-5.

    **Features:**
    - 🎮 Gamified quizzes with immediate feedback
    - 📊 Track your progress week by week
    - 🌱 Watch your knowledge grow from seedling to mighty oak
    - 🎨 8 subjects: Maths, Science, STEAM, Music, Drama, Performing Arts, Visual Arts, PE

    **Teachers:** Create classes, add students, and monitor progress.

    **Students:** Enter your class code, select your name, and click your animal password to start learning!
    """)


# ============================================================================
# MAIN APP
# ============================================================================

def main():
    """Main application entry point"""
    # Show home page by default
    show_home()


if __name__ == "__main__":
    main()
