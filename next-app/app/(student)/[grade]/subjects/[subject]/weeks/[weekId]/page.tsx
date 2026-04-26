'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronRight, X, Check } from 'lucide-react'
import confetti from 'canvas-confetti'
import { getSubjectData } from '@/data/questionGenerator'

const DIFFICULTY_CONFIG = {
  easy: { timer: 0, hints: true },
  medium: { timer: 30, hints: true },
  hard: { timer: 15, hints: false },
}

const urlToSubject: Record<string, string> = {
  maths: 'Maths',
  science: 'Science',
  steam: 'STEAM',
  music: 'Music',
  'performing-arts': 'Performing Arts',
  drama: 'Drama',
  'visual-arts': 'Visual Arts',
  pe: 'PE',
}

export default function QuizPage({
  params,
}: {
  params: { grade: string; subject: string; weekId: string }
}) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isAnswered, setIsAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [score, setScore] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(DIFFICULTY_CONFIG.easy.timer)
  const [questions, setQuestions] = useState<any[]>([])
  const [showHint, setShowHint] = useState(false)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')

  useEffect(() => {
    const dataSubject = urlToSubject[params.subject]
    if (dataSubject) {
      const subjectData = getSubjectData(params.grade as any, dataSubject)
      const week = subjectData.weeks.find(w => w.id === parseInt(params.weekId))
      if (week) {
        setQuestions(week.questions)
      }
    }
  }, [params.grade, params.subject, params.weekId])

  useEffect(() => {
    if (timeRemaining > 0 && !isAnswered) {
      const timer = setTimeout(() => setTimeRemaining(timeRemaining - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeRemaining === 0 && !isAnswered) {
      handleAnswer(null)
    }
  }, [timeRemaining, isAnswered])

  const handleAnswer = (answer: string | null) => {
    if (isAnswered) return

    const correct = answer === questions[currentQuestion]?.correctAnswer
    setIsCorrect(correct)
    setIsAnswered(true)
    setSelectedAnswer(answer)

    if (correct) {
      setScore(score + 10)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setIsAnswered(false)
      setIsCorrect(false)
      setShowHint(false)
      setTimeRemaining(DIFFICULTY_CONFIG[difficulty].timer)
    } else {
      // Quiz complete
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }
  }

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading quiz...</p>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <Link
              href={`/${params.grade}/subjects/${params.subject}`}
              className="text-gray-600 hover:text-gray-800"
            >
              <X className="w-6 h-6" />
            </Link>
            <div className="text-center">
              <div className="text-sm text-gray-600">Question {currentQuestion + 1} of {questions.length}</div>
              <div className="text-2xl font-bold text-green-600">{score} points</div>
            </div>
            <div className="w-6"></div>
          </div>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div
              className="bg-green-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>

        {/* Question card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-2xl shadow-lg p-8"
          >
            {difficulty !== 'easy' && (
              <div className="flex justify-center mb-4">
                <div className={`px-4 py-2 rounded-full font-bold ${
                  timeRemaining <= 5 ? 'bg-red-500 text-white' : 'bg-blue-100 text-blue-700'
                }`}>
                  {timeRemaining > 0 ? `${timeRemaining}s` : 'Time\'s up!'}
                </div>
              </div>
            )}

            <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
              {question?.question}
            </h2>

            <div className="space-y-3">
              {question?.options.map((option: string, index: number) => {
                const letter = String.fromCharCode(65 + index)
                const isSelected = selectedAnswer === letter
                const isCorrectAnswer = letter === question.correctAnswer

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswer(letter)}
                    disabled={isAnswered}
                    className={`w-full p-4 rounded-xl text-left font-medium transition-all ${
                      isAnswered && isCorrectAnswer
                        ? 'bg-green-500 text-white'
                        : isAnswered && isSelected && !isCorrect
                        ? 'bg-red-500 text-white'
                        : isSelected
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-100 hover:bg-gray-200'
                    } ${isAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {isAnswered && isCorrectAnswer && (
                        <Check className="w-5 h-5" />
                      )}
                    </div>
                  </button>
                )
              })}
            </div>

            {/* Explanation */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className={`mt-6 p-4 rounded-xl ${
                    isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                  }`}
                >
                  <p className="font-semibold mb-2">
                    {isCorrect ? '🎉 Correct!' : '😅 Not quite!'}
                  </p>
                  <p className="text-gray-700">{question?.explanation}</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Next button */}
            <AnimatePresence>
              {isAnswered && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6"
                >
                  <button
                    onClick={handleNext}
                    className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-6 rounded-xl flex items-center justify-center gap-2 transition-colors"
                  >
                    {currentQuestion < questions.length - 1 ? (
                      <>
                        Next Question
                        <ChevronRight className="w-5 h-5" />
                      </>
                    ) : (
                      'Complete Quiz'
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
