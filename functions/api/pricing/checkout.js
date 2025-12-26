// Cloudflare Pages Function for /api/pricing/checkout
export async function onRequest() {
  return new Response(JSON.stringify({
    checkout_url: 'https://buy.stripe.com/14A00kdlSdny7ZL14qaR203',
    price: 13.00
  }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

