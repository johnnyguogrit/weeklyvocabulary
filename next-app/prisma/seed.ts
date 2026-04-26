import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Start seeding...')

  // Create a test teacher
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@example.com' },
    update: {},
    create: {
      email: 'teacher@example.com',
      name: 'Test Teacher',
      password: await hash('password123', 10),
      role: 'TEACHER',
    },
  })
  console.log('Created teacher:', teacher)

  // Create a test student
  const student = await prisma.user.upsert({
    where: { email: 'student@example.com' },
    update: {},
    create: {
      email: 'student@example.com',
      name: 'Test Student',
      role: 'STUDENT',
    },
  })
  console.log('Created student:', student)

  // Create initial progress for G1 Maths
  const progress = await prisma.studentProgress.upsert({
    where: {
      userId_grade_subject: {
        userId: student.id,
        grade: 'G1',
        subject: 'Maths',
      },
    },
    update: {},
    create: {
      userId: student.id,
      grade: 'G1',
      subject: 'Maths',
      difficulty: 'EASY',
      totalScore: 0,
      overallProgress: 0,
      currentPlantStage: 'SEEDLING',
      weekProgress: {
        create: [
          { weekId: 2, locked: false, keywordsMastered: '[]' },
          { weekId: 3, locked: true, keywordsMastered: '[]' },
          { weekId: 4, locked: true, keywordsMastered: '[]' },
          { weekId: 5, locked: true, keywordsMastered: '[]' },
          { weekId: 7, locked: true, keywordsMastered: '[]' },
          { weekId: 8, locked: true, keywordsMastered: '[]' },
          { weekId: 9, locked: true, keywordsMastered: '[]' },
          { weekId: 10, locked: true, keywordsMastered: '[]' },
          { weekId: 11, locked: true, keywordsMastered: '[]' },
          { weekId: 12, locked: true, keywordsMastered: '[]' },
          { weekId: 13, locked: true, keywordsMastered: '[]' },
          { weekId: 14, locked: true, keywordsMastered: '[]' },
          { weekId: 15, locked: true, keywordsMastered: '[]' },
        ],
      },
    },
  })
  console.log('Created progress:', progress)

  console.log('Seeding finished.')
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
