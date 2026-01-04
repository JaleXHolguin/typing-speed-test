import { create } from "zustand";
import { type CharState, getRandomPhrase } from "../helpers/get-random-phrase";
import { getPersonalBest, saveWpmResult } from "../helpers/wpm-history";
import { useSettingsStore } from "./settings.store";

export type TestStatus = "idle" | "running" | "finished";

export type KeyStats = Record<string, { total: number; errors: number }>;

export interface Phrase {
  id: string;
  chars: string[];
  results: CharState[];
}

interface TypingState {
  status: TestStatus;
  wpm: number;
  accuracy: number;

  phrase: Phrase;
  index: number;
  keyStats: KeyStats;
  originalErrors: Set<number>;

  startTime: number | null;
  endTime: number | null;
  timeLeft: number | null;
  now: number;

  personalBest: number;
  isNewPersonalBest: boolean;
  isFirstTest: boolean;

  startTimed: (timeLimit: number) => void;
  startPassage: () => void;
  tick: () => void;
  registerKeystroke: (char: string, isCorrect: boolean) => void;
  finish: () => void;
  reset: () => void;
}

export const useTypingStore = create<TypingState>((set, get) => ({
  status: "idle",
  wpm: 0,
  accuracy: 0,

  phrase: getRandomPhrase("hard"),
  index: 0,
  keyStats: {},
  originalErrors: new Set(),

  startTime: null,
  endTime: null,
  timeLeft: null,
  now: Date.now(),

  personalBest: getPersonalBest() ?? 0,
  isNewPersonalBest: false,
  isFirstTest: false,

  startTimed: (timeLimit) => {
    const now = Date.now();
    set({
      status: "running",
      startTime: now,
      endTime: null,
      timeLeft: timeLimit,
      now,
      wpm: 0,
      accuracy: 0,
      index: 0,
      keyStats: {},
      originalErrors: new Set(),
      isNewPersonalBest: false,
      isFirstTest: false,
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
      wpm: 0,
      accuracy: 0,
      index: 0,
      keyStats: {},
      originalErrors: new Set(),
      isNewPersonalBest: false,
      isFirstTest: false,
    });
  },

  tick: () => {
    const { status, timeLeft } = get();
    if (status !== "running") return;

    set({ now: Date.now() });

    if (timeLeft === null) return;

    if (timeLeft <= 1) {
      get().finish();
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  registerKeystroke: (char, isCorrect) => {
    const { phrase, index, originalErrors, keyStats, startTime, now } = get();
    if (!phrase || !startTime) return;

    const key = char.toLowerCase();
    const current = keyStats[key] || { total: 0, errors: 0 };
    const newKeyStats = {
      ...keyStats,
      [key]: {
        total: current.total + 1,
        errors: current.errors + (isCorrect ? 0 : 1),
      },
    };

    const results = [...phrase.results];
    if (isCorrect) {
      results[index] = originalErrors.has(index) ? "corrected" : "correct";
    } else {
      results[index] = "incorrect";
    }

    const newOriginalErrors = new Set(originalErrors);
    if (!isCorrect) newOriginalErrors.add(index);

    const correctChars = results.filter(
      (r) => r === "correct" || r === "corrected"
    ).length;

    const uniqueErrors = newOriginalErrors.size;
    const minutes = (now - startTime) / 60000;

    const netChars = Math.max(0, correctChars - uniqueErrors);
    const wpm = minutes > 0 ? Math.round(netChars / 5 / minutes) : 0;

    const totalKeystrokes = Object.values(newKeyStats).reduce(
      (sum, k) => sum + k.total,
      0
    );

    const totalErrors = Object.values(newKeyStats).reduce(
      (sum, k) => sum + k.errors,
      0
    );

    const accuracy =
      totalKeystrokes > 0
        ? Math.round(((totalKeystrokes - totalErrors) / totalKeystrokes) * 100)
        : 0;

    set({
      keyStats: newKeyStats,
      phrase: { ...phrase, results },
      originalErrors: newOriginalErrors,
      index: index + 1,
      wpm,
      accuracy,
    });
  },

  finish: () => {
    const { wpm, accuracy, phrase } = get();
    const { mode, difficulty } = useSettingsStore.getState();
    const previousBest = getPersonalBest();

    const isFirstTest = previousBest === null;
    const isNewPersonalBest = previousBest !== null && wpm > previousBest;
    console.log(phrase.results, phrase.chars.length);

    saveWpmResult({
      id: phrase.id,
      wpm,
      accuracy,
      mode,
      difficulty,
      timestamp: Date.now(),
    });

    set({
      status: "finished",
      endTime: Date.now(),
      isFirstTest,
      isNewPersonalBest,
      personalBest: isNewPersonalBest ? wpm : previousBest ?? wpm,
    });
  },

  reset: () => {
    const { difficulty } = useSettingsStore.getState();
    set({
      status: "idle",
      wpm: 0,
      accuracy: 100,
      startTime: null,
      endTime: null,
      timeLeft: null,
      index: 0,
      keyStats: {},
      originalErrors: new Set(),
      phrase: getRandomPhrase(difficulty),
      isNewPersonalBest: false,
      isFirstTest: false,
    });
  },
}));
