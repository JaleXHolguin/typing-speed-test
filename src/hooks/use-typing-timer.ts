import { useEffect, useRef } from "react";
import { useTypingStore } from "../store/typing.store";

export const useTypingTimer = () => {
  const status = useTypingStore((s) => s.status);
  const tick = useTypingStore((s) => s.tick);

  const intervalRef = useRef<number | null>(null);

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
};
