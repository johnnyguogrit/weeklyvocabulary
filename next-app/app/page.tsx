import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-2xl">
        <div className="text-8xl mb-6 animate-bounce">🌱</div>
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Vocabulary Adventure
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Learn new words through fun quizzes and grow your vocabulary garden!
        </p>

        <div className="flex gap-4 justify-center">
          <Link href="/login">
            <Button size="lg" className="min-w-[140px]">
              Sign In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="min-w-[140px]">
              Sign Up
            </Button>
          </Link>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-4xl mb-3">📚</div>
            <h3 className="font-semibold text-gray-900">8 Subjects</h3>
            <p className="text-sm text-gray-600">Maths, Science, STEAM, Music, Arts & more</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-4xl mb-3">🎮</div>
            <h3 className="font-semibold text-gray-900">Gamified Learning</h3>
            <p className="text-sm text-gray-600">Grow your plant from seedling to mighty oak</p>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="text-4xl mb-3">🏆</div>
            <h3 className="font-semibold text-gray-900">5 Grade Levels</h3>
            <p className="text-sm text-gray-600">From Grade 1 to Grade 5</p>
          </div>
        </div>
      </div>
    </div>
  )
}
