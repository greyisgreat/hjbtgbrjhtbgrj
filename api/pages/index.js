const fetch = require('node-fetch');

module.exports = async (req, res) => {
  const targetUrl = req.query.url;
  if (!targetUrl) {
    res.status(400).json({ error: 'No URL provided' });
    return;
  }
  try {
    const response = await fetch(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Proxy/1.0; +github)'
      }
    });
    let body = await response.text();

    // Basic ad-block: remove <script> and <iframe> tags
    body = body.replace(/<script[\s\S]*?<\/script>/gi, '')
               .replace(/<iframe[\s\S]*?<\/iframe>/gi, '');

    res.status(response.status).send(body);
  } catch (err) {
    res.status(500).json({ error: 'Proxy error', detail: err.toString() });
  }
};
