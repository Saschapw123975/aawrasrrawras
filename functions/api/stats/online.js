// Cloudflare Pages Function for /api/stats/online
export async function onRequest() {
  return new Response(JSON.stringify({
    online: Math.floor(Math.random() * 200) + 200,
    peak_today: Math.floor(Math.random() * 300) + 500
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-cache',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

