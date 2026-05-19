# Vercel Deployment Setup

This project has been configured for deployment to Vercel. Below is a summary of changes and next steps.

## ✅ Configuration Files Created/Updated

### 1. `vercel.json`
- **buildCommand**: `npm run build` (runs vite build)
- **outputDirectory**: `dist/client` (Vite client build output)
- **installCommand**: `npm ci` (recommended for consistent installs)
- **framework**: `vite` (Vercel recognizes and optimizes for Vite)
- **region**: `iad1` (us-east-1, can be customized)
- **routes**: Static asset paths are excluded from SSR so Vercel can serve them from `dist/client`; other requests fall back to the API handler

### 2. `.vercelignore`
Excludes unnecessary files from Vercel deployment to reduce bundle size and improve build times.

### 3. `api/index.ts`
Serverless function that:
- Acts as the SSR handler for dynamic routes
- Converts Vercel requests to Fetch API format
- Routes to the TanStack Start server handler
- Handles dynamic content after Vercel serves static assets from `dist/client`

### 4. Updated `package.json`
- Added `build:vercel` script for building with post-processing
- Kept `build` as the standard build command

## 📋 Next Steps for Deployment

### 1. Connect Repository to Vercel
```bash
# Option A: Using Vercel CLI
npm i -g vercel
vercel login
vercel link

# Option B: Via GitHub (Recommended)
# Go to https://vercel.com/new and connect your GitHub repo
# Select this project and import
```

### 2. Configure Environment Variables
In the Vercel Dashboard:
1. Go to **Project Settings** → **Environment Variables**
2. Add any custom API keys or configuration variables your app needs
3. (Supabase and other integrations have been removed from this version)

### 3. Verify Build Settings
In Vercel Dashboard **Settings**:
- **Build Command**: `npm run build`
- **Output Directory**: (Should be auto-detected as `dist/client`)
- **Install Command**: `npm ci`
- **Node.js Version**: Should be 18.x or higher (auto-detected from project)

### 4. Deploy
```bash
# Option A: Using CLI
vercel deploy --prod

# Option B: Automatic
git push origin main  # Triggers automatic deployment on connected GitHub
```

## 🏗️ Build Architecture

The project uses a hybrid approach:

1. **Client Build** (`dist/client/`)
   - Static assets (HTML, CSS, JS bundles)
   - Served directly by Vercel's CDN
   - Optimized for fast delivery

2. **Server Build** (`dist/server/`)
   - SSR handler for dynamic rendering
   - Used by the Serverless Function (`api/index.ts`)
   - Handles route rendering, data fetching, etc.

3. **Serverless Function** (`api/index.ts`)
   - Converts Vercel requests to TanStack Start format
   - Handles unmatched requests through SSR
   - Static assets are served first by Vercel's filesystem route

## 📝 Important Notes

### Performance Considerations
- **First deployment** may take 60-120 seconds (build cache warming)
- **Subsequent deployments** are faster due to Vercel's caching
- The pricing chunk warnings in the build are normal for this app size

### Environment Variables
- Prefix client-side variables with `VITE_` (already configured)
- These will be embedded in the build and visible in browser (client-safe only!)
- Server-side variables should NOT have `VITE_` prefix

### Environment Variables
- Add any custom API keys your app needs

### Deployment Troubleshooting
- **Build fails**: Check that all required environment variables are set
- **Blank page**: Check browser console for errors
- **404 errors**: Verify that the API route is processing requests

## 🔗 Resources

- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/deploy.html)
- [TanStack Start Documentation](https://tanstack.com/start/latest)

## 🚀 Local Testing Before Deployment

Test your build locally to catch issues early:

```bash
# Build the project
npm run build

# Preview the built site locally
npm run preview

# The preview will show how it'll behave on Vercel
```

## 📊 Monitoring After Deployment

After deployment, monitor:
1. **Deployment logs** in Vercel Dashboard
2. **Function logs** via `vercel logs` CLI command
3. **Error tracking** in Sentry (if configured)
4. **Performance** via Vercel Analytics

## ✨ Next Features

To optimize further, consider:
- Image optimization with `next/image` or equivalent
- Incremental Static Regeneration (ISR) for static pages
- Edge middleware for authentication/redirects
