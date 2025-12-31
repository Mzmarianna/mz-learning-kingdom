import { Level } from './curriculum-data';
import L1UM from './curriculum-data';
import L2UM from './curriculum-data-L2UM';
import L3UM from './curriculum-data-L3UM';

// All Math Curriculum Levels
export const MathCurriculum: Level[] = [L1UM, L2UM, L3UM];

// Export individual levels
export { L1UM, L2UM, L3UM };

// Helper to get level by ID
export function getLevelById(levelId: string): Level | undefined {
  return MathCurriculum.find(level => level.id === levelId);
}

// Helper to get level by number
export function getLevelByNumber(levelNumber: number): Level | undefined {
  return MathCurriculum.find(level => level.number === levelNumber);
}

// Helper to get next level
export function getNextLevel(currentLevelId: string): Level | null {
  const currentLevel = getLevelById(currentLevelId);
  if (!currentLevel) return null;
  
  const nextLevelNumber = currentLevel.number + 1;
  return getLevelByNumber(nextLevelNumber) || null;
}

// Helper to check if student can access level
export function canAccessLevel(
  levelId: string,
  completedLevelIds: string[]
): boolean {
  const level = getLevelById(levelId);
  if (!level) return false;
  
  // Level 1 is always accessible
  if (level.number === 1) return true;
  
  // Check if previous level is completed
  const previousLevel = getLevelByNumber(level.number - 1);
  if (!previousLevel) return false;
  
  return completedLevelIds.includes(previousLevel.id);
}

// Helper to calculate total progress across all levels
export function calculateOverallProgress(studentProgress: {
  [levelId: string]: {
    completedLessons: string[];
    totalLessons: number;
  };
}): {
  totalLessons: number;
  completedLessons: number;
  percentComplete: number;
  totalRobuxEarned: number;
  currentLevel: number;
} {
  let totalLessons = 0;
  let completedLessons = 0;
  let totalRobuxEarned = 0;
  let currentLevel = 1;

  MathCurriculum.forEach(level => {
    totalLessons += level.lessons.length;
    
    const progress = studentProgress[level.id];
    if (progress) {
      completedLessons += progress.completedLessons.length;
      totalRobuxEarned += progress.completedLessons.length * 100;
      
      // Determine current level
      if (progress.completedLessons.length > 0 && 
          progress.completedLessons.length < level.lessons.length) {
        currentLevel = level.number;
      } else if (progress.completedLessons.length === level.lessons.length) {
        currentLevel = Math.min(level.number + 1, MathCurriculum.length);
      }
    }
  });

  return {
    totalLessons,
    completedLessons,
    percentComplete: Math.round((completedLessons / totalLessons) * 100),
    totalRobuxEarned,
    currentLevel,
  };
}

// Export curriculum metadata
export const CurriculumMetadata = {
  totalLevels: MathCurriculum.length,
  totalLessons: MathCurriculum.reduce((sum, level) => sum + level.lessons.length, 0),
  totalRobuxAvailable: MathCurriculum.reduce((sum, level) => sum + level.totalRobux, 0),
  subjects: ['math'] as const,
  levels: MathCurriculum.map(level => ({
    id: level.id,
    number: level.number,
    title: level.title,
    lessonCount: level.lessons.length,
    robuxAvailable: level.totalRobux,
  })),
};

export default MathCurriculum;
