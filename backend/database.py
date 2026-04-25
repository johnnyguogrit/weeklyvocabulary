"""
Database operations for Weekly Vocabulary Learning App
Dual-database architecture:
- business.db: User data, classes, progress tracking (runtime)
- content.db: Static vocabulary content (optional)
"""

import sqlite3
import hashlib
import json
import os
import random
import string
from datetime import datetime
from typing import Optional, Dict, List, Any
from contextlib import contextmanager

# Database path configuration
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(BASE_DIR, "backend", "data")
os.makedirs(DATA_DIR, exist_ok=True)

BUSINESS_DB_PATH = os.path.join(DATA_DIR, "business.db")
CONTENT_DB_PATH = os.path.join(DATA_DIR, "content.db")

# Animal passwords for students
ANIMAL_PASSWORDS = {
    1: {"name": "Dog", "chinese": "狗", "emoji": "🐶"},
    2: {"name": "Cat", "chinese": "猫", "emoji": "🐱"},
    3: {"name": "Mouse", "chinese": "老鼠", "emoji": "🐭"},
    4: {"name": "Rabbit", "chinese": "兔子", "emoji": "🐰"},
    5: {"name": "Fox", "chinese": "狐狸", "emoji": "🦊"},
    6: {"name": "Bear", "chinese": "熊", "emoji": "🐻"},
    7: {"name": "Panda", "chinese": "熊猫", "emoji": "🐼"},
    8: {"name": "Koala", "chinese": "考拉", "emoji": "🐨"},
    9: {"name": "Lion", "chinese": "狮子", "emoji": "🦁"},
    10: {"name": "Monkey", "chinese": "猴子", "emoji": "🐵"},
    11: {"name": "Frog", "chinese": "青蛙", "emoji": "🐸"},
    12: {"name": "Zebra", "chinese": "斑马", "emoji": "🦓"},
}


# ============================================================================
# Database Connection Management
# ============================================================================

def get_business_connection():
    """Get business database connection"""
    conn = sqlite3.connect(BUSINESS_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


def get_content_connection():
    """Get content database connection"""
    conn = sqlite3.connect(CONTENT_DB_PATH)
    conn.row_factory = sqlite3.Row
    return conn


@contextmanager
def get_db_connection():
    """Context manager for database connections"""
    conn = get_business_connection()
    try:
        yield conn
        conn.commit()
    except Exception:
        conn.rollback()
        raise
    finally:
        conn.close()


# ============================================================================
# Password Utilities
# ============================================================================

def hash_password(password: str) -> str:
    """Hash password using SHA-256"""
    return hashlib.sha256(password.encode()).hexdigest()


def generate_class_code() -> str:
    """Generate 8-letter random class code"""
    return ''.join(random.choices(string.ascii_uppercase, k=8))


def assign_animal_password() -> int:
    """Assign random animal number (1-12)"""
    return random.randint(1, 12)


def get_animal_by_number(number: int) -> Optional[Dict[str, str]]:
    """Get animal info by number"""
    return ANIMAL_PASSWORDS.get(number)


# ============================================================================
# Database Initialization
# ============================================================================

def init_business_db():
    """Initialize business database with all tables"""
    conn = get_business_connection()
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE NOT NULL,
            password_hash TEXT NOT NULL,
            role TEXT NOT NULL CHECK(role IN ('teacher', 'student')),
            full_name TEXT,
            class_id TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    # Classes table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS classes (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            grade_level TEXT,
            teacher_id INTEGER,
            code TEXT UNIQUE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (teacher_id) REFERENCES users(id)
        )
    """)

    # Quiz attempts table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS quiz_attempts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            grade TEXT NOT NULL,
            subject TEXT NOT NULL,
            week_id INTEGER NOT NULL,
            difficulty TEXT NOT NULL,
            total_score REAL DEFAULT 0,
            max_score REAL DEFAULT 0,
            questions_correct INTEGER DEFAULT 0,
            questions_total INTEGER DEFAULT 0,
            reading_correct INTEGER DEFAULT 0,
            reading_total INTEGER DEFAULT 0,
            completed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            UNIQUE(user_id, grade, subject, week_id, difficulty)
        )
    """)

    # Progress snapshots table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS progress_snapshots (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            grade TEXT NOT NULL,
            subject TEXT NOT NULL,
            week_id INTEGER NOT NULL,
            completed BOOLEAN DEFAULT 0,
            keywords_mastered TEXT,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            UNIQUE(user_id, grade, subject, week_id)
        )
    """)

    # Badges table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS badges (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            badge_type TEXT NOT NULL,
            badge_name TEXT NOT NULL,
            earned_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id),
            UNIQUE(user_id, badge_type)
        )
    """)

    # Create indexes
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_users_role ON users(role)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_users_class ON users(class_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_classes_teacher ON classes(teacher_id)")
    cursor.execute("CREATE INDEX IF NOT EXISTS idx_quiz_user ON quiz_attempts(user_id)")

    conn.commit()
    conn.close()


def init_content_db():
    """Initialize content database for vocabulary data"""
    conn = get_content_connection()
    cursor = conn.cursor()

    # Vocabulary table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS vocabulary (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            grade TEXT NOT NULL,
            subject TEXT NOT NULL,
            week_id INTEGER NOT NULL,
            keyword TEXT NOT NULL,
            translation TEXT,
            context TEXT,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            UNIQUE(grade, subject, week_id, keyword)
        )
    """)

    # Questions table
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS questions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            grade TEXT NOT NULL,
            subject TEXT NOT NULL,
            week_id INTEGER NOT NULL,
            keyword TEXT NOT NULL,
            question TEXT NOT NULL,
            options TEXT NOT NULL,
            correct_answer TEXT NOT NULL,
            explanation TEXT,
            question_type TEXT DEFAULT 'multipleChoice',
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)

    conn.commit()
    conn.close()


def init_databases():
    """Initialize all databases"""
    init_business_db()
    init_content_db()


# ============================================================================
# User Management Functions
# ============================================================================

def create_teacher(username: str, password: str, full_name: str) -> Optional[int]:
    """Create a new teacher account"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            password_hash = hash_password(password)
            cursor.execute(
                "INSERT INTO users (username, password_hash, role, full_name) VALUES (?, ?, 'teacher', ?)",
                (username, password_hash, full_name)
            )
            return cursor.lastrowid
        except sqlite3.IntegrityError:
            return None


def authenticate_teacher(username: str, password: str) -> Optional[Dict[str, Any]]:
    """Authenticate teacher login"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        password_hash = hash_password(password)
        cursor.execute(
            "SELECT * FROM users WHERE username = ? AND password_hash = ? AND role = 'teacher'",
            (username, password_hash)
        )
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None


def get_teacher(teacher_id: int) -> Optional[Dict[str, Any]]:
    """Get teacher by ID"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ? AND role = 'teacher'", (teacher_id,))
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None


def create_student(full_name: str, class_id: str, animal_number: int) -> Optional[int]:
    """Create a new student account"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            # Generate username from full_name (lowercase, no spaces)
            username = full_name.lower().replace(' ', '_')
            # Make username unique by adding number if needed
            base_username = username
            counter = 1
            while True:
                cursor.execute("SELECT id FROM users WHERE username = ?", (username,))
                if not cursor.fetchone():
                    break
                username = f"{base_username}_{counter}"
                counter += 1

            # Password is the animal emoji
            animal = get_animal_by_number(animal_number)
            password_hash = hash_password(animal['emoji'])

            cursor.execute(
                "INSERT INTO users (username, password_hash, role, full_name, class_id) VALUES (?, ?, 'student', ?, ?)",
                (username, password_hash, full_name, class_id)
            )
            return cursor.lastrowid
        except sqlite3.IntegrityError:
            return None


def authenticate_student(class_code: str, username: str, animal_number: int) -> Optional[Dict[str, Any]]:
    """Authenticate student login with class code, username, and animal password"""
    with get_db_connection() as conn:
        cursor = conn.cursor()

        # First verify class code
        cursor.execute("SELECT id FROM classes WHERE code = ?", (class_code.upper(),))
        class_row = cursor.fetchone()
        if not class_row:
            return None
        class_id = str(class_row['id'])

        # Get the animal info
        animal = get_animal_by_number(animal_number)
        if not animal:
            return None
        password_hash = hash_password(animal['emoji'])

        # Authenticate student
        cursor.execute(
            "SELECT * FROM users WHERE username = ? AND password_hash = ? AND role = 'student' AND class_id = ?",
            (username, password_hash, class_id)
        )
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None


def get_user(user_id: int) -> Optional[Dict[str, Any]]:
    """Get user by ID"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None


# ============================================================================
# Class Management Functions
# ============================================================================

def create_class(name: str, grade_level: str, teacher_id: int) -> Optional[int]:
    """Create a new class"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            code = generate_class_code()
            # Ensure code is unique
            while True:
                cursor.execute("SELECT id FROM classes WHERE code = ?", (code,))
                if not cursor.fetchone():
                    break
                code = generate_class_code()

            cursor.execute(
                "INSERT INTO classes (name, grade_level, teacher_id, code) VALUES (?, ?, ?, ?)",
                (name, grade_level, teacher_id, code)
            )
            return cursor.lastrowid
        except sqlite3.IntegrityError:
            return None


def get_class_by_code(class_code: str) -> Optional[Dict[str, Any]]:
    """Get class by code"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM classes WHERE code = ?", (class_code.upper(),))
        row = cursor.fetchone()
        if row:
            return dict(row)
        return None


def get_teacher_classes(teacher_id: int) -> List[Dict[str, Any]]:
    """Get all classes for a teacher"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM classes WHERE teacher_id = ? ORDER BY created_at DESC", (teacher_id,))
        return [dict(row) for row in cursor.fetchall()]


def get_class_students(class_id: str) -> List[Dict[str, Any]]:
    """Get all students in a class with their animal passwords"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, username, full_name, password_hash FROM users WHERE class_id = ? AND role = 'student' ORDER BY full_name",
            (class_id,)
        )

        students = []
        for row in cursor.fetchall():
            student = dict(row)
            # Find animal by password hash
            for num, animal in ANIMAL_PASSWORDS.items():
                if hash_password(animal['emoji']) == student['password_hash']:
                    student['animal_number'] = num
                    student['animal_emoji'] = animal['emoji']
                    student['animal_name'] = animal['name']
                    break
            students.append(student)

        return students


def add_students_to_class(class_id: str, student_names: List[str]) -> List[Dict[str, Any]]:
    """Add multiple students to a class"""
    added_students = []
    for name in student_names:
        name = name.strip()
        if not name:
            continue
        animal_number = assign_animal_password()
        student_id = create_student(name, class_id, animal_number)
        if student_id:
            animal = get_animal_by_number(animal_number)
            added_students.append({
                'id': student_id,
                'full_name': name,
                'animal_number': animal_number,
                'animal_emoji': animal['emoji'],
                'animal_name': animal['name']
            })
    return added_students


def regenerate_class_passwords(class_id: str) -> List[Dict[str, Any]]:
    """Regenerate animal passwords for all students in a class"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        cursor.execute("SELECT id, full_name FROM users WHERE class_id = ? AND role = 'student'", (class_id,))
        students = cursor.fetchall()

        updated_students = []
        for student in students:
            animal_number = assign_animal_password()
            animal = get_animal_by_number(animal_number)
            password_hash = hash_password(animal['emoji'])
            cursor.execute(
                "UPDATE users SET password_hash = ? WHERE id = ?",
                (password_hash, student['id'])
            )
            updated_students.append({
                'id': student['id'],
                'full_name': student['full_name'],
                'animal_number': animal_number,
                'animal_emoji': animal['emoji'],
                'animal_name': animal['name']
            })

        conn.commit()
        return updated_students


def delete_class(class_id: int) -> bool:
    """Delete a class and all associated students"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        # Delete students in this class
        cursor.execute("DELETE FROM users WHERE class_id = ?", (str(class_id),))
        # Delete quiz attempts for these students (handled by FK, but explicit is safer)
        # Delete the class
        cursor.execute("DELETE FROM classes WHERE id = ?", (class_id,))
        conn.commit()
        return True


# ============================================================================
# Progress Tracking Functions
# ============================================================================

def save_quiz_attempt(user_id: int, grade: str, subject: str, week_id: int,
                      difficulty: str, total_score: float, max_score: float,
                      questions_correct: int, questions_total: int,
                      reading_correct: int = 0, reading_total: int = 0) -> int:
    """Save a quiz attempt"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        # Use INSERT OR REPLACE to handle unique constraint
        cursor.execute("""
            INSERT OR REPLACE INTO quiz_attempts
            (user_id, grade, subject, week_id, difficulty, total_score, max_score,
             questions_correct, questions_total, reading_correct, reading_total, completed_at)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (user_id, grade, subject, week_id, difficulty, total_score, max_score,
              questions_correct, questions_total, reading_correct, reading_total,
              datetime.now()))
        return cursor.lastrowid


def get_user_progress(user_id: int) -> Dict[str, Any]:
    """Get all progress data for a user"""
    with get_db_connection() as conn:
        cursor = conn.cursor()

        # Get quiz attempts
        cursor.execute("""
            SELECT grade, subject, week_id, difficulty, total_score, max_score,
                   questions_correct, questions_total, reading_correct, reading_total, completed_at
            FROM quiz_attempts WHERE user_id = ?
        """, (user_id,))
        attempts = [dict(row) for row in cursor.fetchall()]

        # Get badges
        cursor.execute("SELECT badge_type, badge_name, earned_at FROM badges WHERE user_id = ?", (user_id,))
        badges = [dict(row) for row in cursor.fetchall()]

        return {
            'attempts': attempts,
            'badges': badges
        }


def get_class_statistics(class_id: str) -> Dict[str, Any]:
    """Get statistics for a class"""
    with get_db_connection() as conn:
        cursor = conn.cursor()

        # Get student count
        cursor.execute("SELECT COUNT(*) as count FROM users WHERE class_id = ? AND role = 'student'", (class_id,))
        student_count = cursor.fetchone()['count']

        # Get quiz statistics
        cursor.execute("""
            SELECT COUNT(DISTINCT user_id) as active_students,
                   COUNT(*) as total_attempts,
                   AVG(100.0 * questions_correct / NULLIF(questions_total, 0)) as avg_score
            FROM quiz_attempts qa
            JOIN users u ON qa.user_id = u.id
            WHERE u.class_id = ?
        """, (class_id,))
        stats = cursor.fetchone()

        return {
            'student_count': student_count,
            'active_students': stats['active_students'] or 0,
            'total_attempts': stats['total_attempts'] or 0,
            'avg_score': round(stats['avg_score'] or 0, 1)
        }


def award_badge(user_id: int, badge_type: str, badge_name: str) -> bool:
    """Award a badge to a user"""
    with get_db_connection() as conn:
        cursor = conn.cursor()
        try:
            cursor.execute(
                "INSERT INTO badges (user_id, badge_type, badge_name) VALUES (?, ?, ?)",
                (user_id, badge_type, badge_name)
            )
            return True
        except sqlite3.IntegrityError:
            return False  # Badge already earned


# ============================================================================
# Content Management Functions
# ============================================================================

def save_vocabulary(grade: str, subject: str, week_id: int, keyword: str,
                    translation: str = None, context: str = None) -> int:
    """Save vocabulary item to content database"""
    conn = get_content_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT OR REPLACE INTO vocabulary (grade, subject, week_id, keyword, translation, context)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (grade, subject, week_id, keyword, translation, context))
        conn.commit()
        return cursor.lastrowid
    finally:
        conn.close()


def get_vocabulary(grade: str, subject: str, week_id: int = None) -> List[Dict[str, Any]]:
    """Get vocabulary items"""
    conn = get_content_connection()
    cursor = conn.cursor()
    try:
        if week_id:
            cursor.execute(
                "SELECT * FROM vocabulary WHERE grade = ? AND subject = ? AND week_id = ?",
                (grade, subject, week_id)
            )
        else:
            cursor.execute(
                "SELECT * FROM vocabulary WHERE grade = ? AND subject = ? ORDER BY week_id, keyword",
                (grade, subject)
            )
        return [dict(row) for row in cursor.fetchall()]
    finally:
        conn.close()


def save_question(grade: str, subject: str, week_id: int, keyword: str,
                  question: str, options: List[str], correct_answer: str,
                  explanation: str = None, question_type: str = 'multipleChoice') -> int:
    """Save question to content database"""
    conn = get_content_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            INSERT INTO questions
            (grade, subject, week_id, keyword, question, options, correct_answer, explanation, question_type)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (grade, subject, week_id, keyword, question, json.dumps(options),
              correct_answer, explanation, question_type))
        conn.commit()
        return cursor.lastrowid
    finally:
        conn.close()


def get_questions(grade: str, subject: str, week_id: int = None) -> List[Dict[str, Any]]:
    """Get questions"""
    conn = get_content_connection()
    cursor = conn.cursor()
    try:
        if week_id:
            cursor.execute(
                "SELECT * FROM questions WHERE grade = ? AND subject = ? AND week_id = ?",
                (grade, subject, week_id)
            )
        else:
            cursor.execute(
                "SELECT * FROM questions WHERE grade = ? AND subject = ? ORDER BY week_id",
                (grade, subject)
            )
        results = []
        for row in cursor.fetchall():
            q = dict(row)
            q['options'] = json.loads(q['options'])
            results.append(q)
        return results
    finally:
        conn.close()


# Initialize databases on import
if __name__ == "__main__":
    init_databases()
    print("Databases initialized successfully!")
    print(f"Business DB: {BUSINESS_DB_PATH}")
    print(f"Content DB: {CONTENT_DB_PATH}")
