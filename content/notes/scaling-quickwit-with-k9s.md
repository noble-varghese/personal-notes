---
title: "K9s Cheat Sheet: Essential Commands and Troubleshooting Guide"
date: 2024-10-17
tags: kubernetes, k9s
socialDescription: "The ultimate k9s cheat sheet" 
---

## Navigation Basics

Before diving into troubleshooting, it's important to understand k9s navigation:

1. General Commands:
   - Help menu: Press `?`
   - Exit k9s: Press `:q` or `ctrl-c`
   - View available resource aliases: Press `ctrl-a`
   - Filter resources: Press `/` followed by your filter
   - Inverse filtering: Press `/!` followed by your filter
   - Label filtering: Press `/-l` followed by label selector

## Working with Kubernetes Controllers

### StatefulSets (sts)
- View StatefulSets: Use `:sts` command
- Filter StatefulSets: `:sts /name`
- View in specific namespace: `:sts namespace-name`
- Common operations:
  - Scale: Select StatefulSet and press `s`
  - Describe: Press `d`
  - Edit: Press `e`
  - Delete: Press `ctrl-d` (with confirmation)

### DaemonSets (ds)
- View DaemonSets: Use `:ds` command
- Filter DaemonSets: `:ds /name`
- View in specific namespace: `:ds namespace-name`
- Common operations:
  - View pods: Select DaemonSet and press `enter`
  - Describe: Press `d`
  - Edit: Press `e`
  - Delete: Press `ctrl-d` (with confirmation)

### ReplicaSets (rs)
- View ReplicaSets: Use `:rs` command
- Filter ReplicaSets: `:rs /name`
- View in specific namespace: `:rs namespace-name`
- Common operations:
  - Scale: Select ReplicaSet and press `s`
  - Describe: Press `d`
  - Edit: Press `e`
  - Delete: Press `ctrl-d` (with confirmation)

## Troubleshooting Missing Pods

When a pod doesn't appear in the expected k9s view:

1. Check other resource types:
   - Use `:sts`, `:ds`, or `:rs` commands
   - View specific resources using singular/plural forms: `:pod` or `:pods`
   - Filter pods by name: `:pod /name`
   - Filter by labels: `:pod app=name,env=dev`

2. View all resources: 
   - Use `:all` command
   - Use `:screendump` or `:sd` to view all saved resources

3. Verify the correct namespace:
   - Switch namespaces: Use `:ns`
   - View pods in specific namespace: `:pod namespace-name`

4. Examine pod status:
   - Use `:pods` to find and check pod states
   - Use `d` to describe resources
   - Use `l` to view logs
   - Use `v` to view resource details
   - Use `e` to edit resources

If found, but not as a Deployment, the pod might be:
- Orphaned from a deleted Deployment
- Managed directly without a controller

## Scaling in k9s

To scale (once found in Deployments view):
1. Highlight the deployment
2. Press `s`
3. Enter desired replica count
4. Press Enter to confirm

## Important Notes on Scaling

- Manual scaling in k9s doesn't update Helm charts or releases
- Scaled values persist until the next deployment or manual change
- Helm deployments may override manual scaling if replica count is specified in the chart
- To preserve manual scaling across Helm upgrades, use `--reuse-values` flag (use cautiously)
- For permanent changes, update replica count in Helm chart values

## Advanced Operations

1. Context Management:
   - Switch contexts: Use `:ctx`
   - Direct context switch: `:ctx context-name`
   - View pods in specific context: `:pod @ctx1`

2. Resource Management:
   - Delete resource: Press `ctrl-d` (requires confirmation)
   - Force delete resource: Press `ctrl-k` (no confirmation)
   - View resource relationships: Use `:xray RESOURCE [NAMESPACE]`
   - Monitor resource metrics: Use `:pulses` or `:pu`

## Useful Links

- [k9s GitHub Repository](https://github.com/derailed/k9s)
- [Kubernetes Deployments Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kubernetes Scaling Documentation](https://kubernetes.io/docs/tutorials/kubernetes-basics/scale/scale-intro/)