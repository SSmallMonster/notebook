# 技术笔记本 Web 界面

基于Node.js和Express的技术笔记Web浏览系统，自动读取Markdown笔记文件并提供美观的Web界面。

## 功能特性

- 🔄 **实时同步**: 自动读取最新的Markdown笔记文件
- 🔍 **智能搜索**: 支持标题、内容、标签的全文搜索
- 🏷️ **标签系统**: 按技术关键词分类和过滤
- 📊 **统计面板**: 笔记数量和分布统计
- 📱 **响应式设计**: 支持桌面和移动设备
- ⚡ **高性能**: 内存缓存和智能刷新机制

## 快速开始

### 1. 安装依赖
```bash
cd web
npm install
```

### 2. 启动服务
```bash
npm start
```

### 3. 访问应用
打开浏览器访问: http://localhost:3000

## 部署选项

### 选项1: 静态页面 (index.html)
- 模拟数据展示
- 无需后端服务
- 适合演示和测试

### 选项2: 完整API应用 (app.html + server.js)
- 实时读取Markdown文件
- RESTful API接口
- 自动缓存和刷新
- 推荐用于生产环境

## API 接口

### 获取笔记列表
```
GET /api/notes
GET /api/notes?search=关键词
GET /api/notes?tag=标签名
GET /api/notes?type=troubleshooting
```

### 获取笔记详情
```
GET /api/notes/:id
```

### 获取统计信息
```
GET /api/stats
```

### 获取标签列表
```
GET /api/tags
```

### 刷新缓存
```
POST /api/refresh
```

## 目录结构

```
web/
├── index.html          # 静态演示页面
├── app.html            # API版前端页面
├── server.js           # Node.js后端服务
├── package.json        # 项目依赖配置
└── README.md          # 说明文档
```

## 配置说明

### 环境变量
- `PORT`: 服务端口 (默认: 3000)
- `NODE_ENV`: 运行环境

### 缓存设置
- 笔记数据缓存30秒
- 支持手动刷新缓存
- 自动检测文件变化

## 开发说明

### 开发模式
```bash
npm run dev  # 使用nodemon自动重启
```

### 文件监听
系统自动扫描以下目录:
- `../troubleshooting/`
- `../knowledge/`

### 支持的文件格式
- Markdown文件 (*.md)
- 包含YAML前置元数据
- 符合笔记规范的文件结构

## 技术栈

- **前端**: 原生JavaScript + HTML5 + CSS3
- **后端**: Node.js + Express
- **Markdown解析**: marked + gray-matter
- **代码高亮**: highlight.js
- **样式**: 响应式CSS Grid + Flexbox

## 浏览器支持

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## 性能优化

- 内存缓存减少文件I/O
- 延迟加载和虚拟滚动
- CSS和JavaScript压缩
- 响应式图片加载

## 故障排除

### 常见问题

1. **端口占用**
   ```bash
   lsof -i :3000
   kill -9 <PID>
   ```

2. **权限问题**
   ```bash
   chmod +x server.js
   ```

3. **依赖安装失败**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

### 日志查看
服务启动后会输出:
- 📚 服务启动状态
- 🌐 访问地址
- 🔍 预加载笔记数量

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request

## 许可证

MIT License