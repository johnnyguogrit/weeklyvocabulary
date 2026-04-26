'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { ChevronLeft, Clock, Trophy, Heart, Lightbulb } from 'lucide-react'
import confetti from 'canvas-confetti'
import { getSubjectData } from '@/data/questionGenerator'

interface Question {
  id: string
  week: number
  keyword: string
  question: string
  options: string[]
  answer: string
  explanation: string
  passage?: string
}

interface QuizState {
  questions: Question[]
  currentIndex: number
  score: number
  correctCount: number
  selectedOption: string | null
  showResult: boolean
  isCorrect: boolean | null
  timeRemaining: number
  lives: number
  hintsUsed: number
}

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const grade = (params.grade as string)?.toUpperCase()
  const subject = params.subject as string
  const weekId = parseInt(params.weekId as string)

  const [quizState, setQuizState] = useState<QuizState>({
    questions: [],
    currentIndex: 0,
    score: 0,
    correctCount: 0,
    selectedOption: null,
    showResult: false,
    isCorrect: null,
    timeRemaining: 30,
    lives: 3,
    hintsUsed: 0,
  })

  const [isLoading, setIsLoading] = useState(true)
  const [difficulty, setDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY')

  // Load questions
  useEffect(() => {
    const loadQuestions = () => {
      try {
        const data = getSubjectData(grade, subject)
        const week = data.weeks.find(w => w.id === weekId)
        if (!week || week.questions.length === 0) {
          toast.error('No questions found for this week')
          router.back()
          return
        }
        setQuizState(prev => ({ ...prev, questions: week.questions }))
        setIsLoading(false)
      } catch (error) {
        toast.error('Failed to load questions')
        router.back()
      }
    }
    loadQuestions()
  }, [grade, subject, weekId, router])

  // Timer
  useEffect(() => {
    if (difficulty === 'EASY' || quizState.showResult || quizState.timeRemaining <= 0) return

    const timer = setInterval(() => {
      setQuizState(prev => {
        if (prev.timeRemaining <= 1) {
          // Time's up - treat as wrong answer
          handleAnswer(null)
          return { ...prev, timeRemaining: 30 }
        }
        return { ...prev, timeRemaining: prev.timeRemaining - 1 }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [difficulty, quizState.showResult, quizState.timeRemaining])

  // Update difficulty timer settings
  useEffect(() => {
    if (difficulty === 'EASY') {
      setQuizState(prev => ({ ...prev, timeRemaining: 0, lives: 999 }))
    } else if (difficulty === 'MEDIUM') {
      setQuizState(prev => ({ ...prev, timeRemaining: 30, lives: 999 }))
    } else {
      setQuizState(prev => ({ ...prev, timeRemaining: 15, lives: 3 }))
    }
  }, [difficulty])

  const currentQuestion = quizState.questions[quizState.currentIndex]

  const handleAnswer = useCallback(async (option: string | null) => {
    if (quizState.showResult) return

    const isCorrect = option === currentQuestion?.answer
    const newScore = isCorrect ? quizState.score + 10 : quizState.score
    const newCorrectCount = isCorrect ? quizState.correctCount + 1 : quizState.correctCount

    setQuizState(prev => ({
      ...prev,
      selectedOption: option,
      showResult: true,
      isCorrect,
      score: newScore,
      correctCount: newCorrectCount,
      lives: isCorrect ? prev.lives : prev.lives - 1,
    }))

    if (isCorrect) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
    }

    // Save progress after each question
    await saveProgress(newScore, newCorrectCount)
  }, [quizState, currentQuestion])

  const saveProgress = async (score: number, correctCount: number) => {
    try {
      const totalQuestions = quizState.questions.length
      const isLastQuestion = quizState.currentIndex === totalQuestions - 1
      const completed = isLastQuestion && (score / totalQuestions) >= 0.7

      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          grade,
          subject,
          weekId,
          score,
          completed,
          quizData: {
            questionsCorrect: correctCount,
            questionsTotal: quizState.currentIndex + 1
          }
        })
      })
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  const handleNext = () => {
    if (quizState.currentIndex < quizState.questions.length - 1) {
      setQuizState(prev => ({
        ...prev,
        currentIndex: prev.currentIndex + 1,
        selectedOption: null,
        showResult: false,
        isCorrect: null,
        timeRemaining: difficulty === 'HARD' ? 15 : difficulty === 'MEDIUM' ? 30 : 0,
      }))
    } else {
      // Quiz complete
      router.push(`/student/${params.grade}/${params.subject}`)
    }
  }

  const handleHint = () => {
    if (quizState.hintsUsed < 3 && !quizState.showResult && difficulty !== 'HARD') {
      setQuizState(prev => ({ ...prev, hintsUsed: prev.hintsUsed + 1 }))
      toast.success(`Hint: The answer starts with "${currentQuestion?.answer}"`)
    }
  }

  const getOptionLabel = (index: number) => ['A', 'B', 'C', 'D'][index]

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🌱</div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  const progress = ((quizState.currentIndex + 1) / quizState.questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-4">
              {difficulty !== 'EASY' && (
                <div className={`flex items-center gap-1 ${quizState.timeRemaining <= 5 ? 'text-red-600' : 'text-gray-600'}`}>
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">{quizState.timeRemaining}s</span>
                </div>
              )}
              {difficulty === 'HARD' && (
                <div className="flex items-center gap-1 text-red-500">
                  <Heart className="h-5 w-5" />
                  <span className="font-semibold">{quizState.lives}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-yellow-600">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">{quizState.score}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Progress value={progress} className="h-2 flex-1" />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {quizState.currentIndex + 1} / {quizState.questions.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={quizState.currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                {/* Keyword badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                    Keyword: {currentQuestion?.keyword}
                  </span>
                  {difficulty !== 'HARD' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleHint}
                      disabled={quizState.showResult || quizState.hintsUsed >= 3}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Hint ({3 - quizState.hintsUsed})
                    </Button>
                  )}
                </div>

                {/* Passage if available */}
                {currentQuestion?.passage && (
                  <div className="mb-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                    <p className="text-gray-700 text-sm leading-relaxed">{currentQuestion.passage}</p>
                  </div>
                )}

                {/* Question */}
                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestion?.question}
                </h2>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion?.options.map((option, index) => {
                    const label = getOptionLabel(index)
                    const isSelected = quizState.selectedOption === label
                    const isCorrectAnswer = label === currentQuestion.answer
                    const showCorrect = quizState.showResult && isCorrectAnswer
                    const showWrong = quizState.showResult && isSelected && !isCorrectAnswer

                    return (
                      <motion.button
                        key={index}
                        onClick={() => !quizState.showResult && handleAnswer(label)}
                        disabled={quizState.showResult}
                        whileHover={{ scale: quizState.showResult ? 1 : 1.02 }}
                        whileTap={{ scale: quizState.showResult ? 1 : 0.98 }}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          showCorrect
                            ? 'border-green-500 bg-green-50'
                            : showWrong
                              ? 'border-red-500 bg-red-50'
                              : isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                        } ${quizState.showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                        <div className="flex items-center gap-3">
                          <span className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center font-semibold ${
                            showCorrect
                              ? 'bg-green-500 text-white'
                              : showWrong
                                ? 'bg-red-500 text-white'
                                : 'bg-gray-200 text-gray-700'
                          }`}>
                            {label}
                          </span>
                          <span className="flex-1">{option}</span>
                          {showCorrect && <span className="text-green-600">✓</span>}
                          {showWrong && <span className="text-red-600">✗</span>}
                        </div>
                      </motion.button>
                    )
                  })}
                </div>

                {/* Result & Explanation */}
                {quizState.showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-lg bg-gray-50 border"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {quizState.isCorrect ? '🎉' : '😔'}
                      </span>
                      <div className="flex-1">
                        <p className={`font-semibold ${quizState.isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {quizState.isCorrect ? 'Correct!' : 'Not quite right'}
                        </p>
                        <p className="text-gray-700 mt-1">{currentQuestion?.explanation}</p>
                      </div>
                    </div>
                    <Button onClick={handleNext} className="w-full mt-4">
                      {quizState.currentIndex < quizState.questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </Button>
                  </motion.div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}
