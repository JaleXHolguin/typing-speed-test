import type { WpmEntry } from "./wpm-history";

export const getDifficultyColor = (difficulty: WpmEntry["difficulty"]) => {
  switch (difficulty) {
    case "easy":
      return "text-green-500";
    case "medium":
      return "text-yellow-500";
    case "hard":
      return "text-red-500";
    default:
      return "text-neutral-500";
  }
};

export const getModeLabel = (mode: WpmEntry["mode"]) =>
  mode === "timed" ? "Timed (60s)" : "Passage";

export const formatDate = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = (now.getTime() - date.getTime()) / 36e5;

  if (diffInHours < 24) {
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  if (diffInHours < 48) return "Yesterday";

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};
