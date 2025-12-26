// Cloudflare Pages Function for /api/pricing
export async function onRequest() {
  return new Response(JSON.stringify({
    price: 13.00,
    type: 'one-time',
    checkout_url: 'https://buy.stripe.com/14A00kdlSdny7ZL14qaR203'
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

