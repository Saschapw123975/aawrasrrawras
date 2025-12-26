# 🎮 Crymson Gaming Platform

A modern gaming platform website with Steam API integration, real-time stats, and premium features.

## Features

- **Modern Dark Theme** - Sleek blue/black branded design
- **Steam API Integration** - Loads real games with images
- **Live Statistics** - Real-time online user counts and platform stats
- **One-Time Purchase** - $13 lifetime access
- **Responsive Design** - Works on all devices
- **Animated UI** - Smooth transitions and animations
- **Full Platform Preview** - Complete web-based gaming platform

## Project Structure

```
website/
├── index.html          # Main landing page
├── styles.css          # Crymson themed CSS
├── script.js           # Frontend JavaScript
├── payment.html        # Payment method selection
├── success.html        # Payment success page
├── cancel.html         # Payment cancellation page
├── admin.html          # Admin dashboard
├── web/                # Platform pages
│   ├── index.html      # Login page
│   ├── store.html      # Game store
│   ├── library.html    # Game library
│   └── ...             # Other platform pages
├── backend-csharp/     # C# .NET 8 backend (optional)
│   ├── Program.cs
│   └── Controllers/
├── _redirects          # Cloudflare Pages redirects
├── wrangler.toml       # Cloudflare Workers config
└── cloudflare-pages.json # Cloudflare Pages config
```

## Quick Start

### Local Development

1. **Static Site (No Backend)**
   - Simply open `index.html` in a browser
   - Or use any static file server:
     ```bash
     # Python
     python -m http.server 8000
     
     # Node.js
     npx serve
     
     # PHP
     php -S localhost:8000
     ```

2. **With C# Backend** (Optional)
   ```bash
   cd backend-csharp
   dotnet run
   ```
   Server runs on `http://localhost:5000`

## Deployment to Cloudflare Pages

### Method 1: Direct Upload (Quickest)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** → **Create a project**
3. Select **Upload assets**
4. Zip your website folder (excluding `backend-csharp` and `node_modules`)
5. Upload the zip file
6. Your site will be live in seconds!

### Method 2: Git Integration (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Go to Cloudflare Dashboard → **Pages** → **Create a project**
3. Connect your Git repository
4. Configure build settings:
   - **Build command**: (leave empty - static site)
   - **Build output directory**: `/` (root)
   - **Root directory**: `/` (root)
5. Click **Save and Deploy**

See [DEPLOY_CLOUDFLARE.md](DEPLOY_CLOUDFLARE.md) for detailed instructions.

## API Endpoints (C# Backend)

| Endpoint | Description |
|----------|-------------|
| `GET /api/games` | Get games list (from Steam) |
| `GET /api/stats` | Get platform statistics |
| `GET /api/stats/online` | Get online user count |
| `GET /api/pricing` | Get pricing information |
| `GET /api/features` | Get feature list |
| `GET /api/faq` | Get FAQ |

## Tech Stack

**Frontend:**
- HTML5
- CSS3 (Custom properties, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- Outfit + JetBrains Mono fonts

**Backend (Optional):**
- C# .NET 8
- ASP.NET Core
- Steam API integration

## Design

The Crymson theme features:
- **Primary Color**: Blue (#3b82f6)
- **Secondary Color**: Cyan (#06b6d4)
- **Accent Color**: Purple (#8b5cf6)
- **Dark backgrounds** with gradient overlays
- **Glow effects** on interactive elements

## Steam API

The backend fetches games from Steam's public storefront API:
- Featured games
- Top sellers
- New releases

Games are cached for 10 minutes to reduce API calls.

## Customization

### Colors

Edit CSS variables in `styles.css`:

```css
:root {
    --primary: #3b82f6;
    --secondary: #06b6d4;
    --accent: #8b5cf6;
    /* ... */
}
```

### Pricing

Edit the pricing in `backend-csharp/Controllers/PricingController.cs` or update directly in `index.html`.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

For educational purposes.

---

Made with ❤️ by Crymson Team
