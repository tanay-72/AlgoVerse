import type { AlgorithmSeed } from './types';

export const algorithmsBatch3: AlgorithmSeed[] = [
  {
    slug: 'breadth-first-search',
    name: 'Breadth-First Search (BFS)',
    categorySlug: 'graphs',
    difficulty: 'EASY',
    summary:
      'Explores a graph level by level from a source vertex using a queue, guaranteeing the shortest path in unweighted graphs.',
    introduction:
      'Breadth-First Search is one of the two fundamental graph traversal strategies. By exploring all neighbors at the current distance before moving farther out, BFS guarantees that the first time it reaches any vertex, it has done so via the shortest possible path — measured in number of edges.',
    problemStatement:
      'Given a graph and a source vertex, visit every vertex reachable from the source, and (optionally) compute the shortest number of edges from the source to every reachable vertex.',
    intuition:
      'A queue processes vertices in the exact order they were discovered — first in, first out — which mirrors the "explore near things before far things" behavior BFS needs. Marking a vertex as visited the moment it is enqueued (not when it is dequeued) prevents it from being added to the queue multiple times through different paths.',
    stepByStep: [
      'Initialize a queue containing only the source vertex, and mark it visited.',
      'While the queue is not empty, dequeue a vertex u.',
      'Process u (e.g., record its distance or add it to the traversal order).',
      'For every unvisited neighbor v of u, mark v as visited and enqueue it.',
      'Repeat until the queue is empty — every reachable vertex has now been visited exactly once.',
    ],
    dryRun:
      'Graph: 1-2, 1-3, 2-4, 3-4, 4-5. Source = 1\nqueue=[1], visited={1}\ndequeue 1, neighbors 2,3 unvisited -> visited={1,2,3}, queue=[2,3]\ndequeue 2, neighbor 4 unvisited -> visited={1,2,3,4}, queue=[3,4]\ndequeue 3, neighbor 4 already visited -> queue=[4]\ndequeue 4, neighbor 5 unvisited -> visited={1,2,3,4,5}, queue=[5]\ndequeue 5, no unvisited neighbors -> queue=[]\nTraversal order: 1, 2, 3, 4, 5',
    timeComplexityBest: 'O(V + E)',
    timeComplexityAverage: 'O(V + E)',
    timeComplexityWorst: 'O(V + E)',
    spaceComplexity: 'O(V)',
    advantages: [
      'Guarantees the shortest path (by edge count) in unweighted graphs, which DFS cannot promise.',
      'Every vertex and edge is processed a bounded number of times, giving linear time in graph size.',
      'The level-by-level structure makes it easy to compute shortest distances or detect bipartiteness.',
    ],
    disadvantages: [
      'Uses O(V) space for the queue and visited set, which can be significant for very large graphs.',
      'Does not directly generalize to weighted shortest paths — Dijkstra or Bellman-Ford is needed there.',
    ],
    applications: [
      'Shortest path in unweighted graphs and grids (e.g., maze solving).',
      'Finding connected components and testing bipartiteness.',
      'Web crawlers and social network "degrees of separation" queries.',
      'Level order traversal of trees, which is simply BFS restricted to a tree.',
    ],
    commonMistakes: [
      'Marking a vertex as visited when it is dequeued instead of when it is enqueued, which can enqueue the same vertex multiple times and blow up runtime.',
      'Using a stack instead of a queue by mistake, which turns the traversal into DFS.',
      'Forgetting to handle disconnected graphs — BFS from a single source only reaches that source\'s connected component.',
    ],
    visualizationNotes:
      'A visualization would color vertices by their discovered distance from the source, expanding outward in concentric "wavefronts" as the queue processes each level, with the queue contents shown live.',
    tags: ['graph', 'breadth-first-search', 'queue', 'shortest-path'],
    cppCode: `#include <vector>
#include <queue>
using namespace std;

vector<int> bfs(int source, const vector<vector<int>>& adjacencyList, int vertexCount) {
    vector<bool> visited(vertexCount, false);
    vector<int> order;
    queue<int> q;

    visited[source] = true;
    q.push(source);

    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);

        for (int v : adjacencyList[u]) {
            if (!visited[v]) {
                visited[v] = true;
                q.push(v);
            }
        }
    }

    return order;
}`,
    pythonCode: `from collections import deque


def bfs(source: int, adjacency_list: list[list[int]]) -> list[int]:
    visited = {source}
    order: list[int] = []
    queue: deque[int] = deque([source])

    while queue:
        u = queue.popleft()
        order.append(u)

        for v in adjacency_list[u]:
            if v not in visited:
                visited.add(v)
                queue.append(v)

    return order`,
    practiceProblems: [
      {
        title: 'Number of Islands',
        url: 'https://leetcode.com/problems/number-of-islands/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Rotting Oranges',
        url: 'https://leetcode.com/problems/rotting-oranges/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Word Ladder',
        url: 'https://leetcode.com/problems/word-ladder/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Breadth-first search problems', url: 'https://leetcode.com/tag/breadth-first-search/' },
      {
        platform: 'CODEFORCES',
        label: 'Graph problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=graphs',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['depth-first-search', 'dijkstras-algorithm', 'binary-tree-level-order-traversal'],
  },
  {
    slug: 'depth-first-search',
    name: 'Depth-First Search (DFS)',
    categorySlug: 'graphs',
    difficulty: 'EASY',
    summary:
      'Explores a graph by diving as deep as possible along each branch before backtracking, using recursion or an explicit stack.',
    introduction:
      'Depth-First Search is the second pillar of graph traversal, alongside BFS. Rather than expanding outward level by level, it commits to a path and follows it as far as it can before backtracking to try alternatives — the same strategy used when solving a maze by hand.',
    problemStatement:
      'Given a graph and a source vertex, visit every vertex reachable from the source, exploring as deep as possible along each branch before backtracking.',
    intuition:
      "DFS naturally maps onto recursion: visiting a vertex means marking it visited, then recursively visiting each unvisited neighbor. The call stack implicitly tracks the path back to the source, which is exactly what's needed to backtrack once a branch is exhausted.",
    stepByStep: [
      'Mark the source vertex as visited.',
      'Process the current vertex (e.g., add it to the traversal order).',
      'For each neighbor of the current vertex, if it is unvisited, recursively DFS into it.',
      'When a vertex has no unvisited neighbors left, backtrack to the caller.',
      'Repeat until the recursion unwinds completely — every reachable vertex has now been visited.',
    ],
    dryRun:
      'Graph: 1-2, 1-3, 2-4, 3-4, 4-5. Source = 1\nvisit 1, visited={1}\n  visit neighbor 2, visited={1,2}\n    visit neighbor 4, visited={1,2,4}\n      visit neighbor 3, visited={1,2,4,3}\n        neighbor 1 visited, neighbor 4 visited -> backtrack\n      visit neighbor 5, visited={1,2,4,3,5}\n        no unvisited neighbors -> backtrack all the way\nTraversal order: 1, 2, 4, 3, 5',
    timeComplexityBest: 'O(V + E)',
    timeComplexityAverage: 'O(V + E)',
    timeComplexityWorst: 'O(V + E)',
    spaceComplexity: 'O(V)',
    advantages: [
      'Simple to implement recursively, with the call stack handling backtracking automatically.',
      'Uses less memory than BFS in graphs that are deep but narrow.',
      'A natural fit for problems involving path existence, cycle detection, and topological ordering.',
    ],
    disadvantages: [
      'Does not guarantee the shortest path in terms of edge count, unlike BFS.',
      'Deep or highly recursive graphs risk stack overflow unless converted to an iterative version with an explicit stack.',
    ],
    applications: [
      'Cycle detection in directed and undirected graphs.',
      'Topological sorting via DFS finishing-time ordering.',
      'Connected component and strongly connected component detection (e.g., Tarjan\'s and Kosaraju\'s algorithms).',
      'Maze and puzzle solving, and generating all paths between two nodes.',
    ],
    commonMistakes: [
      'Forgetting to mark a vertex visited before recursing, which can cause infinite recursion on cyclic graphs.',
      'Assuming DFS finds the shortest path — it only guarantees that a path exists, not that it is shortest.',
      'Not converting to an iterative (explicit stack) implementation for very deep graphs, risking a stack overflow.',
    ],
    visualizationNotes:
      'A visualization would animate a single path highlighting deeper and deeper into the graph, dimming and retreating (backtracking) when a dead end is hit, then diving down the next unexplored branch.',
    tags: ['graph', 'depth-first-search', 'recursion', 'backtracking'],
    cppCode: `#include <vector>
using namespace std;

void dfsVisit(int u, const vector<vector<int>>& adjacencyList, vector<bool>& visited, vector<int>& order) {
    visited[u] = true;
    order.push_back(u);

    for (int v : adjacencyList[u]) {
        if (!visited[v]) {
            dfsVisit(v, adjacencyList, visited, order);
        }
    }
}

vector<int> dfs(int source, const vector<vector<int>>& adjacencyList, int vertexCount) {
    vector<bool> visited(vertexCount, false);
    vector<int> order;
    dfsVisit(source, adjacencyList, visited, order);
    return order;
}`,
    pythonCode: `def dfs(source: int, adjacency_list: list[list[int]]) -> list[int]:
    visited: set[int] = set()
    order: list[int] = []

    def visit(u: int) -> None:
        visited.add(u)
        order.append(u)
        for v in adjacency_list[u]:
            if v not in visited:
                visit(v)

    visit(source)
    return order`,
    practiceProblems: [
      {
        title: 'Number of Islands',
        url: 'https://leetcode.com/problems/number-of-islands/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Course Schedule',
        url: 'https://leetcode.com/problems/course-schedule/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Clone Graph',
        url: 'https://leetcode.com/problems/clone-graph/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      { platform: 'LEETCODE', label: 'Depth-first search problems', url: 'https://leetcode.com/tag/depth-first-search/' },
      {
        platform: 'CODEFORCES',
        label: 'Graph problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=dfs+and+similar',
      },
    ],
    relatedSlugs: ['breadth-first-search', 'topological-sort-kahns-algorithm', 'n-queens'],
  },
  {
    slug: 'dijkstras-algorithm',
    name: "Dijkstra's Algorithm",
    categorySlug: 'shortest-path',
    difficulty: 'MEDIUM',
    summary:
      'Computes the shortest path from a source vertex to every other vertex in a graph with non-negative edge weights, using a min-priority queue.',
    introduction:
      "Dijkstra's Algorithm, published by Edsger Dijkstra in 1959, is the standard solution for single-source shortest paths on graphs with non-negative weights. It generalizes BFS's level-by-level idea to weighted edges by always expanding the closest not-yet-finalized vertex next.",
    problemStatement:
      'Given a weighted graph with non-negative edge weights and a source vertex, compute the shortest distance from the source to every other vertex.',
    intuition:
      "Greedily finalize the closest unvisited vertex at each step: once a vertex's shortest distance is confirmed, it can never be improved later, because all other edge weights are non-negative — any alternate path through a farther vertex could only be equal or longer. A min-priority queue efficiently retrieves the next-closest unvisited vertex at every step.",
    stepByStep: [
      'Initialize distance[source] = 0 and distance[v] = infinity for all other vertices.',
      'Push (0, source) onto a min-priority queue keyed by distance.',
      'While the queue is not empty, pop the vertex u with the smallest tentative distance.',
      'If u has already been finalized with a smaller distance, skip it (a stale queue entry).',
      'For each edge (u, v) with weight w, if distance[u] + w < distance[v], update distance[v] and push (distance[v], v) onto the queue.',
      'Once the queue is empty, distance[] holds the shortest path length to every reachable vertex.',
    ],
    dryRun:
      'Graph: A-B(4), A-C(1), C-B(2), B-D(1), C-D(5). Source=A\ndist={A:0,B:inf,C:inf,D:inf}, pq=[(0,A)]\npop (0,A): relax B -> dist[B]=4, push(4,B); relax C -> dist[C]=1, push(1,C)\npop (1,C): relax B -> 1+2=3 < 4 -> dist[B]=3, push(3,B); relax D -> 1+5=6 -> dist[D]=6, push(6,D)\npop (3,B): relax D -> 3+1=4 < 6 -> dist[D]=4, push(4,D)\npop (4,B): stale (dist[B] is already 3), skip\npop (4,D): finalize D at 4\npop (6,D): stale, skip\nFinal distances: A=0, B=3, C=1, D=4',
    timeComplexityBest: 'O((V + E) log V)',
    timeComplexityAverage: 'O((V + E) log V)',
    timeComplexityWorst: 'O((V + E) log V)',
    spaceComplexity: 'O(V + E)',
    advantages: [
      'Efficiently computes shortest paths from a single source to all vertices using a binary heap priority queue.',
      'Well-understood and widely implemented, with strong theoretical guarantees on non-negative-weight graphs.',
      'Can be stopped early once the target vertex is popped if only a single-pair shortest path is needed.',
    ],
    disadvantages: [
      'Fails on graphs with negative edge weights — a negative edge can invalidate the greedy finalization assumption, requiring Bellman-Ford instead.',
      'The lazy-deletion priority queue implementation can push duplicate entries, using extra memory that must be filtered with a "finalized" check.',
    ],
    applications: [
      'GPS and mapping systems computing shortest driving routes.',
      'Network routing protocols (e.g., OSPF) computing least-cost paths.',
      'Any weighted graph shortest-path problem where all weights represent non-negative costs, like time or distance.',
    ],
    commonMistakes: [
      'Applying Dijkstra to a graph with negative edge weights, which can produce incorrect results because the greedy finalization no longer holds.',
      'Forgetting the stale-entry check when popping from the priority queue, which can process an outdated, larger distance for an already-finalized vertex.',
      'Using an O(V²) adjacency-matrix scan for dense graphs when a heap-based adjacency-list implementation would be far faster for sparse graphs.',
    ],
    visualizationNotes:
      'A visualization would color vertices by their current tentative distance, animate the priority queue popping the minimum each step, and highlight edge relaxations with a flash when a shorter distance is discovered.',
    tags: ['graph', 'shortest-path', 'priority-queue', 'greedy'],
    cppCode: `#include <vector>
#include <queue>
#include <climits>
using namespace std;

vector<long long> dijkstra(int source, int vertexCount,
                            const vector<vector<pair<int, int>>>& adjacencyList) {
    vector<long long> dist(vertexCount, LLONG_MAX);
    dist[source] = 0;

    // min-heap of (distance, vertex)
    priority_queue<pair<long long, int>, vector<pair<long long, int>>, greater<>> pq;
    pq.push({0, source});

    while (!pq.empty()) {
        auto [d, u] = pq.top();
        pq.pop();

        if (d > dist[u]) continue; // stale entry

        for (auto [v, weight] : adjacencyList[u]) {
            long long newDist = dist[u] + weight;
            if (newDist < dist[v]) {
                dist[v] = newDist;
                pq.push({newDist, v});
            }
        }
    }

    return dist;
}`,
    pythonCode: `import heapq


def dijkstra(source: int, vertex_count: int, adjacency_list: list[list[tuple[int, int]]]) -> list[float]:
    dist = [float('inf')] * vertex_count
    dist[source] = 0

    pq: list[tuple[float, int]] = [(0, source)]

    while pq:
        d, u = heapq.heappop(pq)

        if d > dist[u]:
            continue  # stale entry

        for v, weight in adjacency_list[u]:
            new_dist = dist[u] + weight
            if new_dist < dist[v]:
                dist[v] = new_dist
                heapq.heappush(pq, (new_dist, v))

    return dist`,
    practiceProblems: [
      {
        title: 'Network Delay Time',
        url: 'https://leetcode.com/problems/network-delay-time/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Path with Maximum Probability',
        url: 'https://leetcode.com/problems/path-with-maximum-probability/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Cheapest Flights Within K Stops',
        url: 'https://leetcode.com/problems/cheapest-flights-within-k-stops/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'Shortest paths problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=shortest+paths',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
      { platform: 'LEETCODE', label: 'Graph problems', url: 'https://leetcode.com/tag/graph/' },
    ],
    relatedSlugs: ['breadth-first-search', 'union-find-disjoint-set'],
  },
  {
    slug: 'topological-sort-kahns-algorithm',
    name: "Topological Sort (Kahn's Algorithm)",
    categorySlug: 'topological-sort',
    difficulty: 'MEDIUM',
    summary:
      "Produces a linear ordering of a DAG's vertices that respects every directed edge, using repeated removal of zero-in-degree vertices.",
    introduction:
      "Kahn's Algorithm computes a topological ordering using a BFS-like process built on in-degrees: vertices with no incoming edges have no unmet dependencies, so they can safely go first. Removing them can only reduce other vertices' in-degrees, revealing the next batch of dependency-free vertices.",
    problemStatement:
      'Given a directed acyclic graph (DAG), produce a linear ordering of its vertices such that for every directed edge (u, v), u appears before v in the ordering.',
    intuition:
      "A vertex with in-degree 0 has no unresolved prerequisites, so it can be placed next in the ordering immediately. Once placed, removing its outgoing edges decreases the in-degree of its neighbors — some of which may now also reach in-degree 0 and become eligible. Repeating this process, using a queue to track currently-eligible vertices, produces a valid topological order, and also naturally detects cycles: if fewer than V vertices are ever processed, a cycle exists.",
    stepByStep: [
      'Compute the in-degree of every vertex by counting incoming edges.',
      'Push every vertex with in-degree 0 onto a queue.',
      'While the queue is not empty, dequeue a vertex u and append it to the result order.',
      'For each outgoing edge (u, v), decrement in-degree[v]; if it becomes 0, enqueue v.',
      'If the result order contains fewer vertices than the graph has, the graph contains a cycle and no valid ordering exists.',
    ],
    dryRun:
      'Graph: 5->0, 5->2, 4->0, 4->1, 2->3, 3->1\nIn-degrees: 0:2, 1:2, 2:1, 3:1, 4:0, 5:0\nqueue=[4,5] (in-degree 0)\ndequeue 4, order=[4]. decrement 0->1, 1->1. neither hits 0.\ndequeue 5, order=[4,5]. decrement 0->0 (enqueue 0), 2->0 (enqueue 2). queue=[0,2]\ndequeue 0, order=[4,5,0]. no outgoing edges.\ndequeue 2, order=[4,5,0,2]. decrement 3->0 (enqueue 3). queue=[3]\ndequeue 3, order=[4,5,0,2,3]. decrement 1->0 (enqueue 1). queue=[1]\ndequeue 1, order=[4,5,0,2,3,1]. done.\nResult: a valid topological order is 4, 5, 0, 2, 3, 1',
    timeComplexityBest: 'O(V + E)',
    timeComplexityAverage: 'O(V + E)',
    timeComplexityWorst: 'O(V + E)',
    spaceComplexity: 'O(V + E)',
    advantages: [
      'Naturally detects cycles as a side effect — if not all vertices get processed, the graph is not a DAG.',
      'Iterative, queue-based implementation avoids recursion depth concerns entirely, unlike the DFS-based alternative.',
      'Produces a valid, deterministic build/dependency order for any DAG.',
    ],
    disadvantages: [
      'Requires computing in-degrees for every vertex upfront, an O(V + E) preprocessing pass.',
      'Only defined for directed acyclic graphs — meaningless (and cycle-detecting) on graphs with cycles.',
      'When multiple valid orderings exist, the result depends on queue/tie-breaking order and is not unique.',
    ],
    applications: [
      'Build systems and task schedulers resolving dependency graphs (e.g., compiling files in the correct order).',
      'Course prerequisite scheduling.',
      'Package manager dependency resolution.',
      'Detecting circular dependencies in module import graphs.',
    ],
    commonMistakes: [
      'Forgetting to check whether the result order includes all V vertices, missing cycle detection entirely.',
      'Confusing in-degree with out-degree when initializing the queue — vertices with in-degree 0, not out-degree 0, start the process.',
      'Attempting topological sort on an undirected graph, where the concept is not well-defined.',
    ],
    visualizationNotes:
      'A visualization would show vertices fading from the graph as they are removed, with a live in-degree counter on each remaining vertex, and newly-eligible (in-degree 0) vertices highlighted as they join the queue.',
    tags: ['graph', 'topological-sort', 'queue', 'dag'],
    cppCode: `#include <vector>
#include <queue>
using namespace std;

vector<int> topologicalSort(int vertexCount, const vector<vector<int>>& adjacencyList) {
    vector<int> inDegree(vertexCount, 0);
    for (int u = 0; u < vertexCount; ++u) {
        for (int v : adjacencyList[u]) {
            ++inDegree[v];
        }
    }

    queue<int> q;
    for (int v = 0; v < vertexCount; ++v) {
        if (inDegree[v] == 0) q.push(v);
    }

    vector<int> order;
    while (!q.empty()) {
        int u = q.front();
        q.pop();
        order.push_back(u);

        for (int v : adjacencyList[u]) {
            if (--inDegree[v] == 0) {
                q.push(v);
            }
        }
    }

    return order.size() == (size_t)vertexCount ? order : vector<int>{}; // empty = cycle detected
}`,
    pythonCode: `from collections import deque


def topological_sort(vertex_count: int, adjacency_list: list[list[int]]) -> list[int]:
    in_degree = [0] * vertex_count
    for u in range(vertex_count):
        for v in adjacency_list[u]:
            in_degree[v] += 1

    queue: deque[int] = deque(v for v in range(vertex_count) if in_degree[v] == 0)
    order: list[int] = []

    while queue:
        u = queue.popleft()
        order.append(u)

        for v in adjacency_list[u]:
            in_degree[v] -= 1
            if in_degree[v] == 0:
                queue.append(v)

    return order if len(order) == vertex_count else []  # empty = cycle detected`,
    practiceProblems: [
      {
        title: 'Course Schedule',
        url: 'https://leetcode.com/problems/course-schedule/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Course Schedule II',
        url: 'https://leetcode.com/problems/course-schedule-ii/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Alien Dictionary',
        url: 'https://leetcode.com/problems/alien-dictionary/',
        platform: 'LEETCODE',
        difficulty: 'HARD',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'DFS and topological sort problems',
        url: 'https://codeforces.com/problemset?tags=dfs+and+similar',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['depth-first-search', 'breadth-first-search'],
  },
  {
    slug: 'union-find-disjoint-set',
    name: 'Union-Find (Disjoint Set Union)',
    categorySlug: 'union-find',
    difficulty: 'MEDIUM',
    summary:
      'Tracks a dynamic partition of elements into disjoint sets, supporting near-constant-time union and find operations via path compression and union by rank.',
    introduction:
      'Union-Find, also called Disjoint Set Union (DSU), answers a deceptively simple question extremely efficiently: "are these two elements in the same group, and can I merge two groups together?" With two key optimizations — path compression and union by rank — its operations run in amortized time so close to constant that it is effectively O(1) in practice.',
    problemStatement:
      'Maintain a collection of disjoint sets over n elements, supporting two operations: find(x), which returns a representative identifying which set x belongs to, and union(x, y), which merges the sets containing x and y into one.',
    intuition:
      'Represent each set as a tree, where every node points to a parent, and the root is the representative of the set. find(x) walks up parent pointers until it reaches the root. Two optimizations keep these trees shallow: path compression makes every node visited during a find() point directly to the root, flattening the tree for future queries; union by rank/size always attaches the smaller/shallower tree under the root of the larger one, preventing tall chains from forming.',
    stepByStep: [
      'Initialize parent[i] = i for every element (each element starts as its own set), and rank[i] = 0.',
      'find(x): if parent[x] != x, recursively set parent[x] = find(parent[x]) (path compression), then return parent[x].',
      'union(x, y): find the roots rootX = find(x) and rootY = find(y). If they are equal, they are already in the same set.',
      'Otherwise, attach the root with smaller rank under the root with larger rank (union by rank); if ranks are equal, attach either and increment the resulting root\'s rank.',
      'Two elements are in the same set exactly when find(x) == find(y).',
    ],
    dryRun:
      'Elements: 1,2,3,4,5. Initial: parent[i]=i for all\nunion(1,2): root1=1, root2=2, ranks equal -> parent[2]=1, rank[1]=1\nunion(3,4): root3=3, root4=4, ranks equal -> parent[4]=3, rank[3]=1\nunion(1,3): root1=find(1)=1 (rank1), root3=find(3)=3 (rank1), ranks equal -> parent[3]=1, rank[1]=2\nfind(4): parent[4]=3, parent[3]=1 -> path compression sets parent[4]=1 directly -> returns 1\nunion(1,5): root1=1, root5=5 (rank0) -> parent[5]=1 (attach smaller rank under larger)\nfind(2) == find(4)? find(2)=1, find(4)=1 -> same set, true',
    timeComplexityBest: 'O(α(n))',
    timeComplexityAverage: 'O(α(n))',
    timeComplexityWorst: 'O(α(n))',
    spaceComplexity: 'O(n)',
    advantages: [
      'Amortized nearly-constant time per operation — α(n), the inverse Ackermann function, is less than 5 for any n that could ever be represented in physical memory.',
      'Simple array-based implementation with very low constant-factor overhead.',
      'Elegant, incremental way to track connectivity as edges are added one at a time.',
    ],
    disadvantages: [
      "Does not support splitting a set back apart (no 'un-union' operation) — it is designed for incremental merging only.",
      'Without both path compression and union by rank, worst-case performance degrades to O(log n) or even O(n) per operation.',
    ],
    applications: [
      "Detecting cycles while building a minimum spanning tree with Kruskal's algorithm.",
      'Network connectivity queries — determining if two nodes are in the same connected component as edges are added.',
      'Image processing for connected-component labeling.',
      'Percolation and grid-connectivity simulations.',
    ],
    commonMistakes: [
      'Implementing find() without path compression, which allows trees to degrade into long chains and slows every future query.',
      'Implementing union() without union by rank/size, always attaching arbitrarily, which can also create long chains.',
      'Forgetting to initialize parent[i] = i for every element before use.',
    ],
    visualizationNotes:
      'A visualization would render each set as a small tree of connected nodes, animating path compression by "flattening" a chain of parent pointers directly to the root the moment a find() is performed.',
    tags: ['union-find', 'disjoint-set', 'graph', 'data-structure'],
    cppCode: `#include <vector>
using namespace std;

class UnionFind {
public:
    explicit UnionFind(int n) : parent(n), rank(n, 0) {
        for (int i = 0; i < n; ++i) parent[i] = i;
    }

    int find(int x) {
        if (parent[x] != x) {
            parent[x] = find(parent[x]); // path compression
        }
        return parent[x];
    }

    bool unite(int x, int y) {
        int rootX = find(x);
        int rootY = find(y);
        if (rootX == rootY) return false;

        if (rank[rootX] < rank[rootY]) swap(rootX, rootY);
        parent[rootY] = rootX;
        if (rank[rootX] == rank[rootY]) ++rank[rootX];
        return true;
    }

private:
    vector<int> parent;
    vector<int> rank;
};`,
    pythonCode: `class UnionFind:
    def __init__(self, n: int) -> None:
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x: int) -> int:
        if self.parent[x] != x:
            self.parent[x] = self.find(self.parent[x])  # path compression
        return self.parent[x]

    def union(self, x: int, y: int) -> bool:
        root_x, root_y = self.find(x), self.find(y)
        if root_x == root_y:
            return False

        if self.rank[root_x] < self.rank[root_y]:
            root_x, root_y = root_y, root_x

        self.parent[root_y] = root_x
        if self.rank[root_x] == self.rank[root_y]:
            self.rank[root_x] += 1
        return True`,
    practiceProblems: [
      {
        title: 'Number of Provinces',
        url: 'https://leetcode.com/problems/number-of-provinces/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Redundant Connection',
        url: 'https://leetcode.com/problems/redundant-connection/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Accounts Merge',
        url: 'https://leetcode.com/problems/accounts-merge/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'DSU problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=dsu',
      },
      { platform: 'CSES', label: 'CSES Problem Set', url: 'https://cses.fi/problemset/' },
    ],
    relatedSlugs: ['dijkstras-algorithm', 'topological-sort-kahns-algorithm'],
  },
  {
    slug: 'activity-selection-problem',
    name: 'Activity Selection Problem (Greedy)',
    categorySlug: 'greedy',
    difficulty: 'EASY',
    summary:
      'Selects the maximum number of non-overlapping activities from a set, by always greedily picking the activity that finishes earliest.',
    introduction:
      'The Activity Selection Problem is the textbook proof-of-concept for the greedy algorithm design paradigm. It demonstrates how, under the right problem structure, a simple locally-optimal rule — always pick the activity that ends soonest — provably yields a globally optimal solution.',
    problemStatement:
      'Given a set of activities, each with a start time and a finish time, select the maximum number of activities that can be performed by a single person, assuming a person can only work on one activity at a time (activities must not overlap).',
    intuition:
      'Sorting activities by finish time and always greedily picking the next activity that starts after the previously selected one finishes leaves the most room possible for future activities. Any activity that finishes earlier can never be a worse choice than one that finishes later, because it imposes a looser constraint on everything that comes after it — this is the exchange-argument proof behind the greedy choice.',
    stepByStep: [
      'Sort all activities by their finish time in ascending order.',
      'Select the first activity in the sorted order and set lastFinishTime to its finish time.',
      'For each subsequent activity, if its start time is greater than or equal to lastFinishTime, select it and update lastFinishTime to its finish time.',
      'Otherwise, skip the activity since it overlaps with the last selected one.',
      'Continue through the sorted list; the selected activities form a maximum-size non-overlapping set.',
    ],
    dryRun:
      'Activities (start, finish): (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)\nSorted by finish: (1,4), (3,5), (0,6), (5,7), (3,9), (5,9), (6,10), (8,11), (8,12), (2,14), (12,16)\nSelect (1,4), lastFinish=4\n(3,5): start 3 < 4 -> skip\n(0,6): start 0 < 4 -> skip\n(5,7): start 5 >= 4 -> select, lastFinish=7\n(3,9): start 3 < 7 -> skip\n(5,9): start 5 < 7 -> skip\n(6,10): start 6 < 7 -> skip\n(8,11): start 8 >= 7 -> select, lastFinish=11\n(8,12): start 8 < 11 -> skip\n(2,14): start 2 < 11 -> skip\n(12,16): start 12 >= 11 -> select, lastFinish=16\nSelected: (1,4), (5,7), (8,11), (12,16) — 4 activities',
    timeComplexityBest: 'O(n log n)',
    timeComplexityAverage: 'O(n log n)',
    timeComplexityWorst: 'O(n log n)',
    spaceComplexity: 'O(1)',
    advantages: [
      'Simple, provably optimal, and easy to implement once the activities are sorted.',
      'The dominant cost is the initial sort — the selection pass itself is a single O(n) scan.',
      'The exchange-argument proof technique it demonstrates generalizes to many other greedy problems.',
    ],
    disadvantages: [
      'The greedy-by-finish-time rule is specific to this exact problem shape; naively applying "greedy" to superficially similar scheduling problems (e.g., weighted activities) can give wrong answers.',
      'Requires sorting, so it is not linear time even though the selection logic itself is.',
    ],
    applications: [
      'Meeting room / conference scheduling — maximizing the number of non-overlapping meetings in one room.',
      'CPU job scheduling where jobs cannot be preempted.',
      'Resource booking systems (equipment reservation, venue booking).',
    ],
    commonMistakes: [
      'Sorting by start time instead of finish time, which does not produce the optimal solution.',
      'Using >= vs > incorrectly when checking whether the next activity can start after the last one finishes, depending on whether activities that touch at a single point count as overlapping.',
      'Assuming this greedy approach extends to the weighted version of the problem (maximizing total value, not count) — that variant actually requires dynamic programming instead.',
    ],
    visualizationNotes:
      'A visualization would render activities as horizontal bars on a timeline, sorted and colored by selection status, highlighting the lastFinishTime cutoff line as it advances rightward with each greedy pick.',
    tags: ['greedy', 'sorting', 'scheduling'],
    cppCode: `#include <vector>
#include <algorithm>
using namespace std;

struct Activity {
    int start;
    int finish;
};

vector<Activity> selectActivities(vector<Activity> activities) {
    sort(activities.begin(), activities.end(), [](const Activity& a, const Activity& b) {
        return a.finish < b.finish;
    });

    vector<Activity> selected;
    int lastFinishTime = -1;

    for (const auto& activity : activities) {
        if (activity.start >= lastFinishTime) {
            selected.push_back(activity);
            lastFinishTime = activity.finish;
        }
    }

    return selected;
}`,
    pythonCode: `def select_activities(activities: list[tuple[int, int]]) -> list[tuple[int, int]]:
    sorted_activities = sorted(activities, key=lambda activity: activity[1])

    selected: list[tuple[int, int]] = []
    last_finish_time = -1

    for start, finish in sorted_activities:
        if start >= last_finish_time:
            selected.append((start, finish))
            last_finish_time = finish

    return selected`,
    practiceProblems: [
      {
        title: 'Non-overlapping Intervals',
        url: 'https://leetcode.com/problems/non-overlapping-intervals/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
      {
        title: 'Meeting Rooms II',
        url: 'https://leetcode.com/problems/meeting-rooms-ii/',
        platform: 'LEETCODE',
        difficulty: 'MEDIUM',
      },
    ],
    externalLinks: [
      {
        platform: 'CODEFORCES',
        label: 'Greedy problems on Codeforces',
        url: 'https://codeforces.com/problemset?tags=greedy',
      },
      { platform: 'LEETCODE', label: 'Greedy problems', url: 'https://leetcode.com/tag/greedy/' },
    ],
    relatedSlugs: ['merge-sort'],
  },
];
