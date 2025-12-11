import React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import type { AlgorithmCharacteristics } from "@/lib/algorithms";

interface CharacteristicsPanelProps {
  characteristics: AlgorithmCharacteristics;
  difficulty?: "beginner" | "intermediate" | "advanced";
}

const DIFFICULTY_COLORS = {
  beginner: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  intermediate:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  advanced: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
} as const;

export function CharacteristicsPanel({
  characteristics,
  difficulty,
}: CharacteristicsPanelProps) {
  const characteristicsList = [
    { label: "Stable", value: characteristics.stable },
    { label: "In-Place", value: characteristics.inPlace },
    { label: "Adaptive", value: characteristics.adaptive },
    { label: "Comparison-Based", value: characteristics.comparison },
  ];

  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h3 className="mb-4 text-xl font-bold text-gray-900 dark:text-white">
        Characteristics
      </h3>

      {difficulty && (
        <div className="mb-4">
          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            Difficulty:{" "}
          </span>
          <span
            className={`inline-block rounded px-2 py-1 text-xs font-semibold uppercase ${DIFFICULTY_COLORS[difficulty]}`}
          >
            {difficulty}
          </span>
        </div>
      )}

      <div className="space-y-2">
        {characteristicsList.map((item) => (
          <div key={item.label} className="flex items-center gap-2">
            {item.value ? (
              <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />
            ) : (
              <XCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
            )}
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
