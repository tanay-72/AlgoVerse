import type { AlgorithmSeed } from './types';

export const algorithmsBatch2: AlgorithmSeed[] = [
  {
    slug: 'valid-parentheses',
    name: 'Valid Parentheses (Stack-Based Matching)',
    categorySlug: 'stack',
    difficulty: 'EASY',
    summary:
      'Uses a stack to verify that every bracket in a string is properly opened, closed, and nested.',
    introduction:
      'Valid Parentheses is the canonical introduction to using a stack for matching nested structures. The same core idea powers compilers checking balanced braces, HTML/XML tag validators, and expression parsers.',
    problemStatement:
      "Given a string containing only the characters '(', ')', '{', '}', '[' and ']', determine if the input string is valid. A string is valid if every opening bracket is closed by the same type of bracket, and brackets are closed in the correct order.",
    intuition:
      'Every closing bracket must match the most recently opened, still-unclosed bracket — a last-in-first-out relationship, which is exactly what a stack models. Push opening brackets as they appear; when a closing bracket appears, it must match the bracket on top of the stack, or the string is invalid.',
    stepByStep: [
      'Create an empty stack and a map of closing brackets to their matching opening brackets.',
      'Iterate through each character in the string.',
      'If the character is an opening bracket, push it onto the stack.',
      'If it is a closing bracket, check whether the stack is non-empty and its top matches the expected opening bracket; if not, the string is invalid.',
      'Pop the stack when a match is found.',
      'After processing all characters, the string is valid only if the stack is empty.',
    ],
    dryRun:
      'String: "{[()]}"\n\'{\' -> push -> stack=[{]\n\'[\' -> push -> stack=[{,[]\n\'(\' -> push -> stack=[{,[,(]\n\')\' -> matches top \'(\' -> pop -> stack=[{,[]\n\']\' -> matches top \'[\' -> pop -> stack=[{]\n\'}\' -> matches top \'{\' -> pop -> stack=[]\nEnd of string, stack empty -> valid',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(n)',
    advantages: [
      'Single pass through the string with O(1) work per character.',
      'Trivially extends to validating any set of paired delimiters.',
      'Simple, well-understood pattern that is easy to test exhaustively.',
    ],
    disadvantages: [
      'Uses O(n) space in the worst case of an all-opening-bracket string.',
      'Only validates matching/nesting — it does not parse or evaluate the expression content itself.',
    ],
    applications: [
      'Syntax validation in compilers and interpreters for balanced braces/parentheses.',
      'Validating balanced tags in HTML/XML documents.',
      'Expression evaluators and calculators that need to check well-formedness before evaluating.',
    ],
    commonMistakes: [
      'Forgetting to check that the stack is non-empty before popping on a closing bracket, causing a crash on inputs like ")".',
      'Not verifying the stack is empty at the very end — a string like "(" is invalid but has no closing bracket to catch it.',
      'Mixing up the map direction (opening-to-closing versus closing-to-opening), leading to incorrect matches.',
    ],
    visualizationNotes:
      'A visualization would render the stack as a vertical column of bracket tiles, pushing new tiles on top as opening brackets are read and animating a pop-and-match flash when a closing bracket resolves.',
    tags: ['stack', 'string', 'parsing'],
    cppCode: `#include <string>
#include <stack>
#include <unordered_map>
using namespace std;

bool isValid(const string& s) {
    stack<char> stk;
    unordered_map<char, char> pairs = {{')', '('}, {']', '['}, {'}', '{'}};

    for (char c : s) {
        if (c == '(' || c == '[' || c == '{') {
            stk.push(c);
        } else {
            if (stk.empty() || stk.top() != pairs[c]) {
                return false;
            }
            stk.pop();
        }
    }

    return stk.empty();
}`,
    pythonCode: `def is_valid(s: str) -> bool:
    stack: list[str] = []
    pairs = {')': '(', ']': '[', '}': '{'}

    for char in s:
        if char in '([{':
            stack.append(char)
        else:
            if not stack or stack[-1] != pairs[char]:
                return False
            stack.pop()

    return not stack`,
    practiceProblems: [
      {
        title: 'Valid Parentheses',
        url: 'https://leetcode.com/problems/valid-parentheses/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: 'Generate Parentheses',
        url: 'https://leetcode.com/problems/generate-parentheses/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Minimum Remove to Make Valid Parentheses',
        url: 'https://leetcode.com/problems/minimum-remove-to-make-valid-parentheses/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Stack problems', url: 'https://leetcode.com/tag/stack/' },
      {
        platform: 'CODEFORCES',
        label: 'Data structures problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=data+structures',
      },
    ],
    relatedSlugs: ['circular-queue'],
  },
  {
    slug: 'circular-queue',
    name: 'Circular Queue (Array-Based FIFO)',
    categorySlug: 'queue',
    difficulty: 'MEDIUM',
    summary:
      'Implements a fixed-capacity FIFO queue over an array by wrapping the front and rear pointers around the buffer.',
    introduction:
      'A naive array-based queue wastes space: once you dequeue from the front, that slot is never reused, so the queue silently "leaks" capacity. A circular queue solves this by wrapping the front and rear pointers back to index 0 once they reach the end of the buffer, making full use of fixed, pre-allocated memory.',
    problemStatement:
      'Design a fixed-size queue supporting enqueue, dequeue, front, rear, isEmpty, and isFull operations, all in O(1) time, using a single fixed-size array as backing storage.',
    intuition:
      "Track a front index, a rear index, and a count of current elements. Enqueue writes at rear and advances rear with wraparound (rear = (rear + 1) % capacity); dequeue reads at front and advances front the same way. The count is what distinguishes a full queue from an empty one, since both can have front == rear.",
    stepByStep: [
      'Initialize an array of fixed capacity, front = 0, rear = -1, and count = 0.',
      'To enqueue: if count == capacity, the queue is full — reject. Otherwise, rear = (rear + 1) % capacity, write the value at buffer[rear], and increment count.',
      'To dequeue: if count == 0, the queue is empty — reject. Otherwise, read buffer[front], set front = (front + 1) % capacity, and decrement count.',
      'front() returns buffer[front] when count > 0.',
      'rear() returns buffer[rear] when count > 0.',
      'isEmpty() returns count == 0; isFull() returns count == capacity.',
    ],
    dryRun:
      'Capacity 4, initial front=0, rear=-1, count=0\nenqueue(1): rear=0, buffer=[1,_,_,_], count=1\nenqueue(2): rear=1, buffer=[1,2,_,_], count=2\nenqueue(3): rear=2, buffer=[1,2,3,_], count=3\ndequeue(): reads 1, front=1, count=2\nenqueue(4): rear=3, buffer=[1,2,3,4], count=3\nenqueue(5): rear=(3+1)%4=0, buffer=[5,2,3,4], count=4 (wrapped around)\nisFull(): true',
    timeComplexityBest: 'O(1)',
    timeComplexityAverage: 'O(1)',
    timeComplexityWorst: 'O(1)',
    spaceComplexity: 'O(capacity)',
    advantages: [
      'Every operation runs in true O(1) time with no amortized shifting.',
      'Reuses freed slots instead of wasting array space after dequeues, unlike a naive front-index-only array queue.',
      'Predictable, fixed memory footprint — useful in embedded or real-time systems.',
    ],
    disadvantages: [
      'Fixed capacity must be chosen upfront; growing it requires reallocating and copying the buffer.',
      'Slightly more complex index arithmetic than a simple dynamic-array queue.',
    ],
    applications: [
      'Circular buffers in producer-consumer systems, such as audio/video streaming pipelines.',
      'CPU task scheduling ring buffers.',
      'Breadth-first search implementations that need a bounded, high-performance queue.',
    ],
    commonMistakes: [
      "Distinguishing full from empty using only front == rear, which is ambiguous — an explicit count (or sacrificing one slot) is required.",
      'Forgetting the modulo wraparound when advancing front or rear, which causes an out-of-bounds write.',
      'Not checking isFull()/isEmpty() before enqueue/dequeue, silently corrupting the buffer.',
    ],
    visualizationNotes:
      'A visualization would render the buffer as a ring of slots, animating front and rear pointer arrows moving clockwise around the ring as elements are enqueued and dequeued, with wraparound highlighted distinctly.',
    tags: ['queue', 'array', 'design'],
    cppCode: `#include <vector>
using namespace std;

class CircularQueue {
public:
    explicit CircularQueue(int capacity)
        : buffer(capacity), capacity(capacity), front(0), rear(-1), count(0) {}

    bool enqueue(int value) {
        if (isFull()) return false;
        rear = (rear + 1) % capacity;
        buffer[rear] = value;
        ++count;
        return true;
    }

    bool dequeue() {
        if (isEmpty()) return false;
        front = (front + 1) % capacity;
        --count;
        return true;
    }

    int Front() const { return isEmpty() ? -1 : buffer[front]; }
    int Rear() const { return isEmpty() ? -1 : buffer[rear]; }
    bool isEmpty() const { return count == 0; }
    bool isFull() const { return count == capacity; }

private:
    vector<int> buffer;
    int capacity;
    int front;
    int rear;
    int count;
};`,
    pythonCode: `class CircularQueue:
    def __init__(self, capacity: int) -> None:
        self.buffer: list[int] = [0] * capacity
        self.capacity = capacity
        self.front = 0
        self.rear = -1
        self.count = 0

    def enqueue(self, value: int) -> bool:
        if self.is_full():
            return False
        self.rear = (self.rear + 1) % self.capacity
        self.buffer[self.rear] = value
        self.count += 1
        return True

    def dequeue(self) -> bool:
        if self.is_empty():
            return False
        self.front = (self.front + 1) % self.capacity
        self.count -= 1
        return True

    def get_front(self) -> int:
        return -1 if self.is_empty() else self.buffer[self.front]

    def get_rear(self) -> int:
        return -1 if self.is_empty() else self.buffer[self.rear]

    def is_empty(self) -> bool:
        return self.count == 0

    def is_full(self) -> bool:
        return self.count == self.capacity`,
    practiceProblems: [
      {
        title: 'Design Circular Queue',
        url: 'https://leetcode.com/problems/design-circular-queue/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Design Circular Deque',
        url: 'https://leetcode.com/problems/design-circular-deque/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Design problems', url: 'https://leetcode.com/tag/design/' },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['valid-parentheses', 'breadth-first-search'],
  },
  {
    slug: 'reverse-linked-list',
    name: 'Reverse a Linked List',
    categorySlug: 'linked-list',
    difficulty: 'EASY',
    summary:
      'Reverses the direction of every pointer in a singly linked list in a single pass, using no extra data structure.',
    introduction:
      'Reversing a linked list is a foundational exercise that builds intuition for pointer manipulation without array-style random access. It appears, directly or as a subroutine, in many harder linked-list problems such as reversing sublists or detecting palindromic lists.',
    problemStatement:
      'Given the head of a singly linked list, reverse the list in place and return the new head.',
    intuition:
      "Walking the list once, each node's `next` pointer needs to be flipped to point at the previous node instead of the next one. This requires tracking three references as you go: the previous node, the current node, and the next node (saved before the pointer is overwritten, since the original next pointer is about to be destroyed).",
    stepByStep: [
      'Initialize prev = null and current = head.',
      'While current is not null:',
      'Save nextNode = current.next before it gets overwritten.',
      'Set current.next = prev, reversing this node\'s pointer.',
      'Advance prev = current and current = nextNode.',
      'When the loop ends, prev is the new head of the reversed list.',
    ],
    dryRun:
      'List: 1 -> 2 -> 3 -> null\nprev=null, current=1\n  next=2, 1.next=null, prev=1, current=2\nprev=1, current=2\n  next=3, 2.next=1, prev=2, current=3\nprev=2, current=3\n  next=null, 3.next=2, prev=3, current=null\nLoop ends. New head = 3.\nResult: 3 -> 2 -> 1 -> null',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(1)',
    advantages: [
      'In-place — requires no additional array or list, just three pointer variables.',
      'Single pass through the list.',
      'The same three-pointer pattern extends directly to reversing sublists or groups of k nodes.',
    ],
    disadvantages: [
      'The iterative version is easy to get right, but a naive recursive version uses O(n) call-stack space.',
      'Destructive — the original list structure is lost unless a copy is made first.',
    ],
    applications: [
      'Reversing part of a list for problems like "Reverse Linked List II" or "Reverse Nodes in k-Group".',
      'Checking whether a linked list is a palindrome by reversing the second half.',
      'Undo/redo style operations where traversal direction needs to be flipped without copying data.',
    ],
    commonMistakes: [
      "Overwriting current.next before saving it to nextNode, which loses the rest of the list permanently.",
      'Forgetting to return the new head (prev), and mistakenly returning the original head instead.',
      'Off-by-one errors in the loop condition, stopping one node early or looping past null.',
    ],
    visualizationNotes:
      'A visualization would show the linked list as connected boxes with arrows, animating each arrow flipping direction as prev, current, and next slide forward through the list.',
    tags: ['linked-list', 'pointers', 'recursion'],
    cppCode: `struct ListNode {
    int val;
    ListNode* next;
    ListNode(int x) : val(x), next(nullptr) {}
};

ListNode* reverseList(ListNode* head) {
    ListNode* prev = nullptr;
    ListNode* current = head;

    while (current != nullptr) {
        ListNode* nextNode = current->next;
        current->next = prev;
        prev = current;
        current = nextNode;
    }

    return prev;
}`,
    pythonCode: `class ListNode:
    def __init__(self, val: int = 0, next: 'ListNode | None' = None) -> None:
        self.val = val
        self.next = next


def reverse_list(head: ListNode | None) -> ListNode | None:
    prev: ListNode | None = None
    current = head

    while current is not None:
        next_node = current.next
        current.next = prev
        prev = current
        current = next_node

    return prev`,
    practiceProblems: [
      {
        title: 'Reverse Linked List',
        url: 'https://leetcode.com/problems/reverse-linked-list/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: 'Reverse Linked List II',
        url: 'https://leetcode.com/problems/reverse-linked-list-ii/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Reverse Nodes in k-Group',
        url: 'https://leetcode.com/problems/reverse-nodes-in-k-group/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Linked list problems', url: 'https://leetcode.com/tag/linked-list/' },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: [],
  },
  {
    slug: 'two-sum',
    name: 'Two Sum (Hash Map Lookup)',
    categorySlug: 'hashing',
    difficulty: 'EASY',
    summary:
      'Finds two numbers in an array that add up to a target sum in a single pass using a hash map of complements.',
    introduction:
      'Two Sum is one of the most recognizable interview problems, and it is the clearest possible demonstration of trading space for time via hashing: a brute-force O(n²) pair check collapses to O(n) once you realize you only need to remember what you have already seen.',
    problemStatement:
      'Given an array of integers and a target value, return the indices of the two numbers that add up to the target. Each input has exactly one valid answer, and the same element may not be used twice.',
    intuition:
      'For each number, the only thing that matters is whether its complement (target - number) has already been seen. Storing every visited number and its index in a hash map means that complement lookup is O(1), so the whole array only needs to be scanned once.',
    stepByStep: [
      'Create an empty hash map from value to index.',
      'Iterate through the array with index i and value num.',
      'Compute complement = target - num.',
      'If complement exists in the hash map, return [map[complement], i].',
      'Otherwise, insert num -> i into the hash map and continue.',
    ],
    dryRun:
      'Array: [2, 7, 11, 15], target = 9\ni=0, num=2, complement=7, not in map -> map={2:0}\ni=1, num=7, complement=2, found at index 0 -> return [0, 1]\nResult: [0, 1] (2 + 7 = 9)',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(n)',
    advantages: [
      'Single pass through the array with O(1) average lookup per element.',
      'Straightforward to extend to variants like "closest to target" or counting pairs instead of returning indices.',
      'Much faster in practice than the brute-force O(n²) nested loop.',
    ],
    disadvantages: [
      'Uses O(n) additional memory for the hash map, unlike the O(1)-space two-pointer approach usable when the array is already sorted.',
      'Hash map operations are only average-case O(1); adversarial hash collisions can degrade this, though practically negligible with good hash functions.',
    ],
    applications: [
      'The base pattern for k-sum family problems (3Sum, 4Sum) after fixing the first one or two elements.',
      'Detecting complementary pairs in financial transaction analysis (e.g., matching debits and credits).',
      'General "have I seen the complement of this value" problems across many domains.',
    ],
    commonMistakes: [
      'Checking the hash map for the complement before inserting the current number, and then accidentally allowing a number to pair with itself, e.g. target=4 with a single 2 in the array — inserting first would incorrectly match.',
      'Returning values instead of indices, or vice versa, depending on what the problem actually asks for.',
      'Using a nested loop first without recognizing the O(n) hashing approach exists.',
    ],
    visualizationNotes:
      'A visualization would show the array being scanned left to right, with a live-updating hash map panel showing entries as they are added, and a highlight/connection line drawn the moment a complement match is found.',
    tags: ['array', 'hash-table', 'hashing'],
    cppCode: `#include <vector>
#include <unordered_map>
using namespace std;

vector<int> twoSum(vector<int>& nums, int target) {
    unordered_map<int, int> seen; // value -> index

    for (int i = 0; i < (int)nums.size(); ++i) {
        int complement = target - nums[i];
        auto it = seen.find(complement);
        if (it != seen.end()) {
            return {it->second, i};
        }
        seen[nums[i]] = i;
    }

    return {};
}`,
    pythonCode: `def two_sum(nums: list[int], target: int) -> list[int]:
    seen: dict[int, int] = {}

    for i, num in enumerate(nums):
        complement = target - num
        if complement in seen:
            return [seen[complement], i]
        seen[num] = i

    return []`,
    practiceProblems: [
      {
        title: 'Two Sum',
        url: 'https://leetcode.com/problems/two-sum/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
      {
        title: '3Sum',
        url: 'https://leetcode.com/problems/3sum/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Two Sum II - Input Array Is Sorted',
        url: 'https://leetcode.com/problems/two-sum-ii-input-array-is-sorted/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Hash table problems', url: 'https://leetcode.com/tag/hash-table/' },
      {
        platform: 'CODEFORCES',
        label: 'Hashing problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=hashing',
      },
    ],
    relatedSlugs: ['container-with-most-water'],
  },
  {
    slug: 'binary-tree-level-order-traversal',
    name: 'Binary Tree Level Order Traversal (BFS)',
    categorySlug: 'trees',
    difficulty: 'MEDIUM',
    summary:
      'Visits a binary tree level by level, left to right, using a queue to process nodes in breadth-first order.',
    introduction:
      "Level order traversal is the tree-specific application of breadth-first search. Unlike depth-first traversals (preorder, inorder, postorder) which dive deep before backtracking, level order visits every node at the current depth before moving to the next depth — the natural way to print a tree row by row.",
    problemStatement:
      'Given the root of a binary tree, return the values of its nodes grouped by level, from top to bottom, left to right within each level.',
    intuition:
      'A queue naturally preserves the order in which nodes were discovered. Starting with the root in the queue, repeatedly dequeue a node, record its value, and enqueue its children. To group nodes by level, snapshot the current queue size before processing each level, and process exactly that many nodes before moving to the next level.',
    stepByStep: [
      'If the root is null, return an empty result.',
      'Initialize a queue containing just the root.',
      'While the queue is not empty:',
      'Record levelSize = current queue length.',
      'Create an empty list for the current level.',
      'Dequeue exactly levelSize nodes, appending each value to the level list and enqueueing any non-null children.',
      'Append the completed level list to the result.',
    ],
    dryRun:
      'Tree:\n      3\n     / \\\n    9   20\n       /  \\\n      15   7\n\nqueue=[3]\nLevel 1: levelSize=1, dequeue 3, enqueue 9,20 -> level=[3]\nqueue=[9,20]\nLevel 2: levelSize=2, dequeue 9 (no children), dequeue 20, enqueue 15,7 -> level=[9,20]\nqueue=[15,7]\nLevel 3: levelSize=2, dequeue 15, dequeue 7 (no children) -> level=[15,7]\nResult: [[3],[9,20],[15,7]]',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(n)',
    advantages: [
      'Every node is visited and enqueued exactly once, giving linear time.',
      'Naturally produces level-grouped output without extra depth tracking.',
      'The queue-based pattern generalizes directly to graph BFS.',
    ],
    disadvantages: [
      'Requires O(n) space for the queue in the worst case (a tree that is very wide, e.g. a complete binary tree\'s last level holds about n/2 nodes).',
      'Not suitable when depth-first ordering (e.g., for expression evaluation) is what the problem actually needs.',
    ],
    applications: [
      'Serializing/printing a tree in a human-readable, row-by-row format.',
      'Finding the minimum depth of a tree, or the rightmost/leftmost node at each level.',
      'The direct template for shortest-path BFS on unweighted graphs.',
    ],
    commonMistakes: [
      'Forgetting to snapshot the level size before the inner loop, which merges nodes from different levels together.',
      'Enqueuing null children, which then crash or corrupt subsequent processing if not filtered out.',
      'Confusing level order (BFS, using a queue) with preorder/postorder (DFS, using recursion or a stack).',
    ],
    visualizationNotes:
      'A visualization would render the tree with each depth level highlighted in a distinct color band, animating a queue at the bottom of the screen as nodes are dequeued and their children enqueued.',
    tags: ['tree', 'breadth-first-search', 'queue', 'binary-tree'],
    cppCode: `#include <vector>
#include <queue>
using namespace std;

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

vector<vector<int>> levelOrder(TreeNode* root) {
    vector<vector<int>> result;
    if (root == nullptr) return result;

    queue<TreeNode*> q;
    q.push(root);

    while (!q.empty()) {
        int levelSize = (int)q.size();
        vector<int> level;

        for (int i = 0; i < levelSize; ++i) {
            TreeNode* node = q.front();
            q.pop();
            level.push_back(node->val);

            if (node->left) q.push(node->left);
            if (node->right) q.push(node->right);
        }

        result.push_back(level);
    }

    return result;
}`,
    pythonCode: `from collections import deque


class TreeNode:
    def __init__(self, val: int = 0, left: 'TreeNode | None' = None, right: 'TreeNode | None' = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def level_order(root: TreeNode | None) -> list[list[int]]:
    if root is None:
        return []

    result: list[list[int]] = []
    queue: deque[TreeNode] = deque([root])

    while queue:
        level_size = len(queue)
        level: list[int] = []

        for _ in range(level_size):
            node = queue.popleft()
            level.append(node.val)

            if node.left:
                queue.append(node.left)
            if node.right:
                queue.append(node.right)

        result.append(level)

    return result`,
    practiceProblems: [
      {
        title: 'Binary Tree Level Order Traversal',
        url: 'https://leetcode.com/problems/binary-tree-level-order-traversal/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Binary Tree Zigzag Level Order Traversal',
        url: 'https://leetcode.com/problems/binary-tree-zigzag-level-order-traversal/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Minimum Depth of Binary Tree',
        url: 'https://leetcode.com/problems/minimum-depth-of-binary-tree/',
        platform: 'LEETCODE',
        difficulty: 'EASY',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Tree problems', url: 'https://leetcode.com/tag/tree/' },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['breadth-first-search', 'validate-binary-search-tree'],
  },
  {
    slug: 'validate-binary-search-tree',
    name: 'Validate Binary Search Tree',
    categorySlug: 'bst',
    difficulty: 'MEDIUM',
    summary:
      'Checks whether a binary tree satisfies the BST invariant by carrying valid (min, max) bounds down through recursion.',
    introduction:
      'A common mistake when validating a BST is checking only that each node is greater than its left child and less than its right child. That local check is insufficient — every node must respect the bounds imposed by all of its ancestors, not just its immediate parent.',
    problemStatement:
      "Given the root of a binary tree, determine whether it is a valid binary search tree: for every node, all values in its left subtree must be strictly less than the node's value, and all values in its right subtree must be strictly greater.",
    intuition:
      'As the recursion descends, each node further constrains the valid range for its descendants. The root has no bound (-infinity, +infinity). Going into a left child tightens the upper bound to the parent\'s value; going into a right child tightens the lower bound. If any node falls outside its inherited (min, max) range, the tree is invalid.',
    stepByStep: [
      'Define a recursive helper that takes a node and a valid (lowerBound, upperBound) range.',
      'If the node is null, it is trivially valid — return true.',
      "If the node's value is not strictly within (lowerBound, upperBound), return false.",
      'Recurse into the left child with the range (lowerBound, node.value).',
      'Recurse into the right child with the range (node.value, upperBound).',
      'The tree is valid only if both recursive calls return true.',
    ],
    dryRun:
      'Tree:\n      5\n     / \\\n    1   8\n       /  \\\n      6    9\n\nvalidate(5, (-inf, inf)): 5 in range, ok\n  validate(1, (-inf, 5)): 1 in range, ok, no children -> true\n  validate(8, (5, inf)): 8 in range, ok\n    validate(6, (5, 8)): 6 in range, ok -> true\n    validate(9, (8, inf)): 9 in range, ok -> true\nAll checks pass -> valid BST',
    timeComplexityBest: 'O(n)',
    timeComplexityAverage: 'O(n)',
    timeComplexityWorst: 'O(n)',
    spaceComplexity: 'O(h)',
    advantages: [
      'Visits every node exactly once, giving linear time regardless of tree shape.',
      'Correctly propagates ancestor constraints instead of only checking immediate parent-child relationships.',
      'The same bounds-passing pattern is reusable for many other constrained-tree validation problems.',
    ],
    disadvantages: [
      'Recursive implementation uses O(h) stack space, which becomes O(n) for a degenerate, skewed tree.',
      'Requires careful handling of integer boundary values (e.g., using nullable/optional bounds instead of sentinel integers to avoid overflow issues).',
    ],
    applications: [
      'Verifying the integrity of a BST-based index or database structure after modifications.',
      'A subroutine in problems like "Recover Binary Search Tree" that need to detect and fix BST violations.',
      'Teaching the general "carry constraints down the recursion" technique used in many tree DP problems.',
    ],
    commonMistakes: [
      "Checking only node.left.val < node.val < node.right.val locally, which misses violations from higher up the tree.",
      'Using inclusive bounds instead of strict inequality, which incorrectly accepts trees with duplicate values.',
      'Using sentinel integer values like INT_MIN/INT_MAX for bounds without accounting for a node whose value equals the sentinel.',
    ],
    visualizationNotes:
      'A visualization would show the tree with each node annotated by its currently valid (min, max) range, updating and narrowing as the traversal descends, and flashing red on the node that violates its bounds.',
    tags: ['tree', 'binary-search-tree', 'recursion', 'depth-first-search'],
    cppCode: `#include <climits>

struct TreeNode {
    int val;
    TreeNode* left;
    TreeNode* right;
    TreeNode(int x) : val(x), left(nullptr), right(nullptr) {}
};

bool validate(TreeNode* node, long long lower, long long upper) {
    if (node == nullptr) return true;
    if (node->val <= lower || node->val >= upper) return false;

    return validate(node->left, lower, node->val) &&
           validate(node->right, node->val, upper);
}

bool isValidBST(TreeNode* root) {
    return validate(root, LLONG_MIN, LLONG_MAX);
}`,
    pythonCode: `class TreeNode:
    def __init__(self, val: int = 0, left: 'TreeNode | None' = None, right: 'TreeNode | None' = None) -> None:
        self.val = val
        self.left = left
        self.right = right


def is_valid_bst(root: TreeNode | None) -> bool:
    def validate(node: TreeNode | None, lower: float, upper: float) -> bool:
        if node is None:
            return True
        if not (lower < node.val < upper):
            return False
        return validate(node.left, lower, node.val) and validate(node.right, node.val, upper)

    return validate(root, float('-inf'), float('inf'))`,
    practiceProblems: [
      {
        title: 'Validate Binary Search Tree',
        url: 'https://leetcode.com/problems/validate-binary-search-tree/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Recover Binary Search Tree',
        url: 'https://leetcode.com/problems/recover-binary-search-tree/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Insert into a Binary Search Tree',
        url: 'https://leetcode.com/problems/insert-into-a-binary-search-tree/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Binary search tree problems', url: 'https://leetcode.com/tag/binary-search-tree/' },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['binary-tree-level-order-traversal', 'binary-search'],
  },
  {
    slug: 'kth-largest-element',
    name: 'Kth Largest Element (Min-Heap)',
    categorySlug: 'heap',
    difficulty: 'MEDIUM',
    summary:
      'Finds the k-th largest element in an unsorted array by maintaining a min-heap of size k.',
    introduction:
      'This problem showcases why a heap is often the right tool when you only need the "top k" of something rather than a full sort. Fully sorting the array costs O(n log n); a fixed-size min-heap approach costs only O(n log k).',
    problemStatement:
      'Given an unsorted array of integers and an integer k, find the k-th largest element in the array.',
    intuition:
      "Maintain a min-heap that holds at most k elements — the k largest seen so far. As each new number arrives, push it onto the heap. If the heap grows beyond size k, pop the minimum, since it cannot be among the k largest once k+1 candidates are present. After processing every element, the smallest element remaining in the heap — its root — is exactly the k-th largest overall.",
    stepByStep: [
      'Initialize an empty min-heap.',
      'For each number in the array, push it onto the heap.',
      'If the heap size exceeds k, pop the minimum element.',
      'After processing all numbers, the heap contains exactly the k largest elements.',
      "The root of the min-heap is the k-th largest element — return it.",
    ],
    dryRun:
      'Array: [3, 2, 1, 5, 6, 4], k=2\npush 3 -> heap=[3]\npush 2 -> heap=[2,3]\npop min if size>2: size=2, no pop\npush 1 -> heap=[1,2,3], size=3>2 -> pop min(1) -> heap=[2,3]\npush 5 -> heap=[2,3,5], size=3>2 -> pop min(2) -> heap=[3,5]\npush 6 -> heap=[3,5,6], size=3>2 -> pop min(3) -> heap=[5,6]\npush 4 -> heap=[4,5,6], size=3>2 -> pop min(4) -> heap=[5,6]\nRoot of heap = 5\nResult: 5 (the 2nd largest element)',
    timeComplexityBest: 'O(n log k)',
    timeComplexityAverage: 'O(n log k)',
    timeComplexityWorst: 'O(n log k)',
    spaceComplexity: 'O(k)',
    advantages: [
      'Avoids fully sorting the array, which is wasteful when only the top k elements matter.',
      'Uses only O(k) memory regardless of how large the input array is.',
      'The same "bounded min-heap" pattern solves "k closest points", "top k frequent elements", and similar problems.',
    ],
    disadvantages: [
      'Slower than a full sort or Quickselect when k is close to n, since log k approaches log n.',
      'A heap-based approach only gives O(n log k) average performance; Quickselect achieves O(n) average time for a single query, though it is not incremental like a heap is for streaming data.',
    ],
    applications: [
      'Streaming "top k" leaderboards where new scores arrive continuously.',
      'Finding the k closest points to the origin, or k most frequent elements in a dataset.',
      "A building block of priority-based task schedulers.",
    ],
    commonMistakes: [
      'Using a max-heap instead of a min-heap, which is a common reflex mistake — the min-heap is what lets you cheaply evict the smallest of the current top-k candidates.',
      'Forgetting to pop when the heap exceeds size k, causing it to grow unbounded and defeating the purpose of the technique.',
      'Off-by-one errors confusing k-th largest with k-th smallest, or 0-indexed versus 1-indexed k.',
    ],
    visualizationNotes:
      'A visualization would render the heap as a binary tree, animating new elements bubbling up on insertion and the root popping and re-heapifying whenever the heap exceeds size k.',
    tags: ['heap', 'priority-queue', 'array'],
    cppCode: `#include <vector>
#include <queue>
using namespace std;

int findKthLargest(vector<int>& nums, int k) {
    priority_queue<int, vector<int>, greater<int>> minHeap; // min-heap

    for (int num : nums) {
        minHeap.push(num);
        if ((int)minHeap.size() > k) {
            minHeap.pop();
        }
    }

    return minHeap.top();
}`,
    pythonCode: `import heapq


def find_kth_largest(nums: list[int], k: int) -> int:
    min_heap: list[int] = []

    for num in nums:
        heapq.heappush(min_heap, num)
        if len(min_heap) > k:
            heapq.heappop(min_heap)

    return min_heap[0]`,
    practiceProblems: [
      {
        title: 'Kth Largest Element in an Array',
        url: 'https://leetcode.com/problems/kth-largest-element-in-an-array/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Top K Frequent Elements',
        url: 'https://leetcode.com/problems/top-k-frequent-elements/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'K Closest Points to Origin',
        url: 'https://leetcode.com/problems/k-closest-points-to-origin/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Heap (priority queue) problems', url: 'https://leetcode.com/tag/heap-priority-queue/' },
      {
        platform: 'CODEFORCES',
        label: 'Data structures problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=data+structures',
      },
    ],
    relatedSlugs: ['quick-sort'],
  },
  {
    slug: 'implement-trie',
    name: 'Implement Trie (Prefix Tree)',
    categorySlug: 'trie',
    difficulty: 'MEDIUM',
    summary:
      'Builds a prefix tree that supports O(L) word insertion, exact lookup, and prefix search, where L is the word length.',
    introduction:
      "A trie (pronounced 'try') is a tree where each path from the root spells out a prefix, and shared prefixes share the same path. This makes it dramatically more efficient than storing words in a hash set for any use case that involves prefixes, such as autocomplete.",
    problemStatement:
      'Implement a trie with insert, search, and startsWith operations. insert(word) adds a word to the trie. search(word) returns true only if the exact word was previously inserted. startsWith(prefix) returns true if any inserted word begins with the given prefix.',
    intuition:
      'Each node represents one character position and holds links to its children (typically one per possible next character) plus a flag marking whether a complete word ends at that node. Inserting a word walks (creating nodes as needed) the path spelled out by its characters and marks the final node as a word ending. Searching walks the same path and checks whether it exists — search additionally requires the end-of-word flag, while startsWith does not.',
    stepByStep: [
      'Each trie node holds a map/array of child nodes indexed by character, and a boolean isEndOfWord flag.',
      'To insert a word: start at the root; for each character, create a child node if it does not exist, then move into it. Mark isEndOfWord = true on the final node.',
      'To search a word: walk the path character by character; if any character is missing, return false. If the full path exists, return the isEndOfWord flag of the final node.',
      'To check startsWith: walk the path the same way, but return true as soon as the full prefix path exists, regardless of isEndOfWord.',
    ],
    dryRun:
      'Insert "cat", "car", "dog"\nroot -> c -> a -> t (isEndOfWord=true)\n           -> r (isEndOfWord=true)\nroot -> d -> o -> g (isEndOfWord=true)\n\nsearch("car"): walk c->a->r, isEndOfWord=true -> true\nsearch("ca"): walk c->a, isEndOfWord=false -> false\nstartsWith("ca"): walk c->a exists -> true',
    timeComplexityBest: 'O(L)',
    timeComplexityAverage: 'O(L)',
    timeComplexityWorst: 'O(L)',
    spaceComplexity: 'O(total characters inserted)',
    advantages: [
      'Insertion, exact search, and prefix search all run in O(L), independent of how many words are stored — unlike a hash set, which cannot answer prefix queries efficiently at all.',
      'Naturally deduplicates shared prefixes, saving memory when the dataset has many similar words.',
      'A very natural fit for autocomplete, spell-check, and IP routing (longest-prefix match).',
    ],
    disadvantages: [
      'Can use significantly more memory than a hash set for sparse datasets with little prefix overlap, due to per-node child pointer overhead.',
      'A fixed-size array of children (e.g., 26 for lowercase English letters) wastes memory for nodes with few children; a hash map trades that for slightly slower constant factors.',
    ],
    applications: [
      'Autocomplete and typeahead search suggestions.',
      'Spell checkers and dictionary lookups.',
      'IP routing tables using longest-prefix matching, and word games like Boggle/Scrabble solvers.',
    ],
    commonMistakes: [
      'Forgetting to set isEndOfWord, which makes search() unable to distinguish a full word from a mere prefix.',
      'Confusing search() (must match isEndOfWord) with startsWith() (only needs the path to exist).',
      'Using a fixed-size 26-letter array when the input may include uppercase letters, digits, or Unicode, silently dropping valid characters.',
    ],
    visualizationNotes:
      'A visualization would render the trie as a branching tree of letter nodes, highlighting the traversal path for insert/search/startsWith operations and marking end-of-word nodes with a distinct badge.',
    tags: ['trie', 'string', 'design', 'tree'],
    cppCode: `#include <string>
#include <unordered_map>
using namespace std;

class Trie {
public:
    Trie() : isEndOfWord(false) {}

    void insert(const string& word) {
        Trie* node = this;
        for (char c : word) {
            if (node->children.find(c) == node->children.end()) {
                node->children[c] = new Trie();
            }
            node = node->children[c];
        }
        node->isEndOfWord = true;
    }

    bool search(const string& word) const {
        const Trie* node = find(word);
        return node != nullptr && node->isEndOfWord;
    }

    bool startsWith(const string& prefix) const {
        return find(prefix) != nullptr;
    }

private:
    unordered_map<char, Trie*> children;
    bool isEndOfWord;

    const Trie* find(const string& s) const {
        const Trie* node = this;
        for (char c : s) {
            auto it = node->children.find(c);
            if (it == node->children.end()) return nullptr;
            node = it->second;
        }
        return node;
    }
};`,
    pythonCode: `class TrieNode:
    def __init__(self) -> None:
        self.children: dict[str, 'TrieNode'] = {}
        self.is_end_of_word = False


class Trie:
    def __init__(self) -> None:
        self.root = TrieNode()

    def insert(self, word: str) -> None:
        node = self.root
        for char in word:
            node = node.children.setdefault(char, TrieNode())
        node.is_end_of_word = True

    def search(self, word: str) -> bool:
        node = self._find(word)
        return node is not None and node.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        return self._find(prefix) is not None

    def _find(self, s: str) -> TrieNode | None:
        node = self.root
        for char in s:
            if char not in node.children:
                return None
            node = node.children[char]
        return node`,
    practiceProblems: [
      {
        title: 'Implement Trie (Prefix Tree)',
        url: 'https://leetcode.com/problems/implement-trie-prefix-tree/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Design Add and Search Words Data Structure',
        url: 'https://leetcode.com/problems/design-add-and-search-words-data-structure/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Word Search II',
        url: 'https://leetcode.com/problems/word-search-ii/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Trie problems', url: 'https://leetcode.com/tag/trie/' },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: [],
  },
];
