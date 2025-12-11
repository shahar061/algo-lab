import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Merge Sort algorithm
 */
export function generateMergeSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];

  steps.push({
    values: [...arr],
    description: "Initial array - starting merge sort",
  });

  mergeSortHelper(arr, 0, arr.length - 1, steps);

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}

function mergeSortHelper(
  arr: number[],
  left: number,
  right: number,
  steps: SortStep[],
): void {
  if (left < right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      values: [...arr],
      activeRange: [left, right],
      description: `Dividing array: [${left}..${mid}] and [${mid + 1}..${right}]`,
    });

    // Sort first and second halves
    mergeSortHelper(arr, left, mid, steps);
    mergeSortHelper(arr, mid + 1, right, steps);

    // Merge the sorted halves
    merge(arr, left, mid, right, steps);
  } else if (left === right) {
    steps.push({
      values: [...arr],
      activeRange: [left, right],
      description: `Base case: single element at index ${left}`,
    });
  }
}

function merge(
  arr: number[],
  left: number,
  mid: number,
  right: number,
  steps: SortStep[],
): void {
  const leftArr = arr.slice(left, mid + 1);
  const rightArr = arr.slice(mid + 1, right + 1);

  steps.push({
    values: [...arr],
    activeRange: [left, right],
    description: `Merging [${left}..${mid}] and [${mid + 1}..${right}]`,
  });

  let i = 0;
  let j = 0;
  let k = left;

  while (i < leftArr.length && j < rightArr.length) {
    const leftVal = leftArr[i]!;
    const rightVal = rightArr[j]!;

    steps.push({
      values: [...arr],
      comparingIndices: [left + i, mid + 1 + j],
      activeRange: [left, right],
      description: `Comparing ${leftVal} and ${rightVal}`,
    });

    if (leftVal <= rightVal) {
      arr[k] = leftVal;
      i++;
      steps.push({
        values: [...arr],
        activeRange: [left, right],
        description: `Placed ${leftVal} at position ${k}`,
      });
    } else {
      arr[k] = rightVal;
      j++;
      steps.push({
        values: [...arr],
        activeRange: [left, right],
        description: `Placed ${rightVal} at position ${k}`,
      });
    }
    k++;
  }

  // Copy remaining elements from left array
  while (i < leftArr.length) {
    arr[k] = leftArr[i]!;
    steps.push({
      values: [...arr],
      activeRange: [left, right],
      description: `Placed remaining ${leftArr[i]} at position ${k}`,
    });
    i++;
    k++;
  }

  // Copy remaining elements from right array
  while (j < rightArr.length) {
    arr[k] = rightArr[j]!;
    steps.push({
      values: [...arr],
      activeRange: [left, right],
      description: `Placed remaining ${rightArr[j]} at position ${k}`,
    });
    j++;
    k++;
  }

  steps.push({
    values: [...arr],
    activeRange: [left, right],
    description: `Merged subarray [${left}..${right}] complete`,
  });
}
