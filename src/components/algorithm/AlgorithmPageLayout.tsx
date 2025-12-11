import React from "react";

interface AlgorithmPageLayoutProps {
  title: string;
  subjectName: string;
  complexity: {
    time: string;
    space: string;
  };
  left: React.ReactNode;
  right: React.ReactNode;
}

export function AlgorithmPageLayout({
  title,
  subjectName,
  complexity,
  left,
  right,
}: AlgorithmPageLayoutProps) {
  return (
    <div className="space-y-6">
      {/* Breadcrumb header with complexity info */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 text-sm text-gray-600 dark:text-gray-400">
            {subjectName} &gt; {title}
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 dark:text-white">
            {title}
          </h1>
        </div>
        <div className="flex flex-col gap-2 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Time:
            </span>
            <code className="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700 dark:text-gray-200">
              {complexity.time}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
              Space:
            </span>
            <code className="rounded bg-gray-100 px-2 py-1 text-sm dark:bg-gray-700 dark:text-gray-200">
              {complexity.space}
            </code>
          </div>
        </div>
      </div>

      {/* 2-column responsive grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Left column */}
        <div className="space-y-6">{left}</div>

        {/* Right column */}
        <div className="space-y-6">{right}</div>
      </div>
    </div>
  );
}
