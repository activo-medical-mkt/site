#!/usr/bin/env node
const { cpSync, rmSync, mkdirSync } = require("fs");
const { join } = require("path");

const DEST = join(__dirname, "public");

// Files/dirs to exclude from the deploy bundle
const EXCLUDE = new Set([
  ".git",
  ".gitignore",
  ".wranglerignore",
  ".wrangler",
  "node_modules",
  "public",
  "build.js",
  "wrangler.jsonc",
  "design.md",
  "generate-sitemap.ps1",
  "submit-indexnow.ps1",
  "lib",
  "src",
  "_redirects",
]);

// Clean & recreate
rmSync(DEST, { recursive: true, force: true });
mkdirSync(DEST);

const entries = require("fs").readdirSync(__dirname);
for (const entry of entries) {
  if (EXCLUDE.has(entry)) continue;
  cpSync(join(__dirname, entry), join(DEST, entry), { recursive: true });
}

console.log("✅ Built public/ directory");
