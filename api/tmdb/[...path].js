const ALLOWED_PATH = /^[A-Za-z0-9_/-]+$/;

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'METHOD_NOT_ALLOWED' });
  }

  const pathParts = Array.isArray(req.query.path) ? req.query.path : [req.query.path];
  const path = pathParts.filter(Boolean).join('/');
  if (!path || !ALLOWED_PATH.test(path) || path.includes('..')) {
    return res.status(400).json({ error: 'INVALID_TMDB_PATH' });
  }

  const apiKey = process.env.TMDB_API_KEY;
  const accessToken = process.env.TMDB_ACCESS_TOKEN;
  if (!apiKey && !accessToken) return res.status(500).json({ error: 'TMDB_CREDENTIALS_MISSING' });

  const params = new URLSearchParams();
  for (const [key, value] of Object.entries(req.query)) {
    if (key === 'path') continue;
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== undefined && item !== null) params.append(key, String(item));
    }
  }
  if (apiKey && !accessToken) params.set('api_key', apiKey);

  try {
    const response = await fetch(`https://api.themoviedb.org/3/${path}?${params}` , {
      headers: {
        Accept: 'application/json',
        ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {})
      }
    });
    const body = await response.text();
    res.setHeader('Content-Type', response.headers.get('content-type') || 'application/json');
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate=300');
    return res.status(response.status).send(body);
  } catch (error) {
    console.error('TMDB proxy request failed', error);
    return res.status(502).json({ error: 'TMDB_UPSTREAM_UNAVAILABLE' });
  }
};
