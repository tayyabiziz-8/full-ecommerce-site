import { useState, useEffect, useRef, useCallback } from "react";

export function useCarousel({ slideCount, autoplayMs = 5000 }) {
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef(null);

  const prefersReducedMotion =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const goTo = useCallback(
    (i) => setIndex(((i % slideCount) + slideCount) % slideCount),
    [slideCount]
  );
  const next = useCallback(() => goTo(index + 1), [goTo, index]);
  const prev = useCallback(() => goTo(index - 1), [goTo, index]);

  useEffect(() => {
    if (isPaused || prefersReducedMotion) return undefined;
    timerRef.current = setInterval(next, autoplayMs);
    return () => clearInterval(timerRef.current);
  }, [isPaused, prefersReducedMotion, next, autoplayMs]);

  return { index, goTo, next, prev, isPaused, setIsPaused, prefersReducedMotion };
}