import Link from 'next/link'

// Mock student data
const mockStudents = [
  { id: '1', name: 'Alice Chen', grade: 'G3', progress: 75 },
  { id: '2', name: 'Bob Smith', grade: 'G3', progress: 60 },
  { id: '3', name: 'Charlie Brown', grade: 'G3', progress: 90 },
]

export default function StudentsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50 p-8">
      <div className="max-w-6xl mx-auto">
        <Link
          href="/teacher"
          className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-8"
        >
          ← Back to Teacher Portal
        </Link>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Students</h1>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Grade</th>
                  <th className="text-left py-3 px-4">Progress</th>
                  <th className="text-left py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {mockStudents.map((student) => (
                  <tr key={student.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-3 px-4 font-medium">{student.name}</td>
                    <td className="py-3 px-4">{student.grade}</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-green-500 h-2 rounded-full"
                            style={{ width: `${student.progress}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-600">{student.progress}%</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Link
                        href={`/teacher/students/${student.id}`}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
