import type { ComplexityReferenceSeed } from './types';

export const complexityReferences: ComplexityReferenceSeed[] = [
  {
    notation: 'O(1)',
    name: 'Constant Time',
    description:
      'The runtime does not grow with input size — the same number of operations executes regardless of how large the input is. Typical of array index access, hash map lookups, or push/pop on a stack.',
    example: 'Accessing arr[i] in an array, or reading a value from a hash map by key.',
    order: 1,
  },
  {
    notation: 'O(log n)',
    name: 'Logarithmic Time',
    description:
      'The runtime grows proportionally to the logarithm of the input size, because each step eliminates a large fraction (usually half) of the remaining input.',
    example: 'Binary search on a sorted array, or insertion into a balanced binary search tree.',
    order: 2,
  },
  {
    notation: 'O(n)',
    name: 'Linear Time',
    description:
      'The runtime grows directly in proportion to the input size — every element is typically visited once.',
    example: 'Scanning an array to find its maximum value, or traversing a linked list.',
    order: 3,
  },
  {
    notation: 'O(n log n)',
    name: 'Linearithmic Time',
    description:
      'The runtime grows as the input size multiplied by its logarithm — the signature of efficient divide-and-conquer sorting and many "sort then scan" strategies.',
    example: 'Merge sort, heap sort, or sorting an array before a two-pointer pass.',
    order: 4,
  },
  {
    notation: 'O(n²)',
    name: 'Quadratic Time',
    description:
      'The runtime grows with the square of the input size, typically from a nested loop where each element is compared against every other element.',
    example: 'Bubble sort, insertion sort, or a brute-force pair-sum search with two nested loops.',
    order: 5,
  },
  {
    notation: 'O(n³)',
    name: 'Cubic Time',
    description:
      'The runtime grows with the cube of the input size, usually from three nested loops over the input.',
    example: 'Naive matrix multiplication, or the Floyd–Warshall all-pairs shortest path algorithm.',
    order: 6,
  },
  {
    notation: 'O(2ⁿ)',
    name: 'Exponential Time',
    description:
      'The runtime doubles with every additional input element — feasible only for small n. Common in brute-force recursive solutions that explore every subset.',
    example: 'Generating every subset of a set, or a naive recursive Fibonacci without memoization.',
    order: 7,
  },
  {
    notation: 'O(n!)',
    name: 'Factorial Time',
    description:
      'The runtime grows with the factorial of the input size — the cost of exploring every possible ordering. Only tractable for very small n.',
    example: 'Brute-force generation of every permutation, or a naive solution to the traveling salesman problem.',
    order: 8,
  },
];
