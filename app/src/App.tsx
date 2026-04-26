import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { Difficulty, PlantStage, GameScreen, Grade, PlayerState, QuizState, SubjectProgress, WeekProgress, GradeProgress } from '@/types/game';
import { DIFFICULTY_CONFIG, PLANT_STAGES, GRADE_CONFIG, SUBJECT_CONFIG } from '@/types/game';
import { getSubjectData, getAllSubjectsForGrade, getAllGrades } from '@/data/questionGenerator';
import type { SubjectData, WeekData, ReadingPassage } from '@/types/game';
import './App.css';

const MATH_EMOJIS = ['📐', '🔢', '📊', '🧮', '📏', '✏️', '📦', '🔲', '➗', '🔬', '🎵', '🎨', '⚽', '🎭'];

// ─── Floating Emoji Background ───────────────────────────────────────
interface EmojiParticle { x: number; y: number; size: number; speedX: number; speedY: number; emoji: string; opacity: number; rotation: number; rotationSpeed: number; }

function FloatingEmojiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<EmojiParticle[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);
    const count = window.innerWidth < 480 ? 12 : window.innerWidth < 768 ? 20 : 30;
    particlesRef.current = Array.from({ length: count }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height, size: 22 + Math.random() * 22,
      speedX: -0.35 + Math.random() * 0.7, speedY: -0.3 + Math.random() * 0.5,
      emoji: MATH_EMOJIS[Math.floor(Math.random() * MATH_EMOJIS.length)],
      opacity: 0.1 + Math.random() * 0.18, rotation: Math.random() * Math.PI * 2, rotationSpeed: -0.007 + Math.random() * 0.014,
    }));
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particlesRef.current.forEach((p) => {
        p.x += p.speedX + Math.sin(Date.now() * 0.001 + p.y * 0.01) * 0.25;
        p.y += p.speedY; p.rotation += p.rotationSpeed;
        if (p.x < -50) p.x = canvas.width + 50; if (p.x > canvas.width + 50) p.x = -50;
        if (p.y < -50) p.y = canvas.height + 50; if (p.y > canvas.height + 50) p.y = -50;
        ctx.save(); ctx.translate(p.x, p.y); ctx.rotate(p.rotation);
        ctx.globalAlpha = p.opacity + Math.sin(Date.now() * 0.002 + p.x) * 0.04;
        ctx.font = `${p.size}px serif`; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText(p.emoji, 0, 0); ctx.restore();
      });
      rafRef.current = requestAnimationFrame(animate);
    };
    animate();
    return () => { cancelAnimationFrame(rafRef.current); window.removeEventListener('resize', resize); };
  }, []);
  return <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none" style={{ zIndex: 0 }} />;
}

// ─── Progress Bar ────────────────────────────────────────────────────
function ProgressBar({ progress, color }: { progress: number; color?: string }) {
  const stage = (Object.entries(PLANT_STAGES) as [PlantStage, typeof PLANT_STAGES[PlantStage]][]).reverse().find(([, v]) => progress >= v.threshold)?.[0] || 'seedling';
  const barColor = color || '#66BB6A';
  return (
    <div className="w-full max-w-lg mx-auto mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-semibold" style={{ color: '#5D4037' }}>Progress</span>
        <span className="text-sm font-bold" style={{ color: barColor }}>{Math.round(progress)}%</span>
      </div>
      <div className="relative h-5 rounded-full overflow-hidden" style={{ backgroundColor: '#E8F5E9' }}>
        <motion.div className="absolute inset-y-0 left-0 rounded-full" style={{ backgroundColor: barColor }}
          initial={{ width: 0 }} animate={{ width: `${progress}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} />
        <motion.div className="absolute top-1/2 -translate-y-1/2 text-lg" animate={{ left: `${progress}%` }} transition={{ duration: 0.6, ease: 'easeOut' }} style={{ marginLeft: -10 }}>
          {PLANT_STAGES[stage].emoji}
        </motion.div>
      </div>
    </div>
  );
}

// ─── Welcome Screen ──────────────────────────────────────────────────
function WelcomeScreen({ onStart }: { onStart: () => void }) {
  return (
    <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <motion.div className="mb-6" animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}>
        <img src="/assets/hero-plant.png" alt="Cute plant" className="w-40 h-40 object-contain" />
      </motion.div>
      <motion.h1 className="text-4xl md:text-5xl font-black text-center mb-3" style={{ color: '#1B5E20', fontFamily: 'Nunito, sans-serif', textShadow: '2px 2px 4px rgba(0,0,0,0.1)' }}
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
        English Vocabulary Adventure
      </motion.h1>
      <motion.p className="text-lg md:text-xl text-center mb-2 font-semibold" style={{ color: '#5D4037', fontFamily: 'Nunito, sans-serif' }}
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.5 }}>
        Grades 1-5 · All Subjects · Every Week! 🌱→🏆
      </motion.p>
      <motion.div className="flex gap-3 text-2xl mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {['🌱', '🔢', '🔬', '🌿', '💻', '🎵', '📦', '➗', '🌳', '🎭'].map((emoji, i) => (
          <motion.span key={i} animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.15, ease: 'easeInOut' }}>{emoji}</motion.span>
        ))}
      </motion.div>
      <motion.button onClick={onStart} className="px-12 py-4 text-xl font-bold text-white rounded-3xl shadow-lg cursor-pointer" style={{ backgroundColor: '#2E7D32', fontFamily: 'Nunito, sans-serif' }}
        whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5, duration: 0.5, type: 'spring', stiffness: 300 }}>
        Begin Adventure →
      </motion.button>
    </motion.div>
  );
}

// ─── Grade Selection Screen ────────────────────────────────────────
function GradeSelectScreen({ onSelect }: { onSelect: (g: Grade) => void }) {
  const grades = (Object.keys(GRADE_CONFIG) as Grade[]).sort();
  return (
    <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.h2 className="text-3xl md:text-4xl font-bold mb-2 text-center" style={{ color: '#1B5E20', fontFamily: 'Nunito, sans-serif' }}
        initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>
        Choose Your Grade 📚
      </motion.h2>
      <motion.p className="text-center mb-8" style={{ color: '#5D4037', fontFamily: 'Nunito' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        Select the grade level to start your vocabulary journey!
      </motion.p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 w-full max-w-3xl">
        {grades.map((grade, i) => {
          const config = GRADE_CONFIG[grade];
          return (
            <motion.button key={grade} onClick={() => onSelect(grade)}
              className="flex flex-col items-center p-5 rounded-2xl border-2 cursor-pointer transition-all text-center"
              style={{ backgroundColor: config.color + '15', borderColor: config.color + '50', fontFamily: 'Nunito' }}
              initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.12 * i, duration: 0.5, type: 'spring' }}
              whileHover={{ scale: 1.06, y: -6, boxShadow: `0 12px 30px ${config.color}30`, borderColor: config.color }}
              whileTap={{ scale: 0.96 }}>
              <span className="text-4xl mb-2">{config.emoji}</span>
              <h3 className="text-lg font-bold" style={{ color: config.color }}>{config.name}</h3>
              <p className="text-xs mt-1" style={{ color: '#5D4037' }}>{config.description}</p>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Subject Selection Screen ────────────────────────────────────────
function SubjectSelectScreen({ grade, onSelect, onBack }: { grade: Grade; onSelect: (s: string) => void; onBack: () => void }) {
  const subjects = getAllSubjectsForGrade(grade);
  const gradeConfig = GRADE_CONFIG[grade];
  return (
    <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="flex items-center w-full max-w-2xl mb-4">
        <button onClick={onBack} className="text-2xl p-2 rounded-full hover:bg-white/50 cursor-pointer transition-colors">←</button>
        <h2 className="text-2xl md:text-3xl font-bold text-center flex-1" style={{ color: '#1B5E20', fontFamily: 'Nunito, sans-serif' }}>
          {gradeConfig.emoji} {gradeConfig.name} — Choose Subject
        </h2>
        <div className="w-10" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-2xl">
        {subjects.map((subject, i) => {
          const config = SUBJECT_CONFIG[subject] || { name: subject, emoji: '📚', color: '#666', description: '' };
          return (
            <motion.button key={subject} onClick={() => onSelect(subject)}
              className="flex items-center gap-4 p-4 rounded-2xl border-2 cursor-pointer transition-all text-left"
              style={{ backgroundColor: config.color + '12', borderColor: config.color + '40', fontFamily: 'Nunito' }}
              initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.08 * i, duration: 0.4, type: 'spring' }}
              whileHover={{ scale: 1.03, y: -4, boxShadow: `0 8px 24px ${config.color}25`, borderColor: config.color }}
              whileTap={{ scale: 0.97 }}>
              <span className="text-4xl">{config.emoji}</span>
              <div>
                <h3 className="text-lg font-bold" style={{ color: config.color }}>{config.name}</h3>
                <p className="text-xs" style={{ color: '#5D4037' }}>{config.description}</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}

// ─── Difficulty Select Screen ──────────────────────────────────────
function DifficultyScreen({ subjectColor, onSelect }: { subjectColor: string; onSelect: (d: Difficulty) => void }) {
  const [selected, setSelected] = useState<Difficulty | null>(null);
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];
  const colors = {
    easy: { bg: '#E8F5E9', border: '#66BB6A', hover: '#C8E6C9' },
    medium: { bg: '#E3F2FD', border: '#42A5F5', hover: '#BBDEFB' },
    hard: { bg: subjectColor + '15', border: subjectColor, hover: subjectColor + '25' },
  };
  return (
    <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <h2 className="text-3xl font-bold mb-8 text-center" style={{ color: '#1B5E20', fontFamily: 'Nunito, sans-serif' }}>Choose Your Challenge Level</h2>
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-2xl">
        {difficulties.map((diff, i) => {
          const config = DIFFICULTY_CONFIG[diff];
          const c = colors[diff];
          return (
            <motion.div key={diff} className="flex-1 p-6 rounded-2xl border-3 cursor-pointer transition-all"
              style={{ backgroundColor: selected === diff ? c.hover : c.bg, borderColor: selected === diff ? '#FFCA28' : c.border, borderWidth: selected === diff ? 3 : 2 }}
              onClick={() => setSelected(diff)}
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, duration: 0.5, type: 'spring' }}
              whileHover={{ y: -8, boxShadow: '0 10px 25px rgba(0,0,0,0.15)' }}>
              <div className="text-5xl mb-3 text-center">{config.emoji}</div>
              <h3 className="text-xl font-bold text-center mb-2" style={{ color: '#1B5E20', fontFamily: 'Nunito, sans-serif' }}>{config.label}</h3>
              <p className="text-center text-sm" style={{ color: '#5D4037' }}>{config.description}</p>
            </motion.div>
          );
        })}
      </div>
      <AnimatePresence>
        {selected && (
          <motion.button onClick={() => onSelect(selected)} className="mt-8 px-10 py-3 text-lg font-bold text-white rounded-2xl shadow-lg cursor-pointer"
            style={{ backgroundColor: subjectColor, fontFamily: 'Nunito, sans-serif' }}
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            Start Learning! 🚀
          </motion.button>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// ─── Week Map Screen ─────────────────────────────────────────────────
function WeekMapScreen({ subjectData, subjectProgress, onSelectWeek, onBack }: {
  subjectData: SubjectData; subjectProgress: SubjectProgress; onSelectWeek: (weekId: number) => void; onBack: () => void;
}) {
  const getWeekProgress = (weekId: number) => subjectProgress.weekProgress.find((w) => w.weekId === weekId);
  return (
    <motion.div className="relative z-10 min-h-screen px-4 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-2xl p-2 rounded-full hover:bg-white/50 cursor-pointer transition-colors">←</button>
          <h2 className="text-2xl md:text-3xl font-bold text-center flex-1" style={{ color: '#1B5E20', fontFamily: 'Nunito, sans-serif' }}>
            {subjectData.emoji} {subjectData.name}
          </h2>
          <div className="w-10" />
        </div>
        <ProgressBar progress={subjectProgress.overallProgress} color={subjectData.color} />
        <div className="space-y-3 mt-6">
          {subjectData.weeks.map((week, i) => {
            const progress = getWeekProgress(week.id);
            const isCompleted = progress?.completed ?? false;
            const isLocked = progress?.locked ?? (i > 0 && !getWeekProgress(subjectData.weeks[i - 1].id)?.completed);
            const weekProg = progress ? Math.round(((progress.questionsCorrect + progress.readingCompCorrect) / (progress.questionsTotal + progress.readingCompTotal)) * 100) : 0;
            return (
              <motion.div key={week.id} className="relative rounded-2xl p-4 cursor-pointer transition-all"
                style={{ backgroundColor: isLocked ? '#F5F5F5' : 'white', borderLeftWidth: 5, borderLeftColor: isLocked ? '#BDBDBD' : week.color, boxShadow: '0 2px 8px rgba(0,0,0,0.08)', opacity: isLocked ? 0.6 : 1 }}
                onClick={() => !isLocked && onSelectWeek(week.id)}
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: isLocked ? 0.6 : 1, y: 0 }} transition={{ delay: i * 0.06, duration: 0.4 }}
                whileHover={!isLocked ? { scale: 1.02, boxShadow: '0 6px 20px rgba(0,0,0,0.12)' } : {}}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl">{isLocked ? '🔒' : week.emoji}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-bold" style={{ color: isLocked ? '#9E9E9E' : '#1B5E20', fontFamily: 'Nunito, sans-serif' }}>
                        Week {week.id}: {week.title}
                      </h3>
                      {isCompleted && <span className="text-green-600">✅</span>}
                    </div>
                    <p className="text-xs mt-0.5 truncate" style={{ color: '#5D4037' }}>{week.keywords.join(', ')}</p>
                    {progress && !isLocked && (
                      <div className="mt-1.5">
                        <div className="h-1.5 rounded-full" style={{ backgroundColor: '#E8F5E9' }}>
                          <motion.div className="h-full rounded-full" style={{ backgroundColor: week.color }} initial={{ width: 0 }} animate={{ width: `${weekProg}%` }} transition={{ duration: 0.5 }} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="text-xl">{isCompleted ? '🏆' : isLocked ? '' : '▶️'}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.div>
  );
}

// ─── Quiz Screen ────────────────────────────────────────────────────
function QuizScreen({ subjectData, weekId, difficulty, onComplete, onBack }: {
  subjectData: SubjectData; weekId: number; difficulty: Difficulty; onComplete: (correct: number, total: number, score: number) => void; onBack: () => void;
}) {
  const week = subjectData.weeks.find((w) => w.id === weekId)!;
  const questions = week.questions;
  const config = DIFFICULTY_CONFIG[difficulty];
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0, selectedAnswer: null, isAnswered: false, isCorrect: false,
    timeRemaining: config.timer, scoreThisQuestion: 0, showHint: false, livesRemaining: difficulty === 'hard' ? 3 : 999,
    totalQuestions: questions.length, correctCount: 0, speedBonusCount: 0,
  });
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const currentQ = questions[quizState.currentQuestionIndex];

  useEffect(() => {
    if (config.timer > 0 && !quizState.isAnswered && quizState.livesRemaining > 0) {
      startTimeRef.current = Date.now();
      timerRef.current = setInterval(() => {
        setQuizState((prev) => {
          if (prev.timeRemaining <= 1) return { ...prev, timeRemaining: 0, isAnswered: true, isCorrect: false, selectedAnswer: null };
          return { ...prev, timeRemaining: prev.timeRemaining - 1 };
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [quizState.currentQuestionIndex, quizState.isAnswered, quizState.livesRemaining, config.timer]);

  const handleSelect = (answer: string) => { if (quizState.isAnswered) return; setQuizState((prev) => ({ ...prev, selectedAnswer: answer })); };

  const handleCheck = () => {
    if (!quizState.selectedAnswer && config.timer === 0 && !quizState.isAnswered) return;
    if (quizState.isAnswered) {
      if (quizState.currentQuestionIndex + 1 >= questions.length) {
        onComplete(quizState.correctCount, questions.length, quizState.correctCount * 10 + quizState.speedBonusCount * 5);
        return;
      }
      setQuizState((prev) => ({ ...prev, currentQuestionIndex: prev.currentQuestionIndex + 1, selectedAnswer: null, isAnswered: false, isCorrect: false, timeRemaining: config.timer, showHint: false }));
      return;
    }
    const isCorrect = quizState.selectedAnswer === currentQ.correctAnswer;
    const timeTaken = (Date.now() - startTimeRef.current) / 1000;
    const speedBonus = config.timer > 0 && isCorrect && timeTaken < 10;
    if (timerRef.current) clearInterval(timerRef.current);
    setQuizState((prev) => ({ ...prev, isAnswered: true, isCorrect, correctCount: prev.correctCount + (isCorrect ? 1 : 0), speedBonusCount: prev.speedBonusCount + (speedBonus ? 1 : 0), livesRemaining: isCorrect ? prev.livesRemaining : prev.livesRemaining - 1 }));
  };

  const getTimerColor = () => { const pct = config.timer > 0 ? quizState.timeRemaining / config.timer : 1; if (pct > 0.5) return '#66BB6A'; if (pct > 0.2) return '#FFCA28'; return '#EF5350'; };

  if (quizState.livesRemaining <= 0) {
    return (
      <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
        <div className="text-6xl mb-4">💔</div>
        <h2 className="text-3xl font-bold mb-4" style={{ color: '#1B5E20', fontFamily: 'Nunito' }}>Out of Lives!</h2>
        <p className="text-lg mb-6" style={{ color: '#5D4037' }}>You got {quizState.correctCount} out of {questions.length} correct.</p>
        <button onClick={onBack} className="px-8 py-3 text-lg font-bold text-white rounded-2xl cursor-pointer" style={{ backgroundColor: '#2E7D32' }}>Try Again 🔄</button>
      </motion.div>
    );
  }

  return (
    <motion.div className="relative z-10 min-h-screen px-4 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-2xl p-2 rounded-full hover:bg-white/50 cursor-pointer transition-colors">←</button>
          <span className="text-sm font-semibold" style={{ color: '#5D4037' }}>Question {quizState.currentQuestionIndex + 1} of {questions.length}</span>
          <span className="text-sm font-bold" style={{ color: '#FFCA28' }}>⭐ {quizState.correctCount * 10 + quizState.speedBonusCount * 5} pts</span>
        </div>
        {config.timer > 0 && (
          <div className="mb-4">
            <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: '#E0E0E0' }}>
              <motion.div className="h-full rounded-full" style={{ backgroundColor: getTimerColor() }} animate={{ width: `${config.timer > 0 ? (quizState.timeRemaining / config.timer) * 100 : 100}%` }} transition={{ duration: 0.5 }} />
            </div>
            <p className="text-xs text-center mt-1" style={{ color: getTimerColor() }}>{quizState.timeRemaining}s remaining</p>
          </div>
        )}
        {difficulty === 'hard' && (
          <div className="flex justify-center gap-1 mb-4">
            {Array.from({ length: 3 }, (_, i) => <span key={i} className="text-xl">{i < quizState.livesRemaining ? '❤️' : '🖤'}</span>)}
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={quizState.currentQuestionIndex} className="rounded-2xl p-6 shadow-lg" style={{ backgroundColor: 'white' }}
            initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} transition={{ duration: 0.4 }}>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold" style={{ backgroundColor: week.color }}>Q{quizState.currentQuestionIndex + 1}</div>
              <span className="text-2xl">{week.emoji}</span>
            </div>
            <h3 className="text-xl font-semibold mb-6" style={{ color: '#5D4037', fontFamily: 'Nunito, sans-serif' }}>{currentQ.question}</h3>
            <div className="space-y-3">
              {currentQ.options.map((option, i) => {
                let borderColor = '#E0E0E0', bgColor = 'white', textColor = '#5D4037';
                if (quizState.isAnswered) {
                  if (option === currentQ.correctAnswer) { borderColor = '#66BB6A'; bgColor = '#E8F5E9'; textColor = '#2E7D32'; }
                  else if (option === quizState.selectedAnswer && !quizState.isCorrect) { borderColor = '#EF5350'; bgColor = '#FFEBEE'; textColor = '#C62828'; }
                } else if (option === quizState.selectedAnswer) { borderColor = '#1565C0'; bgColor = '#BBDEFB'; textColor = '#0D47A1'; }
                return (
                  <motion.button key={i} onClick={() => handleSelect(option)} className="w-full p-4 rounded-xl border-2 text-left font-semibold transition-all cursor-pointer flex items-center justify-between"
                    style={{ borderColor, backgroundColor: bgColor, color: textColor, fontFamily: 'Nunito, sans-serif' }}
                    whileHover={!quizState.isAnswered ? { borderColor: '#42A5F5', backgroundColor: '#E3F2FD' } : {}}
                    whileTap={!quizState.isAnswered ? { scale: 0.98 } : {}}
                    animate={quizState.isAnswered && option === quizState.selectedAnswer && !quizState.isCorrect ? { x: [0, -8, 8, -8, 8, 0] } : {}} transition={{ duration: 0.3 }}>
                    <span>{String.fromCharCode(65 + i)}) {option}</span>
                    {quizState.isAnswered && option === currentQ.correctAnswer && <span className="text-green-600 text-xl">✅</span>}
                    {quizState.isAnswered && option === quizState.selectedAnswer && !quizState.isCorrect && <span className="text-red-500 text-xl">❌</span>}
                  </motion.button>
                );
              })}
            </div>
            <AnimatePresence>
              {quizState.isAnswered && (
                <motion.div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: quizState.isCorrect ? '#E8F5E9' : '#FFEBEE', borderLeft: (quizState.isCorrect ? '4px solid #66BB6A' : '4px solid #EF5350') }}
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                  <p className="font-bold mb-1" style={{ color: quizState.isCorrect ? '#2E7D32' : '#C62828' }}>{quizState.isCorrect ? '🎉 Great job! +10 points' : '💡 The correct answer is shown above'}</p>
                  <p className="text-sm" style={{ color: '#5D4037' }}>{currentQ.explanation}</p>
                  {quizState.isCorrect && config.timer > 0 && quizState.timeRemaining > 20 && (
                    <motion.p className="text-sm font-bold mt-1" style={{ color: '#FF8F00' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>⚡ Speed bonus! +5 extra</motion.p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
            <motion.button onClick={handleCheck} className="w-full mt-4 py-3 text-lg font-bold text-white rounded-2xl cursor-pointer"
              style={{ backgroundColor: subjectData.color, fontFamily: 'Nunito, sans-serif' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              disabled={!quizState.selectedAnswer && !quizState.isAnswered}>
              {quizState.isAnswered ? (quizState.currentQuestionIndex + 1 >= questions.length ? 'Finish Week →' : 'Next Question →') : 'Check Answer'}
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Reading Comprehension Screen ────────────────────────────────────
function ReadingCompScreen({ subjectData, passage, difficulty, onComplete, onBack }: {
  subjectData: SubjectData; passage: ReadingPassage; difficulty: Difficulty; onComplete: (correct: number, total: number, score: number) => void; onBack: () => void;
}) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState<number>(config.timer);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const currentQ = passage.questions[currentQIndex];

  useEffect(() => {
    if (config.timer > 0 && !isAnswered) {
      timerRef.current = setInterval(() => {
        setTimeRemaining((prev: number) => {
          if (prev <= 1) { setIsAnswered(true); setIsCorrect(false); return 0; }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [currentQIndex, isAnswered, config.timer]);

  const handleSelect = (answer: string) => { if (isAnswered) return; setSelectedAnswer(answer); };

  const handleCheck = () => {
    if (!selectedAnswer && !isAnswered) return;
    if (isAnswered) {
      if (currentQIndex + 1 >= passage.questions.length) { onComplete(correctCount, passage.questions.length, correctCount * 15); return; }
      setCurrentQIndex((prev) => prev + 1); setSelectedAnswer(null); setIsAnswered(false); setIsCorrect(false); setTimeRemaining(config.timer); return;
    }
    const correct = selectedAnswer === currentQ.correctAnswer;
    if (correct) setCorrectCount((prev) => prev + 1);
    setIsCorrect(correct); setIsAnswered(true);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  return (
    <motion.div className="relative z-10 min-h-screen px-4 py-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <button onClick={onBack} className="text-2xl p-2 rounded-full hover:bg-white/50 cursor-pointer">←</button>
          <span className="text-sm font-semibold" style={{ color: '#5D4037' }}>Reading: Q{currentQIndex + 1} of {passage.questions.length}</span>
          <span className="text-sm font-bold" style={{ color: '#FFCA28' }}>⭐ {correctCount * 15} pts</span>
        </div>
        {config.timer > 0 && (
          <div className="mb-4">
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: '#E0E0E0' }}>
              <motion.div className="h-full rounded-full" style={{ backgroundColor: timeRemaining > config.timer * 0.5 ? '#66BB6A' : timeRemaining > config.timer * 0.2 ? '#FFCA28' : '#EF5350' }} animate={{ width: `${(timeRemaining / config.timer) * 100}%` }} />
            </div>
            <p className="text-xs text-center mt-1" style={{ color: '#5D4037' }}>{timeRemaining}s</p>
          </div>
        )}
        <AnimatePresence mode="wait">
          <motion.div key={currentQIndex} initial={{ x: 50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -50, opacity: 0 }} transition={{ duration: 0.3 }}>
            <div className="rounded-2xl p-5 mb-4 shadow-md" style={{ backgroundColor: '#FFF8E1', borderLeft: `4px solid ${subjectData.color}` }}>
              <h3 className="text-lg font-bold mb-2" style={{ color: subjectData.color, fontFamily: 'Nunito' }}>📖 {passage.title}</h3>
              <p className="text-base leading-relaxed" style={{ color: '#5D4037' }} dangerouslySetInnerHTML={{ __html: passage.passage.replace(/\*\*/g, '<strong style=\"color:' + subjectData.color + ';font-weight:700\">').replace(/\*\*/g, '</strong>') }} />
            </div>
            <div className="rounded-2xl p-5 shadow-lg" style={{ backgroundColor: 'white' }}>
              <h3 className="text-lg font-semibold mb-4" style={{ color: '#5D4037', fontFamily: 'Nunito' }}>{currentQ.question}</h3>
              <div className="space-y-3">
                {currentQ.options.map((option, i) => {
                  let borderColor = '#E0E0E0', bgColor = 'white';
                  if (isAnswered) {
                    if (option === currentQ.correctAnswer) { borderColor = '#66BB6A'; bgColor = '#E8F5E9'; }
                    else if (option === selectedAnswer && !isCorrect) { borderColor = '#EF5350'; bgColor = '#FFEBEE'; }
                  } else if (option === selectedAnswer) { borderColor = '#1565C0'; bgColor = '#BBDEFB'; }
                  return (
                    <motion.button key={i} onClick={() => handleSelect(option)} className="w-full p-4 rounded-xl border-2 text-left font-semibold cursor-pointer flex items-center justify-between"
                      style={{ borderColor, backgroundColor: bgColor, color: '#5D4037', fontFamily: 'Nunito' }}
                      whileHover={!isAnswered ? { borderColor: '#42A5F5' } : {}} whileTap={!isAnswered ? { scale: 0.98 } : {}}>
                      <span>{String.fromCharCode(65 + i)}) {option}</span>
                      {isAnswered && option === currentQ.correctAnswer && <span className="text-green-600">✅</span>}
                      {isAnswered && option === selectedAnswer && !isCorrect && <span className="text-red-500">❌</span>}
                    </motion.button>
                  );
                })}
              </div>
              <AnimatePresence>
                {isAnswered && (
                  <motion.div className="mt-4 p-4 rounded-xl" style={{ backgroundColor: isCorrect ? '#E8F5E9' : '#FFEBEE', borderLeft: (isCorrect ? '4px solid #66BB6A' : '4px solid #EF5350') }}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                    <p className="font-bold" style={{ color: isCorrect ? '#2E7D32' : '#C62828' }}>{isCorrect ? '🎉 Correct! +15 points' : '💡 Explanation'}</p>
                    <p className="text-sm mt-1" style={{ color: '#5D4037' }}>{currentQ.explanation}</p>
                  </motion.div>
                )}
              </AnimatePresence>
              <motion.button onClick={handleCheck} className="w-full mt-4 py-3 text-lg font-bold text-white rounded-2xl cursor-pointer"
                style={{ backgroundColor: subjectData.color, fontFamily: 'Nunito' }} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                {isAnswered ? (currentQIndex + 1 >= passage.questions.length ? 'Finish →' : 'Next →') : 'Check Answer'}
              </motion.button>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

// ─── Week Complete Screen ────────────────────────────────────────────
function WeekCompleteScreen({ subjectData, week, quizCorrect, quizTotal, quizScore, readingCorrect, readingTotal, readingScore, onContinue }: {
  subjectData: SubjectData; week: WeekData; quizCorrect: number; quizTotal: number; quizScore: number;
  readingCorrect: number; readingTotal: number; readingScore: number; onContinue: () => void;
}) {
  const totalCorrect = quizCorrect + readingCorrect;
  const totalQuestions = quizTotal + readingTotal;
  const totalScore = quizScore + readingScore;
  const isPerfect = totalCorrect === totalQuestions;
  useEffect(() => { if (isPerfect) confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 }, colors: ['#66BB6A', '#FFCA28', '#42A5F5'] }); }, [isPerfect]);
  return (
    <motion.div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="text-6xl mb-4" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200, damping: 10 }}>
        {isPerfect ? '🌳✨' : totalCorrect >= totalQuestions * 0.7 ? '🌿' : '🌱'}
      </motion.div>
      <motion.h2 className="text-3xl font-bold mb-2 text-center" style={{ color: '#1B5E20', fontFamily: 'Nunito' }} initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
        Week {week.id} Complete! 🎉
      </motion.h2>
      <motion.div className="text-5xl font-black mb-4" style={{ color: '#FFCA28', fontFamily: 'Nunito' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
        ⭐ {totalScore}
      </motion.div>
      <motion.div className="rounded-2xl p-6 w-full max-w-md shadow-lg mb-6" style={{ backgroundColor: 'white' }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}>
        <h3 className="text-lg font-bold mb-3" style={{ color: '#1B5E20', fontFamily: 'Nunito' }}>Score Breakdown</h3>
        <div className="space-y-2">
          <div className="flex justify-between"><span style={{ color: '#5D4037' }}>Vocabulary Quiz:</span><span className="font-bold" style={{ color: '#2E7D32' }}>{quizCorrect}/{quizTotal} correct (+{quizScore} pts)</span></div>
          {readingTotal > 0 && <div className="flex justify-between"><span style={{ color: '#5D4037' }}>Reading Comprehension:</span><span className="font-bold" style={{ color: '#2E7D32' }}>{readingCorrect}/{readingTotal} correct (+{readingScore} pts)</span></div>}
          {isPerfect && <div className="flex justify-between pt-2 border-t" style={{ borderColor: '#E0E0E0' }}><span style={{ color: '#5D4037' }}>Perfect Week Bonus:</span><span className="font-bold" style={{ color: '#FF8F00' }}>+20 pts</span></div>}
        </div>
        <div className="mt-4 pt-3 border-t" style={{ borderColor: '#E0E0E0' }}>
          <h4 className="text-sm font-bold mb-2" style={{ color: '#1B5E20' }}>Keywords Mastered ✅</h4>
          <div className="flex flex-wrap gap-2">
            {week.keywords.map((kw) => <span key={kw} className="px-3 py-1 rounded-full text-sm font-semibold" style={{ backgroundColor: week.color + '20', color: week.color }}>{kw}</span>)}
          </div>
        </div>
      </motion.div>
      <motion.button onClick={onContinue} className="px-10 py-3 text-lg font-bold text-white rounded-2xl shadow-lg cursor-pointer"
        style={{ backgroundColor: subjectData.color, fontFamily: 'Nunito' }} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
        Continue to Map 🗺️
      </motion.button>
    </motion.div>
  );
}

// ─── Final Results Screen ────────────────────────────────────────────
function FinalResultsScreen({ subjectData, subjectProgress, onReplay, onBack }: { subjectData: SubjectData; subjectProgress: SubjectProgress; onReplay: () => void; onBack: () => void }) {
  const maxScore = subjectProgress.weekProgress.length * 100;
  const percentage = maxScore > 0 ? Math.round((subjectProgress.totalScore / maxScore) * 100) : 0;
  const grade = percentage >= 90 ? { label: 'Outstanding!', emoji: '🌟', color: '#FF8F00' } : percentage >= 70 ? { label: 'Excellent!', emoji: '🌟', color: '#2E7D32' } : percentage >= 50 ? { label: 'Great Job!', emoji: '⭐', color: '#42A5F5' } : { label: 'Keep Learning!', emoji: '👍', color: '#9C27B0' };

  useEffect(() => {
    const duration = 3000; const end = Date.now() + duration;
    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: ['#66BB6A', '#FFCA28', '#42A5F5', '#AB47BC'] });
      confetti({ particleCount: 4, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: ['#66BB6A', '#FFCA28', '#42A5F5', '#AB47BC'] });
      if (Date.now() < end) requestAnimationFrame(frame);
    };
    frame();
  }, []);

  return (
    <motion.div className="relative z-10 min-h-screen px-4 py-8 overflow-hidden" style={{ background: `linear-gradient(135deg, ${subjectData.color} 0%, #42A5F5 100%)` }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      {Array.from({ length: 12 }, (_, i) => (
        <motion.span key={i} className="absolute text-2xl pointer-events-none" style={{ left: `${Math.random() * 100}%`, top: -30 }}
          animate={{ y: ['0vh', '110vh'], x: [0, Math.sin(i) * 50] }} transition={{ duration: 10 + Math.random() * 10, repeat: Infinity, delay: i * 0.8, ease: 'linear' }}>🍃</motion.span>
      ))}
      <div className="max-w-2xl mx-auto text-center relative">
        <motion.div className="text-6xl mb-4" animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}>🏆</motion.div>
        <motion.h1 className="text-4xl md:text-5xl font-black text-white mb-2" style={{ fontFamily: 'Nunito', textShadow: '2px 2px 4px rgba(0,0,0,0.2)' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 200 }}>
          {subjectData.name} Complete!
        </motion.h1>
        <motion.p className="text-xl text-white/90 mb-6" style={{ fontFamily: 'Nunito' }}>{grade.emoji} {grade.label}</motion.p>
        <motion.div className="text-5xl font-black text-white mb-8" style={{ fontFamily: 'Nunito' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.3, type: 'spring' }}>
          ⭐ {subjectProgress.totalScore} / {maxScore}
        </motion.div>
        <motion.div className="mx-auto mb-8 relative" style={{ width: 220, height: 220 }} initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.5, duration: 0.8, type: 'spring' }}>
          <motion.div className="absolute inset-0 rounded-full" style={{ background: 'radial-gradient(circle, rgba(255,214,0,0.3) 0%, transparent 70%)' }}
            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
          <img src="/assets/badge-gold.png" alt="Vocabulary Master Badge" className="w-full h-full object-contain relative z-10" />
          {[0, 1, 2, 3, 4].map((i) => (
            <motion.span key={i} className="absolute text-xl z-20" style={{ left: '50%', top: '50%' }}
              animate={{ x: Math.cos((i * Math.PI * 2) / 5) * 120 - 10, y: Math.sin((i * Math.PI * 2) / 5) * 120 - 10 }} transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}>⭐</motion.span>
          ))}
        </motion.div>
        <motion.div className="rounded-2xl p-6 mb-6 shadow-lg" style={{ backgroundColor: 'rgba(255,255,255,0.95)' }} initial={{ y: 30, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}>
          <h3 className="text-xl font-bold mb-4" style={{ color: '#1B5E20', fontFamily: 'Nunito' }}>🎯 Keyword Mastery Summary</h3>
          {subjectData.weeks.map((week) => {
            const progress = subjectProgress.weekProgress.find((w) => w.weekId === week.id);
            const weekCorrect = progress ? progress.questionsCorrect + progress.readingCompCorrect : 0;
            const weekTotal = progress ? progress.questionsTotal + progress.readingCompTotal : 8;
            const mastered = weekCorrect >= weekTotal * 0.7;
            return (
              <div key={week.id} className="mb-3 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span>{week.emoji}</span>
                  <span className="font-semibold text-sm" style={{ color: week.color }}>Week {week.id}: {week.title}</span>
                  <span className="ml-auto text-sm">{mastered ? '✅' : '⚠️'}</span>
                </div>
                <div className="flex flex-wrap gap-1 ml-6">
                  {week.keywords.map((kw) => <span key={kw} className="px-2 py-0.5 rounded-full text-xs" style={{ backgroundColor: mastered ? week.color + '20' : '#F5F5F5', color: mastered ? week.color : '#9E9E9E' }}>{kw}</span>)}
                </div>
              </div>
            );
          })}
        </motion.div>
        <div className="flex gap-4 justify-center">
          <motion.button onClick={onBack} className="px-8 py-3 text-lg font-bold rounded-2xl shadow-lg cursor-pointer"
            style={{ backgroundColor: 'white', color: subjectData.color, fontFamily: 'Nunito' }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
            ← Back to Map
          </motion.button>
          <motion.button onClick={onReplay} className="px-8 py-3 text-lg font-bold rounded-2xl shadow-lg cursor-pointer"
            style={{ backgroundColor: '#FFCA28', color: '#5D4037', fontFamily: 'Nunito' }}
            whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}>
            🔄 Play Again
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Player State Helpers ──────────────────────────────────────────
function createInitialProgress(): Record<Grade, GradeProgress> {
  const result = {} as Record<Grade, GradeProgress>;
  for (const grade of getAllGrades() as Grade[]) {
    result[grade] = { grade, subjects: {} };
    for (const subject of getAllSubjectsForGrade(grade)) {
      const sData = getSubjectData(grade, subject);
      result[grade].subjects[subject] = {
        subject,
        totalScore: 0,
        overallProgress: 0,
        currentPlantStage: 'seedling',
        weekProgress: sData.weeks.map((w, i) => ({
          weekId: w.id, completed: false, score: 0, questionsCorrect: 0, questionsTotal: w.questions.length,
          readingCompCorrect: 0, readingCompTotal: 3, keywordsMastered: [], locked: i !== 0,
        })),
      };
    }
  }
  return result;
}

function App() {
  const [screen, setScreen] = useState<GameScreen>('welcome');
  const [player, setPlayer] = useState<PlayerState>({
    name: 'Student', difficulty: 'easy', currentGrade: null, currentSubject: null,
    gradeProgress: createInitialProgress(), currentWeek: null,
  });
  const [weekScores, setWeekScores] = useState({ quizCorrect: 0, quizTotal: 0, quizScore: 0, readingCorrect: 0, readingTotal: 0, readingScore: 0 });

  // Load saved progress
  useEffect(() => {
    const saved = localStorage.getItem('vocabularyAdventure_v2_progress');
    if (saved) {
      try {
        const data = JSON.parse(saved);
        const fresh = createInitialProgress();
        if (data.gradeProgress) {
          for (const g of Object.keys(data.gradeProgress) as Grade[]) {
            if (fresh[g] && data.gradeProgress[g]?.subjects) {
              for (const s of Object.keys(data.gradeProgress[g].subjects)) {
                if (fresh[g].subjects[s]) {
                  fresh[g].subjects[s] = { ...fresh[g].subjects[s], ...data.gradeProgress[g].subjects[s] };
                }
              }
            }
          }
        }
        setPlayer((prev) => ({ ...prev, ...data, gradeProgress: fresh }));
      } catch { /* ignore */ }
    }
  }, []);

  // Save progress
  useEffect(() => {
    localStorage.setItem('vocabularyAdventure_v2_progress', JSON.stringify(player));
  }, [player]);

  const calculateOverallProgress = useCallback((progress: WeekProgress[]) => {
    return progress.length > 0 ? (progress.filter((w) => w.completed).length / progress.length) * 100 : 0;
  }, []);

  const getPlantStage = useCallback((progressPercent: number): PlantStage => {
    if (progressPercent >= 81) return 'mighty_oak';
    if (progressPercent >= 51) return 'young_tree';
    if (progressPercent >= 21) return 'sapling';
    return 'seedling';
  }, []);

  const currentGrade = player.currentGrade;
  const currentSubject = player.currentSubject;
  const currentSubjectData = (currentGrade && currentSubject) ? getSubjectData(currentGrade, currentSubject) : null;
  const currentSubjectProgress = (currentGrade && currentSubject) ? player.gradeProgress[currentGrade]?.subjects[currentSubject] : null;
  const currentWeekData = (currentSubjectData && player.currentWeek) ? currentSubjectData.weeks.find((w) => w.id === player.currentWeek) : null;

  const handleStart = () => setScreen('gradeSelect');
  const handleSelectGrade = (grade: Grade) => { setPlayer((prev) => ({ ...prev, currentGrade: grade })); setScreen('subjectSelect'); };
  const handleSelectSubject = (subject: string) => { setPlayer((prev) => ({ ...prev, currentSubject: subject })); setScreen('difficulty'); };
  const handleDifficultySelect = (diff: Difficulty) => { setPlayer((prev) => ({ ...prev, difficulty: diff })); setScreen('weekMap'); };
  const handleSelectWeek = (weekId: number) => { setPlayer((prev) => ({ ...prev, currentWeek: weekId })); setScreen('quiz'); };

  // Helper function to mark week as completed and unlock next week
  const markWeekCompleted = (quizCorrect: number, quizTotal: number, quizScore: number, readingCorrect: number, readingTotal: number, readingScore: number) => {
    const weekId = player.currentWeek!;
    const grade = player.currentGrade!;
    const subject = player.currentSubject!;
    const totalScore = quizScore + readingScore + (quizCorrect + readingCorrect === quizTotal + readingTotal ? 20 : 0);

    setPlayer((p) => {
      const gradeProg = { ...p.gradeProgress[grade] };
      const subjectProg = { ...gradeProg.subjects[subject] };
      const newWeekProgress = subjectProg.weekProgress.map((w) =>
        w.weekId === weekId ? {
          ...w, completed: true, score: totalScore, questionsCorrect: quizCorrect,
          questionsTotal: quizTotal, readingCompCorrect: readingCorrect,
          readingCompTotal: readingTotal, keywordsMastered: currentSubjectData?.weeks.find((wd) => wd.id === weekId)?.keywords ?? [], locked: false,
        } : w
      );
      const sData = getSubjectData(grade, subject);
      const weekIndex = sData.weeks.findIndex((w) => w.id === weekId);
      if (weekIndex >= 0 && weekIndex + 1 < sData.weeks.length) {
        const nextWeekId = sData.weeks[weekIndex + 1].id;
        const nextWeek = newWeekProgress.find((w) => w.weekId === nextWeekId);
        if (nextWeek) nextWeek.locked = false;
      }
      const overall = calculateOverallProgress(newWeekProgress);
      gradeProg.subjects = { ...gradeProg.subjects, [subject]: { ...subjectProg, weekProgress: newWeekProgress, totalScore: newWeekProgress.reduce((sum, w) => sum + w.score, 0), overallProgress: overall, currentPlantStage: getPlantStage(overall) } };
      return { ...p, gradeProgress: { ...p.gradeProgress, [grade]: gradeProg } };
    });
  };

  const handleQuizComplete = (correct: number, total: number, score: number) => {
    setWeekScores((prev) => ({ ...prev, quizCorrect: correct, quizTotal: total, quizScore: score }));
    // Check if there's a reading passage for this week
    const passage = currentSubjectData?.passages.find((p) => p.weekId === player.currentWeek);
    if (passage && passage.questions.length > 0) {
      setScreen('readingComp');
    } else {
      // No reading passage, mark week complete directly
      setWeekScores((prev) => ({ ...prev, readingCorrect: 0, readingTotal: 0, readingScore: 0 }));
      markWeekCompleted(correct, total, score, 0, 0, 0);
      setScreen('weekComplete');
    }
  };

  const handleReadingComplete = (correct: number, total: number, score: number) => {
    setWeekScores((prev) => {
      const newScores = { ...prev, readingCorrect: correct, readingTotal: total, readingScore: score };
      markWeekCompleted(newScores.quizCorrect, newScores.quizTotal, newScores.quizScore, correct, total, score);
      return newScores;
    });
    setScreen('weekComplete');
  };

  const handleWeekCompleteContinue = () => {
    const grade = player.currentGrade!;
    const subject = player.currentSubject!;
    const allDone = player.gradeProgress[grade].subjects[subject].weekProgress.every((w) => w.completed);
    setScreen(allDone ? 'results' : 'weekMap');
  };

  const handleReplay = () => {
    const grade = player.currentGrade!;
    const subject = player.currentSubject!;
    const sData = getSubjectData(grade, subject);
    setPlayer((prev) => {
      const gradeProg = { ...prev.gradeProgress[grade] };
      gradeProg.subjects = { ...gradeProg.subjects, [subject]: {
        subject, totalScore: 0, overallProgress: 0, currentPlantStage: 'seedling',
        weekProgress: sData.weeks.map((w, i) => ({
          weekId: w.id, completed: false, score: 0, questionsCorrect: 0, questionsTotal: w.questions.length,
          readingCompCorrect: 0, readingCompTotal: 3, keywordsMastered: [], locked: i !== 0,
        })),
      }};
      return { ...prev, gradeProgress: { ...prev.gradeProgress, [grade]: gradeProg } };
    });
    setScreen('weekMap');
  };

  const handleFullReset = () => {
    localStorage.removeItem('vocabularyAdventure_v2_progress');
    setPlayer({ name: 'Student', difficulty: 'easy', currentGrade: null, currentSubject: null, gradeProgress: createInitialProgress(), currentWeek: null });
    setScreen('welcome');
  };

  return (
    <div className="min-h-screen" style={{ background: 'linear-gradient(180deg, #FFF8E1 0%, #FAFAFA 100%)' }}>
      <FloatingEmojiBackground />
      <AnimatePresence mode="wait">
        {screen === 'welcome' && <WelcomeScreen key="welcome" onStart={handleStart} />}
        {screen === 'gradeSelect' && <GradeSelectScreen key="grades" onSelect={handleSelectGrade} />}
        {screen === 'subjectSelect' && currentGrade && <SubjectSelectScreen key={`subjects-${currentGrade}`} grade={currentGrade} onSelect={handleSelectSubject} onBack={() => setScreen('gradeSelect')} />}
        {screen === 'difficulty' && currentSubjectData && <DifficultyScreen key={`diff-${currentGrade}-${currentSubject}`} subjectColor={currentSubjectData.color} onSelect={handleDifficultySelect} />}
        {screen === 'weekMap' && currentSubjectData && currentSubjectProgress && (
          <WeekMapScreen key={`weekmap-${currentGrade}-${currentSubject}`} subjectData={currentSubjectData} subjectProgress={currentSubjectProgress} onSelectWeek={handleSelectWeek} onBack={() => setScreen('subjectSelect')} />
        )}
        {screen === 'quiz' && currentSubjectData && currentWeekData && (
          <QuizScreen key={`quiz-${currentGrade}-${currentSubject}-${player.currentWeek}`} subjectData={currentSubjectData} weekId={player.currentWeek!} difficulty={player.difficulty} onComplete={handleQuizComplete} onBack={() => setScreen('weekMap')} />
        )}
        {screen === 'readingComp' && currentSubjectData && player.currentWeek && (
          <ReadingCompScreen key={`rc-${currentGrade}-${currentSubject}-${player.currentWeek}`} subjectData={currentSubjectData} passage={currentSubjectData.passages.find((p) => p.weekId === player.currentWeek)!} difficulty={player.difficulty} onComplete={handleReadingComplete} onBack={() => setScreen('weekMap')} />
        )}
        {screen === 'weekComplete' && currentSubjectData && currentWeekData && (
          <WeekCompleteScreen key={`wc-${currentGrade}-${currentSubject}-${player.currentWeek}`} subjectData={currentSubjectData} week={currentWeekData} {...weekScores} onContinue={handleWeekCompleteContinue} />
        )}
        {screen === 'results' && currentSubjectData && currentSubjectProgress && (
          <FinalResultsScreen key={`results-${currentGrade}-${currentSubject}`} subjectData={currentSubjectData} subjectProgress={currentSubjectProgress} onReplay={handleReplay} onBack={() => setScreen('weekMap')} />
        )}
      </AnimatePresence>
      {screen !== 'welcome' && screen !== 'gradeSelect' && (
        <button onClick={handleFullReset} className="fixed bottom-4 left-4 z-50 px-3 py-1.5 text-xs rounded-lg opacity-40 hover:opacity-80 transition-opacity cursor-pointer"
          style={{ backgroundColor: '#5D4037', color: 'white', fontFamily: 'Nunito' }}>Reset All</button>
      )}
    </div>
  );
}

export default App;
