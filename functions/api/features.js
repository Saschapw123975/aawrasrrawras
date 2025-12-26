// Cloudflare Pages Function for /api/features
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
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

