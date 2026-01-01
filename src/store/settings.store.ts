import { create } from "zustand";

export type Difficulty = "easy" | "medium" | "hard";
export type Mode = "timed" | "passage";

interface TypingState {
  difficulty: Difficulty;
  mode: Mode;
  timeLimit: number;
  passageId: string;

  setDifficulty: (d: Difficulty) => void;
  setMode: (m: Mode) => void;
  setTimeLimit: (t: number) => void;
  setPassageId: (id: string) => void;
  resetSettings: () => void;
}

export const useSettingsStore = create<TypingState>((set) => ({
  difficulty: "hard",
  mode: "timed",
  timeLimit: 60,
  passageId: "hard-01",

  setDifficulty: (difficulty) => set(() => ({ difficulty })),

  setMode: (mode) => set(() => ({ mode })),

  setTimeLimit: (timeLimit) => set(() => ({ timeLimit })),

  setPassageId: (passageId) => set(() => ({ passageId })),

  resetSettings: () =>
    set({
      difficulty: "hard",
      mode: "timed",
      timeLimit: 60,
      passageId: "hard-01",
    }),
}));
