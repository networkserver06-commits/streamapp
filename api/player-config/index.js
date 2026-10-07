const ALLOWED_ENV_KEYS = [
  'NEXT_PUBLIC_PLAYER_GATEWAY_URL',
  'NEXT_PUBLIC_SERVER_2_URL',
  'NEXT_PUBLIC_SERVER_3_URL'
];

module.exports = function playerConfigHandler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const values = ALLOWED_ENV_KEYS.map((key) => String(process.env[key] || '').trim());
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(200).json({
    primaryTemplate: values[0] || '',
    sources: values.map((template, index) => ({ template, index })).filter((source) => source.template).map(({ template, index }) => ({
      id: index === 0 ? 'vercel-primary' : `vercel-server-${index + 1}`,
      label: index === 0 ? 'Vercel primary' : `Vercel Server ${index + 1}`,
      template
    }))
  });
};
