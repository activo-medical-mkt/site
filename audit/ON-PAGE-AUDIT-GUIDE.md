# On-Page Content & AI-Discovery Audit Guide (reusable, any site)

Reusable protocol for auditing the pages of **any website** for search engines and AI answer engines (SEO, AEO, GEO).
It combines the framework in *"Optimizing On-Page Content for Search & AI Discovery"* (Sept 2026; Google Search
Central as primary authority, Semrush and Bing as secondary) with a **graded research addendum** (section 10;
snapshot 2026-10-12). Site-specific editions live in `audit/sites/<site>/`; the first one is `activomedical`.

> **The principle:** do not optimise content to sound like SEO content or AI content. Optimise it to contain
> information worth **finding, understanding, trusting and retrieving**. The model is **Define → Explain → Prove → Help**.

**Language:** the guide is in English; the checks apply to pages in any language. The script ships lexicons for
**Spanish and English** and can be extended (section 9). Not legal advice.

**Evidence grades** are used throughout, so you never present a hunch as a fact:

| Grade | Meaning |
|---|---|
| **[A]** | Official documentation of the platform (Google, OpenAI, Anthropic, Cloudflare, Microsoft) |
| **[B]** | Academic paper (peer-reviewed or arXiv preprint): strong on method, narrow on setting |
| **[C]** | Large-sample industry/vendor study: **association, not causation**; vendors sell what they measure |
| **[D]** | Secondary report, forum or practitioner claim; not verified at the primary source |

---

## 0. Quick start: a new site in about 30 minutes

| # | Step | How |
|---|---|---|
| 1 | Create the **profile** | `cp audit/profiles/_template.json audit/profiles/<site>.json` and fill host, language, entities, author names, `mask_terms` (city/brand names) |
| 2 | Create the **site folder** | `cp -r audit/sites/_template audit/sites/<site>` and open `SITE-NOTES.md` |
| 3 | Write the **canonical description** and the **fact register** | Section 3. Anything the site claims that you cannot prove goes in the register as *UNVERIFIED* |
| 4 | **Scan the whole site** | `python audit/audit-page.py --sitemap https://<host>/sitemap.xml --profile audit/profiles/<site>.json --out audit/sites/<site>/baseline-scan.md` |
| 5 | Build the **page inventory** | Copy the scan's paths into `SITE-NOTES.md`; add type, job sentence, YMYL level |
| 6 | Take the **AI baseline** *before changing anything* | Section 10.6: prompt panel, 5 runs per prompt per engine |
| 7 | **Audit page by page** in this order: YMYL / money pages → hubs → articles → legal | Section 1 |
| 8 | **Log findings** (F1, F2…) in `SITE-NOTES.md`, prioritise (section 8), fix, re-scan | Section 8 |

---

## 1. Per-page protocol (7 steps)

1. **Classify** the page: type, one-sentence *job*, primary search intent, language, YMYL level (section 3.4).
2. **Collect evidence**: never audit from memory.
   ```bash
   python audit/audit-page.py <live-URL> --profile audit/profiles/<site>.json      # sees the raw HTML, like AI crawlers
   python audit/audit-page.py <local-file.html> --profile audit/profiles/<site>.json
   ```
   Then **read the page itself**. The script measures; it cannot judge.
3. **Answerability test** (3.3): can all 7 questions be answered from explicit visible text? Count the misses (the *inference tax*).
4. **Walk the checklists** (section 4: C, K and A series): mark PASS / FAIL / N-A with **evidence** (a quote, a number, a URL).
5. **Cross-check facts** against the fact register (3.2). Any mismatch between pages, schema or off-site profiles is a finding.
6. **Tag AI-visibility findings with the failing stage** of the visibility chain (10.3) and fix *there*, not by blanket rewriting.
7. **Prioritise and report** (section 8). After the fix, **re-run the script and attach before/after**.

---

## 2. Principles and guardrails

| Step | Ask |
|---|---|
| **Define** | Does the page state plainly what the company / service / product / topic *is*? |
| **Explain** | Does it say what it does, how it works, who it serves, why it matters? |
| **Prove** | Is every consequential claim backed by experience, credentials, data, examples, sources or method? |
| **Help** | Does the reader finish able to do what they came to do? |

**Guardrails: what NOT to do** (explicit in Google's guidance; the usual ways to "optimise" a page into a worse one):

- **Do not chop content into tiny "AI-friendly" chunks.** Short sentences are fine; sentences that never explain, qualify or prove are not.
- **Do not set word-count targets.** Ask "what information does this page add?" [A]
- **Do not create a page per query variation** (city × service × specialty) unless each has a distinct purpose and genuinely different information; scaled-content and doorway-abuse policies apply [A].
- **Do not add FAQs just because a tool suggests them.** Only real prospect questions, answered substantively.
- **Do not fake freshness.** Change "updated" dates only when facts, advice, products, evidence or method materially change.
- **No special AI markup or AI-only text files are required** for Google's AI features [A]. `llms.txt` is optional and has shown no measurable effect (10.2).
- **Structured data must match visible content.** Never mark up what the page does not show.
- **Hidden text is allowed only in forms like accordions, tooltips and screen-reader-only text**, and must mirror what users can see [A].
- **Do not replace the category with a trend** ("AI-powered growth") or hide the offering behind problem-only copy.
- **Never imply guarantees you cannot support.** Doubly true for health, finance, legal and safety topics.

---

## 3. Site setup artifacts

### 3.1 Canonical business description (approve once; keep every page compatible)

> **[Company] is a [primary category] specializing in [core capabilities] for [primary audience / market].**

It is a *reference point*, not copy to paste everywhere: homepage, About, service pages, schema and profiles must never
contradict it. Example (from the framework): *"BrightHire is applicant-tracking software for mid-sized recruiting
teams. It centralizes candidate pipelines, interview scheduling, scorecards and hiring analytics."* If expansion is
planned, **don't hard-wire a single city or product into the brand description**; put places on location pages and in `areaServed`.

### 3.2 Fact register: single source of truth

Every number or credential the site shows must have a row. **No proof → mark UNVERIFIED → fix or remove.**

| Fact | Value to use everywhere | Proof / link | Status (confirmed / UNVERIFIED) | Owner |
|---|---|---|---|---|
| Years in business / in the field | | | | |
| Services / products | | | | |
| Audiences and markets | | | | |
| Languages | | | | |
| Credentials, licences, certifications | | verification URL | | |
| Client / customer counts, outcomes, retention | | definition + period + source | | |
| Prices, guarantees, warranties | | | | |
| Legal entity, address, phone, email | | | | |

### 3.3 Answerability test (run first on every page)

A new employee, or a retrieval system, must answer **from explicit visible text, without inferring**:
1. What is the entity? 2. What category is it? 3. What does it do? 4. Who does it serve?
5. Where does it operate? 6. What are its core capabilities? 7. What evidence supports its claims?

The number it **cannot** answer is the page's **inference tax**.

### 3.4 Classify the page before judging it

| Field | How to fill it |
|---|---|
| **Type** | Section 6 (home, service, location, article…) |
| **Job (one sentence)** | "This page helps [audience] decide / understand / do [X]." If it cannot be written in one sentence, that is finding #1 |
| **Primary intent / query** | The words a prospect actually types, in the page's language |
| **YMYL level** | **High**: content that can affect health, finances, safety or welfare (treatments, outcomes, legal/financial advice). **Medium**: commercial claims in those industries. **Low**: everything else |
| **Adjacent topics** | Do they support the job or compete with it? |

---

## 4. The checklists

Mark **PASS / FAIL / N-A**. Every FAIL needs **evidence**.

### 4.1 Core checks: every page

| ID | Check | Evidence / how to verify | Typical fix |
|---|---|---|---|
| C1 | Primary purpose is clear and focused on **one** intent | Write the job sentence; compare with H1 and first screen | Move off-topic blocks to their own pages and link |
| C2 | The page **explicitly states what the company / service / topic is** | First ~150 words contain category + offering in plain words | Add a descriptive lead under the H1 |
| C3 | On brand pages the **category is clear**, not replaced by trend language | Home/About/hubs read aloud | Keep trends as a *capability*, not the identity |
| C4 | Products, services, audiences, markets are **named, not implied** | `entity_mentions` in the script output; read the intro | Name them explicitly |
| C5 | Problem-led copy has **enough descriptive context** | Headline may persuade; the paragraph below must say what is sold | Add "what it is / what you get / for whom" |
| C6 | Adjacent topics **support** the core topic | Outline review | Cut or link out |
| C7 | Each major claim is **explained** (how, why, when, for whom, conditions) | List claims; check 1-2 sentences of explanation follow | Add conditions and limits |
| C8 | Each important section has **≥1 specific detail** (entity, tool, method, number with context, example) | `numbers_in_copy`; specificity ladder (5.2) | Replace generics with Level 3-5 information |
| C9 | **Vague claims are supported** (leading, expert, advanced, secure, fast, high-quality, proven…) | `vague_terms`: each hit needs proof within ~2 paragraphs | "So what?" test (5.3) |
| C10 | Page contains **original experience, cases, examples, data, method or expert input** | Could a generic model have written it? | Add first-hand material |
| C11 | **Title, H1, headings and visible copy** describe the page accurately and agree | Script: title/meta/H1/outline; `heading_level_skips` | Align; exactly one H1; no skipped levels; no duplicated heading text |
| C12 | Concise answers **lead into supporting detail** where nuance is needed | `short_paragraphs_lt12_words`; look for 2-sentence chunks | Merge fragments into explained paragraphs |
| C13 | Important information is **visible, accessible text** (not only image / animation / decorative SVG / JS-only) | Compare raw HTML with rendered page | Put the fact in real HTML text |
| C14 | **Keywords and anchors are natural and descriptive** | `generic_or_empty_anchors`; read aloud | Destination-describing anchors; remove stuffing |
| C15 | A reader can say **what this is, what it does, who it serves and why it is credible** without guessing | Answerability test 7/7 | Close each miss with a sentence + proof |

### 4.2 Conditional checks: use when they apply

| ID | When | Check | Evidence |
|---|---|---|---|
| K1 | Experience affects trust | **Verifiable** years, volume, credentials, implementations, clients, case history | Matches the fact register; linked proof |
| K2 | Expertise matters | Clear who wrote / reviewed it and why they are qualified (byline → profile) | Visible in the **raw HTML**, not only in schema |
| K3 | YMYL topics | High-impact claims backed by authoritative sources; risks, limits, uncertainty and alternatives stated | `authority_domains_linked`; section 5.4 |
| K4 | Statistics / time-sensitive facts | Current, **sourced** and contextualised (period, sample, definition) | Source link or removal |
| K5 | Structured data present | JSON-LD matches visible content; valid JSON; required properties | `schema` in the script output vs page text |
| K6 | Dates are shown | Publication/update dates truthful, changed only on material updates | `dates_visible`, schema dates, version history |
| K7 | AI assisted the writing | Facts and judgement reviewed by a domain expert; contains inputs a model lacks | Ask who verified it |
| K8 | Several pages target related queries | Each has a **distinct user purpose**; none is a scaled variant | Site scan near-duplicate pairs (section 9) |

> A page does **not** need to maximise every signal. It must clearly define its subject, explain what matters,
> prove consequential claims, and help the intended reader finish the page's job.

### 4.3 AI-discovery checks (A-series)

| ID | Check | Evidence / how to verify | Grade |
|---|---|---|---|
| A1 | **Answer-first lead:** the first screen / first ~100 words say what the page is and give the direct answer | `lead_first_60_words` | [B] |
| A2 | Each major H2 opens with a direct answer sentence, then context, conditions, exceptions | Read the outline | [B]/[C] |
| A3 | **Facts carry source + date + method** beside them; numbers are explained, not decorative | `numbers_in_copy`, `authority_domains_linked` | [B] |
| A4 | Any quotation is **real, attributed and linkable** (named expert, regulator, study); never invented | Click through | [B] |
| A5 | Extractable formats where natural: definitions, comparison tables, step lists, price ranges | `tables`, `lists`, `question_headings` | [B]/[C] |
| A6 | Informational sections are not drowned in sales copy; CTAs sit in their own blocks | Read; count promotional vs explanatory paragraphs | [C] |
| A7 | **All critical content is in the raw HTML** (byline, dates, definitions, FAQs, internal links) | Run the script on the **live URL**; compare with the rendered page | [C]/[A] |
| A8 | Hidden-but-crawlable text mirrors visible content | `hidden_blocks_with_links` | [A] |
| A9 | AI search/user bots are not blocked by robots.txt, CDN, WAF or bot rules | Section 10.5 status test | [A] |
| A10 | **Entity consistency:** name, description, years, services, credentials identical on page, schema and off-site profiles | Fact register + off-site checklist (10.8) | [A] |
| A11 | Off-site proof exists and is linked: reviews, profiles, press, video | 10.8 | [C]/[B] |
| A12 | Freshness: truthful `dateModified`; time-sensitive facts say "as of <date>"; reviewed on a schedule | `dates_visible`, schema dates | [C]/[D] |
| A13 | Page is not a scaled variant | Site scan (section 9) | [A] |
| A14 | Each AI-visibility finding is tagged with the **failing stage** (10.3) | Report | [B] |
| A15 | The page is in the **prompt panel** and its AI traffic/citations are tracked (10.6) | Log exists | [B]/[C] |

---

## 5. Rubrics

### 5.1 Claim → Explanation → Evidence → Relevance

| Weak (claim only) | Stronger pattern |
|---|---|
| "Our platform is enterprise-ready." | "The platform supports SSO/SAML, role-based permissions, audit logs, regional data hosting and documented APIs. Enterprise plans include security-review support and defined support SLAs." |
| "Our hotel is ideal for business travelers." | "A five-minute walk from the convention center, 24-hour check-in, in-room desks, 500 Mbps Wi-Fi, early breakfast from 6:00 a.m., bookable meeting rooms." |

### 5.2 Specificity ladder (aim for Levels 3-5 in each section)

| Level | Example |
|---|---|
| 1 Vague | "We provide innovative technology solutions." |
| 2 Category | "We provide software development services." |
| 3 Specific | "Custom software development, cloud modernization, data engineering and AI development." |
| 4 Contextual | "…for mid-market and enterprise organizations with complex legacy environments." |
| 5 Evidence-backed | Level 4 + years, industries, technologies, delivery examples, outcomes, credentials, methodology |

### 5.3 The "So what?" test

For any sentence with *experience, leading, advanced, secure, fast, high-quality, comprehensive, real*: ask **doing what,
in which context, and why does it matter to this reader's decision?** If the page has no answer, rewrite or delete.

### 5.4 YMYL standard: raise the evidence bar

For health, finance, safety and legal topics the standard moves from "plausible and readable" to **"appropriately
qualified, sourced, current, balanced and reviewable"** [A]. Weak: *"This treatment is safe, fast, and gets you back to
normal quickly."* Stronger: define the treatment, typical indications, material risks, alternatives, recovery
variability, who evaluates candidacy, and which claims are supported by clinical or regulatory sources. Equivalent for
finance: strategy, risk, time horizon, historical vs future performance, assumptions, fees, qualified author.

- **Never** use guarantees ("guaranteed", "100%", "no risk"). **Scope time claims** to what the evidence supports.
- Name the **accountable human** (author *and*, for expert claims, a qualified reviewer) with credentials and a review date.
- **Look up the advertising / claims rules of every target jurisdiction** and have counsel review wording. (A worked
  example for Mexico is in the activomedical edition.)

### 5.5 Titles, metas, headings, anchors, dates

| Element | Standard | Weak → stronger |
|---|---|---|
| Title | Descriptive, concise, unique; entity + topic + audience; brand last. ~60 chars is a display target, not a rule | "Home \| Acme" → "Acme \| Inventory management software for multi-location retailers" |
| Meta description | Accurate summary (Google often builds snippets from body copy, so the body must carry the meaning) | Slogan → one sentence: what, for whom, where |
| Headings | Informative, hierarchical (no skipped levels), unique | "Is migration hard?" → "Migration planning: dependencies, testing, rollback" |
| Anchor text | Describes the destination | "Learn more" → "Explore our warehouse inventory integrations" |
| Dates | Truthful; only on material change | "Updated today" after changing a comma → no |

---

## 6. Page-type playbooks

| Page type | Must state | Must prove | Common traps |
|---|---|---|---|
| **Home** | Category, audience, core offerings, markets; routes to money pages | Verifiable proof strip (years, credentials, named clients, real numbers) | Slogan-only or trend-led hero; the H1 being a pill label; duplicated headline text |
| **Service / category** | What it is, who it is for, scope and deliverables, process, price factors or ranges, constraints | Cases, credentials, method, real FAQs | Benefit lists with no scope; swapped-name twins |
| **Location** | Local market specifics, service area boundaries, regulations or lead times, local team/cases, NAP, map | Local proof (reviews, photos, cases) | **Doorway / scaled twins** |
| **Specialty / vertical** | The audience-specific problem, method and regulatory context | Domain expertise, reviewed claims | Generic copy with the vertical name swapped; unsupported outcome claims |
| **Product** | Specs, price, availability, shipping/returns, comparisons | Reviews, certifications, unique images | Manufacturer boilerplate; stale price/stock; mismatch with feeds and schema |
| **Article / guide** | Direct answer first, scope, who it is for | Original data/experience, sources with dates, author + reviewer, update policy | Commodity listicle; no byline in raw HTML; no sources |
| **About / team / author** | Who, history, method, credentials, contact | Verifiable credentials; links to profiles (`sameAs`) | Vague "experts"; credentials that cannot be checked |
| **Case study** | Client context, problem, method, timeframe | Metric with definition and period; limits | Unattributed percentages; no method |
| **Legal / policy** | Exactly what is collected and by which tools, rights and contact | Accuracy and recency | Boilerplate that omits the real trackers; no updated date |
| **Ad landing page** | One intent matching the ad promise | Compliance wording; speed | Claims that differ from the ad; hidden information |

---

## 7. Industry modules (extra checks; research depth differs)

| Module | Extra checks | Research depth here |
|---|---|---|
| **Health / medical (YMYL high)** | Author **and** qualified reviewer + date; claims traced to primary sources; risks, alternatives, variability stated; no guaranteed outcomes; local advertising-regulator requirements checked; named-expert **video** with transcript (YouTube dominates health citations, 10.7); YMYL standard (5.4) | **High** |
| **Local services** (clinics, trades, restaurants) | Complete, current Google Business Profile; ethical review program and replies; consistent name/address/phone; service-area pages with local substance (no doorway pages); schema matches visible NAP | **High** |
| **Finance / legal / safety (YMYL)** | Licensing and jurisdiction visible; risk and time horizon; assumptions and fees; reviewed by a licensed professional; disclaimers never replace substance | Medium (framework examples) |
| **B2B software / services** | Category-first positioning; integrations, security, pricing logic and implementation described; comparison pages; case studies with defined metrics; docs crawlable | Medium |
| **Publishers / blogs** | Bylines and bios in raw HTML; original reporting or data; corrections and update policy; no scaled low-effort AI pages; `Article` schema matches the page | Medium |
| **E-commerce** | Unique product information; price/availability visible and consistent with feeds (Google recommends keeping Merchant Center data current [A]); real reviews; no thin affiliate pages (spam policy) | **Low**: not researched in depth here |

---

## 8. Severity, findings log and report template

| Priority | Definition | Examples |
|---|---|---|
| **P0** | Factually wrong, contradictory, unsupported YMYL/result claim, or the page's identity is unclear | Conflicting years of experience; guaranteed-result wording; schema contradicting the page |
| **P1** | Material Define/Explain/Prove gap on a money page; scaled-duplicate risk; key fact only in a non-text or JS-only element | Service page with no proof; city twins ≥ 60% overlap; byline missing from raw HTML |
| **P2** | Polish | Truncated titles/metas, generic anchors, heading-level skips |

Fix order: **P0 → P1 on revenue pages → P1 elsewhere → P2 in batches.** Log each finding in `SITE-NOTES.md` as
`F<n> | observation | guide ref | action | priority | status`.

**Report template (one per page; save as `audit/sites/<site>/reports/<slug>.md`):**

```markdown
# Audit: <URL>
Date · Auditor · Page type · YMYL level · Language
**Job (1 sentence):**   **Primary intent / query:**
**Evidence pack:** reports/<slug>-evidence.md  (python audit/audit-page.py ... --out ...)

## Answerability: __/7 answered from visible text. Unanswered: …
## Checklist
| ID | PASS/FAIL/N-A | Evidence |  (C1-C15, K1-K8 if applicable, A1-A15)
## Fact-register conflicts
## Findings
| P | Finding | Evidence | Failing stage (10.3) | Fix (file/section) | Needs owner input? |
## Rewrites proposed (Before → After; use only facts from the register; mark [NEEDS FACT] if missing)
## Verification after fix
- [ ] renders  - [ ] script re-run (before/after attached)  - [ ] schema valid  - [ ] no new fact conflicts
```

---

## 9. The script: `audit/audit-page.py`

It **measures**; you **judge**. It reads the **raw HTML** (what AI crawlers without JavaScript see), so run it on the
live URL; compare against the rendered page in a browser to spot JS-only content.

| Mode | Command |
|---|---|
| One page | `python audit/audit-page.py <url-or-file> [--profile P] [--json] [--out FILE]` |
| Whole site | `python audit/audit-page.py --sitemap https://host/sitemap.xml [--profile P] [--limit 60] [--similarity 0.5] [--out FILE]` |

**Site-scan columns:** title/meta length, H1 count, words, internal/external links, generic anchors, images without alt,
vague-term total, risk phrases, authority links. It also lists **near-duplicate pairs** (6-word shingle Jaccard ≥
threshold after masking `mask_terms`, e.g. city names): pairs above ~50-60% are likely scaled variants (K8).

**Profile fields** (all optional; `audit/profiles/_template.json`): `site_name`, `host`, `language`, `entities[]`,
`author_names[]`, `mask_terms[]`, `extra_vague{label: regex}`, `extra_risk[]`, `authority_domain_regex`, `ymyl`.

**Limits:** heuristic lexicons (extend `LEX` in the script for new languages or industries); no JavaScript execution;
fetches with a generic user agent (some CDNs block it: run it from a normal network); it cannot assess truth,
expertise or originality: that is the audit.

---

## 10. Research addendum (snapshot 2026-10-12): what the evidence says about AI search, AEO and GEO

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
> test on *your* pages (10.6), not as a rule.

### 10.1 Google: what changed (timeline from Google's own dashboards)

| Date (PT) | Event | Grade | Why it matters |
|---|---|---|---|
| 11-29 Dec 2025 | December 2025 core update | [A] | Baseline period for any comparison |
| 5-27 Feb 2026 | February 2026 Discover update | [A] | Only if Discover traffic matters |
| 24-25 Mar 2026 | March 2026 **spam** update | [A] | Scaled/near-duplicate pages are the exposed pattern |
| 27 Mar-8 Apr 2026 | March 2026 core update | [A] | |
| Apr 2026 | New spam policy: back-button hijacking | [A] | Never manipulate browser history (check any popups/redirect scripts) |
| 21 May-1 Jun 2026 | May 2026 core update | [A] | |
| May 2026 | Google publishes its *Optimizing for generative AI* guide | [A] | The source the PDF cites; see 10.2 "what Google says" |
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

### 10.2 Evidence map: what moves AI visibility

| # | Lever | What the evidence shows | Grade | Confidence | What to do |
|---|---|---|---|---|---|
| 1 | **Topical relevance + position in context** | Most reproducible levers in the 45-study survey; 252,000 controlled trials (6 LLMs): relevance and list position are the biggest drivers of being cited first; "Lost in the Middle": models use information at the start/end of long inputs better than the middle | [B] | **High** | One intent per page; answer first; key definition and facts near the top and at section starts, not buried mid-page |
| 2 | **Citable evidence**: statistics, attributed quotations, credible citations | GEO paper (KDD 2024, GEO-bench, 9 methods): quotation addition +43%, statistics +33%, cite sources +28% PAWC vs baseline in a controlled testbed (+9-21% on a Perplexity subset); **keyword stuffing −9%**; lowest-ranked source gained ~100% while the top-ranked source *lost* 20-30%. Authors: only 2 engines, noisy tags. Survey: gains don't prove discoverability | [B] | Medium | Add *real, checkable* numbers with source, date and method; quote named experts/regulators accurately; **never fabricate** |
| 3 | **Extractable evidence** | Preprint on 602 prompts / 21,143 citations: pages that contribute to the answer are longer, more structured, aligned to the query and rich in definitions, numeric facts, comparisons and procedural steps; ChatGPT cites fewer sources but with higher influence | [B] | Medium | Definitions, comparison tables, step lists, price ranges *inside* explanatory prose |
| 4 | Price, recency, completeness, trust cues; formatting | Same 252k-trial study: explicit price info and a recent timestamp helped consistently; completeness/trust cues smaller; **formatting-only edits had little effect** | [B] | Low-Med | State price ranges where honest; truthful dates; do not rely on formatting tricks |
| 5 | Clarity/summary, E-E-A-T signals, Q&A, section structure | Semrush (304,805 cited URLs vs 921,614 Google top-20 URLs; 13 text-only parameters): clarity & summarization +32.8%, E-E-A-T signals +30.6%, Q&A +25.5%, section structure +22.9%, structured elements (lists/tables) +21.6%; **non-promotional tone −26.2%** (confounded). Only visible text analysed; the authors stress association | [C] | Medium | Lead summary, real Q&A, clear sections; keep informational pages informational and put sales copy in its own sections |
| 6 | **Off-site brand presence** | Ahrefs (75,000 brands, Dec 2025): branded web mentions correlate 0.66-0.71 with AI visibility, YouTube mentions ~0.74, branded search 0.35-0.47, **backlinks very weak**; Toronto study: AI search leans heavily on **earned/third-party media** over brand-owned and social content; Muck Rack/Seer "84% earned", "only off-site signals survive" | [C] + [B] / [D] | Medium; causation unproven | Earn genuine third-party coverage and profiles; YouTube; LinkedIn; directories. Google: *manufactured* mentions don't help [A] |
| 7 | Reviews & local data | Insites (10,000 local businesses, vendor): AI-visible businesses averaged **133 Google reviews vs 11**; BrightLocal survey: ~45% of consumers use AI tools for local recommendations (reported via secondary source) | [C] / [D] | Low-Med | Ethical review program; complete and current Google Business Profile |
| 8 | Freshness | Ahrefs (≈17M citations): AI-cited URLs ~**25.7% fresher** than organic results (ChatGPT freshest, AI Overviews/organic oldest); correlation only. Microsoft staff tie freshness to Gen-AI and recommend IndexNow | [C] / [D] | Low-Med | Real review cadence on money and medical pages; truthful "last reviewed" dates; IndexNow |
| 9 | Organic ranking | Studies disagree: Semrush AI Mode **sidebar** links 51% domain / 32% URL overlap with top 10 (89%/80% with extra links); Moz (~40,000 queries, Feb 2026) only ~**12% exact-URL** overlap, ~1 in 5 domains; Ahrefs: 38% of AIO citations from the top 10 (76% in Jul 2025); Semrush: ChatGPT-cited pages often rank 21+ | [C] | Medium | Ranking helps but is neither required nor sufficient; fan-out widens the pool |
| 10 | Structured data | Google: not required, no special schema [A]; Ahrefs matched test of 1,885 pages: no lift in AI Mode/ChatGPT [C/D]; Microsoft (SMX Munich 2025) said schema helps its LLMs understand content [D]. Semrush's "structured data" association means lists/tables in text, **not JSON-LD** | mixed | Medium | Keep valid schema for rich results, entity clarity and Bing; do not promise citations from it |
| 11 | **llms.txt** | SE Ranking (~300k domains, 10.1% had the file): **no relationship** to citations (model got *better* without it); Ahrefs 137k domains: 97% of files had zero requests in May 2026 [D]; Google doesn't use it [A] | [C] / [A] | **High** that it's not a lever | Optional, lowest priority. Do not spend audit time |
| 12 | **Crawl access and rendering** | Vercel/MERJ: major AI crawlers fetched JavaScript files but **did not execute them** (reported Dec 2024; re-verify); OpenAI/Anthropic document separate search vs training vs user bots [A] | [A] / [C] | High (basic) | Content must exist in the raw HTML (server-render or pre-render). Allow search bots |
| 13 | Retriever "source bias" | Neural retrievers ranked LLM-written passages above human ones (KDD 2024); later work disputes the cause (training-induced). Don't try to exploit it: low-effort scaled AI text is a spam / "Lowest" signal for Google | [B] | Low | Human-verified, expert-input content only |
| 14 | **Generic rewrites can backfire** | "Generic optimization can harm long-tail content"; diagnose *why this page* isn't cited, then repair only that (≈40% relative gain changing ~5% of text in the authors' system) | [B] | Medium | Fix the failing stage (10.3), not the whole page |

### 10.3 The visibility chain: tag every AI-visibility finding with the stage that fails

1. **Eligible**: crawlable by Googlebot, Bingbot and AI bots; indexed; snippet-eligible; content in raw HTML.
2. **Discoverable**: matches the *fan-out* sub-queries around the main intent (topical relevance).
3. **Selected**: the platform trusts the source (authority, recognisability, language, domain context; off-site presence).
4. **Absorbed**: its text is usable as an answer (definitions, numbers, steps, comparisons; answer-first).
5. **Faithful**: the answer states *your* facts correctly (prices, services, credentials, locations).
6. **Actionable**: a human can act (WhatsApp, call, form) from the cited page.

Fix the earliest failing stage first; fixing stage 4 is pointless if stage 1 fails.

### 10.4 Why prioritise conversion and brand, not raw traffic

- Pew Research (900 US adults, 68,879 searches, Mar 2025): clicks on traditional results **8% with an AI summary vs 15% without**; links *inside* the summary were clicked in ~1% of visits [B/C].
- Ahrefs (300,000 keywords, Dec 2025 data): an AI Overview correlates with **~58% lower CTR** for the top-ranked page (34.5% in the 2025 version) [C].
- Semrush (Jul 2025 model): an AI-search visitor is worth **~4.4×** an average organic visitor by conversion rate. A *projection by a vendor that sells the visibility tool*; treat as directional [C].
- **So:** expect fewer but higher-intent visits. Optimise the path from page to WhatsApp, and track branded search, direct traffic and assisted conversions, not only sessions.

### 10.5 Technical access checklist for AI systems

| Bot | Purpose (official docs) | Suggested policy |
|---|---|---|
| Googlebot | Search + AI Overviews/AI Mode source crawling [A] | Allow |
| Bingbot | Bing + Copilot [A] | Allow; verify in Bing Webmaster Tools |
| **OAI-SearchBot** | Surfaces sites in ChatGPT search; "opted-out sites will not be shown in ChatGPT search answers" [A] | **Allow** (drives ChatGPT visibility) |
| **GPTBot** | May train OpenAI foundation models; independent of OAI-SearchBot [A] | Owner decision |
| ChatGPT-User | User-initiated visits inside ChatGPT; robots.txt may not apply [A] | Allow |
| **Claude-SearchBot / Claude-User** | Search relevance / fetching when a user asks Claude [A] | **Allow** |
| ClaudeBot | Training-data collection [A] | Owner decision |
| Google-Extended | Control token for AI training/grounding in *other* Google systems [A] | Owner decision; confirm effect before changing |
| PerplexityBot | Perplexity index (no official doc retrieved) | Allow |

- **Test it yourself** (a normal IP does not exercise CDN verified-bot logic, but it catches blanket blocks): fetch the home page and an article with each bot's user agent and expect **200**:
  `for ua in "Googlebot/2.1" "OAI-SearchBot/1.0" "GPTBot/1.1" "ChatGPT-User/1.0" "ClaudeBot/1.0" "Claude-SearchBot" "PerplexityBot/1.0" "bingbot/2.0"; do curl -s -o /dev/null -w "%{http_code} $ua\n" -A "$ua" https://<host>/; done`
  Then read `https://<host>/robots.txt` for `Disallow` rules, including any added by a CDN (e.g. Cloudflare's managed robots.txt).
- **`Crawl-delay`** is honoured by Bing and Anthropic's bots and ignored by Google; on a small site it only slows them: usually remove it.
- **Cloudflare:** AI Crawl Control and *managed robots.txt* can prepend `Disallow` rules for GPTBot, ClaudeBot, Google-Extended and others, and block at the edge; Cloudflare reported new function-based defaults (Search / Agent / Training) from 15 Sep 2026 [A]/[D]. **Re-check Security → Bots → AI settings after any Cloudflare change**, and re-run the status test above.
- **Rendering:** every fact you want cited must be in the raw HTML (`audit-page.py` already reports `text_in_raw_html_words`).
- **Hidden-but-crawlable blocks** (e.g. the link lists the Worker adds for crawlers) must **mirror what the visible page shows**; otherwise they risk the hidden-text policy.
- **Freshness plumbing:** truthful sitemap `lastmod`, **IndexNow** for Bing/Copilot, Bing Webmaster Tools verified.

### 10.6 Measurement and testing protocol (so decisions rest on data)

**Why:** repeated runs of the same prompt almost never return the same brand list (<1 in 100 chance across ChatGPT and
Google AI in a 2,961-run study by SparkToro/Gumshoe; vendor partnership, not peer-reviewed [C]); commercial audits
show low source overlap and high run-to-run variability [B]. **Measure rates over many runs, never "rank".**

1. **Prompt panel** (build once, keep fixed): 30-50 realistic prospect prompts **in each language the site serves** (Appendix A has the patterns). Mix informational, local-commercial, comparison/objection and brand prompts.
2. **Run** each prompt **≥5 times per engine per month** (ChatGPT search, Google AI Mode / AI Overviews, Perplexity, Copilot), same location and logged-out where possible. Record: brand mentioned?, URL cited?, which page?, position in answer, **text absorbed**, sentiment, **factual errors about us**.
3. **Metrics:** mention rate, citation rate, share of voice vs 3-5 named competitors, fidelity errors, answer-to-action rate. Separate *selection* from *absorption*.
4. **First-party data:** Search Console Performance (AI clicks included) + the new **Generative AI performance report** (impressions) once available; **Bing Webmaster Tools → AI Performance** (citations, sampled grounding queries; no clicks); **GA4**: create a channel group "AI assistants" for sources such as `chatgpt.com`, `perplexity.ai`, `copilot.microsoft.com`, `gemini.google.com`, `claude.ai` (many AI visits still appear as *direct*).
5. **Experiments:** change **one page at a time**, keep similar pages untouched as controls, wait for recrawl (days to months), avoid attributing results inside Google update windows (10.1), and write the hypothesis *before* the change.
6. **Log template** (one row per run): date · engine · prompt · run# · mentioned Y/N · cited URL · absorbed passage · errors · notes.

### 10.7 YMYL and regulated industries

- **AI Overviews are common on health queries and imperfect.** A Guardian investigation (Jan 2026) led Google to remove Overviews for some health queries [D]; SE Ranking's German-language study (50,807 health queries; snapshot Dec 2025): AIOs on >82% of queries, **YouTube the most-cited source (4.43%)** while journals and government sites were ~1% [C]; a peer-reviewed study of 900 US health queries also found YouTube among the top sources and ~46% overlap with organic results [B]. **Implication:** publish **named-expert video** with the transcript on the page, and make clinical or regulated claims traceable to primary sources.
- **Source quality for expert statements:** link primary or authoritative sources (regulators, official standards, WHO/PAHO-type bodies, PubMed, professional-society guidelines); identify the author *and* a qualified reviewer with credentials and a review date. Pages that only *assert* claims are the weakest.
- **Advertising and claims rules differ by country and industry** (health authorities, consumer-protection and securities regulators…). *Not researched here beyond one worked example (Mexico, in the activomedical edition).* For each client: find the regulator, ask whether the client holds any required notice or permit for the advertising you produce, avoid copy that implies guaranteed outcomes, and have counsel review the wording.
- **Language:** AI Mode has been available in Spanish since Sept 2025 (uneven rollout at launch) [D]; the Toronto study found engines differ in **cross-language stability and sensitivity to wording** [B]. Write native pages for each language; don't machine-translate; keep `hreflang` correct when several languages exist.
- **Location pages** need *local* information (see the playbook in section 6); a template with the place name swapped is what the spam policy describes.

### 10.8 Off-site and entity checklist (an on-page audit cannot see these, so check them separately)

| Item | Check | Grade of support |
|---|---|---|
| Google Business Profile | Complete categories/services, current hours, photos, Q&A, posts; reviews **requested ethically and answered** (no gating, no fake reviews) | [A] guidance; [C] review correlation |
| Name/entity consistency | Same company name, description, years, services and credentials on site, schema, GBP, LinkedIn (company + founder), Medium, Pinterest, directories | Principle [A]: structured data must match visible text |
| Third-party profiles | Directories and review sites relevant to your industry and country; industry associations | [C]/[D] |
| Earned coverage | Guest articles, podcasts, interviews, quotes in industry/health outlets, **with real expertise** | [C]/[B] |
| Video | A YouTube channel with doctor-focused explainers + transcripts on the pages | [C] |
| Community | Honest participation where prospects ask (communities, Q&A); no astroturfing | [C]; Google warns against manufactured mentions [A] |
| Wikipedia/Wikidata | Only if the entity is genuinely notable; never self-promote | principle |
| Bing / IndexNow | Verified in Bing Webmaster Tools; IndexNow submissions on publish/update | [A]/[D] |

### 10.9 Myths vs. evidence (quick reference)

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

### 10.10 Limits of this research (read before quoting it)

- Most numbers are **correlational and vendor-run**; platforms change monthly; many studies are single snapshots (often late 2025).
- Primary sources were **not retrievable** for: Moz, Seer, Pew's text, the Guardian investigation, Bing's announcement, the Search Console AI-report post, and the Aug 2026 site-reputation post. Those figures are marked [C]/[D] and come from reputable secondary coverage. **Re-verify before client-facing use.**
- Academic results come from **controlled testbeds** (fixed context, one or two engines, synthetic pairs); they show what can change an answer *once retrieved*, not what earns retrieval.
- The Google guidance is the only *authoritative* statement about Google's behaviour; it says nothing about ChatGPT, Perplexity or Claude.

### 10.11 Typical first 90 days for a new site

| Weeks | Focus | Output |
|---|---|---|
| 1-2 | **Setup and baseline:** profile, canonical description, fact register, site scan, page inventory, prompt-panel baseline | `SITE-NOTES.md` filled; `baseline-scan.md`; first panel results |
| 3-4 | **Truth and identity (P0):** contradictory facts, unverified numbers, guarantee wording, unclear H1/category, schema ≠ visible text | Findings closed; fact register fully "confirmed" |
| 5-8 | **Evidence layer (P1):** sources with dates, original data/method, named author + reviewer on money and YMYL pages; server-render the trust signals; rewrite scaled twins with genuinely local/specific information | Re-scan shows authority links, no near-duplicate pairs |
| 9-12 | **Off-site and measurement:** business profile, ethical reviews, founder/company profiles, video, GA4 AI channel group, Bing Webmaster Tools, Search Console AI report, freshness policy | Dashboards live; second panel run to compare with the baseline |

Change **one page at a time** where you want to learn something, and keep untouched controls (10.6).

### 10.12 Keeping this guide current

See Appendix C (review every ~3 months): re-verify every [D] claim, update the snapshot date and the Google timeline.

---

## 11. Sources (primary authority first)

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

### Research addendum sources (added 2026-10-12)

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

---

## Appendix A: Prompt-panel patterns (replace the <placeholders>; keep the panel fixed between measurements)

Write prompts the way real prospects write them, **in each language the site serves**. Aim for 30-50 prompts.

| Intent | Pattern | Example shape |
|---|---|---|
| Informational | "what is <topic>" · "how does <process> work" · "how long does <outcome> take" | Tests absorption of your definitions and explanations |
| Local / commercial | "<service> in <city>" · "best <provider type> near <place>" · "<provider type> for <audience>" | Tests selection (authority, reviews, local data) |
| Comparison / objection | "<option A> vs <option B>" · "is <thing> worth it" · "<competitor> alternatives" | Tests positioning and third-party sources |
| Brand | "<brand> reviews" · "is <brand> legit" · "who is <founder>" | Tests **fidelity**: does the engine state your facts correctly? |
| Task / agentic | "book / get a quote for <service>" | Tests actionability (stage 6) |

## Appendix B: Run log (one row per run; CSV or sheet)

`date · engine · locale/logged-in? · prompt id · run # · brand mentioned (Y/N) · your URL cited · which page · position in answer · passage absorbed · competitor brands named · factual errors about you · notes`

Report **rates** (mention rate, citation rate, share of voice vs 3-5 named competitors, fidelity errors) over ≥5 runs per prompt per engine, never single-run "rank".

## Appendix C: Keeping this guide current (review every ~3 months)

| Check | Where |
|---|---|
| New core/spam updates and policy changes | Google Search Status Dashboard; Search Central blog |
| Changes to Google's AI-features guidance | Search Central: "Optimizing for generative AI features" and "AI features and your website" |
| New or renamed AI crawlers and their purposes | OpenAI, Anthropic, Perplexity, Microsoft and Cloudflare bot documentation |
| New reports (Search Console, Bing Webmaster Tools) | Their blogs and changelogs |
| New academic evidence | arXiv cs.IR / cs.CL: search "generative engine optimization", "citation", "AI search" |
| Re-verify [D]-graded claims | Primary reports named in section 10.10 |
| Update the snapshot date at the top and in 10.1 | This file |

## Appendix D: Glossary

- **AEO / GEO:** answer-engine / generative-engine optimisation: making content retrievable, citable and usable in AI answers. Google says SEO fundamentals still apply [A].
- **Query fan-out:** AI Mode / AI Overviews issue several related searches behind one prompt, so the cited set can be wider than the classic results [A].
- **Grounding query:** the rewritten search a model runs to retrieve sources (Bing's AI Performance report samples them).
- **Citation selection vs absorption:** being *chosen* as a source vs actually *contributing* language, evidence or structure to the answer [B].
- **Inference tax:** facts a reader or machine must guess because the page does not state them (editorial concept, not a ranking signal).
- **YMYL:** topics that can affect health, financial stability, safety or welfare; held to a higher evidence standard.
- **E-E-A-T:** experience, expertise, authoritativeness, trustworthiness; trust is the most important; not a single ranking factor [A].
- **Scaled content abuse / doorway abuse:** many pages made mainly to rank for variations, or near-duplicate regional pages funnelling to one destination [A].
