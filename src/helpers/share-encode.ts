import type { Phrase } from "../store/typing.store";
import { arrayToRanges } from "./array-to-ranges";

export type CompactCategory = "c" | "e" | "i";

export const b62 = (n: number): string => {
  const chars =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let s = "";
  do {
    s = chars[n % 62] + s;
    n = Math.floor(n / 62);
  } while (n > 0);
  return s;
};

export const miniRanges = (ranges: number[][]): string =>
  ranges.map(([a, b]) => (a === b ? `${a}` : `${a}-${b}`)).join(",");

export const generatePayload = (
  wpm: number,
  accuracy: number,
  phrase: Phrase
) => {
  const buckets: Record<CompactCategory, number[]> = {
    c: [],
    e: [],
    i: [],
  };

  phrase.results.forEach((st, idx) => {
    if (st === "correct") buckets.c.push(idx);
    else if (st === "corrected") buckets.e.push(idx);
    else if (st === "incorrect") buckets.i.push(idx);
  });

  const ranges: Record<string, string> = {};
  (Object.keys(buckets) as CompactCategory[]).forEach((k) => {
    if (buckets[k].length) {
      ranges[k] = miniRanges(arrayToRanges(buckets[k]));
    }
  });

  const payload =
    phrase.id +
    "_" +
    b62(Math.round(wpm)) +
    "_" +
    b62(Math.round(accuracy * 100)) +
    (ranges.c ? `_c${ranges.c}` : "") +
    (ranges.e ? `_e${ranges.e}` : "") +
    (ranges.i ? `_i${ranges.i}` : "");

  return payload;
};

export const base64urlEncode = (str: string): string =>
  btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");

export const base64urlDecode = (str: string): string => {
  let s = str.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  return atob(s);
};
