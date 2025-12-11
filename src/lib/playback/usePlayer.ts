"use client";

import { useEffect, useState } from "react";

type PlayerOptions<Step> = {
  steps: Step[]; // precomputed steps for now
  initialSpeedMs?: number;
};

export function usePlayer<Step>({
  steps,
  initialSpeedMs = 300,
}: PlayerOptions<Step>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speedMs, setSpeedMs] = useState(initialSpeedMs);

  useEffect(() => {
    if (!isPlaying || steps.length === 0) return;

    const id = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev >= steps.length - 1) {
          return prev;
        }
        return prev + 1;
      });
    }, speedMs);

    return () => clearInterval(id);
  }, [isPlaying, speedMs, steps.length]);

  const currentStep = steps[currentIndex] ?? null;

  const controls = {
    play: () => setIsPlaying(true),
    pause: () => setIsPlaying(false),
    toggle: () => setIsPlaying((p) => !p),
    next: () => setCurrentIndex((i) => Math.min(i + 1, steps.length - 1)),
    prev: () => setCurrentIndex((i) => Math.max(i - 1, 0)),
    goTo: (index: number) =>
      setCurrentIndex(() => Math.min(Math.max(index, 0), steps.length - 1)),
    setSpeed: (ms: number) => setSpeedMs(ms),
  };

  return {
    steps,
    currentStep,
    currentIndex,
    isPlaying,
    speedMs,
    ...controls,
  };
}
