import { phrases } from "../data/phrases";
import type { Difficulty } from "../store/settings.store";

export type CharState = "pending" | "correct" | "incorrect" | "corrected";

export const getRandomPhrase = (difficulty: Difficulty) => {
  const phrasesByDifficulty = phrases[difficulty];
  const randomIndex = Math.floor(Math.random() * phrasesByDifficulty.length);
  const phrase = phrasesByDifficulty[randomIndex];
  const chars = phrase.text.split("");
  const results = Array(chars.length).fill("pending") as CharState[];
  return {
    id: phrase.id,
    chars,
    results,
  };
};
