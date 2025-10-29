# 🚀 Open Data API - 通用 HTTP 请求转发服务

一个极简、通用、强大的 API 中转应用，部署在 Vercel 上，支持完整的 GET/POST 请求转发。

## ✨ 核心特性

- 🎯 **完全通用** - 支持任意 HTTP GET/POST 请求转发
- 🔧 **灵活配置** - 支持自定义请求头、查询参数、超时时间
- 📦 **多种格式** - 支持 JSON、表单、FormData 等多种内容类型
- ⚡ **性能优秀** - 基于 Next.js，响应迅速
- 🛡️ **错误处理** - 完善的异常捕获和错误提示
- 🎨 **原始透传** - 直接返回目标 API 的原始响应，不做任何加工
- 🌐 **CORS 支持** - 自动处理跨域请求
- 🎭 **智能伪装** - 自动随机生成真实的 User-Agent，模拟真实用户

## 🛠️ 技术栈

- **Next.js 14** - React 框架（App Router）
- **TypeScript** - 类型安全
- **Vercel** - Serverless 部署

## 📦 快速开始

### 1. 安装依赖

```bash
npm install
```

### 2. 本地开发

```bash
npm run dev
```

访问 http://localhost:3000 查看完整文档

### 3. 构建

```bash
npm run build
```

## 📖 API 文档

### 1️⃣ GET 请求转发 - `/api/get`

#### 方式 A：通过 URL 参数（推荐简单场景）

```bash
# 基础用法
GET /api/get?url=https://api.github.com/users/github

# 带查询参数
GET /api/get?url=https://api.example.com/search&q=keyword&page=1&limit=10

# 自定义超时
GET /api/get?url=https://api.example.com/slow&timeout=60000
```

#### 方式 B：通过 POST Body（推荐复杂场景）

```bash
POST /api/get
Content-Type: application/json

{
  "url": "https://api.example.com/data",
  "params": {
    "q": "search term",
    "page": 1,
    "limit": 20
  },
  "headers": {
    "Authorization": "Bearer your-token",
    "X-Custom-Header": "value"
  },
  "timeout": 30000
}
```

#### cURL 示例

```bash
# 方式 A：URL 参数
curl "http://localhost:3000/api/get?url=https://api.github.com/users/github"

# 方式 B：POST Body
curl -X POST http://localhost:3000/api/get \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://api.github.com/repos/vercel/next.js"
  }'
```

### 2️⃣ POST 请求转发 - `/api/post`

#### 基础用法

```bash
POST /api/post
Content-Type: application/json

{
  "url": "https://api.example.com/create",
  "data": {
    "name": "测试数据",
    "description": "这是一条测试记录"
  }
}
```

#### 完整配置

```bash
POST /api/post
Content-Type: application/json

{
  "url": "https://api.example.com/endpoint",
  "data": {
    "title": "新文章",
    "content": "文章内容",
    "tags": ["tech", "api"]
  },
  "params": {
    "draft": "false",
    "notify": "true"
  },
  "headers": {
    "Authorization": "Bearer your-token",
    "X-API-Key": "your-api-key"
  },
  "contentType": "application/json",
  "timeout": 30000
}
```

#### cURL 示例

```bash
# JSON 格式（默认）
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://jsonplaceholder.typicode.com/posts",
    "data": {
      "title": "测试标题",
      "body": "测试内容",
      "userId": 1
    }
  }'

# 表单格式
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com/form-submit",
    "data": {
      "username": "user123",
      "email": "user@example.com"
    },
    "contentType": "application/x-www-form-urlencoded"
  }'
```

### 3️⃣ User-Agent 生成器 - `/api/user-agent` 🎭

生成随机或指定类型的 User-Agent，用于测试或模拟真实用户请求。

#### 生成单个随机 User-Agent

```bash
GET /api/user-agent

# 响应
{
  "userAgent": "Mozilla/5.0 (iPhone; CPU iPhone OS 15_6_1 like Mac OS X) ...",
  "type": "random"
}
```

#### 查看所有可用类型

```bash
GET /api/user-agent?types=true

# 响应
{
  "types": [
    "iPhone-Wechat",
    "Android-Wechat",
    "iPhone-Safari",
    "Android-Chrome",
    "Windows-Chrome",
    "Mac-Safari",
    "Mac-Chrome",
    "Windows-Edge",
    "iPad",
    "Firefox"
  ]
}
```

#### 生成指定类型的 User-Agent

```bash
GET /api/user-agent?type=iPhone-Wechat
GET /api/user-agent?type=Windows-Chrome
```

#### 生成多个 User-Agent

```bash
GET /api/user-agent?count=10

# 响应
{
  "count": 10,
  "userAgents": [
    "Mozilla/5.0 (iPhone; ...",
    "Mozilla/5.0 (Windows NT 10.0; ...",
    ...
  ]
}
```

#### 支持的 User-Agent 类型

| 类型 | 说明 | 权重 |
|------|------|------|
| iPhone-Wechat | iPhone 微信浏览器 | ⭐⭐⭐ 高 |
| Android-Wechat | Android 微信浏览器 | ⭐⭐⭐ 高 |
| iPhone-Safari | iPhone Safari 浏览器 | ⭐⭐ 中 |
| Android-Chrome | Android Chrome 浏览器 | ⭐⭐ 中 |
| Windows-Chrome | Windows Chrome 浏览器 | ⭐⭐ 中 |
| Mac-Safari | Mac Safari 浏览器 | ⭐ 低 |
| Mac-Chrome | Mac Chrome 浏览器 | ⭐ 低 |
| Windows-Edge | Windows Edge 浏览器 | ⭐ 低 |
| iPad | iPad Safari 浏览器 | ⭐ 低 |
| Firefox | Firefox 浏览器 | ⭐ 低 |

**注意**：`/api/get` 和 `/api/post` 会**自动随机**使用上述 User-Agent，无需手动指定。如果需要指定自定义 User-Agent，可以在 headers 中传递。

## ⚙️ 参数说明

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|------|------|------|--------|------|
| `url` | string | ✅ 是 | - | 目标 API 地址 |
| `data` | object | ❌ 否 | {} | POST 请求体数据 |
| `params` | object | ❌ 否 | {} | URL 查询参数 |
| `headers` | object | ❌ 否 | {} | 自定义请求头 |
| `contentType` | string | ❌ 否 | application/json | 内容类型 |
| `timeout` | number | ❌ 否 | 30000 | 超时时间（毫秒） |

### 支持的 contentType

- `application/json` - JSON 格式（默认）
- `application/x-www-form-urlencoded` - 表单格式
- `multipart/form-data` - 文件上传格式
- 其他自定义格式

## 📤 响应格式

直接返回目标 API 的原始响应，不做任何加工：

```json
{
  "id": 123,
  "name": "示例数据",
  "description": "完全保持原始格式"
  // ... 原始 API 返回的所有字段
}
```

## 💡 实战示例

### 示例 1：获取 GitHub 用户信息

```bash
curl "http://localhost:3000/api/get?url=https://api.github.com/users/vercel"
```

### 示例 2：搜索 GitHub 仓库

```bash
curl -X POST http://localhost:3000/api/get \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://api.github.com/search/repositories",
    "params": {
      "q": "nextjs",
      "sort": "stars",
      "order": "desc",
      "per_page": 5
    }
  }'
```

### 示例 3：创建 JSONPlaceholder 文章

```bash
curl -X POST http://localhost:3000/api/post \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://jsonplaceholder.typicode.com/posts",
    "data": {
      "title": "我的新文章",
      "body": "这是文章内容",
      "userId": 1
    }
  }'
```

### 示例 4：带认证的 API 请求

```bash
curl -X POST http://localhost:3000/api/get \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://api.example.com/user/profile",
    "headers": {
      "Authorization": "Bearer your-access-token"
    }
  }'
```

### 示例 5：测试 User-Agent 自动随机化

```bash
# 请求 1
curl -X POST http://localhost:3000/api/get \
  -H "Content-Type: application/json" \
  -d '{"url": "https://httpbin.org/user-agent"}'

# 请求 2（会使用不同的 User-Agent）
curl -X POST http://localhost:3000/api/get \
  -H "Content-Type: application/json" \
  -d '{"url": "https://httpbin.org/user-agent"}'
```

### 示例 6：指定自定义 User-Agent

```bash
curl -X POST http://localhost:3000/api/get \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://httpbin.org/user-agent",
    "headers": {
      "User-Agent": "My-Custom-Bot/1.0"
    }
  }'
```

## 🚀 部署到 Vercel

### 方法 1：使用 Vercel CLI

```bash
# 安装 Vercel CLI
npm i -g vercel

# 登录
vercel login

# 部署
vercel
```

### 方法 2：通过 Git 集成（推荐）

1. 将代码推送到 GitHub/GitLab/Bitbucket
2. 在 [Vercel](https://vercel.com) 导入项目
3. 自动部署完成 ✅

部署后，你的 API 将运行在：
- `https://your-project.vercel.app/api/get`
- `https://your-project.vercel.app/api/post`
- `https://your-project.vercel.app/api/user-agent`

## 🔒 安全建议

### 1. 添加 API 密钥验证（推荐）

在 `.env.local` 中设置：

```env
API_SECRET_KEY=your-super-secret-key
```

在代码中验证：

```typescript
const apiKey = request.headers.get('x-api-key');
if (apiKey !== process.env.API_SECRET_KEY) {
  return NextResponse.json({ error: '无效的 API 密钥' }, { status: 401 });
}
```

### 2. 限制目标域名白名单

```typescript
const allowedDomains = ['api.github.com', 'api.example.com'];
const url = new URL(targetUrl);
if (!allowedDomains.includes(url.hostname)) {
  return NextResponse.json({ error: '不允许访问该域名' }, { status: 403 });
}
```

### 3. 添加速率限制

可以使用 Vercel Edge Config 或第三方服务（如 Upstash）实现速率限制。

### 4. CORS 配置

在 `next.config.js` 中配置允许的源：

```javascript
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: 'https://your-domain.com' },
          { key: 'Access-Control-Allow-Methods', value: 'GET, POST, OPTIONS' },
        ],
      },
    ];
  },
};
```

## 🎭 User-Agent 随机化详解

### 为什么需要随机 User-Agent？

1. **避免被识别为爬虫** - 许多网站会检查 User-Agent 来识别爬虫
2. **模拟真实用户** - 使请求看起来更像真实用户的浏览器请求
3. **绕过反爬限制** - 一些 API 只允许特定浏览器访问
4. **分散请求特征** - 每次请求使用不同的 User-Agent，更难被追踪

### 自动随机化

`/api/get` 和 `/api/post` 会自动为每个请求生成一个随机的、真实的 User-Agent，包括：

- 📱 移动设备（iPhone、Android、iPad）
- 💻 桌面浏览器（Chrome、Safari、Edge、Firefox）
- 💬 微信浏览器（权重更高，更常见）
- 🌏 多种操作系统版本和浏览器版本

### 手动控制

如果需要使用特定的 User-Agent：

```bash
curl -X POST http://localhost:3000/api/get \
  -H "Content-Type: application/json" \
  -d '{
    "url": "https://example.com",
    "headers": {
      "User-Agent": "YourCustomUserAgent/1.0"
    }
  }'
```

## 📁 项目结构

```
open-data-api/
├── app/
│   ├── api/
│   │   ├── get/
│   │   │   └── route.ts      # GET 请求转发
│   │   ├── post/
│   │   │   └── route.ts      # POST 请求转发
│   │   └── user-agent/
│   │       └── route.ts      # User-Agent 生成器
│   ├── layout.tsx            # 根布局
│   └── page.tsx              # 文档首页
├── lib/
│   └── user-agent-generator.ts  # User-Agent 生成逻辑
├── examples/
│   ├── test-api.sh           # API 测试脚本
│   ├── test-user-agent.sh    # User-Agent 测试脚本
│   ├── client-usage.ts       # TypeScript 客户端示例
│   └── README.md             # 示例文档
├── public/                   # 静态资源
├── package.json              # 依赖配置
├── tsconfig.json             # TypeScript 配置
├── next.config.js            # Next.js 配置
├── vercel.json               # Vercel 部署配置
└── README.md                 # 项目文档
```

## 🧪 测试

### 运行完整测试

```bash
# API 功能测试
chmod +x examples/test-api.sh
./examples/test-api.sh

# User-Agent 测试
chmod +x examples/test-user-agent.sh
./examples/test-user-agent.sh
```

### TypeScript 示例

```bash
# 运行 TypeScript 客户端示例
npx ts-node examples/client-usage.ts
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 License

MIT

---

**Made with ❤️ using Next.js** | **Deployed on Vercel** 🚀
