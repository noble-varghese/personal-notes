---
title: Kubernetes Workload Types
date: 2024-10-17
tags: kubernetes
socialImage: notes/kube-controllers.png
---

![Kubernetes Workload Types Comparison](static/notes/kube-controllers.png)

## StatefulSets
StatefulSets are used for managing stateful applications that require stable network identities and persistent storage. They:

- Provide guarantees about the ordering and uniqueness of Pods
Maintain a sticky identity for each Pod
- Offer stable, persistent storage
- Support ordered, graceful deployment and scaling

Use cases: Databases, distributed systems like Cassandra or Elasticsearch

## DaemonSets
DaemonSets ensure that all (or some) nodes run a copy of a Pod. As nodes are added to the cluster, Pods are added to them. They are used for:
- Running a cluster storage daemon on every node
- Running a logs collection daemon on every node
- Running a node monitoring daemon on every node

Use cases: Node-level operations, cluster-wide services like log collection or monitoring

## ReplicaSets (RS)
ReplicaSets maintain a stable set of replica Pods running at any given time. They:

- Ensure a specified number of Pod replicas are running
- Provide high availability by creating and deleting Pods as needed
- Allow easy scaling of applications

Note: While ReplicaSets can be used directly, it's generally recommended to use Deployments, which manage ReplicaSets and provide declarative updates to Pods.
Use cases: Stateless applications, web servers, microservices