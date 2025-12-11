/**
 * Common types for algorithm visualization
 */

/**
 * Represents a single step in a sorting algorithm execution
 */
export interface SortStep {
  /** The state of the array at this step */
  values: number[];
  /** Indices being compared (if applicable) */
  comparingIndices?: [number, number] | null;
  /** Indices that were just swapped (if applicable) */
  swappedIndices?: [number, number] | null;
  /** Indices that are sorted/finalized (for visual indication) */
  sortedIndices?: number[];
  /** Active range being worked on (useful for divide-and-conquer algorithms) */
  activeRange?: [number, number];
  /** Pivot index (for quick sort) */
  pivotIndex?: number;
  /** Human-readable description of this step */
  description?: string;
}

/**
 * Function type for generating algorithm steps
 */
export type AlgorithmStepGenerator = (array: number[]) => SortStep[];

/**
 * Array generation preset types
 */
export type ArrayPreset =
  | "random"
  | "nearly-sorted"
  | "reversed"
  | "few-unique"
  | "all-equal";
