---
date: 2024-12-09
title: "Comprehensive Template for DP Problems"
tags: [comprehensive, dp, for, problems, template]
image: 
---

## Core DP Concepts

### State Definition Patterns

1. Linear State (1D DP)
    - Index-based states: dp[i] represents optimal value up to index i
    - Value-based states: dp[val] represents optimal way to achieve value val


2. Matrix State (2D DP)
    - Grid-based states: dp[i][j] represents optimal value at position (i,j)
    - Two-sequence states: dp[i][j] represents optimal value using first i and j elements


3. State with Constraints
    - Limited resource states: dp[i][k] represents optimal value up to i using k resources
    - Boolean states: dp[i][true/false] represents optimal value with condition met/not met


## Coin-Based Problems
1. Minimum Coins Problem

```python
def minCoins(coins: List[int], amount: int) -> int:
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] = min(dp[x], dp[x - coin] + 1)
    
    return dp[amount] if dp[amount] != float('inf') else -1 
```

Key Insights:
- State Definition: dp[x] = minimum coins needed for amount x
- Base Case: dp[0] = 0 (no coins needed for zero amount)
- Transition: Consider each coin for each amount
- Time Complexity: O(amount * len(coins))
- Space Complexity: O(amount)


2. Coin Combinations Problem

```python
def coinCombinations(coins: List[int], amount: int) -> int:
    dp = [0] * (amount + 1)
    dp[0] = 1
    
    for coin in coins:
        for x in range(coin, amount + 1):
            dp[x] += dp[x - coin]
    
    return dp[amount]
```

Key Insights:

- State Definition: dp[x] = number of ways to make amount x
- Base Case: dp[0] = 1 (one way to make zero amount)
- Order of loops matters:
    - Outer coin loop → combinations (order doesn't matter)
    - Outer amount loop → permutations (order matters)


3. Coin Path Reconstruction

```python
def minCoinsWithPath(coins: List[int], amount: int) -> (int, List[int]):
    dp = [float('inf')] * (amount + 1)
    dp[0] = 0
    coin_used = [0] * (amount + 1)
    
    for coin in coins:
        for curr_amount in range(coin, amount + 1):
            if dp[curr_amount - coin] + 1 < dp[curr_amount]:
                dp[curr_amount] = dp[curr_amount - coin] + 1
                coin_used[curr_amount] = coin
    
    if dp[amount] == float('inf'):
        return -1, []
    
    path = []
    while amount > 0:
        path.append(coin_used[amount])
        amount -= coin_used[amount]
    
    return dp[amount], path
```

Key Insights:
- Additional array needed to track choices
- Path reconstruction works backwards
- Time and space complexity remain the same


### Minimum Value Problems
1. Linear Minimum Cost Template

```python
def linear_min_cost(costs: List[int]) -> int:
    n = len(costs)
    dp = [float('inf')] * (n + 1)
    dp[0] = 0
    
    for i in range(n):
        for jump in range(1, k + 1):  # k is max jump
            if i + jump <= n:
                dp[i + jump] = min(dp[i + jump], dp[i] + costs[i])
    
    return dp[n]
```

Key Insights:
- Used for problems with linear progression
- Consider all possible moves from each state
- Initialize with infinity except base case