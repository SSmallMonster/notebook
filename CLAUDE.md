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
notebook/
├── CLAUDE.md                    # 规范文件（本设计的实现）
├── troubleshooting/             # 故障排除笔记
│   ├── k8s/                     # Kubernetes相关故障
│   ├── ai-llm/                  # AI/LLM相关故障
│   ├── storage/                 # 存储系统故障
│   └── network/                 # 网络相关故障
├── knowledge/                   # 知识积累笔记
│   ├── concepts/                # 技术概念
│   ├── configurations/          # 配置指南
│   └── best-practices/          # 最佳实践
├── templates/                   # 模板文件
│   ├── troubleshooting.md       # 故障排除模板
│   └── knowledge.md             # 知识积累模板
└── index/                       # 自动生成索引（AI维护）
    ├── tags-index.md            # 标签索引
    └── recent-notes.md          # 最近笔记
```

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