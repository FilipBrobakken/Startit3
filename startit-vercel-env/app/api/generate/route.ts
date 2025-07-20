
export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  const body = await req.json();
  const idea = body.idea;

  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        {
          role: 'system',
          content: 'Du hjelper gründere å utvikle ideene sine.'
        },
        {
          role: 'user',
          content: `Gi meg navn, logobeskrivelse, elevator pitch og 5 steg for å starte ideen: ${idea}`
        }
      ]
    })
  });

  const data = await res.json();
  return new Response(JSON.stringify({ result: data.choices?.[0]?.message?.content || '' }), {
    headers: { 'Content-Type': 'application/json' }
  });
}
