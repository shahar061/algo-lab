import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Heap Sort algorithm
 */
export function generateHeapSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];
  const n = arr.length;

  steps.push({
    values: [...arr],
    description: "Initial array - starting heap sort",
  });

  // Build max heap
  steps.push({
    values: [...arr],
    description: "Building max heap...",
  });

  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i, steps);
  }

  steps.push({
    values: [...arr],
    description: "Max heap built - largest element at root",
  });

  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    steps.push({
      values: [...arr],
      comparingIndices: [0, i],
      description: `Swapping root ${arr[0]} with last element ${arr[i]}`,
    });

    // Move current root to end
    [arr[0], arr[i]] = [arr[i]!, arr[0]!];

    steps.push({
      values: [...arr],
      swappedIndices: [0, i],
      sortedIndices: Array.from({ length: n - i }, (_, k) => n - 1 - k),
      description: `${arr[i]} placed in final position`,
    });

    // Heapify the reduced heap
    heapify(
      arr,
      i,
      0,
      steps,
      Array.from({ length: n - i }, (_, k) => n - 1 - k),
    );
  }

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: n }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}

function heapify(
  arr: number[],
  n: number,
  i: number,
  steps: SortStep[],
  sortedIndices: number[] = [],
): void {
  let largest = i;
  const left = 2 * i + 1;
  const right = 2 * i + 2;

  steps.push({
    values: [...arr],
    activeRange: [i, Math.min(right, n - 1)],
    sortedIndices,
    description: `Heapifying subtree rooted at index ${i}`,
  });

  // Check if left child exists and is greater than root
  if (left < n) {
    steps.push({
      values: [...arr],
      comparingIndices: [left, largest],
      sortedIndices,
      description: `Comparing left child ${arr[left]} with ${arr[largest]}`,
    });

    if (arr[left]! > arr[largest]!) {
      largest = left;
    }
  }

  // Check if right child exists and is greater than largest so far
  if (right < n) {
    steps.push({
      values: [...arr],
      comparingIndices: [right, largest],
      sortedIndices,
      description: `Comparing right child ${arr[right]} with ${arr[largest]}`,
    });

    if (arr[right]! > arr[largest]!) {
      largest = right;
    }
  }

  // If largest is not root, swap and continue heapifying
  if (largest !== i) {
    steps.push({
      values: [...arr],
      comparingIndices: [i, largest],
      sortedIndices,
      description: `Swapping ${arr[i]} with ${arr[largest]}`,
    });

    [arr[i], arr[largest]] = [arr[largest]!, arr[i]!];

    steps.push({
      values: [...arr],
      swappedIndices: [i, largest],
      sortedIndices,
      description: `Swapped - continuing heapify at ${largest}`,
    });

    heapify(arr, n, largest, steps, sortedIndices);
  }
}
