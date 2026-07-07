import type { AlgorithmSeed } from './types';

export const algorithmsBatch4: AlgorithmSeed[] = [
  {
    slug: 'knapsack-01',
    name: '0/1 Knapsack Problem',
    categorySlug: 'dynamic-programming',
    difficulty: 'MEDIUM',
    summary:
      'Maximizes the total value of items packed into a weight-limited knapsack, where each item is either fully taken or left behind.',
    introduction:
      'The 0/1 Knapsack Problem is the archetypal introduction to dynamic programming over two dimensions: item index and remaining capacity. It demonstrates how overlapping subproblems in a combinatorial choice problem can be solved bottom-up instead of exponentially enumerating every subset.',
    problemStatement:
      'Given n items, each with a weight and a value, and a knapsack with a maximum weight capacity W, determine the maximum total value achievable by selecting a subset of items whose total weight does not exceed W. Each item can be taken at most once (hence "0/1").',
    intuition:
      'For each item, there are exactly two choices: exclude it (the best value is whatever was achievable with the remaining items at the same capacity), or include it (the best value is the item\'s value plus the best achievable with the remaining items at the reduced capacity). Defining dp[i][w] as the best value using the first i items with capacity w turns this into a simple recurrence that can be filled bottom-up, since dp[i][w] only depends on values already computed for i-1.',
    stepByStep: [
      'Create a 2D table dp[n+1][W+1], initialized to 0 (0 items or 0 capacity means 0 value).',
      'For each item i from 1 to n, and each capacity w from 0 to W:',
      'If the item\'s weight exceeds w, it cannot be included: dp[i][w] = dp[i-1][w].',
      'Otherwise, dp[i][w] = max(dp[i-1][w], value[i] + dp[i-1][w - weight[i]]) — the better of excluding or including the item.',
      'dp[n][W] holds the answer: the maximum achievable value.',
    ],
    dryRun:
      'Items: (weight,value) = (1,1), (3,4), (4,5), (5,7). Capacity W=7\ndp[0][*] = 0 for all capacities\nItem 1 (w=1,v=1): dp[1][w] = 1 for all w>=1\nItem 2 (w=3,v=4): dp[2][3] = max(dp[1][3]=1, 4+dp[1][0]=4) = 4; dp[2][7] = max(dp[1][7]=1, 4+dp[1][4]=5) = 5\nItem 3 (w=4,v=5): dp[3][7] = max(dp[2][7]=5, 5+dp[2][3]=9) = 9\nItem 4 (w=5,v=7): dp[4][7] = max(dp[3][7]=9, 7+dp[3][2]=7+1=8) = 9\nResult: 9 (using items with weight 3 and 4, total weight 7, total value 9)',
    timeComplexityBest: 'O(n·W)',
    timeComplexityAverage: 'O(n·W)',
    timeComplexityWorst: 'O(n·W)',
    spaceComplexity: 'O(n·W), reducible to O(W)',
    advantages: [
      'Turns an exponential 2ⁿ subset-search problem into a pseudo-polynomial O(n·W) one.',
      'The 1D space-optimized version (iterating capacity in reverse) needs only O(W) memory.',
      'The table-filling structure makes it straightforward to also reconstruct which items were chosen.',
    ],
    disadvantages: [
      "Pseudo-polynomial time: the W factor means very large capacities make this approach impractical, even though it's efficient for small-to-moderate W.",
      'Does not generalize directly to the fractional knapsack variant, which is instead solved optimally by a much simpler greedy algorithm.',
    ],
    applications: [
      'Budget-constrained resource allocation (selecting the most valuable combination of investments/projects within a budget).',
      'Cargo loading and shipping container packing.',
      'A foundational subproblem pattern reused in subset-sum, partition, and target-sum problems.',
    ],
    commonMistakes: [
      'Iterating the capacity loop forward instead of backward when space-optimizing to a 1D array, which allows an item to be counted more than once (turning it into the unbounded knapsack variant by accident).',
      'Forgetting the base case dp[0][w] = 0, which represents having no items available.',
      'Confusing 0/1 knapsack (each item used at most once) with the unbounded knapsack (unlimited copies of each item).',
    ],
    visualizationNotes:
      'A visualization would render the 2D dp table as a grid, highlighting the two candidate cells (exclude vs include) being compared at each step and animating the winning value flowing into the current cell.',
    tags: ['dynamic-programming', 'knapsack', 'optimization'],
    cppCode: `#include <vector>
#include <algorithm>
using namespace std;

int knapsack01(int capacity, const vector<int>& weights, const vector<int>& values) {
    int n = (int)weights.size();
    vector<int> dp(capacity + 1, 0);

    for (int i = 0; i < n; ++i) {
        for (int w = capacity; w >= weights[i]; --w) {
            dp[w] = max(dp[w], values[i] + dp[w - weights[i]]);
        }
    }

    return dp[capacity];
}`,
    pythonCode: `def knapsack_01(capacity: int, weights: list[int], values: list[int]) -> int:
    dp = [0] * (capacity + 1)

    for weight, value in zip(weights, values):
        for w in range(capacity, weight - 1, -1):
            dp[w] = max(dp[w], value + dp[w - weight])

    return dp[capacity]`,
    practiceProblems: [
      {
        title: 'Partition Equal Subset Sum',
        url: 'https://leetcode.com/problems/partition-equal-subset-sum/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Target Sum',
        url: 'https://leetcode.com/problems/target-sum/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Last Stone Weight II',
        url: 'https://leetcode.com/problems/last-stone-weight-ii/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'Dynamic programming problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=dp',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
      { platform: 'LEETCODE', label: 'Dynamic programming problems', url: 'https://leetcode.com/tag/dynamic-programming/' },
    ],
    relatedSlugs: ['longest-common-subsequence', 'fibonacci-dynamic-programming'],
  },
  {
    slug: 'longest-common-subsequence',
    name: 'Longest Common Subsequence (LCS)',
    categorySlug: 'dynamic-programming',
    difficulty: 'MEDIUM',
    summary:
      'Finds the length of the longest sequence that appears, in order but not necessarily contiguously, in both of two given strings.',
    introduction:
      'LCS is one of the most widely applied dynamic programming problems, forming the theoretical basis for tools like the Unix `diff` command and DNA sequence alignment. It illustrates the classic 2D DP pattern of building a solution from smaller prefixes of two sequences.',
    problemStatement:
      'Given two strings, find the length of their longest common subsequence — a sequence of characters that appears in both strings in the same relative order, but not necessarily contiguously.',
    intuition:
      "Comparing the last characters of two prefixes gives exactly two cases: if they match, that character is definitely part of the LCS, and the answer is 1 plus the LCS of both strings with that last character removed. If they don't match, the LCS must exclude the last character of at least one string, so the answer is the better of the two resulting subproblems. Defining dp[i][j] as the LCS length of the first i characters of string A and the first j characters of string B captures both cases in a clean recurrence.",
    stepByStep: [
      'Create a table dp[m+1][n+1] initialized to 0, where m and n are the lengths of the two strings.',
      'For i from 1 to m, and j from 1 to n:',
      'If A[i-1] equals B[j-1], set dp[i][j] = dp[i-1][j-1] + 1.',
      'Otherwise, set dp[i][j] = max(dp[i-1][j], dp[i][j-1]).',
      'dp[m][n] holds the length of the longest common subsequence.',
    ],
    dryRun:
      'A = "ABCBDAB", B = "BDCABA" (shortened example: A="ABC", B="AC")\ndp table (rows=A, cols=B), 0-indexed with an extra row/col of 0s:\n      ""  A  C\n  ""   0  0  0\n  A    0  1  1\n  B    0  1  1\n  C    0  1  2\nA[0]=A matches B[0]=A -> dp[1][1]=dp[0][0]+1=1\nA[2]=C matches B[1]=C -> dp[3][2]=dp[2][1]+1=1+1=2\nResult: LCS length = 2 (subsequence "AC")',
    timeComplexityBest: 'O(m·n)',
    timeComplexityAverage: 'O(m·n)',
    timeComplexityWorst: 'O(m·n)',
    spaceComplexity: 'O(m·n), reducible to O(min(m,n))',
    advantages: [
      'Solves what would otherwise be an exponential subsequence-comparison problem in polynomial time.',
      'The DP table can be traced backward to reconstruct the actual common subsequence, not just its length.',
      'Space can be optimized to O(min(m, n)) since each row only depends on the previous row.',
    ],
    disadvantages: [
      'O(m·n) time and space becomes expensive for very long strings (e.g., whole-genome comparisons need specialized algorithms).',
      'The straightforward table only yields the length efficiently; reconstructing the actual subsequence requires either backtracking through the full table or extra bookkeeping.',
    ],
    applications: [
      "Version control diff tools showing minimal changes between file revisions.",
      'Bioinformatics — aligning DNA, RNA, or protein sequences.',
      'Plagiarism and similarity detection between documents or code files.',
      'The basis for computing edit distance and related string-alignment metrics.',
    ],
    commonMistakes: [
      'Confusing subsequence (order preserved, not necessarily contiguous) with substring (must be contiguous) — they require different algorithms.',
      'Off-by-one indexing errors between the 1-indexed dp table and the 0-indexed input strings.',
      'Forgetting the base case row/column of zeros representing an empty prefix of either string.',
    ],
    visualizationNotes:
      'A visualization would render the 2D dp grid with both strings labeling the rows and columns, highlighting diagonal moves (character match) versus horizontal/vertical moves (max of neighbors) as the table fills.',
    tags: ['dynamic-programming', 'string', 'sequence-alignment'],
    cppCode: `#include <string>
#include <vector>
#include <algorithm>
using namespace std;

int longestCommonSubsequence(const string& a, const string& b) {
    int m = (int)a.size();
    int n = (int)b.size();
    vector<vector<int>> dp(m + 1, vector<int>(n + 1, 0));

    for (int i = 1; i <= m; ++i) {
        for (int j = 1; j <= n; ++j) {
            if (a[i - 1] == b[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1] + 1;
            } else {
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1]);
            }
        }
    }

    return dp[m][n];
}`,
    pythonCode: `def longest_common_subsequence(a: str, b: str) -> int:
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]

    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i - 1] == b[j - 1]:
                dp[i][j] = dp[i - 1][j - 1] + 1
            else:
                dp[i][j] = max(dp[i - 1][j], dp[i][j - 1])

    return dp[m][n]`,
    practiceProblems: [
      {
        title: 'Longest Common Subsequence',
        url: 'https://leetcode.com/problems/longest-common-subsequence/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Edit Distance',
        url: 'https://leetcode.com/problems/edit-distance/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
      {
        title: 'Shortest Common Supersequence',
        url: 'https://leetcode.com/problems/shortest-common-supersequence/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'Dynamic programming problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=dp',
      },
      { platform: 'LEETCODE', label: 'Dynamic programming problems', url: 'https://leetcode.com/tag/dynamic-programming/' },
    ],
    relatedSlugs: ['knapsack-01', 'kadanes-algorithm'],
  },
  {
    slug: 'fibonacci-dynamic-programming',
    name: 'Fibonacci Sequence with Memoization',
    categorySlug: 'dynamic-programming',
    difficulty: 'EASY',
    summary:
      'Computes Fibonacci numbers efficiently by caching previously computed results, transforming exponential recursion into linear time.',
    introduction:
      'The naive recursive Fibonacci solution is the canonical example used to introduce dynamic programming, because it makes the cost of redundant recomputation glaringly obvious: fib(5) recomputes fib(3) and fib(2) many times over. Caching results — memoization — is often the very first optimization every programmer learns.',
    problemStatement:
      'Compute the n-th Fibonacci number, defined as fib(0) = 0, fib(1) = 1, and fib(n) = fib(n-1) + fib(n-2) for n >= 2.',
    intuition:
      "The naive recursive definition recomputes the same subproblems exponentially many times — fib(n) calls fib(n-1) and fib(n-2), each of which independently recomputes overlapping smaller values. Storing each computed fib(k) the first time it is calculated, and reusing that stored value on every subsequent request, means each distinct subproblem is solved exactly once.",
    stepByStep: [
      'Create a cache (array or hash map) to store computed Fibonacci values, initialized empty.',
      'Define fib(n): if n is 0 or 1, return n directly (base case).',
      'If fib(n) is already in the cache, return the cached value immediately.',
      'Otherwise compute fib(n) = fib(n-1) + fib(n-2), store it in the cache, and return it.',
      'Alternatively, iterate bottom-up from fib(0) and fib(1) upward, which avoids recursion entirely and only needs the last two values in memory.',
    ],
    dryRun:
      'Compute fib(5) with memoization:\nfib(5) -> needs fib(4), fib(3)\n  fib(4) -> needs fib(3), fib(2)\n    fib(3) -> needs fib(2), fib(1)\n      fib(2) -> needs fib(1)=1, fib(0)=0 -> fib(2)=1, cache[2]=1\n      fib(1)=1 (base case)\n    fib(3) = fib(2)+fib(1) = 1+1 = 2, cache[3]=2\n    fib(2) is cached -> return 1\n  fib(4) = fib(3)+fib(2) = 2+1 = 3, cache[4]=3\n  fib(3) is cached -> return 2\nfib(5) = fib(4)+fib(3) = 3+2 = 5\nResult: fib(5) = 5',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(n) memoized, O(1) with bottom-up iteration',
    advantages: [
      'Transforms the naive O(2ⁿ) exponential recursion into O(n) linear time.',
      'The bottom-up iterative variant needs only O(1) extra space, tracking just the last two values.',
      'The memoization pattern generalizes to virtually every DP problem with overlapping subproblems.',
    ],
    disadvantages: [
      'The recursive-with-memoization version still uses O(n) call-stack depth, unlike the iterative version.',
      'For extremely large n, even O(n) is too slow — matrix exponentiation solves Fibonacci in O(log n) instead.',
    ],
    applications: [
      'The simplest, clearest teaching example for introducing memoization and bottom-up tabulation.',
      'Used directly in some algorithmic contexts (e.g., Fibonacci heaps, golden-ratio search).',
      'A template for any recursive problem exhibiting overlapping subproblems and optimal substructure.',
    ],
    commonMistakes: [
      'Implementing plain recursion without a cache, silently reintroducing exponential time on larger inputs.',
      'Forgetting the base cases fib(0) = 0 and fib(1) = 1, causing incorrect results or infinite recursion.',
      'Using a memoization cache but forgetting to check it before recomputing, defeating the entire optimization.',
    ],
    visualizationNotes:
      'A visualization would show the recursion tree for naive Fibonacci, with repeated subtree calls highlighted in red, contrasted against a memoized version where those same nodes are replaced with instant cache hits in green.',
    tags: ['dynamic-programming', 'recursion', 'memoization'],
    cppCode: `#include <vector>
using namespace std;

long long fibonacci(int n, vector<long long>& cache) {
    if (n <= 1) return n;
    if (cache[n] != -1) return cache[n];

    cache[n] = fibonacci(n - 1, cache) + fibonacci(n - 2, cache);
    return cache[n];
}

long long fibMemoized(int n) {
    vector<long long> cache(n + 1, -1);
    return fibonacci(n, cache);
}

// Bottom-up, O(1) space
long long fibIterative(int n) {
    if (n <= 1) return n;
    long long prev2 = 0, prev1 = 1;
    for (int i = 2; i <= n; ++i) {
        long long current = prev1 + prev2;
        prev2 = prev1;
        prev1 = current;
    }
    return prev1;
}`,
    pythonCode: `from functools import lru_cache


@lru_cache(maxsize=None)
def fib_memoized(n: int) -> int:
    if n <= 1:
        return n
    return fib_memoized(n - 1) + fib_memoized(n - 2)


def fib_iterative(n: int) -> int:
    if n <= 1:
        return n

    prev2, prev1 = 0, 1
    for _ in range(2, n + 1):
        prev2, prev1 = prev1, prev1 + prev2

    return prev1`,
    practiceProblems: [
      {
        title: 'Climbing Stairs',
        url: 'https://leetcode.com/problems/climbing-stairs/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: 'Fibonacci Number',
        url: 'https://leetcode.com/problems/fibonacci-number/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: 'House Robber',
        url: 'https://leetcode.com/problems/house-robber/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Dynamic programming problems', url: 'https://leetcode.com/tag/dynamic-programming/' },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['knapsack-01'],
  },
  {
    slug: 'n-queens',
    name: 'N-Queens Problem (Backtracking)',
    categorySlug: 'backtracking',
    difficulty: 'HARD',
    summary:
      'Places N chess queens on an N×N board so that no two threaten each other, by incrementally building and pruning candidate placements.',
    introduction:
      'The N-Queens problem is the definitive showcase for backtracking: instead of generating every possible arrangement of queens and checking each one (which is astronomically expensive), it builds a solution one row at a time and immediately abandons any partial placement that already violates a constraint.',
    problemStatement:
      'Place N queens on an N×N chessboard such that no two queens attack each other — meaning no two queens share the same row, column, or diagonal. Find all such placements (or determine if at least one exists).',
    intuition:
      "Since no two queens can share a row, exactly one queen can be placed per row. Processing rows one at a time and, in each row, trying every column that is not already attacked by a previously placed queen (via column or diagonal) massively prunes the search space early — an invalid placement is rejected before any further queens are placed on top of it, instead of after a full board is generated.",
    stepByStep: [
      'Maintain sets (or boolean arrays) tracking which columns, and which of the two diagonal directions, are currently under attack.',
      'Define a recursive function place(row): if row == N, a full valid solution has been found — record it.',
      'Otherwise, try every column in the current row.',
      'If the column and both diagonals through (row, column) are not under attack, place a queen there, mark the column/diagonals as attacked, and recurse into place(row + 1).',
      'After the recursive call returns, undo the placement (backtrack) — unmark the column/diagonals — and try the next column.',
      'If no column works for the current row, backtrack to the previous row and try its next option.',
    ],
    dryRun:
      'N=4\nRow 0: try col 0 -> place. Row 1: col 0,1 attacked; try col 2 -> place. Row 2: cols 0,1,2,3 all attacked by combinations of row0/row1 queens -> dead end, backtrack.\nRow 1: try col 3 -> place. Row 2: try col 1 -> place. Row 3: cols 0,2,3 attacked, col 1 also attacked -> dead end, backtrack all the way.\nRow 0: try col 1 -> place. Row 1: try col 3 -> place. Row 2: try col 0 -> place. Row 3: try col 2 -> place. All 4 queens placed with no conflicts!\nResult: one valid solution is queens at (0,1), (1,3), (2,0), (3,2) — N-Queens has 2 total solutions for N=4.',
    timeComplexityBest: 'O(N!)',
    timeComplexityAverage: 'O(N!)',
    timeComplexityWorst: 'O(N!)',
    spaceComplexity: 'O(N)',
    advantages: [
      'Pruning invalid placements early avoids exploring the vast majority of the full N! permutation space.',
      'Uses only O(N) space for the attack-tracking sets/arrays plus the recursion stack, far less than generating all boards explicitly.',
      'The row-by-row, one-queen-per-row framing is a reusable template for many constraint-satisfaction backtracking problems.',
    ],
    disadvantages: [
      'Still exponential in the worst case — N-Queens becomes intractable for very large N despite the pruning.',
      'Correctly tracking diagonal attacks (there are two distinct diagonal directions) is a common source of subtle bugs.',
    ],
    applications: [
      'The standard teaching example for backtracking and constraint satisfaction problems (CSPs).',
      'Related directly to Sudoku solvers, crossword generators, and other CSPs with row/column/region constraints.',
      'Used as a benchmark problem for comparing search and constraint-propagation algorithms.',
    ],
    commonMistakes: [
      "Checking only rows and columns for attacks while forgetting the two diagonal directions entirely.",
      'Forgetting to backtrack (undo the placement and attack markers) after a recursive call returns, which corrupts the state for sibling branches.',
      'Representing diagonals incorrectly — the two diagonal families are indexed by (row - col) and (row + col), which is easy to mix up.',
    ],
    visualizationNotes:
      'A visualization would render the N×N board with a queen icon per placed row, shading attacked squares in red as queens are placed, and animating the removal of a queen (backtrack) when a row has no valid column left.',
    tags: ['backtracking', 'recursion', 'constraint-satisfaction'],
    cppCode: `#include <vector>
#include <unordered_set>
using namespace std;

void solve(int row, int n, vector<int>& placement,
           unordered_set<int>& cols, unordered_set<int>& diag1, unordered_set<int>& diag2,
           vector<vector<int>>& solutions) {
    if (row == n) {
        solutions.push_back(placement);
        return;
    }

    for (int col = 0; col < n; ++col) {
        int d1 = row - col;
        int d2 = row + col;
        if (cols.count(col) || diag1.count(d1) || diag2.count(d2)) continue;

        placement[row] = col;
        cols.insert(col);
        diag1.insert(d1);
        diag2.insert(d2);

        solve(row + 1, n, placement, cols, diag1, diag2, solutions);

        cols.erase(col);
        diag1.erase(d1);
        diag2.erase(d2);
    }
}

vector<vector<int>> solveNQueens(int n) {
    vector<vector<int>> solutions;
    vector<int> placement(n, -1);
    unordered_set<int> cols, diag1, diag2;
    solve(0, n, placement, cols, diag1, diag2, solutions);
    return solutions; // each inner vector: placement[row] = column of the queen in that row
}`,
    pythonCode: `def solve_n_queens(n: int) -> list[list[int]]:
    solutions: list[list[int]] = []
    placement = [-1] * n
    cols: set[int] = set()
    diag1: set[int] = set()  # row - col
    diag2: set[int] = set()  # row + col

    def solve(row: int) -> None:
        if row == n:
            solutions.append(placement.copy())
            return

        for col in range(n):
            d1, d2 = row - col, row + col
            if col in cols or d1 in diag1 or d2 in diag2:
                continue

            placement[row] = col
            cols.add(col)
            diag1.add(d1)
            diag2.add(d2)

            solve(row + 1)

            cols.remove(col)
            diag1.remove(d1)
            diag2.remove(d2)

    solve(0)
    return solutions  # each list: placement[row] = column of the queen in that row`,
    practiceProblems: [
      {
        title: 'N-Queens',
        url: 'https://leetcode.com/problems/n-queens/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
      {
        title: 'N-Queens II',
        url: 'https://leetcode.com/problems/n-queens-ii/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
      {
        title: 'Sudoku Solver',
        url: 'https://leetcode.com/problems/sudoku-solver/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Backtracking problems', url: 'https://leetcode.com/tag/backtracking/' },
      {
        platform: 'CODEFORCES',
        label: 'Constructive algorithms on Codeforces',
        url: 'https://codeforces.com/problemset?tags=constructive+algorithms',
      },
    ],
    relatedSlugs: ['depth-first-search'],
  },
  {
    slug: 'single-number-bit-manipulation',
    name: 'Single Number (XOR Trick)',
    categorySlug: 'bit-manipulation',
    difficulty: 'EASY',
    summary:
      'Finds the one element that appears once in an array where every other element appears exactly twice, using a single XOR pass.',
    introduction:
      "This problem is the quintessential introduction to bitwise XOR tricks. It looks like it might need a hash map to count occurrences, but a single mathematical property of XOR solves it in one linear pass with zero extra memory.",
    problemStatement:
      'Given a non-empty array of integers where every element appears exactly twice except for one element which appears exactly once, find that single element. The solution must run in linear time and use constant extra space.',
    intuition:
      "XOR has two properties that combine perfectly here: any number XORed with itself is 0 (x ^ x = 0), and any number XORed with 0 is itself (x ^ 0 = x). XOR is also commutative and associative, so XORing every element together lets all the duplicate pairs cancel each other out to 0, leaving only the single unpaired element.",
    stepByStep: [
      'Initialize a result variable to 0.',
      'Iterate through every element in the array.',
      'XOR the result with the current element: result ^= element.',
      'After processing every element, all paired duplicates have cancelled to 0, leaving only the unique element in result.',
      'Return result.',
    ],
    dryRun:
      'Array: [4, 1, 2, 1, 2]\nresult = 0\nresult ^= 4 -> 4\nresult ^= 1 -> 5\nresult ^= 2 -> 7\nresult ^= 1 -> 6\nresult ^= 2 -> 4\nResult: 4 (the single number)',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(1)',
    advantages: [
      'Uses zero extra memory, unlike a hash map counting approach that needs O(n) space.',
      'A single linear pass — faster in practice than sorting-based alternatives.',
      'Demonstrates a broadly useful bitwise pattern applicable to several related problems.',
    ],
    disadvantages: [
      'Only works for the "exactly twice" variant — a different technique (e.g., digit-sum-by-bit-position) is needed if elements can repeat three times except for one.',
      'Bitwise tricks like this can be less immediately readable to someone unfamiliar with XOR properties.',
    ],
    applications: [
      'Finding a single anomalous or unpaired record in otherwise-duplicated data streams.',
      'Error detection/parity-check style problems in low-level systems programming.',
      'A building block technique in problems asking to find two unique numbers among duplicated pairs (using XOR plus a partition step).',
    ],
    commonMistakes: [
      "Reaching for a hash map or sorting first, missing the O(1)-space XOR trick entirely.",
      'Forgetting that XOR is both commutative and associative, so element order in the array does not matter at all.',
      'Misapplying this exact technique to the "appears three times except one" variant, which needs a fundamentally different bit-counting approach.',
    ],
    visualizationNotes:
      'A visualization would show the running XOR result updating in binary as each array element is processed, with paired duplicate bits visibly cancelling out (flashing to 0) as they are XORed.',
    tags: ['bit-manipulation', 'array', 'xor'],
    cppCode: `#include <vector>
using namespace std;

int singleNumber(const vector<int>& nums) {
    int result = 0;
    for (int num : nums) {
        result ^= num;
    }
    return result;
}`,
    pythonCode: `from functools import reduce
from operator import xor


def single_number(nums: list[int]) -> int:
    return reduce(xor, nums, 0)`,
    practiceProblems: [
      {
        title: 'Single Number',
        url: 'https://leetcode.com/problems/single-number/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: 'Single Number II',
        url: 'https://leetcode.com/problems/single-number-ii/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Single Number III',
        url: 'https://leetcode.com/problems/single-number-iii/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Bit manipulation problems', url: 'https://leetcode.com/tag/bit-manipulation/' },
      {
        platform: 'CODEFORCES',
        label: 'Bitmasks problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=bitmasks',
      },
    ],
    relatedSlugs: [],
  },
  {
    slug: 'segment-tree-range-sum-query',
    name: 'Segment Tree (Range Sum Query with Point Updates)',
    categorySlug: 'segment-tree',
    difficulty: 'HARD',
    summary:
      'A binary tree over an array that answers arbitrary range-sum queries and supports point updates, both in O(log n).',
    introduction:
      "A Segment Tree is the workhorse data structure whenever a problem needs both range queries (sum, min, max, etc.) and updates on an array that changes over time. A plain prefix-sum array answers range queries in O(1) but needs O(n) to update after a single element changes; a segment tree balances both operations at O(log n) each.",
    problemStatement:
      'Given an array of n numbers, support two operations efficiently: query(l, r), which returns the sum of elements in the range [l, r], and update(i, value), which changes the element at index i to a new value.',
    intuition:
      'Build a binary tree where each leaf represents a single array element, and each internal node represents the sum of its two children\'s ranges — so the root represents the sum of the entire array. Any range [l, r] can be decomposed into at most O(log n) of these precomputed subtree sums, so a query only needs to combine a small number of segments rather than rescanning the whole range. An update only needs to correct the O(log n) ancestors of the changed leaf.',
    stepByStep: [
      'Build: recursively split the array in half, building left and right subtrees, and set each internal node to the sum of its two children. A leaf node stores a single array element.',
      'Query(l, r) on a node covering [nodeLeft, nodeRight]: if the node\'s range is fully outside [l, r], return 0 (identity for sum). If fully inside, return the node\'s stored sum directly. Otherwise, recurse into both children and add their results.',
      'Update(i, value) on a node covering [nodeLeft, nodeRight]: if nodeLeft == nodeRight == i, set the node\'s value directly. Otherwise, recurse into whichever child contains index i, then recompute this node\'s sum as the sum of its two children.',
    ],
    dryRun:
      'Array: [1, 3, 5, 7, 9, 11]\nBuilt tree (sums): root covers [0,5]=36\n  left [0,2]=9 (children [0,1]=4, [2,2]=5)\n  right [3,5]=27 (children [3,4]=16, [5,5]=11)\nquery(1,4): decomposes into [1,1]=3 (from [0,1] node, partial), [2,2]=5 (fully inside), [3,4]=16 (fully inside) -> 3+5+16=24\nupdate(2, 10): leaf [2,2] becomes 10. Recompute [0,2]=4+10=14, recompute root=14+27=41\nquery(0,5) after update: 41',
    timeComplexityBest: 'O(log n)',
    timeComplexityAverage: 'O(log n)',
    timeComplexityWorst: 'O(log n)',
    spaceComplexity: 'O(n)',
    advantages: [
      'Both range queries and point updates run in O(log n), a strong balance that plain prefix sums or brute force cannot offer simultaneously.',
      'Generalizes far beyond sum — the same structure supports range minimum, maximum, GCD, or any associative combining function.',
      'Can be extended with lazy propagation to also support efficient range updates, not just point updates.',
    ],
    disadvantages: [
      'Uses roughly 4n space in a typical array-based implementation, more than the O(n) a simple array would need.',
      'Noticeably more complex to implement correctly than a Fenwick Tree for the basic sum/point-update case.',
      'Recursive implementations carry call-stack overhead compared to a Fenwick Tree\'s pure iterative bit tricks.',
    ],
    applications: [
      'Range sum/min/max queries over frequently-changing arrays, e.g., competitive programming range problems.',
      'Interval scheduling and computational geometry sweep-line algorithms.',
      'Database and analytics systems needing fast range aggregation over mutable data.',
    ],
    commonMistakes: [
      'Under-allocating the backing array — a common safe size is 4×n rather than 2×n, to accommodate an unbalanced recursive split.',
      'Forgetting to recompute a node\'s stored value after updating one of its children.',
      "Mixing up 'fully outside', 'fully inside', and 'partial overlap' cases in the query function, leading to incorrect partial sums.",
    ],
    visualizationNotes:
      'A visualization would render the tree with each node labeled by its range and stored sum, highlighting the O(log n) nodes visited and combined during a query, and the O(log n) ancestor chain touched during an update.',
    tags: ['segment-tree', 'range-query', 'divide-and-conquer', 'tree'],
    cppCode: `#include <vector>
using namespace std;

class SegmentTree {
public:
    explicit SegmentTree(const vector<int>& data) : n((int)data.size()), tree(4 * n) {
        if (n > 0) build(data, 1, 0, n - 1);
    }

    int query(int l, int r) { return query(1, 0, n - 1, l, r); }

    void update(int index, int value) { update(1, 0, n - 1, index, value); }

private:
    int n;
    vector<int> tree;

    void build(const vector<int>& data, int node, int start, int end) {
        if (start == end) {
            tree[node] = data[start];
            return;
        }
        int mid = start + (end - start) / 2;
        build(data, 2 * node, start, mid);
        build(data, 2 * node + 1, mid + 1, end);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }

    int query(int node, int start, int end, int l, int r) {
        if (r < start || end < l) return 0;
        if (l <= start && end <= r) return tree[node];

        int mid = start + (end - start) / 2;
        return query(2 * node, start, mid, l, r) + query(2 * node + 1, mid + 1, end, l, r);
    }

    void update(int node, int start, int end, int index, int value) {
        if (start == end) {
            tree[node] = value;
            return;
        }
        int mid = start + (end - start) / 2;
        if (index <= mid) update(2 * node, start, mid, index, value);
        else update(2 * node + 1, mid + 1, end, index, value);
        tree[node] = tree[2 * node] + tree[2 * node + 1];
    }
};`,
    pythonCode: `class SegmentTree:
    def __init__(self, data: list[int]) -> None:
        self.n = len(data)
        self.tree = [0] * (4 * self.n)
        if self.n > 0:
            self._build(data, 1, 0, self.n - 1)

    def _build(self, data: list[int], node: int, start: int, end: int) -> None:
        if start == end:
            self.tree[node] = data[start]
            return
        mid = start + (end - start) // 2
        self._build(data, 2 * node, start, mid)
        self._build(data, 2 * node + 1, mid + 1, end)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]

    def query(self, l: int, r: int) -> int:
        return self._query(1, 0, self.n - 1, l, r)

    def _query(self, node: int, start: int, end: int, l: int, r: int) -> int:
        if r < start or end < l:
            return 0
        if l <= start and end <= r:
            return self.tree[node]
        mid = start + (end - start) // 2
        return self._query(2 * node, start, mid, l, r) + self._query(2 * node + 1, mid + 1, end, l, r)

    def update(self, index: int, value: int) -> None:
        self._update(1, 0, self.n - 1, index, value)

    def _update(self, node: int, start: int, end: int, index: int, value: int) -> None:
        if start == end:
            self.tree[node] = value
            return
        mid = start + (end - start) // 2
        if index <= mid:
            self._update(2 * node, start, mid, index, value)
        else:
            self._update(2 * node + 1, mid + 1, end, index, value)
        self.tree[node] = self.tree[2 * node] + self.tree[2 * node + 1]`,
    practiceProblems: [
      {
        title: 'Range Sum Query - Mutable',
        url: 'https://leetcode.com/problems/range-sum-query-mutable/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Count of Smaller Numbers After Self',
        url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'Data structures problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=data+structures',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['fenwick-tree-binary-indexed-tree', 'sparse-table-range-minimum-query'],
  },
  {
    slug: 'fenwick-tree-binary-indexed-tree',
    name: 'Fenwick Tree (Binary Indexed Tree)',
    categorySlug: 'fenwick-tree',
    difficulty: 'MEDIUM',
    summary:
      'A compact array-based structure that supports prefix-sum queries and point updates in O(log n), using the binary representation of indices.',
    introduction:
      "The Fenwick Tree, invented by Peter Fenwick in 1994, achieves the same asymptotic complexity as a Segment Tree for prefix-sum queries and point updates, but with a dramatically smaller memory footprint and simpler, purely iterative bit-manipulation code — no explicit tree structure is stored at all.",
    problemStatement:
      'Given an array of n numbers, support two operations efficiently: prefixSum(i), which returns the sum of elements from index 1 to i, and update(i, delta), which adds delta to the element at index i.',
    intuition:
      "Each index in the Fenwick array is responsible for the sum of a specific range of the original array, determined by the lowest set bit of its index. To compute a prefix sum ending at i, repeatedly jump backward by subtracting the lowest set bit, accumulating each responsible range's sum. To update index i, repeatedly jump forward by adding the lowest set bit, propagating the delta to every range that includes i. Both directions terminate in O(log n) steps because the lowest set bit changes predictably with each jump.",
    stepByStep: [
      'Use a 1-indexed array tree[1..n], initialized to 0.',
      'update(i, delta): while i <= n, add delta to tree[i], then set i += (i & -i) to move to the next responsible index.',
      'prefixSum(i): initialize sum = 0. While i > 0, add tree[i] to sum, then set i -= (i & -i) to move to the previous responsible index.',
      'rangeSum(l, r) = prefixSum(r) - prefixSum(l - 1).',
      'To build from an initial array, call update(i, value[i]) for every index, or use a faster O(n) linear-time build.',
    ],
    dryRun:
      'Array (1-indexed): [_, 3, 2, -1, 6, 5, 4, -3, 3], n=8\nupdate(1, 3): i=1, tree[1]+=3, i += 1&-1=1 -> i=2; tree[2]+=3, i+=2 -> i=4; tree[4]+=3, i+=4 -> i=8; tree[8]+=3, i+=8 -> i=16>8 stop\n(similarly for other updates...)\nprefixSum(5): i=5, sum+=tree[5], i -= 5&-5=1 -> i=4; sum+=tree[4], i -= 4&-4=4 -> i=0, stop\nprefixSum(5) accumulates the responsible ranges [5,5] and [1,4], giving the sum of elements 1 through 5.',
    timeComplexityBest: 'O(log n)',
    timeComplexityAverage: 'O(log n)',
    timeComplexityWorst: 'O(log n)',
    spaceComplexity: 'O(n)',
    advantages: [
      'Only needs a single array of size n+1 — roughly a quarter of the memory a typical Segment Tree implementation uses.',
      'Purely iterative bit-manipulation logic, with no recursion and very low constant-factor overhead.',
      'Simple, compact code that is easy to get right once the `i & -i` trick is understood.',
    ],
    disadvantages: [
      'Less flexible than a Segment Tree — it is naturally suited to prefix-sum-like (invertible, associative) operations, and adapting it to range minimum/maximum queries is awkward.',
      'The bit-manipulation logic, while short, is less intuitive to read and reason about than an explicit tree structure.',
    ],
    applications: [
      'Counting inversions in an array via indexed prefix-sum queries.',
      'Frequency counting and order-statistics queries (e.g., "how many elements seen so far are less than x").',
      'Competitive programming problems needing fast prefix-sum queries with frequent point updates.',
    ],
    commonMistakes: [
      'Using 0-indexed arrays directly — Fenwick Trees rely on 1-indexing because the `i & -i` trick breaks down at index 0.',
      'Confusing the direction of traversal: update moves forward (i += i & -i) while prefixSum moves backward (i -= i & -i).',
      'Forgetting that update(i, delta) adds a delta to the existing value, rather than directly setting a new value — setting requires first computing the difference from the current value.',
    ],
    visualizationNotes:
      'A visualization would show the array as a row of cells with overlaid arcs representing each index\'s "responsibility range," animating the backward jumps during a prefix sum query and forward jumps during an update.',
    tags: ['fenwick-tree', 'binary-indexed-tree', 'range-query', 'bit-manipulation'],
    cppCode: `#include <vector>
using namespace std;

class FenwickTree {
public:
    explicit FenwickTree(int n) : n(n), tree(n + 1, 0) {}

    void update(int i, int delta) {
        for (; i <= n; i += i & (-i)) {
            tree[i] += delta;
        }
    }

    int prefixSum(int i) const {
        int sum = 0;
        for (; i > 0; i -= i & (-i)) {
            sum += tree[i];
        }
        return sum;
    }

    int rangeSum(int l, int r) const {
        return prefixSum(r) - prefixSum(l - 1);
    }

private:
    int n;
    vector<int> tree;
};`,
    pythonCode: `class FenwickTree:
    def __init__(self, n: int) -> None:
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i: int, delta: int) -> None:
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def prefix_sum(self, i: int) -> int:
        total = 0
        while i > 0:
            total += self.tree[i]
            i -= i & (-i)
        return total

    def range_sum(self, l: int, r: int) -> int:
        return self.prefix_sum(r) - self.prefix_sum(l - 1)`,
    practiceProblems: [
      {
        title: 'Range Sum Query - Mutable',
        url: 'https://leetcode.com/problems/range-sum-query-mutable/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Count of Smaller Numbers After Self',
        url: 'https://leetcode.com/problems/count-of-smaller-numbers-after-self/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
      {
        platform: 'CODEFORCES',
        label: 'Data structures problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=data+structures',
      },
    ],
    relatedSlugs: ['segment-tree-range-sum-query'],
  },
  {
    slug: 'sparse-table-range-minimum-query',
    name: 'Sparse Table (Range Minimum Query)',
    categorySlug: 'sparse-table',
    difficulty: 'MEDIUM',
    summary:
      'Precomputes overlapping power-of-two ranges so that any range minimum query on a static array can be answered in O(1).',
    introduction:
      'A Sparse Table exploits idempotence — the property that combining an overlapping range with itself does not change the result (min(x, x) = x) — to answer range minimum (or maximum, GCD, AND, OR) queries in true O(1) after O(n log n) preprocessing, at the cost of not supporting updates.',
    problemStatement:
      'Given a static array (no updates), answer many range minimum queries query(l, r) — the minimum value in the subarray from index l to r — each in O(1) time.',
    intuition:
      'Precompute the minimum of every range whose length is a power of two, starting at every index: table[k][i] = the minimum of the range starting at i with length 2^k. Any arbitrary range [l, r] can be covered by exactly two such precomputed power-of-two ranges that overlap in the middle — since min is idempotent, overlapping does not cause incorrect double-counting. Choosing k = floor(log2(r - l + 1)), the two ranges [l, l + 2^k - 1] and [r - 2^k + 1, r] together cover [l, r] entirely.',
    stepByStep: [
      'Precompute log2 values for all lengths from 1 to n for fast k lookups.',
      'Initialize table[0][i] = arr[i] for every index i (ranges of length 1).',
      'For each k from 1 up to log2(n), and each valid starting index i: table[k][i] = min(table[k-1][i], table[k-1][i + 2^(k-1)]) — combining two adjacent half-length ranges.',
      'To answer query(l, r): compute k = log2(r - l + 1), then return min(table[k][l], table[k][r - 2^k + 1]).',
    ],
    dryRun:
      'Array: [7, 2, 3, 0, 5, 10, 3, 12, 18]\ntable[0] = [7,2,3,0,5,10,3,12,18] (length-1 ranges)\ntable[1][i] = min of length-2 ranges: table[1][0]=min(7,2)=2, table[1][1]=min(2,3)=2, table[1][3]=min(0,5)=0, ...\ntable[2][i] = min of length-4 ranges: table[2][0]=min(table[1][0],table[1][2])=min(2,min(3,0))=0, ...\n\nquery(1, 6): length=6, k=floor(log2(6))=2, 2^2=4\n  = min(table[2][1], table[2][6-4+1=3])\n  = min(min of [1,4], min of [3,6])\n  = min(0, 0) = 0\nResult: 0 (minimum in range [1,6] which contains the value 0 at index 3)',
    timeComplexityBest: 'O(1) per query (after O(n log n) preprocessing)',
    timeComplexityAverage: 'O(1) per query (after O(n log n) preprocessing)',
    timeComplexityWorst: 'O(1) per query (after O(n log n) preprocessing)',
    spaceComplexity: 'O(n log n)',
    advantages: [
      'Unbeatable O(1) query time once built — faster than a Segment Tree\'s O(log n) per query.',
      'Simple to implement correctly given the table-filling recurrence.',
      'Works for any idempotent, associative operation: min, max, GCD, bitwise AND/OR.',
    ],
    disadvantages: [
      'Static only — it fundamentally cannot support updates efficiently, since a single change would require rebuilding large portions of the table.',
      'Uses O(n log n) space, more than the O(n) a Segment Tree or Fenwick Tree requires.',
      'Cannot be used for non-idempotent operations like sum, where overlapping ranges would double-count elements.',
    ],
    applications: [
      'Range minimum query as the core subroutine of the O(1) Lowest Common Ancestor (LCA) algorithm via Euler tour reduction.',
      'Any read-heavy, write-never scenario needing extremely fast repeated range queries, such as static log analysis.',
      'Range GCD or bitwise AND/OR queries over immutable datasets.',
    ],
    commonMistakes: [
      "Attempting to use a Sparse Table for range sum queries, forgetting that overlapping ranges double-count elements for non-idempotent operations.",
      'Miscomputing k as ceil(log2(length)) instead of floor(log2(length)), which causes the two overlapping ranges to overshoot the actual query range.',
      'Trying to support updates on a Sparse Table — a Segment Tree or Fenwick Tree should be used instead whenever the array is mutable.',
    ],
    visualizationNotes:
      'A visualization would show the table as stacked rows of shrinking-count, power-of-two-width bars, highlighting the two overlapping bars selected to cover an arbitrary query range in O(1).',
    tags: ['sparse-table', 'range-query', 'preprocessing'],
    cppCode: `#include <vector>
#include <cmath>
#include <algorithm>
using namespace std;

class SparseTable {
public:
    explicit SparseTable(const vector<int>& arr) {
        int n = (int)arr.size();
        int maxLog = (int)log2(n) + 1;
        table.assign(maxLog, vector<int>(n));
        table[0] = arr;

        for (int k = 1; k < maxLog; ++k) {
            int rangeLen = 1 << k;
            for (int i = 0; i + rangeLen <= n; ++i) {
                table[k][i] = min(table[k - 1][i], table[k - 1][i + (1 << (k - 1))]);
            }
        }
    }

    int queryMin(int l, int r) const {
        int k = (int)log2(r - l + 1);
        return min(table[k][l], table[k][r - (1 << k) + 1]);
    }

private:
    vector<vector<int>> table;
};`,
    pythonCode: `import math


class SparseTable:
    def __init__(self, arr: list[int]) -> None:
        n = len(arr)
        max_log = int(math.log2(n)) + 1 if n > 0 else 1
        self.table = [arr[:]] + [[0] * n for _ in range(max_log - 1)]

        for k in range(1, max_log):
            range_len = 1 << k
            for i in range(n - range_len + 1):
                self.table[k][i] = min(
                    self.table[k - 1][i],
                    self.table[k - 1][i + (1 << (k - 1))],
                )

    def query_min(self, l: int, r: int) -> int:
        k = int(math.log2(r - l + 1))
        return min(self.table[k][l], self.table[k][r - (1 << k) + 1])`,
    practiceProblems: [
      {
        title: 'Range Minimum Query - Immutable',
        url: 'https://leetcode.com/problems/range-sum-query-immutable/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
    ],
    externalLinks: [
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
      {
        platform: 'CODEFORCES',
        label: 'Data structures problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=data+structures',
      },
    ],
    relatedSlugs: ['segment-tree-range-sum-query', 'binary-search'],
  },
  {
    slug: 'euclidean-algorithm-gcd',
    name: 'Euclidean Algorithm (GCD & LCM)',
    categorySlug: 'math',
    difficulty: 'EASY',
    summary:
      'Computes the greatest common divisor of two integers using repeated remainder reduction, and derives the least common multiple from it.',
    introduction:
      "The Euclidean Algorithm, described by Euclid over two thousand years ago, is one of the oldest algorithms still in everyday practical use. It computes the greatest common divisor (GCD) of two numbers far faster than factoring both numbers and comparing their factors.",
    problemStatement:
      'Given two non-negative integers a and b, compute their greatest common divisor (the largest integer that divides both without a remainder), and their least common multiple (the smallest positive integer divisible by both).',
    intuition:
      "The key insight is that gcd(a, b) equals gcd(b, a mod b) — any common divisor of a and b must also divide a mod b, and vice versa, so the pair can be replaced with a strictly smaller pair without changing the answer. Repeating this reduction rapidly shrinks the numbers until one of them reaches 0, at which point the other is the GCD. The LCM then follows directly from the identity lcm(a, b) = (a * b) / gcd(a, b).",
    stepByStep: [
      'To compute gcd(a, b): while b is not 0, replace (a, b) with (b, a mod b).',
      'When b becomes 0, a holds the greatest common divisor — return it.',
      'To compute lcm(a, b): first compute g = gcd(a, b).',
      'Return (a / g) * b — dividing before multiplying avoids unnecessary overflow for large inputs.',
    ],
    dryRun:
      'gcd(48, 18):\n(48, 18) -> 48 mod 18 = 12 -> (18, 12)\n(18, 12) -> 18 mod 12 = 6 -> (12, 6)\n(12, 6) -> 12 mod 6 = 0 -> (6, 0)\nb = 0, so gcd = 6\n\nlcm(48, 18) = (48 / 6) * 18 = 8 * 18 = 144',
    timeComplexityBest: 'O(1)',
    timeComplexityAverage: 'O(log(min(a, b)))',
    timeComplexityWorst: 'O(log(min(a, b)))',
    spaceComplexity: 'O(1)',
    advantages: [
      'Extremely fast — logarithmic in the smaller of the two numbers, even for very large integers.',
      'Simple to implement iteratively with O(1) extra space.',
      'The extended Euclidean algorithm variant also computes Bézout coefficients, useful for modular inverses.',
    ],
    disadvantages: [
      "Only computes GCD/LCM for two numbers at a time — extending to more numbers requires folding pairwise (gcd(a,b,c) = gcd(gcd(a,b), c)), a minor but easy-to-forget extra step.",
      'The LCM formula can overflow for very large inputs if the division-before-multiplication order is not used carefully.',
    ],
    applications: [
      'Simplifying fractions to lowest terms.',
      'Cryptography — the extended Euclidean algorithm computes modular multiplicative inverses used in RSA.',
      'Scheduling problems that need the least common multiple of repeating intervals (e.g., "when do these two cycles next align").',
    ],
    commonMistakes: [
      'Computing lcm as (a * b) / gcd(a, b) directly, which can overflow for large a and b before the division ever happens — dividing first avoids this.',
      'Implementing GCD recursively without a base case for b == 0, causing infinite recursion.',
      'Forgetting that gcd(0, n) = n, an edge case that naturally falls out of the algorithm but is easy to special-case incorrectly.',
    ],
    visualizationNotes:
      'A visualization would show the pair (a, b) shrinking step by step, perhaps alongside a rectangle-tiling geometric interpretation showing how the algorithm finds the largest square that evenly tiles an a-by-b rectangle.',
    tags: ['math', 'number-theory', 'gcd'],
    cppCode: `long long gcd(long long a, long long b) {
    while (b != 0) {
        long long temp = b;
        b = a % b;
        a = temp;
    }
    return a;
}

long long lcm(long long a, long long b) {
    return (a / gcd(a, b)) * b;
}`,
    pythonCode: `def gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return a


def lcm(a: int, b: int) -> int:
    return (a // gcd(a, b)) * b`,
    practiceProblems: [
      {
        title: 'Greatest Common Divisor of Strings',
        url: 'https://leetcode.com/problems/greatest-common-divisor-of-strings/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: 'Find Greatest Common Divisor of Array',
        url: 'https://leetcode.com/problems/find-greatest-common-divisor-of-array/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'Number theory problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=number+theory',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['sieve-of-eratosthenes'],
  },
  {
    slug: 'sieve-of-eratosthenes',
    name: 'Sieve of Eratosthenes',
    categorySlug: 'number-theory',
    difficulty: 'EASY',
    summary:
      'Generates every prime number up to n by iteratively marking the multiples of each prime as composite, in O(n log log n) time.',
    introduction:
      "The Sieve of Eratosthenes, one of the oldest known algorithms (circa 240 BC), remains the standard method for generating all primes up to a bound n. It is dramatically faster than testing each number individually for primality, because it eliminates composite numbers in efficient batches.",
    problemStatement:
      'Given an integer n, find all prime numbers less than or equal to n.',
    intuition:
      "Every composite number has a prime factor, so if every multiple of every prime starting from 2 is marked as 'not prime', whatever numbers remain unmarked must be prime. Starting the marking for a prime p at p*p (rather than 2p) is a key optimization, since all smaller multiples of p (2p, 3p, ..., (p-1)p) have already been marked by smaller primes.",
    stepByStep: [
      'Create a boolean array isPrime[0..n], initialized to true, and set isPrime[0] and isPrime[1] to false.',
      'For each number p from 2 up to sqrt(n):',
      'If isPrime[p] is still true, mark every multiple of p starting from p*p (i.e., p*p, p*p+p, p*p+2p, ...) as false.',
      'After processing all p up to sqrt(n), every index i where isPrime[i] remains true is a prime number.',
      'Collect and return all such indices.',
    ],
    dryRun:
      'n = 30\nInitialize isPrime[0..30] = true, then isPrime[0]=isPrime[1]=false\np=2: mark 4,6,8,...,30 as false\np=3: mark 9,12,15,...,30 as false\np=4: isPrime[4]=false already, skip\np=5: 5*5=25 <= 30, mark 25,30 as false\np> sqrt(30)~5.47, loop ends\nRemaining primes: 2,3,5,7,11,13,17,19,23,29',
    timeComplexityBest: 'O(n log log n)',
    timeComplexityAverage: 'O(n log log n)',
    timeComplexityWorst: 'O(n log log n)',
    spaceComplexity: 'O(n)',
    advantages: [
      'Far faster than trial division for generating all primes up to n — O(n log log n) is very close to linear in practice.',
      'Starting each prime\'s marking at p*p instead of 2p meaningfully reduces redundant work.',
      'Simple to implement and easy to reason about correctness of.',
    ],
    disadvantages: [
      'Requires O(n) memory to store the boolean array, which becomes a real constraint for very large n (billions).',
      "Only finds primes up to a fixed bound n known in advance — it's not designed for testing primality of a single very large number in isolation (Miller-Rabin or similar is better there).",
    ],
    applications: [
      'Precomputing prime tables for competitive programming problems needing fast repeated primality checks.',
      'A preprocessing step for algorithms like prime factorization via smallest-prime-factor sieves.',
      'Cryptographic key generation research and number-theoretic experimentation.',
    ],
    commonMistakes: [
      'Starting the inner marking loop at 2p instead of p*p, which still works correctly but wastes time re-marking numbers already handled by smaller primes.',
      "Iterating the outer loop all the way to n instead of stopping at sqrt(n) — unnecessary since any composite number <= n must have a factor <= sqrt(n).",
      'Off-by-one errors in array sizing, forgetting that the array needs indices 0 through n inclusive (size n+1).',
    ],
    visualizationNotes:
      'A visualization would render numbers 2 through n in a grid, animating each prime\'s multiples being crossed out in a distinct color as the sieve progresses, leaving only primes highlighted at the end.',
    tags: ['number-theory', 'math', 'prime-numbers'],
    cppCode: `#include <vector>
using namespace std;

vector<int> sieveOfEratosthenes(int n) {
    vector<bool> isPrime(n + 1, true);
    if (n >= 0) isPrime[0] = false;
    if (n >= 1) isPrime[1] = false;

    for (int p = 2; (long long)p * p <= n; ++p) {
        if (isPrime[p]) {
            for (int multiple = p * p; multiple <= n; multiple += p) {
                isPrime[multiple] = false;
            }
        }
    }

    vector<int> primes;
    for (int i = 2; i <= n; ++i) {
        if (isPrime[i]) primes.push_back(i);
    }

    return primes;
}`,
    pythonCode: `def sieve_of_eratosthenes(n: int) -> list[int]:
    is_prime = [True] * (n + 1)
    if n >= 0:
        is_prime[0] = False
    if n >= 1:
        is_prime[1] = False

    p = 2
    while p * p <= n:
        if is_prime[p]:
            for multiple in range(p * p, n + 1, p):
                is_prime[multiple] = False
        p += 1

    return [i for i, prime in enumerate(is_prime) if prime]`,
    practiceProblems: [
      {
        title: 'Count Primes',
        url: 'https://leetcode.com/problems/count-primes/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Four Divisors',
        url: 'https://leetcode.com/problems/four-divisors/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'Number theory problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=number+theory',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['euclidean-algorithm-gcd'],
  },
];
