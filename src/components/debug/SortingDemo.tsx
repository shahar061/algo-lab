"use client";

import React, { useMemo, useState } from "react";
import { usePlayer } from "@/lib/playback/usePlayer";
import { SortVisualizer } from "@/components/visualizers/sorting/SortVisualizer";
import { ControlsBar } from "@/components/algorithm/ControlsBar";
import {
  generateSortingSteps,
  generateArray,
  type SortStep,
  type ArrayPreset,
} from "@/lib/visualizers/sorting";
import { Button } from "@/components/ui/button";

interface SortingDemoProps {
  algorithmId: string;
}

export function SortingDemo({ algorithmId }: SortingDemoProps) {
  const [arraySize, setArraySize] = useState(10);
  const [arrayPreset, setArrayPreset] = useState<ArrayPreset>("random");
  const [seed, setSeed] = useState(0); // Used to force regeneration

  // Generate array and steps
  const steps = useMemo(() => {
    const array = generateArray(arraySize, arrayPreset, 1, 100);
    return generateSortingSteps(algorithmId, array);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [algorithmId, arraySize, arrayPreset, seed]);

  const player = usePlayer<SortStep>({
    steps,
    initialSpeedMs: 800,
  });

  const currentStep = player.currentStep ?? steps[0];

  if (!currentStep) {
    return (
      <div className="rounded-lg border border-gray-200 bg-white p-6 text-center dark:border-gray-700 dark:bg-gray-800">
        <p className="text-gray-600 dark:text-gray-300">
          No visualization available for this algorithm
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Array controls */}
      <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Size:
          </label>
          <input
            type="range"
            min="5"
            max="20"
            value={arraySize}
            onChange={(e) => setArraySize(Number(e.target.value))}
            className="w-24"
          />
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {arraySize}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Type:
          </label>
          <select
            value={arrayPreset}
            onChange={(e) => setArrayPreset(e.target.value as ArrayPreset)}
            className="rounded border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200"
          >
            <option value="random">Random</option>
            <option value="nearly-sorted">Nearly Sorted</option>
            <option value="reversed">Reversed</option>
            <option value="few-unique">Few Unique</option>
            <option value="all-equal">All Equal</option>
          </select>
        </div>

        <Button
          onClick={() => setSeed((s) => s + 1)}
          size="sm"
          variant="outline"
        >
          Regenerate
        </Button>
      </div>

      {/* Current step description */}
      {currentStep.description && (
        <div className="rounded-lg bg-blue-100 px-4 py-2 text-center text-sm font-medium text-blue-900 shadow-lg dark:bg-blue-900 dark:text-blue-100">
          {currentStep.description}
        </div>
      )}

      <SortVisualizer
        values={currentStep.values}
        comparingIndices={currentStep.comparingIndices}
        swappedIndices={currentStep.swappedIndices}
        sortedIndices={currentStep.sortedIndices}
        activeRange={currentStep.activeRange}
        pivotIndex={currentStep.pivotIndex}
      />

      <ControlsBar
        isPlaying={player.isPlaying}
        onPlay={player.play}
        onPause={player.pause}
        onNext={player.next}
        onPrev={player.prev}
        currentIndex={player.currentIndex}
        totalSteps={player.steps.length}
        speedMs={player.speedMs}
        onSpeedChange={player.setSpeed}
      />
    </div>
  );
}
