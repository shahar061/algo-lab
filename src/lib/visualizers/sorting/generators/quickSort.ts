import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Quick Sort algorithm
 */
export function generateQuickSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];

  steps.push({
    values: [...arr],
    description: "Initial array - starting quick sort",
  });

  quickSortHelper(arr, 0, arr.length - 1, steps);

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}

function quickSortHelper(
  arr: number[],
  low: number,
  high: number,
  steps: SortStep[],
): void {
  if (low < high) {
    steps.push({
      values: [...arr],
      activeRange: [low, high],
      description: `Sorting subarray from index ${low} to ${high}`,
    });

    const pivotIdx = partition(arr, low, high, steps);

    // Recursively sort left and right subarrays
    quickSortHelper(arr, low, pivotIdx - 1, steps);
    quickSortHelper(arr, pivotIdx + 1, high, steps);
  } else if (low === high) {
    steps.push({
      values: [...arr],
      activeRange: [low, high],
      description: `Single element at index ${low} - trivially sorted`,
    });
  }
}

function partition(
  arr: number[],
  low: number,
  high: number,
  steps: SortStep[],
): number {
  const pivot = arr[high]!;
  let i = low - 1;

  steps.push({
    values: [...arr],
    pivotIndex: high,
    activeRange: [low, high],
    description: `Pivot selected: ${pivot} at index ${high}`,
  });

  for (let j = low; j < high; j++) {
    steps.push({
      values: [...arr],
      comparingIndices: [j, high],
      pivotIndex: high,
      activeRange: [low, high],
      description: `Comparing ${arr[j]} with pivot ${pivot}`,
    });

    if (arr[j]! < pivot) {
      i++;

      if (i !== j) {
        steps.push({
          values: [...arr],
          comparingIndices: [i, j],
          pivotIndex: high,
          activeRange: [low, high],
          description: `${arr[j]} < ${pivot}, swapping with ${arr[i]}`,
        });

        [arr[i], arr[j]] = [arr[j]!, arr[i]!];

        steps.push({
          values: [...arr],
          swappedIndices: [i, j],
          pivotIndex: high,
          activeRange: [low, high],
          description: `Swapped ${arr[i]} and ${arr[j]}`,
        });
      }
    }
  }

  // Place pivot in correct position
  const pivotPos = i + 1;
  if (pivotPos !== high) {
    steps.push({
      values: [...arr],
      comparingIndices: [pivotPos, high],
      pivotIndex: high,
      activeRange: [low, high],
      description: `Placing pivot ${pivot} in position ${pivotPos}`,
    });

    [arr[pivotPos], arr[high]] = [arr[high]!, arr[pivotPos]!];

    steps.push({
      values: [...arr],
      swappedIndices: [pivotPos, high],
      pivotIndex: pivotPos,
      activeRange: [low, high],
      description: `Pivot ${pivot} is now at position ${pivotPos}`,
    });
  } else {
    steps.push({
      values: [...arr],
      pivotIndex: pivotPos,
      activeRange: [low, high],
      description: `Pivot ${pivot} already in correct position ${pivotPos}`,
    });
  }

  return pivotPos;
}
