"""
Student Login Page - Weekly Vocabulary Learning App
3-step student login: Class code → Name → Animal password
"""

import streamlit as st
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import (
    get_class_by_code,
    get_class_students,
    authenticate_student,
    ANIMAL_PASSWORDS
)

# Page config
st.set_page_config(
    page_title="Student Login - Vocabulary Adventure",
    page_icon="👨‍🎓",
    layout="centered"
)

# Custom CSS
st.markdown("""
<style>
    .student-header {
        text-align: center;
        color: #f5576c;
    }
    .step-indicator {
        display: flex;
        justify-content: center;
        margin: 2rem 0;
    }
    .step {
        padding: 0.5rem 1rem;
        margin: 0 0.5rem;
        border-radius: 1rem;
        background: #ddd;
        color: #666;
    }
    .step.active {
        background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
        color: white;
    }
    .animal-grid {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 0.5rem;
        margin: 1rem 0;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state for login flow
if 'login_step' not in st.session_state:
    st.session_state.login_step = 1
if 'class_code' not in st.session_state:
    st.session_state.class_code = ''
if 'selected_class' not in st.session_state:
    st.session_state.selected_class = None
if 'student_username' not in st.session_state:
    st.session_state.student_username = ''


def reset_login():
    """Reset login state"""
    st.session_state.login_step = 1
    st.session_state.class_code = ''
    st.session_state.selected_class = None
    st.session_state.student_username = ''
    st.rerun()


def show_step_1():
    """Step 1: Enter class code"""
    st.markdown("<h2 class='student-header'>👨‍🎓 Student Login</h2>", unsafe_allow_html=True)
    st.markdown("<h3 style='text-align: center;'>Step 1: Enter Your Class Code</h3>", unsafe_allow_html=True)

    class_code = st.text_input(
        "Class Code (8 letters)",
        placeholder="e.g., ABCDEFGH",
        max_chars=8,
        key="class_code_input"
    ).upper()

    if st.button("Next →", use_container_width=True, type="primary"):
        if not class_code or len(class_code) != 8:
            st.error("Please enter a valid 8-letter class code")
            return

        class_info = get_class_by_code(class_code)
        if class_info:
            st.session_state.class_code = class_code
            st.session_state.selected_class = dict(class_info)
            st.session_state.login_step = 2
            st.rerun()
        else:
            st.error("Invalid class code. Please check with your teacher.")


def show_step_2():
    """Step 2: Select name from dropdown"""
    st.markdown("<h2 class='student-header'>👨‍🎓 Student Login</h2>", unsafe_allow_html=True)
    st.markdown("<h3 style='text-align: center;'>Step 2: Select Your Name</h3>", unsafe_allow_html=True)

    # Get students for this class
    students = get_class_students(str(st.session_state.selected_class['id']))

    if not students:
        st.error("No students found in this class. Please ask your teacher to add you.")
        if st.button("← Start Over", use_container_width=True):
            reset_login()
        return

    # Create list of student names
    student_names = [s['full_name'] for s in students]
    student_names.sort()

    selected_name = st.selectbox(
        "Find your name:",
        options=["-- Select your name --"] + student_names,
        key="student_name_select"
    )

    if st.button("Next →", use_container_width=True, type="primary"):
        if selected_name == "-- Select your name --":
            st.error("Please select your name")
            return

        # Find the student's username
        for student in students:
            if student['full_name'] == selected_name:
                st.session_state.student_username = student['username']
                st.session_state.login_step = 3
                st.rerun()
                return

    if st.button("← Back", use_container_width=True):
        st.session_state.login_step = 1
        st.rerun()


def show_step_3():
    """Step 3: Enter animal password"""
    st.markdown("<h2 class='student-header'>👨‍🎓 Student Login</h2>", unsafe_allow_html=True)
    st.markdown("<h3 style='text-align: center;'>Step 3: Click Your Animal Password</h3>", unsafe_allow_html=True)

    st.markdown(f"<p style='text-align: center; font-size: 1.2rem;'>Hi! Click your animal to log in:</p>", unsafe_allow_html=True)

    # Display animal grid
    cols = st.columns(4)
    for idx, (num, animal) in enumerate(ANIMAL_PASSWORDS.items()):
        col_idx = idx % 4
        with cols[col_idx]:
            if st.button(
                f"{animal['emoji']}\n{animal['name']}",
                key=f"animal_{num}",
                use_container_width=True
            ):
                # Authenticate student
                user = authenticate_student(
                    st.session_state.class_code,
                    st.session_state.student_username,
                    num
                )
                if user:
                    st.session_state.user = dict(user)
                    st.session_state.user_role = 'student'
                    st.success(f"Welcome, {user['full_name']}!")
                    import time
                    time.sleep(0.5)
                    st.switch_page("pages/4_🎯_Quiz.py")
                else:
                    st.error("Wrong animal! Please try again.")

    if st.button("← Back", use_container_width=True):
        st.session_state.login_step = 2
        st.rerun()


def show_student_login():
    """Main student login page with 3-step wizard"""
    st.title("👨‍🎓 Student Portal")
    st.markdown("---")

    # Step indicator
    st.markdown(f"""
    <div class="step-indicator">
        <div class="step {'active' if st.session_state.login_step == 1 else ''}">1. Class Code</div>
        <div class="step {'active' if st.session_state.login_step == 2 else ''}">2. Name</div>
        <div class="step {'active' if st.session_state.login_step == 3 else ''}">3. Password</div>
    </div>
    """, unsafe_allow_html=True)

    # Show current step
    if st.session_state.login_step == 1:
        show_step_1()
    elif st.session_state.login_step == 2:
        show_step_2()
    elif st.session_state.login_step == 3:
        show_step_3()

    st.markdown("---")
    if st.button("← Back to Home", use_container_width=True):
        st.switch_page("pages/0_🏠_Home.py")


if __name__ == "__main__":
    show_student_login()
