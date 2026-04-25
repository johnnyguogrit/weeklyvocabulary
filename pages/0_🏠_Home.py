"""
Home Page - Weekly Vocabulary Learning App
Beautiful landing page matching React app design
"""

import streamlit as st
import sys
import os

# Add parent directory to path for imports
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.database import init_databases

# Page config
st.set_page_config(
    page_title="Vocabulary Adventure",
    page_icon="🌱",
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

# Enhanced CSS matching React app design
st.markdown("""
<style>
    /* Main container */
    .main-container {
        text-align: center;
        padding: 3rem 1rem;
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-family: 'Nunito', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    }

    /* Hero emoji animation */
    .hero-emoji {
        font-size: 6rem;
        margin-bottom: 1.5rem;
        animation: bounce 3s ease-in-out infinite;
    }

    @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-12px); }
    }

    /* Title styling */
    .app-title {
        font-size: 2.8rem;
        font-weight: 900;
        color: #1B5E20;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
        margin-bottom: 0.5rem;
        font-family: 'Nunito', sans-serif;
    }

    /* Subtitle styling */
    .app-subtitle {
        font-size: 1.3rem;
        color: #5D4037;
        font-weight: 600;
        margin-bottom: 2rem;
        font-family: 'Nunito', sans-serif;
    }

    /* Emoji row animation */
    .emoji-row {
        display: flex;
        gap: 0.75rem;
        justify-content: center;
        margin-bottom: 2.5rem;
        font-size: 2rem;
    }

    .emoji-row span {
        animation: float 2s ease-in-out infinite;
    }

    @keyframes float {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-8px); }
    }

    /* Delay emoji animations */
    .emoji-row span:nth-child(1) { animation-delay: 0s; }
    .emoji-row span:nth-child(2) { animation-delay: 0.15s; }
    .emoji-row span:nth-child(3) { animation-delay: 0.3s; }
    .emoji-row span:nth-child(4) { animation-delay: 0.45s; }
    .emoji-row span:nth-child(5) { animation-delay: 0.6s; }
    .emoji-row span:nth-child(6) { animation-delay: 0.75s; }
    .emoji-row span:nth-child(7) { animation-delay: 0.9s; }
    .emoji-row span:nth-child(8) { animation-delay: 1.05s; }
    .emoji-row span:nth-child(9) { animation-delay: 1.2s; }
    .emoji-row span:nth-child(10) { animation-delay: 1.35s; }

    /* Primary button */
    .primary-button {
        background: linear-gradient(135deg, #2E7D32 0%, #43A047 100%);
        color: white;
        border: none;
        border-radius: 1.5rem;
        padding: 1rem 3rem;
        font-size: 1.2rem;
        font-weight: 700;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(46, 125, 50, 0.4);
        transition: all 0.3s ease;
        font-family: 'Nunito', sans-serif;
        display: inline-block;
        text-decoration: none;
        width: 100%;
        text-align: center;
    }

    .primary-button:hover {
        transform: scale(1.02);
        box-shadow: 0 6px 20px rgba(46, 125, 50, 0.5);
    }

    .teacher-button {
        background: linear-gradient(135deg, #7B1FA2 0%, #9C27B0 100%);
    }

    .teacher-button:hover {
        box-shadow: 0 6px 20px rgba(123, 31, 162, 0.5);
    }

    /* Card container */
    .card-container {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 1.5rem;
        width: 100%;
        margin-top: 3rem;
    }

    /* Feature cards */
    .feature-card {
        background: white;
        border-radius: 1.25rem;
        padding: 2rem 1.5rem;
        border: 2px solid #E8F5E9;
        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
        transition: all 0.3s ease;
    }

    .feature-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 8px 25px rgba(46, 125, 50, 0.2);
        border-color: #66BB6A;
    }

    .feature-card .emoji {
        font-size: 3rem;
        margin-bottom: 1rem;
    }

    .feature-card h3 {
        color: #2E7D32;
        font-size: 1.1rem;
        font-weight: 700;
        margin-bottom: 0.5rem;
        font-family: 'Nunito', sans-serif;
    }

    .feature-card p {
        color: #5D4037;
        font-size: 0.9rem;
        margin: 0;
    }

    /* Divider */
    .divider {
        width: 100px;
        height: 4px;
        background: linear-gradient(90deg, #66BB6A, #43A047, #2E7D32);
        border-radius: 2px;
        margin: 2rem auto;
    }

    /* Info section */
    .info-section {
        margin-top: 3rem;
        padding: 2rem;
        background: linear-gradient(135deg, #E8F5E9 0%, #C8E6C9 100%);
        border-radius: 1.5rem;
    }

    .info-section h3 {
        color: #1B5E20;
        font-size: 1.4rem;
        margin-bottom: 1rem;
        font-family: 'Nunito', sans-serif;
    }

    .info-section p {
        color: #33691E;
        line-height: 1.6;
        margin: 0.5rem 0;
        font-size: 0.95rem;
    }

    /* Hide Streamlit elements */
    #MainMenu {visibility: hidden;}
    footer {visibility: hidden;}
    .stDeployButton {display: none;}
</style>
""", unsafe_allow_html=True)


def show_home():
    """Display the home page"""

    # Hero Section
    st.markdown("""
    <div class="main-container">
        <div class="hero-emoji">🌱</div>
        <h1 class="app-title">English Vocabulary Adventure</h1>
        <p class="app-subtitle">Grades 1-5 · All Subjects · Every Week! 🌱→🏆</p>
    """, unsafe_allow_html=True)

    # Animated emoji row
    st.markdown("""
    <div class="emoji-row">
        <span>🌱</span>
        <span>🔢</span>
        <span>🔬</span>
        <span>🌿</span>
        <span>💻</span>
        <span>🎵</span>
        <span>📦</span>
        <span>➗</span>
        <span>🌳</span>
        <span>🎭</span>
    </div>
    """, unsafe_allow_html=True)

    # CTA Buttons
    col1, col2 = st.columns(2, gap="2rem")

    with col1:
        st.markdown(
            '<a href="pages/2_👨‍🎓_Student_Login.py" target="_self"><button class="primary-button">👨‍🎓 Start Learning!</button></a>',
            unsafe_allow_html=True
        )

    with col2:
        st.markdown(
            '<a href="pages/1_👨‍🏫_Teacher_Login.py" target="_self"><button class="primary-button teacher-button">👨‍🏫 Teacher Portal</button></a>',
            unsafe_allow_html=True
        )

    # Divider
    st.markdown('<div class="divider"></div>', unsafe_allow_html=True)

    # Feature Cards
    st.markdown("""
    <div class="card-container">
        <div class="feature-card">
            <div class="emoji">🎮</div>
            <h3>Gamified Learning</h3>
            <p>Fun quizzes with points, lives, and speed bonuses!</p>
        </div>
        <div class="feature-card">
            <div class="emoji">📚</div>
            <h3>8 Subjects</h3>
            <p>Maths, Science, STEAM, Music, Drama, Arts & PE</p>
        </div>
        <div class="feature-card">
            <div class="emoji">📊</div>
            <h3>Track Progress</h3>
            <p>Watch your vocabulary grow from seedling to mighty oak!</p>
        </div>
    </div>
    """, unsafe_allow_html=True)

    # Info Section
    st.markdown("""
    <div class="info-section">
        <h3>🌟 Welcome to Vocabulary Adventure!</h3>
        <p><strong>For Students:</strong> Enter your class code and start learning today!</p>
        <p><strong>For Teachers:</strong> Create classes, add students, and monitor progress.</p>
    </div>
    </div>
    """, unsafe_allow_html=True)


if __name__ == "__main__":
    show_home()
