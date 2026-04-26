/**
 * Database Seed Script
 * Run with: pnpm db:seed
 */

import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Starting database seed...')

  // Hash passwords
  const teacherPassword = await hash('teacher123', 10)
  const studentPassword = await hash('student123', 10)
  const adminPassword = await hash('admin123', 10)

  // Create admin user
  const admin = await prisma.user.upsert({
    where: { email: 'admin@school.com' },
    update: {},
    create: {
      id: 'admin-user-1',
      name: 'System Administrator',
      email: 'admin@school.com',
      password: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin user:', admin.email)

  // Create teacher user
  const teacher = await prisma.user.upsert({
    where: { email: 'teacher@school.com' },
    update: {},
    create: {
      id: 'teacher-user-1',
      name: 'Ms. Johnson',
      email: 'teacher@school.com',
      password: teacherPassword,
      role: 'TEACHER',
    },
  })
  console.log('✅ Created teacher user:', teacher.email)

  // Create student user
  const student = await prisma.user.upsert({
    where: { email: 'student@school.com' },
    update: {},
    create: {
      id: 'student-user-1',
      name: 'Alex Smith',
      email: 'student@school.com',
      password: studentPassword,
      role: 'STUDENT',
    },
  })
  console.log('✅ Created student user:', student.email)

  // Create sample class for teacher
  const mathClass = await prisma.class.upsert({
    where: { id: 'class-g1-maths-1' },
    update: {},
    create: {
      id: 'class-g1-maths-1',
      name: 'G1 Maths Class A',
      teacherId: teacher.id,
      grade: 'G1',
    },
  })
  console.log('✅ Created class:', mathClass.name)

  // Enroll student in class
  await prisma.enrollment.upsert({
    where: {
      classId_studentId: {
        classId: mathClass.id,
        studentId: student.id,
      },
    },
    update: {},
    create: {
      classId: mathClass.id,
      studentId: student.id,
    },
  })
  console.log('✅ Enrolled student in class')

  // Create sample progress for student
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
          { weekId: 2, locked: false, completed: false, score: 0 },
          { weekId: 3, locked: true, completed: false, score: 0 },
          { weekId: 4, locked: true, completed: false, score: 0 },
          { weekId: 5, locked: true, completed: false, score: 0 },
        ],
      },
    },
  })
  console.log('✅ Created progress for G1 Maths')

  console.log('🎉 Seed completed!')
  console.log('\n📝 Demo Accounts:')
  console.log('   Admin:   admin@school.com / admin123')
  console.log('   Teacher: teacher@school.com / teacher123')
  console.log('   Student: student@school.com / student123')
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
