import React from "react";
import { Lightbulb } from "lucide-react";

interface UseCasesPanelProps {
  useCases: string[];
}

export function UseCasesPanel({ useCases }: UseCasesPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <div className="mb-4 flex items-center gap-2">
        <Lightbulb className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
        <h3 className="text-xl font-bold text-gray-900 dark:text-white">
          Use Cases
        </h3>
      </div>
      <ul className="list-disc space-y-2 pl-5">
        {useCases.map((useCase, index) => (
          <li key={index} className="text-gray-700 dark:text-gray-300">
            {useCase}
          </li>
        ))}
      </ul>
    </div>
  );
}
