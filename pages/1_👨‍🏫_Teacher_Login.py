"""
Teacher Login Page - Weekly Vocabulary Learning App
Teacher authentication and registration
"""

import streamlit as st
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import (
    create_teacher,
    authenticate_teacher,
    get_teacher
)

# Page config
st.set_page_config(
    page_title="Teacher Login - Vocabulary Adventure",
    page_icon="👨‍🏫",
    layout="centered"
)

# Custom CSS
st.markdown("""
<style>
    .login-container {
        max-width: 400px;
        margin: 0 auto;
        padding: 2rem;
    }
    .teacher-header {
        text-align: center;
        color: #667eea;
    }
</style>
""", unsafe_allow_html=True)

# Initialize session state for login flow
if 'login_mode' not in st.session_state:
    st.session_state.login_mode = 'login'  # 'login' or 'register'
if 'register_success' not in st.session_state:
    st.session_state.register_success = False


def show_login():
    """Show teacher login form"""
    st.markdown("<h2 class='teacher-header'>👨‍🏫 Teacher Login</h2>", unsafe_allow_html=True)

    with st.form("login_form"):
        username = st.text_input("Username", placeholder="Enter your username")
        password = st.text_input("Password", type="password", placeholder="Enter your password")
        submit = st.form_submit_button("Login", use_container_width=True, type="primary")

        if submit:
            if not username or not password:
                st.error("Please enter both username and password")
                return

            user = authenticate_teacher(username, password)
            if user:
                st.session_state.user = dict(user)
                st.session_state.user_role = 'teacher'
                st.success(f"Welcome back, {user['full_name']}!")
                st.switch_page("pages/3_📚_Teacher_Dashboard.py")
            else:
                st.error("Invalid username or password")

    st.markdown("---")
    st.markdown("Don't have an account?")
    if st.button("Register as a new teacher", use_container_width=True):
        st.session_state.login_mode = 'register'
        st.rerun()


def show_register():
    """Show teacher registration form"""
    st.markdown("<h2 class='teacher-header'>📝 Register New Teacher</h2>", unsafe_allow_html=True)

    with st.form("register_form"):
        username = st.text_input("Choose a username", placeholder="Enter your username")
        password = st.text_input("Choose a password", type="password", placeholder="At least 6 characters")
        confirm_password = st.text_input("Confirm password", type="password")
        full_name = st.text_input("Your full name", placeholder="e.g., Ms. Smith")
        submit = st.form_submit_button("Register", use_container_width=True, type="primary")

        if submit:
            if not username or not password or not full_name:
                st.error("Please fill in all fields")
                return

            if len(password) < 6:
                st.error("Password must be at least 6 characters")
                return

            if password != confirm_password:
                st.error("Passwords do not match")
                return

            user_id = create_teacher(username, password, full_name)
            if user_id:
                st.success("Registration successful! Please login with your new account.")
                st.session_state.login_mode = 'login'
                st.rerun()
            else:
                st.error("Username already exists. Please choose another.")

    st.markdown("---")
    st.markdown("Already have an account?")
    if st.button("Back to login", use_container_width=True):
        st.session_state.login_mode = 'login'
        st.rerun()


def show_teacher_login():
    """Main teacher login page"""
    st.title("👨‍🏫 Teacher Portal")
    st.markdown("---")

    # Tab for login/register
    tab1, tab2 = st.tabs(["Login", "Register"])

    with tab1:
        with st.container():
            st.markdown("<h3 style='text-align: center;'>Welcome Back!</h3>", unsafe_allow_html=True)
            with st.form("login_form"):
                username = st.text_input("Username")
                password = st.text_input("Password", type="password")
                submit = st.form_submit_button("Login", use_container_width=True, type="primary")

                if submit:
                    if not username or not password:
                        st.error("Please enter both username and password")
                    else:
                        user = authenticate_teacher(username, password)
                        if user:
                            st.session_state.user = dict(user)
                            st.session_state.user_role = 'teacher'
                            st.success(f"Welcome, {user['full_name']}!")
                            time.sleep(0.5)
                            st.switch_page("pages/3_📚_Teacher_Dashboard.py")
                        else:
                            st.error("Invalid username or password")

    with tab2:
        with st.container():
            st.markdown("<h3 style='text-align: center;'>Create Account</h3>", unsafe_allow_html=True)
            with st.form("register_form"):
                new_username = st.text_input("Choose a username")
                new_password = st.text_input("Choose a password", type="password", help="At least 6 characters")
                confirm_password = st.text_input("Confirm password", type="password")
                full_name = st.text_input("Your full name")
                submit = st.form_submit_button("Register", use_container_width=True)

                if submit:
                    if not new_username or not new_password or not full_name:
                        st.error("Please fill in all fields")
                    elif len(new_password) < 6:
                        st.error("Password must be at least 6 characters")
                    elif new_password != confirm_password:
                        st.error("Passwords do not match")
                    else:
                        user_id = create_teacher(new_username, new_password, full_name)
                        if user_id:
                            st.success("Registration successful! Please login.")
                            time.sleep(1)
                            st.rerun()
                        else:
                            st.error("Username already exists")

    # Back to home button
    if st.button("← Back to Home", use_container_width=True):
        st.switch_page("pages/0_🏠_Home.py")


import time

if __name__ == "__main__":
    show_teacher_login()
