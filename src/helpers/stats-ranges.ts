import type { Mode } from "../store/settings.store";
import type { TestStatus } from "../store/typing.store";

export type AccuracyRange = "idle" | "excellent" | "good" | "warn" | "bad";
export type TimeRange = "idle" | "safe" | "warn" | "danger" | "neutral";

export const accuracyRange = (
  accuracy: number,
  status: TestStatus
): AccuracyRange => {
  if (status === "idle") return "idle";
  if (accuracy >= 95) return "excellent";
  if (accuracy >= 85) return "good";
  if (accuracy >= 70) return "warn";
  return "bad";
};

export const timeRange = (
  mode: Mode,
  secondsLeft: number | null,
  total: number,
  status: TestStatus
): TimeRange => {
  if (status === "idle" || mode === "passage" || secondsLeft === null) {
    return "idle";
  }

  const ratio = secondsLeft / total;

  if (ratio > 0.5) return "safe";
  if (ratio > 0.2) return "warn";
  return "danger";
};
