import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Selection Sort algorithm
 */
export function generateSelectionSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  steps.push({
    values: [...arr],
    description: "Initial array - starting selection sort",
  });

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;

    steps.push({
      values: [...arr],
      comparingIndices: [i, minIdx],
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      description: `Finding minimum in unsorted portion (from index ${i})`,
    });

    // Find the minimum element in unsorted portion
    for (let j = i + 1; j < n; j++) {
      steps.push({
        values: [...arr],
        comparingIndices: [minIdx, j],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `Comparing ${arr[minIdx]} with ${arr[j]}`,
      });

      if (arr[j]! < arr[minIdx]!) {
        minIdx = j;
        steps.push({
          values: [...arr],
          comparingIndices: [minIdx, j],
          sortedIndices: Array.from({ length: i }, (_, k) => k),
          description: `New minimum found: ${arr[minIdx]} at index ${minIdx}`,
        });
      }
    }

    // Swap the found minimum element with the first element
    if (minIdx !== i) {
      steps.push({
        values: [...arr],
        comparingIndices: [i, minIdx],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `Swapping ${arr[i]} with minimum ${arr[minIdx]}`,
      });

      [arr[i], arr[minIdx]] = [arr[minIdx]!, arr[i]!];

      steps.push({
        values: [...arr],
        swappedIndices: [i, minIdx],
        sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        description: `Swapped - ${arr[i]} is now in position ${i}`,
      });
    } else {
      steps.push({
        values: [...arr],
        sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
        description: `${arr[i]} is already in correct position`,
      });
    }
  }

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}
