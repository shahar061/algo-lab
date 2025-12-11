/**
 * Integration file showing how to convert YAML algorithm data
 * to the format expected by the subjects system
 */

import { loadSortingAlgorithms, type AlgorithmData } from "./loader";
import type { AlgorithmMeta, Subject } from "../subjects";

/**
 * Convert a YAML AlgorithmData to an AlgorithmMeta for the subjects system
 */
export function algorithmDataToMeta(
  data: AlgorithmData,
  subjectId: string,
): AlgorithmMeta {
  return {
    id: data.id,
    name: data.name,
    subjectId: subjectId as "sorting" | "pathfinding" | "graphs" | "trees",
    complexity: {
      time: data.complexity.time.average, // Use average case for display
      space: data.complexity.space,
    },
    tags: data.tags,
    route: `/${subjectId}/${data.id}`,
  };
}

/**
 * Generate sorting algorithms subject from YAML data
 */
export function generateSortingSubject(): Subject {
  const algorithms = loadSortingAlgorithms();

  return {
    id: "sorting",
    name: "Sorting Algorithms",
    description:
      "Explore various sorting algorithms and visualize how they organize data step by step.",
    algorithms: algorithms.map((algo) => algorithmDataToMeta(algo, "sorting")),
  };
}

/**
 * Get full algorithm data including all details from YAML
 */
export function getFullAlgorithmData(
  algorithmId: string,
): AlgorithmData | undefined {
  const algorithms = loadSortingAlgorithms();
  return algorithms.find((algo) => algo.id === algorithmId);
}
