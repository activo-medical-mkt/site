# Activo Medical Marketing (activomedical.com): audit notes

Reusable guide: `audit/ON-PAGE-AUDIT-GUIDE.md` · Profile: `audit/profiles/activomedical.json`

The site-specific material (canonical description, **fact register**, **page inventory**, **findings F1-F14**,
Mexico health-advertising notes, 90-day roadmap) lives in this folder's
[`ON-PAGE-AUDIT-GUIDE.md`](ON-PAGE-AUDIT-GUIDE.md): sections 2, 7, 10, 11.7 and 11.11. Update it there.

- `baseline-scan.md`: site scan generated 2026-10-12 (re-run after fixes and compare).
- `reports/`: per-page audit reports.

Regenerate the scan:
```bash
python audit/audit-page.py --sitemap https://activomedical.com/sitemap.xml --profile audit/profiles/activomedical.json --out audit/sites/activomedical/baseline-scan.md
```
