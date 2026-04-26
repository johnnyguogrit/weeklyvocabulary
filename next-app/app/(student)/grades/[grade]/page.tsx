import Link from 'next/link'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'

const subjects = [
  { id: 'maths', name: 'Maths', emoji: '🔢', color: 'bg-blue-500' },
  { id: 'science', name: 'Science', emoji: '🔬', color: 'bg-green-500' },
  { id: 'steam', name: 'STEAM', emoji: '⚙️', color: 'bg-purple-500' },
  { id: 'music', name: 'Music', emoji: '🎵', color: 'bg-pink-500' },
  { id: 'performing-arts', name: 'Performing Arts', emoji: '🎭', color: 'bg-orange-500' },
  { id: 'drama', name: 'Drama', emoji: '🎪', color: 'bg-red-500' },
  { id: 'visual-arts', name: 'Visual Arts', emoji: '🎨', color: 'bg-indigo-500' },
  { id: 'pe', name: 'PE', emoji: '⚽', color: 'bg-teal-500' },
]

const gradeNames: Record<string, string> = {
  G1: 'Grade 1',
  G2: 'Grade 2',
  G3: 'Grade 3',
  G4: 'Grade 4',
  G5: 'Grade 5',
}

export default function GradePage({ params }: { params: { grade: string } }) {
  if (!['G1', 'G2', 'G3', 'G4', 'G5'].includes(params.grade)) {
    notFound()
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href="/"
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
      >
        ← Back to Home
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          {gradeNames[params.grade]} - Choose a Subject
        </h1>
        <p className="text-gray-600">Select a subject to start learning!</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {subjects.map((subject, index) => (
          <motion.div
            key={subject.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05, duration: 0.3 }}
          >
            <Link
              href={`/${params.grade}/subjects/${subject.id}`}
              className="block h-full"
            >
              <div className={`${subject.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col items-center justify-center gap-4`}>
                <span className="text-5xl">{subject.emoji}</span>
                <span className="text-xl font-bold">{subject.name}</span>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
