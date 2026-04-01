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