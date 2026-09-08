import { useState, useEffect, useRef, useCallback } from 'react';

export default function useAutoPlay(onTick, intervalMs = 3500) {
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef(null);

  const stop = useCallback(() => {
    setIsPlaying(false);
    if (timerRef.current) clearInterval(timerRef.current);
  }, []);

  const start = useCallback(() => {
    setIsPlaying(true);
  }, []);

  const toggle = useCallback(() => {
    setIsPlaying((p) => !p);
  }, []);

  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        onTick();
      }, intervalMs);
    } else if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying, intervalMs]);

  return { isPlaying, start, stop, toggle };
}
