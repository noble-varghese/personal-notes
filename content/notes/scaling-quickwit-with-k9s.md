---
title: Troubleshooting and Scaling Pods in k9s
date: 2024-10-17
tags: kubernetes, k9s
---

## Troubleshooting Missing Pods

When a pod doesn't appear in the expected k9s view:

1. Check other resource types: Use `:sts`, `:ds`, or `:rs` commands.
2. View all resources: Use `:all` command.
3. Verify the correct namespace: Use `ctrl-n` to switch.
4. Examine pod status: Use `:pods` to find and check pod states.

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

- Manual scaling in k9s doesn't update Helm charts or releases.
- Scaled values persist until the next deployment or manual change.
- Helm deployments may override manual scaling if replica count is specified in the chart.
- To preserve manual scaling across Helm upgrades, use `--reuse-values` flag (use cautiously).
- For permanent changes, update replica count in Helm chart values.

## Useful Links

- [k9s GitHub Repository](https://github.com/derailed/k9s)
- [Kubernetes Deployments Documentation](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/)
- [Helm Documentation](https://helm.sh/docs/)
- [Kubernetes Scaling Documentation](https://kubernetes.io/docs/tutorials/kubernetes-basics/scale/scale-intro/)