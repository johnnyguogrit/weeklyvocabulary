# Vercel Deployment Experience Summary

## Project Structure

The project uses a monorepo structure with the Next.js application in a subdirectory:

```
weeklyvocabulary/
├── next-app/          # Next.js application (Root Directory for Vercel)
│   ├── app/          # Next.js App Router
│   ├── components/   # React components
│   ├── lib/          # Utilities (auth, db, utils)
│   ├── prisma/       # Database schema
│   └── public/       # Static assets
├── app/              # React + Vite application (local development)
├── backend/          # Python backend
└── data/             # Shared data files
```

## Vercel Configuration

### Critical Settings

| Setting | Value | Notes |
|---------|-------|-------|
| **Root Directory** | `next-app` | REQUIRED - points to Next.js app |
| **Framework Preset** | `Next.js` | Auto-detected from next-app/package.json |
| **Build Command** | (empty) | Auto-detected: `pnpm run build` |
| **Install Command** | (empty) | Auto-detected: `pnpm install` |
| **Output Directory** | (empty) | Auto-detected: `.next` |

### next-app/vercel.json

```json
{
  "outputDirectory": ".next"
}
```

## Key Challenges & Solutions

### 1. Prisma Client Location

**Problem:** Default `@prisma/client` location caused issues with pnpm store structure on Vercel.

**Solution:**
```prisma
// prisma/schema.prisma
generator client {
  provider        = "prisma-client-js"
  output          = "../generated/client"
  engineType      = "library"  // Force Node.js only
}
```

The generated client is committed to git to avoid build-time generation issues.

### 2. Edge Runtime Compatibility

**Problem:** NextAuth with Prisma requires Node.js runtime, but Middleware defaults to Edge Runtime.

**Solution:** 
- Disabled middleware (Edge Runtime incompatible with Prisma)
- Moved authentication to page-level using server components
- Created `app/teacher/layout.tsx` and `app/student/layout.tsx` for route protection

### 3. Tailwind CSS v4 Compatibility

**Problem:** Tailwind CSS v4 uses `--spacing()` syntax incompatible with Vercel's build process.

**Solution:** Downgraded to Tailwind CSS v3:
```json
{
  "devDependencies": {
    "tailwindcss": "^3.4.19",
    "autoprefixer": "^10.5.0",
    "postcss": "^8.5.12"
  }
}
```

Fixed Radix UI components that used Tailwind v4 syntax:
- Removed `--spacing(var(--gap))` 
- Replaced `calc(var(--spacing)*4)` with `1rem`
- Removed `[--cell-size:--spacing(8)]`

### 4. Root Directory Confusion

**Problem:** Initially tried building from root directory with `cd next-app` commands, causing path confusion.

**Solution:** Set Vercel **Root Directory** to `next-app` so all commands run in the correct context.

### 5. Lockfile Updates

**Problem:** pnpm lockfile became outdated after package.json changes.

**Solution:** Always run `pnpm install` locally after modifying dependencies, then commit the updated `pnpm-lock.yaml`.

### 6. Configuration Sync

**Problem:** Production deployment used old settings despite project settings being updated.

**Solution:** Click **Redeploy** to apply new configuration settings to production.

## Environment Variables (Required)

Set these in Vercel Dashboard → Settings → Environment Variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://...` |
| `DIRECT_URL` | Direct connection for Supabase | `postgresql://...` |
| `NEXTAUTH_SECRET` | NextAuth secret | Random string |
| `NEXTAUTH_URL` | Production URL | `https://weeklyvocabulary.vercel.app` |

## Build Process Summary

1. **Cloning** → Pull latest from GitHub
2. **Installing** → `pnpm install` (detects pnpm-lock.yaml v9/v10)
3. **Postinstall** → `prisma generate` (generates Prisma Client)
4. **Building** → `next build` (Turbopack)
5. **Output** → `.next` directory
6. **Deploying** → Upload to Vercel Edge Network

## Common Errors & Fixes

| Error | Cause | Fix |
|-------|-------|-----|
| `ERR_PNPM_OUTDATED_LOCKFILE` | package.json changed but lockfile not updated | Run `pnpm install` locally and commit |
| `Cannot find module '@tailwindcss/postcss'` | Tailwind v4 incompatibility | Downgrade to v3 |
| `Edge Runtime unsupported modules` | Middleware with Prisma | Remove middleware, use page-level auth |
| `No Output Directory named "public"` | Wrong root directory | Set Root Directory to `next-app` |
| `404 on all routes` | Old deployment configuration | Redeploy with new settings |

## Performance Optimization

1. **Static Pages** - Home, login, register are pre-rendered as static content
2. **Dynamic Routes** - API routes and authenticated pages are server-rendered on demand
3. **Edge Runtime** - Not used (Prisma requires Node.js)
4. **Turbopack** - Enabled for faster builds

## Monitoring

- **Vercel Dashboard** → Deployments → View build logs
- **Vercel Dashboard** → Functions → View runtime errors
- **Vercel Dashboard** → Analytics → View traffic and performance

## Deployment Command (CLI)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy from next-app directory
cd next-app
vercel --prod
```

## Continuous Deployment

Git pushes to `master` branch trigger automatic Vercel deployments.

To skip deployment for a commit:
```bash
git commit --no-verify -m "..."
# or add [skip-vercel] to commit message
```

## Version Control

Use git tags for version releases:
```bash
git tag -a v1.0.0 -m "Production release"
git push origin v1.0.0
```
