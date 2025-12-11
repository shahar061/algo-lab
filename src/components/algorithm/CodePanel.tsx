import React from "react";

interface CodePanelProps {
  language: "ts" | "js" | "pseudocode" | "plaintext";
  code: string;
}

const LANGUAGE_LABELS = {
  ts: "TypeScript",
  js: "JavaScript",
  pseudocode: "Pseudocode",
  plaintext: "Code",
} as const;

export function CodePanel({ language, code }: CodePanelProps) {
  const languageLabel = LANGUAGE_LABELS[language];

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header with language label */}
      <div className="border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          {languageLabel}
        </span>
      </div>

      {/* Code block */}
      <div className="overflow-x-auto p-4">
        <pre className="text-sm">
          <code className="text-gray-800 dark:text-gray-200">{code}</code>
        </pre>
      </div>
    </div>
  );
}
