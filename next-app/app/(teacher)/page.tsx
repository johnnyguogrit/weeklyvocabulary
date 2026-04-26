import Link from 'next/link'

export default function TeacherPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-4xl mx-auto">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          ← Back to Home
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Teacher Portal</h1>
          <p className="text-gray-600 mb-8">Manage students, classes, and content</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Link
              href="/teacher/students"
              className="block p-6 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors"
            >
              <h2 className="text-xl font-semibold text-blue-700 mb-2">👥 Students</h2>
              <p className="text-gray-600">View and manage student progress</p>
            </Link>

            <Link
              href="/teacher/classes"
              className="block p-6 bg-green-50 rounded-xl hover:bg-green-100 transition-colors"
            >
              <h2 className="text-xl font-semibold text-green-700 mb-2">📚 Classes</h2>
              <p className="text-gray-600">Manage classes and enrollments</p>
            </Link>

            <Link
              href="/teacher/content/questions"
              className="block p-6 bg-purple-50 rounded-xl hover:bg-purple-100 transition-colors"
            >
              <h2 className="text-xl font-semibold text-purple-700 mb-2">❓ Questions</h2>
              <p className="text-gray-600">Edit and manage quiz questions</p>
            </Link>

            <div className="block p-6 bg-gray-50 rounded-xl">
              <h2 className="text-xl font-semibold text-gray-700 mb-2">📊 Reports</h2>
              <p className="text-gray-600">Coming soon...</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
