import React from "react";
import type { AlgorithmComplexity } from "@/lib/algorithms";

interface ComplexityPanelProps {
  complexity: AlgorithmComplexity;
}

export function ComplexityPanel({ complexity }: ComplexityPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Complexity Analysis
      </h3>

      {/* Time Complexity */}
      <div className="mb-4">
        <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Time Complexity
        </h4>
        <div className="space-y-1 pl-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Best Case:
            </span>
            <code className="rounded bg-green-100 px-2 py-1 font-mono text-sm text-green-800 dark:bg-green-900 dark:text-green-200">
              {complexity.time.best}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Average Case:
            </span>
            <code className="rounded bg-blue-100 px-2 py-1 font-mono text-sm text-blue-800 dark:bg-blue-900 dark:text-blue-200">
              {complexity.time.average}
            </code>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Worst Case:
            </span>
            <code className="rounded bg-red-100 px-2 py-1 font-mono text-sm text-red-800 dark:bg-red-900 dark:text-red-200">
              {complexity.time.worst}
            </code>
          </div>
        </div>
      </div>

      {/* Space Complexity */}
      <div>
        <h4 className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
          Space Complexity
        </h4>
        <div className="pl-4">
          <code className="rounded bg-purple-100 px-2 py-1 font-mono text-sm text-purple-800 dark:bg-purple-900 dark:text-purple-200">
            {complexity.space}
          </code>
        </div>
      </div>
    </div>
  );
}
