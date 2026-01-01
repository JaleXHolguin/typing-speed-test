import { create } from "zustand";

export type TestStatus = "idle" | "running" | "finished";

interface TypingState {
  status: TestStatus;
  wpm: number;
  accuracy: number;

  startTime: number | null;
  endTime: number | null;
  timeLeft: number | null;
  now: number;

  startTimed: (timeLimit: number) => void;
  startPassage: () => void;
  tick: () => void;
  finish: (wpm: number, accuracy: number) => void;
  reset: () => void;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  status: "idle",
  wpm: 0,
  accuracy: 100,

  startTime: null,
  endTime: null,
  timeLeft: null,
  now: Date.now(),

  startTimed: (timeLimit) => {
    const now = Date.now();
    set({
      status: "running",
      startTime: now,
      endTime: null,
      timeLeft: timeLimit,
      now,
    });
  },

  startPassage: () => {
    const now = Date.now();
    set({
      status: "running",
      startTime: now,
      endTime: null,
      timeLeft: null,
      now,
    });
  },

  tick: () => {
    const { status, timeLeft } = get();
    if (status !== "running") return;

    set({ now: Date.now() });

    if (timeLeft === null) return;

    if (timeLeft <= 1) {
      set({
        timeLeft: 0,
        status: "finished",
        endTime: Date.now(),
      });
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  finish: (wpm, accuracy) =>
    set({
      status: "finished",
      wpm,
      accuracy,
      endTime: Date.now(),
    }),

  reset: () =>
    set({
      status: "idle",
      wpm: 0,
      accuracy: 100,
      startTime: null,
      endTime: null,
      timeLeft: null,
    }),
}));
