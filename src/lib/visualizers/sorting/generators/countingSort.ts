import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Counting Sort algorithm
 * Note: This visualization is simplified as counting sort doesn't compare elements
 */
export function generateCountingSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];

  if (arr.length === 0) {
    return steps;
  }

  steps.push({
    values: [...arr],
    description: "Initial array - starting counting sort",
  });

  // Find the range
  const maxVal = Math.max(...arr);
  const minVal = Math.min(...arr);
  const range = maxVal - minVal + 1;

  steps.push({
    values: [...arr],
    description: `Range: ${minVal} to ${maxVal} (${range} values)`,
  });

  // Create count array
  const count = Array(range).fill(0);

  // Store count of each element
  for (let i = 0; i < arr.length; i++) {
    count[arr[i]! - minVal]++;
    steps.push({
      values: [...arr],
      comparingIndices: [i, i],
      description: `Counting ${arr[i]} (appears ${count[arr[i]! - minVal]} times)`,
    });
  }

  steps.push({
    values: [...arr],
    description: "Counting complete - building sorted array...",
  });

  // Calculate cumulative count
  for (let i = 1; i < range; i++) {
    count[i] += count[i - 1]!;
  }

  // Build output array
  const output = Array(arr.length).fill(0);
  for (let i = arr.length - 1; i >= 0; i--) {
    const value = arr[i]!;
    const pos = count[value - minVal]! - 1;
    output[pos] = value;
    count[value - minVal]--;

    // Update original array to show progress
    for (let j = 0; j <= pos; j++) {
      if (output[j] !== 0) {
        arr[j] = output[j]!;
      }
    }

    steps.push({
      values: [...arr],
      sortedIndices: Array.from({ length: pos + 1 }, (_, k) => k),
      description: `Placing ${value} at position ${pos}`,
    });
  }

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}
