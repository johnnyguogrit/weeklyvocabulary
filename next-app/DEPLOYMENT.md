# Supabase 部署指南

## 1. 创建 Supabase 项目

### 步骤 1: 注册 Supabase
1. 访问 https://supabase.com
2. 点击 "Start your project"
3. 使用 GitHub 账号登录

### 步骤 2: 创建新项目
1. 点击 "New Project"
2. 填写项目信息:
   - **Name**: `weekly-vocabulary` (或任意名称)
   - **Database Password**: 设置强密码 (保存好!)
   - **Region**: 选择最近的区域 (如: Southeast Asia (Singapore))
3. 等待项目创建完成 (约2分钟)

## 2. 获取数据库连接信息

### 步骤 1: 获取连接字符串
1. 进入项目 → **Settings** → **Database**
2. 找到 **Connection string** 部分
3. 选择 **URI** 标签页
4. 你会看到两种连接字符串:

#### Connection Pooling (用于 DATABASE_URL)
```
postgresql://postgres.your-project:your-password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres
```

#### Direct Connection (用于 DIRECT_URL)
```
postgresql://postgres.your-project:your-password@aws-0-ap-southeast-1.pooler.supabase.com:5433/postgres
```

## 3. 配置本地环境

### 步骤 1: 创建 .env 文件
```bash
cd next-app
cp .env.example .env
```

### 步骤 2: 填写数据库连接
```env
# 将 your-project 和 your-password 替换为实际值
DATABASE_URL="postgresql://postgres.your-project:your-password@aws-0-ap-southeast-1.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres.your-project:your-password@aws-0-ap-southeast-1.pooler.supabase.com:5433/postgres"

NEXTAUTH_SECRET="生成的密钥"
NEXTAUTH_URL="http://localhost:3000"
```

### 步骤 3: 生成 NEXTAUTH_SECRET
```bash
openssl rand -base64 32
```

## 4. 运行数据库迁移

### 步骤 1: 安装依赖
```bash
cd next-app
npm install
```

### 步骤 2: 生成 Prisma Client
```bash
npx prisma generate
```

### 步骤 3: 推送 Schema 到 Supabase
```bash
npx prisma db push
```

### 步骤 4: (可选) 重置数据库
```bash
npx prisma migrate reset
```

## 5. 验证连接

### 方法 1: 使用 Prisma Studio
```bash
npx prisma studio
```
访问 http://localhost:5555 查看数据库

### 方法 2: 测试脚本
创建 `test-db.js`:
```javascript
import { prisma } from './lib/db.js'

async function test() {
  const count = await prisma.user.count()
  console.log('Users in database:', count)
  await prisma.$disconnect()
}

test()
```

运行:
```bash
node test-db.js
```

## 6. 生产环境配置

### Vercel 部署

#### 步骤 1: 安装 Vercel CLI
```bash
npm i -g vercel
```

#### 步骤 2: 登录并部署
```bash
vercel login
vercel
```

#### 步骤 3: 配置环境变量
在 Vercel Dashboard 中添加:
- `DATABASE_URL` (Supabase Pooler URL)
- `DIRECT_URL` (Supabase Direct URL)
- `NEXTAUTH_SECRET` (生成的密钥)
- `NEXTAUTH_URL` (你的域名，如 `https://your-app.vercel.app`)

### 其他平台

使用相同的 `DATABASE_URL` 和 `DIRECT_URL` 配置。

## 7. Supabase Dashboard 管理

### 查看表数据
1. 进入 **Table Editor**
2. 查看所有表: User, Class, StudentProgress, WeekProgress 等

### 执行 SQL 查询
1. 进入 **SQL Editor**
2. 执行自定义查询

### 监控数据库
1. 进入 **Reports** 查看性能
2. 设置慢查询警报

## 8. 常见问题

### 问题 1: 连接超时
**解决**: 使用 Connection Pooling URL (port 6543)

### 问题 2: 迁移失败
**解决**: 检查 DIRECT_URL 是否正确配置

### 问题 3: 权限错误
**解决**: 确保数据库密码正确，重置连接字符串

### 问题 4: Prisma 版本冲突
```bash
npm install prisma@latest @prisma/client@latest
npx prisma generate
```

## 9. 安全建议

1. **不要提交 .env 文件到 Git**
2. **使用强密码**
3. **启用 Row Level Security (RLS)** (如需要)
4. **定期备份**

## 10. 备份与恢复

### 备份
```bash
# 使用 pg_dump
pg_dump $DATABASE_URL > backup.sql
```

### 恢复
```bash
psql $DATABASE_URL < backup.sql
```

或使用 Supabase Dashboard 的备份功能。

---

**快速命令参考:**

```bash
# 开发环境
npm run dev

# 数据库操作
npx prisma generate      # 生成 Client
npx prisma db push       # 推送 schema
npx prisma studio        # 可视化界面

# 部署
vercel --prod
```
