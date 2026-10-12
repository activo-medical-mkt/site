# audit/: reusable on-page & AI-discovery audit kit

Audit any website's pages for search engines **and** AI answer engines (SEO / AEO / GEO), with evidence instead of impressions.

```
audit/
├─ ON-PAGE-AUDIT-GUIDE.md        ← the reusable guide (protocol, checklists, rubrics, research). Start here.
├─ audit-page.py                 ← measuring tool: one page, or a whole site from its sitemap
├─ profiles/
│  ├─ _template.json             ← copy for each new site
│  └─ activomedical.json
└─ sites/
   ├─ _template/SITE-NOTES.md    ← copy for each new site (fact register, inventory, findings)
   └─ activomedical/             ← the site-specific edition for activomedical.com
      ├─ ON-PAGE-AUDIT-GUIDE.md      (guide + this site's fact register, findings F1-F14, inventory, roadmap)
      ├─ SITE-NOTES.md
      └─ baseline-scan.md            (generated site scan)
```

Nothing in `audit/` ships to the website (`build.js` excludes it).

## New site in 5 commands

```bash
cp audit/profiles/_template.json audit/profiles/<site>.json          # fill in host, language, entities, mask_terms
cp -r audit/sites/_template audit/sites/<site>                       # then edit SITE-NOTES.md
python audit/audit-page.py --sitemap https://<host>/sitemap.xml --profile audit/profiles/<site>.json --out audit/sites/<site>/baseline-scan.md
python audit/audit-page.py https://<host>/<some-page> --profile audit/profiles/<site>.json         # evidence pack for one page
python audit/audit-page.py <local/file.html> --profile audit/profiles/<site>.json --json          # machine-readable
```

Then follow section 1 of the guide for each page.

## What the script gives you (and doesn't)

- **Measures** (raw HTML, like AI crawlers without JavaScript): title/meta length, H1 and heading skips, words, links and
  generic anchors, missing alt text, schema types and dates, vague-claim terms, risk phrases with context, lead text,
  tables/lists/video, authority-source links, hidden-but-crawlable blocks, trust signals, and (site scan) **near-duplicate pages**.
- **Doesn't judge** truth, expertise or originality: that is the audit. It never executes JavaScript.
- Languages built in: **Spanish** and **English** (auto-detected from `<html lang>`; add more in `LEX` at the top of the script).

## Requirements

Python 3.8+ (standard library only). Run from the repo root. Some CDNs block unknown user agents; run from a normal network.

## Keep it current

The research snapshot is dated **2026-10-12**. Review quarterly using Appendix C of the guide.
