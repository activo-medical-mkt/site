#!/usr/bin/env node
'use strict';

const fs   = require('fs');
const path = require('path');

const DEST = path.join(__dirname, 'public');

// Files/dirs to exclude from the deploy bundle
const EXCLUDE = new Set([
  '.git', '.gitignore', '.wranglerignore', '.wrangler',
  'node_modules', 'public', 'build.js', 'wrangler.jsonc',
  'design.md', 'generate-sitemap.ps1', 'submit-indexnow.ps1',
  'lib', 'src', '_redirects',
  '.env', '.env.local', '.env.production',
  'package.json', 'package-lock.json',
]);

// Clean & recreate
fs.rmSync(DEST, { recursive: true, force: true });
fs.mkdirSync(DEST);

// Copy everything first
for (const entry of fs.readdirSync(__dirname)) {
  if (EXCLUDE.has(entry)) continue;
  fs.cpSync(path.join(__dirname, entry), path.join(DEST, entry), { recursive: true });
}
console.log('📁 Files copied');

// ─── post-process ────────────────────────────────────────────────────────────

const CleanCSS = require('clean-css');
const { minify: terserMinify } = require('terser');
const sharp = require('sharp');

// JS files that are browser-side code (exclude node scripts)
const JS_SKIP = new Set(['serve.js']);

// Walk public directory recursively, collect files by extension
function walk(dir, results = []) {
  for (const name of fs.readdirSync(dir)) {
    const full = path.join(dir, name);
    if (fs.statSync(full).isDirectory()) walk(full, results);
    else results.push(full);
  }
  return results;
}

const allFiles = walk(DEST);

const cssFiles = allFiles.filter(f => f.endsWith('.css'));
const jsFiles  = allFiles.filter(f => f.endsWith('.js') && !JS_SKIP.has(path.basename(f)));
// Images in Assets/ only — skip generated/ and favicon PNGs (must stay as PNG for Google)
const imgFiles = allFiles.filter(f => {
  const ext = path.extname(f).toLowerCase();
  const name = path.basename(f);
  return (ext === '.png' || ext === '.jpg' || ext === '.jpeg') &&
         f.includes(`${path.sep}Assets${path.sep}`) &&
         !f.includes(`${path.sep}generated${path.sep}`) &&
         !name.startsWith('favicon');  // keep favicon-*.png as PNG (Google doesn't support WebP favicons)
});

// ── 1. Minify CSS ──────────────────────────────────────────────────────────
const cc = new CleanCSS({ level: 2, returnPromise: false });
let cssCount = 0;
for (const f of cssFiles) {
  const src = fs.readFileSync(f, 'utf8');
  const out = cc.minify(src);
  if (out.errors && out.errors.length) {
    console.warn('⚠️  CSS minify error in', f, out.errors);
    continue;
  }
  fs.writeFileSync(f, out.styles, 'utf8');
  cssCount++;
}
console.log(`🎨 CSS minified (${cssCount} files)`);

// ── 2. Minify JS ───────────────────────────────────────────────────────────
async function minifyAllJs() {
  let jsCount = 0;
  for (const f of jsFiles) {
    const src = fs.readFileSync(f, 'utf8');
    try {
      const out = await terserMinify(src, { compress: true, mangle: true });
      if (out.code) {
        fs.writeFileSync(f, out.code, 'utf8');
        jsCount++;
      }
    } catch (err) {
      console.warn('⚠️  JS minify error in', path.basename(f), err.message);
    }
  }
  console.log(`⚡ JS minified (${jsCount} files)`);
}

// ── 3. Convert images to WebP and update HTML references ──────────────────
async function convertImages() {
  const converted = new Map(); // oldRelPath → newRelPath
  let imgCount = 0;

  for (const src of imgFiles) {
    const webpPath = src.replace(/\.(png|jpg|jpeg)$/i, '.webp');
    try {
      await sharp(src).webp({ quality: 82 }).toFile(webpPath);
      // Remove original from public/ (source still has it)
      fs.unlinkSync(src);
      // Track relative path mapping for HTML rewriting
      const relOld = path.relative(DEST, src).replace(/\\/g, '/');
      const relNew = path.relative(DEST, webpPath).replace(/\\/g, '/');
      converted.set(relOld, relNew);
      imgCount++;
    } catch (err) {
      console.warn('⚠️  Image convert error', path.basename(src), err.message);
    }
  }
  console.log(`🖼  Images → WebP (${imgCount} converted)`);

  // Rewrite HTML and JS src/srcset references
  const rewriteFiles = allFiles.filter(f => f.endsWith('.html') || f.endsWith('.js'));
  let htmlCount = 0;
  for (const htmlPath of rewriteFiles) {
    let html = fs.readFileSync(htmlPath, 'utf8');
    let changed = false;

    for (const [relOld, relNew] of converted) {
      // Match both quoted attribute values and unquoted occurrences
      const oldName = path.basename(relOld);   // e.g. GDL-desktop.png
      const newName = path.basename(relNew);   // e.g. GDL-desktop.webp
      if (html.includes(oldName)) {
        html = html.split(oldName).join(newName);
        changed = true;
      }
    }

    if (changed) {
      fs.writeFileSync(htmlPath, html, 'utf8');
      htmlCount++;
    }
  }
  console.log(`📝 HTML+JS updated (${htmlCount} files)`);
}

// Run async steps
(async () => {
  await minifyAllJs();
  await convertImages();
  await regenFavicon();
  console.log('✅ Built public/ directory');
})();

// ── 4. Regenerate favicon.ico from the purple-background PNG ──────────────
// The committed .ico may be white-on-transparent; rebuilding from the PNG
// ensures the ICO always has the correct background in the deployed output.
async function regenFavicon() {
  const srcPng = path.join(__dirname, 'Assets', 'Logos', 'favicon-96x96.png');
  const destIco = path.join(DEST, 'Assets', 'Logos', 'favicon.ico');
  if (!fs.existsSync(srcPng)) return;

  const sizes = [16, 32, 48];
  const pngBuffers = await Promise.all(
    sizes.map(s => sharp(srcPng).resize(s, s).png().toBuffer())
  );

  // Build ICO binary with embedded PNG images (Vista+ format)
  const headerSize = 6 + sizes.length * 16;
  const offsets = [];
  let offset = headerSize;
  for (const buf of pngBuffers) { offsets.push(offset); offset += buf.length; }

  const hdr = Buffer.alloc(6);
  hdr.writeUInt16LE(0, 0);           // reserved
  hdr.writeUInt16LE(1, 2);           // type: 1 = ICO
  hdr.writeUInt16LE(sizes.length, 4); // image count

  const dir = Buffer.alloc(sizes.length * 16);
  sizes.forEach(function(size, i) {
    const e = i * 16;
    dir.writeUInt8(size >= 256 ? 0 : size, e);      // width (0 = 256)
    dir.writeUInt8(size >= 256 ? 0 : size, e + 1);  // height
    dir.writeUInt8(0,  e + 2);                        // color count
    dir.writeUInt8(0,  e + 3);                        // reserved
    dir.writeUInt16LE(1,  e + 4);                     // planes
    dir.writeUInt16LE(32, e + 6);                     // bit count
    dir.writeUInt32LE(pngBuffers[i].length, e + 8);   // bytes in resource
    dir.writeUInt32LE(offsets[i],           e + 12);  // image offset
  });

  fs.writeFileSync(destIco, Buffer.concat([hdr, dir, ...pngBuffers]));
  console.log('🔖 favicon.ico regenerated');
}

