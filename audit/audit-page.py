#!/usr/bin/env python3
"""Evidence packs for on-page / AI-discovery audits. Works on ANY site.

It only MEASURES (counts, lengths, flagged phrases). Deciding PASS/FAIL against the checklist is the
auditor's job: read the page and use these numbers as evidence. See ON-PAGE-AUDIT-GUIDE.md.

USAGE
  One page (local file or live URL):
    python audit/audit-page.py https://example.com/some-page
    python audit/audit-page.py public/index.html --profile audit/profiles/mysite.json
    python audit/audit-page.py <target> --json            # machine-readable
    python audit/audit-page.py <target> --out audit/reports/some-page-evidence.md

  Whole site from its sitemap (summary table + near-duplicate page pairs):
    python audit/audit-page.py --sitemap https://example.com/sitemap.xml --profile audit/profiles/mysite.json
    python audit/audit-page.py --sitemap <url> --limit 40 --similarity 0.5 --out audit/reports/site-scan.md

PROFILE (optional JSON, see audit/profiles/_template.json)
  site_name, host, language ("es"/"en"; default = <html lang>), entities[], author_names[],
  mask_terms[] (words masked before the near-duplicate comparison, e.g. city names),
  extra_vague{label: regex}, extra_risk[regex], authority_domain_regex, ymyl ("high"/"medium"/"low")

Fetching uses a normal browser-like user agent. Some CDNs block unknown agents: run it from a normal network.
"""
import argparse
import gzip
import html as htmllib
import json
import re
import sys
import urllib.request
import zlib
from urllib.parse import urlparse

UA = {"User-Agent": "Mozilla/5.0 (compatible; on-page-audit)"}

# ------------------------------------------------------------------------------------------------
# Lexicons. Add a language by adding a key. Keys: vague (label -> regex), risk (regex list),
# generic_anchor (regex), question_starts, credentials, regulation, faq.
# ------------------------------------------------------------------------------------------------
LEX = {
    "es": {
        "vague": {
            "líder": r"l[ií]der(es)?", "mejor": r"\bmejor(es)?\b", "experto(s)": r"expert[oa]s?", "innovador": r"innovador(a|es|as)?",
            "de calidad": r"(alta )?calidad", "profesional": r"profesional(es)?\b", "avanzado": r"avanzad[oa]s?", "integral": r"integral(es)?",
            "soluciones": r"soluciones", "comprobado/probado": r"(comprobad|probad)[oa]s?", "años de experiencia": r"a[ñn]os de experiencia|amplia experiencia",
            "resultados": r"resultados", "éxito": r"\b[eé]xito", "rápido": r"r[aá]pid[oa]s?", "seguro": r"\bseguro[s]?\b", "confiable": r"confiable(s)?",
            "personalizado/a la medida": r"personalizad[oa]s?|a la medida", "alto impacto/rendimiento": r"alto impacto|alto rendimiento",
        },
        "risk": [r"garantiz\w+", r"garant[ií]a", r"100\s?%", r"sin riesgo", r"sin complicaciones", r"cura\w*", r"resultados? (inmediatos?|asegurados?)",
                 r"\b\d+\s?d[ií]as\b", r"el mejor", r"#1", r"n[uú]mero (uno|1)", r"antes y despu[eé]s", r"milagro\w*", r"primera semana"],
        "generic_anchor": r"^(aprende m[aá]s|leer m[aá]s|ver m[aá]s|saber m[aá]s|conocer m[aá]s|haz clic aqu[ií]|clic aqu[ií]|aqu[ií]|m[aá]s informaci[oó]n|contactar|ver todos.*)\W*$",
        "question_starts": ("qué", "que ", "cómo", "como ", "cuánto", "cuanto", "por qué", "cuándo", "cuando", "cuál", "dónde"),
        "credentials": r"maestr[ií]a|licenciatura|lic\.|doctorado|c[eé]dula|certificad|certified",
        "regulation": r"cofepris|norma oficial|nom-|ley federal|reglamento|fuente|estudio|investigaci[oó]n",
        "faq": r"preguntas frecuentes|faq",
    },
    "en": {
        "vague": {
            "leading": r"\bleading\b", "best": r"\bbest\b", "expert(s)": r"\bexperts?\b", "innovative": r"innovative|innovation", "high-quality": r"high[- ]quality",
            "professional": r"\bprofessional(s)?\b", "advanced": r"\badvanced\b", "comprehensive": r"comprehensive", "solutions": r"\bsolutions?\b",
            "proven": r"\bproven\b", "years of experience": r"years of experience|extensive experience", "results": r"\bresults\b", "success": r"\bsuccess(ful)?\b",
            "fast": r"\bfast(er|est)?\b", "secure": r"\bsecure\b", "reliable": r"\breliable\b", "tailored/customised": r"tailored|customi[sz]ed|personali[sz]ed",
            "world-class/cutting-edge": r"world[- ]class|cutting[- ]edge|state[- ]of[- ]the[- ]art", "seamless/robust": r"seamless|robust",
        },
        "risk": [r"guarantee\w*", r"100\s?%", r"risk[- ]free", r"no side effects", r"\bcure\w*", r"results (in|within) \d+", r"\bbest\b", r"#1", r"number (one|1)",
                 r"before and after", r"miracle\w*", r"instant\w*"],
        "generic_anchor": r"^(learn more|read more|click here|here|more info(rmation)?|see more|view more|contact us|view all.*)\W*$",
        "question_starts": ("what", "how", "why", "when", "where", "which", "who", "can ", "should ", "is ", "are ", "do ", "does "),
        "credentials": r"\bph\.?d\b|\bm\.?d\b|\bmba\b|degree|licensed|certified|certification|board[- ]certified",
        "regulation": r"\bfda\b|\bftc\b|\bsec\b|regulation|guideline|source|study|research|peer[- ]reviewed",
        "faq": r"frequently asked|\bfaq\b",
    },
}
AUTHORITY_DEFAULT = (r"\.gov(\.[a-z]{2})?$|\.gob\.[a-z]{2}$|gob\.mx|\.edu(\.[a-z]{2})?$|who\.int|paho\.org|nih\.gov|pubmed|cdc\.gov|mayoclinic|medlineplus|"
                     r"cochrane|scielo|wikipedia\.org|europa\.eu|oecd\.org|worldbank\.org|iso\.org|w3\.org|developers\.google\.com|schema\.org")


# ------------------------------------------------------------------------------------------------
def load_profile(path):
    if not path:
        return {}
    with open(path, encoding="utf-8") as fh:
        return {k: v for k, v in json.load(fh).items() if not k.startswith("_")}


def fetch(target):
    if re.match(r"https?://", target):
        req = urllib.request.Request(target, headers={**UA, "Accept-Encoding": "identity", "Accept": "text/html,application/xhtml+xml,application/xml"})
        resp = urllib.request.urlopen(req, timeout=30)
        data = resp.read()
        enc = (resp.headers.get("Content-Encoding") or "").lower()
        if enc == "gzip" or data[:2] == b"\x1f\x8b":  # some servers gzip even when told not to
            data = gzip.decompress(data)
        elif enc == "deflate":
            data = zlib.decompress(data)
        return data.decode("utf-8", "replace")
    with open(target, "rb") as fh:
        return fh.read().decode("utf-8", "replace")


def text_of(fragment):
    return re.sub(r"\s+", " ", htmllib.unescape(re.sub(r"<[^>]+>", " ", fragment))).strip()


def strip_noise(h):
    return re.sub(r"<(script|style|svg|noscript|template)\b.*?</\1>", " ", h, flags=re.S | re.I)


def contexts(pattern, body, limit=2, width=110):
    out = []
    for m in re.finditer(pattern, body, re.I):
        s = max(0, m.start() - width // 2)
        out.append("..." + body[s:m.end() + width // 2].replace("\n", " ") + "...")
        if len(out) >= limit:
            break
    return out


def audit(target, profile):
    raw = fetch(target)
    lang = profile.get("language") or (re.search(r"<html[^>]*\blang=\"([a-zA-Z-]*)", raw, re.I) or [None, "en"])[1][:2].lower()
    lex = LEX.get(lang, LEX["en"])
    host = (profile.get("host") or (urlparse(target).netloc if target.startswith("http") else "")).replace("www.", "")

    title_m = re.search(r"<title[^>]*>(.*?)</title>", raw, re.S | re.I)
    title = text_of(title_m.group(1)) if title_m else ""
    def meta(name):
        m = re.search(r'<meta\s+(?:name|property)="%s"\s+(?:id="[^"]*"\s+)?content="([^"]*)"' % re.escape(name), raw, re.I)
        return m.group(1) if m else ""
    canonical = (re.search(r'<link\s+rel="canonical"[^>]*href="([^"]*)"', raw, re.I) or [None, ""])[1]

    clean = strip_noise(raw)
    main_m = re.search(r"<main\b.*?</main>", clean, re.S | re.I)
    main_html = main_m.group(0) if main_m else clean
    body = text_of(main_html)
    words = body.split()
    low = body.lower()

    heads = [(int(m.group(1)), text_of(m.group(2))) for m in re.finditer(r"<h([1-4])\b[^>]*>(.*?)</h\1>", main_html, re.S | re.I)]
    paras = [p for p in (text_of(x) for x in re.findall(r"<p\b[^>]*>(.*?)</p>", main_html, re.S | re.I)) if len(p.split()) >= 3]
    skipped = [f"H{a}->H{b}" for (a, _), (b, _) in zip(heads, heads[1:]) if b - a > 1]

    anchors = []
    for m in re.finditer(r'<a\b([^>]*)href="([^"#][^"]*)"([^>]*)>(.*?)</a>', main_html, re.S | re.I):
        if "aria-hidden" in (m.group(1) + m.group(3)):
            continue  # decorative duplicate link (e.g. card image)
        href, label = m.group(2), text_of(m.group(4))
        if href.startswith(("mailto:", "tel:", "javascript:")):
            continue
        internal = href.startswith("/") or (bool(host) and host in href)
        anchors.append({"href": href, "text": label, "internal": internal, "generic": bool(re.match(lex["generic_anchor"], label, re.I)) or label == ""})

    imgs = re.findall(r"<img\b[^>]*>", main_html, re.I)
    src_of = lambda i: (re.search(r'src="([^"]*)"', i) or [None, "?"])[1][-60:]  # noqa: E731
    alt_missing = [src_of(i) for i in imgs if "alt=" not in i and "src=" in i]
    alt_empty = [src_of(i) for i in imgs if re.search(r'alt=""', i) and "src=" in i]

    schema = []
    for blk in re.findall(r'<script[^>]*type="application/ld\+json"[^>]*>(.*?)</script>', raw, re.S | re.I):
        try:
            d = json.loads(blk)
        except Exception as exc:  # noqa: BLE001
            schema.append({"invalid_json": str(exc)[:80]})
            continue
        for n in (d.get("@graph") or [d]) if isinstance(d, dict) else d:
            if isinstance(n, dict):
                au = n.get("author")
                schema.append({"type": n.get("@type"), "has_image": bool(n.get("image")), "datePublished": n.get("datePublished"),
                               "dateModified": n.get("dateModified"), "author": au.get("name") if isinstance(au, dict) else au})

    vague_patterns = {**lex["vague"], **profile.get("extra_vague", {})}
    vague = {label: n for label, pat in vague_patterns.items() if (n := len(re.findall(pat, body, re.I)))}
    risk = {pat: ctx for pat in (lex["risk"] + profile.get("extra_risk", [])) if (ctx := contexts(pat, body))}

    # --- AI-discovery signals -------------------------------------------------------------------
    after_h1 = re.split(r"</h1>", main_html, maxsplit=1, flags=re.I)
    lead_words = text_of(after_h1[1] if len(after_h1) > 1 else main_html).split()
    ext_domains = sorted({urlparse(a["href"]).netloc.replace("www.", "") for a in anchors if not a["internal"] and a["href"].startswith("http")})
    auth_re = profile.get("authority_domain_regex") or AUTHORITY_DEFAULT
    authority = [d for d in ext_domains if re.search(auth_re, d)]
    hidden = []
    for m in re.finditer(r"<(div|span|ul|section|p)\b[^>]*style=\"[^\"]*(clip:\s*rect\(0|display:\s*none|visibility:\s*hidden)[^\"]*\"[^>]*>(.*?)</\1>", raw, re.S | re.I):
        n_links = len(re.findall(r"<a\b", m.group(3)))
        if n_links:
            hidden.append({"links": n_links, "sample": text_of(m.group(3))[:110]})
    qs = lex["question_starts"]
    ai = {
        "lead_first_60_words": " ".join(lead_words[:60]),
        "question_headings": sum(1 for lvl, t in heads if lvl >= 2 and (t.endswith("?") or t.lower().startswith(qs))),
        "tables": len(re.findall(r"<table\b", main_html, re.I)),
        "lists": len(re.findall(r"<(?:ul|ol)\b", main_html, re.I)),
        "faq_accordions_details": len(re.findall(r"<details\b", main_html, re.I)),
        "video_embeds": re.findall(r"(?:youtube\.com|youtu\.be|vimeo\.com)/[^\"' ]+", raw)[:3],
        "external_domains": ext_domains[:12],
        "authority_domains_linked": authority,
        "hidden_blocks_with_links": hidden[:5],
        "text_in_raw_html_words": len(words),
    }
    ents = profile.get("entities", [])
    authors = [a.lower() for a in profile.get("author_names", [])]
    return {
        "source": target, "profile": profile.get("site_name", "(none)"), "lang": lang,
        "title": {"text": title, "chars": len(title)},
        "meta_description": {"text": meta("description"), "chars": len(htmllib.unescape(meta("description")))},
        "canonical": canonical, "robots": meta("robots"),
        "og": {"image": meta("og:image"), "image_alt": meta("og:image:alt")},
        "h1": [t for lvl, t in heads if lvl == 1], "heading_level_skips": skipped,
        "outline": [("  " * (lvl - 1)) + t[:90] for lvl, t in heads],
        "words": len(words), "paragraphs": len(paras),
        "avg_words_per_paragraph": round(sum(len(p.split()) for p in paras) / max(1, len(paras)), 1),
        "short_paragraphs_lt12_words": sum(1 for p in paras if len(p.split()) < 12),
        "numbers_in_copy": len(re.findall(r"\b\d[\d.,%+]*\b", body)),
        "links": {"internal": sum(a["internal"] for a in anchors), "external": sum(not a["internal"] for a in anchors),
                  "unique_internal_targets": len({a["href"].split("#")[0] for a in anchors if a["internal"]}),
                  "generic_or_empty_anchors": [a["text"] or f"(empty) {a['href']}" for a in anchors if a["generic"]][:12]},
        "images": {"count": len(imgs), "missing_alt": alt_missing, "empty_alt": alt_empty},
        "schema": schema,
        "dates_visible": re.findall(r"(?:[Úú]ltima actualizaci[oó]n|Actualizado|Publicado|Last updated|Updated|Published|Reviewed)[^<.]{0,40}", body)[:3],
        "entity_mentions": {e: low.count(e.lower()) for e in ents if low.count(e.lower())} if ents else "(set profile.entities)",
        "vague_terms": vague, "ymyl_risk_phrases": risk, "ai_discovery": ai,
        "trust_signals": {
            "mentions_author_name": any(a in low for a in authors) if authors else "(set profile.author_names)",
            "mentions_credentials": bool(re.search(lex["credentials"], low)),
            "mentions_sources_or_regulation": bool(re.search(lex["regulation"], low)),
            "has_faq_section": bool(re.search(lex["faq"], low)),
        },
        "_text": low,
    }


def render(r):
    L = []
    add = L.append
    add(f"# Evidence pack: {r['source']}\n")
    add(f"- **profile** `{r['profile']}` | **lang** `{r['lang']}` | **canonical** `{r['canonical']}` | **robots** `{r['robots'] or '(default)'}`")
    add(f"- **title** ({r['title']['chars']} chars): {r['title']['text']}")
    add(f"- **meta description** ({r['meta_description']['chars']} chars): {htmllib.unescape(r['meta_description']['text'])}")
    add(f"- **og:image**: `{r['og']['image'].split('/')[-1]}`  alt: {htmllib.unescape(r['og']['image_alt'])}")
    add(f"- **H1** ({len(r['h1'])}): {r['h1']}  | heading-level skips: {r['heading_level_skips'] or 'none'}")
    add(f"- **size**: {r['words']} words, {r['paragraphs']} paragraphs (avg {r['avg_words_per_paragraph']} words; {r['short_paragraphs_lt12_words']} under 12 words), {r['numbers_in_copy']} numeric tokens")
    add("\n## Heading outline\n```")
    L.extend(r["outline"])
    lk = r["links"]
    add("```\n## Links (main content)")
    add(f"- internal {lk['internal']} (unique targets {lk['unique_internal_targets']}), external {lk['external']}")
    add(f"- generic / empty anchors: {lk['generic_or_empty_anchors'] or 'none'}")
    add(f"\n## Images\n- {r['images']['count']} in main; missing alt: {r['images']['missing_alt'] or 'none'}; empty alt: {r['images']['empty_alt'] or 'none'}")
    add("\n## Structured data")
    L.extend(f"- {s}" for s in r["schema"])
    add(f"\n## Dates visible: {r['dates_visible'] or 'none'}")
    add(f"\n## Entities named in copy\n{r['entity_mentions']}")
    add(f"\n## Vague-claim terms (count)  <- each needs a 'So what?' / proof nearby\n{r['vague_terms'] or 'none'}")
    add("\n## YMYL / advertising-risk phrases (with context)")
    for pat, ctx in r["ymyl_risk_phrases"].items():
        add(f"- `{pat}`")
        L.extend(f"    - {c}" for c in ctx)
    if not r["ymyl_risk_phrases"]:
        add("- none")
    ai = r["ai_discovery"]
    add("\n## AI-discovery signals (A-series checks)")
    add(f"- **lead (first 60 words after H1)**: {ai['lead_first_60_words']}")
    add(f"- question-style headings: {ai['question_headings']} | tables: {ai['tables']} | lists: {ai['lists']} | FAQ accordions: {ai['faq_accordions_details']} | video embeds: {ai['video_embeds'] or 'none'}")
    add(f"- external domains linked: {ai['external_domains'] or 'none'}")
    add(f"- authority sources linked: {ai['authority_domains_linked'] or 'NONE'}")
    add(f"- words present in the raw HTML (what non-JS AI crawlers see): {ai['text_in_raw_html_words']}")
    add(f"- hidden-but-crawlable blocks containing links (must mirror visible content): {ai['hidden_blocks_with_links'] or 'none'}")
    add(f"\n## Trust signals present: {r['trust_signals']}")
    return "\n".join(L)


# ------------------------------------------------------------------------------------------------
def sitemap_urls(url, limit, depth=0):
    xml = fetch(url)
    locs = re.findall(r"<loc>\s*([^<\s]+)\s*</loc>", xml)
    if "<sitemapindex" in xml and depth < 2:
        out = []
        for child in locs:
            out += sitemap_urls(child, limit, depth + 1)
            if len(out) >= limit:
                break
        return out[:limit]
    return locs[:limit]


def shingles(words, n=6):
    return {tuple(words[i:i + n]) for i in range(len(words) - n + 1)}


def site_scan(sm_url, profile, limit, threshold):
    urls = sitemap_urls(sm_url, limit)
    rows, packs = [], {}
    for u in urls:
        try:
            r = audit(u, profile)
        except Exception as exc:  # noqa: BLE001
            rows.append(f"| {u} | ERROR {str(exc)[:50]} |||||||||")
            continue
        packs[u] = r
        path = urlparse(u).path or "/"
        rows.append("| {p} | {t} | {m} | {h} | {w} | {i}/{ext} | {g} | {a} | {v} | {rk} | {au} |".format(
            p=path[:48], t=r["title"]["chars"], m=r["meta_description"]["chars"], h=len(r["h1"]), w=r["words"],
            i=r["links"]["internal"], ext=r["links"]["external"], g=len(r["links"]["generic_or_empty_anchors"]),
            a=len(r["images"]["missing_alt"]), v=sum(r["vague_terms"].values()), rk=len(r["ymyl_risk_phrases"]),
            au=len(r["ai_discovery"]["authority_domains_linked"])))
    out = [f"# Site scan: {sm_url}  ({len(packs)} pages, profile `{profile.get('site_name', '(none)')}`)\n",
           "| path | title chars | meta chars | H1 | words | links int/ext | generic anchors | imgs w/o alt | vague terms | risk phrases | authority links |",
           "|---|---|---|---|---|---|---|---|---|---|---|", *rows,
           "\nTargets: title ~≤60, meta ~≤160 (display guidance, not rules); exactly 1 H1; generic anchors 0; risk phrases reviewed one by one; authority links ≥1 on any page with factual/medical/legal/financial claims."]
    mask = [m.lower() for m in profile.get("mask_terms", [])]
    sets = {}
    for u, r in packs.items():
        t = r["_text"]
        for term in sorted(mask, key=len, reverse=True):  # longest first so multi-word terms match
            t = re.sub(r"(?<!\w)" + re.escape(term) + r"(?!\w)", " • ", t)
        sets[u] = shingles(re.findall(r"\w+|•", t))
    pairs = []
    keys = list(sets)
    for i in range(len(keys)):
        for j in range(i + 1, len(keys)):
            a, b = sets[keys[i]], sets[keys[j]]
            if a and b:
                sim = len(a & b) / len(a | b)
                if sim >= threshold:
                    pairs.append((sim, keys[i], keys[j]))
    out.append(f"\n## Near-duplicate pairs (6-word shingle Jaccard ≥ {threshold:.0%}; masked terms: {mask or 'none, set profile.mask_terms for city/brand names'})")
    out.extend(f"- **{s:.0%}**  {urlparse(a).path}  ↔  {urlparse(b).path}" for s, a, b in sorted(pairs, reverse=True)) if pairs else out.append("- none")
    out.append("\nIf two pages differ mainly by a swapped city/product/name, they are likely 'scaled variants' (check K8): each needs distinct, first-hand information.")
    return "\n".join(out)


def main():
    ap = argparse.ArgumentParser(description="On-page / AI-discovery evidence packs (see file header).")
    ap.add_argument("target", nargs="?", help="local HTML file or URL")
    ap.add_argument("--profile", help="path to a profile JSON (audit/profiles/<site>.json)")
    ap.add_argument("--sitemap", help="scan every URL listed in this sitemap (index supported)")
    ap.add_argument("--limit", type=int, default=60, help="max pages for --sitemap (default 60)")
    ap.add_argument("--similarity", type=float, default=0.5, help="near-duplicate threshold for --sitemap (default 0.5)")
    ap.add_argument("--json", action="store_true", help="JSON output (single page)")
    ap.add_argument("--out", help="write the report to this file instead of stdout")
    a = ap.parse_args()
    try:
        sys.stdout.reconfigure(encoding="utf-8")
    except Exception:  # noqa: BLE001
        pass
    prof = load_profile(a.profile)
    if a.sitemap:
        text = site_scan(a.sitemap, prof, a.limit, a.similarity)
    elif a.target:
        res = audit(a.target, prof)
        res.pop("_text", None)
        text = json.dumps(res, ensure_ascii=False, indent=1) if a.json else render(res)
    else:
        ap.print_help()
        sys.exit(1)
    if a.out:
        with open(a.out, "w", encoding="utf-8") as fh:
            fh.write(text)
        print(f"written: {a.out}")
    else:
        print(text)


if __name__ == "__main__":
    main()
