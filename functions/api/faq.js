// Cloudflare Pages Function for /api/faq
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
      'Cache-Control': 'public, max-age=3600',
      'Access-Control-Allow-Origin': '*'
    }
  });
}

