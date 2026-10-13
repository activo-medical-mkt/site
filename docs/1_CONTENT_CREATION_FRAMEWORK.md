# Optimizing On-Page Content for Search & AI Discovery (V2 — IDE & Agent Edition)
*A practical framework and system specification for search engines, AI search, and LLM-powered discovery—engineered for human readability and AI-assisted codebase workflows.*

**Core Principle:** Do not optimize content to sound like "SEO content" or "AI content." Optimize it to contain information worth finding, understanding, trusting, and retrieving. Write for human readers first with natural cadence and editorial judgment, while structuring facts so search and retrieval systems can verify and cite them at low token cost.

**Evidence Base (Updated October 2026):**
1. **Primary Platform Authority:** [Google Search Central](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) & [Microsoft Bing Webmaster Guidelines / Web IQ](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)[cite: 1].
2. **Academic Research:** Princeton University, Georgia Tech, & IIT Delhi (*Aggarwal et al., ACM SIGKDD — "GEO: Generative Engine Optimization"*).
3. **Empirical Industry Studies:** [Semrush AI Search Studies (2026)](https://www.semrush.com/blog/content-optimization-ai-search-study/)[cite: 1] and [Ahrefs AI Citation & Schema Studies (2025–2026)](https://ahrefs.com/blog/ai-overview-citations-top-10/).

*Note on Framing:* Official platform guidance is cited directly. Academic and third-party research findings are treated as directional associations rather than disclosed ranking formulas, and concepts such as "inference tax" and the "specificity ladder" are editorial frameworks designed to enforce clarity[cite: 1].

---

## 0. IDE Agent Operating Rules (For Claude, GitHub Copilot, & Codex)

When generating, editing, or refactoring website copy or blog posts in this repository, you MUST obey these three execution guardrails:

### Rule 0.1: Zero Hallucination on Level 4–5 Specificity
This framework requires moving claims up the **Specificity Ladder (Levels 3–5)** using dates, quantities, named technologies, credentials, and methodology[cite: 1]. 
* **CRITICAL:** If verified company metrics, years in business, pricing, clinical/technical credentials, or case study numbers are **not** present in the repository or user prompt, **DO NOT INVENT THEM.**
* Instead, write the sentence to Level 3–4 using available context and insert a visible bracketed placeholder: `[TODO: INSERT VERIFIED METRIC / CREDENTIAL / CASE PROOF — e.g., X years / specific SLA / certification]`.

### Rule 0.2: Natural Human Prose & Rhythm (Anti-AI-Slop Protocol)
Content must read and feel like it was written by a sharp human subject-matter expert, not a language model.
* **Vary Sentence & Paragraph Length:** Mix punchy, direct declarative sentences with longer, nuanced explanatory sentences. Avoid uniform 3-sentence paragraphs where every paragraph follows the exact same rhythm.
* **Banned AI Clichés:** Never use throat-clearing filler or synthetic transitions: *"In today's fast-paced digital landscape," "It's not just X, it's Y," "delve into," "testament to," "unlock the power of," "seamless," "game-changer," "tapestry," "beacon," "navigate the complexities,"* or *"moreover/furthermore"* at the start of adjacent paragraphs.
* **Concrete Over Performative:** Do not try to sound smart with abstract buzzwords; sound credible by explaining *how* things actually work, including edge cases, trade-offs, and constraints[cite: 1].

### Rule 0.3: Prioritize Define → Explain → Prove → Help
Every page and major section must execute four jobs in order[cite: 1]:
* **DEFINE:** State what the company, product, service, person, or topic actually is[cite: 1].
* **EXPLAIN:** Describe what it does, how it works, who it serves, and why it matters[cite: 1].
* **PROVE:** Support important claims with experience, credentials, data, examples, sources, cases, or methodology[cite: 1].
* **HELP:** Satisfy the user's intent with enough context and depth to make the information genuinely useful[cite: 1].

---

## Executive Summary & 2026 Research Consensus

The goal of modern on-page optimization is not to manufacture keyword-rich pages or compress every idea into robotic, "AI-friendly" two-sentence fragments[cite: 1]. It is to **reduce ambiguity while increasing useful information**[cite: 1]. A strong page makes its subject, entity, category, purpose, evidence, and value explicit enough for a human reader to understand—and structured enough for search and AI systems to retrieve relevant passages[cite: 1].

* **Google's Stance:** Foundational SEO remains the core driver of Google's generative AI features (AI Overviews and AI Mode)[cite: 1]. There is no requirement to rewrite content into tiny chunks, create special AI-only text files (`llms.txt`), rely on schema specifically for AI citations, or manufacture pages for every query variation[cite: 1]. Google emphasizes unique, non-commodity, expert-led content, clear structure, and satisfying users[cite: 1].
  * *Sources:* [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) · [Google Search Essentials](https://developers.google.com/search/docs/essentials) · [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)[cite: 1]
* **Microsoft Bing & Web IQ Grounding Stance:** Bing powers grounding for Microsoft Copilot, ChatGPT Search, and partner AI agents. In its 2026 *Web IQ* and *AI Performance* documentation, Microsoft explains that AI grounding operates under strict token and latency budgets, retrieving **passage-level evidence units** that maximize **information density per token** and can be understood without external context.
  * *Sources:* [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) · [Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)[cite: 1] · [Microsoft Web IQ Architecture (2026)](https://blogs.bing.com/search/2026/6/Announcing-Microsoft-Web-IQ/) · [Bing AI Visibility Insights: Intents & Topics (2026)](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/)
* **Academic & Industry Research Layer (Princeton GEO, Semrush, Ahrefs):**
  * **Princeton/Georgia Tech GEO Study (*Aggarwal et al., KDD 2024*):** Tested 10,000 queries on `GEO-bench` and proved that three authority methods significantly increase visibility in generative answers: **Statistics Addition**, **Expert Quotation Addition**, and **Inline Source Citations** (boosting visibility by up to 30–40% in controlled tests, particularly helping lower-ranked pages compete). Conversely, traditional **keyword stuffing reduced visibility**.
  * **Semrush AI Citation Studies (2026):** Found positive associations between AI citations and clarity/summarization, E-E-A-T signals, natural Q&A formatting, section structure, and structured HTML elements[cite: 1].
  * **Ahrefs Citation & Schema Studies (2026):** Found that **only 38% of AI Overview citations pull from traditional Top 10 results** (meaning pages outside the Top 10 win citations by better matching sub-intents and format clarity), and confirmed across 1,885 pages that adding JSON-LD schema alone does not increase LLM citations.
  * *Sources:* [Princeton GEO Study (ACM SIGKDD)](https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/) · [Semrush — Content optimization for AI search study](https://www.semrush.com/blog/content-optimization-ai-search-study/) · [Semrush — How to optimize content for LLMs](https://www.semrush.com/blog/optimize-content-for-llms-with-semrush/)[cite: 1] · [Ahrefs — 38% of AI Overview Citations Pull From Top 10](https://ahrefs.com/blog/ai-overview-citations-top-10/) · [Ahrefs — Schema & AI Citations Study](https://ahrefs.com/blog/schema-ai-citations/)

---

## 1. Start With Purpose, Intent, and a Clear Page Job

Google asks whether a site has a primary purpose or focus, whether content is created for an existing or intended audience, and whether the reader leaves feeling they learned enough to achieve their goal[cite: 1]. Search Essentials also recommends using the words people use to find content in prominent and descriptive locations[cite: 1].

Broadness becomes a problem when adjacent topics displace the page's core job[cite: 1]. "Comprehensive" should not mean "mention everything remotely related."[cite: 1] Google's generative-AI guidance warns against creating separate content for every possible query variation or fan-out query primarily to manipulate rankings or generative responses[cite: 1]. Simultaneously, Bing's 2026 *AI Visibility Insights* classifies grounding into distinct **Intents** (*Informational, Commercial, Comparison, Learn & Solve, Research, Local*) and **Thematic Topics**, recommending that page formats align with the primary intent (e.g., comparison tables for Comparison intent; step-by-step methodologies for Planning/Solve intent).

**Sources:** [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Google Search Essentials](https://developers.google.com/search/docs/essentials) · [Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies)[cite: 1] · [Bing AI Performance — Intents & Topics](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)

* **WEAK:** A payroll software page gives equal weight to payroll, HR strategy, recruiting, employee engagement, benefits, AI productivity, leadership, and workplace culture[cite: 1].
* **STRONGER:** The page explains payroll software, who it is for, payroll workflows, integrations, compliance support, implementation, and pricing—then links to deeper HR or benefits resources where appropriate[cite: 1].
* **WHY:** The stronger version keeps the page centered on the primary user intent and sends adjacent topics to dedicated pages when they deserve depth[cite: 1].

* **WEAK:** "Cybersecurity matters. Cloud security matters. Compliance matters. Zero trust matters."[cite: 1]
* **STRONGER:** Explain which risks the service addresses, how assessment works, which environments are supported, what the client receives, and when a zero-trust approach is appropriate[cite: 1].
* **WHY:** The stronger version explains scope, process, deliverables, and conditions instead of merely mentioning related concepts[cite: 1].

### Taxonomy & Hub-and-Spoke Guardrail (For New Sites & Audits)
When building or auditing a multi-page site architecture:
1. **Separate Commercial Hubs from Educational/Topic Hubs:** Do not mix distinct entity classes in the same URL silo (e.g., in healthcare, keep *Conditions/Symptoms* in a Condition Hub and *Procedures/Treatments* in a Treatment Hub; in B2B/SaaS, keep *Product/Service Capabilities* distinct from *Industry Use Cases* and *Educational Guides*).
2. **One Primary Intent Per URL:** Never create two pages competing for the same core intent. Expand a single page to cover natural sub-questions (the "query fan-out" of cost, process, comparisons, and limitations), and only spin out a new spoke page when a subtopic requires dedicated depth[cite: 1].

**SECTION CHECKLIST**
- [ ] Can the page's primary job be stated in one sentence[cite: 1]?
- [ ] Do adjacent topics support that job rather than compete with it[cite: 1]?
- [ ] When a subtopic deserves depth, does the page link to a dedicated resource instead of covering it superficially[cite: 1]?
- [ ] Does the URL belong to the correct taxonomic hub without cannibalizing another page?

---

## 2. Entity & Semantic Clarity: Define Before You Persuade

Homepages and major product or service pages should make the organization, offering, and category understandable in plain language[cite: 1]. Google does not publish a "category clarity ranking factor," but its documentation repeatedly recommends descriptive titles, headings, links, visible text, and structured information that help people and systems understand a page[cite: 1].

**Sources:** [Google Search Essentials](https://developers.google.com/search/docs/essentials) · [SEO Starter Guide](https://developers.google.com/search/docs/fundamentals/seo-starter-guide) · [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization) · [Influencing title links](https://developers.google.com/search/docs/appearance/title-link) · [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)[cite: 1]

### Category Clarity Before Trend-Led Positioning
A company can participate in a trend without making the trend its primary identity[cite: 1]. A digital experience platform, accounting platform, logistics provider, or design software company may have strong AI capabilities; that does not automatically make "AI" the clearest category for its homepage[cite: 1].

> **Rule:** Do not sacrifice what the company is to chase what the market is currently talking about[cite: 1].

* **WEAK:** "Transform marketing with AI. Personalize every moment. Unlock intelligent growth." The page never clearly states what the product is[cite: 1].
* **STRONGER:** "Acme is a digital experience platform for enterprise content, personalization, and customer journeys. Its AI capabilities help marketing teams automate content operations and personalize experiences at scale."[cite: 1]
* **WHY:** The stronger version establishes the core product category first, then positions AI as a capability of that product[cite: 1].

* **WEAK:** "Build the future with intelligent automation."[cite: 1]
* **STRONGER:** "Northstar manufactures industrial robotics systems for automotive and electronics assembly, with computer-vision and AI automation capabilities."[cite: 1]
* **WHY:** The stronger version states what the company actually makes and where it is used; AI supports the category instead of replacing it[cite: 1].

### Descriptive Text vs. Problem-Led Copy
Problem-led copy is useful because it connects an offering to a customer need[cite: 1]. It becomes weak when it replaces descriptive content[cite: 1]. If a page only says "modernize faster," "unlock growth," and "transform experiences," the reader must infer what is being sold[cite: 1]. Search and AI systems can infer relationships, but there is little editorial benefit in withholding accurate facts that can be stated naturally[cite: 1].

**Sources:** [Google Search Essentials](https://developers.google.com/search/docs/essentials) · [Influencing title links](https://developers.google.com/search/docs/appearance/title-link) · [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) · [Microsoft Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)[cite: 1]

* **WEAK:** "Hiring takes too long. Your best candidates disappear while your team is buried in manual work. Move faster with us."[cite: 1]
* **STRONGER:** "BrightHire is applicant-tracking software for mid-sized recruiting teams. It centralizes candidate pipelines, interview scheduling, scorecards, and hiring analytics so teams can reduce manual coordination."[cite: 1]
* **WHY:** The stronger version identifies the product, audience, core functions, and problem solved without forcing the reader to infer what is being offered[cite: 1].

* **WEAK:** "We help organizations innovate, transform, and scale with confidence."[cite: 1]
* **STRONGER:** "We are a product design and software engineering consultancy that designs digital products, modernizes web applications, and builds data platforms for enterprise teams."[cite: 1]
* **WHY:** The stronger version replaces generic transformation language with a clear business category and named services[cite: 1].

### Reduce the "Inference Tax"
> **Definition:** Do not make people—or machines—infer information you can state accurately and naturally[cite: 1]. The **"inference tax"** is the number of important facts a reader must guess before they can answer basic questions: *What is this? What does it do? Who is it for? Where does it operate? Why is it qualified?*[cite: 1]

A useful internal asset is a **canonical business description**: 
`"[Company] is a [primary category] specializing in [core capabilities] for [primary audience/market]."`[cite: 1]
It does not need to be copied word-for-word across the site; it serves as a factual reference point so homepage, About, service, product, and AI pages remain compatible[cite: 1].

**Sources:** [Organization structured data](https://developers.google.com/search/docs/appearance/structured-data/organization) · [Sitelinks and site structure](https://developers.google.com/search/docs/appearance/sitelinks) · [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)[cite: 1]

### The Answerability Test (and Self-Contained Passages)
Ask whether a new employee—or a retrieval system—could answer the following from explicit page content rather than inference: what the entity is; what category it belongs to; what it does; who it serves; where it operates; its core capabilities; and what evidence supports its claims[cite: 1]. Furthermore, because Bing's *Web IQ* and LLM RAG pipelines retrieve individual passages, ensure major sections name the subject explicitly at the start of the section rather than relying on ambiguous pronouns ("It helps you do this...") that lose meaning when extracted out of context.

**Sources:** [Microsoft Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c) · [Bing Webmaster Guidelines (Section 11: Easy to understand without external context)](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) · [Semrush — How to optimize content for LLMs](https://www.semrush.com/blog/optimize-content-for-llms-with-semrush/)[cite: 1]

**SECTION CHECKLIST**
- [ ] Does the page explicitly state what the company, product, or service is and its primary category[cite: 1]?
- [ ] Are core products, services, capabilities, audiences, and markets named rather than implied[cite: 1]?
- [ ] Does problem-led copy sit alongside enough descriptive context to identify the offering[cite: 1]?
- [ ] Are the organization's core facts consistent across major pages[cite: 1]?

---

## 3. Depth Over Broadness: Avoid Thin, Fragmented Content

Short sentences are not inherently bad. Neither are short paragraphs[cite: 1]. The risk is a page made of statements that never explain, qualify, or prove anything[cite: 1]. Google asks whether content provides a substantial, complete description, insightful information beyond the obvious, original analysis, and substantial additional value[cite: 1]. Its generative-AI guide also explicitly states that publishers do not need to break content into tiny pieces for AI to understand it[cite: 1].

Semrush research does find positive associations between AI citations and clear summaries, Q&A patterns, and section structure[cite: 1]. That supports scanability—not intellectual shallowness[cite: 1]. **A direct answer should be followed by context, evidence, exceptions, and examples.**[cite: 1]

**Sources:** [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Semrush — Content optimization for AI search study](https://www.semrush.com/blog/content-optimization-ai-search-study/) · [Semrush — How to optimize content for LLMs](https://www.semrush.com/blog/optimize-content-for-llms-with-semrush/)[cite: 1]

* **WEAK:** "Solar panels can lower energy costs. They are sustainable. Installation is simple. Contact us to learn more."[cite: 1]
* **STRONGER:** "Residential solar can reduce grid electricity purchases, but savings depend on local rates, roof orientation, system size, financing, incentives, and household consumption. A site assessment should estimate annual production against historical usage before sizing the system."[cite: 1]
* **WHY:** The stronger version adds the conditions that determine outcomes, making the statement useful rather than simply promotional[cite: 1].

* **WEAK:** "Backups protect your data. Ransomware is dangerous. Recovery matters. Test your backups."[cite: 1]
* **STRONGER:** "A backup is only useful if it can be restored. For ransomware resilience, organizations should separate backup copies from production credentials, define recovery-point and recovery-time objectives, and test restoration procedures on a schedule."[cite: 1]
* **WHY:** The stronger version explains why recovery matters and describes the practices that make backups more resilient[cite: 1].

> **Editorial Principle:** Optimize information, not sentence count. Clarity can be concise; expertise usually requires context[cite: 1].

**SECTION CHECKLIST**
- [ ] Does each major claim receive enough explanation to be useful[cite: 1]?
- [ ] Does the page explain relevant *how, why, when, for whom, conditions,* or *limitations*[cite: 1]?
- [ ] Are short sentences improving clarity rather than replacing necessary context[cite: 1]?

---

## 4. Specificity and Information Density (plus Princeton GEO Levers)

Specificity turns generic claims into information[cite: 1]. Dates, quantities, locations, named technologies, process steps, audiences, qualifications, methodologies, constraints, and examples make a page more concrete and verifiable[cite: 1]. 

Google encourages evidence of expertise, original information, and substantial additional value[cite: 1]; Semrush recommends citable statistics and proprietary insights in AI-oriented content[cite: 1]; and the **Princeton/Georgia Tech GEO study (*Aggarwal et al., KDD 2024*)** demonstrated empirically that **Statistics Addition**, **Quotation Addition**, and **Inline Source Citations** are the three strongest content optimizations for increasing visibility in generative engine answers (by 30–40% on the Position-Adjusted Word Count metric), while keyword stuffing actively harms visibility.

**Sources:** [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Semrush — How to optimize content for AI search engines](https://www.semrush.com/blog/how-to-optimize-content-for-ai-search-engines/) · [Semrush — Content optimization for AI search study](https://www.semrush.com/blog/content-optimization-ai-search-study/)[cite: 1] · [Princeton University — GEO: Generative Engine Optimization (ACM SIGKDD)](https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/)

* **WEAK:** "Our firm has extensive experience and provides high-quality financial guidance."[cite: 1]
* **STRONGER:** "The firm has advised family-owned businesses on succession planning since 2008. Its advisory team includes CPAs and CFP professionals, and engagements typically cover ownership transfer, tax coordination, liquidity planning, and governance."[cite: 1]
* **WHY:** The stronger version turns a vague experience claim into verifiable information: timeframe, qualifications, audience, and scope of work[cite: 1].

* **WEAK:** "Our coffee is carefully sourced for exceptional quality."[cite: 1]
* **STRONGER:** "The roastery buys traceable lots from producers and cooperatives in Colombia, Ethiopia, and Guatemala, publishes roast dates on every bag, and profiles each coffee by origin, process, variety, and recommended brew method."[cite: 1]
* **WHY:** The stronger version replaces an unsupported quality claim with traceable sourcing and concrete product information[cite: 1].

### A Practical Specificity Ladder
* **Level 1 — Vague:** We provide innovative technology solutions[cite: 1].
* **Level 2 — Category:** We provide software development services[cite: 1].
* **Level 3 — Specific:** We provide custom software development, cloud modernization, data engineering, and AI development[cite: 1].
* **Level 4 — Contextual:** We provide those services for mid-market and enterprise organizations with complex legacy environments[cite: 1].
* **Level 5 — Evidence-backed:** Add relevant years of experience, industries, technologies, delivery examples, outcomes, credentials, methodology, and verifiable evidence[cite: 1].

*Note:* Not every sentence should be Level 5[cite: 1]. The goal is to ensure the page contains enough Level 3–5 information that its meaning is not carried by generic claims[cite: 1]. (Reminder for AI Agents: If Level 5 facts are missing from context, use `[TODO: INSERT VERIFIED PROOF]` rather than inventing numbers.)

**SECTION CHECKLIST**
- [ ] Does each important section include at least one entity-, product-, experience-, methodology-, or evidence-specific detail (Level 3–5)[cite: 1]?
- [ ] Are claims such as *experienced, leading, advanced, secure, fast,* or *high-quality* supported[cite: 1]?
- [ ] Where experience influences trust, is there verifiable evidence such as years, volume, credentials, case history, customers served, or implementations[cite: 1]?
- [ ] On informational/research pages, are claims reinforced with primary source citations, concrete data/statistics, or attributable expert quotes?

---

## 5. E-E-A-T: Make Trust and Expertise Visible

Google describes E-E-A-T as experience, expertise, authoritativeness, and trustworthiness, with **trust** being the most important component[cite: 1]. Google also says E-E-A-T is not itself a single ranking factor[cite: 1]. The practical takeaway is to make the reasons a reader should trust the page visible: who created it, what relevant experience or expertise they have, how claims are supported, and why the content exists[cite: 1].

Google recommends evaluating content through **"Who, How, and Why."**[cite: 1] It asks whether authorship is clear where expected, whether bylines lead to background about the author, whether content demonstrates first-hand expertise, and whether the primary purpose is to help people rather than attract search visits[cite: 1].

**Sources:** [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) · [Semrush — What is E-E-A-T in SEO?](https://www.semrush.com/blog/what-is-e-e-a-t-in-seo/)[cite: 1]

* **WEAK:** "Our technicians are experts in restoring historic homes."[cite: 1]
* **STRONGER:** "Restoration projects are led by preservation carpenters with experience in sash-window repair, lime plaster, traditional joinery, and work on pre-1940 properties. Project pages identify the techniques and materials used."[cite: 1]
* **WHY:** The stronger version demonstrates expertise through specific techniques and project context rather than asserting expertise as a label[cite: 1].

* **WEAK:** "Written by our nutrition team."[cite: 1]
* **STRONGER:** "Written by [Name], RD; reviewed by [Name], MD. The page links to credentials, identifies the review date, and cites primary clinical guidance for medical claims."[cite: 1]
* **WHY:** The stronger version identifies accountable people, relevant credentials, a review process, and the evidence behind medical claims[cite: 1].

**SECTION CHECKLIST**
- [ ] When expertise matters, is it clear who created or reviewed the content[cite: 1]?
- [ ] Does the page or linked profile establish relevant qualifications or first-hand experience[cite: 1]?
- [ ] Are important trust claims supported by evidence, examples, methodology, or reliable sources[cite: 1]?

---

## 6. YMYL: Raise the Evidence Standard

Google says its systems give more weight to strong E-E-A-T for topics that can significantly affect health, financial stability, safety, or societal welfare—areas commonly described as **Your Money or Your Life (YMYL)**[cite: 1]. The cost of inaccurate, unsupported, or misleading information is higher, so the editorial standard should move from "plausible and readable" to **"appropriately qualified, sourced, current, balanced, and reviewable."**[cite: 1]

**Sources:** [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Byline dates](https://developers.google.com/search/docs/appearance/publication-dates)[cite: 1]

* **WEAK:** "This treatment is safe, fast, and gets you back to normal quickly."[cite: 1]
* **STRONGER:** Define the treatment, typical indications, material risks, alternatives, recovery variability, who evaluates candidacy, and which claims are supported by clinical or regulatory sources[cite: 1].
* **WHY:** The stronger direction avoids an unsupported guarantee and includes the information a reader needs to understand candidacy, tradeoffs, and uncertainty[cite: 1].

* **WEAK:** "This investment strategy can help you build wealth with less risk."[cite: 1]
* **STRONGER:** Define the strategy, explain risk and time horizon, distinguish historical performance from future outcomes, disclose assumptions or fees where relevant, and identify the qualified author or reviewer[cite: 1].
* **WHY:** The stronger direction gives the claim appropriate financial context by defining risk, time horizon, assumptions, and qualified authorship[cite: 1].

**SECTION CHECKLIST**
- [ ] Are high-impact claims supported by reliable, preferably primary or authoritative sources[cite: 1]?
- [ ] Is the author or reviewer appropriately qualified for the claim being made[cite: 1]?
- [ ] Are material risks, limitations, uncertainty, alternatives, and current statistics represented where relevant[cite: 1]?

---

## 7. Claim → Explanation → Evidence → Relevance

Many weak pages stop at the claim[cite: 1]. Stronger pages explain the claim, support it, and tell the reader why it matters[cite: 1]. This is an editorial framework—not a disclosed Google formula—but it maps closely to Google's emphasis on substantial descriptions, expertise, clear sourcing, and added value[cite: 1], as well as Bing's requirement to *"support claims with evidence (examples, data, and cited sources) to improve clarity and trust when content is reused in AI-generated answers."*

**Sources:** [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content) · [Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)[cite: 1]

* **WEAK:** "Our platform is enterprise-ready."[cite: 1]
* **STRONGER:** "The platform supports SSO/SAML, role-based permissions, audit logs, regional data hosting, and documented APIs. Enterprise plans include security-review support and defined support SLAs."[cite: 1]
* **WHY:** The stronger version defines "enterprise-ready" through concrete security, administration, hosting, API, and support capabilities[cite: 1].

* **WEAK:** "Our hotel is ideal for business travelers."[cite: 1]
* **STRONGER:** "The hotel is a five-minute walk from the convention center, offers 24-hour check-in, in-room desks, 500 Mbps Wi-Fi, early breakfast from 6:00 a.m., and bookable meeting rooms."[cite: 1]
* **WHY:** The stronger version turns a subjective claim into decision-relevant facts a business traveler can actually evaluate[cite: 1].

> **The "So What?" Editing Test:** If a sentence says "we have decades of experience," ask: *doing what, in which context, and why is that experience relevant to the decision?*[cite: 1] If it says "advanced technology," ask: *which technology and what does it enable?*[cite: 1]

**SECTION CHECKLIST**
- [ ] For each major claim, can the page answer "how do we know?"[cite: 1]
- [ ] Are proof points located close to the claims they support[cite: 1]?
- [ ] Are outcomes described without implying guarantees the evidence cannot support[cite: 1]?

---

## 8. Non-Commodity Content and Information Gain

Google's 2026 generative-AI guidance explicitly recommends **unique, non-commodity content**: first-hand perspectives, in-depth experience, and material that does more than recycle what is already on the web or what a generative model could easily produce[cite: 1]. Google's people-first guidance similarly asks whether a page provides original information, reporting, research, analysis, and substantial additional value[cite: 1].

This changes the planning question[cite: 1]. Instead of *"How many words should this page have?"* ask **"What information will this page contribute?"**[cite: 1] Google says there is no ideal page length for generative AI search and cautions against writing to a preferred word count[cite: 1]. More words are not automatically more useful; fewer words are not automatically more AI-friendly[cite: 1].

**Sources:** [Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Creating helpful, reliable, people-first content](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)[cite: 1]

* **WEAK:** "10 Tips for Choosing a Moving Company" assembled from common advice already present across hundreds of pages[cite: 1].
* **STRONGER:** A mover publishes its pre-move inspection checklist, explains the three causes of unexpected charges it sees most often, shows anonymized examples, and provides a calculator based on its actual estimating process[cite: 1].
* **WHY:** The stronger version contributes first-hand operational knowledge, examples, and methodology instead of repackaging a common listicle[cite: 1].

* **WEAK:** "What Is Product Discovery?" summarized from standard definitions[cite: 1].
* **STRONGER:** A product team analyzes 50 discovery projects, identifies where stakeholder interviews most often fail, explains its research method, and publishes patterns with examples and limitations[cite: 1].
* **WHY:** The stronger version contributes original data, a stated method, observed patterns, and limitations rather than repeating a standard definition[cite: 1].

**SECTION CHECKLIST**
- [ ] Does the page contain original experience, data, cases, examples, methodology, observations, or analysis[cite: 1]?
- [ ] Does at least some of the page require organization-specific or expert input rather than generic model knowledge[cite: 1]?
- [ ] Is additional length adding information rather than simply adding words[cite: 1]?

---

## 9. Structure for Humans First — and Retrieval Second

Good structure makes depth navigable[cite: 1]. Google recommends organizing content with paragraphs, sections, and headings that create a clear structure[cite: 1]. It also says AI features require no special AI markup or machine-readable AI text files[cite: 1]. Semrush's citation study found positive associations with clear summaries, Q&A formatting, section structure, and structured elements[cite: 1]; Bing recommends descriptive headings, concise sections, HTML tables, and FAQ-style content where useful, alongside multimodal alignment (ensuring text, images, alt attributes, and video consistently represent the same entities)[cite: 1].

**Sources:** [Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [AI features and your website](https://developers.google.com/search/docs/appearance/ai-features) · [Semrush — Content optimization for AI search study](https://www.semrush.com/blog/content-optimization-ai-search-study/) · [Microsoft Bing Webmaster Tools — AI Performance](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)[cite: 1] · [Bing Webmaster Guidelines](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)

The practical balance is simple: **answer direct questions directly, then provide the detail necessary to understand the answer.**[cite: 1] Do not turn every section into a two-sentence "chunk" if the topic needs nuance, and do not add FAQs merely because a tool recommends them[cite: 1].

* **WEAK:** `H2: Is migration hard?` "Migration can be hard. Planning helps." `H2: Is testing important?` "Yes. Testing reduces risk."[cite: 1]
* **STRONGER:** `H2: Migration planning.` Open with a direct summary, then explain dependencies, data mapping, cutover strategy, testing, rollback, ownership, and common failure modes[cite: 1].
* **WHY:** The stronger version remains scannable while giving enough depth to understand dependencies, execution, and failure points[cite: 1].

### Structural Formatting Rules for Code & Markdown
1. **Clean Heading Hierarchy (`H1 -> H2 -> H3`):** Never skip heading levels for visual styling. Make headings descriptive of the topic or question answered beneath them[cite: 1].
2. **Lead With the Core Point, Then Expand:** Open major sections with a clear, direct statement (1–2 sentences) that establishes the answer or takeaway, then immediately follow with the supporting explanation, nuances, dependencies, and proof[cite: 1].
3. **Use Semantic HTML Tables for Multi-Variable Comparisons:** Whenever comparing 3+ items across multiple attributes (pricing tiers, technical specs, alternatives, service scopes), use standard HTML `<table>` (`<thead>`, `<tbody>`, `<th>`, `<td>`) or Markdown tables rather than burying comparisons in dense prose.
4. **Multimodal & Visible Text Consistency:** Never trap core specifications, pricing, or workflows exclusively inside images, SVGs, or hidden UI tabs that require complex client-side interaction[cite: 1]. Align image `alt` attributes and captions with the exact entity names used in the visible text.

**SECTION CHECKLIST**
- [ ] Do headings accurately describe the content beneath them in a logical `H1 -> H2 -> H3` hierarchy[cite: 1]?
- [ ] Do direct-answer summaries lead into adequate supporting detail when the topic requires it[cite: 1]?
- [ ] Are multi-variable comparisons presented in structured tables or clear lists where helpful?
- [ ] Is important information available as visible text rather than only in images, animations, or inaccessible UI[cite: 1]?

---

## 10. On-Page Signals: Titles, Headings, Snippets, Links, and Dates

The content body is not the only descriptive surface[cite: 1]. Google recommends descriptive, concise title elements; unique and accurate meta descriptions; informative headings; relevant anchor text; logical site structure; and meaningful visible dates where publication or update timing matters[cite: 1]. Google may generate snippets primarily from page content, so a vague body cannot be rescued by a good meta description alone[cite: 1].

**Sources:** [Influencing title links](https://developers.google.com/search/docs/appearance/title-link) · [Control snippets in search results](https://developers.google.com/search/docs/appearance/snippet) · [Link best practices](https://developers.google.com/search/docs/crawling-indexing/links-crawlable) · [Sitelinks and site structure](https://developers.google.com/search/docs/appearance/sitelinks) · [Byline dates](https://developers.google.com/search/docs/appearance/publication-dates)[cite: 1] · [Ahrefs — AI Assistants Prefer Fresher Content](https://ahrefs.com/blog/schema-ai-citations/)

* **WEAK:** `Home | Acme`[cite: 1]
* **STRONGER:** `Acme | Inventory Management Software for Multi-Location Retailers`[cite: 1]
* **WHY:** The stronger title tells both people and search systems what the entity is, what the page is about, and who the product serves[cite: 1].

* **WEAK:** `Learn more →`[cite: 1]
* **STRONGER:** `Explore our warehouse inventory integrations →`[cite: 1]
* **WHY:** The stronger link describes the destination and relationship instead of making the reader interpret a generic "learn more" label[cite: 1].

* **WEAK:** "Updated today" after changing punctuation[cite: 1].
* **STRONGER:** Update the content when facts, recommendations, products, evidence, or methodology materially change; show a truthful modified date when it helps the reader[cite: 1].
* **WHY:** The stronger approach uses dates to communicate real content freshness, not to manufacture the appearance of recency[cite: 1].

**SECTION CHECKLIST**
- [ ] Do the `<title>`, `H1`, headings, and visible copy accurately describe the page[cite: 1]?
- [ ] Are meta descriptions, links, and anchor text (`<a href="...">`) specific and natural rather than vague ("click here", "learn more") or stuffed[cite: 1]?
- [ ] Where dates matter, are publication and update dates truthful and consistent with visible content and schema[cite: 1]?

---

## 11. AI-Assisted Content: Use AI to Improve Work, Not Replace Knowledge

Google does not prohibit content simply because generative AI was used[cite: 1]. Its concern is value and purpose: generating many pages without adding value can violate **scaled-content-abuse** policies[cite: 1]. Google says generative AI can be useful in content workflows, but the finished work should meet Search Essentials and people-first standards[cite: 1].

A productive workflow uses AI (in Claude, Copilot, or Codex) to organize interviews, identify unanswered questions, improve clarity, compare drafts, or transform expert notes—while humans and subject-matter experts remain responsible for facts, original insight, evidence, judgment, and final quality[cite: 1]. Semrush's current AI-content research similarly emphasizes originality and usefulness over simplistic "AI vs. human" labels[cite: 1].

**Sources:** [Guidance on generative AI content](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content) · [Spam policies](https://developers.google.com/search/docs/essentials/spam-policies) · [Google Search Essentials](https://developers.google.com/search/docs/essentials) · [Semrush — SEO content guide for search and AI](https://www.semrush.com/blog/seo-content/) · [Semrush — How to optimize content for AI search engines](https://www.semrush.com/blog/how-to-optimize-content-for-ai-search-engines/)[cite: 1]

* **WEAK:** Prompt: "Write 50 location pages for our service. Change the city name and a few sentences."[cite: 1]
* **STRONGER:** Interview local operators about regulations, lead times, service boundaries, common problems, pricing factors, and case examples; use AI to structure and edit the resulting original information[cite: 1].
* **WHY:** The stronger workflow uses AI to structure original, locally informed inputs rather than scaling near-duplicate pages around query variations[cite: 1].

**SECTION CHECKLIST**
- [ ] Has every factual claim been reviewed for accuracy (and all `[TODO]` placeholders resolved with real facts)[cite: 1]?
- [ ] Does the page contain expert or organization-specific input beyond generic model output[cite: 1]?
- [ ] Are we avoiding scaled pages created primarily to capture keyword or query variations[cite: 1]?

---

## 12. Technical & Multi-Engine Grounding Readiness (For Developers & Coding Agents)

When building a new website or auditing templates in code, on-page editorial quality must be supported by technical accessibility across both **Google** and **Bing / LLM Grounding Engines** (Copilot, ChatGPT Search, Perplexity, Claude).

**Sources:** [Google Search Central — Optimizing your website for generative AI features](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide) · [Bing Webmaster Guidelines (2026)](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a) · [Bing AI Performance & IndexNow](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) · [Ahrefs — Schema & AI Citations Study (2026)](https://ahrefs.com/blog/schema-ai-citations/)

1. **Server-Side Rendering (SSR) / Static HTML for Core Copy:**
   While Googlebot can render JavaScript (with caveats), Bing Webmaster Guidelines explicitly warn against *"hiding critical content behind client-side rendering"* or requiring excessive HTTP requests, and many LLM crawlers (`GPTBot`, `OAI-SearchBot`, `ClaudeBot`, `PerplexityBot`) do not reliably execute heavy client-side JS bundles. Always deliver primary body copy, headings, links, and metadata in the initial SSR/SSG HTML payload.
2. **Snippet, Cache, and Archive Directives (Critical for Bing/Copilot Grounding):**
   * Google requires pages to be indexed and eligible to display a snippet (`max-snippet:-1` recommended for public pages).
   * **Bing Grounding Warning:** Bing's official guidelines state that `NOARCHIVE` **completely prevents content from being used in Copilot responses and grounding results**, `NOCACHE` restricts Copilot to only the URL, title, and snippet (severely reducing citation depth), and `NOSNIPPET` / `data-nosnippet` blocks captioning and citation quality. Never apply `noarchive`, `nocache`, or `nosnippet` to pages intended for AI discovery.
3. **URL Consolidation & IndexNow:**
   * Bing explicitly notes that duplicate URLs (parameter bloat, trailing-slash mismatches) *"dilute signals and reduce Bing's confidence in selecting a URL for grounding results or citations."* Enforce strict `<link rel="canonical">` tags and clean XML sitemaps with accurate `lastmod` timestamps.
   * Implement **IndexNow** (`https://www.indexnow.org`) on content publish/update so Bing and its partner AI grounding indices immediately ingest the freshest version of the page.
4. **Right-Sized Structured Data (JSON-LD Schema):**
   * Both Google's 2026 AI guide[cite: 1] and Ahrefs' 1,885-page study confirm that adding JSON-LD schema does *not* magically cause LLMs to cite a page more often.
   * However, clean JSON-LD (`Organization`, `Person` with `credentials`/`sameAs`, `Service`/`Product`, `Article`, `BreadcrumbList`) remains valuable for **Knowledge Graph entity disambiguation** and traditional Search rich results. Ensure any JSON-LD strictly matches visible text on the page[cite: 1].

**SECTION CHECKLIST**
- [ ] Is core page copy rendered in initial HTML (SSR/SSG) with crawlable `<a href>` internal links?
- [ ] Are public pages free from accidental `noarchive`, `nocache`, or `nosnippet` directives that block Copilot/LLM grounding?
- [ ] Does the page have a single self-referencing canonical URL, clean sitemap inclusion, and IndexNow support?
- [ ] Where JSON-LD schema is used, does it accurately mirror visible page facts (`Organization`, `Author`, `Service`, dates)[cite: 1]?

---

## Sources & Reference Ledger

| Official Google Documentation | Microsoft Bing, Academic & Industry Studies |
| :--- | :--- |
| [**Google Search Central — Creating helpful, reliable, people-first content**](https://developers.google.com/search/docs/fundamentals/creating-helpful-content)[cite: 1] | [**Microsoft Bing — Webmaster Guidelines (Search, Copilot & Grounding API)**](https://www.bing.com/webmasters/help/webmaster-guidelines-30fba23a)[cite: 1] |
| [**Google Search Central — Optimizing your website for generative AI features**](https://developers.google.com/search/docs/fundamentals/ai-optimization-guide)[cite: 1] | [**Microsoft Bing Webmaster Tools — AI Performance Documentation**](https://www.bing.com/webmasters/help/ai-performance-9f8e7d6c)[cite: 1] |
| [**Google Search Central — AI features and your website**](https://developers.google.com/search/docs/appearance/ai-features)[cite: 1] | [**Microsoft Bing Blog — Introducing AI Performance & IndexNow for GEO (Feb 2026)**](https://blogs.bing.com/webmaster/2026/2/Introducing-AI-Performance-in-Bing-Webmaster-Tools-Public-Preview/) |
| [**Google Search Essentials**](https://developers.google.com/search/docs/essentials)[cite: 1] | [**Microsoft Bing Blog — Announcing Microsoft Web IQ Grounding Architecture (June 2026)**](https://blogs.bing.com/search/2026/6/Announcing-Microsoft-Web-IQ/) |
| [**Google Search Central — SEO Starter Guide**](https://developers.google.com/search/docs/fundamentals/seo-starter-guide)[cite: 1] | [**Microsoft Bing Blog — AI Visibility Insights: Intents & Topics (June 2026)**](https://blogs.bing.com/search/2026/6/New-AI-Visibility-Insights-in-Bing-Webmaster-Tools-Intents-Topics-Citation-Share-Compare/) |
| [**Google Search Central — Guidance on generative AI content**](https://developers.google.com/search/docs/fundamentals/using-gen-ai-content)[cite: 1] | [**Princeton University / Georgia Tech / IIT Delhi — GEO: Generative Engine Optimization (ACM SIGKDD)**](https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/) |
| [**Google Search Central — Spam policies**](https://developers.google.com/search/docs/essentials/spam-policies)[cite: 1] | [**Semrush — Content optimization for AI search study**](https://www.semrush.com/blog/content-optimization-ai-search-study/)[cite: 1] |
| [**Google Search Central — Organization structured data**](https://developers.google.com/search/docs/appearance/structured-data/organization)[cite: 1] | [**Semrush — How to optimize content for LLMs**](https://www.semrush.com/blog/optimize-content-for-llms-with-semrush/)[cite: 1] |
| [**Google Search Central — Influencing title links**](https://developers.google.com/search/docs/appearance/title-link)[cite: 1] | [**Semrush — How to optimize content for AI search engines**](https://www.semrush.com/blog/how-to-optimize-content-for-ai-search-engines/)[cite: 1] |
| [**Google Search Central — Control snippets in search results**](https://developers.google.com/search/docs/appearance/snippet)[cite: 1] | [**Semrush — SEO content guide for search and AI**](https://www.semrush.com/blog/seo-content/)[cite: 1] |
| [**Google Search Central — Link best practices**](https://developers.google.com/search/docs/crawling-indexing/links-crawlable)[cite: 1] | [**Semrush — What is E-E-A-T in SEO?**](https://www.semrush.com/blog/what-is-e-e-a-t-in-seo/)[cite: 1] |
| [**Google Search Central — Sitelinks and site structure**](https://developers.google.com/search/docs/appearance/sitelinks)[cite: 1] | [**Ahrefs — 38% of AI Overview Citations Pull From Top 10 (March 2026)**](https://ahrefs.com/blog/ai-overview-citations-top-10/) |
| [**Google Search Central — Byline dates**](https://developers.google.com/search/docs/appearance/publication-dates)[cite: 1] | [**Ahrefs — We Tracked 1,885 Pages Adding Schema: AI Citations Study (2026)**](https://ahrefs.com/blog/schema-ai-citations/) |
| [**Google Search Central — SEO guide for web developers**](https://developers.google.com/search/docs/fundamentals/get-started-developers)[cite: 1] | |