import React from "react";

interface ExplanationPanelProps {
  title: string;
  description: string;
  bullets?: string[];
}

export function ExplanationPanel({
  title,
  description,
  bullets,
}: ExplanationPanelProps) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
      <h2 className="mb-4 text-2xl font-bold text-gray-900 dark:text-white">
        {title}
      </h2>
      <p className="mb-4 text-gray-700 dark:text-gray-300">{description}</p>
      {bullets && bullets.length > 0 && (
        <ul className="list-disc space-y-2 pl-5">
          {bullets.map((bullet, index) => (
            <li key={index} className="text-gray-700 dark:text-gray-300">
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
