"""
Teacher Dashboard - Weekly Vocabulary Learning App
Class management, student roster, statistics
"""

import streamlit as st
import sys
import os
import pandas as pd

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import (
    get_teacher_classes,
    create_class,
    get_class_students,
    add_students_to_class,
    regenerate_class_passwords,
    delete_class,
    get_class_statistics
)

# Page config
st.set_page_config(
    page_title="Teacher Dashboard - Vocabulary Adventure",
    page_icon="📚",
    layout="wide"
)

# Custom CSS
st.markdown("""
<style>
    .class-card {
        padding: 1.5rem;
        border-radius: 0.5rem;
        border: 1px solid #ddd;
        margin: 0.5rem 0;
        background: white;
    }
    .stat-box {
        padding: 1rem;
        border-radius: 0.5rem;
        text-align: center;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
    }
    .password-display {
        font-size: 1.5rem;
        text-align: center;
        padding: 0.5rem;
        background: #f0f0f0;
        border-radius: 0.25rem;
        margin: 0.25rem 0;
    }
</style>
""", unsafe_allow_html=True)


def check_auth():
    """Check if user is authenticated as teacher"""
    if st.session_state.get('user_role') != 'teacher' or not st.session_state.get('user'):
        st.error("Please login as a teacher first")
        st.switch_page("pages/1_👨‍🏫_Teacher_Login.py")


def show_header():
    """Show dashboard header with user info and logout"""
    user = st.session_state.get('user', {})
    col1, col2 = st.columns([3, 1])

    with col1:
        st.title(f"📚 {user.get('full_name', 'Teacher')}'s Dashboard")

    with col2:
        if st.button("🚪 Logout", use_container_width=True):
            st.session_state.user = None
            st.session_state.user_role = None
            st.switch_page("pages/0_🏠_Home.py")


def show_my_classes():
    """Display teacher's classes"""
    teacher_id = st.session_state['user']['id']
    classes = get_teacher_classes(teacher_id)

    if not classes:
        st.info("You don't have any classes yet. Create your first class in the 'Create Class' tab!")
        return

    st.subheader(f"My Classes ({len(classes)})")

    for cls in classes:
        # Get class statistics
        stats = get_class_statistics(str(cls['id']))

        with st.expander(f"📖 {cls['name']} - {cls.get('grade_level', 'No Grade')} | Code: **{cls['code']}**"):
            col1, col2, col3, col4 = st.columns(4)

            with col1:
                st.markdown(f"<div class='stat-box'><h3>{stats['student_count']}</h3><p>Students</p></div>", unsafe_allow_html=True)

            with col2:
                st.markdown(f"<div class='stat-box'><h3>{stats['active_students']}</h3><p>Active</p></div>", unsafe_allow_html=True)

            with col3:
                st.markdown(f"<div class='stat-box'><h3>{stats['total_attempts']}</h3><p>Quizzes</p></div>", unsafe_allow_html=True)

            with col4:
                st.markdown(f"<div class='stat-box'><h3>{stats['avg_score']}%</h3><p>Avg Score</p></div>", unsafe_allow_html=True)

            # Action buttons
            col1, col2, col3 = st.columns(3)
            with col1:
                if st.button(f"View Students", key=f"view_{cls['id']}", use_container_width=True):
                    st.session_state['view_class_id'] = cls['id']
                    st.session_state['view_class_name'] = cls['name']
                    st.rerun()
            with col2:
                if st.button(f"Add Students", key=f"add_{cls['id']}", use_container_width=True):
                    st.session_state['add_class_id'] = cls['id']
                    st.session_state['add_class_name'] = cls['name']
                    st.rerun()
            with col3:
                if st.button(f"Reset Passwords", key=f"reset_{cls['id']}", use_container_width=True):
                    if st.session_state.get(f'confirm_reset_{cls["id"]}', False):
                        students = regenerate_class_passwords(str(cls['id']))
                        st.success(f"Reset passwords for {len(students)} students!")
                        st.session_state[f'confirm_reset_{cls["id"]}'] = False
                        st.rerun()
                    else:
                        st.session_state[f'confirm_reset_{cls["id"]}'] = True
                        st.rerun()


def show_create_class():
    """Display create class form"""
    st.subheader("Create a New Class")

    with st.form("create_class_form"):
        class_name = st.text_input("Class Name", placeholder="e.g., Grade 1A")
        grade_level = st.selectbox(
            "Grade Level",
            options=["G1", "G2", "G3", "G4", "G5"],
            format_func=lambda x: f"Grade {x[1]}"
        )
        submit = st.form_submit_button("Create Class", type="primary", use_container_width=True)

        if submit:
            if not class_name:
                st.error("Please enter a class name")
                return

            teacher_id = st.session_state['user']['id']
            class_id = create_class(class_name, grade_level, teacher_id)

            if class_id:
                st.success(f"Class '{class_name}' created successfully!")
                st.info(f"Share this class code with your students: **{get_teacher_classes(teacher_id)[-1]['code']}**")
                st.balloons()
            else:
                st.error("Failed to create class. Please try again.")


def show_add_students():
    """Display add students form"""
    teacher_id = st.session_state['user']['id']
    classes = get_teacher_classes(teacher_id)

    if not classes:
        st.info("Create a class first before adding students!")
        return

    st.subheader("Add Students to Class")

    # Class selection
    class_options = {f"{cls['name']} ({cls['code']})": cls for cls in classes}
    selected = st.selectbox("Select a class", options=list(class_options.keys()), key="add_students_class_select")
    selected_class = class_options[selected]

    # Bulk add students
    st.markdown("Enter student names (one per line):")
    student_names = st.text_area(
        "Student Names",
        placeholder="Alice Smith\nBob Johnson\nCharlie Brown",
        height=150,
        key="add_students_names"
    )

    col1, col2 = st.columns(2)
    with col1:
        if st.button("Add Students", type="primary", use_container_width=True, key="add_students_btn"):
            if not student_names.strip():
                st.error("Please enter at least one student name")
                return

            names = [name.strip() for name in student_names.strip().split('\n') if name.strip()]
            added = add_students_to_class(str(selected_class['id']), names)

            if added:
                st.success(f"Added {len(added)} students to {selected_class['name']}!")
                st.balloons()
            else:
                st.error("No students were added. They may already exist.")

    with col2:
        # Show current students
        students = get_class_students(str(selected_class['id']))
        if students:
            st.markdown(f"**Current Students ({len(students)}):**")
            for student in students[:10]:  # Show first 10
                st.markdown(f"- {student['full_name']} {student['animal_emoji']}")
            if len(students) > 10:
                st.markdown(f"... and {len(students) - 10} more")


def show_view_students():
    """Display student list with passwords"""
    teacher_id = st.session_state['user']['id']
    classes = get_teacher_classes(teacher_id)

    if not classes:
        st.info("No classes to display!")
        return

    st.subheader("Class Roster")

    # Class selection
    class_options = {f"{cls['name']} ({cls['code']})": cls for cls in classes}
    selected = st.selectbox("Select a class", options=list(class_options.keys()), key="view_students_class_select")
    selected_class = class_options[selected]

    # Get students
    students = get_class_students(str(selected_class['id']))

    if not students:
        st.info("No students in this class yet.")
        return

    st.markdown(f"### {selected_class['name']} - {len(students)} Students")

    # Display as table
    data = []
    for student in students:
        data.append({
            "Name": student['full_name'],
            "Animal Password": f"{student['animal_emoji']} {student['animal_name']}",
            "Number": student['animal_number']
        })

    df = pd.DataFrame(data)
    st.dataframe(df, use_container_width=True, hide_index=True)

    # Download button
    csv = df.to_csv(index=False)
    st.download_button(
        "Download Student List",
        csv,
        f"{selected_class['name']}_students.csv",
        "text/csv",
        key='download-csv'
    )


def show_dashboard():
    """Main dashboard"""
    check_auth()
    show_header()

    # Create tabs
    tab1, tab2, tab3, tab4 = st.tabs(["📚 My Classes", "➕ Create Class", "👥 Add Students", "📋 View Students"])

    with tab1:
        show_my_classes()

    with tab2:
        show_create_class()

    with tab3:
        show_add_students()

    with tab4:
        show_view_students()


if __name__ == "__main__":
    show_dashboard()
