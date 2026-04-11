#!/usr/bin/env node
/**
 * Local dev server — serves the public/ directory on http://localhost:8787
 * Usage: node serve.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, 'public');
const PORT = 8787;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css':  'text/css',
  '.js':   'application/javascript',
  '.json': 'application/json',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg':  'image/svg+xml',
  '.ico':  'image/x-icon',
  '.mp4':  'video/mp4',
  '.ttf':  'font/ttf',
  '.otf':  'font/otf',
  '.woff': 'font/woff',
  '.woff2':'font/woff2',
  '.xml':  'application/xml',
  '.txt':  'text/plain',
};

function serveFile(filePath, res) {
  const ext = path.extname(filePath).toLowerCase();
  try {
    const data = fs.readFileSync(filePath);
    res.writeHead(200, {
      'Content-Type': MIME[ext] || 'application/octet-stream',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
      'Pragma': 'no-cache',
      'Expires': '0',
    });
    res.end(data);
    return true;
  } catch {
    return false;
  }
}

http.createServer((req, res) => {
  let urlPath = req.url.split('?')[0];

  // Try exact file first
  const exactFile = path.join(ROOT, urlPath);
  if (serveFile(exactFile, res)) return;

  // Try appending index.html for trailing slash
  if (urlPath.endsWith('/')) {
    if (serveFile(path.join(ROOT, urlPath, 'index.html'), res)) return;
  } else {
    // Try as directory/index.html
    if (serveFile(path.join(ROOT, urlPath, 'index.html'), res)) return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('404 Not Found: ' + urlPath);
}).listen(PORT, () => {
  console.log(`\n  Dev server running at http://localhost:${PORT}\n`);
  console.log('  Press Ctrl+C to stop.\n');
});
