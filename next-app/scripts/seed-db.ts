/**
 * Database Seed Script
 * Run with: npx ts-node scripts/seed-db.ts
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Create a test user
  const testUser = await prisma.user.upsert({
    where: { id: 'test-user-1' },
    update: {},
    create: {
      id: 'test-user-1',
      name: 'Test Student',
      email: 'test@example.com',
      role: 'STUDENT',
    },
  })

  console.log('✅ Created test user:', testUser.name)

  // Create sample progress for G1 Maths
  const progress = await prisma.studentProgress.upsert({
    where: {
      userId_grade_subject: {
        userId: testUser.id,
        grade: 'G1',
        subject: 'Maths',
      },
    },
    update: {},
    create: {
      userId: testUser.id,
      grade: 'G1',
      subject: 'Maths',
      difficulty: 'EASY',
      totalScore: 0,
      overallProgress: 0,
      currentPlantStage: 'SEEDLING',
      weekProgress: {
        create: [
          {
            weekId: 2,
            locked: false,
            completed: false,
            score: 0,
          },
          {
            weekId: 3,
            locked: true,
            completed: false,
            score: 0,
          },
          {
            weekId: 4,
            locked: true,
            completed: false,
            score: 0,
          },
        ],
      },
    },
  })

  console.log('✅ Created progress for G1 Maths')

  console.log('🎉 Seed completed!')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
