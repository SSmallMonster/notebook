const express = require('express');
const fs = require('fs').promises;
const path = require('path');
const matter = require('gray-matter');
const { marked } = require('marked');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// 中间件
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname)));

// 笔记数据缓存
let notesCache = null;
let lastScanTime = 0;
const CACHE_DURATION = 30000; // 30秒缓存

class NotebookAPI {
    constructor() {
        this.basePath = path.join(__dirname, '..');
        this.troubleshootingPath = path.join(this.basePath, 'troubleshooting');
        this.knowledgePath = path.join(this.basePath, 'knowledge');
    }

    async scanNotes() {
        const now = Date.now();
        if (notesCache && (now - lastScanTime) < CACHE_DURATION) {
            return notesCache;
        }

        const notes = [];

        try {
            // 扫描故障排除笔记
            const troubleshootingCategories = await fs.readdir(this.troubleshootingPath);
            for (const category of troubleshootingCategories) {
                if (category.startsWith('.')) continue;

                const categoryPath = path.join(this.troubleshootingPath, category);
                const stat = await fs.stat(categoryPath);
                if (!stat.isDirectory()) continue;

                const files = await fs.readdir(categoryPath);
                for (const file of files) {
                    if (path.extname(file) === '.md' && !file.startsWith('.')) {
                        const note = await this.parseNote(
                            path.join(categoryPath, file),
                            'troubleshooting',
                            category
                        );
                        if (note) notes.push(note);
                    }
                }
            }

            // 扫描知识积累笔记
            const knowledgeCategories = await fs.readdir(this.knowledgePath);
            for (const category of knowledgeCategories) {
                if (category.startsWith('.')) continue;

                const categoryPath = path.join(this.knowledgePath, category);
                const stat = await fs.stat(categoryPath);
                if (!stat.isDirectory()) continue;

                const files = await fs.readdir(categoryPath);
                for (const file of files) {
                    if (path.extname(file) === '.md' && !file.startsWith('.')) {
                        const note = await this.parseNote(
                            path.join(categoryPath, file),
                            'knowledge',
                            category
                        );
                        if (note) notes.push(note);
                    }
                }
            }
        } catch (error) {
            console.error('扫描笔记时出错:', error);
        }

        // 按日期排序
        notes.sort((a, b) => new Date(b.date) - new Date(a.date));

        notesCache = notes;
        lastScanTime = now;

        console.log(`扫描完成，共找到 ${notes.length} 篇笔记`);
        return notes;
    }

    async parseNote(filePath, type, category) {
        try {
            const content = await fs.readFile(filePath, 'utf-8');
            const parsed = matter(content);
            const { data: frontMatter, content: markdownContent } = parsed;

            // 生成ID（基于文件名）
            const fileName = path.basename(filePath, '.md');
            const id = fileName.replace(/^\d{4}-\d{2}-\d{2}-/, '');

            // 提取摘要（取第一段或前150字符）
            const summary = this.extractSummary(markdownContent);

            return {
                id,
                title: frontMatter.title || fileName,
                type,
                category,
                date: frontMatter.date || this.extractDateFromFileName(fileName),
                tags: frontMatter.tags || [],
                severity: frontMatter.severity,
                resolved: frontMatter.resolved,
                difficulty: frontMatter.difficulty,
                summary,
                filePath,
                relativePath: path.relative(this.basePath, filePath)
            };
        } catch (error) {
            console.error(`解析笔记 ${filePath} 时出错:`, error);
            return null;
        }
    }

    extractSummary(content) {
        // 移除YAML前置数据和标题
        const lines = content.split('\n');
        const contentLines = lines.filter(line =>
            !line.startsWith('#') &&
            line.trim().length > 0 &&
            !line.startsWith('---')
        );

        if (contentLines.length > 0) {
            return contentLines[0].substring(0, 150) + (contentLines[0].length > 150 ? '...' : '');
        }
        return '';
    }

    extractDateFromFileName(fileName) {
        const match = fileName.match(/^(\d{4}-\d{2}-\d{2})/);
        return match ? match[1] : new Date().toISOString().split('T')[0];
    }

    async getNote(id) {
        const notes = await this.scanNotes();
        return notes.find(note => note.id === id);
    }

    async getNoteContent(note) {
        try {
            const content = await fs.readFile(note.filePath, 'utf-8');
            const parsed = matter(content);
            return {
                ...note,
                content: parsed.content,
                html: marked(parsed.content)
            };
        } catch (error) {
            console.error(`读取笔记内容时出错:`, error);
            return null;
        }
    }
}

const notebook = new NotebookAPI();

// API路由

// 获取所有笔记列表
app.get('/api/notes', async (req, res) => {
    try {
        const notes = await notebook.scanNotes();
        const { search, tag, type, category } = req.query;

        let filtered = notes;

        if (search) {
            const searchLower = search.toLowerCase();
            filtered = filtered.filter(note =>
                note.title.toLowerCase().includes(searchLower) ||
                note.summary.toLowerCase().includes(searchLower) ||
                note.tags.some(t => t.toLowerCase().includes(searchLower))
            );
        }

        if (tag) {
            filtered = filtered.filter(note => note.tags.includes(tag));
        }

        if (type) {
            filtered = filtered.filter(note => note.type === type);
        }

        if (category) {
            filtered = filtered.filter(note => note.category === category);
        }

        res.json(filtered);
    } catch (error) {
        res.status(500).json({ error: '获取笔记列表失败', message: error.message });
    }
});

// 获取单个笔记详情
app.get('/api/notes/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const note = await notebook.getNote(id);

        if (!note) {
            return res.status(404).json({ error: '笔记不存在' });
        }

        const fullNote = await notebook.getNoteContent(note);
        if (!fullNote) {
            return res.status(500).json({ error: '读取笔记内容失败' });
        }

        res.json(fullNote);
    } catch (error) {
        res.status(500).json({ error: '获取笔记详情失败', message: error.message });
    }
});

// 获取统计信息
app.get('/api/stats', async (req, res) => {
    try {
        const notes = await notebook.scanNotes();

        const stats = {
            total: notes.length,
            troubleshooting: notes.filter(n => n.type === 'troubleshooting').length,
            knowledge: notes.filter(n => n.type === 'knowledge').length,
            tags: [...new Set(notes.flatMap(n => n.tags))].length,
            categories: [...new Set(notes.map(n => n.category))],
            recentNotes: notes.slice(0, 10)
        };

        res.json(stats);
    } catch (error) {
        res.status(500).json({ error: '获取统计信息失败', message: error.message });
    }
});

// 获取所有标签
app.get('/api/tags', async (req, res) => {
    try {
        const notes = await notebook.scanNotes();
        const tagCounts = {};

        notes.forEach(note => {
            note.tags.forEach(tag => {
                tagCounts[tag] = (tagCounts[tag] || 0) + 1;
            });
        });

        const tags = Object.entries(tagCounts)
            .map(([tag, count]) => ({ tag, count }))
            .sort((a, b) => b.count - a.count);

        res.json(tags);
    } catch (error) {
        res.status(500).json({ error: '获取标签失败', message: error.message });
    }
});

// 强制刷新缓存
app.post('/api/refresh', async (req, res) => {
    try {
        notesCache = null;
        lastScanTime = 0;
        const notes = await notebook.scanNotes();
        res.json({ message: '缓存已刷新', count: notes.length });
    } catch (error) {
        res.status(500).json({ error: '刷新缓存失败', message: error.message });
    }
});

// 健康检查
app.get('/api/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        cacheInfo: {
            cached: !!notesCache,
            noteCount: notesCache ? notesCache.length : 0,
            lastScan: new Date(lastScanTime).toISOString()
        }
    });
});

// 默认路由，返回前端页面
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'app.html'));
});

// 启动服务器
app.listen(PORT, () => {
    console.log(`📚 技术笔记本服务启动成功！`);
    console.log(`🌐 访问地址: http://localhost:${PORT}`);
    console.log(`📖 API文档: http://localhost:${PORT}/api/notes`);

    // 预热缓存
    notebook.scanNotes().then(notes => {
        console.log(`🔍 预加载完成，共 ${notes.length} 篇笔记`);
    });
});

module.exports = app;