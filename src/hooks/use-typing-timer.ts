import { useEffect, useRef } from "react";
import { useSettingsStore } from "../store/settings.store";
import { useTypingStore } from "../store/typing.store";

export const useTypingTimer = () => {
  const mode = useSettingsStore((s) => s.mode);
  const timeLimit = useSettingsStore((s) => s.timeLimit);

  const status = useTypingStore((s) => s.status);
  const tick = useTypingStore((s) => s.tick);
  const startTimed = useTypingStore((s) => s.startTimed);
  const startPassage = useTypingStore((s) => s.startPassage);

  const intervalRef = useRef<number | null>(null);

  const startTest = () => {
    if (mode === "timed") startTimed(timeLimit);
    else startPassage();
  };

  useEffect(() => {
    if (status !== "running") return;

    intervalRef.current = window.setInterval(tick, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [status, tick]);

  return { startTest };
};
