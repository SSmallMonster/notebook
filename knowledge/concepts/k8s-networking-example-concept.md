---
title: Kubernetes网络基础概念
date: 2026-04-01
type: knowledge
category: concepts
tags: [k8s, k8s-networking, network]
difficulty: 入门
---

# Kubernetes网络基础概念

## 概述
Kubernetes网络模型定义了集群内Pod之间、Pod与服务之间的通信规则，是理解K8s架构的重要基础。

## 核心概念
### 基本定义
Kubernetes网络模型基于以下原则：
- 每个Pod都有独立的IP地址
- Pod之间可以直接通信，无需NAT
- 节点可以与所有Pod通信
- Service提供稳定的网络端点

### 工作原理
1. **Pod网络**：每个Pod获得集群唯一IP
2. **Service网络**：通过虚拟IP提供负载均衡
3. **Ingress**：管理集群外部访问

### 关键特性
- 扁平网络：Pod间直接IP通信
- 服务发现：通过DNS解析服务名
- 负载均衡：Service自动分发流量

## 配置指南
### 基础配置
```yaml
apiVersion: v1
kind: Service
metadata:
  name: my-service
spec:
  selector:
    app: my-app
  ports:
    - port: 80
      targetPort: 8080
  type: ClusterIP
```

### 高级配置
```yaml
apiVersion: networking.k8s.io/v1
kind: NetworkPolicy
metadata:
  name: deny-all
spec:
  podSelector: {}
  policyTypes:
  - Ingress
  - Egress
```

### 配置说明
- selector：选择目标Pod的标签
- port：服务暴露的端口
- targetPort：Pod实际监听的端口
- type：服务类型(ClusterIP/NodePort/LoadBalancer)

## 最佳实践
### 推荐做法
1. 使用NetworkPolicy限制网络访问：增强安全性
2. 合理规划IP地址段：避免与主机网络冲突

### 常见陷阱
- 忘记配置DNS策略：导致服务发现失败
- NetworkPolicy配置错误：意外阻断必要通信

## 实用工具
### 推荐工具
- kubectl port-forward：本地访问Pod端口
- kubectl proxy：访问Kubernetes API

### 监控指标
- 网络延迟：Pod间通信耗时
- 连接数：并发连接统计

## 相关技术
- CNI插件：Calico、Flannel、Cilium
- Service Mesh：Istio、Linkerd

## 学习资源
- [Kubernetes网络概念官方文档](https://kubernetes.io/docs/concepts/services-networking/)
- [理解Kubernetes网络模型](https://sookocheff.com/post/kubernetes/understanding-kubernetes-networking-model/)

## 实践案例
在微服务架构中，前端服务通过Service名称访问后端API，Kubernetes DNS自动解析服务名为ClusterIP，实现服务间解耦。