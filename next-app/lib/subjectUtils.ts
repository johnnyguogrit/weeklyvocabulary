/**
 * Normalize subject name from URL format to data key format
 * Handles various URL formats like "maths", "performing-arts", "visual-arts" etc.
 */
export function normalizeSubject(subject: string | null): string {
  if (!subject) return ''

  const subjectMap: Record<string, string> = {
    'maths': 'Maths',
    'science': 'Science',
    'steam': 'STEAM',
    'music': 'Music',
    'performing-arts': 'Performing Arts',
    'performing arts': 'Performing Arts',
    'drama': 'Drama',
    'visual-arts': 'Visual Arts',
    'visual arts': 'Visual Arts',
    'pe': 'PE',
  }

  return subjectMap[subject.toLowerCase()] || subject
}

/**
 * Convert subject data key back to URL-friendly format
 */
export function subjectToSlug(subject: string): string {
  return subject.toLowerCase().replace(/\s+/g, '-')
}
