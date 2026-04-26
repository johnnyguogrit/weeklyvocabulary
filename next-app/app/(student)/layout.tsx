import Link from 'next/link'

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-green-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌱</span>
            <span className="font-bold text-xl text-green-700">Vocabulary Adventure</span>
          </Link>
          <nav className="flex gap-4">
            <Link href="/grades" className="text-sm font-medium text-gray-600 hover:text-green-700">
              My Progress
            </Link>
          </nav>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-white/50 backdrop-blur-sm border-t border-green-100 py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-600">
          © 2025 Weekly Vocabulary Adventure. Learning is fun!
        </div>
      </footer>
    </div>
  )
}
