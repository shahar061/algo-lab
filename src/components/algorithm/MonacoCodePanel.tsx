"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import type { CodeImplementations } from "@/lib/algorithms";

type SupportedLanguage = "python" | "java" | "go";

interface MonacoCodePanelProps {
  code: CodeImplementations;
}

const LANGUAGE_CONFIG = {
  python: {
    label: "Python",
    monacoLanguage: "python",
  },
  java: {
    label: "Java",
    monacoLanguage: "java",
  },
  go: {
    label: "Go",
    monacoLanguage: "go",
  },
} as const;

export function MonacoCodePanel({ code }: MonacoCodePanelProps) {
  // Get available languages from the code object
  const availableLanguages = (Object.keys(code) as SupportedLanguage[]).filter(
    (lang) => code[lang],
  );

  // Set initial language to the first available one
  const [selectedLanguage, setSelectedLanguage] = useState<SupportedLanguage>(
    availableLanguages[0] ?? "python",
  );

  const currentCode = code[selectedLanguage] ?? "";

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800">
      {/* Header with language tabs */}
      <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-900">
        <span className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Implementation
        </span>
        <div className="flex gap-2">
          {availableLanguages.map((lang) => (
            <button
              key={lang}
              onClick={() => setSelectedLanguage(lang)}
              className={`rounded px-3 py-1 text-xs font-medium transition-colors ${
                selectedLanguage === lang
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              }`}
            >
              {LANGUAGE_CONFIG[lang].label}
            </button>
          ))}
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="overflow-hidden">
        <Editor
          height="400px"
          language={LANGUAGE_CONFIG[selectedLanguage].monacoLanguage}
          value={currentCode}
          theme="vs-dark"
          options={{
            readOnly: true,
            minimap: { enabled: false },
            fontSize: 14,
            lineNumbers: "on",
            scrollBeyondLastLine: false,
            automaticLayout: true,
            scrollbar: {
              vertical: "auto",
              horizontal: "auto",
            },
            padding: { top: 16, bottom: 16 },
          }}
          loading={
            <div className="flex h-[400px] items-center justify-center">
              <p className="text-gray-600 dark:text-gray-300">
                Loading editor...
              </p>
            </div>
          }
        />
      </div>
    </div>
  );
}
