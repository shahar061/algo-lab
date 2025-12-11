import fs from "fs";
import path from "path";
import YAML from "yaml";

// Type definitions for the YAML structure
export interface AlgorithmComplexity {
  time: {
    best: string;
    average: string;
    worst: string;
  };
  space: string;
}

export interface AlgorithmCharacteristics {
  stable: boolean;
  inPlace: boolean;
  adaptive: boolean;
  comparison: boolean;
}

export interface CodeImplementations {
  python?: string;
  java?: string;
  go?: string;
}

export interface AlgorithmData {
  id: string;
  name: string;
  description: string;
  complexity: AlgorithmComplexity;
  characteristics: AlgorithmCharacteristics;
  tags: string[];
  difficulty: "beginner" | "intermediate" | "advanced";
  explanation: string[];
  pseudocode: string;
  useCases: string[];
  implementations?: CodeImplementations;
}

export interface AlgorithmsYAML {
  algorithms: AlgorithmData[];
}

/**
 * Load and parse sorting algorithms from YAML file
 * This function reads the sorting.yaml file at build time
 */
export function loadSortingAlgorithms(): AlgorithmData[] {
  const yamlPath = path.join(
    process.cwd(),
    "src",
    "data",
    "algorithms",
    "sorting.yaml",
  );

  try {
    const fileContents = fs.readFileSync(yamlPath, "utf8");
    const parsed = YAML.parse(fileContents) as AlgorithmsYAML;
    return parsed.algorithms;
  } catch (error) {
    console.error("Error loading sorting algorithms:", error);
    return [];
  }
}

/**
 * Get a specific algorithm by ID
 */
export function getAlgorithmById(id: string): AlgorithmData | undefined {
  const algorithms = loadSortingAlgorithms();
  return algorithms.find((algo) => algo.id === id);
}

/**
 * Get algorithms by difficulty level
 */
export function getAlgorithmsByDifficulty(
  difficulty: "beginner" | "intermediate" | "advanced",
): AlgorithmData[] {
  const algorithms = loadSortingAlgorithms();
  return algorithms.filter((algo) => algo.difficulty === difficulty);
}

/**
 * Get algorithms by tag
 */
export function getAlgorithmsByTag(tag: string): AlgorithmData[] {
  const algorithms = loadSortingAlgorithms();
  return algorithms.filter((algo) => algo.tags.includes(tag));
}
