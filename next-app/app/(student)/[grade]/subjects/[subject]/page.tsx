import Link from 'next/link'
import { motion } from 'framer-motion'
import { notFound } from 'next/navigation'
import { getSubjectData } from '@/data/questionGenerator'

const subjectNames: Record<string, string> = {
  maths: 'Maths',
  science: 'Science',
  steam: 'STEAM',
  music: 'Music',
  'performing-arts': 'Performing Arts',
  drama: 'Drama',
  'visual-arts': 'Visual Arts',
  pe: 'PE',
}

const gradeNames: Record<string, string> = {
  G1: 'Grade 1',
  G2: 'Grade 2',
  G3: 'Grade 3',
  G4: 'Grade 4',
  G5: 'Grade 5',
}

// Map URL subject to data subject
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

export default function SubjectPage({
  params,
}: {
  params: { grade: string; subject: string }
}) {
  if (!['G1', 'G2', 'G3', 'G4', 'G5'].includes(params.grade)) {
    notFound()
  }

  const dataSubject = urlToSubject[params.subject]
  if (!dataSubject) {
    notFound()
  }

  const subjectData = getSubjectData(params.grade as any, dataSubject)

  return (
    <div className="container mx-auto px-4 py-8">
      <Link
        href={`/${params.grade}`}
        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
      >
        ← Back to Subjects
      </Link>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="text-5xl">{subjectData.emoji}</span>
          <h1 className="text-4xl font-bold text-gray-800">
            {gradeNames[params.grade]} - {subjectData.name}
          </h1>
        </div>
        <p className="text-gray-600">{subjectData.description}</p>
      </motion.div>

      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Week Map</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {subjectData.weeks.map((week, index) => (
              <motion.div
                key={week.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.03, duration: 0.2 }}
              >
                <Link
                  href={`/${params.grade}/subjects/${params.subject}/weeks/${week.id}`}
                  className="block"
                >
                  <div
                    className={`${subjectData.color} bg-opacity-20 border-2 border-current rounded-xl p-4 text-center hover:shadow-md transition-all`}
                  >
                    <span className="text-2xl block mb-2">{week.emoji}</span>
                    <span className="font-semibold text-sm">{week.title}</span>
                    <div className="text-xs text-gray-600 mt-1">
                      {week.keywords.length} words
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
