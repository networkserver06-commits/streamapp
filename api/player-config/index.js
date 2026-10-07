const ALLOWED_ENV_KEYS = [
  'NEXT_PUBLIC_PLAYER_GATEWAY_URL',
  'NEXT_PUBLIC_SERVER_2_URL',
  'NEXT_PUBLIC_SERVER_3_URL'
];

function getExtraHosts() {
  return String(process.env.NEXT_PUBLIC_ALLOWED_PLAYER_HOSTS || '')
    .split(',')
    .map((host) => host.trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, ''))
    .filter((host) => /^[a-z0-9.-]+$/.test(host));
}

function templateHost(template) {
  try {
    const sample = template
      .replace(/\{youtube_key\}/g, 'sample')
      .replace(/\{archive_id\}/g, 'sample')
      .replace(/\{tmdb_id\}/g, '123')
      .replace(/\{type\}/g, 'movie')
      .replace(/\{season\}/g, '1')
      .replace(/\{episode\}/g, '1');
    const host = new URL(sample).hostname.toLowerCase().replace(/^www\./, '');
    return host;
  } catch {
    return '';
  }
}

module.exports = function playerConfigHandler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const values = ALLOWED_ENV_KEYS.map((key) => String(process.env[key] || '').trim())
    .map((template) => templateHost(template) ? template : '');
  const allowedHosts = getExtraHosts();
  const providerHosts = [...new Set(values.map(templateHost).filter(Boolean))];
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  return res.status(200).json({
    primaryTemplate: values[0] || '',
    allowedHosts,
    providerHosts,
    sources: values.map((template, index) => ({ template, index })).filter((source) => source.template).map(({ template, index }) => ({
      id: index === 0 ? 'vercel-primary' : `vercel-server-${index + 1}`,
      label: index === 0 ? 'Primary' : `Server ${index + 1}`,
      template
    }))
  });
};
