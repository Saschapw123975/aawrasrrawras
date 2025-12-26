// Cloudflare Pages Function for /api/stats
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
      'Cache-Control': 'public, max-age=60',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

