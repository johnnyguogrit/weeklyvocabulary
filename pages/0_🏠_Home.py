"""
Home Page - Weekly Vocabulary Learning App
Landing page with teacher/student login options
"""

import streamlit as st
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import init_databases

# Page config
st.set_page_config(
    page_title="Home - Vocabulary Adventure",
    page_icon="🏠",
    layout="centered",
    initial_sidebar_state="collapsed"
)

# Initialize databases
@st.cache_resource
def init_db():
    """Initialize databases"""
    from backend.database import init_databases
    init_databases()

init_db()

# Custom CSS
st.markdown("""
<style>
    .main-header {
        text-align: center;
        padding: 2rem 0;
    }
    .login-card {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 2rem;
        border-radius: 1rem;
        color: white;
        margin: 1rem 0;
    }
    .hero-section {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        padding: 3rem;
        border-radius: 1rem;
        color: white;
        margin: 2rem 0;
        text-align: center;
    }
</style>
""", unsafe_allow_html=True)

def show_home():
    """Display the home page"""
    st.title("📚 Weekly Vocabulary Adventure")
    st.markdown("---")

    # Hero section
    st.markdown("""
    <div class="hero-section">
        <h1>🌟 Welcome to Vocabulary Adventure! 🌟</h1>
        <p style="font-size: 1.2rem;">Learn subject vocabulary through fun quizzes!</p>
    </div>
    """, unsafe_allow_html=True)

    # Login options
    col1, col2 = st.columns(2)

    with col1:
        st.markdown("""
        <div class="login-card">
            <h2>👨‍🏫 Teacher Login</h2>
            <p>For teachers to manage classes and track student progress</p>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Enter as Teacher", key="teacher_login", use_container_width=True, type="primary"):
            st.switch_page("pages/1_👨‍🏫_Teacher_Login.py")

    with col2:
        st.markdown("""
        <div style="background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%); padding: 2rem; border-radius: 1rem; color: white; margin: 1rem 0;">
            <h2>👨‍🎓 Student Login</h2>
            <p>For students to take quizzes and track progress</p>
        </div>
        """, unsafe_allow_html=True)
        if st.button("Enter as Student", key="student_login", use_container_width=True, type="primary"):
            st.switch_page("pages/2_👨‍🎓_Student_Login.py")

    st.markdown("---")

    # Features section
    st.markdown("### ✨ Features")
    col1, col2, col3 = st.columns(3)

    with col1:
        st.markdown("""
        #### 🎮 Gamified Learning
        - Fun quizzes for each week
        - Immediate feedback
        - Earn badges and rewards
        """)

    with col2:
        st.markdown("""
        #### 📊 Progress Tracking
        - Track vocabulary mastery
        - Watch your plant grow
        - Weekly challenges
        """)

    with col3:
        st.markdown("""
        #### 📚 8 Subjects
        - Maths, Science, STEAM
        - Music, Drama, PE
        - Performing Arts, Visual Arts
        """)

    st.markdown("---")
    st.markdown("""
    <div style="text-align: center; color: #666; padding: 2rem;">
        <p>🌱 Grades 1-5 | 🎨 8 Subjects | 📝 Weekly Vocabulary</p>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    show_home()
