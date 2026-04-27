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

export default function QuizPage() {
  const router = useRouter()
  const params = useParams()
  const grade = (params.grade as string)?.toUpperCase()
  const subject = params.subject as string
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
        const data = getSubjectData(grade, subject)
        const week = data.weeks.find(w => w.id === weekId)
        if (!week || week.questions.length === 0) {
          toast.error('No questions found for this week')
          router.back()
          return
        }
        setQuestions(week.questions)
        setIsLoading(false)
      } catch (error) {
        toast.error('Failed to load questions')
        router.back()
      }
    }
    loadQuestions()
  }, [grade, subject, weekId, router])

  useEffect(() => {
    if (difficulty === 'EASY' || showResult || timeRemaining <= 0) return

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleAnswer(null)
          return 30
        }
        return prev - 1
      })
    }, 1000)
    return () => clearInterval(timer)
  }, [difficulty, showResult, timeRemaining])

  const currentQuestion = questions[currentIndex]

  const handleAnswer = useCallback(async (option: string | null) => {
    if (showResult) return

    const correct = option === currentQuestion?.correctAnswer
    const newScore = correct ? score + 10 : score
    const newCorrectCount = correct ? correctCount + 1 : correctCount

    setSelectedOption(option)
    setShowResult(true)
    setIsCorrect(correct)
    setScore(newScore)
    setCorrectCount(newCorrectCount)
    setLives(correct ? lives : lives - 1)

    if (correct) {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } })
    }

    await saveProgress(newScore, newCorrectCount)
  }, [showResult, currentQuestion, score, correctCount, lives])

  const saveProgress = async (newScore: number, newCorrectCount: number) => {
    try {
      const totalQuestions = questions.length
      const isLastQuestion = currentIndex === totalQuestions - 1
      // 修复: 使用正确率而非累计分数来判断完成
      const accuracy = newCorrectCount / totalQuestions
      const completed = isLastQuestion && accuracy >= 0.7

      const response = await fetch('/api/progress', {
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
            questionsTotal: totalQuestions,
            keywordsMastered: []
          }
        })
      })

      if (!response.ok) {
        const error = await response.json()
        console.error('Failed to save progress:', error)
      } else {
        const result = await response.json()
        console.log('Progress saved:', result)
      }
    } catch (error) {
      console.error('Failed to save progress:', error)
    }
  }

  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1)
      setSelectedOption(null)
      setShowResult(false)
      setIsCorrect(null)
      setTimeRemaining(difficulty === 'HARD' ? 15 : difficulty === 'MEDIUM' ? 30 : 0)
    } else {
      router.push(`/student/${params.grade}/${params.subject}`)
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
