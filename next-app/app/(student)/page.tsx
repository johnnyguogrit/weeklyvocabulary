import Link from 'next/link'
import { motion } from 'framer-motion'

const grades = [
  { id: 'G1', name: 'Grade 1', emoji: '🌱', color: 'from-green-400 to-green-600' },
  { id: 'G2', name: 'Grade 2', emoji: '🌿', color: 'from-blue-400 to-blue-600' },
  { id: 'G3', name: 'Grade 3', emoji: '🌳', color: 'from-purple-400 to-purple-600' },
  { id: 'G4', name: 'Grade 4', emoji: '🌳✨', color: 'from-orange-400 to-orange-600' },
  { id: 'G5', name: 'Grade 5', emoji: '🌳🌟', color: 'from-pink-400 to-pink-600' },
]

export default function WelcomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Welcome to Vocabulary Adventure! 🎮
        </h1>
        <p className="text-xl text-gray-600">
          Learn new words through fun quizzes and grow your vocabulary garden!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-6xl">
        {grades.map((grade, index) => (
          <motion.div
            key={grade.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
          >
            <Link
              href={`/grades/${grade.id}`}
              className="block h-full"
            >
              <div className={`bg-gradient-to-br ${grade.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center justify-center gap-4`}>
                <span className="text-6xl">{grade.emoji}</span>
                <span className="text-2xl font-bold">{grade.name}</span>
                <span className="text-sm opacity-90">Start Learning →</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="mt-12 text-center"
      >
        <Link
          href="/teacher"
          className="text-sm text-gray-500 hover:text-gray-700 underline"
        >
          Teacher Portal
        </Link>
      </motion.div>
    </div>
  )
}
