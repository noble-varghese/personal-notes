---
date: 2024-12-12
title: "Prefix Sum"
tags: [prefix, sum]
socialDescription: ""
socialImage: ""
---


## What is a Prefix Sum?
A prefix sum (also called cumulative sum) is a simple but powerful concept: at each position in an array, we store the sum of all elements up to that position. Think of it like keeping a running total as you move through the array.
Let's see a simple example:

```python
Original array:  [3, 1, 4, 2, 5]
Prefix sum:      [3, 4, 8, 10, 15]
# prefix[i] = sum of all elements from index 0 to i
```

Here's how we build a prefix sum array:
```python
def build_prefix_sum(arr):
    n = len(arr)
    prefix = [0] * n
    prefix[0] = arr[0]  # First element is the same
    
    for i in range(1, n):
        prefix[i] = prefix[i-1] + arr[i]  # Add current element to previous sum
    
    return prefix
```

## Why are Prefix Sums Useful?
The real power of prefix sums comes when we need to calculate the sum of any range in the array. Let's say we want the sum of elements from index i to j. Without prefix sums, we'd need to loop through all elements in that range. With prefix sums, we can do it in O(1) time using this formula:
Sum(i to j) = prefix[j] - prefix[i-1] (if i > 0)
or prefix[j] (if i = 0)
Here's a practical example:

```python
def range_sum(prefix, left, right):
    if left == 0:
        return prefix[right]
    return prefix[right] - prefix[left - 1]

# Example usage:
arr = [3, 1, 4, 2, 5]
prefix = build_prefix_sum(arr)

# Sum from index 1 to 3 (1 + 4 + 2 = 7)
```
