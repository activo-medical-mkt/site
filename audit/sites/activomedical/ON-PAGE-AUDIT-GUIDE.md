# On-Page Content Audit Guide: Activo Medical Marketing (site edition)

> **This is the activomedical.com edition**: the reusable framework plus this site's fact register, inventory, findings and roadmap.
> For any other site use the reusable guide: [`audit/ON-PAGE-AUDIT-GUIDE.md`](../../ON-PAGE-AUDIT-GUIDE.md). Profile for the script: `audit/profiles/activomedical.json`.
> Run the tools from the repo root: `python audit/audit-page.py <file-or-url> --profile audit/profiles/activomedical.json`.

Working protocol for auditing every page of activomedical.com against the framework in
*"Optimizing On-Page Content for Search & AI Discovery"* (Sept 2026; Google Search Central as primary
authority, Semrush and Bing as secondary). The PDF is in the repo root; links to every source are at the end.

**Updated 2026-10-12:** section 11 adds a research addendum (Google updates, AI-search studies, academic work, measurement) and section 4.3 adds the AI-discovery (A-series) checks.

**Who this is for:** the person (or Claude) running an audit. Follow it top to bottom for each page; do not skip the
evidence step. **Language:** the site is Spanish; examples are Spanish.

---

## 0. TL;DR protocol (per page)

1. **Classify** the page: type, one-sentence *job*, primary search intent, YMYL level (section 3).
2. **Collect evidence** (never audit from memory):
   ```bash
   python audit/audit-page.py marketing-medico-tijuana/seo-para-medicos/index.html     # repo file
   python audit/audit-page.py https://activomedical.com/blog/<slug>                     # live URL (blog posts come from the CMS)
   ```
   Then **read the page itself** (the script only measures; it cannot judge).
3. **Answerability test** (section 2.3): can all 7 questions be answered from explicit visible text?
4. **Walk the checklist** (section 4, **including the A-series AI-discovery checks in 4.3**): mark every check PASS / FAIL / N-A with *evidence* (quote or number). For each AI-visibility finding, **tag the stage of the visibility chain that fails** (11.3).
5. **Cross-check facts** against the register (section 2.2). Any mismatch is a finding.
6. **Prioritise** findings P0 / P1 / P2 (section 6) and write the report with the template (section 8).
   Save it as `audit/reports/<page-slug>.md`.
7. **Fix, then verify** (section 9). Re-run the script and attach before/after.

**The one principle:** *do not optimise to sound like SEO or like AI. Optimise to contain information worth
finding, understanding, trusting and retrieving.* The model is **Define → Explain → Prove → Help**.

| Step | Ask |
|---|---|
| **Define** | Does the page state plainly what the company / service / topic *is*? |
| **Explain** | Does it say what it does, how it works, who it serves, why it matters? |
| **Prove** | Is every consequential claim backed by experience, credentials, data, examples, sources or method? |
| **Help** | Does the reader finish able to do what they came to do? |

---

## 1. Guardrails: what NOT to do (from Google's own guidance)

These are explicit in the source and are the most common ways to "optimise" a page into a worse one.

- **Do not chop content into tiny "AI-friendly" chunks.** Short sentences are fine; sentences that never explain, qualify or prove are not.
- **Do not set word-count targets.** Ask "what information does this page add?", not "how long should it be?".
- **Do not create a page per query variation** (city × service × specialty) unless each has a distinct purpose and genuinely different information. *Scaled-content / spam policies apply.* See finding F3.
- **Do not add FAQs just because a tool suggests them.** Only questions real prospects ask, answered substantively.
- **Do not fake freshness.** Change "updated" dates only when facts, advice, products, evidence or method materially change.
- **No special AI markup or AI-only text files are required** for Google's AI features. `llms.txt` is harmless and optional; do not expect it to move rankings and do not spend audit time on it.
- **Structured data must match visible content.** Never mark up what the page does not show.
- **Do not replace the category with a trend** ("AI-powered growth") or hide the offering behind problem-only copy.
- **Never imply guarantees you cannot support.** Doubly true for health (section 5).

---

## 2. Reference material to keep next to you

### 2.1 Canonical business description (approve once, then keep every page compatible)

> **[Company] is a [primary category] specializing in [core capabilities] for [primary audience / market].**

Proposed (owner to confirm or edit; do not copy word-for-word across the site, just never contradict it):

> *Activo Medical Marketing es una agencia de marketing digital especializada en el sector salud. Ofrece SEO, Google Ads y páginas web para médicos, clínicas y especialistas, con campañas en español e inglés.*

Note: **do not hard-wire a city into the brand identity** (expansion beyond Tijuana/Guadalajara is planned). Cities belong on city pages and in `areaServed`, not in the global description.

### 2.2 Fact register: single source of truth (fill the "status" column; any page that disagrees is a finding)

| Fact | Value to use everywhere | Status |
|---|---|---|
| Years working **exclusively in health** | **8+ years** | Confirmed by owner 2026-10-12 (home strip, hubs and service pages unified) |
| Years in digital marketing overall | 10+ years | Stated on site; owner to confirm |
| Services | SEO médico, Google Ads, páginas web para médicos | Confirmed (site) |
| Audiences | médicos, clínicas, especialistas; dentistas; cirujanos plásticos | Confirmed (site) |
| Languages | Spanish and English (bilingual sites/campaigns) | Confirmed (site) |
| Markets with pages | Tijuana, Guadalajara | Confirmed; expansion planned |
| Credentials of the founder | Maestría en Mercadotecnia (Universidad Xochicalco, Tijuana); Lic. Administración de Empresas; Lic. Comercio Internacional; Google Ads and GA4 certifications | Listed on site; **owner to confirm each and add dates/verification links** |
| "340+ médicos y clínicas" | n/a | **UNVERIFIED: needs a definition and a source, or removal** |
| "8M+ pacientes alcanzados" | n/a | **UNVERIFIED** |
| "94% retención de clientes" | n/a | **UNVERIFIED** |
| "↓62% costo por paciente" (hub strips) | n/a | **UNVERIFIED** |
| Contact | WhatsApp +52 664 714 9135 · hello@activomedical.com | Confirmed (site) |

### 2.3 Answerability test (run first on every page)

A new employee, or a retrieval system, must be able to answer **from explicit visible text, without inferring**:

1. What is the entity? 2. What category is it? 3. What does it do? 4. Who does it serve?
5. Where does it operate? 6. What are its core capabilities? 7. What evidence supports its claims?

Count the unanswered ones. That count is the page's **inference tax**.

---

## 3. Classify the page before judging it

| Field | How to fill it |
|---|---|
| **Type** | Home · City hub · Service page · Specialty page · Blog post · Legal |
| **Job (one sentence)** | "This page helps [audience] decide/understand [X]." If you cannot write it in one sentence, that is finding #1. |
| **Primary intent / query** | The words a prospect actually types ("seo para médicos tijuana"). |
| **YMYL level** | Health marketing is YMYL-adjacent: **high** for pages making claims about treatments or outcomes (specialty pages, blog posts on medical topics); **medium** for agency-service pages (they are commercial claims about *marketing*, not clinical advice) but still held to "no unsupported guarantees". |
| **Adjacent topics** | Do they support the job or compete with it? |

---

## 4. The checklist

Mark **PASS / FAIL / N-A**. Every FAIL needs *evidence* (a quote, a count, a URL).

### 4.1 Core checks: every page

| ID | Check | Evidence / how to verify | Typical fix on this site |
|---|---|---|---|
| C1 | Primary purpose is clear and focused on **one** intent | Write the job sentence; compare with H1 and first screen | Move off-topic blocks to their own pages and link |
| C2 | Page **explicitly states what the company/service/topic is** | First 150 words contain category + offering in plain words | Add a descriptive lead sentence under the H1 (see 2.1) |
| C3 | On brand pages, the **category is clear**, not trend language | Home/About/hubs: is "agencia de marketing digital para el sector salud" explicit? | Keep AI/AEO as a *capability*, not the identity |
| C4 | Services, audiences, markets are **named, not implied** | `entity_mentions` in the script output; read the intro | Name SEO / Google Ads / Maps / páginas web, and audiences, explicitly |
| C5 | Problem-led copy has **enough descriptive context** | Headline can be persuasive; the paragraph below must say what is sold | Add "what it is / what you get / for whom" under benefit headlines |
| C6 | Adjacent topics **support** the core topic | Outline review: any H2 that belongs on another page? | Cut or link out |
| C7 | Each major claim is **explained** (how, why, when, for whom, conditions) | List claims; check 1-2 sentences of explanation follow | Add conditions and limits (see 5) |
| C8 | Each important section has **≥1 specific detail** (entity, tool, method, number with context, example) | `numbers_in_copy`, named tools; Specificity Ladder (section 5.2) | Replace generics with Level 3-5 information |
| C9 | **Vague claims are supported** (experienced, leading, advanced, secure, fast, high-quality, real, professional) | `vague_terms` in script output; each hit needs proof within ~2 paragraphs | Apply the "So what?" test (5.3) |
| C10 | Page contains **original experience, cases, examples, data, method or expert input** | Is there anything a generic model could not have written? | Add case notes, the real onboarding/reporting process, local specifics |
| C11 | **Title, H1, headings and visible copy** describe the page accurately and agree with each other | Script: title/meta/H1/outline | Align; one H1; no skipped levels; no duplicated heading text |
| C12 | Concise answers **lead into supporting detail** where nuance is needed | Look for 2-sentence "chunks" with no depth (`short_paragraphs_lt12_words`) | Merge fragments into explained paragraphs |
| C13 | Important information is **visible, accessible text** (not only image / animation / decorative SVG) | Is any key fact only inside an `aria-hidden` SVG, image or script-rendered block? | Put the fact in real HTML text |
| C14 | **Keywords and anchors are natural and descriptive** | `generic_or_empty_anchors`; read copy aloud | Replace "ver más" with destination-describing anchors; remove stuffing |
| C15 | A reader can say **what this is, what it does, who it serves and why it is credible** without guessing | Answerability test, 7/7 | Close each unanswered question with a sentence + proof |

### 4.2 Conditional checks: use when they apply

| ID | When | Check | Evidence |
|---|---|---|---|
| K1 | Experience affects trust | **Verifiable** years, volume, credentials, implementations, clients served, case history | Matches fact register (2.2); linked proof where possible |
| K2 | Expertise matters | Clear who wrote/reviewed it and why they are qualified (byline → profile with credentials) | Blog: author + reviewer + date; service pages: founder profile |
| K3 | YMYL / health claims | High-impact claims backed by authoritative sources; risks, limits, uncertainty and alternatives stated | Section 5.4 |
| K4 | Statistics or time-sensitive facts | Current, **sourced** and contextualised (period, sample, definition) | Source link or removal |
| K5 | Structured data present | JSON-LD matches visible content; required properties present; valid JSON | `schema` in script output vs page text |
| K6 | Dates are shown | Publication/update dates truthful; changed only on material updates | Compare `dates_visible`, `dateModified` and last real edit |
| K7 | AI assisted the writing | Facts and judgement reviewed by a human with domain knowledge; contains inputs a model lacks | Ask: who verified it? |
| K8 | Several pages target related queries | Each has a **distinct user purpose**; not a scaled variation | Overlap analysis (section 7, F3) |

> A page does **not** need to maximise every signal. It must clearly define its subject, explain what matters,
> prove consequential claims, and help the intended reader finish the page's job.

---

### 4.3 AI-discovery checks (A-series): added 2026-10-12 from the research in section 11

Same rules: PASS / FAIL / N-A with evidence. Grades refer to section 11.

| ID | Check | Evidence / how to verify | Grade |
|---|---|---|---|
| A1 | **Answer-first lead:** the first screen / first ~100 words say what the page is and give the direct answer | `ai_discovery.lead_first_60_words` | [B] relevance + position |
| A2 | Each major H2 opens with a direct answer sentence, then context, conditions, exceptions | Read the outline | [B]/[C] |
| A3 | **Facts carry source + date + method** next to them; numbers are explained, not decorative | `numbers_in_copy`, `authority_domains_linked`, read the sentences | [B] citable evidence |
| A4 | Any quotation is **real, attributed and linkable** (named expert, regulator or study); never invented | Click through the source | [B] |
| A5 | Extractable formats used where natural: definitions, comparison tables, step lists, price ranges | `tables`, `lists`, `question_headings` | [B]/[C] |
| A6 | Informational sections are not drowned in sales copy; CTAs sit in their own blocks | Read; count promotional vs explanatory paragraphs | [C] (association) |
| A7 | **All critical content is in the raw HTML** (not JS-only): byline, dates, definitions, FAQs, internal links | Run the script on the **live URL**; compare with the rendered page | [C]/[A] |
| A8 | Hidden-but-crawlable text (sr-only lists) **mirrors visible content** | `hidden_blocks_with_links` vs visible cards | [A] spam policy |
| A9 | AI search/user bots are not blocked by robots.txt, Cloudflare, WAF or bot rules | Section 11.5 status test | [A] |
| A10 | **Entity consistency:** name, description, years, services, credentials identical on page, schema, GBP, LinkedIn, directories | Fact register (2.2) + off-site checklist (11.8) | [A] principle |
| A11 | Off-site proof exists and is linked: reviews, profiles, press, video | 11.8 | [C]/[B] |
| A12 | Freshness: truthful `dateModified`; time-sensitive facts say "as of <date>"; reviewed on a schedule | `dates_visible`, schema dates, git history | [C]/[D] |
| A13 | Page is not a scaled variant (distinct purpose and distinct local/specialty information) | K8 overlap measure | [A] |
| A14 | Each AI-visibility finding is tagged with the **failing stage** of the chain (11.3) and fixed there, not by blanket rewriting | Report | [B] |
| A15 | The page is in the **prompt panel** and its AI traffic/citations are tracked (11.6) | Log exists | [B]/[C] |

---

## 5. Rubrics

### 5.1 Claim → Explanation → Evidence → Relevance

For every claim that influences a decision, the page should contain all four. Most weak pages stop at the claim.

| Weak (claim only) | Stronger pattern |
|---|---|
| "Somos expertos en marketing médico." | State **what** the experience is (clients served, since when, in which specialties), **how** it is shown (credential, case, method), and **why** it matters to the decision. |
| "Resultados reales y medibles." | Say what is measured (calls, WhatsApp chats, booked appointments), how it is tracked (GA4 events, call tracking), how often it is reported, and show an anonymised example. |

### 5.2 Specificity ladder (aim for Levels 3-5 in each section)

| Level | Example (service page) |
|---|---|
| 1 Vague | "Soluciones digitales innovadoras." |
| 2 Category | "Servicios de SEO para médicos." |
| 3 Specific | "SEO local, optimización de Google Business Profile, contenido médico y SEO técnico para consultorios." |
| 4 Contextual | "…para especialistas independientes y clínicas privadas de Tijuana que reciben pacientes de ambos lados de la frontera." |
| 5 Evidence-backed | Level 4 + years in health (8+), credentials, a described process with deliverables and cadence, a real (anonymised) case with period and metric definition. |

### 5.3 The "So what?" test

For any sentence with *experience, leading, advanced, secure, fast, high-quality, integral, real*: ask **doing what, in
which context, and why does it matter to this reader's decision?** If there is no answer on the page, rewrite or delete.

### 5.4 Health (YMYL) standard: raise the evidence bar

Google weights E-E-A-T more heavily where a wrong answer can affect health. For this site:

- **No guarantees or promised outcomes.** Never "garantizamos", "100%", "sin riesgo", "resultados asegurados".
- **Time claims must be scoped.** "Consultas desde la primera semana" is defensible for *paid campaigns*; it is not for
  *SEO* (the site's own FAQs say months 3-6). A page-level or card-level claim must not contradict the FAQ.
- **Pages about a specialty or procedure** (cirugía plástica, odontología…): define the procedure/service context,
  who evaluates candidacy, material risks, alternatives, variability, and cite regulatory/clinical sources. Marketing
  pages for clinics should still *not* make clinical promises on the clinic's behalf.
- **Health-advertising rules (México):** the site cites COFEPRIS and "ethical advertising". Any compliance statement
  must be accurate and current; have counsel review wording. *(This guide is not legal advice.)*
- **Name the accountable human**: author and, for medical statements, a qualified reviewer, with credentials and a
  review date.

### 5.5 Titles, metas, anchors, dates

| Element | Standard | Weak → stronger |
|---|---|---|
| Title | Descriptive, concise, unique; entity + page topic + audience; brand last. Long titles get truncated or rewritten (~60 chars is a practical display target, not a rule) | "Home \| Acme" → "Acme \| Software de inventario para tiendas multi-sucursal" |
| Meta description | Accurate summary of the page (Google may build snippets from body copy, so the body must carry the meaning) | Vague slogan → one sentence: what, for whom, where |
| Headings | Informative, hierarchical (no skipped levels), unique | "¿Es difícil?" → "Planeación de la migración: dependencias, pruebas y reversa" |
| Anchor text | Describes the destination | "Aprende más" → "Ver el servicio de SEO para médicos en Tijuana" |
| Dates | Truthful; only on material change | "Actualizado hoy" tras cambiar una coma → no |

---

## 6. Severity and prioritisation

| Priority | Definition | Examples |
|---|---|---|
| **P0** | Factually wrong, contradictory, unsupported health/result claim, or the page's identity is unclear | Conflicting years of experience; guaranteed-result wording; invalid or mismatching structured data |
| **P1** | Material gap in Define/Explain/Prove on a money page; scaled-duplicate risk; key fact only in a non-text element | Service page with no proof of the claims it makes; 68-84% overlap between city twins |
| **P2** | Polish: truncated titles/metas, generic anchors, heading-level skips, minor wording | Meta descriptions over ~160 chars; "ver más" anchors |

Fix order: **P0 → P1 on revenue pages (service, hubs) → P1 elsewhere → P2 in batches.**

---

## 7. Findings already observed (verify, then fix or close)

Measured on 2026-10-12 from the repo and live site. Treat these as *leads*, not conclusions.

| # | Observation | Guide ref | Suggested action |
|---|---|---|---|
| F1 | **Home H1 is only the pill "Agencia de marketing médico"**; the real headline is an H2, and it contains both the desktop and the mobile variants, so crawlers read the headline twice | C11, C13 | One H1 that states category + audience; render only one variant of the text in the DOM (CSS-only responsive line breaks) |
| F2 | **Unverified numbers** shown prominently: 340+, 8M+, 94%, ↓62% | C9, K1, K4 | Define + source each, replace with verifiable facts, or remove |
| F3 | **Scaled location twins:** with city names masked, TJ vs GDL pages share **68% (SEO)** and **84% (páginas web)** of 6-word phrases; Google Ads is only 6%; hubs 23% | K8, Section 1 | Rewrite each city page around *local* information: market, regulation, lead times, how the cross-border patient decides, real cases |
| F4 | Title over 60 chars on 10 of 13 static pages; meta description over 160 on 10 | 5.5 | Shorten; keep entity + topic + audience first |
| F5 | `terminos-de-uso` title lacks accent ("Terminos"), meta only 44 chars, copy 189 words | C11 | Fix wording; expand only if substantive |
| F6 | Hero card text is inside an `aria-hidden` SVG | C13 | Make sure the same facts exist as normal text near the hero |
| F7 | Heading levels skip (H2 → H4, no H3) on **all 10** hub / service / specialty pages | C11 | Restore hierarchy (H3 or restyle the H4s) |
| F8 | Sample blog post audited (1 of 12): ~1,390 words, **0 numbers, 0 external sources**, all claims asserted, no first-hand data | C10, K4 | Add the agency's own data/cases, cite sources, state method and limits |
| F9 | "Resultados desde la primera semana" (hero chip) vs. FAQ "SEO: meses 3-6" | 5.4 | Scope the claim ("…con Google Ads") or add the qualifier |
| F10 | Internal files are publicly served: `/stitch-brand-brief.md`, `/serve.js` | n/a | Add to `EXCLUDE` in `build.js` (the guide and PDF are already excluded) |
| F11 | **Article pages: author name, date, read time and author card are empty in the raw HTML** (filled by JavaScript); the author exists only in JSON-LD. Non-JS crawlers see no visible byline or date, and structured data doesn't match visible text | A7, K2, K5, K6 | Render these fields in the Worker (same place that renders title/H1/body) |
| F12 | **PASS:** AI crawler access verified 2026-10-12 (robots.txt open; Googlebot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot, Bingbot all get 200). Minor: `Crawl-delay: 2` only slows Bing/Anthropic bots | A9 | Optional: remove `Crawl-delay` |
| F13 | **No YouTube presence** (not in `sameAs`, footer or pages) although YouTube mentions are the strongest correlate of AI visibility in the largest study and the most-cited source for health queries in two studies | A11, 11.7 | Create a doctor-focused channel; add transcripts to pages; add to `sameAs` |
| F14 | Sample article has **no external sources and no authority-domain links**; home/hubs link no authority sources either | A3, K3 | Add primary sources to medical and market claims |

---

## 8. Report template (copy per page)

```markdown
# Audit: <URL>
Date: YYYY-MM-DD · Auditor: · Page type: · YMYL: low/med/high
**Job (1 sentence):**
**Primary intent / query:**
**Evidence pack:** audit/reports/<slug>-evidence.md  (python audit/audit-page.py ...)

## Answerability (7 questions): __/7 answered from visible text
Unanswered: …

## Checklist
| ID | PASS/FAIL/N-A | Evidence (quote / number) |
| C1 | | |
… (C1-C15, K1-K8 when applicable)

## Fact-register conflicts
…

## Findings
| P | Finding | Evidence | Fix (file/section) | Owner input needed? |
| P0 | | | | |

## Rewrites proposed
Before: "…"
After:  "…"   (uses only facts from the register; flagged [NEEDS FACT] if missing)

## Verification after fix
- [ ] build ok, page renders · [ ] script re-run · [ ] schema valid · [ ] no new conflicts
```

---

## 9. Where things live, and how to verify a fix

| What | Where | Notes |
|---|---|---|
| Static pages (home, hubs, services, specialties, legal) | `index.html` and `<folder>/index.html` | Titles/metas/headings/schema are inside each file |
| Blog posts | **CMS** (app.seermantic.com); the site serves copies from KV via the Worker | Edit in the CMS; the webhook refreshes the site. Not editable from this repo |
| Blog/related-article cards on landing pages | `PAGE_ARTICLES` in `src/index.js` + static fallback in each page | Titles/covers/dates come from the CMS |
| Article schema, author entity, sitemap, llms.txt | `src/index.js` (Worker) | Author entity id: `https://activomedical.com/#joshua-ramirez` |
| Shared header/footer | `js/shared-layout.js` (baked into HTML at build time) | |

**Verify:**
```bash
node build.js                                   # rebuild public/
node serve.js                                   # http://localhost:8787  (static only; no Worker)
python audit/audit-page.py <file>               # numbers before/after
# after deploy
python audit/audit-page.py https://activomedical.com/<path>
```
Structured data: check JSON-LD parses and matches visible text; use Google's Rich Results Test and the Schema
Markup Validator on the live URL.

---

## 10. Page inventory (baseline, 2026-10-12)

Job sentences are **drafts for the owner to confirm**. `T` = title chars, `M` = meta description chars, `W` = words in `<main>`.

| URL | Type | Draft job | YMYL | T / M / W |
|---|---|---|---|---|
| `/` | Home | Explain what Activo is and route to the right service/city/specialty | med | 60 / 146 / 1410 |
| `/marketing-medico-tijuana/` | City hub | Help a Tijuana clinic understand Activo's full service and choose a service page | med | 65 / 164 / 1741 |
| `/marketing-medico-tijuana/seo-para-medicos/` | Service | SEO for Tijuana medical practices | med | 89 / 207 / 2303 |
| `/marketing-medico-tijuana/google-ads-medicos/` | Service | Google Ads for Tijuana medical practices | med | 89 / 218 / 2416 |
| `/marketing-medico-tijuana/paginas-web-para-medicos/` | Service | Medical websites in Tijuana | med | 82 / 208 / 2128 |
| `/marketing-medico-guadalajara/` | City hub | Same as Tijuana hub, for Guadalajara | med | 69 / 192 / 1816 |
| `/marketing-medico-guadalajara/seo-para-medicos/` | Service | SEO for Guadalajara medical practices | med | 93 / 208 / 2298 |
| `/marketing-medico-guadalajara/google-ads-medicos/` | Service | Google Ads for Guadalajara medical practices | med | 88 / 201 / 2233 |
| `/marketing-medico-guadalajara/paginas-web-para-medicos/` | Service | Medical websites in Guadalajara | med | 86 / 212 / 2095 |
| `/marketing-dentistas-tijuana/` | Specialty | Marketing for dental practices (incl. dental tourism) | **high** | 70 / 186 / 2052 |
| `/marketing-cirujanos-plasticos-tijuana/` | Specialty | Marketing for plastic surgeons (incl. medical tourism) | **high** | 72 / 204 / 1955 |
| `/politica-de-privacidad/` | Legal | State data practices and rights | low | 49 / 132 / 630 |
| `/terminos-de-uso/` | Legal | State terms of use | low | 42 / 44 / 189 |
| `/blog/` + 12 posts | Blog | Answer one specific prospect question per post, with first-hand expertise | med-high | audit each via live URL |

**Suggested order:** (1) home, (2) the two service pages with the highest twin overlap (SEO, web) and their hubs,
(3) dentistas + cirujanos (highest YMYL), (4) the 12 blog posts, (5) legal pages.

---

## 11. Research addendum (2026-10-12): what the evidence says about AI search, AEO and GEO

**How to read this section.** The PDF is the framework; this section adds what Google, independent studies and academic
work have published since or beyond it. **Nothing here replaces Define → Explain → Prove → Help.** The research mostly
adds (a) *conditions for being retrieved at all* (technical access, off-site presence), (b) *writing patterns that get
used once retrieved*, and (c) *how to measure without fooling yourself*.

**Evidence grades** (use them when you cite anything from this guide to the client):

| Grade | Meaning |
|---|---|
| **[A]** | Official documentation from the platform itself (Google, OpenAI, Anthropic, Cloudflare, Microsoft) |
| **[B]** | Academic paper (peer-reviewed or arXiv preprint). Strong on method, narrow on setting |
| **[C]** | Large-sample industry or vendor study. **Association, not causation**; vendors sell the tools they measure |
| **[D]** | Secondary report, forum or practitioner claim; could not be verified at the primary source |

> **The honest summary of the field:** a July 2026 survey of 45 GEO studies [B] found that **no reviewed technique
> shows a stable, cross-platform causal effect on organic discoverability or downstream traffic.** What replicates:
> topical relevance and where information sits in the context. Generic "GEO tricks" transfer poorly, competition
> erodes gains, and citation-oriented rewrites can *hurt* retrieval. Treat every tactic below as a hypothesis to
> test on *your* pages (11.6), not as a rule.

### 11.1 Google: what changed (timeline from Google's own dashboards)

| Date (PT) | Event | Grade | Why it matters here |
|---|---|---|---|
| 11-29 Dec 2025 | December 2025 core update | [A] | Baseline period for any comparison |
| 5-27 Feb 2026 | February 2026 Discover update | [A] | Only if Discover traffic matters |
| 24-25 Mar 2026 | March 2026 **spam** update | [A] | Scaled/near-duplicate pages are the exposed pattern (F3) |
| 27 Mar-8 Apr 2026 | March 2026 core update | [A] | |
| Apr 2026 | New spam policy: back-button hijacking | [A] | Never manipulate browser history (check any popups/redirect scripts) |
| 21 May-1 Jun 2026 | May 2026 core update | [A] | |
| May 2026 | Google publishes its *Optimizing for generative AI* guide | [A] | The source the PDF cites; see 11.2 "what Google says" |
| 3 Jun 2026 | Search Console **Search Generative AI performance reports** | [A] title; details [D] | Impressions in AI Overviews/AI Mode by page/country/date; **no clicks or queries** (AI clicks stay in the normal Performance report). Rolling out to subsets of properties: check yours |
| 24-26 Jun, 18-20 Aug, 24 Sep-≈7 Oct 2026 | Three more **spam** updates | [A] | Frequent enforcement cadence |
| Jul 2026 | Search Console: social & video platform properties | [A] title | Lets you see YouTube/LinkedIn-type content performance |
| 28 Aug 2026 | Site reputation policy: different enforcement inside vs outside the EEA | [A] | Not relevant unless third-party content is hosted on the domain |
| Sep 2026 | Search Console: web multimodal reporting | [A] title | |
| Sep 2025 | Quality Rater Guidelines update (AI Overviews examples, broader generative-AI definition, stricter YMYL expectations); Jan 2025: scaled low-effort content, human or AI, rated "Lowest" | [D] | Raters don't rank pages, but the guidelines show what Google tries to measure |

*Source for the dated rows: Google Search Status Dashboard and Search Central blog.* **Rule:** do not diagnose a
ranking change inside an update window; log it and compare after the window closes.

**What Google says about its AI features [A]** (guide updated 2026; "AI features and your website" updated Dec 2025):
- To appear: be **indexed and snippet-eligible**. There are **no additional technical requirements** and no special AI markup.
- AI Overviews / AI Mode use **query fan-out** (several related searches) so the cited set can be wider than classic results. Overviews often don't trigger at all.
- **Not needed for Google:** `llms.txt` and other special files, splitting content into chunks, rewriting for "AI phrasing", extra long-tail phrasing, dedicated structured data, a target page length. **Not helpful:** manufactured "mentions".
- **Do:** non-commodity content (first-hand perspective, expertise), clear sections and headings, quality images and video, crawlability (including by your CDN/host) and good page experience, keep **Business Profile** (and Merchant Center) data current, keep structured data consistent with visible text.
- Creating many pages for query variations (incl. fan-out queries) can violate the **scaled content abuse** policy; the policy page also defines **doorway abuse** (near-duplicate regional pages that funnel to one destination) and says **hidden text is fine only in forms like accordions, tooltips and screen-reader-only text**; do not hide content that differs from what users see.
- Controls: `nosnippet`, `data-nosnippet`, `max-snippet`, `noindex`; `Google-Extended` for AI training/grounding in other Google systems. AI Overview/AI Mode clicks are counted in the Performance report (Search type: Web).

### 11.2 Evidence map: what moves AI visibility

| # | Lever | What the evidence shows | Grade | Confidence | On this site |
|---|---|---|---|---|---|
| 1 | **Topical relevance + position in context** | Most reproducible levers in the 45-study survey; 252,000 controlled trials (6 LLMs): relevance and list position are the biggest drivers of being cited first; "Lost in the Middle": models use information at the start/end of long inputs better than the middle | [B] | **High** | One intent per page; answer first; key definition and facts near the top and at section starts, not buried mid-page |
| 2 | **Citable evidence**: statistics, attributed quotations, credible citations | GEO paper (KDD 2024, GEO-bench, 9 methods): quotation addition +43%, statistics +33%, cite sources +28% PAWC vs baseline in a controlled testbed (+9-21% on a Perplexity subset); **keyword stuffing −9%**; lowest-ranked source gained ~100% while the top-ranked source *lost* 20-30%. Authors: only 2 engines, noisy tags. Survey: gains don't prove discoverability | [B] | Medium | Add *real, checkable* numbers with source, date and method; quote named experts/regulators accurately; **never fabricate** |
| 3 | **Extractable evidence** | Preprint on 602 prompts / 21,143 citations: pages that contribute to the answer are longer, more structured, aligned to the query and rich in definitions, numeric facts, comparisons and procedural steps; ChatGPT cites fewer sources but with higher influence | [B] | Medium | Definitions, comparison tables, step lists, price ranges *inside* explanatory prose |
| 4 | Price, recency, completeness, trust cues; formatting | Same 252k-trial study: explicit price info and a recent timestamp helped consistently; completeness/trust cues smaller; **formatting-only edits had little effect** | [B] | Low-Med | State price ranges where honest; truthful dates; do not rely on formatting tricks |
| 5 | Clarity/summary, E-E-A-T signals, Q&A, section structure | Semrush (304,805 cited URLs vs 921,614 Google top-20 URLs; 13 text-only parameters): clarity & summarization +32.8%, E-E-A-T signals +30.6%, Q&A +25.5%, section structure +22.9%, structured elements (lists/tables) +21.6%; **non-promotional tone −26.2%** (confounded). Only visible text analysed; the authors stress association | [C] | Medium | Lead summary, real Q&A, clear sections; keep informational pages informational and put sales copy in its own sections |
| 6 | **Off-site brand presence** | Ahrefs (75,000 brands, Dec 2025): branded web mentions correlate 0.66-0.71 with AI visibility, YouTube mentions ~0.74, branded search 0.35-0.47, **backlinks very weak**; Toronto study: AI search leans heavily on **earned/third-party media** over brand-owned and social content; Muck Rack/Seer "84% earned", "only off-site signals survive" | [C] + [B] / [D] | Medium; causation unproven | Earn genuine third-party coverage and profiles; YouTube; LinkedIn; directories. Google: *manufactured* mentions don't help [A] |
| 7 | Reviews & local data | Insites (10,000 local businesses, vendor): AI-visible businesses averaged **133 Google reviews vs 11**; BrightLocal survey: ~45% of consumers use AI tools for local recommendations (reported via secondary source) | [C] / [D] | Low-Med | Ethical review program; complete and current Google Business Profile |
| 8 | Freshness | Ahrefs (≈17M citations): AI-cited URLs ~**25.7% fresher** than organic results (ChatGPT freshest, AI Overviews/organic oldest); correlation only. Microsoft staff tie freshness to Gen-AI and recommend IndexNow | [C] / [D] | Low-Med | Real review cadence on money and medical pages; truthful "last reviewed" dates; IndexNow (script exists in repo) |
| 9 | Organic ranking | Studies disagree: Semrush AI Mode **sidebar** links 51% domain / 32% URL overlap with top 10 (89%/80% with extra links); Moz (~40,000 queries, Feb 2026) only ~**12% exact-URL** overlap, ~1 in 5 domains; Ahrefs: 38% of AIO citations from the top 10 (76% in Jul 2025); Semrush: ChatGPT-cited pages often rank 21+ | [C] | Medium | Ranking helps but is neither required nor sufficient; fan-out widens the pool |
| 10 | Structured data | Google: not required, no special schema [A]; Ahrefs matched test of 1,885 pages: no lift in AI Mode/ChatGPT [C/D]; Microsoft (SMX Munich 2025) said schema helps its LLMs understand content [D]. Semrush's "structured data" association means lists/tables in text, **not JSON-LD** | mixed | Medium | Keep valid schema for rich results, entity clarity and Bing; do not promise citations from it |
| 11 | **llms.txt** | SE Ranking (~300k domains, 10.1% had the file): **no relationship** to citations (model got *better* without it); Ahrefs 137k domains: 97% of files had zero requests in May 2026 [D]; Google doesn't use it [A] | [C] / [A] | **High** that it's not a lever | Optional, lowest priority. Do not spend audit time |
| 12 | **Crawl access and rendering** | Vercel/MERJ: major AI crawlers fetched JavaScript files but **did not execute them** (reported Dec 2024; re-verify); OpenAI/Anthropic document separate search vs training vs user bots [A] | [A] / [C] | High (basic) | Content must exist in raw HTML (done for blog via Worker; see F11). Allow search bots |
| 13 | Retriever "source bias" | Neural retrievers ranked LLM-written passages above human ones (KDD 2024); later work disputes the cause (training-induced). Don't try to exploit it: low-effort scaled AI text is a spam / "Lowest" signal for Google | [B] | Low | Human-verified, expert-input content only |
| 14 | **Generic rewrites can backfire** | "Generic optimization can harm long-tail content"; diagnose *why this page* isn't cited, then repair only that (≈40% relative gain changing ~5% of text in the authors' system) | [B] | Medium | Fix the failing stage (11.3), not the whole page |

### 11.3 The visibility chain: tag every AI-visibility finding with the stage that fails

1. **Eligible**: crawlable by Googlebot, Bingbot and AI bots; indexed; snippet-eligible; content in raw HTML.
2. **Discoverable**: matches the *fan-out* sub-queries around the main intent (topical relevance).
3. **Selected**: the platform trusts the source (authority, recognisability, language, domain context; off-site presence).
4. **Absorbed**: its text is usable as an answer (definitions, numbers, steps, comparisons; answer-first).
5. **Faithful**: the answer states *your* facts correctly (prices, services, credentials, locations).
6. **Actionable**: a human can act (WhatsApp, call, form) from the cited page.

Fix the earliest failing stage first; fixing stage 4 is pointless if stage 1 fails.

### 11.4 Why prioritise conversion and brand, not raw traffic

- Pew Research (900 US adults, 68,879 searches, Mar 2025): clicks on traditional results **8% with an AI summary vs 15% without**; links *inside* the summary were clicked in ~1% of visits [B/C].
- Ahrefs (300,000 keywords, Dec 2025 data): an AI Overview correlates with **~58% lower CTR** for the top-ranked page (34.5% in the 2025 version) [C].
- Semrush (Jul 2025 model): an AI-search visitor is worth **~4.4×** an average organic visitor by conversion rate. A *projection by a vendor that sells the visibility tool*; treat as directional [C].
- **So:** expect fewer but higher-intent visits. Optimise the path from page to WhatsApp, and track branded search, direct traffic and assisted conversions, not only sessions.

### 11.5 Technical access checklist for AI systems

| Bot | Purpose (official docs) | Policy for this site |
|---|---|---|
| Googlebot | Search + AI Overviews/AI Mode source crawling [A] | Allow |
| Bingbot | Feeds the Bing index that Copilot-style answers draw on (Microsoft's AI Performance report covers Copilot and Bing AI summaries) [D] | Allow; verify in Bing Webmaster Tools |
| **OAI-SearchBot** | Surfaces sites in ChatGPT search; "opted-out sites will not be shown in ChatGPT search answers" [A] | **Allow** (drives ChatGPT visibility) |
| **GPTBot** | May train OpenAI foundation models; independent of OAI-SearchBot [A] | Owner decision |
| ChatGPT-User | User-initiated visits inside ChatGPT; robots.txt may not apply [A] | Allow |
| **Claude-SearchBot / Claude-User** | Search relevance / fetching when a user asks Claude [A] | **Allow** |
| ClaudeBot | Training-data collection [A] | Owner decision |
| Google-Extended | Control token for AI training/grounding in *other* Google systems [A] | Owner decision; confirm effect before changing |
| PerplexityBot | Perplexity index (no official doc retrieved) | Allow |

- **Site status (tested 2026-10-12):** `robots.txt` allows everything (default `*` plus explicit GPTBot, ClaudeBot, PerplexityBot, Google-Extended); requests with the user agents of Googlebot, OAI-SearchBot, GPTBot, ChatGPT-User, ClaudeBot, Claude-SearchBot, PerplexityBot and Bingbot all returned **200** on the home page and an article. *(Caveat: tested from a normal IP, so Cloudflare's verified-bot logic wasn't exercised.)*
- **`Crawl-delay: 2`** is honoured by Bing and Anthropic's bots, ignored by Google; on a small site it only slows them. Consider removing it.
- **Cloudflare:** AI Crawl Control and *managed robots.txt* can prepend `Disallow` rules for GPTBot, ClaudeBot, Google-Extended and others, and block at the edge; Cloudflare's docs describe the Search / Agent / Training policies [A]; coverage says new-domain defaults changed on 15 Sep 2026 [D]. **Re-check Security → Bots → AI settings after any Cloudflare change**, and re-run the status test above.
- **Rendering:** every fact you want cited must be in the raw HTML (`audit-page.py` already reports `text_in_raw_html_words`).
- **Hidden-but-crawlable blocks** (e.g. the link lists the Worker adds for crawlers) must **mirror what the visible page shows**; otherwise they risk the hidden-text policy.
- **Freshness plumbing:** truthful sitemap `lastmod` (done for posts), **IndexNow** for Bing/Copilot, Bing Webmaster Tools verified.

### 11.6 Measurement and testing protocol (so decisions rest on data)

**Why:** repeated runs of the same prompt almost never return the same brand list (<1 in 100 chance across ChatGPT and
Google AI in a 2,961-run study by SparkToro/Gumshoe; vendor partnership, not peer-reviewed [C]); commercial audits
show low source overlap and high run-to-run variability [B]. **Measure rates over many runs, never "rank".**

1. **Prompt panel** (build once, keep fixed): 30-50 realistic prospect prompts in **Spanish**, plus 10 in English for cross-border patients. Mix: informational ("qué es…", "cuánto tarda…"), local-commercial ("agencia de marketing para dentistas en Tijuana"), comparison/objection ("Doctoralia vs sitio propio"), brand ("Activo Medical Marketing reseñas").
2. **Run** each prompt **≥5 times per engine per month** (ChatGPT search, Google AI Mode / AI Overviews, Perplexity, Copilot), same location and logged-out where possible. Record: brand mentioned?, URL cited?, which page?, position in answer, **text absorbed**, sentiment, **factual errors about us**.
3. **Metrics:** mention rate, citation rate, share of voice vs 3-5 named competitors, fidelity errors, answer-to-action rate. Separate *selection* from *absorption*.
4. **First-party data:** Search Console Performance (AI clicks included) + the new **Generative AI performance report** (impressions) once available; **Bing Webmaster Tools → AI Performance** (citations, sampled grounding queries; no clicks); **GA4**: create a channel group "AI assistants" for sources such as `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`, `claude.ai` (many AI visits still appear as *direct*).
5. **Experiments:** change **one page at a time**, keep similar pages untouched as controls, wait for recrawl (days to months), avoid attributing results inside Google update windows (11.1), and write the hypothesis *before* the change.
6. **Log template** (one row per run): date · engine · prompt · run# · mentioned Y/N · cited URL · absorbed passage · errors · notes.

### 11.7 Health (YMYL) and Mexico specifics

- **AI Overviews are common on health queries and imperfect.** A Guardian investigation (Jan 2026) led Google to remove Overviews for some health queries [D]; SE Ranking's German-language study (50,807 health queries; snapshot Dec 2025): AIOs on >82% of queries, **YouTube the most-cited source (4.43%)** while journals/government sites were ~1% [C]; a peer-reviewed study of 900 US health queries also found YouTube among the top sources and ~46% overlap with organic results [B]. **Implication:** build **named-expert video** and put the transcript on the page; make clinical claims traceable to primary sources.
- **Source quality for medical statements:** link primary or authoritative sources (Secretaría de Salud, COFEPRIS, Normas Oficiales Mexicanas, WHO/PAHO, PubMed, society guidelines), identify author *and* reviewer with credentials and a review date. Pages that only *assert* medical or outcome claims are the weakest.
- **Advertising rules (México):** per secondary sources [D], promoting health services (including on social media) generally requires an **aviso de publicidad** before COFEPRIS (clinics/hospitals may need a *permiso*), with *educational* content treated differently from content that promotes a practice, address, hours, prices or booking; claims must be truthful and substantiated. Initiatives to reform the law were presented in Dec 2025 and Mar 2026 (proposals, not confirmed law). **Verify the current procedure at gob.mx and with counsel.** Action for this site: add the question *"does the client have their aviso/permiso?"* to onboarding, and avoid copy that implies guaranteed outcomes.
- **Language:** AI Mode has been available in Spanish since Sept 2025 (rollout was uneven in Mexico at launch) [D]; the Toronto study found engines differ in **cross-language stability and sensitivity to wording**. Write native Spanish pages for Spanish prompts and native English for cross-border prompts; don't machine-translate. Keep `hreflang` correct if both languages exist.
- **Representing the brand in many cities:** city pages need *local* information (see F3); a template with the city name swapped is what the spam policy describes.

### 11.8 Off-site and entity checklist (an on-page audit cannot see these, so check them separately)

| Item | Check | Grade of support |
|---|---|---|
| Google Business Profile | Complete categories/services, current hours, photos, Q&A, posts; reviews **requested ethically and answered** (no gating, no fake reviews) | [A] guidance; [C] review correlation |
| Name/entity consistency | Same company name, description, years, services and credentials on site, schema, GBP, LinkedIn (company + founder), Medium, Pinterest, directories | Principle [A]: structured data must match visible text |
| Third-party profiles | Directories and review sites relevant to health marketing in Mexico; industry associations | [C]/[D] |
| Earned coverage | Guest articles, podcasts, interviews, quotes in industry/health outlets, **with real expertise** | [C]/[B] |
| Video | A YouTube channel with doctor-focused explainers + transcripts on the pages | [C] |
| Community | Honest participation where prospects ask (communities, Q&A); no astroturfing | [C]; Google warns against manufactured mentions [A] |
| Wikipedia/Wikidata | Only if the entity is genuinely notable; never self-promote | principle |
| Bing / IndexNow | Verified in Bing Webmaster Tools; IndexNow submissions on publish/update | [A]/[D] |

### 11.9 Myths vs. evidence (quick reference)

| Claim you will hear | Verdict |
|---|---|
| "You need an `llms.txt`" | Not for Google [A]; no measurable citation effect in the largest study [C]. Optional |
| "Break content into 40-word chunks for AI" | Google: unnecessary [A]; GEO and chunking add nothing when relevance is missing [B] |
| "Add FAQ schema to get cited" | Google: no special markup [A]; no measured lift [C]. Write real FAQs; schema is optional |
| "Hit N words / long-form wins" | Google: no ideal length [A]. Information added is what matters |
| "Keyword-stuff the AI-friendly terms" | **Negative** in the GEO paper (−9% PAWC) [B] and violates spam policy [A] |
| "Rewrite everything to sound AI-friendly" | Not needed [A]; generic rewrites can hurt [B] |
| "Backlinks are what AI uses" | Correlation with AI visibility is weak versus brand mentions/YouTube [C]; but those are correlations |
| "Buy mentions / fake community posts" | Not helpful and a spam risk [A] |
| "Rank #1 and you'll be cited" | Not reliable: overlap between top 10 and citations ranges 12-89% depending on method [C] |
| "AI search is already your main channel" | Small and fast-growing; high-intent; mostly attribution-blind [C]. Keep SEO foundations |
| "GEO replaces SEO" | Google: SEO best practices continue to apply [A]; academic survey: no stable cross-platform GEO effect [B] |

### 11.10 Limits of this research (read before quoting it)

- Most numbers are **correlational and vendor-run**; platforms change monthly; many studies are single snapshots (often late 2025).
- Primary sources were **not retrievable** for: Moz, Seer, Muck Rack, the Ahrefs figures on AI Overview top-10 overlap (38% vs 76%), the 1,885-page schema test and the 137k-domain llms.txt analysis, Pew's text, the Guardian investigation, Bing's announcement, the Search Console AI-report post, and the Aug 2026 site-reputation post. Those figures are marked [C]/[D] and come from reputable secondary coverage. **Re-verify before client-facing use.**
- Academic results come from **controlled testbeds** (fixed context, one or two engines, synthetic pairs); they show what can change an answer *once retrieved*, not what earns retrieval.
- The Google guidance is the only *authoritative* statement about Google's behaviour; it says nothing about ChatGPT, Perplexity or Claude.

### 11.11 Suggested 90-day roadmap for this site

1. **Fix identity and truth first (P0/P1):** F1 (H1/duplicate headline), F2 (unverified numbers), F3 (city twins).
2. **Server-render the trust signals on articles (F11):** author name, date, read time and author card are empty in raw HTML today; render them in the Worker (this also makes the JSON-LD match visible text).
3. **Add an evidence layer** to the 12 posts and service pages: sources with dates, the agency's own anonymised data/method, named reviewer. Start with the highest-YMYL pages (dentistas, cirujanos).
4. **Off-site:** audit and complete Google Business Profile; ethical review requests; LinkedIn (founder + company); 4-6 short **YouTube explainers** with transcripts.
5. **Measurement baseline before changing more:** prompt panel (40 prompts × 5 runs × 3 engines), GA4 AI channel group, Bing Webmaster Tools AI Performance, Search Console Generative AI report.
6. **Technical hygiene:** confirm Cloudflare AI Crawl Control settings, decide on training bots, drop `Crawl-delay`, keep IndexNow in the publish workflow.
7. **Freshness policy:** quarterly review of money/medical pages with truthful "revisado por … el …" lines.
8. **Compliance pass** on every specialty page with counsel (aviso/permiso, claim substantiation).

---

## 12. Sources (primary authority first)

Google Search Central
- Creating helpful, reliable, people-first content: https://developers.google.com/search/docs/fundamentals/creating-helpful-content
- Optimizing your website for generative AI features: https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- AI features and your website: https://developers.google.com/search/docs/appearance/ai-features
- Search Essentials: https://developers.google.com/search/docs/essentials
- Spam policies: https://developers.google.com/search/docs/essentials/spam-policies
- SEO Starter Guide: https://developers.google.com/search/docs/fundamentals/seo-starter-guide
- Guidance on generative AI content: https://developers.google.com/search/docs/fundamentals/using-gen-ai-content
- Organization structured data: https://developers.google.com/search/docs/appearance/structured-data/organization
- Influencing title links: https://developers.google.com/search/docs/appearance/title-link
- Control snippets in search results: https://developers.google.com/search/docs/appearance/snippet
- Link best practices: https://developers.google.com/search/docs/crawling-indexing/links-crawlable
- Sitelinks and site structure: https://developers.google.com/search/docs/appearance/sitelinks
- Byline dates: https://developers.google.com/search/docs/appearance/publication-dates
- SEO guide for web developers: https://developers.google.com/search/docs/fundamentals/get-started-developers

Semrush (secondary: associations, not ranking factors)
- Content optimization for AI search study: https://www.semrush.com/blog/content-optimization-ai-search-study/
- How to optimize content for LLMs: https://www.semrush.com/blog/optimize-content-for-llms-with-semrush/
- How to optimize content for AI search engines: https://www.semrush.com/blog/how-to-optimize-content-for-ai-search-engines/
- SEO content guide for search and AI: https://www.semrush.com/blog/seo-content/
- What is E-E-A-T in SEO?: https://www.semrush.com/blog/what-is-e-e-a-t-in-seo/

Microsoft Bing
- AI Performance: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c
- Webmaster Guidelines: https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a

*Evidence labelling in the PDF: official guidance (Google, Bing) vs. research associations (Semrush) vs. editorial
interpretation (e.g. "inference tax"). Do not present the last two as ranking factors in client-facing reports.*

### Added 2026-10-12: research addendum sources

Google (official)
- Search Status Dashboard (ranking incidents): https://status.search.google.com/summary
- Search Central blog (2026 archive: AI guide May, Generative AI reports Jun, spam/site-reputation posts): https://developers.google.com/search/blog
- Optimizing for generative AI features (guide): https://developers.google.com/search/docs/fundamentals/ai-optimization-guide
- AI features and your website (updated 2025-12-10): https://developers.google.com/search/docs/appearance/ai-features
- Spam policies (updated 2026-08-28): https://developers.google.com/search/docs/essentials/spam-policies
- Search Quality Rater Guidelines: https://static.googleusercontent.com/media/guidelines.raterhub.com/en//searchqualityevaluatorguidelines.pdf

Other platforms (official docs)
- OpenAI crawlers (OAI-SearchBot, GPTBot, ChatGPT-User): https://developers.openai.com/api/docs/bots
- Anthropic crawlers (ClaudeBot, Claude-SearchBot, Claude-User): https://support.claude.com/en/articles/8896518-does-anthropic-crawl-data-from-the-web-and-how-can-site-owners-block-the-crawler
- Cloudflare managed robots.txt / AI Crawl Control: https://developers.cloudflare.com/bots/additional-configurations/managed-robots-txt/
- Bing Webmaster Tools, AI Performance: https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c

Academic
- Aggarwal et al., *GEO: Generative Engine Optimization*, KDD 2024: https://arxiv.org/abs/2311.09735
- Chen et al., *Generative Engine Optimization: How to Dominate AI Search* (Toronto, 2025): https://arxiv.org/abs/2509.08919
- Puerto et al., *C-SEO Bench: Does Conversational SEO Work?* (NeurIPS D&B 2025): https://arxiv.org/abs/2506.11097
- Liu et al., *Lost in the Middle* (TACL 2024): https://arxiv.org/abs/2307.03172
- Dai et al., *LLMs may Dominate Information Access / Neural Retrievers are Biased Towards LLM-Generated Content*: https://arxiv.org/abs/2310.20501
- Martinez, *Optimizing Visibility in Generative Engines: A Critical Survey of GEO (2023-2026)*: https://arxiv.org/abs/2607.14035
- Zhang et al., *From Citation Selection to Citation Absorption*: https://arxiv.org/abs/2604.25707
- Vishwakarma et al., *What Gets Cited: Competitive GEO in AI Answer Engines*: https://arxiv.org/abs/2605.25517
- Tian et al., *Diagnosing and Repairing Citation Failures in GEO*: https://arxiv.org/abs/2603.09296

Industry studies (association, vendor-run)
- Semrush, content optimization for AI search study: https://www.semrush.com/blog/content-optimization-ai-search-study/
- Semrush, AI search and SEO traffic study: https://www.semrush.com/blog/ai-search-seo-traffic-study/
- Ahrefs, brand visibility factors in AI search (75,000 brands): https://ahrefs.com/blog/ai-brand-visibility-correlations/
- Ahrefs, AI assistants prefer fresher content: https://ahrefs.com/blog/do-ai-assistants-prefer-to-cite-fresh-content/
- SE Ranking, llms.txt vs AI citations (~300k domains): https://seranking.com/blog/llms-txt/
- Vercel / MERJ, *The rise of the AI crawler*: https://vercel.com/blog/the-rise-of-the-ai-crawler
- SparkToro / Gumshoe, AI recommendation lists rarely repeat: https://searchengineland.com/ai-recommendation-lists-rarely-repeat-study-468076
- Pew Research, users click less when an AI summary appears: https://www.pewresearch.org/short-reads/2025/07/22/google-users-are-less-likely-to-click-on-links-when-an-ai-summary-appears-in-the-results/
- Search Engine Land, Microsoft Bing/Copilot use schema for its LLMs: https://searchengineland.com/microsoft-bing-copilot-use-schema-for-its-llms-453455
- Moz AI Mode citation study and Seer, Muck Rack, Insites, BrightLocal, SE Ranking health-YouTube study: reported by trade press; primary reports not retrieved (see 11.10)
