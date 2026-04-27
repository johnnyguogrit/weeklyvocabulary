import { prisma } from '../lib/db'

async function testDatabaseConnection() {
  try {
    console.log('Testing database connection...')

    // Test basic connection
    await prisma.$connect()
    console.log('✅ Database connected successfully!')

    // Test query
    const userCount = await prisma.user.count()
    console.log(`✅ Found ${userCount} users in database`)

    const classCount = await prisma.class.count()
    console.log(`✅ Found ${classCount} classes in database`)

    console.log('\nAll tests passed! Database is ready.')
  } catch (error) {
    console.error('❌ Database connection failed:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

testDatabaseConnection()
