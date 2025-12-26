# ✅ Cloudflare Pages Upload Checklist

## ⚠️ IMPORTANT: Direct Upload Limitation

**Direct Upload does NOT support Pages Functions!**

If you need API endpoints, you **MUST use Git Integration** instead.

## Before Creating Your Zip File (Direct Upload)

### ❌ EXCLUDE These (Don't Include in Zip):

1. **`backend-csharp/`** - C# backend folder (not needed for Pages)
2. **`backend/`** - Python backend folder (removed)
3. **`functions/`** - **NOT supported in direct upload!** ❌
4. **`node_modules/`** - If present
5. **`.git/`** - Git folder (if present)
6. **`wrangler.toml`** - Already removed ✅
7. **`cloudflare-pages.json`** - Removed (was causing build error) ✅
8. **Any `.env` files** - Environment variables
9. **`*.bat` files** - Windows batch files (optional)
10. **`*.md` files** - Documentation files (optional)

### ✅ INCLUDE These (Must Be in Zip):

1. **`index.html`** - Main page
2. **`styles.css`** - Styles
3. **`script.js`** - JavaScript
4. **`payment.html`** - Payment page
5. **`success.html`** - Success page
6. **`cancel.html`** - Cancel page
7. **`admin.html`** - Admin page (if needed)
8. **`web/`** - Entire web folder with all platform pages
9. **`_redirects`** - **CRITICAL!** SPA routing
10. **`images/`** - All images
11. **`fonts/`** - All fonts
12. **`js/`** - JavaScript libraries
13. **`css/`** - Additional CSS files

## For Git Integration (Supports Functions!)

If using Git Integration, **INCLUDE** the `functions/` folder - it will work!

## Quick Zip Creation (Windows PowerShell)

```powershell
# Navigate to website folder
cd C:\Users\Admin\Desktop\website

# Create zip excluding backend folders
Compress-Archive -Path index.html,styles.css,script.js,payment.html,success.html,cancel.html,admin.html,web,functions,_redirects,images,fonts,js,css -DestinationPath crymson-site.zip -Force
```

Or manually:
1. Select all files EXCEPT `backend-csharp` and `backend`
2. Right-click → Send to → Compressed (zipped) folder
3. Name it `crymson-site.zip`

## Verify Your Zip Contains (Direct Upload):

- ✅ `_redirects` file in root
- ✅ `web/` folder
- ✅ All HTML files
- ❌ NO `functions/` folder (not supported in direct upload)
- ❌ NO `backend-csharp/` folder
- ❌ NO `backend/` folder
- ❌ NO `wrangler.toml`
- ❌ NO `cloudflare-pages.json`

## For Git Integration (Include Functions):

- ✅ `functions/api/` folder with `.js` files
- ✅ Everything else from above

## Upload Steps

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Pages** → **Create a project**
3. **Upload assets**
4. Drag and drop your zip file
5. Wait for deployment
6. Done! 🎉

## If You Still Get Build Error

The error might be cached. Try:
1. Create a **fresh zip** with only the required files
2. Make sure `cloudflare-pages.json` is NOT in the zip
3. Make sure `wrangler.toml` is NOT in the zip
4. Make sure no `backend-*` folders are in the zip

