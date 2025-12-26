# 🚀 Quick Start Guide - Cloudflare Pages

## Choose Your Deployment Method

### Option A: Direct Upload (Static Site Only - No API)

**Use this if:** You don't need API endpoints, just a static website.

1. Create zip file **without** `functions/` folder
2. Upload to Cloudflare Pages
3. Done!

**Limitation:** API endpoints (`/api/*`) won't work.

---

### Option B: Git Integration (Full Features - With API) ✅ RECOMMENDED

**Use this if:** You want API endpoints to work.

1. Push code to GitHub
2. Connect to Cloudflare Pages
3. Deploy automatically
4. **Functions work automatically!**

**Advantage:** Full features including API endpoints.

---

## Step-by-Step: Git Integration (Recommended)

### 1. Create GitHub Repository

```bash
# Initialize git (if not already)
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/crymson-website.git
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. **Pages** → **Create a project**
3. **Connect to Git**
4. Select your repository
5. Configure:
   - **Build command**: (leave empty)
   - **Build output directory**: `/`
   - **Root directory**: `/`
6. Click **Save and Deploy**

### 3. Wait for Deployment

- Usually takes 1-2 minutes
- Your site will be live at: `https://your-project.pages.dev`
- **Functions automatically work!**

### 4. Test Your Site

- Frontend: `https://your-project.pages.dev`
- API: `https://your-project.pages.dev/api/stats` ✅ Works!

---

## What Gets Deployed

### ✅ Included (Works with Git Integration):
- All HTML, CSS, JS files
- `web/` folder (platform pages)
- `functions/` folder (API endpoints) ✅
- `_redirects` file (SPA routing)

### ❌ Excluded (Not needed):
- `backend-csharp/` (deploy separately if needed)
- `backend/` (removed)
- Documentation files (`.md`)

---

## Need Help?

- **Direct Upload Issues?** → Use Git Integration instead
- **API Not Working?** → Make sure you're using Git Integration
- **Functions Not Working?** → Check that `functions/` folder is in your Git repo

---

## Summary

| Method | Static Site | API Endpoints | Setup Time |
|--------|------------|---------------|------------|
| Direct Upload | ✅ | ❌ | 1 minute |
| Git Integration | ✅ | ✅ | 5 minutes |

**Recommendation:** Use Git Integration for full features!

