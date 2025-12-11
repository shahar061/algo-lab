import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Bubble Sort algorithm
 */
export function generateBubbleSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  steps.push({
    values: [...arr],
    description: "Initial array - starting bubble sort",
  });

  for (let i = 0; i < n; i++) {
    let swapped = false;

    for (let j = 0; j < n - i - 1; j++) {
      // Compare adjacent elements
      steps.push({
        values: [...arr],
        comparingIndices: [j, j + 1],
        sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
        description: `Comparing ${arr[j]} and ${arr[j + 1]}`,
      });

      if (arr[j]! > arr[j + 1]!) {
        // Swap elements
        [arr[j], arr[j + 1]] = [arr[j + 1]!, arr[j]!];
        swapped = true;

        steps.push({
          values: [...arr],
          swappedIndices: [j, j + 1],
          sortedIndices: Array.from({ length: i }, (_, k) => n - 1 - k),
          description: `Swapped ${arr[j]} and ${arr[j + 1]}`,
        });
      }
    }

    // Mark the last element of this pass as sorted
    steps.push({
      values: [...arr],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => n - 1 - k),
      description: `Pass ${i + 1} complete - ${arr[n - 1 - i]} is in final position`,
    });

    // Early exit if no swaps occurred
    if (!swapped) {
      steps.push({
        values: [...arr],
        sortedIndices: Array.from({ length: n }, (_, k) => k),
        description: "No swaps needed - array is sorted!",
      });
      break;
    }
  }

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}
