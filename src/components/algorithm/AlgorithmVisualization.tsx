"use client";

import React from "react";
import { ControlsBar } from "./ControlsBar";
import { SortVisualizer } from "../visualizers/sorting/SortVisualizer";

export function AlgorithmVisualization() {
  // Dummy data for visualization
  const dummyValues = [5, 1, 4, 2, 8];
  const dummyHandlers = {
    onPlay: () => {
      // TODO: Implement play logic
    },
    onPause: () => {
      // TODO: Implement pause logic
    },
    onNext: () => {
      // TODO: Implement next step logic
    },
    onPrev: () => {
      // TODO: Implement previous step logic
    },
    onSpeedChange: () => {
      // TODO: Implement speed change logic
    },
  };

  return (
    <>
      <SortVisualizer values={dummyValues} />
      <ControlsBar
        isPlaying={false}
        currentIndex={0}
        totalSteps={10}
        speedMs={300}
        {...dummyHandlers}
      />
    </>
  );
}
