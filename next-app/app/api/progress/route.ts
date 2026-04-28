import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

// GET /api/progress - Get student progress
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const grade = searchParams.get('grade');
    const subject = searchParams.get('subject');

    if (!userId) {
      return NextResponse.json({ error: 'userId is required' }, { status: 400 });
    }

    // If grade and subject are specified, get specific progress
    if (grade && subject) {
      let progress = await prisma.studentProgress.findUnique({
        where: {
          userId_grade_subject: {
            userId,
            grade,
            subject,
          },
        },
        include: {
          weekProgress: {
            orderBy: { weekId: 'asc' },
          },
        },
      });

      // If no progress exists yet, return default structure
      if (!progress) {
        return NextResponse.json({
          userId,
          grade,
          subject,
          totalScore: 0,
          overallProgress: 0,
          currentPlantStage: 'SEEDLING',
          weekProgress: [],
        });
      }

      // Transform weekProgress keywordsMastered from JSON string to array
      const weekProgress = progress.weekProgress.map((wp: any) => ({
        ...wp,
        keywordsMastered: wp.keywordsMastered ? JSON.parse(wp.keywordsMastered) : [],
      }));

      return NextResponse.json({
        id: progress.id,
        userId: progress.userId,
        grade: progress.grade,
        subject: progress.subject,
        difficulty: progress.difficulty,
        totalScore: progress.totalScore,
        overallProgress: progress.overallProgress,
        currentPlantStage: progress.currentPlantStage,
        weekProgress,
      });
    }

    // If only userId is provided, get all progress for user
    const allProgress = await prisma.studentProgress.findMany({
      where: { userId },
      include: {
        weekProgress: {
          orderBy: { weekId: 'asc' },
        },
      },
    });

    return NextResponse.json({
      userId,
      progress: allProgress.map((p: any) => ({
        id: p.id,
        grade: p.grade,
        subject: p.subject,
        difficulty: p.difficulty,
        totalScore: p.totalScore,
        overallProgress: p.overallProgress,
        currentPlantStage: p.currentPlantStage,
        weekProgress: p.weekProgress.map((wp: any) => ({
          ...wp,
          keywordsMastered: wp.keywordsMastered ? JSON.parse(wp.keywordsMastered) : [],
        })),
      })),
    });
  } catch (error) {
    console.error('Error fetching progress:', error);
    return NextResponse.json({ error: 'Failed to fetch progress' }, { status: 500 });
  }
}

// POST /api/progress - Create or update student progress
export async function POST(request: NextRequest) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { grade, subject, weekId, score, completed, quizData } = body;
    const userId = session.user.id;

    if (!grade || !subject) {
      return NextResponse.json(
        { error: 'grade and subject are required' },
        { status: 400 }
      );
    }

    // Find or create StudentProgress record
    let studentProgress = await prisma.studentProgress.findUnique({
      where: {
        userId_grade_subject: {
          userId,
          grade,
          subject,
        },
      },
    });

    if (!studentProgress) {
      // Create new StudentProgress
      studentProgress = await prisma.studentProgress.create({
        data: {
          userId,
          grade,
          subject,
          difficulty: 'EASY',
          totalScore: 0,
          overallProgress: 0,
          currentPlantStage: 'SEEDLING',
        },
      });
    }

    // If weekId is provided, update WeekProgress
    if (weekId !== undefined) {
      const weekNum = parseInt(String(weekId));

      // Find or create WeekProgress
      let weekProgress = await prisma.weekProgress.findUnique({
        where: {
          studentProgressId_weekId: {
            studentProgressId: studentProgress.id,
            weekId: weekNum,
          },
        },
      });

      if (!weekProgress) {
        // Determine if this week should be locked initially
        // For G1: only week 2 is unlocked by default
        // For G2+: only week 3 is unlocked by default
        let initiallyLocked = true;
        if (grade === 'G1') {
          initiallyLocked = weekNum !== 2;
        } else {
          initiallyLocked = weekNum !== 3;
        }

        // Create new WeekProgress
        weekProgress = await prisma.weekProgress.create({
          data: {
            studentProgressId: studentProgress.id,
            weekId: weekNum,
            locked: initiallyLocked,
            completed: completed || false,
            score: score || 0,
            keywordsMastered: JSON.stringify(quizData?.keywordsMastered || []),
          },
        });
      } else {
        // Update existing WeekProgress
        weekProgress = await prisma.weekProgress.update({
          where: { id: weekProgress.id },
          data: {
            completed: completed ?? weekProgress.completed,
            score: score ?? weekProgress.score,
          },
        });
      }

      // Update keywords if provided
      if (quizData?.keywordsMastered) {
        await prisma.weekProgress.update({
          where: { id: weekProgress.id },
          data: {
            keywordsMastered: JSON.stringify(quizData.keywordsMastered),
          },
        });
      }

      // Update quiz stats if provided
      if (quizData) {
        await prisma.weekProgress.update({
          where: { id: weekProgress.id },
          data: {
            questionsCorrect: quizData.questionsCorrect ?? weekProgress.questionsCorrect,
            questionsTotal: quizData.questionsTotal ?? weekProgress.questionsTotal,
            readingCompCorrect: quizData.readingCompCorrect ?? weekProgress.readingCompCorrect,
            readingCompTotal: quizData.readingCompTotal ?? weekProgress.readingCompTotal,
          },
        });
      }

      // Unlock next week if current week is completed
      if (completed && weekProgress) {
        // Define the actual week sequence for G1 (not consecutive: 2,3,4,5,7,8,9,10,11,12,13,14,15)
        const g1WeekSequence = [2, 3, 4, 5, 7, 8, 9, 10, 11, 12, 13, 14, 15];

        let nextWeekId: number | undefined;

        // For G1, use the predefined sequence
        if (grade === 'G1') {
          const currentIndex = g1WeekSequence.indexOf(weekNum);
          if (currentIndex >= 0 && currentIndex < g1WeekSequence.length - 1) {
            nextWeekId = g1WeekSequence[currentIndex + 1];
          }
        } else {
          // For G2+, weeks are consecutive
          nextWeekId = weekNum + 1;
        }

        if (nextWeekId !== undefined) {
          // Use upsert to create the next week if it doesn't exist, or unlock if it does
          await prisma.weekProgress.upsert({
            where: {
              studentProgressId_weekId: {
                studentProgressId: studentProgress.id,
                weekId: nextWeekId,
              },
            },
            create: {
              studentProgressId: studentProgress.id,
              weekId: nextWeekId,
              locked: false, // Unlock the next week
              completed: false,
              score: 0,
              questionsCorrect: 0,
              questionsTotal: 0,
              readingCompCorrect: 0,
              readingCompTotal: 0,
              keywordsMastered: JSON.stringify([]),
            },
            update: {
              locked: false, // Unlock if it already exists
            },
          });
        }
      }

      // Recalculate overall progress
      const allWeeks = await prisma.weekProgress.findMany({
        where: { studentProgressId: studentProgress.id },
      });

      const completedWeeks = allWeeks.filter((w) => w.completed).length;
      const totalWeeks = allWeeks.length;
      const overallProgress = totalWeeks > 0 ? Math.round((completedWeeks / totalWeeks) * 100) : 0;

      // Calculate plant stage
      let currentPlantStage = 'SEEDLING';
      if (overallProgress >= 81) currentPlantStage = 'MIGHTY_OAK';
      else if (overallProgress >= 51) currentPlantStage = 'YOUNG_TREE';
      else if (overallProgress >= 21) currentPlantStage = 'SAPLING';

      // Calculate average score across attempted weeks only (exclude weeks with no questions)
      const attemptedWeeks = allWeeks.filter((w) => w.questionsTotal > 0);
      const averageScore = attemptedWeeks.length > 0
        ? Math.round(attemptedWeeks.reduce((sum, w) => sum + w.score, 0) / attemptedWeeks.length)
        : 0;

      // Update StudentProgress
      studentProgress = await prisma.studentProgress.update({
        where: { id: studentProgress.id },
        data: {
          overallProgress,
          currentPlantStage,
          totalScore: averageScore,
        },
      });
    }

    return NextResponse.json({
      success: true,
      progress: {
        id: studentProgress.id,
        userId: studentProgress.userId,
        grade: studentProgress.grade,
        subject: studentProgress.subject,
        difficulty: studentProgress.difficulty,
        totalScore: studentProgress.totalScore,
        overallProgress: studentProgress.overallProgress,
        currentPlantStage: studentProgress.currentPlantStage,
      },
    });
  } catch (error) {
    console.error('Error updating progress:', error);
    return NextResponse.json({ error: 'Failed to update progress' }, { status: 500 });
  }
}

// DELETE /api/progress - Reset progress for a subject
export async function DELETE(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const userId = searchParams.get('userId');
    const grade = searchParams.get('grade');
    const subject = searchParams.get('subject');

    if (!userId || !grade || !subject) {
      return NextResponse.json(
        { error: 'userId, grade, and subject are required' },
        { status: 400 }
      );
    }

    // Delete WeekProgress records
    await prisma.weekProgress.deleteMany({
      where: {
        studentProgress: {
          userId,
          grade,
          subject,
        },
      },
    });

    // Delete StudentProgress record
    await prisma.studentProgress.deleteMany({
      where: {
        userId,
        grade,
        subject,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting progress:', error);
    return NextResponse.json({ error: 'Failed to delete progress' }, { status: 500 });
  }
}
