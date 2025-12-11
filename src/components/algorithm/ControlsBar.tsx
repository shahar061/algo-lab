"use client";

import React from "react";

interface ControlsBarProps {
  isPlaying: boolean;
  onPlay: () => void;
  onPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  currentIndex: number;
  totalSteps: number;
  speedMs: number;
  onSpeedChange: (ms: number) => void;
}

export function ControlsBar({
  isPlaying,
  onPlay,
  onPause,
  onNext,
  onPrev,
  currentIndex,
  totalSteps,
  speedMs,
  onSpeedChange,
}: ControlsBarProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="flex flex-col gap-4">
        {/* Playback buttons and step counter */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            {/* Previous button */}
            <button
              onClick={onPrev}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              disabled={currentIndex === 0}
            >
              ← Prev
            </button>

            {/* Play/Pause button */}
            <button
              onClick={isPlaying ? onPause : onPlay}
              className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            >
              {isPlaying ? "⏸ Pause" : "▶ Play"}
            </button>

            {/* Next button */}
            <button
              onClick={onNext}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 font-semibold text-gray-700 transition hover:bg-gray-50 disabled:opacity-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
              disabled={currentIndex >= totalSteps - 1}
            >
              Next →
            </button>
          </div>

          {/* Step counter */}
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Step {currentIndex + 1} / {totalSteps}
          </div>
        </div>

        {/* Speed control */}
        <div className="flex items-center gap-4">
          <label className="text-sm font-semibold text-gray-700 dark:text-gray-200">
            Speed:
          </label>
          <input
            type="range"
            min="50"
            max="1000"
            step="50"
            value={speedMs}
            onChange={(e) => onSpeedChange(Number(e.target.value))}
            className="flex-1"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {speedMs}ms
          </span>
        </div>
      </div>
    </div>
  );
}
