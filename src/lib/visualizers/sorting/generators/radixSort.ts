import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Radix Sort algorithm
 */
export function generateRadixSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];

  if (arr.length === 0) {
    return steps;
  }

  steps.push({
    values: [...arr],
    description: "Initial array - starting radix sort",
  });

  // Find the maximum number to know number of digits
  const maxNum = Math.max(...arr);
  let digitPlace = 1;

  steps.push({
    values: [...arr],
    description: `Maximum value: ${maxNum}`,
  });

  // Do counting sort for every digit
  let digitCount = 1;
  while (Math.floor(maxNum / digitPlace) > 0) {
    steps.push({
      values: [...arr],
      description: `Sorting by digit at place ${digitPlace} (digit #${digitCount})`,
    });

    countingSortByDigit(arr, digitPlace, steps);

    steps.push({
      values: [...arr],
      description: `Sorted by digit #${digitCount}`,
    });

    digitPlace *= 10;
    digitCount++;
  }

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}

function countingSortByDigit(
  arr: number[],
  exp: number,
  steps: SortStep[],
): void {
  const n = arr.length;
  const output = Array(n).fill(0);
  const count = Array(10).fill(0);

  // Store count of occurrences
  for (let i = 0; i < n; i++) {
    const digit = Math.floor(arr[i]! / exp) % 10;
    count[digit]++;
  }

  // Calculate cumulative count
  for (let i = 1; i < 10; i++) {
    count[i] += count[i - 1]!;
  }

  // Build output array
  for (let i = n - 1; i >= 0; i--) {
    const digit = Math.floor(arr[i]! / exp) % 10;
    const pos = count[digit]! - 1;
    output[pos] = arr[i]!;
    count[digit]--;

    steps.push({
      values: [...arr],
      comparingIndices: [i, i],
      description: `Placing ${arr[i]} (digit ${digit}) at position ${pos}`,
    });
  }

  // Copy output array to arr
  for (let i = 0; i < n; i++) {
    arr[i] = output[i] as number;
  }

  steps.push({
    values: [...arr],
    description: `Array after sorting by current digit`,
  });
}
