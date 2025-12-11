import type { AlgorithmStepGenerator } from "../types";
import { generateBubbleSortSteps } from "./generators/bubbleSort";
import { generateInsertionSortSteps } from "./generators/insertionSort";
import { generateSelectionSortSteps } from "./generators/selectionSort";
import { generateMergeSortSteps } from "./generators/mergeSort";
import { generateQuickSortSteps } from "./generators/quickSort";
import { generateHeapSortSteps } from "./generators/heapSort";
import { generateCountingSortSteps } from "./generators/countingSort";
import { generateRadixSortSteps } from "./generators/radixSort";
import { generateBucketSortSteps } from "./generators/bucketSort";

/**
 * Registry mapping algorithm IDs to their step generators
 */
const sortingAlgorithmRegistry: Record<string, AlgorithmStepGenerator> = {
  "bubble-sort": generateBubbleSortSteps,
  "insertion-sort": generateInsertionSortSteps,
  "selection-sort": generateSelectionSortSteps,
  "merge-sort": generateMergeSortSteps,
  "quick-sort": generateQuickSortSteps,
  "heap-sort": generateHeapSortSteps,
  "counting-sort": generateCountingSortSteps,
  "radix-sort": generateRadixSortSteps,
  "bucket-sort": generateBucketSortSteps,
};

/**
 * Gets the step generator for a given sorting algorithm
 * @param algorithmId - The ID of the algorithm (e.g., "bubble-sort")
 * @returns The step generator function, or undefined if not found
 */
export function getSortingAlgorithmGenerator(
  algorithmId: string,
): AlgorithmStepGenerator | undefined {
  return sortingAlgorithmRegistry[algorithmId];
}

/**
 * Generates visualization steps for a sorting algorithm
 * @param algorithmId - The ID of the algorithm
 * @param array - The input array to sort
 * @returns Array of steps, or empty array if algorithm not found
 */
export function generateSortingSteps(
  algorithmId: string,
  array: number[],
): ReturnType<AlgorithmStepGenerator> {
  const generator = getSortingAlgorithmGenerator(algorithmId);

  if (!generator) {
    console.warn(`No generator found for algorithm: ${algorithmId}`);
    return [];
  }

  return generator(array);
}

/**
 * Checks if a sorting algorithm has a step generator
 */
export function hasSortingAlgorithmGenerator(algorithmId: string): boolean {
  return algorithmId in sortingAlgorithmRegistry;
}

/**
 * Gets all available sorting algorithm IDs
 */
export function getAvailableSortingAlgorithms(): string[] {
  return Object.keys(sortingAlgorithmRegistry);
}
