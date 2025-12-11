"use client";

import React, { useState } from "react";
import { SortVisualizer } from "@/components/visualizers/sorting/SortVisualizer";

/**
 * Standalone showcase for SortVisualizer
 * Demonstrates all animation states without playback controls
 */
export function SortVisualizerShowcase() {
  // Values chosen to show clear proportions: 10 is max (100%), others are clear percentages
  const [values] = useState([10, 2, 8, 3, 6, 9, 1, 5]);
  const [demoState, setDemoState] = useState<
    "default" | "comparing" | "swapped"
  >("default");

  const getStateProps = () => {
    switch (demoState) {
      case "comparing":
        return {
          comparingIndices: [2, 4] as [number, number],
          swappedIndices: null,
        };
      case "swapped":
        return {
          comparingIndices: null,
          swappedIndices: [1, 5] as [number, number],
        };
      default:
        return {
          comparingIndices: null,
          swappedIndices: null,
        };
    }
  };

  return (
    <div className="space-y-6">
      <div className="rounded-lg bg-gray-100 p-4 dark:bg-gray-800">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-gray-100">
          Animation State Controls
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => setDemoState("default")}
            className={`rounded-lg px-4 py-2 font-medium transition-all ${
              demoState === "default"
                ? "bg-blue-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Default State
          </button>
          <button
            onClick={() => setDemoState("comparing")}
            className={`rounded-lg px-4 py-2 font-medium transition-all ${
              demoState === "comparing"
                ? "bg-yellow-400 text-gray-900 shadow-lg dark:bg-yellow-500"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Comparing (indices 2 & 4)
          </button>
          <button
            onClick={() => setDemoState("swapped")}
            className={`rounded-lg px-4 py-2 font-medium transition-all ${
              demoState === "swapped"
                ? "bg-red-500 text-white shadow-lg"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            }`}
          >
            Swapped (indices 1 & 5)
          </button>
        </div>
      </div>

      <SortVisualizer values={values} {...getStateProps()} />

      <div className="rounded-lg bg-gray-100 p-4 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
        <h4 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">
          Features:
        </h4>
        <ul className="list-inside list-disc space-y-1">
          <li>
            <strong>Smooth animations:</strong> Bar heights transition smoothly
            with CSS (500ms duration)
          </li>
          <li>
            <strong>Comparing state:</strong> Yellow bars with pulsing animation
          </li>
          <li>
            <strong>Swapped state:</strong> Red bars with pop/scale animation
          </li>
          <li>
            <strong>Adaptive theme:</strong> Automatically adjusts to light/dark
            mode
          </li>
          <li>
            <strong>Legend & stats:</strong> Color legend and array statistics
          </li>
          <li>
            <strong>Index labels:</strong> Small indices below each bar
          </li>
        </ul>
      </div>
    </div>
  );
}
