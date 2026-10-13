# On-Page Content & Technical Audit Protocol (V2 — IDE & Agent Edition)
*Companion audit checklist and refactoring protocol to `1_CONTENT_CREATION_FRAMEWORK.md`.*

**Purpose:** Use this protocol to audit existing website pages, landing pages, service/product pages, and blog posts. The goal is a **compact, observable, evidence-based audit**—not a vague summary[cite: 1]. 

---

## 1. Instructions for the AI Auditor (Claude, GitHub Copilot, Codex)

When asked to audit a file, URL, or draft against this protocol, you MUST follow these rules:
1. **Quote Exact Lines:** Never mark a check as `WARN` or `FAIL` without quoting the exact problematic sentence, heading, or code snippet from the source file.
2. **Diagnose Using the Framework's Mental Models:**
   * **Inference Tax:** Flag where the reader or retrieval engine is forced to guess what the entity is, what it does, who it serves, or where it operates[cite: 1].
   * **Specificity Ladder (Levels 1–5):** Identify sentences stuck at **Level 1 (Vague)** or **Level 2 (Category)** that should be elevated to **Level 3 (Specific)**, **Level 4 (Contextual)**, or **Level 5 (Evidence-Backed)**[cite: 1].
   * **Claim → Explanation → Evidence → Relevance ("So What?" Test):** Flag unsupported adjectives (*leading, seamless, enterprise-ready, fast, safe, experienced*) that lack adjacent proof[cite: 1].
   * **Human Voice & Anti-Slop Check:** Flag synthetic AI phrasing, repetitive paragraph structures, or bloated word counts that add length without adding information[cite: 1].
3. **Provide Concrete `WEAK → STRONGER` Rewrites:** For every failure or warning, write the exact `STRONGER` replacement right in the audit output[cite: 1]. If real company data/metrics are needed to reach Level 5 specificity, insert `[TODO: INSERT VERIFIED METRIC/FACT]` rather than inventing numbers.

---

## 2. Master On-Page Content Checklist

Use the **Core Checks** on every page[cite: 1]. Use the **Conditional Checks** and **Technical Grounding Checks** when relevant to the page type or codebase[cite: 1].

### Part A: Core Checks — Use on Every Page
- [ ] **A1. Primary Purpose & Intent:** Is the page's primary purpose clear and focused on one recognizable intent[cite: 1]?
- [ ] **A2. Explicit Entity Definition:** Does the page explicitly state what the company, product, service, or topic is[cite: 1]?
- [ ] **A3. Category Clarity Over Trends:** On major brand/commercial pages, is the primary category clear rather than replaced by trend language (e.g., "AI transformation")[cite: 1]?
- [ ] **A4. Explicit Naming:** Are core products, services, capabilities, audiences, or concepts explicitly named rather than implied[cite: 1]?
- [ ] **A5. Descriptive vs. Problem-Led Balance:** Does problem-led marketing copy include enough descriptive context to identify the actual offering[cite: 1]?
- [ ] **A6. Topic Focus (No Scope Creep):** Do adjacent topics support the core topic rather than dilute it (linking out to spoke pages when a subtopic deserves dedicated depth)[cite: 1]?
- [ ] **A7. Depth of Explanation:** Does each major claim receive enough explanation (*how, why, when, conditions, limitations*) to be useful[cite: 1]?
- [ ] **A8. Specificity Density (Levels 3–5):** Does each important section contain at least one concrete entity-, product-, experience-, methodology-, or evidence-specific detail[cite: 1]?
- [ ] **A9. Supported Superlatives & Claims:** Are material claims such as *experienced, leading, advanced, secure, fast,* or *high-quality* supported by concrete facts[cite: 1]?
- [ ] **A10. Information Gain (Non-Commodity Value):** Does the page contain original experience, cases, examples, data, analysis, methodology, or expert input beyond generic model knowledge[cite: 1]?
- [ ] **A11. Surface Alignment:** Do the `<title>`, `H1`, headings (`H2–H3`), and visible copy accurately describe the page[cite: 1]?
- [ ] **A12. Answer-First + Nuance:** Do concise direct answers lead into supporting detail when nuance is required (avoiding shallow 2-sentence fragments)[cite: 1]?
- [ ] **A13. Visible Accessible Text:** Is important information available as visible, accessible text (and structured tables where appropriate) rather than trapped in images or inaccessible UI[cite: 1]?
- [ ] **A14. Natural Keywords & Anchor Text:** Are keywords and internal link anchor texts natural and descriptive (e.g., *"Explore our warehouse inventory integrations"* instead of *"Learn more"*) rather than vague or stuffed[cite: 1]?
- [ ] **A15. The Zero-Inference Answerability Test:** Can a reader—or retrieval system—explicitly answer *what this is, what it does, who it serves,* and *why it is credible* without guessing[cite: 1]?
- [ ] **A16. Human Readability & Cadence:** Does the prose read naturally with varied sentence rhythm, zero AI clichés (*delve, tapestry, fast-paced landscape*), and zero filler?

### Part B: Conditional Checks — Use When Relevant
- [ ] **B1. Verifiable Experience Proof:** If experience influences trust, is there verifiable evidence such as years, volume, credentials, implementations, customers served, or case history[cite: 1]?
- [ ] **B2. Accountable Authorship:** If expertise matters, is it clear who created or reviewed the content and why they are qualified[cite: 1]?
- [ ] **B3. YMYL Evidence & Balance:** For YMYL topics (health, finance, safety, legal), are high-impact claims supported by authoritative/primary sources, and are material risks, uncertainty, candidacy, and limitations represented[cite: 1]?
- [ ] **B4. Sourced & Contextualized Data (GEO Lever):** If statistics, quotes, or time-sensitive facts are used, are they current, attributed to primary sources, and contextualized[cite: 1]?
- [ ] **B5. Truthful Schema Alignment:** If structured data (JSON-LD) is used, does it accurately match visible page information[cite: 1]?
- [ ] **B6. Meaningful Freshness Dates:** If publication/update dates are shown, do they reflect meaningful content changes rather than cosmetic freshness[cite: 1]?
- [ ] **B7. Human Review of AI Assistance:** If AI assisted production, were facts, expert judgment, and original inputs independently reviewed (with zero fabricated facts)[cite: 1]?
- [ ] **B8. Distinct Page Purpose (Anti-Cannibalization):** If multiple pages target closely related queries, does each page have a distinct user purpose and belong to the right taxonomic hub rather than being a scaled variation[cite: 1]?

### Part C: Technical & Multi-Engine Grounding Checks — Use on Code Templates & Live URLs
- [ ] **C1. Initial HTML Rendering (SSR/SSG):** Is core copy present in the initial server-rendered HTML so non-JS AI crawlers (`GPTBot`, `ClaudeBot`, `PerplexityBot`) and Bingbot can extract it immediately?
- [ ] **C2. Grounding Eligibility Meta Directives:** Is the page free of `noarchive`, `nocache`, or `nosnippet` tags that restrict Microsoft Copilot, Bing Web IQ, and Google AI Overviews from citing the page?
- [ ] **C3. Canonical & Sitemap Hygiene:** Does the page have a single self-referencing `<link rel="canonical">` and clean URL structure to prevent grounding signal dilution?

---

## 3. Required Audit Output Template (For IDE Agents)

When outputting an audit in the chat or writing an audit report file, use this exact structure:

```markdown
# Content & Search Discovery Audit: [Page / File Name]

## 1. Executive Diagnostic & Answerability Test
* **Stated Page Job (1 Sentence):** [What the page is trying to accomplish]
* **Answerability / Inference Tax Check:**
  * *What it is / Primary Category:* [Explicitly stated vs. Inferred/Missing]
  * *What it does / Core Capabilities:* [Explicitly stated vs. Inferred/Missing]
  * *Who it serves / Target Market:* [Explicitly stated vs. Inferred/Missing]
  * *Why it is credible (Proof):* [Explicitly stated vs. Inferred/Missing]
* **Dominant Specificity Level:** [Level 1 (Vague) to Level 5 (Evidence-Backed)]
* **Human Readability & Voice Assessment:** [Pass / Warn / Fail — note any AI-slop phrasing or rhythm issues]

## 2. Checklist Evaluation (Core, Conditional, & Technical)
*List only `FAIL` and `WARN` items in detail; summarize `PASS` items concisely.*
* **[Check ID — e.g., A3 / A8 / B3]:** `[FAIL or WARN]` — [1-sentence diagnosis citing the exact line/section].

## 3. Line-by-Line Refactor Plan (WEAK → STRONGER)
*For every issue identified above, provide the exact rewrite:*

### Issue 1: [Section / Heading / Line Number] — [Rule Violated, e.g., High Inference Tax / Specificity Level 1]
* **CURRENT (WEAK):** > "[Exact quote from the file]"
* **PROPOSED (STRONGER):** > "[Rewritten version moving up the Specificity Ladder to Level 3–5, using natural human prose and `[TODO: VERIFY ...]` placeholders for any missing proprietary facts]"
* **WHY:** [1 sentence explaining how this reduces inference tax, adds proof, or improves retrieval clarity]