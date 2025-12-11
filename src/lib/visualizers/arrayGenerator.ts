import type { ArrayPreset } from "./types";

/**
 * Generates an array based on the specified preset
 */
export function generateArray(
  size: number,
  preset: ArrayPreset = "random",
  min: number = 1,
  max: number = 100,
): number[] {
  switch (preset) {
    case "random":
      return generateRandomArray(size, min, max);
    case "nearly-sorted":
      return generateNearlySortedArray(size, min, max);
    case "reversed":
      return generateReversedArray(size, min, max);
    case "few-unique":
      return generateFewUniqueArray(size, min, max);
    case "all-equal":
      return generateAllEqualArray(size, min, max);
    default:
      return generateRandomArray(size, min, max);
  }
}

/**
 * Generates a random array of numbers
 */
function generateRandomArray(size: number, min: number, max: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return arr;
}

/**
 * Generates an array that is mostly sorted with a few out-of-place elements
 */
function generateNearlySortedArray(
  size: number,
  min: number,
  max: number,
): number[] {
  // Create a sorted array
  const arr = Array.from({ length: size }, (_, i) =>
    Math.floor(min + (i * (max - min)) / (size - 1)),
  );

  // Swap 10-20% of elements
  const swapCount = Math.max(1, Math.floor(size * 0.15));
  for (let i = 0; i < swapCount; i++) {
    const idx1 = Math.floor(Math.random() * size);
    const idx2 = Math.floor(Math.random() * size);
    [arr[idx1], arr[idx2]] = [arr[idx2]!, arr[idx1]!];
  }

  return arr;
}

/**
 * Generates a reversed (descending) array
 */
function generateReversedArray(
  size: number,
  min: number,
  max: number,
): number[] {
  return Array.from({ length: size }, (_, i) =>
    Math.floor(max - (i * (max - min)) / (size - 1)),
  );
}

/**
 * Generates an array with only a few unique values
 */
function generateFewUniqueArray(
  size: number,
  min: number,
  max: number,
): number[] {
  const uniqueCount = Math.max(3, Math.floor(size / 3));
  const uniqueValues: number[] = [];

  for (let i = 0; i < uniqueCount; i++) {
    uniqueValues.push(Math.floor(Math.random() * (max - min + 1)) + min);
  }

  const arr: number[] = [];
  for (let i = 0; i < size; i++) {
    arr.push(uniqueValues[Math.floor(Math.random() * uniqueValues.length)]!);
  }

  return arr;
}

/**
 * Generates an array where all elements are equal
 */
function generateAllEqualArray(
  size: number,
  min: number,
  max: number,
): number[] {
  const value = Math.floor((min + max) / 2);
  return Array(size).fill(value);
}
