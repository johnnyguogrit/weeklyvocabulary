"""
Progress Page - Weekly Vocabulary Learning App
View student progress and statistics
"""

import streamlit as st
import sys
import os
import pandas as pd
import plotly.express as px
import plotly.graph_objects as go

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import get_user_progress

from data.vocabulary_data import (
    GRADE_CONFIG,
    SUBJECT_CONFIG,
    WEEK_NAMES
)

# Page config
st.set_page_config(
    page_title="Progress - Vocabulary Adventure",
    page_icon="📊",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .stat-card {
        padding: 1.5rem;
        border-radius: 0.5rem;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    .progress-bar {
        height: 30px;
        border-radius: 15px;
        background: #e9ecef;
        overflow: hidden;
    }
    .progress-fill {
        height: 100%;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-weight: bold;
    }
</style>
""", unsafe_allow_html=True)


def check_auth():
    """Check if user is authenticated"""
    if not st.session_state.get('user'):
        st.error("Please login first")
        st.switch_page("pages/2_👨‍🎓_Student_Login.py")


def show_progress():
    """Display student progress"""
    user = st.session_state.get('user', {})
    user_id = user['id']

    st.title(f"📊 {user.get('full_name', 'Student')}'s Progress")
    st.markdown("---")

    # Get progress data
    progress = get_user_progress(user_id)
    attempts = progress.get('attempts', [])
    badges = progress.get('badges', [])

    if not attempts:
        st.info("No quiz attempts yet. Start your first quiz to see your progress!")
        if st.button("🎯 Take a Quiz", use_container_width=True):
            st.switch_page("pages/4_🎯_Quiz.py")
        return

    # Calculate overall statistics
    total_attempts = len(attempts)
    total_correct = sum(a['questions_correct'] for a in attempts)
    total_questions = sum(a['questions_total'] for a in attempts)
    overall_accuracy = int((total_correct / total_questions * 100)) if total_questions > 0 else 0

    # Overall statistics
    col1, col2, col3, col4 = st.columns(4)

    with col1:
        st.markdown(f"""
        <div class="stat-card">
            <h3>{total_attempts}</h3>
            <p>Total Quizzes</p>
        </div>
        """, unsafe_allow_html=True)

    with col2:
        st.markdown(f"""
        <div class="stat-card">
            <h3>{overall_accuracy}%</h3>
            <p>Overall Accuracy</p>
        </div>
        """, unsafe_allow_html=True)

    with col3:
        st.markdown(f"""
        <div class="stat-card">
            <h3>{len(set(a['subject'] for a in attempts))}</h3>
            <p>Subjects Studied</p>
        </div>
        """, unsafe_allow_html=True)

    with col4:
        st.markdown(f"""
        <div class="stat-card">
            <h3>{len(badges)}</h3>
            <p>Badges Earned</p>
        </div>
        """, unsafe_allow_html=True)

    st.markdown("---")

    # Progress by subject
    st.subheader("📚 Progress by Subject")

    subject_data = {}
    for attempt in attempts:
        subject = attempt['subject']
        if subject not in subject_data:
            subject_data[subject] = {'correct': 0, 'total': 0}
        subject_data[subject]['correct'] += attempt['questions_correct']
        subject_data[subject]['total'] += attempt['questions_total']

    if subject_data:
        # Create bar chart
        subjects = list(subject_data.keys())
        scores = [int(s['correct'] / s['total'] * 100) if s['total'] > 0 else 0
                 for s in subject_data.values()]

        fig = px.bar(
            x=subjects,
            y=scores,
            labels={'x': 'Subject', 'y': 'Accuracy %'},
            title='Accuracy by Subject',
            color=scores,
            color_continuous_scale='viridis'
        )
        fig.update_layout(yaxis_range=[0, 100])
        st.plotly_chart(fig, use_container_width=True)

        # Subject breakdown table
        st.markdown("### Subject Details")
        for subject, data in subject_data.items():
            accuracy = int(data['correct'] / data['total'] * 100) if data['total'] > 0 else 0
            st.markdown(f"**{SUBJECT_CONFIG.get(subject, {}).get('name', subject)}**")
            col1, col2 = st.columns([3, 1])

            with col1:
                st.markdown(f"""
                <div class="progress-bar">
                    <div class="progress-fill" style="width: {accuracy}%">
                        {accuracy}%
                    </div>
                </div>
                """, unsafe_allow_html=True)

            with col2:
                st.markdown(f"{data['correct']}/{data['total']} correct")

    st.markdown("---")

    # Recent attempts
    st.subheader("📝 Recent Quiz Attempts")

    # Sort by completed_at descending and show last 10
    recent_attempts = sorted(attempts, key=lambda x: x['completed_at'], reverse=True)[:10]

    for attempt in recent_attempts:
        accuracy = int(attempt['questions_correct'] / attempt['questions_total'] * 100) if attempt['questions_total'] > 0 else 0
        with st.expander(
            f"{attempt['grade']} {attempt['subject']} - Week {attempt['week_id']} "
            f"({attempt['difficulty']}) - **{accuracy}%**"
        ):
            col1, col2, col3 = st.columns(3)
            with col1:
                st.metric("Questions", f"{attempt['questions_correct']}/{attempt['questions_total']}")
            with col2:
                st.metric("Score", f"{accuracy}%")
            with col3:
                st.metric("Difficulty", attempt['difficulty'].capitalize())

    # Buttons
    st.markdown("---")
    col1, col2 = st.columns(2)

    with col1:
        if st.button("🎯 Take Another Quiz", use_container_width=True):
            st.switch_page("pages/4_🎯_Quiz.py")

    with col2:
        if st.button("🏠 Back to Home", use_container_width=True):
            st.switch_page("pages/0_🏠_Home.py")


if __name__ == "__main__":
    check_auth()
    show_progress()
