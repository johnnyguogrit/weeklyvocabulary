import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

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
    const body = await request.json();
    const { userId, grade, subject, weekId, score, completed, quizData } = body;

    if (!userId || !grade || !subject) {
      return NextResponse.json(
        { error: 'userId, grade, and subject are required' },
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
        // Create new WeekProgress
        weekProgress = await prisma.weekProgress.create({
          data: {
            studentProgressId: studentProgress.id,
            weekId: weekNum,
            locked: weekNum > 2, // First week (2) is unlocked by default
            completed: completed || false,
            score: score || 0,
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
        // Find next week
        const nextWeekId = weekNum + 1;
        await prisma.weekProgress.updateMany({
          where: {
            studentProgressId: studentProgress.id,
            weekId: nextWeekId,
          },
          data: {
            locked: false,
          },
        });
      }

      // Recalculate overall progress
      const allWeeks = await prisma.weekProgress.findMany({
        where: { studentProgressId: studentProgress.id },
      });

      const completedWeeks = allWeeks.filter((w) => w.completed).length;
      const totalWeeks = allWeeks.length;
      const overallProgress = totalWeeks > 0 ? (completedWeeks / totalWeeks) * 100 : 0;

      // Calculate plant stage
      let currentPlantStage = 'SEEDLING';
      if (overallProgress >= 81) currentPlantStage = 'MIGHTY_OAK';
      else if (overallProgress >= 51) currentPlantStage = 'YOUNG_TREE';
      else if (overallProgress >= 21) currentPlantStage = 'SAPLING';

      // Calculate total score
      const totalScore = allWeeks.reduce((sum, w) => sum + w.score, 0);

      // Update StudentProgress
      studentProgress = await prisma.studentProgress.update({
        where: { id: studentProgress.id },
        data: {
          overallProgress,
          currentPlantStage,
          totalScore,
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
