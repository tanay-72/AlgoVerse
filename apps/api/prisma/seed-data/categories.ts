import type { CategorySeed } from './types';

export const categories: CategorySeed[] = [
  {
    slug: 'arrays',
    name: 'Arrays',
    description:
      'Contiguous, index-addressable collections that form the foundation of nearly every other data structure and algorithm.',
    icon: 'rows-3',
    order: 1,
  },
  {
    slug: 'strings',
    name: 'Strings',
    description:
      'Sequences of characters and the pattern-matching, windowing, and hashing techniques used to manipulate them efficiently.',
    icon: 'case-sensitive',
    order: 2,
  },
  {
    slug: 'sorting',
    name: 'Sorting',
    description:
      'Algorithms that arrange data into a defined order, trading off time complexity, space, and stability.',
    icon: 'arrow-down-up',
    order: 3,
  },
  {
    slug: 'searching',
    name: 'Searching',
    description:
      'Techniques for locating a target value or condition within a data set as efficiently as possible.',
    icon: 'search',
    order: 4,
  },
  {
    slug: 'binary-search',
    name: 'Binary Search',
    description:
      'A divide-and-conquer search technique that halves the search space on every step over sorted or monotonic data.',
    icon: 'git-compare-arrows',
    order: 5,
  },
  {
    slug: 'two-pointers',
    name: 'Two Pointers',
    description:
      'Using two indices that move independently through a structure to avoid nested loops and reduce complexity.',
    icon: 'move-horizontal',
    order: 6,
  },
  {
    slug: 'sliding-window',
    name: 'Sliding Window',
    description:
      'Maintaining a contiguous window over a sequence that expands and contracts to solve subarray/substring problems in linear time.',
    icon: 'scan-line',
    order: 7,
  },
  {
    slug: 'stack',
    name: 'Stack',
    description:
      'A LIFO structure central to expression evaluation, backtracking, and parsing nested or matched structures.',
    icon: 'layers',
    order: 8,
  },
  {
    slug: 'queue',
    name: 'Queue',
    description:
      'A FIFO structure used for order-preserving processing, level-order traversal, and buffering.',
    icon: 'list-ordered',
    order: 9,
  },
  {
    slug: 'linked-list',
    name: 'Linked List',
    description:
      'A chain of nodes linked by pointers, enabling O(1) insertion/removal at known positions without shifting memory.',
    icon: 'link-2',
    order: 10,
  },
  {
    slug: 'hashing',
    name: 'Hashing',
    description:
      'Mapping keys to array indices via hash functions for average O(1) lookup, insertion, and deletion.',
    icon: 'hash',
    order: 11,
  },
  {
    slug: 'trees',
    name: 'Trees',
    description:
      'Hierarchical, node-based structures used to model recursive relationships, from file systems to parsers.',
    icon: 'git-branch',
    order: 12,
  },
  {
    slug: 'bst',
    name: 'BST',
    description:
      'Binary Search Trees keep elements ordered so search, insertion, and deletion run in O(log n) on average.',
    icon: 'network',
    order: 13,
  },
  {
    slug: 'heap',
    name: 'Heap',
    description:
      'A complete binary tree structure that gives O(1) access and O(log n) updates to the minimum or maximum element.',
    icon: 'triangle',
    order: 14,
  },
  {
    slug: 'trie',
    name: 'Trie',
    description:
      'A prefix tree specialized for fast string insertion, lookup, and prefix queries over a set of words.',
    icon: 'folder-tree',
    order: 15,
  },
  {
    slug: 'graphs',
    name: 'Graphs',
    description:
      'Vertices connected by edges, modelling networks, dependencies, and relationships beyond a strict hierarchy.',
    icon: 'waypoints',
    order: 16,
  },
  {
    slug: 'shortest-path',
    name: 'Shortest Path',
    description:
      'Algorithms that compute minimum-cost paths through weighted or unweighted graphs.',
    icon: 'route',
    order: 17,
  },
  {
    slug: 'topological-sort',
    name: 'Topological Sort',
    description:
      'Linear orderings of a directed acyclic graph that respect every dependency edge — the backbone of build systems and schedulers.',
    icon: 'list-tree',
    order: 18,
  },
  {
    slug: 'union-find',
    name: 'Union Find',
    description:
      'The Disjoint Set Union structure that tracks connectivity between elements with near-constant-time merges and queries.',
    icon: 'shapes',
    order: 19,
  },
  {
    slug: 'greedy',
    name: 'Greedy',
    description:
      'Algorithms that make the locally optimal choice at each step, provably reaching a global optimum for certain problem structures.',
    icon: 'target',
    order: 20,
  },
  {
    slug: 'dynamic-programming',
    name: 'Dynamic Programming',
    description:
      'Breaking a problem into overlapping subproblems and caching their results to avoid exponential recomputation.',
    icon: 'grid-3x3',
    order: 21,
  },
  {
    slug: 'backtracking',
    name: 'Backtracking',
    description:
      'Systematic trial-and-error search that builds candidates incrementally and abandons ones that violate constraints.',
    icon: 'git-fork',
    order: 22,
  },
  {
    slug: 'bit-manipulation',
    name: 'Bit Manipulation',
    description:
      'Working directly on the binary representation of numbers for compact state, fast arithmetic, and clever tricks.',
    icon: 'binary',
    order: 23,
  },
  {
    slug: 'segment-tree',
    name: 'Segment Tree',
    description:
      'A binary tree over an array that answers range queries and supports range updates in O(log n).',
    icon: 'square-stack',
    order: 24,
  },
  {
    slug: 'fenwick-tree',
    name: 'Fenwick Tree',
    description:
      'The Binary Indexed Tree — a compact structure for prefix-sum queries and point updates in O(log n).',
    icon: 'bar-chart-3',
    order: 25,
  },
  {
    slug: 'sparse-table',
    name: 'Sparse Table',
    description:
      'A precomputed structure that answers idempotent range queries, like range minimum, in O(1) after O(n log n) preprocessing.',
    icon: 'table-2',
    order: 26,
  },
  {
    slug: 'math',
    name: 'Math',
    description:
      'Core mathematical algorithms — GCD, LCM, modular arithmetic, and combinatorics — that underpin competitive programming.',
    icon: 'sigma',
    order: 27,
  },
  {
    slug: 'number-theory',
    name: 'Number Theory',
    description:
      'Algorithms about the properties of integers: primality, factorization, and prime generation.',
    icon: 'divide',
    order: 28,
  },
];
