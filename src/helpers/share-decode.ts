import { phrases } from "../data/phrases";
import type { CharState } from "./get-random-phrase";
import { base64urlDecode } from "./share-encode";

const fromB62 = (s: string): number => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  return [...s].reduce((n, ch) => {
    const value = chars.indexOf(ch);
    if (value === -1) {
      throw new Error(`Invalid base62 character: ${ch}`);
    }
    return n * 62 + value;
  }, 0);
};

const parseRanges = (str: string): number[][] =>
  str.split(",").map((p) => {
    const [a, b] = p.split("-").map(Number);
    if (Number.isNaN(a) || (b !== undefined && Number.isNaN(b))) {
      throw new Error("Invalid range value");
    }
    return b === undefined ? [a, a] : [a, b];
  });

export interface DecodedShare {
  id: string;
  wpm: number;
  accuracy: number;
  results: CharState[];
}

const keyToState: Record<string, CharState> = {
  c: "correct",
  e: "corrected",
  i: "incorrect",
};

export const findPhraseById = (id: string) => {
  return Object.values(phrases)
    .flat()
    .find((p) => p.id === id);
};

export const decodeSharePayload = (encoded: string): DecodedShare => {
  const raw = base64urlDecode(encoded);
  const parts = raw.split("_");

  if (parts.length < 3) {
    throw new Error("Invalid payload structure");
  }

  const [id, wpm62, acc62, ...rest] = parts;

  if (!id) throw new Error("Missing phrase id");

  const phrase = findPhraseById(id);
  if (!phrase) throw new Error("Phrase not found");

  const wpm = fromB62(wpm62);
  const accuracy = fromB62(acc62) / 100;

  if (!Number.isFinite(wpm) || wpm < 0) {
    throw new Error("Invalid WPM");
  }

  if (!Number.isFinite(accuracy) || accuracy < 0 || accuracy > 100) {
    throw new Error("Invalid accuracy");
  }

  const indexMap = new Map<number, CharState>();
  let maxIndex = -1;

  for (const part of rest) {
    if (!part) continue;

    const key = part[0];
    const state = keyToState[key];
    if (!state) {
      throw new Error(`Unknown state key: ${key}`);
    }

    const ranges = parseRanges(part.slice(1));

    for (const [a, b] of ranges) {
      if (a < 0 || b < a) {
        throw new Error("Invalid index range");
      }

      for (let i = a; i <= b; i++) {
        indexMap.set(i, state);
        if (i > maxIndex) maxIndex = i;
      }
    }
  }

  const expectedLength = phrase.text.length;

  if (maxIndex >= expectedLength) {
    throw new Error("Result indices exceed phrase length");
  }

  const results: CharState[] = Array.from(
    { length: expectedLength },
    (_, i) => indexMap.get(i) ?? "pending"
  );

  if (accuracy === 100 && results.some((s) => s !== "correct")) {
    throw new Error("Accuracy/result mismatch");
  }

  return {
    id,
    wpm,
    accuracy,
    results,
  };
};
