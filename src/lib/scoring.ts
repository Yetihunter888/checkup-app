import type { ScoreCategory } from '../types/qa-scoring'

/** 0-1 fraction for a category's current value; unscored counts as 0. */
export function categoryFraction(category: ScoreCategory): number {
  if (category.value === null) return 0
  if (category.controlType === 'pass-fail') return category.value === 'pass' ? 1 : 0
  return (category.value as number) / 10
}

/** Weighted total across all categories, 0-100. */
export function weightedTotal(categories: ScoreCategory[]): number {
  const total = categories.reduce((sum, category) => sum + categoryFraction(category) * category.weight, 0)
  return Math.round(total)
}
