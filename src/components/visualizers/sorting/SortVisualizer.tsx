"use client";

import React from "react";

interface SortVisualizerProps {
  values: number[];
  comparingIndices?: [number, number] | null;
  swappedIndices?: [number, number] | null;
  sortedIndices?: number[];
  activeRange?: [number, number];
  pivotIndex?: number;
}

export function SortVisualizer({
  values,
  comparingIndices,
  swappedIndices,
  sortedIndices,
  activeRange,
  pivotIndex,
}: SortVisualizerProps) {
  // Find max value for scaling bar heights - handle empty array
  const maxValue = values.length > 0 ? Math.max(...values) : 1;

  // Helper to determine bar state
  const getBarState = (index: number) => {
    if (pivotIndex === index) return "pivot";
    if (swappedIndices?.includes(index)) return "swapped";
    if (comparingIndices?.includes(index)) return "comparing";
    if (sortedIndices?.includes(index)) return "sorted";
    if (
      activeRange &&
      index >= activeRange[0] &&
      index <= activeRange[1] &&
      !sortedIndices?.includes(index)
    )
      return "active";
    return "default";
  };

  // Helper to get bar styling based on state
  const getBarClasses = (
    state: "default" | "comparing" | "swapped" | "sorted" | "active" | "pivot",
  ) => {
    const baseClasses = "w-full rounded-t transition-all duration-500 ease-out";

    switch (state) {
      case "pivot":
        return `${baseClasses} bg-purple-500 animate-pulse shadow-xl`;
      case "comparing":
        return `${baseClasses} bg-yellow-400 animate-pulse-compare shadow-lg`;
      case "swapped":
        return `${baseClasses} bg-red-500 animate-pop shadow-xl`;
      case "sorted":
        return `${baseClasses} bg-green-500 shadow-md`;
      case "active":
        return `${baseClasses} bg-blue-400 shadow-md`;
      default:
        return `${baseClasses} bg-blue-500 shadow-md hover:shadow-lg`;
    }
  };

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-gray-700 dark:bg-gray-800">
      {/* Title */}
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Array State
        </h2>
        <div className="flex gap-4 text-xs text-gray-600 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-blue-500"></div>
            <span>Default</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-yellow-400"></div>
            <span>Comparing</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-red-500"></div>
            <span>Swapped</span>
          </div>
        </div>
      </div>

      {/* Bar chart container */}
      <div className="rounded-lg bg-gray-50 p-6 dark:bg-gray-900">
        {/* Height reference line - shows where 100% is */}
        <div className="mb-2 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Height scale:</span>
          <span>Max value ({maxValue}) = 100%</span>
        </div>

        <div className="rounded border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800">
          {values.length === 0 ? (
            <div
              className="flex items-center justify-center"
              style={{ height: "320px" }}
            >
              <p className="text-gray-500 dark:text-gray-400">
                No data to display
              </p>
            </div>
          ) : (
            <div className="flex justify-around gap-2">
              {values.map((value, index) => {
                // Calculate exact proportional height - max value gets 100%
                const heightPercentage = (value / maxValue) * 100;
                const barState = getBarState(index);
                // Calculate height in pixels for clarity (280px is the bar area height)
                const barHeightPx = (heightPercentage / 100) * 280;

                return (
                  <div
                    key={`${index}-${value}`}
                    className="flex flex-1 flex-col items-center gap-2"
                  >
                    {/* Bar area with fixed height */}
                    <div
                      className="flex w-full items-end"
                      style={{ height: "280px" }}
                    >
                      <div
                        className={getBarClasses(barState)}
                        style={{
                          height: `${Math.max(barHeightPx, 6)}px`,
                          width: "100%",
                        }}
                        title={`Value: ${value} (${heightPercentage.toFixed(1)}% of max)`}
                      />
                    </div>

                    {/* Value label */}
                    <span
                      className={`text-sm font-bold transition-colors duration-300 ${
                        barState === "comparing"
                          ? "text-yellow-600 dark:text-yellow-400"
                          : barState === "swapped"
                            ? "text-red-600 dark:text-red-400"
                            : "text-gray-700 dark:text-gray-300"
                      }`}
                    >
                      {value}
                    </span>

                    {/* Index label */}
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {index}
                    </span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Optional stats footer */}
      <div className="mt-4 flex justify-between text-xs text-gray-500 dark:text-gray-400">
        <span>Elements: {values.length}</span>
        {values.length > 0 && (
          <>
            <span>Max: {maxValue}</span>
            <span>Min: {values.length > 0 ? Math.min(...values) : "N/A"}</span>
          </>
        )}
      </div>
    </div>
  );
}
