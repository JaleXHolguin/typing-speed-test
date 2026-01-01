import type { Mode } from "../store/settings.store";
import type { TestStatus } from "../store/typing.store";

export const getDisplayTime = (
  mode: Mode,
  status: TestStatus,
  timeLimit: number,
  timeLeft: number | null,
  elapsed: number
): number => {
  if (status === "idle") {
    return mode === "timed" ? timeLimit : 0;
  }

  if (mode === "timed") {
    return timeLeft ?? timeLimit;
  }

  return elapsed;
};

export const formatTime = (seconds: number) => {
  const safeSeconds = Math.max(0, seconds);

  const minutes = Math.floor(safeSeconds / 60);
  const remainingSeconds = safeSeconds % 60;

  return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
};
