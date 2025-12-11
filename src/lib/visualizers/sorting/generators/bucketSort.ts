import type { SortStep } from "../../types";

/**
 * Generates visualization steps for Bucket Sort algorithm
 * Simplified for integer arrays - uses range-based buckets
 */
export function generateBucketSortSteps(initialArray: number[]): SortStep[] {
  const steps: SortStep[] = [];
  const arr = [...initialArray];

  if (arr.length === 0) {
    return steps;
  }

  steps.push({
    values: [...arr],
    description: "Initial array - starting bucket sort",
  });

  // Find min and max for bucket distribution
  const minVal = Math.min(...arr);
  const maxVal = Math.max(...arr);
  const bucketCount = Math.min(10, arr.length);
  const bucketRange = (maxVal - minVal + 1) / bucketCount;

  steps.push({
    values: [...arr],
    description: `Creating ${bucketCount} buckets with range ~${Math.ceil(bucketRange)}`,
  });

  // Create buckets
  const buckets: number[][] = Array.from({ length: bucketCount }, () => []);

  // Distribute elements into buckets
  for (let i = 0; i < arr.length; i++) {
    const bucketIdx = Math.min(
      Math.floor((arr[i]! - minVal) / bucketRange),
      bucketCount - 1,
    );
    buckets[bucketIdx]!.push(arr[i]!);

    steps.push({
      values: [...arr],
      comparingIndices: [i, i],
      description: `Placing ${arr[i]} into bucket ${bucketIdx}`,
    });
  }

  // Sort each bucket and concatenate
  let position = 0;
  for (let i = 0; i < bucketCount; i++) {
    if (buckets[i]!.length > 0) {
      steps.push({
        values: [...arr],
        description: `Sorting bucket ${i} with ${buckets[i]!.length} elements`,
      });

      // Sort bucket using insertion sort
      buckets[i]!.sort((a, b) => a - b);

      // Place sorted bucket elements back
      for (const value of buckets[i]!) {
        arr[position] = value;
        steps.push({
          values: [...arr],
          sortedIndices: Array.from({ length: position + 1 }, (_, k) => k),
          description: `Placing ${value} from bucket ${i} at position ${position}`,
        });
        position++;
      }
    }
  }

  steps.push({
    values: [...arr],
    sortedIndices: Array.from({ length: arr.length }, (_, k) => k),
    description: "✓ Sorting complete!",
  });

  return steps;
}
