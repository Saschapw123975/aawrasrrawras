// Cloudflare Pages Function for /api/games
export async function onRequest(context) {
  const { request } = context;
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') || '1'));
  const limit = Math.max(1, Math.min(50, parseInt(url.searchParams.get('limit') || '8')));

  try {
    // Fetch from Steam API
    const [featuredRes, storefrontRes] = await Promise.all([
      fetch('https://store.steampowered.com/api/featured', {
        headers: { 'User-Agent': 'Crymson/1.0' }
      }),
      fetch('https://store.steampowered.com/api/featuredcategories', {
        headers: { 'User-Agent': 'Crymson/1.0' }
      })
    ]);

    const featured = await featuredRes.json();
    const storefront = await storefrontRes.json();

    // Process featured games
    const games = [];
    const seenIds = new Set();

    // Featured games
    ['featured_win', 'featured_mac', 'featured_linux'].forEach(platform => {
      if (featured[platform]) {
        featured[platform].forEach(game => {
          if (game.id && !seenIds.has(game.id)) {
            seenIds.add(game.id);
            games.push({
              id: game.id,
              name: game.name || 'Unknown',
              image: game.header_image || game.large_capsule_image || '',
              available: true
            });
          }
        });
      }
    });

    // Storefront categories
    ['specials', 'top_sellers', 'new_releases', 'coming_soon'].forEach(category => {
      if (storefront[category]?.items) {
        storefront[category].items.forEach(game => {
          if (game.id && !seenIds.has(game.id)) {
            seenIds.add(game.id);
            games.push({
              id: game.id,
              name: game.name || 'Unknown',
              image: game.header_image || game.large_capsule_image || '',
              available: true
            });
          }
        });
      }
    });

    // Add numbers
    games.slice(0, 160).forEach((game, index) => {
      game.number = index + 1;
    });

    const start = (page - 1) * limit;
    const end = start + limit;
    const paginatedGames = games.slice(start, end);

    return new Response(JSON.stringify({
      games: paginatedGames,
      total: games.length,
      page,
      shown: Math.min(end, games.length),
      has_more: end < games.length
    }), {
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=300',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    return new Response(JSON.stringify({ 
      error: error.message,
      games: [],
      total: 0,
      page: 1,
      shown: 0,
      has_more: false
    }), {
      status: 500,
      headers: { 
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

