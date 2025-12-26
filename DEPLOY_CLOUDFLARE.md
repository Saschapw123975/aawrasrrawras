# Deploying Crymson to Cloudflare Pages

This guide will help you deploy the Crymson website to Cloudflare Pages.

## Prerequisites

1. A Cloudflare account (free tier works)
2. Your code in a Git repository (GitHub, GitLab, or Bitbucket)

## Deployment Methods

### Method 1: Direct Upload (Quickest)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Select **Upload assets**
4. **Important**: Before zipping, make sure to:
   - Exclude `backend-csharp` folder (C# backend - not needed for Pages)
   - Exclude `node_modules` if present
   - Exclude `wrangler.toml` (this is for Workers, not Pages)
5. Zip your website folder
6. Upload the zip file
7. Your site will be live in seconds!

**Note**: The `functions/` folder will work automatically - Cloudflare Pages detects and uses it!

### Method 2: Git Integration (Recommended - Supports Functions! ✅)

**This is the ONLY method that supports Pages Functions (API endpoints).**

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to Cloudflare Dashboard → **Pages** → **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: (leave empty - static site)
   - **Build output directory**: `/` (root)
   - **Root directory**: `/` (root)
5. Click **Save and Deploy**

**✅ Your `functions/` folder will work automatically!** Cloudflare Pages detects and deploys them.

## Configuration Files

The following files are included for Cloudflare:

- **`_redirects`** - Cloudflare Pages redirects (SPA fallback) ✅ Required
- **`functions/`** - Cloudflare Pages Functions (API endpoints) ✅ **Only works with Git Integration**
- **`.htaccess`** - Apache fallback (optional, for other hosts)

**Important Notes**: 
- `wrangler.toml` has been removed (for Workers, not Pages)
- `cloudflare-pages.json` has been removed (was causing build error)
- **Pages Functions only work with Git Integration**, not direct upload
- Headers and caching are handled automatically by Cloudflare Pages

## Custom Domain Setup

1. In Cloudflare Pages, go to your project
2. Click **Custom domains**
3. Add your domain
4. Update DNS records as instructed
5. SSL will be automatically provisioned

## Environment Variables

If you need environment variables (for API keys, etc.):

1. Go to your Pages project
2. Navigate to **Settings** → **Environment variables**
3. Add your variables
4. Redeploy

## API Backend

**Note**: The C# backend (`backend-csharp`) is separate and needs to be deployed separately:

- Deploy to a VPS/server
- Use Cloudflare Workers (Node.js)
- Use Azure App Service
- Use AWS Lambda

For static site hosting on Cloudflare Pages, the frontend works independently.

## Build Settings

**Build command**: (empty - no build needed)
**Build output directory**: `/`
**Root directory**: `/`

## File Structure for Deployment

```
website/
├── index.html
├── styles.css
├── script.js
├── payment.html
├── success.html
├── cancel.html
├── admin.html
├── web/
│   ├── index.html
│   ├── store.html
│   └── ... (all web files)
├── functions/          ← Cloudflare Pages Functions (API)
│   └── api/
│       ├── games.js
│       ├── stats.js
│       └── ... (all API endpoints)
├── images/
├── fonts/
├── js/
├── css/
└── _redirects          ← Required for SPA routing
```

**Exclude from upload:**
- `backend-csharp/` (C# backend - deploy separately if needed)
- `node_modules/` (if present)
- `wrangler.toml` (for Workers, not Pages - already removed)

## Caching Strategy

- **Static assets** (CSS, JS, fonts): 1 year cache
- **HTML files**: 1 hour cache
- **Web folder**: 1 day cache

## Troubleshooting

### 404 Errors
- Ensure `_redirects` file is in the root
- Check that redirect rule is: `/* /index.html 200`

### Assets Not Loading
- Verify file paths are relative (not absolute)
- Check browser console for errors
- Ensure files are in the correct directories

### API Calls Failing
- Update API endpoints to use your backend URL
- Configure CORS on your backend
- Check Cloudflare Workers for API proxying

## Support

For Cloudflare Pages documentation:
https://developers.cloudflare.com/pages/

