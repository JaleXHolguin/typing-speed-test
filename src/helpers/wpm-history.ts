export type WpmEntry = {
  id: string;
  wpm: number;
  accuracy: number;
  mode: "timed" | "passage";
  difficulty: "easy" | "medium" | "hard";
  timestamp: number;
};

const STORAGE_KEY = "typing:wpm-history";

export const getWpmHistory = (): WpmEntry[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
};

export const saveWpmResult = (entry: WpmEntry) => {
  const history = getWpmHistory();
  history.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
};

export const getPersonalBest = (): number | null => {
  const history = getWpmHistory();
  if (history.length === 0) return null;
  return Math.max(...history.map((h) => h.wpm));
};
