---
date: 2024-11-11
title: "Understanding K9s Pod Information"
tags: [infra, k9s]
socialImage: notes/cute-man.avif
socialDescription: Understanding K9s Pod Information
---

When using K9s to monitor Kubernetes infrastructure, you'll see several columns of information about your pods. Here's what each column in the display means:

![K9s interface showing pod information](notes/cute-man.avif)

| Column   | Description                                                                             |
| -------- | --------------------------------------------------------------------------------------- |
| NAME     | Pod name                                                                                |
| READY    | Number of pods in ready state / number of pods to be in ready state                     |
| RESTARTS | Number of times the pod has been restarted so far                                       |
| STATUS   | State of the pod life cycle (e.g., Running, Completed)                                  |
| CPU      | Current CPU usage (in milli-vCPU)                                                       |
| MEM      | Current main memory usage (in MiB)                                                      |
| %CPU/R   | Current CPU usage as a percentage of what has been requested by the pod                 |
| %MEM/R   | Current main memory usage as a percentage of what has been requested by the pod         |
| %CPU/L   | Current CPU usage as a percentage of the pod's limit (cannot exceed this limit)         |
| %MEM/L   | Current main memory usage as a percentage of the pod's limit (cannot exceed this limit) |
| IP       | IP address of the pod                                                                   |
| NODE     | Name of the node the pod is running on                                                  |
| AGE      | Age of the pod (s = seconds, m = minutes, h = hours, d = days)                          |


## Resource Metrics Calculation

### CPU Metrics

- **CPU (milli-vCPU)**

  - 1000m (millicores) = 1 vCPU/Core
  - Example: 500m means using half a CPU core
  - Formula: `actual_cpu_usage_in_cores * 1000`

- **%CPU/R (CPU Request)**

  - Shows how much of your requested CPU you're actually using
  - Formula: `(current_cpu_usage / cpu_request) * 100`
  - Example: If you requested 2 cores and are using 1 core, this would show 50%

- **%CPU/L (CPU Limit)**
  - Shows how close you are to your CPU limit
  - Formula: `(current_cpu_usage / cpu_limit) * 100`
  - Example: If your limit is 4 cores and you're using 3 cores, this would show 75%

### Memory Metrics

- **MEM (MiB)**

  - Actual memory usage in MiB (1 MiB = 1024² bytes)
  - Shows the working set memory (active memory in use)
  - Formula: `current_memory_usage_in_bytes / (1024 * 1024)`

- **%MEM/R (Memory Request)**

  - Percentage of requested memory being used
  - Formula: `(current_memory_usage / memory_request) * 100`
  - Example: If you requested 1GiB and are using 512MiB, this would show 50%

- **%MEM/L (Memory Limit)**
  - Percentage of memory limit being used
  - Formula: `(current_memory_usage / memory_limit) * 100`
  - Example: If your limit is 2GiB and you're using 1.5GiB, this would show 75%

## Other Metrics

### READY State

- Format: `ready_containers/total_containers`
- Example: `2/3` means 2 containers are ready out of 3 total containers in the pod
- A container is considered ready when its readiness probe succeeds

### RESTARTS

- Cumulative count of container restarts
- Increases when:
  - Container exits with error
  - Liveness probe fails
  - Node failures
  - OOM (Out of Memory) kills

### STATUS

Common states include:

- `Running`: Pod is running normally
- `Pending`: Pod is waiting to be scheduled
- `CrashLoopBackOff`: Container is repeatedly crashing
- `Completed`: Pod has finished its execution (for Jobs/CronJobs)
- `Error`: Pod failed to execute
- `ImagePullBackOff`: Unable to pull container image

### AGE

- Calculated from pod's `metadata.creationTimestamp`
- Automatically formatted to most appropriate unit:
  - `2d`: 2 days
  - `3h`: 3 hours
  - `45m`: 45 minutes
  - `30s`: 30 seconds
