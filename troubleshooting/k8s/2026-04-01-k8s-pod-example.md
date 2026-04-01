---
title: Pod持续重启CrashLoopBackOff状态
date: 2026-04-01
type: troubleshooting
tags: [k8s, k8s-pod, crash]
severity: 中
resolved: 是
---

# Pod持续重启CrashLoopBackOff状态

## 问题现象
- **环境**: Kubernetes 1.28集群，3个工作节点
- **症状**: 应用Pod启动后立即崩溃，进入CrashLoopBackOff状态
- **影响范围**: 单个微服务无法启动，不影响其他服务

## 环境信息
- **系统版本**: Ubuntu 20.04 LTS
- **相关软件版本**: Kubernetes 1.28, Docker 24.0.5
- **硬件配置**: 4核CPU, 8GB内存
- **网络环境**: Calico CNI

## 诊断过程
### 初步检查
- kubectl get pods -o wide 查看Pod状态
- kubectl describe pod 查看事件信息

### 深入分析
- kubectl logs pod-name --previous 查看崩溃前日志
- 发现应用无法连接到数据库

## 根本原因
应用配置中数据库连接字符串错误，指向了不存在的服务名

## 解决方案
### 永久解决方案
1. 修正ConfigMap中的数据库连接配置：
   ```bash
   kubectl edit configmap app-config
   # 将 DB_HOST: wrong-service 改为 DB_HOST: mysql-service
   ```
2. 重启Pod使配置生效：
   ```bash
   kubectl rollout restart deployment/app-deployment
   ```
3. 验证Pod状态：
   ```bash
   kubectl get pods -w
   ```

## 预防措施
- 使用Helm values文件管理配置，避免手工修改
- 添加数据库连接健康检查
- 在CI/CD中增加配置验证步骤

## 相关资源
- [Kubernetes Pod故障排除指南](https://kubernetes.io/docs/tasks/debug-application-cluster/debug-pods/)
- [CrashLoopBackOff常见原因](https://sysdig.com/blog/debug-kubernetes-crashloopbackoff/)

## 总结
- 关键学习点：配置错误是Pod崩溃的常见原因
- 注意事项：始终检查previous logs获取真正的错误信息