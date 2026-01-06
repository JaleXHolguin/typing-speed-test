import type { KeyStats } from "../store/typing.store";

const CONFIDENCE_THRESHOLD = 15; // Keystrokes required to reach full confidence
const NEUTRAL_SCORE = 70; // Regression baseline (yellow) when data is scarce
const SPACE_KEY = " ";
const MIN_PRESSES_FOR_HIGHLIGHTS = 5;

/**
 * Calculates a 0–100 score by balancing accuracy and sample size.
 * This function keeps UI colors and stats analysis fully consistent.
 */
const calculateWeightedScore = (total: number, errors: number) => {
  const rawAccuracy = ((total - errors) / total) * 100;
  const confidence = Math.min(1, total / CONFIDENCE_THRESHOLD);
  // With limited data, the score gravitates toward NEUTRAL_SCORE (70)
  return rawAccuracy * confidence + NEUTRAL_SCORE * (1 - confidence);
};

// --- UI FUNCTIONS (KEYBOARD) ---

export const getKeyColor = (
  key: string,
  stats: Record<string, { total: number; errors: number }>
) => {
  const keyStats = stats[key];
  if (!keyStats || keyStats.total === 0)
    return "bg-zinc-800/50 border-zinc-700/50";

  const { total, errors } = keyStats;
  const score = calculateWeightedScore(total, errors);

  if (score >= 95) {
    return "bg-emerald-500/30 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.6),0_0_40px_rgba(16,185,129,0.3)]";
  } else if (score >= 85) {
    return "bg-green-500/30 border-green-500/60 shadow-[0_0_20px_rgba(34,197,94,0.6),0_0_40px_rgba(34,197,94,0.3)]";
  } else if (score >= 70) {
    return "bg-yellow-500/30 border-yellow-500/60 shadow-[0_0_20px_rgba(234,179,8,0.6),0_0_40px_rgba(234,179,8,0.3)]";
  } else if (score >= 55) {
    return "bg-orange-500/30 border-orange-500/60 shadow-[0_0_20px_rgba(249,115,22,0.6),0_0_40px_rgba(249,115,22,0.3)]";
  } else {
    return "bg-red-500/30 border-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.6),0_0_40px_rgba(239,68,68,0.3)]";
  }
};

export const getKeyTextColor = (
  key: string,
  stats: Record<string, { total: number; errors: number }>
) => {
  const keyStats = stats[key];
  if (!keyStats || keyStats.total === 0) return "text-zinc-500";

  const { total, errors } = keyStats;
  const score = calculateWeightedScore(total, errors);

  if (score >= 95) return "text-emerald-300";
  if (score >= 85) return "text-green-300";
  if (score >= 70) return "text-yellow-300";
  if (score >= 55) return "text-orange-300";
  return "text-red-300";
};

// --- STATS FUNCTIONS (REPORTING) ---

export type DerivedKeyStat = {
  keyChar: string;
  total: number;
  errors: number;
  accuracy: number;
  weightedAccuracy: number;
};

export function deriveKeyStats(keyStats: KeyStats): DerivedKeyStat[] {
  return Object.entries(keyStats)
    .filter(([, s]) => s.total > 0)
    .map(([keyChar, { total, errors }]) => {
      const rawAccuracy = Math.max(0, ((total - errors) / total) * 100);
      const weightedAccuracy = calculateWeightedScore(total, errors);

      return {
        keyChar,
        total,
        errors,
        accuracy: rawAccuracy,
        weightedAccuracy,
      };
    });
}

export function getKeyboardHighlights(stats: DerivedKeyStat[]) {
  if (!stats.length) return null;

  const eligible = stats.filter((s) => s.keyChar !== SPACE_KEY);

  // Keys with enough samples for meaningful analysis
  const highVolume = eligible.filter(
    (s) => s.total >= MIN_PRESSES_FOR_HIGHLIGHTS
  );

  if (!highVolume.length) return null;

  // 1. Most Accurate: Based on weighted accuracy (matches green keyboard feedback)
  const mostAccurate = [...highVolume].sort(
    (a, b) => b.weightedAccuracy - a.weightedAccuracy
  )[0];

  // 2. Needs Practice: Real impact (errors weighted by low accuracy)
  const needsPractice = [...highVolume].sort((a, b) => {
    const impactA = a.errors * (100 - a.accuracy);
    const impactB = b.errors * (100 - b.accuracy);
    return impactB - impactA;
  })[0];

  // 3. Most Used: Raw volume
  const mostUsed = [...eligible].sort((a, b) => b.total - a.total)[0];

  return { mostAccurate, mostUsed, needsPractice };
}
