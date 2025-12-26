# Quick Upload Instructions for Cloudflare Pages

## ⚠️ Important: Direct Upload Limitations

**Direct Upload does NOT support Pages Functions!**

If you need API endpoints (`/api/*`), you **must use Git Integration** (Method 2) instead of direct upload.

## ⚠️ Before Uploading (Direct Upload Method)

**Exclude these from your zip file:**
- ❌ `backend-csharp/` folder (C# backend - not needed for Pages)
- ❌ `backend/` folder (Python backend - already removed)
- ❌ `functions/` folder - **NOT supported in direct upload!**
- ❌ `node_modules/` folder (if present)
- ❌ `wrangler.toml` (for Workers, not Pages - already removed)
- ❌ `cloudflare-pages.json` (was causing build error - already removed)
- ❌ `.git/` folder (if present)
- ❌ Any `.env` files

## ✅ What to Include (Direct Upload)

- ✅ All HTML files (`index.html`, `payment.html`, etc.)
- ✅ All CSS/JS files
- ✅ `web/` folder (all platform pages)
- ✅ `images/`, `fonts/`, `js/`, `css/` folders
- ✅ `_redirects` file - **IMPORTANT!**

## Step-by-Step Upload

1. **Create a clean folder** with only the files you need
2. **Zip the folder** (make sure `functions/` and `_redirects` are included)
3. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
4. Navigate to **Pages** → **Create a project**
5. Select **Upload assets**
6. Upload your zip file
7. Wait for deployment (usually 30-60 seconds)
8. Your site is live! 🎉

## Verify After Upload

1. Check that your site loads: `https://your-project.pages.dev`
2. ⚠️ **Note**: API endpoints won't work with direct upload - use Git Integration instead

## Troubleshooting

### "Uploader does not support build process" Error
- ✅ **Fixed!** `wrangler.toml` has been removed
- ✅ **Fixed!** `cloudflare-pages.json` has been removed (was causing the error)
- Make sure you're not including `backend-csharp/` folder
- Make sure you're not including any build config files
- Create a **fresh zip** file with only the required files

### API Endpoints Not Working
- Verify `functions/` folder is in your zip
- Check that files are in `functions/api/` structure
- Functions should work automatically - no build needed

### 404 Errors on Routes
- Make sure `_redirects` file is in the root of your zip
- Content should be: `/* /index.html 200`

## Method 2: Git Integration (Recommended - Supports Functions!)

**This is the ONLY way to use Pages Functions (API endpoints).**

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to Cloudflare Dashboard → **Pages** → **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: (leave empty)
   - **Build output directory**: `/` (root)
   - **Root directory**: `/` (root)
5. Click **Save and Deploy**

**✅ Your `functions/` folder will work automatically!**

### What to Include in Git (for Functions support):
- ✅ Everything from direct upload
- ✅ **`functions/` folder** - This will work with Git Integration!
- ✅ `_redirects` file

