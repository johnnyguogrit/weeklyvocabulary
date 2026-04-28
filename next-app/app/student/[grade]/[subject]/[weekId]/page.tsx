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
import type { Question } from '@/types/game'
import { subjectToSlug } from '@/lib/subjectUtils'

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const grade = (params.grade as string)?.toUpperCase()
  const rawSubject = params.subject as string

  // Normalize subject name to match data keys (e.g., "maths" -> "Maths", "visual-arts" -> "Visual Arts")
  const normalizeSubject = (subject: string): string => {
    const subjectMap: Record<string, string> = {
      'maths': 'Maths',
      'science': 'Science',
      'steam': 'STEAM',
      'music': 'Music',
      'performing-arts': 'Performing Arts',
      'drama': 'Drama',
      'visual-arts': 'Visual Arts',
      'pe': 'PE',
    }
    const normalized = subjectMap[subject.toLowerCase()] || subject
    console.log('[normalizeSubject]', { input: subject, output: normalized })
    return normalized
  }

  const subject = normalizeSubject(rawSubject)
  console.log('[QuizPage Init]', { grade, rawSubject, subject })
  const weekId = parseInt(params.weekId as string)

  const [questions, setQuestions] = useState<Question[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [score, setScore] = useState(0)
  const [correctCount, setCorrectCount] = useState(0)
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [lives, setLives] = useState(3)
  const [hintsUsed, setHintsUsed] = useState(0)
  const [difficulty, setDifficulty] = useState<'EASY' | 'MEDIUM' | 'HARD'>('EASY')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadQuestions = () => {
      try {
        console.log('[QuizPage] Loading questions:', { grade, subject, weekId })
        const data = getSubjectData(grade, subject)
        console.log('[QuizPage] getSubjectData result:', {
          weeksCount: data.weeks.length,
          weekIds: data.weeks.map(w => w.id),
          week2Questions: data.weeks.find(w => w.id === 2)?.questions.length || 0
        })
        const week = data.weeks.find(w => w.id === weekId)
        if (!week || week.questions.length === 0) {
          toast.error('No questions found for this week')
          router.back()
          return
        }
        console.log('[QuizPage] Week questions:', {
          weekId,
          firstQuestion: week.questions[0]
        })
        setQuestions(week.questions)
        setIsLoading(false)
      } catch (error) {
        console.error('[QuizPage] Error loading questions:', error)
        toast.error('Failed to load questions')
        router.back()
      }
    }
    loadQuestions()
  }, [grade, subject, weekId, router])

  const currentQuestion = questions[currentIndex]

  // Handle time running out - auto-mark as wrong
  const handleTimeUp = useCallback(async () => {
    if (showResult) return

    const isLastQuestion = currentIndex === questions.length - 1
    const accuracy = correctCount / questions.length
    const completed = isLastQuestion && accuracy >= 0.7

    setSelectedOption(null)
    setShowResult(true)
    setIsCorrect(false)
    setLives(prev => prev - 1)

    // Save progress
    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          grade,
          subject,
          weekId,
          score: Math.round(accuracy * 100),
          completed,
          quizData: {
            questionsCorrect: correctCount,
            questionsTotal: questions.length,
            keywordsMastered: []
          }
        })
      })
      console.log('[QuizPage] Progress saved after time up')
    } catch (error) {
      console.error('[QuizPage] Failed to save progress:', error)
    }
  }, [showResult, correctCount, questions, currentIndex, grade, subject, weekId])

  useEffect(() => {
    if (difficulty === 'EASY' || showResult || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleTimeUp()
          return difficulty === 'HARD' ? 15 : difficulty === 'MEDIUM' ? 30 : 0
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [difficulty, showResult, timeRemaining, handleTimeUp])

  const handleAnswer = useCallback(async (option: string | null) => {
    if (showResult) return

    const correct = option === currentQuestion?.correctAnswer
    const newScore = correct ? score + 10 : score
    const newCorrectCount = correct ? correctCount + 1 : correctCount
    const isLastQuestion = currentIndex === questions.length - 1

    setSelectedOption(option)
    setShowResult(true)
    setIsCorrect(correct)
    setScore(newScore)
    setCorrectCount(newCorrectCount)
    setLives(correct ? lives : lives - 1)

    if (correct) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
    }

    // Save progress - await to ensure it completes before user can click Next
    const accuracy = newCorrectCount / questions.length
    const completed = isLastQuestion && accuracy >= 0.7
    console.log('[QuizPage] Saving progress after answer:', {
      weekId,
      currentIndex,
      totalQuestions: questions.length,
      isLastQuestion,
      correct,
      accuracy,
      completed
    })

    try {
      await fetch('/api/progress', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          grade,
          subject,
          weekId,
          score: Math.round(accuracy * 100),
          completed,
          quizData: {
            questionsCorrect: newCorrectCount,
            questionsTotal: questions.length,
            keywordsMastered: []
          }
        })
      })
      console.log('[QuizPage] Progress saved successfully')
    } catch (error) {
      console.error('[QuizPage] Failed to save progress:', error)
    }
  }, [showResult, currentQuestion, score, correctCount, lives, questions, currentIndex, grade, subject, weekId])

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setShowResult(false)
      setIsCorrect(null)
      setTimeRemaining(difficulty === 'HARD' ? 15 : difficulty === 'MEDIUM' ? 30 : 0)
    } else {
      // Final save before redirecting
      const accuracy = correctCount / questions.length
      const completed = accuracy >= 0.7
      console.log('[QuizPage] Finishing quiz:', {
        weekId,
        correctCount,
        totalQuestions: questions.length,
        accuracy,
        completed,
        redirectUrl: `/student/${grade}/${subjectToSlug(subject)}`
      })

      // Save final progress
      try {
        await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({
            grade,
            subject,
            weekId,
            score: Math.round(accuracy * 100),
            completed,
            quizData: {
              questionsCorrect: correctCount,
              questionsTotal: questions.length,
              keywordsMastered: []
            }
          })
        })
        console.log('[QuizPage] Final progress saved, redirecting...')
      } catch (error) {
        console.error('[QuizPage] Failed to save final progress:', error)
      }

      // Force a hard refresh to ensure the subject page shows updated progress
      const redirectUrl = `/student/${grade}/${subjectToSlug(subject)}`
      window.location.href = redirectUrl
    }
  }

  const handleHint = () => {
    if (hintsUsed < 3 && !showResult && difficulty !== 'HARD') {
      setHintsUsed(prev => prev + 1)
      toast.success(`Hint: The answer is "${currentQuestion?.correctAnswer}"`)
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

  const progress = ((currentIndex + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <header className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="text-gray-600 hover:text-gray-900">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center gap-4">
              {difficulty !== 'EASY' && (
                <div className={`flex items-center gap-1 ${timeRemaining <= 5 ? 'text-red-600' : 'text-gray-600'}`}>
                  <Clock className="h-5 w-5" />
                  <span className="font-semibold">{timeRemaining}s</span>
                </div>
              )}
              {difficulty === 'HARD' && (
                <div className="flex items-center gap-1 text-red-500">
                  <Heart className="h-5 w-5" />
                  <span className="font-semibold">{lives}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-yellow-600">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold">{score}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <Progress value={progress} className="h-2 flex-1" />
            <span className="text-sm text-gray-600 whitespace-nowrap">
              {currentIndex + 1} / {questions.length}
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                    Week {weekId}
                  </span>
                  {difficulty !== 'HARD' && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleHint}
                      disabled={showResult || hintsUsed >= 3}
                    >
                      <Lightbulb className="h-4 w-4 mr-2" />
                      Hint ({3 - hintsUsed})
                    </Button>
                  )}
                </div>

                <h2 className="text-xl font-semibold text-gray-900 mb-6">
                  {currentQuestion?.question}
                </h2>

                <div className="space-y-3">
                  {currentQuestion?.options.map((option, index) => {
                    const label = getOptionLabel(index)
                    const isSelected = selectedOption === option
                    // Compare the actual option text with correctAnswer
                    const isCorrectAnswer = option === currentQuestion.correctAnswer
                    const showCorrect = showResult && isCorrectAnswer
                    const showWrong = showResult && isSelected && !isCorrectAnswer

                    return (
                      <motion.button
                        key={index}
                        onClick={() => !showResult && handleAnswer(option)}
                        disabled={showResult}
                        whileHover={{ scale: showResult ? 1 : 1.02 }}
                        whileTap={{ scale: showResult ? 1 : 0.98 }}
                        className={`w-full p-4 text-left rounded-lg border-2 transition-all ${
                          showCorrect
                            ? 'border-green-500 bg-green-50'
                            : showWrong
                              ? 'border-red-500 bg-red-50'
                              : isSelected
                                ? 'border-blue-500 bg-blue-50'
                                : 'border-gray-200 hover:border-gray-300 bg-white'
                        } ${showResult ? 'cursor-not-allowed' : 'cursor-pointer'}`}
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

                {showResult && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-6 p-4 rounded-lg bg-gray-50 border"
                  >
                    <div className="flex items-start gap-3">
                      <span className="text-2xl">
                        {isCorrect ? '🎉' : '😔'}
                      </span>
                      <div className="flex-1">
                        <p className={`font-semibold ${isCorrect ? 'text-green-700' : 'text-red-700'}`}>
                          {isCorrect ? 'Correct!' : 'Not quite right'}
                        </p>
                        <p className="text-gray-700 mt-1">{currentQuestion?.explanation}</p>
                      </div>
                    </div>
                    <Button onClick={handleNext} className="w-full mt-4">
                      {currentIndex < questions.length - 1 ? 'Next Question' : 'Finish Quiz'}
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
