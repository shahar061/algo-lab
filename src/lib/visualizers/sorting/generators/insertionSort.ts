import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Insertion Sort algorithm
 */
export function generateInsertionSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  steps.push({
    values: [...arr],
    sortedIndices: [0],
    description: "Initial array - first element is trivially sorted",
  });

  for (let i = 1; i < n; i++) {
    const key = arr[i]!;
    let j = i - 1;

    steps.push({
      values: [...arr],
      comparingIndices: [i, j],
      sortedIndices: Array.from({ length: i }, (_, k) => k),
      description: `Inserting ${key} into sorted portion`,
    });

    // Move elements greater than key one position ahead
    while (j >= 0 && arr[j]! > key) {
      steps.push({
        values: [...arr],
        comparingIndices: [j + 1, j],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `${arr[j]} > ${key}, shifting right`,
      });

      arr[j + 1] = arr[j]!;
      j--;

      steps.push({
        values: [...arr],
        swappedIndices: [j + 1, j + 2],
        sortedIndices: Array.from({ length: i }, (_, k) => k),
        description: `Shifted ${arr[j + 1]} to position ${j + 2}`,
      });
    }

    // Insert key at correct position
    arr[j + 1] = key;

    steps.push({
      values: [...arr],
      sortedIndices: Array.from({ length: i + 1 }, (_, k) => k),
      description: `Inserted ${key} at position ${j + 1}`,
    });
  }

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}
