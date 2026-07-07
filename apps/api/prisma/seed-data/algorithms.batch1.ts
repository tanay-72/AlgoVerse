import type { AlgorithmSeed } from './types';

export const algorithmsBatch1: AlgorithmSeed[] = [
  {
    slug: 'kadanes-algorithm',
    name: "Kadane's Algorithm (Maximum Subarray Sum)",
    categorySlug: 'arrays',
    difficulty: 'EASY',
    summary:
      'Finds the maximum sum of any contiguous subarray in linear time using a running local/global sum.',
    introduction:
      "Kadane's Algorithm is the canonical dynamic-programming technique for the maximum subarray sum problem. Instead of checking every possible subarray — which takes quadratic time — it processes the array once, tracking the best sum ending at the current index and the best sum seen anywhere so far.",
    problemStatement:
      'Given an integer array that may contain both positive and negative numbers, find the contiguous subarray (containing at least one number) which has the largest sum, and return that sum.',
    intuition:
      "At every index, you face one choice: extend the subarray that ends at the previous index, or start a brand new subarray at the current element. Extending only helps if the running sum so far is positive — a negative running sum can only drag down anything added to it, so it's better to discard it and restart. This is the entire insight behind the algorithm.",
    stepByStep: [
      'Initialize currentSum and maxSum to the first element of the array.',
      'Iterate through the array starting from the second element.',
      'At each element, set currentSum = max(element, currentSum + element) — either extend the previous subarray or start fresh.',
      'Update maxSum = max(maxSum, currentSum) after each step.',
      'After the loop, maxSum holds the maximum contiguous subarray sum.',
    ],
    dryRun:
      'Array: [-2, 1, -3, 4, -1, 2, 1, -5, 4]\n\ni=0: currentSum=-2, maxSum=-2\ni=1: currentSum=max(1,-2+1=-1)=1, maxSum=1\ni=2: currentSum=max(-3,1-3=-2)=-2, maxSum=1\ni=3: currentSum=max(4,-2+4=2)=4, maxSum=4\ni=4: currentSum=max(-1,4-1=3)=3, maxSum=4\ni=5: currentSum=max(2,3+2=5)=5, maxSum=5\ni=6: currentSum=max(1,5+1=6)=6, maxSum=6\ni=7: currentSum=max(-5,6-5=1)=1, maxSum=6\ni=8: currentSum=max(4,1+4=5)=5, maxSum=6\nResult: 6 (subarray [4, -1, 2, 1])',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(1)',
    advantages: [
      'Single pass over the array — no nested loops required.',
      'Constant extra memory, no auxiliary arrays.',
      'Easily extended to also return the subarray indices, not just the sum.',
    ],
    disadvantages: [
      'Only solves the contiguous subarray variant — a different approach is needed for non-contiguous subsequence sums.',
      'The basic version returns just the maximum sum; tracking the actual subarray requires extra bookkeeping.',
    ],
    applications: [
      'Stock price analysis — best contiguous window of gains.',
      'Signal processing — finding the strongest contiguous burst in a 1D signal.',
      'A building block inside 2D maximum submatrix sum algorithms (Kadane applied per row).',
    ],
    commonMistakes: [
      'Forgetting to handle arrays that are entirely negative — the algorithm still works because it initializes with the first element, but a naive "start at 0" initialization breaks this case.',
      'Resetting currentSum to 0 instead of comparing max(element, currentSum + element), which silently drops valid negative-only answers.',
      'Confusing "maximum subarray" with "maximum subsequence" — the subarray must be contiguous.',
    ],
    visualizationNotes:
      'An interactive visualization would animate a pointer sweeping left to right, showing currentSum growing or resetting at each index, with a highlighted "best window found so far" bar beneath the array.',
    tags: ['array', 'dynamic-programming', 'divide-and-conquer'],
    cppCode: `#include <vector>
#include <algorithm>
using namespace std;

int maxSubArray(vector<int>& nums) {
    int currentSum = nums[0];
    int maxSum = nums[0];

    for (size_t i = 1; i < nums.size(); ++i) {
        currentSum = max(nums[i], currentSum + nums[i]);
        maxSum = max(maxSum, currentSum);
    }

    return maxSum;
}`,
    pythonCode: `def max_sub_array(nums: list[int]) -> int:
    current_sum = nums[0]
    max_sum = nums[0]

    for num in nums[1:]:
        current_sum = max(num, current_sum + num)
        max_sum = max(max_sum, current_sum)

    return max_sum`,
    practiceProblems: [
      {
        title: 'Maximum Subarray',
        url: 'https://leetcode.com/problems/maximum-subarray/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Maximum Product Subarray',
        url: 'https://leetcode.com/problems/maximum-product-subarray/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Array problems on LeetCode', url: 'https://leetcode.com/tag/array/' },
      {
        platform: 'CODEFORCES',
        label: 'Dynamic programming problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=dp',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['sliding-window-maximum', 'longest-common-subsequence'],
  },
  {
    slug: 'longest-substring-without-repeating-characters',
    name: 'Longest Substring Without Repeating Characters',
    categorySlug: 'strings',
    difficulty: 'MEDIUM',
    summary:
      'Finds the length of the longest substring with all unique characters using a sliding window over a hash map.',
    introduction:
      'This problem is the archetypal introduction to the sliding window technique combined with hashing. Rather than checking every possible substring for uniqueness — an O(n³) approach — a window that expands and contracts in a single pass solves it in linear time.',
    problemStatement:
      'Given a string, find the length of the longest substring without repeating characters.',
    intuition:
      "Maintain a window [left, right] that always contains unique characters. Expand right one character at a time. If the new character already exists inside the current window, shrink from the left until the duplicate is removed. A hash map from character to its last-seen index lets you jump `left` directly past the duplicate instead of shrinking one step at a time.",
    stepByStep: [
      'Initialize an empty hash map to store the last index of each character, and left = 0, and best = 0.',
      'Iterate right from 0 to the end of the string.',
      'If the character at right was seen before and its last index is >= left, move left to (lastIndex[char] + 1).',
      'Update lastIndex[char] = right.',
      'Update best = max(best, right - left + 1).',
      'Return best after the loop finishes.',
    ],
    dryRun:
      'String: "abcabcbb"\nright=0 (a): left=0, lastIndex={a:0}, best=1\nright=1 (b): left=0, lastIndex={a:0,b:1}, best=2\nright=2 (c): left=0, lastIndex={a:0,b:1,c:2}, best=3\nright=3 (a): a seen at 0 >= left(0) -> left=1, lastIndex[a]=3, best=3\nright=4 (b): b seen at 1 >= left(1) -> left=2, lastIndex[b]=4, best=3\nright=5 (c): c seen at 2 >= left(2) -> left=3, lastIndex[c]=5, best=3\nright=6 (b): b seen at 4 >= left(3) -> left=5, lastIndex[b]=6, best=3\nright=7 (b): b seen at 6 >= left(5) -> left=7, lastIndex[b]=7, best=max(3,1)=3\nResult: 3 (substring "abc")',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(min(n, alphabet size))',
    advantages: [
      'Single pass — each character is visited by right once and left moves forward monotonically, never backward.',
      'The hash map lets the window jump directly to the correct position instead of shrinking one character at a time.',
      'Generalizes to many "longest/shortest substring satisfying a property" problems.',
    ],
    disadvantages: [
      'Uses extra space proportional to the alphabet size for the hash map.',
      'Slightly trickier to get right than brute force due to the "last index >= left" guard needed to avoid moving left backward.',
    ],
    applications: [
      'DNA/text analysis — finding the longest run of distinct symbols.',
      'Network packet deduplication windows.',
      'A template for many interview problems involving "longest substring with at most K distinct characters", etc.',
    ],
    commonMistakes: [
      'Forgetting the `>= left` check, which can move the window pointer backward and produce an incorrect (too large) answer.',
      'Using an array sized to a fixed ASCII range when the input may contain Unicode characters.',
      'Recomputing window uniqueness with a nested loop instead of maintaining it incrementally, which reintroduces quadratic behavior.',
    ],
    visualizationNotes:
      'A visualization would show two pointers over the string with a highlighted window, and a side panel displaying the hash map updating live as right advances and left jumps forward on collisions.',
    tags: ['string', 'sliding-window', 'hash-table'],
    cppCode: `#include <string>
#include <unordered_map>
#include <algorithm>
using namespace std;

int lengthOfLongestSubstring(const string& s) {
    unordered_map<char, int> lastIndex;
    int left = 0;
    int best = 0;

    for (int right = 0; right < (int)s.size(); ++right) {
        char c = s[right];
        auto it = lastIndex.find(c);
        if (it != lastIndex.end() && it->second >= left) {
            left = it->second + 1;
        }
        lastIndex[c] = right;
        best = max(best, right - left + 1);
    }

    return best;
}`,
    pythonCode: `def length_of_longest_substring(s: str) -> int:
    last_index: dict[str, int] = {}
    left = 0
    best = 0

    for right, char in enumerate(s):
        if char in last_index and last_index[char] >= left:
            left = last_index[char] + 1
        last_index[char] = right
        best = max(best, right - left + 1)

    return best`,
    practiceProblems: [
      {
        title: 'Longest Substring Without Repeating Characters',
        url: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Longest Repeating Character Replacement',
        url: 'https://leetcode.com/problems/longest-repeating-character-replacement/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Sliding window problems', url: 'https://leetcode.com/tag/sliding-window/' },
      {
        platform: 'CODEFORCES',
        label: 'Two pointers problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=two+pointers',
      },
    ],
    relatedSlugs: ['sliding-window-maximum', 'two-sum'],
  },
  {
    slug: 'merge-sort',
    name: 'Merge Sort',
    categorySlug: 'sorting',
    difficulty: 'MEDIUM',
    summary:
      'A stable, divide-and-conquer sorting algorithm that recursively splits the array in half and merges sorted halves.',
    introduction:
      'Merge Sort is one of the earliest and most influential divide-and-conquer algorithms, invented by John von Neumann in 1945. It guarantees O(n log n) performance in every case, which makes it a dependable default when worst-case behavior matters more than average-case constant factors.',
    problemStatement:
      'Given an array of n comparable elements, rearrange them into non-decreasing order.',
    intuition:
      'A single element is trivially sorted. If you can sort two halves of an array independently, merging them into one sorted array only requires walking both halves once, always taking the smaller of the two current fronts. Recursively splitting the array until each piece has one element, then merging back up, produces a fully sorted array.',
    stepByStep: [
      'If the array has 0 or 1 elements, it is already sorted — return it.',
      'Split the array into a left half and a right half at the midpoint.',
      'Recursively merge sort the left half.',
      'Recursively merge sort the right half.',
      'Merge the two sorted halves into a single sorted array by repeatedly comparing their fronts.',
      'Copy any remaining elements from either half once the other is exhausted.',
    ],
    dryRun:
      'Array: [5, 2, 4, 1]\nSplit: [5, 2] and [4, 1]\nSplit [5,2] -> [5] and [2] -> merge -> [2, 5]\nSplit [4,1] -> [4] and [1] -> merge -> [1, 4]\nMerge [2,5] and [1,4]:\n compare 2 vs 1 -> take 1 -> [1]\n compare 2 vs 4 -> take 2 -> [1,2]\n compare 5 vs 4 -> take 4 -> [1,2,4]\n remaining: 5 -> [1,2,4,5]\nResult: [1, 2, 4, 5]',
    timeComplexityBest: 'O(n log n)',
    timeComplexityAverage: 'O(n log n)',
    timeComplexityWorst: 'O(n log n)',
    spaceComplexity: 'O(n)',
    advantages: [
      'Guaranteed O(n log n) in every case — no adversarial input degrades performance.',
      'Stable — equal elements retain their relative order, which matters for multi-key sorts.',
      'Works well for external sorting (data too large to fit in memory) since it processes data in sequential chunks.',
    ],
    disadvantages: [
      'Requires O(n) auxiliary space for the merge step, unlike in-place algorithms such as quicksort or heapsort.',
      'Constant factors are typically higher than quicksort in practice for in-memory arrays due to the extra copying.',
      'Recursive implementation has call-stack overhead unless rewritten iteratively (bottom-up).',
    ],
    applications: [
      'Sorting linked lists, where O(1) extra space is achievable and random access is not needed.',
      'External sorting for datasets larger than available RAM.',
      'The merge step is reused inside the "count inversions" problem and in merge-based algorithms for computing overlapping intervals.',
    ],
    commonMistakes: [
      'Off-by-one errors when computing the midpoint or the merge loop bounds.',
      'Forgetting to copy leftover elements from whichever half still has remaining items after the main merge loop ends.',
      'Allocating a new array on every recursive call instead of reusing a single auxiliary buffer, which hurts real-world performance.',
    ],
    visualizationNotes:
      'A visualization should show the recursive splitting as a tree collapsing down to single elements, then animate the merge phase bottom-up with two colored pointers converging into a sorted output array.',
    tags: ['sorting', 'divide-and-conquer', 'recursion'],
    cppCode: `#include <vector>
using namespace std;

void merge(vector<int>& arr, int left, int mid, int right) {
    vector<int> temp(right - left + 1);
    int i = left, j = mid + 1, k = 0;

    while (i <= mid && j <= right) {
        temp[k++] = (arr[i] <= arr[j]) ? arr[i++] : arr[j++];
    }
    while (i <= mid) temp[k++] = arr[i++];
    while (j <= right) temp[k++] = arr[j++];

    for (int idx = 0; idx < k; ++idx) {
        arr[left + idx] = temp[idx];
    }
}

void mergeSort(vector<int>& arr, int left, int right) {
    if (left >= right) return;
    int mid = left + (right - left) / 2;
    mergeSort(arr, left, mid);
    mergeSort(arr, mid + 1, right);
    merge(arr, left, mid, right);
}`,
    pythonCode: `def merge_sort(arr: list[int]) -> list[int]:
    if len(arr) <= 1:
        return arr

    mid = len(arr) // 2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])

    return _merge(left, right)


def _merge(left: list[int], right: list[int]) -> list[int]:
    result: list[int] = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1

    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    practiceProblems: [
      {
        title: 'Sort an Array',
        url: 'https://leetcode.com/problems/sort-an-array/',
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
      { platform: 'LEETCODE', label: 'Sorting problems', url: 'https://leetcode.com/tag/sorting/' },
      {
        platform: 'CODEFORCES',
        label: 'Sorting problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=sortings',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['quick-sort'],
  },
  {
    slug: 'quick-sort',
    name: 'Quick Sort',
    categorySlug: 'sorting',
    difficulty: 'MEDIUM',
    summary:
      'An in-place, divide-and-conquer sorting algorithm that partitions around a pivot and recursively sorts each side.',
    introduction:
      'Quick Sort, devised by Tony Hoare in 1959, is the most widely used general-purpose sorting algorithm in practice. Its excellent average-case performance and small memory footprint make it the default choice inside many standard library sort implementations, usually combined with other algorithms for small subarrays or adversarial inputs.',
    problemStatement:
      'Given an array of n comparable elements, rearrange them into non-decreasing order using in-place partitioning.',
    intuition:
      'Pick a pivot element and partition the array so everything smaller than the pivot ends up on its left and everything larger ends up on its right. The pivot is now in its final sorted position. Recursively apply the same process to the left and right partitions until every element is in place.',
    stepByStep: [
      'If the subarray has fewer than 2 elements, it is already sorted.',
      'Choose a pivot element (commonly the last element, or a randomized choice to avoid worst-case behavior).',
      'Partition the subarray so elements less than the pivot come before it and elements greater come after it.',
      'Place the pivot at its correct sorted index, returning that index.',
      'Recursively quicksort the subarray to the left of the pivot index.',
      'Recursively quicksort the subarray to the right of the pivot index.',
    ],
    dryRun:
      'Array: [10, 7, 8, 9, 1, 5], pivot = last element = 5\nPartition step: walk left to right, swap elements < 5 to the front.\n 10 >= 5, skip\n 7 >= 5, skip\n 8 >= 5, skip\n 9 >= 5, skip\n 1 < 5, swap into position -> [1, 7, 8, 9, 10, 5]\nPlace pivot: swap 5 into index 1 -> [1, 5, 8, 9, 10, 7]\nPivot 5 is now at index 1 (final position).\nRecurse left on [1] (already sorted) and right on [8, 9, 10, 7] until fully sorted: [1, 5, 7, 8, 9, 10]',
    timeComplexityBest: 'O(n log n)',
    timeComplexityAverage: 'O(n log n)',
    timeComplexityWorst: 'O(n²)',
    spaceComplexity: 'O(log n)',
    advantages: [
      'Sorts in place, needing only O(log n) auxiliary space for the recursion stack.',
      'Excellent constant factors and cache locality — usually the fastest comparison sort in practice.',
      'Randomized pivot selection makes the worst case practically unreachable for adversarial input.',
    ],
    disadvantages: [
      'Worst-case O(n²) time when the pivot choice is consistently poor (e.g., already-sorted input with a naive last-element pivot).',
      'Not stable — equal elements can be reordered relative to each other.',
      'Recursive depth can degrade to O(n) on pathological input without safeguards like randomization or a hybrid insertion-sort cutoff.',
    ],
    applications: [
      'The default sort in many language runtimes for in-memory arrays (often as introsort, a quicksort/heapsort hybrid).',
      'Finding the k-th smallest/largest element via the related Quickselect algorithm.',
      'Any scenario needing in-place sorting with minimal memory overhead.',
    ],
    commonMistakes: [
      'Always picking the first or last element as the pivot without randomization, which triggers worst-case behavior on sorted or reverse-sorted input.',
      'Off-by-one errors in the partition loop that leave the pivot in the wrong final position.',
      'Forgetting that quicksort is not stable when a stable sort is required by the problem.',
    ],
    visualizationNotes:
      'A visualization should highlight the pivot in a distinct color, animate the two scanning pointers converging during partitioning, and show the pivot "locking" into its final position before recursing into the left and right subarrays.',
    tags: ['sorting', 'divide-and-conquer', 'recursion', 'in-place'],
    cppCode: `#include <vector>
using namespace std;

int partition(vector<int>& arr, int low, int high) {
    int pivot = arr[high];
    int i = low - 1;

    for (int j = low; j < high; ++j) {
        if (arr[j] < pivot) {
            ++i;
            swap(arr[i], arr[j]);
        }
    }
    swap(arr[i + 1], arr[high]);
    return i + 1;
}

void quickSort(vector<int>& arr, int low, int high) {
    if (low >= high) return;
    int pivotIndex = partition(arr, low, high);
    quickSort(arr, low, pivotIndex - 1);
    quickSort(arr, pivotIndex + 1, high);
}`,
    pythonCode: `def quick_sort(arr: list[int], low: int = 0, high: int | None = None) -> list[int]:
    if high is None:
        high = len(arr) - 1

    if low < high:
        pivot_index = _partition(arr, low, high)
        quick_sort(arr, low, pivot_index - 1)
        quick_sort(arr, pivot_index + 1, high)

    return arr


def _partition(arr: list[int], low: int, high: int) -> int:
    pivot = arr[high]
    i = low - 1

    for j in range(low, high):
        if arr[j] < pivot:
            i += 1
            arr[i], arr[j] = arr[j], arr[i]

    arr[i + 1], arr[high] = arr[high], arr[i + 1]
    return i + 1`,
    practiceProblems: [
      {
        title: 'Sort an Array',
        url: 'https://leetcode.com/problems/sort-an-array/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Kth Largest Element in an Array',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Sorting problems', url: 'https://leetcode.com/tag/sorting/' },
      {
        platform: 'CODEFORCES',
        label: 'Sorting problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=sortings',
      },
    ],
    relatedSlugs: ['merge-sort', 'kth-largest-element'],
  },
  {
    slug: 'linear-search',
    name: 'Linear Search',
    categorySlug: 'searching',
    difficulty: 'EASY',
    summary:
      'Sequentially checks every element of a collection until the target is found or the collection is exhausted.',
    introduction:
      'Linear Search is the simplest possible search algorithm and the baseline every other search technique is measured against. It makes no assumptions about the data — it works on unsorted, unordered, or even non-comparable data, as long as elements can be checked for equality.',
    problemStatement:
      'Given an array and a target value, determine whether the target exists in the array and return its index, or indicate that it is not present.',
    intuition:
      "Since the data isn't assumed to be sorted, there is no way to skip regions of the array — every element could be the answer, so every element must be inspected in the worst case. The algorithm simply walks the array once, comparing each element to the target.",
    stepByStep: [
      'Start at index 0.',
      'Compare the current element to the target.',
      'If it matches, return the current index.',
      'Otherwise, move to the next index.',
      'If the end of the array is reached with no match, return -1 (not found).',
    ],
    dryRun:
      'Array: [4, 2, 7, 1, 9], target = 1\ni=0: 4 != 1\ni=1: 2 != 1\ni=2: 7 != 1\ni=3: 1 == 1 -> return 3\nResult: index 3',
    timeComplexityBest: 'O(1)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(1)',
    advantages: [
      'Works on unsorted data with no preprocessing required.',
      'Simple to implement correctly with minimal room for bugs.',
      'Works on any sequential structure, including linked lists, where random access is not available.',
    ],
    disadvantages: [
      'Inefficient for large datasets compared to O(log n) searches on sorted data.',
      'Does not take advantage of any structure or ordering the data might already have.',
    ],
    applications: [
      'Searching small or unsorted collections where the overhead of sorting first is not worth it.',
      'Searching linked lists or streams where random access is impossible.',
      'A fallback correctness baseline when testing more advanced search algorithms.',
    ],
    commonMistakes: [
      'Assuming linear search requires sorted input — it deliberately does not, unlike binary search.',
      'Not handling the "not found" case explicitly, returning an ambiguous sentinel value.',
    ],
    visualizationNotes:
      'A visualization would move a single highlighted cursor left to right across the array, comparing each cell to the target and flashing green on a match or red as it moves past a miss.',
    tags: ['array', 'searching', 'brute-force'],
    cppCode: `#include <vector>
using namespace std;

int linearSearch(const vector<int>& arr, int target) {
    for (size_t i = 0; i < arr.size(); ++i) {
        if (arr[i] == target) {
            return (int)i;
        }
    }
    return -1;
}`,
    pythonCode: `def linear_search(arr: list[int], target: int) -> int:
    for index, value in enumerate(arr):
        if value == target:
            return index
    return -1`,
    practiceProblems: [
      {
        title: 'Find the Index of the First Occurrence in a String',
        url: 'https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Array problems', url: 'https://leetcode.com/tag/array/' },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['binary-search'],
  },
  {
    slug: 'binary-search',
    name: 'Binary Search',
    categorySlug: 'binary-search',
    difficulty: 'EASY',
    summary:
      'Repeatedly halves a sorted search space to locate a target value in logarithmic time.',
    introduction:
      'Binary Search is one of the most important algorithmic building blocks in computer science. By exploiting the fact that the data is sorted, it eliminates half of the remaining candidates with every comparison, turning a linear scan into a logarithmic one.',
    problemStatement:
      'Given a sorted array and a target value, return the index of the target if it exists, or -1 if it does not.',
    intuition:
      "Because the array is sorted, comparing the target to the middle element tells you which half the target must be in (if it exists at all) — there is no need to check the other half. Repeating this halving process shrinks the search space exponentially fast.",
    stepByStep: [
      'Set low = 0 and high = array.length - 1.',
      'While low <= high, compute mid = low + (high - low) / 2.',
      'If arr[mid] equals the target, return mid.',
      'If arr[mid] is less than the target, search the right half by setting low = mid + 1.',
      'If arr[mid] is greater than the target, search the left half by setting high = mid - 1.',
      'If the loop exits without finding the target, return -1.',
    ],
    dryRun:
      'Array: [1, 3, 5, 7, 9, 11], target = 9\nlow=0, high=5, mid=2, arr[2]=5 < 9 -> low=3\nlow=3, high=5, mid=4, arr[4]=9 == 9 -> return 4\nResult: index 4',
    timeComplexityBest: 'O(1)',
    timeComplexityAverage: 'O(log n)',
    timeComplexityWorst: 'O(log n)',
    spaceComplexity: 'O(1)',
    advantages: [
      'Dramatically faster than linear search on large sorted datasets.',
      'Constant extra space with the iterative implementation.',
      'Generalizes to "binary search on the answer" for many optimization problems with a monotonic predicate.',
    ],
    disadvantages: [
      'Requires the data to be sorted beforehand, which costs O(n log n) if it is not already.',
      'Not suitable for data structures without O(1) random access, like plain linked lists.',
    ],
    applications: [
      'Searching sorted arrays and database indexes.',
      'Binary search on the answer for optimization problems (e.g., minimum capacity, maximum minimum distance).',
      "Finding insertion points, and as the core of library functions like C++'s lower_bound/upper_bound.",
    ],
    commonMistakes: [
      'Computing mid as (low + high) / 2, which can overflow for very large indices — low + (high - low) / 2 avoids this.',
      'Using the wrong loop condition (< instead of <=), which can skip the last remaining candidate.',
      'Forgetting to update low or high inside the loop, causing an infinite loop.',
    ],
    visualizationNotes:
      'A visualization should show the low, mid, and high pointers on the array, shading out the eliminated half after each comparison until the target is found or the range is empty.',
    tags: ['array', 'binary-search', 'divide-and-conquer'],
    cppCode: `#include <vector>
using namespace std;

int binarySearch(const vector<int>& arr, int target) {
    int low = 0;
    int high = (int)arr.size() - 1;

    while (low <= high) {
        int mid = low + (high - low) / 2;
        if (arr[mid] == target) {
            return mid;
        } else if (arr[mid] < target) {
            low = mid + 1;
        } else {
            high = mid - 1;
        }
    }

    return -1;
}`,
    pythonCode: `def binary_search(arr: list[int], target: int) -> int:
    low, high = 0, len(arr) - 1

    while low <= high:
        mid = low + (high - low) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1

    return -1`,
    practiceProblems: [
      {
        title: 'Binary Search',
        url: 'https://leetcode.com/problems/binary-search/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: 'Search in Rotated Sorted Array',
        url: 'https://leetcode.com/problems/search-in-rotated-sorted-array/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Find Minimum in Rotated Sorted Array',
        url: 'https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Binary search problems', url: 'https://leetcode.com/tag/binary-search/' },
      {
        platform: 'CODEFORCES',
        label: 'Binary search problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=binary+search',
      },
      { platform: 'ATCODER', label: 'AtCoder contests', url: 'https://atcoder.jp/contests' },
    ],
    relatedSlugs: ['linear-search', 'sparse-table-range-minimum-query'],
  },
  {
    slug: 'container-with-most-water',
    name: 'Container With Most Water (Two Pointers)',
    categorySlug: 'two-pointers',
    difficulty: 'MEDIUM',
    summary:
      'Finds the pair of lines that, together with the x-axis, form the container holding the most water — solved with two inward-moving pointers.',
    introduction:
      'This problem is the flagship example of the two-pointer technique applied to an optimization problem. A brute-force check of every pair of lines takes quadratic time; two pointers starting at each end and moving inward solve it in a single linear pass.',
    problemStatement:
      'Given n non-negative integers representing the heights of vertical lines drawn at each index, find two lines that, together with the x-axis, form a container that holds the most water. Return the maximum area.',
    intuition:
      'The area between two lines is limited by the shorter of the two, multiplied by the distance between them. Starting with the widest possible container (the two ends), moving the pointer at the taller line inward can never increase the area, because width only shrinks and height is still capped by the shorter line. So it is always safe — and necessary to make progress — to move the pointer at the shorter line inward, since that is the only move that could reveal a taller line and a larger area.',
    stepByStep: [
      'Set left = 0 and right = n - 1.',
      'Compute the area as min(height[left], height[right]) * (right - left).',
      'Update the best area seen so far.',
      'Move the pointer pointing at the shorter line inward (left += 1 or right -= 1).',
      'Repeat until left and right meet.',
      'Return the best area found.',
    ],
    dryRun:
      'Heights: [1, 8, 6, 2, 5, 4, 8, 3, 7]\nleft=0(1), right=8(7): area=min(1,7)*8=8, best=8. height[left] shorter -> left=1\nleft=1(8), right=8(7): area=min(8,7)*7=49, best=49. height[right] shorter -> right=7\nleft=1(8), right=7(3): area=min(8,3)*6=18, best=49. height[right] shorter -> right=6\nleft=1(8), right=6(8): area=min(8,8)*5=40, best=49. equal, move either -> right=5\n... continues, best remains 49\nResult: 49',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(1)',
    advantages: [
      'Reduces an O(n²) brute-force pair check to a single O(n) pass.',
      'Constant extra space — only two pointers and a running maximum are needed.',
      'The "move the shorter side" proof generalizes to several other two-pointer optimization problems.',
    ],
    disadvantages: [
      "Relies on a non-obvious greedy proof; it's easy to mis-implement by moving the wrong pointer.",
      'Only applies directly to problems with this specific "maximize width times bounded height" shape.',
    ],
    applications: [
      'Resource allocation problems where a bottleneck resource (the shorter line) determines capacity.',
      'A template for problems like "Trapping Rain Water" and other bounded-area optimization tasks.',
    ],
    commonMistakes: [
      'Moving both pointers simultaneously instead of only the one at the shorter line, which can skip the optimal pair.',
      'Forgetting to update the best area before moving a pointer.',
      'Assuming a brute-force nested loop is required — missing the greedy two-pointer insight entirely.',
    ],
    visualizationNotes:
      'A visualization would draw the height bars, highlight the current left/right lines and the water area between them as a shaded rectangle, and animate the shorter pointer stepping inward each iteration.',
    tags: ['array', 'two-pointers', 'greedy'],
    cppCode: `#include <vector>
#include <algorithm>
using namespace std;

int maxArea(vector<int>& height) {
    int left = 0;
    int right = (int)height.size() - 1;
    int best = 0;

    while (left < right) {
        int area = min(height[left], height[right]) * (right - left);
        best = max(best, area);

        if (height[left] < height[right]) {
            ++left;
        } else {
            --right;
        }
    }

    return best;
}`,
    pythonCode: `def max_area(height: list[int]) -> int:
    left, right = 0, len(height) - 1
    best = 0

    while left < right:
        area = min(height[left], height[right]) * (right - left)
        best = max(best, area)

        if height[left] < height[right]:
            left += 1
        else:
            right -= 1

    return best`,
    practiceProblems: [
      {
        title: 'Container With Most Water',
        url: 'https://leetcode.com/problems/container-with-most-water/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Trapping Rain Water',
        url: 'https://leetcode.com/problems/trapping-rain-water/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
      {
        title: 'Two Sum II - Input Array Is Sorted',
        url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Two pointers problems', url: 'https://leetcode.com/tag/two-pointers/' },
      {
        platform: 'CODEFORCES',
        label: 'Two pointers problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=two+pointers',
      },
    ],
    relatedSlugs: ['longest-substring-without-repeating-characters', 'two-sum'],
  },
  {
    slug: 'sliding-window-maximum',
    name: 'Sliding Window Maximum',
    categorySlug: 'sliding-window',
    difficulty: 'HARD',
    summary:
      'Finds the maximum of every fixed-size contiguous window in an array in linear time using a monotonic deque.',
    introduction:
      "This problem is the definitive example of the monotonic deque technique. A naive solution recomputes the maximum for every window in O(k), giving O(n·k) overall. A deque that only ever stores indices of potentially-maximal, decreasing elements brings this down to O(n).",
    problemStatement:
      'Given an array and a window size k, return an array of the maximum values of every contiguous window of size k as it slides from the start to the end of the array.',
    intuition:
      "Keep a deque of indices whose corresponding values are in decreasing order from front to back. The front of the deque is always the index of the maximum in the current window. Before adding a new index, pop from the back any indices whose values are smaller than the new value — they can never be the maximum again while the new, larger, later element remains in the window. Also pop from the front any index that has fallen outside the current window.",
    stepByStep: [
      'Initialize an empty deque that will store array indices.',
      'For each index i in the array:',
      'While the deque is not empty and arr[deque.back()] <= arr[i], pop from the back.',
      'Push i onto the back of the deque.',
      'If the front index is out of the current window (deque.front() <= i - k), pop from the front.',
      'Once i >= k - 1, the front of the deque is the maximum of the current window — record it.',
    ],
    dryRun:
      'Array: [1,3,-1,-3,5,3,6,7], k=3\ni=0(1): deque=[0]\ni=1(3): pop 0 (1<=3), deque=[1]\ni=2(-1): deque=[1,2]. window ready. max=arr[1]=3\ni=3(-3): deque=[1,2,3]. front 1 still in window (3-3=0 <=1? no pop needed while 1>0). max=arr[1]=3\ni=4(5): pop 3(-3<=5), pop 2(-1<=5), pop 1(3<=5), deque=[4]. front check: 4-3=1, front(4)>1 ok. max=arr[4]=5\ni=5(3): deque=[4,5]. front 4 > 5-3=2 ok. max=arr[4]=5\ni=6(6): pop 5(3<=6), pop 4(5<=6), deque=[6]. max=arr[6]=6\ni=7(7): pop 6(6<=7), deque=[7]. max=arr[7]=7\nResult: [3,3,5,5,6,7]',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(k)',
    advantages: [
      'Each index is pushed and popped from the deque at most once, giving amortized O(1) work per element.',
      'Far faster than the O(n·k) brute-force recomputation approach.',
      'The monotonic deque pattern generalizes to many "sliding window extremum" problems.',
    ],
    disadvantages: [
      'The deque-of-indices logic is significantly harder to reason about and implement correctly than simpler sliding window problems.',
      'Uses O(k) auxiliary space for the deque, unlike O(1) sliding window sum problems.',
    ],
    applications: [
      'Real-time analytics — maximum value in the last N events of a stream.',
      'Image processing — max/min filters over a sliding kernel.',
      'Stock trading — running maximum price over the last N ticks.',
    ],
    commonMistakes: [
      'Storing values instead of indices in the deque, which makes it impossible to detect when the maximum has expired from the window.',
      'Forgetting to evict expired indices from the front before reading the current maximum.',
      'Using a plain priority queue without lazy deletion, which does not correctly handle window expiry either.',
    ],
    visualizationNotes:
      'A visualization would show the array with the current window highlighted, the deque rendered as a horizontal strip of index bubbles, and animations for push-back, pop-back, and pop-front operations as the window slides.',
    tags: ['array', 'sliding-window', 'deque', 'monotonic-stack'],
    cppCode: `#include <vector>
#include <deque>
using namespace std;

vector<int> maxSlidingWindow(vector<int>& nums, int k) {
    deque<int> dq; // stores indices, values decreasing front-to-back
    vector<int> result;

    for (int i = 0; i < (int)nums.size(); ++i) {
        while (!dq.empty() && nums[dq.back()] <= nums[i]) {
            dq.pop_back();
        }
        dq.push_back(i);

        if (dq.front() <= i - k) {
            dq.pop_front();
        }

        if (i >= k - 1) {
            result.push_back(nums[dq.front()]);
        }
    }

    return result;
}`,
    pythonCode: `from collections import deque


def max_sliding_window(nums: list[int], k: int) -> list[int]:
    dq: deque[int] = deque()  # stores indices, values decreasing front-to-back
    result: list[int] = []

    for i, num in enumerate(nums):
        while dq and nums[dq[-1]] <= num:
            dq.pop()
        dq.append(i)

        if dq[0] <= i - k:
            dq.popleft()

        if i >= k - 1:
            result.append(nums[dq[0]])

    return result`,
    practiceProblems: [
      {
        title: 'Sliding Window Maximum',
        url: 'https://leetcode.com/problems/sliding-window-maximum/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
      {
        title: 'Sliding Window Median',
        url: 'https://leetcode.com/problems/sliding-window-median/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Sliding window problems', url: 'https://leetcode.com/tag/sliding-window/' },
      {
        platform: 'CODEFORCES',
        label: 'Data structures problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=data+structures',
      },
    ],
    relatedSlugs: ['kadanes-algorithm', 'longest-substring-without-repeating-characters'],
  },
];
