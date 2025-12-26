# Deploying Crymson Backend to Cloudflare

## Overview

Cloudflare Pages is for **static sites only**. However, you have several options for deploying your C# backend:

## Option 1: Cloudflare Workers (Recommended for Cloudflare)

Cloudflare Workers support JavaScript/TypeScript, Python, and Rust - but **not C# directly**.

### Solution: Convert API to Cloudflare Workers

You can rewrite your API endpoints as Cloudflare Workers. Here's how:

#### Create `functions/api/games.js` (Cloudflare Pages Functions)

```javascript
export async function onRequest(context) {
  const { request, env } = context;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || '1');
  const limit = parseInt(url.searchParams.get('limit') || '8');

  try {
    // Fetch from Steam API
    const steamResponse = await fetch('https://store.steampowered.com/api/featured');
    const steamData = await steamResponse.json();
    
    // Process games (similar to your C# logic)
    const games = [];
    // ... process games ...
    
    return new Response(JSON.stringify({
      games: games.slice((page - 1) * limit, page * limit),
      total: games.length,
      page,
      shown: Math.min(page * limit, games.length),
      has_more: page * limit < games.length
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
```

#### Create `functions/api/stats.js`

```javascript
export async function onRequest() {
  return new Response(JSON.stringify({
    total_games: 'Infinite',
    total_players: 2300,
    online_now: Math.floor(Math.random() * 200) + 200,
    price: 13.00,
    countries: 150
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60'
    }
  });
}
```

#### Create `functions/api/pricing.js`

```javascript
export async function onRequest() {
  return new Response(JSON.stringify({
    price: 13.00,
    type: 'one-time',
    checkout_url: 'https://buy.stripe.com/14A00kdlSdny7ZL14qaR203'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

#### Create `functions/api/features.js`

```javascript
export async function onRequest() {
  return new Response(JSON.stringify({
    features: [
      { icon: '♾️', title: 'Infinite Games', description: 'Unlimited access' },
      { icon: '🆓', title: 'All Games Free', description: 'Every game included' },
      { icon: '💰', title: 'One-Time Payment', description: '$13 forever' },
      { icon: '☁️', title: 'Cloud Saves', description: 'Sync everywhere' },
      { icon: '⚡', title: 'Fast Servers', description: 'Priority access' }
    ]
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

#### Create `functions/api/faq.js`

```javascript
export async function onRequest() {
  return new Response(JSON.stringify({
    faqs: [
      { question: 'Is Crymson free?', answer: 'No, it\'s a one-time $13 purchase for lifetime access.' },
      { question: 'What do I get?', answer: 'All games free, cloud saves, priority servers, forever.' },
      { question: 'Is this a subscription?', answer: 'No! Pay $13 once, never again.' },
      { question: 'Are games really free?', answer: 'Yes, every game is free with Crymson.' },
      { question: 'How do I pay?', answer: 'Secure Stripe checkout, cards accepted.' }
    ]
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600'
    }
  });
}
```

## Option 2: Deploy C# Backend Separately

Keep your C# backend and deploy it to:

### A. Azure App Service (Easiest for .NET)
1. Go to [Azure Portal](https://portal.azure.com)
2. Create App Service
3. Deploy from GitHub or upload files
4. Get your backend URL (e.g., `https://crymson-api.azurewebsites.net`)
5. Update frontend API calls to use this URL

### B. Railway
1. Go to [Railway](https://railway.app)
2. New Project → Deploy from GitHub
3. Select your `backend-csharp` folder
4. Railway auto-detects .NET and deploys
5. Get your backend URL

### C. Render
1. Go to [Render](https://render.com)
2. New Web Service
3. Connect GitHub repo
4. Build command: `cd backend-csharp && dotnet publish -c Release -o ./publish`
5. Start command: `cd backend-csharp/publish && dotnet BackendCSharp.dll`
6. Get your backend URL

### D. Fly.io
1. Install Fly CLI
2. `cd backend-csharp`
3. `fly launch`
4. Follow prompts
5. `fly deploy`

### E. VPS (DigitalOcean, Linode, etc.)
1. Deploy to VPS
2. Install .NET 8 Runtime
3. Run your published backend
4. Use Cloudflare as reverse proxy

## Option 3: Hybrid Approach (Recommended)

1. **Frontend**: Deploy to Cloudflare Pages (static site)
2. **Backend**: Deploy C# backend to Azure/Railway/Render
3. **Update Frontend**: Point API calls to your backend URL

### Update Frontend API Calls

In `script.js`, update API endpoints:

```javascript
// Instead of relative URLs
const API_BASE = 'https://your-backend-url.com';

// Update all fetch calls
fetch(`${API_BASE}/api/games`)
fetch(`${API_BASE}/api/stats`)
// etc.
```

## Option 4: Cloudflare Workers with C# (Advanced)

You can compile C# to WebAssembly and run in Workers, but this is complex and not recommended for this use case.

## Recommendation

**Best approach**: Deploy frontend to Cloudflare Pages, backend to Railway or Render (both have free tiers and easy .NET deployment).

This gives you:
- ✅ Fast static site hosting (Cloudflare CDN)
- ✅ Easy backend deployment (.NET support)
- ✅ Separate scaling
- ✅ Free tiers available

## Quick Start: Railway Deployment

1. Push code to GitHub
2. Go to [Railway](https://railway.app)
3. New Project → Deploy from GitHub
4. Select `backend-csharp` folder
5. Railway auto-detects and deploys
6. Get your backend URL
7. Update frontend API calls

That's it! Your backend will be live in minutes.

