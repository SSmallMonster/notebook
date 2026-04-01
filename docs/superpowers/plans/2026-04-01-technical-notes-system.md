# 技术笔记规范系统实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立结构化的技术笔记规范系统，支持故障排除和知识积累两种记录模式，包含AI辅助功能。

**Architecture:** 基于Markdown模板的文件系统，通过标准化目录结构、命名规范和YAML前置元数据实现结构化记录。AI通过CLAUDE.md中的指令自动识别笔记类型、应用模板并维护标签索引。

**Tech Stack:** Markdown, YAML前置元数据, Git版本控制, Claude AI辅助

---

### Task 1: 创建目录结构

**Files:**
- Create: `troubleshooting/k8s/.gitkeep`
- Create: `troubleshooting/ai-llm/.gitkeep`
- Create: `troubleshooting/storage/.gitkeep`
- Create: `troubleshooting/network/.gitkeep`
- Create: `knowledge/concepts/.gitkeep`
- Create: `knowledge/configurations/.gitkeep`
- Create: `knowledge/best-practices/.gitkeep`
- Create: `templates/.gitkeep`
- Create: `index/.gitkeep`

- [ ] **步骤 1: 创建故障排除目录结构**

```bash
mkdir -p troubleshooting/{k8s,ai-llm,storage,network}
```

- [ ] **步骤 2: 创建知识积累目录结构**

```bash
mkdir -p knowledge/{concepts,configurations,best-practices}
```

- [ ] **步骤 3: 创建模板和索引目录**

```bash
mkdir -p templates index
```

- [ ] **步骤 4: 添加.gitkeep文件保持目录结构**

```bash
touch troubleshooting/k8s/.gitkeep troubleshooting/ai-llm/.gitkeep troubleshooting/storage/.gitkeep troubleshooting/network/.gitkeep
touch knowledge/concepts/.gitkeep knowledge/configurations/.gitkeep knowledge/best-practices/.gitkeep
touch templates/.gitkeep index/.gitkeep
```

- [ ] **步骤 5: 提交目录结构**

```bash
git add troubleshooting/ knowledge/ templates/ index/
git commit -m "建立技术笔记目录结构

- 创建故障排除分类目录(k8s, ai-llm, storage, network)
- 创建知识积累分类目录(concepts, configurations, best-practices)
- 添加模板和索引目录

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

### Task 2: 创建故障排除模板

**Files:**
- Create: `templates/troubleshooting.md`

- [ ] **步骤 1: 创建故障排除模板文件**

```markdown
---
title: [问题简要描述]
date: YYYY-MM-DD
type: troubleshooting
tags: [主要技术领域, 具体组件, 问题类型]
severity: [低/中/高/紧急]
resolved: [是/否]
---

# [问题标题]

## 问题现象
- **环境**: 描述问题发生的环境
- **症状**: 具体的错误现象或异常行为
- **影响范围**: 受影响的系统或功能

## 环境信息
- **系统版本**:
- **相关软件版本**:
- **硬件配置**:
- **网络环境**:

## 诊断过程
### 初步检查
- 检查步骤1
- 检查步骤2

### 深入分析
- 分析方法和工具
- 关键发现

## 根本原因
[问题的根本原因分析]

## 解决方案
### 临时解决方案
[如果有临时workaround]

### 永久解决方案
1. 步骤1：[具体操作]
   ```bash
   # 相关命令
   ```
2. 步骤2：[具体操作]
3. 验证：[验证方法]

## 预防措施
- 监控建议
- 配置优化
- 最佳实践

## 相关资源
- 官方文档链接
- 相关issue或讨论
- 其他参考资料

## 总结
- 关键学习点
- 注意事项
```

- [ ] **步骤 2: 验证模板文件内容**

运行: `cat templates/troubleshooting.md | head -20`
预期: 显示YAML前置元数据和模板结构

- [ ] **步骤 3: 提交故障排除模板**

```bash
git add templates/troubleshooting.md
git commit -m "添加故障排除笔记模板

- 包含YAML前置元数据(title, date, type, tags, severity, resolved)
- 标准化问题现象、诊断过程、解决方案记录格式
- 支持临时和永久解决方案分离记录
- 包含预防措施和总结部分

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

### Task 3: 创建知识积累模板

**Files:**
- Create: `templates/knowledge.md`

- [ ] **步骤 1: 创建知识积累模板文件**

```markdown
---
title: [知识点标题]
date: YYYY-MM-DD
type: knowledge
category: [concepts/configurations/best-practices]
tags: [主要技术领域, 具体技术, 知识类型]
difficulty: [入门/中级/高级]
---

# [知识点标题]

## 概述
[技术概念的简要说明]

## 核心概念
### 基本定义
[核心概念解释]

### 工作原理
[技术原理说明]

### 关键特性
- 特性1：说明
- 特性2：说明

## 配置指南
### 基础配置
```yaml
# 配置示例
```

### 高级配置
```yaml
# 高级配置示例
```

### 配置说明
- 参数1：作用和取值范围
- 参数2：作用和取值范围

## 最佳实践
### 推荐做法
1. 实践1：说明和理由
2. 实践2：说明和理由

### 常见陷阱
- 问题1：原因和避免方法
- 问题2：原因和避免方法

## 实用工具
### 推荐工具
- 工具1：用途和使用方法
- 工具2：用途和使用方法

### 监控指标
- 指标1：含义和正常范围
- 指标2：含义和正常范围

## 相关技术
- 相关技术1：关系说明
- 相关技术2：关系说明

## 学习资源
- 官方文档
- 优质博客
- 视频教程
- 开源项目

## 实践案例
[具体的使用案例或场景]
```

- [ ] **步骤 2: 验证模板文件内容**

运行: `cat templates/knowledge.md | head -15`
预期: 显示YAML前置元数据和知识积累模板结构

- [ ] **步骤 3: 提交知识积累模板**

```bash
git add templates/knowledge.md
git commit -m "添加知识积累笔记模板

- 包含YAML前置元数据(title, date, type, category, tags, difficulty)
- 标准化概念说明、配置指南、最佳实践记录格式
- 支持多难度级别知识点记录
- 包含实用工具和学习资源部分

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

### Task 4: 创建主规范文件CLAUDE.md

**Files:**
- Create: `CLAUDE.md`

- [ ] **步骤 1: 创建CLAUDE.md文件头部说明**

```markdown
# 技术笔记规范系统

这是一个结构化的技术笔记系统，专门用于记录K8s、AI/LLM、存储系统等技术领域的问题和知识。

## 使用方式

当用户描述技术问题或想要记录技术知识时，你需要：

1. **识别笔记类型**：判断是故障排除还是知识积累
2. **选择合适模板**：从templates/目录选择对应模板
3. **应用模板并填充内容**：根据用户输入填充模板
4. **建议文件名和标签**：按照命名规范创建文件
5. **保存到正确位置**：根据类型和技术领域分类保存

## 笔记类型判断

### 故障排除 (troubleshooting)
**特征识别**：
- 用户描述具体的错误或问题现象
- 包含"报错"、"无法启动"、"连接失败"等问题描述
- 询问如何解决某个具体问题
- 描述系统异常行为

**示例触发词**：
- "遇到了...问题"
- "...报错"
- "...无法工作"
- "如何解决..."
- "故障排除"

### 知识积累 (knowledge)
**特征识别**：
- 用户想要记录技术概念或配置方法
- 包含"学习了"、"总结"、"最佳实践"等学习性词汇
- 询问如何配置或使用某个技术
- 分享技术心得和经验

**示例触发词**：
- "学习笔记"
- "总结一下"
- "最佳实践"
- "配置指南"
- "如何使用"

## 目录结构
```
```

- [ ] **步骤 2: 添加文件命名和标签规范**

```markdown
## 文件命名规范

### 故障排除笔记
格式：`YYYY-MM-DD-[技术领域]-[问题关键词].md`
保存位置：`troubleshooting/[技术领域]/`

示例：
- `2026-04-01-k8s-pod-crashloopbackoff.md` -> `troubleshooting/k8s/`
- `2026-04-01-vllm-gpu-memory-oom.md` -> `troubleshooting/ai-llm/`

### 知识积累笔记
格式：`[技术领域]-[知识点]-[类型].md`
保存位置：`knowledge/[类别]/`

示例：
- `k8s-networking-service-mesh-guide.md` -> `knowledge/configurations/`
- `vllm-gpu-optimization-concept.md` -> `knowledge/concepts/`

## 标签系统

### 技术领域标签
- `k8s`: Kubernetes相关
- `docker`: Docker容器相关
- `ai-llm`: AI/LLM相关
- `vllm`: vLLM特定
- `lmcache`: LMCache特定
- `storage`: 存储系统
- `network`: 网络相关
- `gpu`: GPU相关
- `monitoring`: 监控相关

### 组件级标签
- `k8s-pod`: Kubernetes Pod
- `k8s-service`: Kubernetes Service
- `k8s-ingress`: Kubernetes Ingress
- `vllm-gpu`: vLLM GPU使用
- `vllm-memory`: vLLM 内存管理
- `storage-performance`: 存储性能
- `storage-backup`: 存储备份

### 问题类型标签
- `crash`: 崩溃问题
- `performance`: 性能问题
- `config`: 配置问题
- `security`: 安全问题
- `integration`: 集成问题
```

- [ ] **步骤 3: 添加AI工作流程指令**

```markdown
## AI工作流程

### 1. 类型识别和确认
```python
# 示例对话流程
用户: "k8s pod一直重启，crashloopbackoff状态"
AI: "我识别这是一个故障排除类型的笔记。让我为您创建一个结构化的故障排除记录。"
```

### 2. 模板选择和应用
- 故障排除 -> 使用 `templates/troubleshooting.md`
- 知识积累 -> 使用 `templates/knowledge.md`

### 3. 内容收集和填充
按模板结构逐步收集信息：
- **问题现象**: 详细描述用户遇到的具体问题
- **环境信息**: 收集相关的系统和软件版本信息
- **解决过程**: 记录诊断和解决步骤
- **总结**: 提炼关键学习点

### 4. 文件名和标签建议
根据内容分析：
- 提取关键技术领域
- 识别具体组件
- 判断问题类型
- 生成标准化文件名
- 建议相关标签

### 5. 保存和确认
- 根据类型选择正确目录
- 创建文件并填充内容
- 确认用户满意度
- 提交到git（如果需要）

## 模板使用指南

### 使用故障排除模板时：
1. 从用户描述中提取问题现象
2. 询问必要的环境信息（如果用户未提供）
3. 记录诊断过程和解决方案
4. 总结预防措施和学习点
5. 建议severity级别：低/中/高/紧急

### 使用知识积累模板时：
1. 确认知识点的类别：concepts/configurations/best-practices
2. 从基本概念开始逐步展开
3. 提供实用的配置示例
4. 包含最佳实践和常见陷阱
5. 建议difficulty级别：入门/中级/高级

## 质量标准

### 好的故障排除笔记应该：
- ✅ 问题现象描述清晰具体
- ✅ 环境信息完整
- ✅ 解决步骤可重现
- ✅ 包含根本原因分析
- ✅ 有预防措施建议

### 好的知识积累笔记应该：
- ✅ 概念解释准确易懂
- ✅ 配置示例可直接使用
- ✅ 最佳实践有理有据
- ✅ 相关资源质量高
- ✅ 实践案例贴近实际
```

- [ ] **步骤 4: 验证CLAUDE.md文件完整性**

运行: `wc -l CLAUDE.md`
预期: 文件行数大于100行，包含完整的AI指令

- [ ] **步骤 5: 提交主规范文件**

```bash
git add CLAUDE.md
git commit -m "添加技术笔记规范主文件CLAUDE.md

- 定义笔记类型识别规则(故障排除vs知识积累)
- 建立标准化文件命名和目录分类规范
- 创建技术关键词标签系统
- 提供完整的AI工作流程指令
- 包含模板使用指南和质量标准

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

### Task 5: 创建标签索引系统

**Files:**
- Create: `index/tags-index.md`
- Create: `index/recent-notes.md`

- [ ] **步骤 1: 创建标签索引文件**

```markdown
# 技术标签索引

*此文件由AI自动维护，记录所有笔记的标签分布*

## 按技术领域分类

### Kubernetes (k8s)
- 总计笔记数：0
- 相关标签：
- 最近更新：

### AI/LLM
- 总计笔记数：0
- 相关标签：
- 最近更新：

### 存储系统 (storage)
- 总计笔记数：0
- 相关标签：
- 最近更新：

### 网络 (network)
- 总计笔记数：0
- 相关标签：
- 最近更新：

## 按问题类型分类

### 崩溃问题 (crash)
- 笔记列表：

### 性能问题 (performance)
- 笔记列表：

### 配置问题 (config)
- 笔记列表：

### 安全问题 (security)
- 笔记列表：

### 集成问题 (integration)
- 笔记列表：

---
*最后更新：AI将在每次添加新笔记时自动更新此索引*
```

- [ ] **步骤 2: 创建最近笔记索引**

```markdown
# 最近笔记索引

*此文件由AI自动维护，按时间倒序显示最近的笔记*

## 本周新增

### 2026-04-01 (今天)
暂无笔记

## 本月新增

### 2026年4月
暂无笔记

## 按类型统计

- 故障排除笔记：0篇
- 知识积累笔记：0篇
- 总计：0篇

## 待完善笔记

*标记为resolved:否或内容不完整的笔记*

暂无

---
*最后更新：AI将在每次添加新笔记时自动更新此索引*
```

- [ ] **步骤 3: 验证索引文件格式**

运行: `ls -la index/`
预期: 显示tags-index.md和recent-notes.md文件

- [ ] **步骤 4: 提交索引文件**

```bash
git add index/tags-index.md index/recent-notes.md
git commit -m "创建AI维护的标签和笔记索引系统

- tags-index.md: 按技术领域和问题类型分类的标签索引
- recent-notes.md: 按时间排序的最近笔记索引
- 支持AI自动维护和更新
- 提供笔记统计和待完善项目跟踪

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

### Task 6: 创建示例笔记验证系统

**Files:**
- Create: `troubleshooting/k8s/2026-04-01-k8s-pod-example.md`
- Create: `knowledge/concepts/k8s-networking-example-concept.md`

- [ ] **步骤 1: 创建故障排除示例笔记**

```markdown
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
```

- [ ] **步骤 2: 创建知识积累示例笔记**

```markdown
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
```

- [ ] **步骤 3: 验证示例笔记格式**

运行: `head -10 troubleshooting/k8s/2026-04-01-k8s-pod-example.md`
预期: 显示正确的YAML前置元数据格式

- [ ] **步骤 4: 提交示例笔记**

```bash
git add troubleshooting/k8s/2026-04-01-k8s-pod-example.md knowledge/concepts/k8s-networking-example-concept.md
git commit -m "添加规范系统验证用示例笔记

- 故障排除示例：Pod CrashLoopBackOff问题完整记录
- 知识积累示例：K8s网络基础概念说明
- 验证模板格式和标签系统可用性
- 为用户提供标准记录参考

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

### Task 7: 系统验证和文档完善

**Files:**
- Modify: `README.md`

- [ ] **步骤 1: 更新README.md说明**

```markdown
# 技术笔记本

结构化的技术知识记录系统，专门用于K8s、AI/LLM、存储系统等领域的问题和解决方案记录。

## 特性

- 🔍 **快速故障排除**：标准化问题记录模板
- 📚 **知识积累**：系统化技术概念和最佳实践记录
- 🏷️ **智能标签**：技术关键词分类和快速检索
- 🤖 **AI辅助**：自动模板应用和内容管理

## 使用方法

### 记录故障排除
```bash
# 告诉Claude你遇到的问题
"k8s pod一直重启，显示CrashLoopBackOff状态"
# AI会自动识别为故障排除类型，应用相应模板
```

### 记录技术知识
```bash
# 告诉Claude你想记录的知识点
"总结一下K8s网络的基本概念"
# AI会自动识别为知识积累类型，使用知识模板
```

## 目录结构

```
notebook/
├── CLAUDE.md                    # AI使用规范
├── troubleshooting/             # 故障排除笔记
│   ├── k8s/                     # Kubernetes问题
│   ├── ai-llm/                  # AI/LLM问题
│   ├── storage/                 # 存储问题
│   └── network/                 # 网络问题
├── knowledge/                   # 知识积累
│   ├── concepts/                # 技术概念
│   ├── configurations/          # 配置指南
│   └── best-practices/          # 最佳实践
├── templates/                   # 笔记模板
└── index/                       # AI维护的索引
```

## 标签系统

### 技术领域
`k8s` `docker` `ai-llm` `vllm` `lmcache` `storage` `network` `gpu` `monitoring`

### 组件级别
`k8s-pod` `k8s-service` `vllm-gpu` `vllm-memory` `storage-performance`

### 问题类型
`crash` `performance` `config` `security` `integration`

## 示例笔记

- [Pod故障排除示例](troubleshooting/k8s/2026-04-01-k8s-pod-example.md)
- [网络知识积累示例](knowledge/concepts/k8s-networking-example-concept.md)

## AI辅助功能

Claude AI会自动：
- 识别笔记类型（故障 vs 知识）
- 选择合适的模板
- 建议文件名和标签
- 维护索引和分类
- 关联相关笔记

开始使用时，只需要用自然语言描述你的问题或想记录的知识，AI会处理其余的一切。
```

- [ ] **步骤 2: 验证整个系统结构**

运行: `find . -type f -name "*.md" | sort`
预期: 显示所有创建的markdown文件列表

- [ ] **步骤 3: 测试模板可用性**

运行: `cat templates/troubleshooting.md | grep "^title:" | wc -l`
预期: 输出1，确认模板包含title字段

- [ ] **步骤 4: 提交README更新**

```bash
git add README.md
git commit -m "完善README.md项目说明文档

- 添加系统特性和使用方法说明
- 描述完整的目录结构和标签系统
- 提供示例笔记参考链接
- 说明AI辅助功能使用方式

Co-Authored-By: Claude Sonnet 4.6 <noreply@anthropic.com>"
```

- [ ] **步骤 5: 最终系统验证**

运行: `git log --oneline | head -10`
预期: 显示完整的提交历史，确认所有任务已完成

---

## 自查结果

**1. Spec覆盖检查：**
✅ 目录结构创建 - Task 1
✅ 故障排除模板 - Task 2
✅ 知识积累模板 - Task 3
✅ AI工作流程指令 - Task 4
✅ 标签索引系统 - Task 5
✅ 示例笔记验证 - Task 6
✅ 文档完善说明 - Task 7

**2. 占位符扫描：**
✅ 所有模板内容完整，无TBD或TODO
✅ 所有代码块包含具体内容
✅ 文件路径和命令都是具体可执行的

**3. 类型一致性：**
✅ 文件命名规范在所有任务中保持一致
✅ 标签系统定义明确且前后呼应
✅ 模板结构与规范设计文档匹配